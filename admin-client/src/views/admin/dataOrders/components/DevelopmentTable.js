/* eslint-disable */
import {
  Button,
  Checkbox,
  Flex,
  Icon,
  Select,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Wrap,
  WrapItem,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { MdAdd, MdCancel, MdCheckCircle, MdDelete, MdEdit, MdInfo } from "react-icons/md";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import ModalTemp from 'views/admin/dataOrders/components/ModalTemp.js';
import api from "utils/Services";
import { BACK_END_HOST } from "utils/AppConfig";
import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import debounce from 'lodash.debounce'

export default function DevelopmentTable(props) {

  const { columnsData } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tableData, setTableData] = useState([]);

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
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const [totalPages, setTotalPages] = useState(0);
  const [pageNow, setPageNow] = useState(1);
  const [searchCondition, setSearchCondition] = useState({
    delivered: true,
    notDelivered: true,
    search: ''
  });
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [modalAttr, setModalAttr] = useState({});
  const [isChange, setIsChange] = useState(true);


  //update searchCondition
  const updateSearchCondition = (event) => {
    const { name, value, checked } = event.target;
    setPageNow(1);
    if (name === 'notDelivered' || name === 'delivered') {
      setSearchCondition({
        ...searchCondition,
        [name]: checked
      });
    } else {
      setSearchCondition({
        ...searchCondition,
        [name]: value
      });
    }
  };
  // getAllRecordPaging
  useEffect(() => {
    api.get(`${BACK_END_HOST}/order?page=${pageNow}&delivered=${searchCondition.delivered}&notDelivered=${searchCondition.notDelivered}&search=${searchCondition.search}`)
      .then(res => {
        setTableData(res.data);
      })
      .catch(error => {
        console.log('Load list Product error:', error);
      })
  }, [pageNow])

  // // totalPagination
  // useEffect(() => {
  //   api.get(`${BACK_END_HOST}/order/orderPagination?delivered=${searchCondition.delivered}&notDelivered=${searchCondition.notDelivered}&search=${searchCondition.search}`)
  //     .then(res => setTotalPages(res.data.totalPages))
  //     .catch(error => console.log('paging list order error:', error))
  // }, [])

  //show modal
  const showOrderDetail = (_id) => {
    setModalAttr({
      _id
    })
    setIsChange(true);
    onOpen();
  }

  // Debounced function to call API for data fetching
  const debouncedGetData = debounce(() => {
    api.get(`${BACK_END_HOST}/order?page=${pageNow}&delivered=${searchCondition.delivered}&notDelivered=${searchCondition.notDelivered}&search=${searchCondition.search}`)
      .then(res => {
        setTableData(res.data);
      })
      .catch(error => {
        console.log('Load list Product error:', error);
      });
  }, 300);

  // Debounced function to call API for pagination
  const debouncedGetPagination = debounce(() => {
    api.get(`${BACK_END_HOST}/order/orderPagination?delivered=${searchCondition.delivered}&notDelivered=${searchCondition.notDelivered}&search=${searchCondition.search}`)
      .then(res => setTotalPages(res.data.totalPages))
      .catch(error => console.log('paging list order error:', error));
  }, 300);

  // Effect to fetch data based on search conditions
  useEffect(() => {
    // Clear previous timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout to call debounced function
    const timeout = setTimeout(() => {
      debouncedGetData();
      debouncedGetPagination();
    }, 300);

    // Set the typing timeout
    setTypingTimeout(timeout);

    // Clean-up
    return () => clearTimeout(timeout);
  }, [searchCondition]);


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
          Order
        </Text>
        <SimpleGrid
          columns={{ sm: 1, md: 3 }}
          spacing={{ base: "10px", xl: "5px" }}
        >
          <Checkbox
            name='notDelivered'
            colorScheme='green'
            defaultChecked={searchCondition.notDelivered}
            onChange={(e) => updateSearchCondition(e)}
          >
            Chưa giao
          </Checkbox>
          <Checkbox
            name='delivered'
            colorScheme='green'
            defaultChecked={searchCondition.delivered}
            onChange={(e) => updateSearchCondition(e)}
          >
            Đã giao
          </Checkbox>
          <SearchBar
            name='search'
            value={searchCondition.search}
            onChange={(e) => updateSearchCondition(e)}
          />
        </SimpleGrid>
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
                    if (cell.column.Header === 'Thời gian đặt') {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {moment(cell.value).utcOffset(7).format('DD/MM/YYYY')}<br />
                          {moment(cell.value).utcOffset(7).format('HH:mm:ss')}
                        </Text>
                      );
                    } else if (cell.column.Header === 'Trạng thái giao hàng') {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          <Flex align='center'>
                            <Icon
                              w='24px'
                              h='24px'
                              me='5px'
                              color={
                                cell.value === true
                                  ? "green.500"
                                  : cell.value === false
                                    ? "red.500"
                                    : null
                              }
                              as={
                                cell.value === true
                                  ? MdCheckCircle
                                  : cell.value === false
                                    ? MdCancel
                                    : null
                              }
                            />
                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                              {cell.value ? 'Đã giao' : 'Chưa giao'}
                            </Text>
                          </Flex>
                        </Text>
                      );
                    } else if (cell.column.Header === 'Hành động') {
                      data = (
                        <Flex gap='5px'>
                          <Button onClick={() => showOrderDetail(cell.row.original._id)}>
                            <Icon as={MdInfo} width='20px' height='20px' color='#00a8ff' />
                          </Button>
                        </Flex>
                      );
                    } else if (cell.column.Header === 'Tổng đơn(đồng)') {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value?.toLocaleString('vi-VN')}
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
      <Wrap justify='end' mr='30px'>
        {[...Array(totalPages)].map((_, index) => (
          <WrapItem key={index}>
            <Button
              colorScheme='green'
              borderRadius='5px'
              m='2px'
              onClick={() => setPageNow(index + 1)}
              background={pageNow === (index + 1) ? 'green.700' : undefined}
            >
              {index + 1}
            </Button>
          </WrapItem>
        ))}
      </Wrap>
      <>
        <ModalTemp
          isOpen={isOpen}
          onClose={onClose}
          isChange={isChange}
          setIsChange={setIsChange}
          setTableData={setTableData}
          tableData={tableData}
          {...modalAttr}
        />
      </>
    </Card>
  );
}
