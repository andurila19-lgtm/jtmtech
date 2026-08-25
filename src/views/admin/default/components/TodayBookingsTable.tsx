'use client';

import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import Link from 'next/link';
import { useState } from 'react';
import { MdCalendarMonth, MdOutlineArrowForward, MdBikeScooter, MdCheckCircle, MdPlayArrow } from 'react-icons/md';
import { initialBookings } from 'services/mockData';
import { ServiceBooking } from 'types/workshop';

export default function TodayBookingsTable() {
  const [bookings, setBookings] = useState<ServiceBooking[]>(initialBookings);
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const cardItemBg = useColorModeValue('gray.50', 'navy.700');
  const hoverBg = useColorModeValue('purple.50', 'whiteAlpha.50');

  const getBookingBadge = (status: string) => {
    switch (status) {
      case 'IN_SERVICE':
        return <Badge colorScheme="purple" fontSize="10px">DIKERJAKAN</Badge>;
      case 'CONFIRMED':
        return <Badge colorScheme="blue" fontSize="10px">DIKONFIRMASI</Badge>;
      case 'PENDING':
        return <Badge colorScheme="orange" fontSize="10px">MENUNGGU</Badge>;
      case 'COMPLETED':
        return <Badge colorScheme="green" fontSize="10px">SELESAI</Badge>;
      case 'CANCELLED':
        return <Badge colorScheme="red" fontSize="10px">BATAL</Badge>;
      default:
        return <Badge fontSize="10px">{status}</Badge>;
    }
  };

  const handleAction = (id: string, actionName: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'IN_SERVICE' } : b)),
    );
    toast({
      title: `Status Booking Diperbarui`,
      description: `Booking berhasil diubah menjadi Sedang Dikerjakan.`,
      status: 'success',
      duration: 2000,
      position: 'top-right',
    });
  };

  const todayBookings = bookings.slice(0, 4);

  return (
    <Card p={{ base: '16px', md: '20px' }} w="100%">
      <Flex justify="space-between" align="center" mb="14px">
        <HStack spacing="6px">
          <Icon as={MdCalendarMonth} color="green.500" w="18px" h="18px" />
          <Text color={textColor} fontSize="16px" fontWeight="700">
            Jadwal Booking Servis Hari Ini
          </Text>
        </HStack>
        <Link href="/admin/bookings">
          <Button size="xs" variant="ghost" colorScheme="purple" rightIcon={<MdOutlineArrowForward />}>
            Buka Kalender
          </Button>
        </Link>
      </Flex>

      {/* MOBILE CARD VIEW (< md) */}
      <Box display={{ base: 'block', md: 'none' }}>
        <VStack spacing="10px" align="stretch">
          {todayBookings.map((b) => (
            <Box
              key={b.id}
              p="12px"
              borderRadius="12px"
              bg={cardItemBg}
              border="1px solid"
              borderColor={borderColor}
            >
              <Flex justify="space-between" align="center" mb="6px">
                <HStack spacing="6px">
                  <Badge colorScheme="purple" fontSize="11px" px="6px" py="2px">
                    ⏰ {b.time}
                  </Badge>
                  <Badge fontSize="10px" colorScheme="gray">
                    {b.vehiclePlate}
                  </Badge>
                </HStack>
                {getBookingBadge(b.status)}
              </Flex>

              <Text fontSize="13px" fontWeight="700" color={textColor}>
                {b.customerName} — {b.vehicleModel}
              </Text>
              <Text fontSize="11.5px" color={textColorSecondary} mb="10px">
                {b.serviceName} • {b.mechanicName || 'Mekanik Standby'}
              </Text>

              {b.status === 'PENDING' ? (
                <Button
                  size="xs"
                  colorScheme="purple"
                  w="100%"
                  leftIcon={<MdCheckCircle />}
                  onClick={() => handleAction(b.id, 'Konfirmasi')}
                >
                  Konfirmasi Antrean
                </Button>
              ) : b.status === 'CONFIRMED' ? (
                <Button
                  size="xs"
                  colorScheme="green"
                  variant="outline"
                  w="100%"
                  leftIcon={<MdPlayArrow />}
                  onClick={() => handleAction(b.id, 'Mulai Servis')}
                >
                  Mulai Servis (Masuk Pit)
                </Button>
              ) : null}
            </Box>
          ))}
        </VStack>
      </Box>

      {/* DESKTOP TABLE VIEW (>= md) */}
      <Box display={{ base: 'none', md: 'block' }} overflowX="auto">
        <Table variant="simple" size="sm" color="gray.500">
          <Thead>
            <Tr>
              <Th borderColor={borderColor} color="gray.400" fontSize="10.5px">PELANGGAN & JAM</Th>
              <Th borderColor={borderColor} color="gray.400" fontSize="10.5px">KENDARAAN</Th>
              <Th borderColor={borderColor} color="gray.400" fontSize="10.5px">PAKET SERVIS</Th>
              <Th borderColor={borderColor} color="gray.400" fontSize="10.5px">MEKANIK</Th>
              <Th borderColor={borderColor} color="gray.400" fontSize="10.5px">STATUS</Th>
            </Tr>
          </Thead>
          <Tbody>
            {todayBookings.map((booking) => (
              <Tr key={booking.id} _hover={{ bg: hoverBg }}>
                <Td borderColor={borderColor}>
                  <Text color={textColor} fontSize="12.5px" fontWeight="700">
                    {booking.customerName}
                  </Text>
                  <Text fontSize="11px" color="brand.500" fontWeight="600">
                    ⏰ {booking.time}
                  </Text>
                </Td>
                <Td borderColor={borderColor}>
                  <Text color={textColor} fontSize="12px" fontWeight="600">
                    {booking.vehicleModel}
                  </Text>
                  <Badge fontSize="9.5px" colorScheme="gray">
                    {booking.vehiclePlate}
                  </Badge>
                </Td>
                <Td borderColor={borderColor} maxW="200px">
                  <Text color={textColor} fontSize="12px" noOfLines={1} fontWeight="500">
                    {booking.serviceName}
                  </Text>
                  <Text fontSize="10.5px" color="gray.400">
                    Est: Rp {booking.estimatedCost.toLocaleString('id-ID')}
                  </Text>
                </Td>
                <Td borderColor={borderColor}>
                  <Text color={textColor} fontSize="12px" fontWeight="600">
                    {booking.mechanicName || 'Standby'}
                  </Text>
                </Td>
                <Td borderColor={borderColor}>{getBookingBadge(booking.status)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}

