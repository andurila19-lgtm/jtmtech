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
  SimpleGrid,
  Divider,
} from '@chakra-ui/react';
import {
  MdCalendarToday,
  MdTwoWheeler,
  MdBuild,
  MdArrowBack,
  MdLocationOn,
  MdPerson,
  MdCheckCircle,
} from 'react-icons/md';
import { IoLogoWhatsapp } from 'react-icons/io';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useStore } from 'contexts/StoreContext';

export default function SingleBookingDetailPage() {
  const params = useParams();
  const bookingId = params?.id as string;
  const { bookings, settings } = useStore();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const booking = bookings.find((b) => b.id === bookingId || b.bookingNumber === bookingId) || bookings[0];

  return (
    <Box p={{ base: '18px', md: '26px' }} borderRadius="20px" bg={bgCard} border="1px solid" borderColor={borderColor}>
      {/* Top Bar */}
      <Flex justify="space-between" align="center" mb="18px" flexWrap="wrap" gap="10px">
        <HStack spacing="12px">
          <Link href="/account/bookings">
            <Button size="sm" variant="ghost" leftIcon={<MdArrowBack />}>
              Kembali
            </Button>
          </Link>
          <Box>
            <Heading as="h1" fontSize={{ base: '18px', md: '22px' }} fontWeight="900" color={textColor}>
              {booking.bookingNumber}
            </Heading>
            <Text fontSize="12px" color={textColorSecondary}>
              Didaftarkan: {booking.createdAt}
            </Text>
          </Box>
        </HStack>

        <Badge
          colorScheme={
            booking.status === 'COMPLETED'
              ? 'green'
              : booking.status === 'IN_SERVICE'
              ? 'orange'
              : 'purple'
          }
          fontSize="12px"
          px="10px"
          py="4px"
          borderRadius="full"
        >
          STATUS: {booking.status}
        </Badge>
      </Flex>

      <Divider borderColor={borderColor} mb="24px" />

      {/* Main Details Grid */}
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px" mb="26px">
        <Box p="16px" borderRadius="14px" border="1px solid" borderColor={borderColor}>
          <HStack spacing="8px" mb="10px">
            <Icon as={MdTwoWheeler} color="brand.500" w="20px" h="20px" />
            <Text fontSize="14px" fontWeight="800" color={textColor}>
              Informasi Kendaraan
            </Text>
          </HStack>
          <Text fontSize="15px" fontWeight="800" color={textColor}>
            {booking.vehicleModel} ({booking.vehicleYear})
          </Text>
          <Text fontSize="13px" color={textColorSecondary} mt="2px">
            Nomor Polisi: <strong>{booking.vehiclePlate}</strong>
          </Text>
        </Box>

        <Box p="16px" borderRadius="14px" border="1px solid" borderColor={borderColor}>
          <HStack spacing="8px" mb="10px">
            <Icon as={MdBuild} color="orange.500" w="20px" h="20px" />
            <Text fontSize="14px" fontWeight="800" color={textColor}>
              Paket Layanan Servis
            </Text>
          </HStack>
          <Text fontSize="15px" fontWeight="800" color={textColor}>
            {booking.serviceName}
          </Text>
          <Text fontSize="13px" color="brand.500" fontWeight="800" mt="2px">
            Estimasi Biaya Jasa: Rp {booking.estimatedCost.toLocaleString('id-ID')}
          </Text>
        </Box>
      </SimpleGrid>

      {/* Schedule Box */}
      <Box p="18px" borderRadius="16px" bg={useColorModeValue('purple.50', 'navy.900')} mb="26px">
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap="14px">
          <HStack spacing="10px">
            <Icon as={MdCalendarToday} color="brand.500" w="22px" h="22px" />
            <Box>
              <Text fontSize="11.5px" color="purple.700" fontWeight="700">
                Waktu Kedatangan:
              </Text>
              <Text fontSize="15px" fontWeight="900" color={textColor}>
                {booking.date} pukul {booking.time} WIB
              </Text>
            </Box>
          </HStack>

          <HStack spacing="10px">
            <Icon as={MdLocationOn} color="red.500" w="22px" h="22px" />
            <Box>
              <Text fontSize="11.5px" color="purple.700" fontWeight="700">
                Lokasi Pit:
              </Text>
              <Text fontSize="14px" fontWeight="800" color={textColor}>
                {settings.businessInfo.address}, {settings.businessInfo.city}
              </Text>
            </Box>
          </HStack>
        </SimpleGrid>
      </Box>

      {booking.notes && (
        <Box p="16px" borderRadius="14px" border="1px solid" borderColor={borderColor} mb="26px">
          <Text fontSize="13px" fontWeight="800" color={textColor} mb="4px">
            Catatan / Keluhan Pengendara:
          </Text>
          <Text fontSize="13px" color={textColorSecondary}>
            &ldquo;{booking.notes}&rdquo;
          </Text>
        </Box>
      )}

      {/* Actions */}
      <HStack spacing="12px" justify="flex-end" flexWrap="wrap">
        <a
          href={`https://wa.me/${settings.businessInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20Bengkel%20JTM%20Tech,%20saya%20mau%20konfirmasi%20jadwal%20booking%20${booking.bookingNumber}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button colorScheme="whatsapp" size="sm" leftIcon={<IoLogoWhatsapp />} borderRadius="10px">
            Konfirmasi ke Mekanik
          </Button>
        </a>
      </HStack>
    </Box>
  );
}
