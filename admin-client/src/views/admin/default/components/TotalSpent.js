// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import { BACK_END_HOST } from "utils/AppConfig";
import api from "utils/Services";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";

export default function TotalSpent(props) {
  const { ...rest } = props;

  // Chakra Color Mode

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  const [staticYear, setStaticYear] = useState(moment().year());
  const [revenues, setRevenues] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [profits, setProfits] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  // Caculate year
  var yearNow = moment().year();
  var years = []; 
  var i = 2024;
  while (i <= yearNow) {
    years.push(i++);
  }

  useEffect(() => {
    api.get(`${BACK_END_HOST}/order/static/${staticYear}`)
      .then(res => {
        var data = res.data;
        if( !data.messages || !data.messages === 'Error') {
          setProfits(data.profits);
          setRevenues(data.revenues);
        }
      })
      .catch(err => {
        console.log('order/static err', err);
      })
  }, [staticYear])

  return (
    <Card
      justifyContent='center'
      center='endcolumn and err '
      align='center'
      direction='column'
      w='100%'
      mb='0px'
      {...rest}>
      <Flex justify='space-between' ps='0px' pe='20px' pt='5px'>
        <Flex align='center' w='100%'>
          <Button
            bg={boxBg}
            fontSize='sm'
            fontWeight='500'
            color={textColorSecondary}
            borderRadius='7px'>
            <Icon
              as={MdOutlineCalendarToday}
              color={textColorSecondary}
              me='4px'
            />
            <Select
              fontSize='sm'
              variant='subtle'
              defaultValue='monthly'
              width='unset'
              fontWeight='700'
              value={staticYear}
              onChange={(e) => setStaticYear(e.target.value)}
              >
              {
                years && years.map(year => (
                  <option 
                    value={year}
                    selected={yearNow === year}
                    >
                      {year}
                  </option>
                ))
              }
            </Select>
          </Button>
          <Button
            ms='auto'
            align='center'
            justifyContent='center'
            bg={bgButton}
            _hover={bgHover}
            _focus={bgFocus}
            _active={bgFocus}
            w='37px'
            h='37px'
            lineHeight='100%'
            borderRadius='10px'
            {...rest}>
            <Icon as={MdBarChart} color={iconColor} w='24px' h='24px' />
          </Button>
        </Flex>
      </Flex>
      <Flex w='100%' flexDirection={{ base: "column", lg: "row" }}>
        {/* <Flex flexDirection='column' me='20px' mt='28px'>
          <Text
            color={textColor}
            fontSize='34px'
            textAlign='start'
            fontWeight='700'
            lineHeight='100%'>
            $37.5K
          </Text>
          <Flex align='center' mb='20px'>
            <Text
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'
              mt='4px'
              me='12px'>
              Total Spent
            </Text>
            <Flex align='center'>
              <Icon as={RiArrowUpSFill} color='green.500' me='2px' mt='2px' />
              <Text color='green.500' fontSize='sm' fontWeight='700'>
                +2.45%
              </Text>
            </Flex>
          </Flex>

          <Flex align='center'>
            <Icon as={IoCheckmarkCircle} color='green.500' me='4px' />
            <Text color='green.500' fontSize='md' fontWeight='700'>
              On track
            </Text>
          </Flex>
        </Flex> */}
        <Box minH='260px' minW='100%' mt='auto'>
          <LineChart
            revenues={revenues}
            profits={profits}
            chartOptions={lineChartOptionsTotalSpent}
          />
        </Box>
      </Flex>
    </Card>
  );
}
