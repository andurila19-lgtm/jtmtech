'use client';

import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Icon,
  Progress,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { useState } from 'react';
import {
  MdAttachMoney,
  MdBarChart,
  MdBuild,
  MdShoppingCart,
  MdTrendingUp,
  MdFileDownload,
  MdCheckCircle,
} from 'react-icons/md';
import WorkshopRevenueChart from 'views/admin/default/components/WorkshopRevenueChart';

export default function SalesPage() {
  const [period, setPeriod] = useState<'today' | 'this_week' | 'this_month'>('this_month');

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const activeBtnBg = useColorModeValue('brand.500', 'brand.400');

  const salesData = {
    today: {
      total: 'Rp 4.250.000',
      growth: '+12% vs kemarin',
      service: 'Rp 2.450.000',
      servicePct: 58,
      parts: 'Rp 1.800.000',
      partsPct: 42,
      ordersCount: 14,
      bookingsCount: 6,
    },
    this_week: {
      total: 'Rp 24.800.000',
      growth: '+15.2% vs minggu lalu',
      service: 'Rp 14.100.000',
      servicePct: 57,
      parts: 'Rp 10.700.000',
      partsPct: 43,
      ordersCount: 52,
      bookingsCount: 22,
    },
    this_month: {
      total: 'Rp 96.000.000',
      growth: '+18.4% vs bulan lalu',
      service: 'Rp 54.200.000',
      servicePct: 56.5,
      parts: 'Rp 41.800.000',
      partsPct: 43.5,
      ordersCount: 142,
      bookingsCount: 88,
    },
  };

  const current = salesData[period];

  return (
    <Box pt={{ base: '10px', md: '70px', xl: '70px' }} pb="30px">
      {/* Header */}
      <Flex justify="space-between" align="center" mb="20px" flexWrap="wrap" gap="12px">
        <Box>
          <HStack spacing="8px" mb="4px">
            <Icon as={MdBarChart} color="brand.500" w="24px" h="24px" />
            <Text fontSize="22px" fontWeight="800" color={textColor}>
              Laporan & Rekap Penjualan
            </Text>
          </HStack>
          <Text fontSize="13px" color={textColorSecondary}>
            Ringkasan omset jasa servis bengkel, penjualan suku cadang, dan perputaran kas.
          </Text>
        </Box>

        {/* Period Switcher */}
        <ButtonGroup size="sm" isAttached variant="outline" borderRadius="10px">
          <Button
            bg={period === 'today' ? activeBtnBg : 'transparent'}
            color={period === 'today' ? 'white' : textColorSecondary}
            _hover={{ bg: period === 'today' ? activeBtnBg : 'gray.100' }}
            onClick={() => setPeriod('today')}
          >
            Hari Ini
          </Button>
          <Button
            bg={period === 'this_week' ? activeBtnBg : 'transparent'}
            color={period === 'this_week' ? 'white' : textColorSecondary}
            _hover={{ bg: period === 'this_week' ? activeBtnBg : 'gray.100' }}
            onClick={() => setPeriod('this_week')}
          >
            Minggu Ini
          </Button>
          <Button
            bg={period === 'this_month' ? activeBtnBg : 'transparent'}
            color={period === 'this_month' ? 'white' : textColorSecondary}
            _hover={{ bg: period === 'this_month' ? activeBtnBg : 'gray.100' }}
            onClick={() => setPeriod('this_month')}
          >
            Bulan Ini
          </Button>
        </ButtonGroup>
      </Flex>

      {/* KPI Cards */}
      <SimpleGrid columns={{ base: 2, lg: 4 }} gap="14px" mb="20px">
        <Card p="16px">
          <Stat>
            <StatLabel fontSize="12px" color={textColorSecondary}>
              Total Omset Penjualan
            </StatLabel>
            <StatNumber fontSize={{ base: '18px', md: '22px' }} fontWeight="800" color={textColor}>
              {current.total}
            </StatNumber>
            <StatHelpText fontSize="11px" color="green.500" fontWeight="700" mb="0">
              {current.growth}
            </StatHelpText>
          </Stat>
        </Card>

        <Card p="16px">
          <Stat>
            <StatLabel fontSize="12px" color={textColorSecondary}>
              Jasa Servis Bengkel
            </StatLabel>
            <StatNumber fontSize={{ base: '18px', md: '22px' }} fontWeight="800" color="brand.500">
              {current.service}
            </StatNumber>
            <StatHelpText fontSize="11px" color={textColorSecondary} mb="0">
              {current.servicePct}% dari total omset
            </StatHelpText>
          </Stat>
        </Card>

        <Card p="16px">
          <Stat>
            <StatLabel fontSize="12px" color={textColorSecondary}>
              Penjualan Suku Cadang
            </StatLabel>
            <StatNumber fontSize={{ base: '18px', md: '22px' }} fontWeight="800" color="green.500">
              {current.parts}
            </StatNumber>
            <StatHelpText fontSize="11px" color={textColorSecondary} mb="0">
              {current.partsPct}% dari total omset
            </StatHelpText>
          </Stat>
        </Card>

        <Card p="16px">
          <Stat>
            <StatLabel fontSize="12px" color={textColorSecondary}>
              Volume Transaksi
            </StatLabel>
            <StatNumber fontSize={{ base: '18px', md: '22px' }} fontWeight="800" color={textColor}>
              {current.ordersCount + current.bookingsCount} Transaksi
            </StatNumber>
            <StatHelpText fontSize="11px" color={textColorSecondary} mb="0">
              {current.bookingsCount} Servis | {current.ordersCount} Part
            </StatHelpText>
          </Stat>
        </Card>
      </SimpleGrid>

      {/* Revenue Chart Widget */}
      <Box mb="20px">
        <WorkshopRevenueChart />
      </Box>

      {/* Payment Method Split & Top Performing Services */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap="20px">
        <Card p="18px">
          <Text fontSize="16px" fontWeight="700" color={textColor} mb="14px">
            Distribusi Metode Pembayaran
          </Text>
          <VStack spacing="14px" align="stretch">
            <Box>
              <Flex justify="space-between" mb="4px">
                <Text fontSize="13px" fontWeight="600" color={textColor}>
                  QRIS Universal (Gopay, OVO, Dana, BCA Mobile)
                </Text>
                <Text fontSize="13px" fontWeight="700" color="green.500">
                  52% (Rp 49.920.000)
                </Text>
              </Flex>
              <Progress value={52} colorScheme="green" borderRadius="full" size="sm" />
            </Box>

            <Box>
              <Flex justify="space-between" mb="4px">
                <Text fontSize="13px" fontWeight="600" color={textColor}>
                  Transfer Bank Manual (BCA, Mandiri, BRI)
                </Text>
                <Text fontSize="13px" fontWeight="700" color="purple.500">
                  33% (Rp 31.680.000)
                </Text>
              </Flex>
              <Progress value={33} colorScheme="purple" borderRadius="full" size="sm" />
            </Box>

            <Box>
              <Flex justify="space-between" mb="4px">
                <Text fontSize="13px" fontWeight="600" color={textColor}>
                  Tunai di Kasir Bengkel (Cash)
                </Text>
                <Text fontSize="13px" fontWeight="700" color="orange.500">
                  15% (Rp 14.400.000)
                </Text>
              </Flex>
              <Progress value={15} colorScheme="orange" borderRadius="full" size="sm" />
            </Box>
          </VStack>
        </Card>

        <Card p="18px">
          <Text fontSize="16px" fontWeight="700" color={textColor} mb="14px">
            Layanan Terlaris Bulan Ini
          </Text>
          <VStack spacing="12px" align="stretch">
            <Flex justify="space-between" align="center" pb="8px" borderBottom="1px solid" borderColor={borderColor}>
              <Box>
                <Text fontSize="13px" fontWeight="700" color={textColor}>
                  Paket Service CVT Komplit + Greasing
                </Text>
                <Text fontSize="11px" color={textColorSecondary}>
                  38 Motor dikerjakan
                </Text>
              </Box>
              <Text fontSize="13.5px" fontWeight="800" color="green.500">
                Rp 7.410.000
              </Text>
            </Flex>

            <Flex justify="space-between" align="center" pb="8px" borderBottom="1px solid" borderColor={borderColor}>
              <Box>
                <Text fontSize="13px" fontWeight="700" color={textColor}>
                  Tune Up Injeksi + Gurah Mesin Carbon Clean
                </Text>
                <Text fontSize="11px" color={textColorSecondary}>
                  29 Motor dikerjakan
                </Text>
              </Box>
              <Text fontSize="13.5px" fontWeight="800" color="green.500">
                Rp 3.915.000
              </Text>
            </Flex>

            <Flex justify="space-between" align="center">
              <Box>
                <Text fontSize="13px" fontWeight="700" color={textColor}>
                  Dyno Tuning & Remap ECU Racing
                </Text>
                <Text fontSize="11px" color={textColorSecondary}>
                  12 Motor dikerjakan
                </Text>
              </Box>
              <Text fontSize="13.5px" fontWeight="800" color="green.500">
                Rp 7.740.000
              </Text>
            </Flex>
          </VStack>
        </Card>
      </SimpleGrid>
    </Box>
  );
}
