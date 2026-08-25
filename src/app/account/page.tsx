'use client';

import React from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  HStack,
  VStack,
  Icon,
  Badge,
  useColorModeValue,
  Flex,
  Image,
} from '@chakra-ui/react';
import {
  MdReceiptLong,
  MdCalendarToday,
  MdTwoWheeler,
  MdArrowForward,
  MdBuild,
  MdShoppingCart,
  MdCheckCircle,
} from 'react-icons/md';
import Link from 'next/link';
import { useStore } from 'contexts/StoreContext';

export default function CustomerDashboardPage() {
  const { customer, orders, bookings, vehicles } = useStore();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const bgItem = useColorModeValue('gray.50', 'navy.900');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const activeOrders = orders.filter((o) => o.orderStatus !== 'COMPLETED' && o.orderStatus !== 'CANCELLED');
  const upcomingBookings = bookings.filter((b) => b.status !== 'COMPLETED' && b.status !== 'CANCELLED');

  return (
    <VStack spacing="24px" align="stretch">
      {/* Welcome Banner */}
      <Box
        p={{ base: '20px', md: '26px' }}
        borderRadius="20px"
        bg="linear-gradient(135deg, #11047A 0%, #422AFB 100%)"
        color="white"
        boxShadow="md"
      >
        <Flex justify="space-between" align="center" flexWrap="wrap" gap="14px">
          <Box>
            <Text fontSize="12.5px" color="whiteAlpha.800" fontWeight="700">
              SELAMAT DATANG KEMBALI
            </Text>
            <Heading as="h1" fontSize={{ base: '22px', md: '28px' }} fontWeight="900">
              {customer?.name || 'Ahmad Fauzi'} 👋
            </Heading>
            <Text fontSize="13px" color="whiteAlpha.900" mt="4px">
              Kelola pesanan suku cadang, pantau antrean servis, dan data motor Anda dalam satu tempat.
            </Text>
          </Box>

          <HStack spacing="10px">
            <Link href="/booking">
              <Button size="sm" bg="white" color="brand.500" _hover={{ bg: 'gray.100' }} borderRadius="10px" fontWeight="800">
                + Booking Servis
              </Button>
            </Link>
            <Link href="/shop">
              <Button size="sm" variant="outline" color="white" borderColor="whiteAlpha.400" borderRadius="10px">
                Belanja Part
              </Button>
            </Link>
          </HStack>
        </Flex>
      </Box>

      {/* 3 Metric Cards */}
      <SimpleGrid columns={{ base: 1, sm: 3 }} gap="16px">
        <Box p="18px" borderRadius="16px" bg={bgCard} border="1px solid" borderColor={borderColor}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="12px" color={textColorSecondary} fontWeight="700">
                Pesanan Aktif
              </Text>
              <Text fontSize="24px" fontWeight="900" color={textColor}>
                {activeOrders.length}
              </Text>
            </Box>
            <Box p="10px" borderRadius="12px" bg="purple.50" color="brand.500">
              <Icon as={MdReceiptLong} w="24px" h="24px" />
            </Box>
          </Flex>
        </Box>

        <Box p="18px" borderRadius="16px" bg={bgCard} border="1px solid" borderColor={borderColor}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="12px" color={textColorSecondary} fontWeight="700">
                Jadwal Servis
              </Text>
              <Text fontSize="24px" fontWeight="900" color={textColor}>
                {upcomingBookings.length}
              </Text>
            </Box>
            <Box p="10px" borderRadius="12px" bg="green.50" color="green.500">
              <Icon as={MdCalendarToday} w="24px" h="24px" />
            </Box>
          </Flex>
        </Box>

        <Box p="18px" borderRadius="16px" bg={bgCard} border="1px solid" borderColor={borderColor}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="12px" color={textColorSecondary} fontWeight="700">
                Motor di Garasi
              </Text>
              <Text fontSize="24px" fontWeight="900" color={textColor}>
                {vehicles.length}
              </Text>
            </Box>
            <Box p="10px" borderRadius="12px" bg="orange.50" color="orange.500">
              <Icon as={MdTwoWheeler} w="24px" h="24px" />
            </Box>
          </Flex>
        </Box>
      </SimpleGrid>

      {/* Recent Orders Section */}
      <Box p="22px" borderRadius="20px" bg={bgCard} border="1px solid" borderColor={borderColor}>
        <Flex justify="space-between" align="center" mb="16px">
          <Heading as="h3" fontSize="17px" fontWeight="800" color={textColor}>
            Pesanan Suku Cadang Terbaru
          </Heading>
          <Link href="/account/orders">
            <Button size="xs" variant="ghost" colorScheme="purple" rightIcon={<MdArrowForward />}>
              Semua Pesanan
            </Button>
          </Link>
        </Flex>

        {orders.length === 0 ? (
          <Text fontSize="13px" color={textColorSecondary}>
            Belum ada riwayat pesanan.
          </Text>
        ) : (
          <VStack spacing="12px" align="stretch">
            {orders.slice(0, 3).map((ord) => (
              <Box
                key={ord.id}
                p="14px"
                borderRadius="14px"
                bg={bgItem}
                border="1px solid"
                borderColor={borderColor}
              >
                <Flex justify="space-between" align="center" mb="8px" flexWrap="wrap" gap="6px">
                  <HStack spacing="8px">
                    <Text fontSize="13.5px" fontWeight="800" color="brand.500">
                      {ord.orderNumber}
                    </Text>
                    <Text fontSize="11.5px" color="gray.400">
                      • {ord.createdAt}
                    </Text>
                  </HStack>
                  <Badge colorScheme={ord.paymentStatus === 'PAID' ? 'green' : 'orange'}>
                    {ord.paymentStatus}
                  </Badge>
                </Flex>

                <Flex justify="space-between" align="center">
                  <Text fontSize="12.5px" color={textColorSecondary}>
                    {ord.items.length} Barang • Total: <strong>Rp {ord.total.toLocaleString('id-ID')}</strong>
                  </Text>
                  <Link href={`/account/orders/${ord.id}`}>
                    <Button size="xs" colorScheme="purple" variant="outline">
                      Lihat Rincian
                    </Button>
                  </Link>
                </Flex>
              </Box>
            ))}
          </VStack>
        )}
      </Box>

      {/* Upcoming Bookings Section */}
      <Box p="22px" borderRadius="20px" bg={bgCard} border="1px solid" borderColor={borderColor}>
        <Flex justify="space-between" align="center" mb="16px">
          <Heading as="h3" fontSize="17px" fontWeight="800" color={textColor}>
            Jadwal Servis Kendaraan
          </Heading>
          <Link href="/account/bookings">
            <Button size="xs" variant="ghost" colorScheme="purple" rightIcon={<MdArrowForward />}>
              Semua Jadwal
            </Button>
          </Link>
        </Flex>

        {bookings.length === 0 ? (
          <Text fontSize="13px" color={textColorSecondary}>
            Belum ada jadwal servis aktif.
          </Text>
        ) : (
          <VStack spacing="12px" align="stretch">
            {bookings.slice(0, 2).map((bk) => (
              <Box
                key={bk.id}
                p="14px"
                borderRadius="14px"
                bg={bgItem}
                border="1px solid"
                borderColor={borderColor}
              >
                <Flex justify="space-between" align="center" mb="6px">
                  <HStack spacing="8px">
                    <Icon as={MdTwoWheeler} color="brand.500" />
                    <Text fontSize="14px" fontWeight="800" color={textColor}>
                      {bk.vehicleModel} ({bk.vehiclePlate})
                    </Text>
                  </HStack>
                  <Badge colorScheme="purple">{bk.status}</Badge>
                </Flex>

                <Flex justify="space-between" align="center">
                  <Text fontSize="12.5px" color={textColorSecondary}>
                    {bk.serviceName} • <strong>{bk.date} ({bk.time} WIB)</strong>
                  </Text>
                  <Link href={`/account/bookings/${bk.id}`}>
                    <Button size="xs" colorScheme="purple" variant="outline">
                      Detail
                    </Button>
                  </Link>
                </Flex>
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    </VStack>
  );
}
