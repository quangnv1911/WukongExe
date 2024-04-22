import {
  Box,
  Icon,
  Input,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useEffect, useState } from "react";
import {
  MdAttachMoney,
  MdBarChart,
  MdOutlineShoppingCart,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import InputField from "components/fields/InputField";
import { BACK_END_HOST } from "utils/AppConfig";
import moment from "moment";
import api from "utils/Services";

export default function UserReports() {
  // Bearpo: statics
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [fromDate, setFromDate] = useState(moment().startOf('month').format('YYYY-MM-DD'));
  const [toDate, setToDate] = useState(moment().endOf('month').format('YYYY-MM-DD'));
  const [errorProperties, setErrorProperties] = useState({});

  const [revenue, setRevenue] = useState(0);
  const [profit, setProfit] = useState(0);
  const [numberOrder, setNumberOrder] = useState(0);
  const [staticOfProduct, setStaticOfProduct] = useState([]);

  useEffect(() => {
    if ((fromDate !== '' && toDate !== '' && fromDate > toDate) && (!errorProperties || !errorProperties.borderColor)) {
      setErrorProperties({
        borderColor: 'red'
      })
    } else if ((fromDate !== '' && toDate !== '' && fromDate <= toDate) && !errorProperties.variant) {
      setErrorProperties({
        variant: 'main'
      })
    }
  }, [fromDate, toDate])

  useEffect(() => {
    if (fromDate && toDate && (fromDate <= toDate)) {
      api.get(`${BACK_END_HOST}/orderDetail/static/${fromDate}/${toDate}`)
        .then(res => {
          const data = res.data;

          if (!(data.messages === 'Error')) {
            setRevenue(data.revenue);
            setProfit(data.profit);
            setNumberOrder(data.numberOrder);
            setStaticOfProduct(data.staticOfProduct);
          }
        })
        .catch(err => {
          console.log('dashboard static error:', err);
        })
    }
  }, [fromDate, toDate])

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap='20px'
      >
        <InputField
          label='Từ ngày'
          type='date'
          value={fromDate}
          {...errorProperties}
          onChange={(e) => { setFromDate(e.target.value) }}
        />

        <InputField
          label='Đến ngày'
          type='date'
          value={toDate}
          {...errorProperties}
          onChange={(e) => { setToDate(e.target.value) }}
        />
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
              }
            />
          }
          name='Doanh thu'
          value={`$${revenue}`}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name='Lợi nhuận'
          growth='+23%'
          value={`$${profit}`}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdOutlineShoppingCart} color={brandColor} />
              }
            />
          }
          growth='+23%'
          name='Số lượng đơn hàng'
          value={`${numberOrder}`} />
        {/* <MiniStatistics
          endContent={
            <Flex me='-16px' mt='10px'>
              <FormLabel htmlFor='balance'>
                <Avatar src={Usa} />
              </FormLabel>
              <Select
                id='balance'
                variant='mini'
                mt='5px'
                me='0px'
                defaultValue='usd'>
                <option value='usd'>USD</option>
                <option value='eur'>EUR</option>
                <option value='gba'>GBA</option>
              </Select>
            </Flex>
          }
          name='Your balance'
          value='$1,000'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
            />
          }
          name='New Tasks'
          value='154'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name='Total Projects'
          value='2935'
        /> */}
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent />
        <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px'>
          <PieCard 
            staticOfProduct={ staticOfProduct } 
            sum={revenue} 
            isRevenue={true} 
            text='Tỉ lệ doanh thu/sản phẩm'/>
          <PieCard 
            staticOfProduct={ staticOfProduct } 
            sum={profit}
            isRevenue={false} 
            text='Tỉ lệ lợi nhuận/sản phẩm'
            />
        </SimpleGrid>
        {/* <WeeklyRevenue /> */}
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <DailyTraffic />
          {/* <PieCard staticOfProduct={ staticOfProduct } sum={revenue}/> */}
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <Tasks />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
