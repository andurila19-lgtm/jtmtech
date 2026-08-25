'use client';

import React from 'react';
import {
  Box,
  Heading,
  Text,
  Badge,
  Button,
  VStack,
  HStack,
  Flex,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { MdCalendarToday, MdTwoWheeler, MdBuild, MdArrowForward } from 'react-icons/md';
import Link from 'next/link';
import { useStore } from 'contexts/StoreContext';

export default function CustomerBookingsPage() {
  const { bookings } = useStore();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const bgItem = useColorModeValue('gray.50', 'navy.900');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  return (
    <Box p="24px" borderRadius="20px" bg={bgCard} border="1px solid" borderColor={borderColor}>
      <Flex justify="space-between" align="center" mb="6px" flexWrap="wrap" gap="10px">
        <Heading as="h1" fontSize="22px" fontWeight="900" color={textColor}>
          Jadwal Booking Servis Motor
        </Heading>
        <Link href="/booking">
          <Button colorScheme="purple" size="sm" borderRadius="10px" leftIcon={<MdBuild />}>
            + Booking Servis Baru
          </Button>
        </Link>
      </Flex>
      <Text fontSize="13.5px" color={textColorSecondary} mb="24px">
        Pantau status antrean kedatangan dan riwayat servis berkala kendaraan Anda.
      </Text>

      {bookings.length === 0 ? (
        <Box py="40px" textAlign="center">
          <Text fontSize="14px" color={textColorSecondary} mb="16px">
            Belum ada jadwal booking servis yang aktif.
          </Text>
          <Link href="/booking">
            <Button colorScheme="purple" size="sm" borderRadius="10px">
              Daftar Servis Sekarang
            </Button>
          </Link>
        </Box>
      ) : (
        <VStack spacing="16px" align="stretch">
          {bookings.map((bk) => (
            <Box
              key={bk.id}
              p="16px"
              borderRadius="16px"
              bg={bgItem}
              border="1px solid"
              borderColor={borderColor}
            >
              <Flex justify="space-between" align="center" mb="10px" flexWrap="wrap" gap="8px">
                <HStack spacing="10px">
                  <Badge colorScheme="purple" fontSize="12px" px="8px" py="3px" borderRadius="full">
                    {bk.bookingNumber}
                  </Badge>
                  <Text fontSize="12px" color="gray.400">
                    Dibuat: {bk.createdAt}
                  </Text>
                </HStack>
                <Badge
                  colorScheme={
                    bk.status === 'COMPLETED'
                      ? 'green'
                      : bk.status === 'IN_SERVICE'
                      ? 'orange'
                      : 'purple'
                  }
                >
                  {bk.status}
                </Badge>
              </Flex>

              <HStack spacing="12px" mb="12px">
                <Box p="10px" borderRadius="12px" bg="brand.50" color="brand.500">
                  <Icon as={MdTwoWheeler} w="24px" h="24px" />
                </Box>
                <Box>
                  <Text fontSize="15px" fontWeight="800" color={textColor}>
                    {bk.vehicleModel} ({bk.vehiclePlate})
                  </Text>
                  <Text fontSize="13px" color={textColorSecondary}>
                    Paket: <strong>{bk.serviceName}</strong> • Estimasi Rp {bk.estimatedCost.toLocaleString('id-ID')}
                  </Text>
                </Box>
              </HStack>

              <Flex justify="space-between" align="center" pt="10px" borderTop="1px solid" borderColor={borderColor}>
                <HStack spacing="6px" fontSize="13px" color={textColor}>
                  <Icon as={MdCalendarToday} color="brand.500" />
                  <Text>
                    Jadwal Kedatangan: <strong>{bk.date} ({bk.time} WIB)</strong>
                  </Text>
                </HStack>

                <Link href={`/account/bookings/${bk.id}`}>
                  <Button size="xs" colorScheme="purple" variant="outline" rightIcon={<MdArrowForward />}>
                    Rincian
                  </Button>
                </Link>
              </Flex>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}
