'use client';

import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import Link from 'next/link';
import {
  MdAdd,
  MdAttachMoney,
  MdBuild,
  MdCalendarMonth,
  MdChevronRight,
  MdCheckCircle,
  MdLocalOffer,
  MdPayment,
  MdPlayArrow,
  MdRefresh,
  MdShoppingCart,
  MdWarning,
} from 'react-icons/md';

// Dashboard View Components
import WorkshopRevenueChart from 'views/admin/default/components/WorkshopRevenueChart';
import RecentOrdersTable from 'views/admin/default/components/RecentOrdersTable';
import TodayBookingsTable from 'views/admin/default/components/TodayBookingsTable';
import LowStockAlertTable from 'views/admin/default/components/LowStockAlertTable';

export default function DashboardOverviewPage() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const cardBg = useColorModeValue('white', 'navy.800');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const urgentBg = useColorModeValue('orange.50', 'whiteAlpha.100');
  const urgentBorder = useColorModeValue('orange.200', 'orange.500');

  return (
    <Box pt={{ base: '10px', md: '70px', xl: '70px' }} pb="30px">
      {/* 1. OWNER GREETING & STATUS HEADER */}
      <Flex
        justify="space-between"
        align="center"
        mb="16px"
        flexWrap="wrap"
        gap="10px"
      >
        <Box>
          <HStack spacing="8px" align="center">
            <Text fontSize={{ base: '20px', md: '24px' }} fontWeight="800" color={textColor}>
              Selamat pagi, Owner 👋
            </Text>
            <Badge colorScheme="green" fontSize="10.5px" px="8px" py="2px" borderRadius="full">
              BENGKEL BUKA
            </Badge>
          </HStack>
          <Text fontSize="12.5px" color={textColorSecondary}>
            JTM TECH MotoWorkshop & Store • 2/4 Mekanik Standby di Pit
          </Text>
        </Box>
      </Flex>

      {/* 2. 4 CORE ESSENTIAL KPIS (2 Columns on Mobile, 4 on Desktop) */}
      <SimpleGrid columns={{ base: 2, lg: 4 }} gap="12px" mb="16px">
        {/* KPI 1: Revenue */}
        <Card p={{ base: '12px', md: '16px' }} bg={cardBg} borderRadius="14px">
          <Stat>
            <StatLabel fontSize="11.5px" color={textColorSecondary} fontWeight="600">
              Omset Bulan Ini
            </StatLabel>
            <StatNumber fontSize={{ base: '17px', sm: '20px', md: '22px' }} fontWeight="800" color={textColor} my="2px">
              Rp 96 jt
            </StatNumber>
            <StatHelpText fontSize="11px" color="green.500" fontWeight="700" mb="0">
              ↑ 18.4% vs bln lalu
            </StatHelpText>
          </Stat>
        </Card>

        {/* KPI 2: Orders */}
        <Link href="/admin/orders" style={{ textDecoration: 'none' }}>
          <Card
            p={{ base: '12px', md: '16px' }}
            bg={cardBg}
            borderRadius="14px"
            cursor="pointer"
            _hover={{ transform: 'translateY(-2px)' }}
            transition="all 0.2s"
          >
            <Stat>
              <StatLabel fontSize="11.5px" color={textColorSecondary} fontWeight="600">
                Pesanan Baru
              </StatLabel>
              <StatNumber fontSize={{ base: '17px', sm: '20px', md: '22px' }} fontWeight="800" color="brand.500" my="2px">
                24 Order
              </StatNumber>
              <StatHelpText fontSize="11px" color="brand.500" fontWeight="600" mb="0">
                3 pesanan baru
              </StatHelpText>
            </Stat>
          </Card>
        </Link>

        {/* KPI 3: Pending Payments */}
        <Link href="/admin/payments" style={{ textDecoration: 'none' }}>
          <Card
            p={{ base: '12px', md: '16px' }}
            bg={cardBg}
            borderRadius="14px"
            border="1px solid"
            borderColor={useColorModeValue('orange.300', 'orange.500')}
            cursor="pointer"
            _hover={{ transform: 'translateY(-2px)' }}
            transition="all 0.2s"
          >
            <Stat>
              <StatLabel fontSize="11.5px" color="orange.600" fontWeight="700">
                Perlu Verifikasi
              </StatLabel>
              <StatNumber fontSize={{ base: '17px', sm: '20px', md: '22px' }} fontWeight="800" color="orange.500" my="2px">
                3 Transfer
              </StatNumber>
              <StatHelpText fontSize="11px" color="orange.500" fontWeight="600" mb="0">
                Rp 765.000 dicek
              </StatHelpText>
            </Stat>
          </Card>
        </Link>

        {/* KPI 4: Bookings */}
        <Link href="/admin/bookings" style={{ textDecoration: 'none' }}>
          <Card
            p={{ base: '12px', md: '16px' }}
            bg={cardBg}
            borderRadius="14px"
            cursor="pointer"
            _hover={{ transform: 'translateY(-2px)' }}
            transition="all 0.2s"
          >
            <Stat>
              <StatLabel fontSize="11.5px" color={textColorSecondary} fontWeight="600">
                Booking Hari Ini
              </StatLabel>
              <StatNumber fontSize={{ base: '17px', sm: '20px', md: '22px' }} fontWeight="800" color="green.500" my="2px">
                4 Motor
              </StatNumber>
              <StatHelpText fontSize="11px" color="green.500" fontWeight="600" mb="0">
                2 sedang dikerjakan
              </StatHelpText>
            </Stat>
          </Card>
        </Link>
      </SimpleGrid>

      {/* 3. QUICK ACTIONS (2x2 Grid on Mobile, 4 columns on Desktop) */}
      <Box mb="18px">
        <Text fontSize="12px" fontWeight="800" color={textColorSecondary} letterSpacing="0.8px" mb="8px" textTransform="uppercase">
          Aksi Cepat
        </Text>
        <SimpleGrid columns={{ base: 2, md: 4 }} gap="10px">
          <Link href="/admin/products" style={{ textDecoration: 'none' }}>
            <Button
              w="100%"
              size="md"
              variant="outline"
              colorScheme="purple"
              leftIcon={<MdAdd />}
              borderRadius="12px"
              fontSize="12.5px"
              fontWeight="700"
              h="44px"
              bg={cardBg}
            >
              + Produk
            </Button>
          </Link>

          <Link href="/admin/bookings" style={{ textDecoration: 'none' }}>
            <Button
              w="100%"
              size="md"
              colorScheme="purple"
              leftIcon={<MdCalendarMonth />}
              borderRadius="12px"
              fontSize="12.5px"
              fontWeight="700"
              h="44px"
            >
              + Booking
            </Button>
          </Link>

          <Link href="/admin/orders" style={{ textDecoration: 'none' }}>
            <Button
              w="100%"
              size="md"
              variant="outline"
              leftIcon={<MdShoppingCart />}
              borderRadius="12px"
              fontSize="12.5px"
              fontWeight="700"
              h="44px"
              bg={cardBg}
            >
              Pesanan Toko
            </Button>
          </Link>

          <Link href="/admin/payments" style={{ textDecoration: 'none' }}>
            <Button
              w="100%"
              size="md"
              colorScheme="orange"
              variant="solid"
              leftIcon={<MdPayment />}
              borderRadius="12px"
              fontSize="12.5px"
              fontWeight="700"
              h="44px"
            >
              Verifikasi Bayar
            </Button>
          </Link>
        </SimpleGrid>
      </Box>

      {/* 4. PERLU TINDAKAN (ACTION REQUIRED) - HIGH PRIORITY */}
      <Card p={{ base: '14px', md: '18px' }} mb="18px" border="1.5px solid" borderColor={urgentBorder} bg={urgentBg}>
        <Flex justify="space-between" align="center" mb="10px">
          <HStack spacing="6px">
            <Icon as={MdWarning} color="orange.500" w="18px" h="18px" />
            <Text fontSize="14.5px" fontWeight="800" color={textColor}>
              Perlu Tindakan Mendesak (4)
            </Text>
          </HStack>
          <Text fontSize="11px" color={textColorSecondary}>
            Selesaikan untuk kelancaran operasional
          </Text>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap="10px">
          {/* Action 1 */}
          <Box p="10px" borderRadius="10px" bg={cardBg} border="1px solid" borderColor={borderColor}>
            <Flex justify="space-between" align="center">
              <Box me="8px">
                <HStack spacing="6px" mb="2px">
                  <Badge colorScheme="orange" fontSize="9.5px">PEMBAYARAN</Badge>
                  <Text fontSize="12.5px" fontWeight="700" color={textColor}>
                    Dimas Anggara — Rp 275.000
                  </Text>
                </HStack>
                <Text fontSize="11px" color={textColorSecondary}>
                  Bukti transfer BCA masuk 15 mnt lalu
                </Text>
              </Box>
              <Link href="/admin/payments">
                <Button size="xs" colorScheme="orange">
                  Verifikasi
                </Button>
              </Link>
            </Flex>
          </Box>

          {/* Action 2 */}
          <Box p="10px" borderRadius="10px" bg={cardBg} border="1px solid" borderColor={borderColor}>
            <Flex justify="space-between" align="center">
              <Box me="8px">
                <HStack spacing="6px" mb="2px">
                  <Badge colorScheme="purple" fontSize="9.5px">PESANAN</Badge>
                  <Text fontSize="12.5px" fontWeight="700" color={textColor}>
                    ORD-001 — Rp 490.000
                  </Text>
                </HStack>
                <Text fontSize="11px" color={textColorSecondary}>
                  Sudah Lunas • Perlu dikemas
                </Text>
              </Box>
              <Link href="/admin/orders">
                <Button size="xs" colorScheme="purple" variant="outline">
                  Proses
                </Button>
              </Link>
            </Flex>
          </Box>

          {/* Action 3 */}
          <Box p="10px" borderRadius="10px" bg={cardBg} border="1px solid" borderColor={borderColor}>
            <Flex justify="space-between" align="center">
              <Box me="8px">
                <HStack spacing="6px" mb="2px">
                  <Badge colorScheme="green" fontSize="9.5px">SERVIS</Badge>
                  <Text fontSize="12.5px" fontWeight="700" color={textColor}>
                    09:00 • Honda Vario 160
                  </Text>
                </HStack>
                <Text fontSize="11px" color={textColorSecondary}>
                  Paket Service CVT • Pit 1 Siap
                </Text>
              </Box>
              <Link href="/admin/bookings">
                <Button size="xs" colorScheme="green" variant="outline">
                  Mulai
                </Button>
              </Link>
            </Flex>
          </Box>

          {/* Action 4 */}
          <Box p="10px" borderRadius="10px" bg={cardBg} border="1px solid" borderColor={borderColor}>
            <Flex justify="space-between" align="center">
              <Box me="8px">
                <HStack spacing="6px" mb="2px">
                  <Badge colorScheme="red" fontSize="9.5px">STOK KRITIS</Badge>
                  <Text fontSize="12.5px" fontWeight="700" color={textColor}>
                    Bendix Brake Pad (Sisa 6)
                  </Text>
                </HStack>
                <Text fontSize="11px" color={textColorSecondary}>
                  Batas minimum 12 pcs
                </Text>
              </Box>
              <Link href="/admin/inventory">
                <Button size="xs" colorScheme="red" variant="outline">
                  Restock
                </Button>
              </Link>
            </Flex>
          </Box>
        </SimpleGrid>
      </Card>

      {/* 5. REVENUE OVERVIEW (COMPACT CHART) */}
      <Box mb="18px">
        <WorkshopRevenueChart />
      </Box>

      {/* 6. OPERATIONAL GRIDS: RECENT ORDERS & TODAY'S BOOKINGS */}
      <SimpleGrid columns={{ base: 1, xl: 2 }} gap="18px" mb="18px">
        <RecentOrdersTable />
        <TodayBookingsTable />
      </SimpleGrid>

      {/* 7. LOW STOCK ALERTS */}
      <Box mb="18px">
        <LowStockAlertTable />
      </Box>
    </Box>
  );
}
