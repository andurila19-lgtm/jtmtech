'use client';

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import LineChart from 'components/charts/LineChart';
import { useState } from 'react';
import { RiArrowUpSFill } from 'react-icons/ri';
import { MdOutlineCalendarToday, MdTrendingUp } from 'react-icons/md';

export default function WorkshopRevenueChart() {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'whiteAlpha.700');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const activeBtnBg = useColorModeValue('brand.500', 'brand.400');
  const activeBtnColor = 'white';

  const chartData = {
    daily: [
      {
        name: 'Servis Bengkel',
        data: [1200000, 1850000, 1400000, 2600000, 3100000, 2400000, 3450000],
      },
      {
        name: 'Penjualan Suku Cadang',
        data: [850000, 1200000, 950000, 1750000, 2100000, 1600000, 2300000],
      },
    ],
    weekly: [
      {
        name: 'Servis Bengkel',
        data: [8500000, 11200000, 9800000, 14500000],
      },
      {
        name: 'Penjualan Suku Cadang',
        data: [5600000, 7800000, 6400000, 9900000],
      },
    ],
    monthly: [
      {
        name: 'Servis Bengkel',
        data: [28000000, 32500000, 36000000, 41000000, 48500000, 54200000],
      },
      {
        name: 'Penjualan Suku Cadang',
        data: [19500000, 22000000, 25400000, 29800000, 35000000, 41800000],
      },
    ],
  };

  const chartCategories = {
    daily: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    weekly: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
    monthly: ['Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu'],
  };

  const lineChartOptions: any = {
    chart: {
      toolbar: { show: false },
      dropShadow: {
        enabled: true,
        top: 13,
        left: 0,
        blur: 10,
        opacity: 0.1,
        color: '#4318FF',
      },
    },
    colors: ['#4318FF', '#01B574'],
    markers: {
      size: 4,
      colors: 'white',
      strokeColors: ['#4318FF', '#01B574'],
      strokeWidth: 2,
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function (val: number) {
          return 'Rp ' + val.toLocaleString('id-ID');
        },
      },
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    xaxis: {
      categories: chartCategories[period],
      labels: {
        style: {
          colors: '#A3AED0',
          fontSize: '12px',
          fontWeight: '500',
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      show: true,
      labels: {
        style: {
          colors: '#A3AED0',
          fontSize: '11px',
          fontWeight: '500',
        },
        formatter: function (val: number) {
          if (val >= 1000000) return (val / 1000000).toFixed(1) + 'jt';
          if (val >= 1000) return (val / 1000).toFixed(0) + 'rb';
          return val;
        },
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: { colors: '#A3AED0' },
    },
    grid: {
      strokeDashArray: 5,
      borderColor: 'rgba(163, 174, 208, 0.2)',
    },
  };

  return (
    <Card p="20px" alignItems="center" flexDirection="column" w="100%">
      <Flex justify="space-between" align="center" w="100%" mb="16px" flexWrap="wrap" gap="10px">
        <Box>
          <HStack spacing="6px">
            <Icon as={MdTrendingUp} color="brand.500" w="20px" h="20px" />
            <Text color={textColor} fontSize="18px" fontWeight="700">
              Ringkasan Pendapatan
            </Text>
          </HStack>
          <Text color={textColorSecondary} fontSize="12.5px">
            Perbandingan omset servis bengkel dan penjualan toko suku cadang
          </Text>
        </Box>

        <ButtonGroup size="sm" isAttached variant="outline" borderRadius="10px">
          <Button
            bg={period === 'daily' ? activeBtnBg : 'transparent'}
            color={period === 'daily' ? activeBtnColor : textColorSecondary}
            onClick={() => setPeriod('daily')}
            borderColor={useColorModeValue('gray.200', 'whiteAlpha.200')}
          >
            Harian
          </Button>
          <Button
            bg={period === 'weekly' ? activeBtnBg : 'transparent'}
            color={period === 'weekly' ? activeBtnColor : textColorSecondary}
            onClick={() => setPeriod('weekly')}
            borderColor={useColorModeValue('gray.200', 'whiteAlpha.200')}
          >
            Mingguan
          </Button>
          <Button
            bg={period === 'monthly' ? activeBtnBg : 'transparent'}
            color={period === 'monthly' ? activeBtnColor : textColorSecondary}
            onClick={() => setPeriod('monthly')}
            borderColor={useColorModeValue('gray.200', 'whiteAlpha.200')}
          >
            Bulanan
          </Button>
        </ButtonGroup>
      </Flex>

      <Flex w="100%" flexDirection={{ base: 'column', md: 'row' }} gap={{ base: '12px', md: '20px' }}>
        <Box minW={{ md: '190px' }}>
          <Text color={textColor} fontSize={{ base: '22px', md: '26px' }} fontWeight="800">
            {period === 'daily'
              ? 'Rp 5.750.000'
              : period === 'weekly'
              ? 'Rp 24.400.000'
              : 'Rp 96.000.000'}
          </Text>
          <HStack spacing="4px" mt="2px" mb="10px">
            <Icon as={RiArrowUpSFill} color="green.500" w="18px" h="18px" />
            <Text color="green.500" fontSize="12.5px" fontWeight="700">
              +18.4%
            </Text>
            <Text color={textColorSecondary} fontSize="11px">
              vs periode lalu
            </Text>
          </HStack>

          <SimpleGrid columns={{ base: 2, md: 1 }} gap="6px" bg={boxBg} p="10px" borderRadius="12px" fontSize="11.5px">
            <Flex justify="space-between">
              <Text color={textColorSecondary}>Servis Jasa:</Text>
              <Text fontWeight="700" color="brand.500">
                56.5%
              </Text>
            </Flex>
            <Flex justify="space-between">
              <Text color={textColorSecondary}>Sparepart:</Text>
              <Text fontWeight="700" color="green.500">
                43.5%
              </Text>
            </Flex>
          </SimpleGrid>
        </Box>

        <Box minH={{ base: '190px', md: '230px' }} w="100%" flex="1" overflow="hidden">
          <LineChart chartData={chartData[period]} chartOptions={lineChartOptions} />
        </Box>
      </Flex>
    </Card>
  );
}
