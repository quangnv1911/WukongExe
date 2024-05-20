/* eslint-disable */
import {
  Button,
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import moment from "moment";
import React, {  useEffect, useMemo, useState } from "react";
import { MdAdd, MdCancel, MdCheckCircle, MdDelete, MdEdit} from "react-icons/md";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import ModalTemp from 'components/modal/ModalTemp.js';
import api from "utils/Services";
import { BACK_END_HOST } from "utils/AppConfig";

export default function DevelopmentTable(props) {

  const textColorBrand = useColorModeValue("brand.500", "white");
  const bg = useColorModeValue("gray.100", "navy.700");


  const { columnsData, tableData, setListProduct } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 99;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const [modalAttr, setModalAttr] = useState({});
  

  const [categories, setCategories] = useState([]);

  //getAll category
  useEffect(() => {
    api.get(`${BACK_END_HOST}/category`)
      .then(res => setCategories(res.data))
      .catch(err => console.log('getAll category error:', err))
  }, [])

  const displayDeleteModal = (name, _id) => {
    setModalAttr({
      title: 'Xóa',
      body: `Bạn có thực sự muốn xóa "${name}"`,
      secondAction: 'Xóa',
      color: 'red.500',
      action: () => handleDelete(_id),
    })
    onOpen();
  }

  const displayAddModal = () => {
    setModalAttr({
      size: 'xl',
      title: 'Thêm mới',
      secondAction: 'Thêm',
      color: 'green.500',
      categories: categories,
      type: 'add'
    })
    onOpen();
  }

  const displayEditModal = (product) => {
    const oldFormValue = tableData?.find(p => p._id === product[8].value);
    setModalAttr({
      size: 'xl',
      title: 'Sửa',
      secondAction: 'Sửa',
      color: 'green.500',
      categories: categories,
      type: 'add',
      oldFormValue: oldFormValue
    })
    onOpen();
  }

  const handleDelete = (_id) => {
    api.delete(`${BACK_END_HOST}/product/${_id}`)
      .then(res => {
        setListProduct(
          tableData.filter(product => product._id !== _id)
        )
        onClose();

      })
      .catch(error => {
        console.log('handleDelete error', error);
      })
  }
 


  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          Sản phẩm
        </Text>
        {/* <Menu /> */}
        <Button onClick={displayAddModal}>
          <Icon as={MdAdd} width='20px' height='20px' marginRight='5px' />
          Thêm
        </Button>
      </Flex>
      <Table {...getTableProps()} variant='striped' color='gray.500' mb='24px' colorScheme='teal' >
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {tableData.length <= 0 ?
            <Button isLoading fontSize='20px' />
            :
            page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "Tên") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "Ảnh") {
                      data = (
                        <Flex align='center'>
                          {
                            <img src={cell.value} alt="product" width={'50%'} />
                          }
                        </Flex>
                      );
                    } else if (cell.column.Header === "Ngày hết hạn giảm giá") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {moment(cell.value).format('DD/MM/YYYY')}
                        </Text>
                      );
                    } else if (cell.column.Header === "Combo") {
                      cell.value ?
                        data = (
                          <Flex align='center' justifyContent='center'>
                            <Icon as={MdCheckCircle} width='20px' height='20px' color='green.500' />
                          </Flex>
                        ) :
                        data = (
                          <Flex align='center' justifyContent='center'>
                            <Icon as={MdCancel} width='20px' height='20px' color="red.500" />
                          </Flex>
                        )
                    } else if (cell.column.Header === "Giảm giá") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}%
                        </Text>
                      );
                    } else if (cell.column.Header === "Hành động") {
                      data = (
                        <Flex gap='5px'>
                          <Button onClick={() => displayEditModal(cell.row.cells)}>
                            <Icon as={MdEdit} width='20px' height='20px' color='#00a8ff' />
                          </Button>
                          <Button onClick={() => displayDeleteModal(cell.row.cells[0].value, cell.value)}>
                            <Icon as={MdDelete} width='20px' height='20px' color='red' />
                          </Button>
                        </Flex>

                      );
                    } else if (cell.column.Header === "Giá nhập (đồng)" || cell.column.Header === "Giá bán (đồng)") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value.toLocaleString('vi-VN')}
                        </Text>
                      );
                    } else {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        {data}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
        </Tbody>
      </Table>
      <>
        <ModalTemp
          {...modalAttr}
          isOpen={isOpen}
          onClose={onClose}
          setListProduct={setListProduct}
          tableData={tableData}
          categories={categories}
        />
      </>
    </Card>
  );
}
