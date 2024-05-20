import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@chakra-ui/react';
import { Button, FormControl, Input, VStack, Text } from '@chakra-ui/react';
import * as Yup from 'yup';
import moment from 'moment';
import { HStack } from '@chakra-ui/react';
import { SimpleGrid } from '@chakra-ui/react';
import { BACK_END_HOST_QUANG } from 'utils/AppConfig';


const VoucherManagement = () => {
  const [vouchers, setVouchers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [newVoucher, setNewVoucher] = useState({
    code: '',
    name: '',
    percent: '',
    quantity: '',
    expiryDate: ''
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const response = await axios.get(BACK_END_HOST_QUANG + '/api/vouchers');
      setVouchers(response.data);
    } catch (error) {
      console.error('Error fetching vouchers:', error);
    }
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string().required('Code is required'),
    name: Yup.string().required('Name is required'),
    percent: Yup.number().typeError('Percent must be a number').required('Percent is required').min(0, 'Percent must be greater than or equal to 0').max(100, 'Percent must be less than or equal to 100'),
    quantity: Yup.number().typeError('Quantity must be a number').min(0, 'Quantity must be greater than or equal to 0'),
    expiryDate: Yup.date().typeError('Expiry Date must be a date').required('Expiry Date is required')
  });

  const handleCreateVoucher = async () => {
    try {
      await validationSchema.validate(newVoucher, { abortEarly: false });
      setValidationErrors({});
      
      // Kiểm tra xem mã giảm giá đã tồn tại chưa
      const existingVoucher = vouchers.find(voucher => voucher.code === newVoucher.code);
      if (existingVoucher) {
        setErrorMessage('Voucher code already exists');
        return; // Dừng việc tạo mới mã giảm giá
      }
  
      // Nếu không tồn tại mã giảm giá, tiến hành tạo mới
      await axios.post(BACK_END_HOST_QUANG + '/api/vouchers', newVoucher);
      setNewVoucher({
        code: '',
        name: '',
        percent: '',
        quantity: '',
        expiryDate: ''
      });
      fetchVouchers();
    } catch (error) {
      if (error.name === 'ValidationError') {
        const errors = {};
        error.inner.forEach(err => {
          errors[err.path] = err.message;
        });
        setValidationErrors(errors);
      } else {
        console.error('Error creating voucher:', error);
      }
    }
  };
  
  

  const handleUpdateVoucher = async (code) => {
    try {
      await validationSchema.validate(newVoucher, { abortEarly: false });
      setValidationErrors({});
      await axios.put(BACK_END_HOST_QUANG + `/api/vouchers/${code}`, newVoucher);
      fetchVouchers();
    } catch (error) {
      if (error.name === 'ValidationError') {
        const errors = {};
        error.inner.forEach(err => {
          errors[err.path] = err.message;
        });
        setValidationErrors(errors);
      } else {
        console.error(`Error updating voucher with code ${code}:`, error);
      }
    }
  };

  const handleDeleteVoucher = async (code) => {
    try {
      await axios.delete(BACK_END_HOST_QUANG + `/api/vouchers/${code}`);
      fetchVouchers();
    } catch (error) {
      console.error(`Error deleting voucher with code ${code}:`, error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVoucher({ ...newVoucher, [name]: value });

    // Kiểm tra lỗi khi nhập liệu
    try {
      if (name === 'expiryDate') {
        if (!moment(value, 'YYYY-MM-DD', true).isValid()) {
          throw new Error('Expiry Date must be in the format YYYY-MM-DD');
        }
      } else {
        validationSchema.validateSyncAt(name, { [name]: value });
      }
      setValidationErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    } catch (error) {
      setValidationErrors(prevErrors => ({ ...prevErrors, [name]: error.message }));
    }
  };

  return (
    <VStack spacing="4" alignItems="flex-start">
      {/* Form nhập thông tin voucher */}
      <FormControl>
        <Input
          name="code"
          value={newVoucher.code}
          placeholder="Code"
          onChange={handleInputChange}
        />
        {validationErrors.code && <Text color="red">{validationErrors.code}</Text>}
        <Input
          name="name"
          value={newVoucher.name}
          placeholder="Name"
          onChange={handleInputChange}
        />
        {validationErrors.name && <Text color="red">{validationErrors.name}</Text>}
        <Input
          name="percent"
          value={newVoucher.percent}
          placeholder="Percent"
          onChange={handleInputChange}
        />
        {validationErrors.percent && <Text color="red">{validationErrors.percent}</Text>}
        <Input
          name="quantity"
          value={newVoucher.quantity}
          placeholder="Quantity"
          onChange={handleInputChange}
        />
        {validationErrors.quantity && <Text color="red">{validationErrors.quantity}</Text>}
        <Input
          name="expiryDate"
          value={newVoucher.expiryDate}
          placeholder="Expiry Date"
          onChange={handleInputChange}
        />
        {validationErrors.expiryDate && <Text color="red">{validationErrors.expiryDate}</Text>}
        {errorMessage && <Text color="red">{errorMessage}</Text>}
      </FormControl>

      {/* Nút tạo voucher mới */}
      <Button onClick={handleCreateVoucher} colorScheme="teal">Create Voucher</Button>

      {/* Danh sách mã giảm giá */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="4" width="100%">
        {vouchers.map((voucher, index) => (
          <Box
            key={index}
            border="1px"
            borderRadius="md"
            p="4"
            bg="gray.100"
            _hover={{ bg: "gray.200" }}
          >
            <Text fontSize="lg" fontWeight="bold">{voucher.code}</Text>
            <Text fontSize="sm">{voucher.name}</Text>
            <Text fontSize="sm">Discount: {voucher.percent}%</Text>
            <Text fontSize="sm">Quantity: {voucher.quantity}</Text>
            <Text fontSize="sm">Expires on: {moment(voucher.expiryDate).format('DD/MM/YYYY')}</Text>
            <HStack spacing="2">
              {/* Nút cập nhật và xóa */}
              <Button onClick={() => handleUpdateVoucher(voucher.code)} colorScheme="blue">Update</Button>
              <Button onClick={() => handleDeleteVoucher(voucher.code)} colorScheme="red">Delete</Button>
            </HStack>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default VoucherManagement;
