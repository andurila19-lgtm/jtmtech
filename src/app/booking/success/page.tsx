'use client';

import React, { Suspense } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Flex,
  Icon,
  Badge,
  useColorModeValue,
  SimpleGrid,
  Divider,
} from '@chakra-ui/react';
import {
  MdCheckCircle,
  MdCalendarToday,
  MdLocationOn,
  MdArrowForward,
  MdTwoWheeler,
  MdBuild,
} from 'react-icons/md';
import { IoLogoWhatsapp } from 'react-icons/io';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import { useStore } from 'contexts/StoreContext';

function BookingSuccessPageInner() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('id');
  const { bookings, settings } = useStore();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const booking = bookings.find((b) => b.id === bookingId || b.bookingNumber === bookingId) || bookings[0];

  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'navy.900')}>
      <PublicNavbar />

      <Container maxW="800px" py="50px">
        <Box
          p={{ base: '24px', md: '36px' }}
          borderRadius="24px"
          bg={bgCard}
          border="1px solid"
          borderColor={borderColor}
          boxShadow="xl"
          textAlign="center"
        >
          {/* Success Check Icon */}
          <Box
            w="72px"
            h="72px"
            borderRadius="full"
            bg="green.500"
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mx="auto"
            mb="20px"
            boxShadow="0 8px 24px rgba(1, 181, 116, 0.4)"
          >
            <Icon as={MdCheckCircle} w="44px" h="44px" />
          </Box>

          <Badge colorScheme="green" px="10px" py="3px" borderRadius="full" fontSize="12px" mb="10px">
            PENDAFTARAN BERHASIL
          </Badge>

          <Heading as="h1" fontSize={{ base: '24px', md: '32px' }} fontWeight="900" color={textColor} mb="8px">
            Jadwal Servis Anda Telah Terdaftar!
          </Heading>

          <Text fontSize="14px" color={textColorSecondary} maxW="540px" mx="auto" mb="24px">
            Terima kasih telah mempercayakan motor Anda kepada <strong>{settings.businessInfo.name}</strong>. Tim mekanik kami telah menyiapkan slot pit untuk kedatangan Anda.
          </Text>

          {/* Booking Summary Box */}
          <Box
            p="20px"
            borderRadius="18px"
            bg={useColorModeValue('gray.50', 'navy.900')}
            border="1px solid"
            borderColor={borderColor}
            textAlign="left"
            mb="26px"
          >
            <Flex justify="space-between" align="center" mb="14px" pb="12px" borderBottom="1px solid" borderColor={borderColor}>
              <Box>
                <Text fontSize="11px" color={textColorSecondary} textTransform="uppercase" fontWeight="700">
                  Nomor Booking Antrean
                </Text>
                <Text fontSize="18px" fontWeight="900" color="brand.500">
                  {booking.bookingNumber}
                </Text>
              </Box>
              <Badge colorScheme="purple" fontSize="12px">
                {booking.status}
              </Badge>
            </Flex>

            <SimpleGrid columns={{ base: 1, sm: 2 }} gap="14px" fontSize="13px">
              <HStack spacing="10px">
                <Icon as={MdCalendarToday} color="brand.500" />
                <Box>
                  <Text color={textColorSecondary} fontSize="11.5px">Jadwal Kedatangan:</Text>
                  <Text fontWeight="800" color={textColor}>{booking.date} ({booking.time} WIB)</Text>
                </Box>
              </HStack>

              <HStack spacing="10px">
                <Icon as={MdTwoWheeler} color="green.500" />
                <Box>
                  <Text color={textColorSecondary} fontSize="11.5px">Kendaraan Motor:</Text>
                  <Text fontWeight="800" color={textColor}>{booking.vehicleModel} ({booking.vehiclePlate})</Text>
                </Box>
              </HStack>

              <HStack spacing="10px">
                <Icon as={MdBuild} color="orange.500" />
                <Box>
                  <Text color={textColorSecondary} fontSize="11.5px">Paket Layanan:</Text>
                  <Text fontWeight="800" color={textColor}>{booking.serviceName}</Text>
                </Box>
              </HStack>

              <HStack spacing="10px">
                <Icon as={MdLocationOn} color="red.500" />
                <Box>
                  <Text color={textColorSecondary} fontSize="11.5px">Lokasi Bengkel:</Text>
                  <Text fontWeight="800" color={textColor}>{settings.businessInfo.city}</Text>
                </Box>
              </HStack>
            </SimpleGrid>
          </Box>

          {/* Next Steps Guide */}
          <Box mb="30px" textAlign="left" p="16px" borderRadius="14px" bg={useColorModeValue('purple.50', 'navy.800')}>
            <Text fontSize="13px" fontWeight="800" color="purple.700" mb="4px">
              Petunjuk Kedatangan:
            </Text>
            <VStack spacing="4px" align="stretch" fontSize="12px" color={textColorSecondary}>
              <Text>1. Tiba di bengkel minimal 10 menit sebelum jam slot Anda.</Text>
              <Text>2. Tunjukkan kode booking <strong>{booking.bookingNumber}</strong> kepada resepsionis / kasir.</Text>
              <Text>3. Motor akan langsung diarahkan ke pit servis tanpa antre.</Text>
            </VStack>
          </Box>

          {/* Action Buttons */}
          <HStack spacing="12px" justify="center" flexWrap="wrap">
            <Link href="/account/bookings">
              <Button colorScheme="purple" h="48px" px="22px" borderRadius="12px" fontWeight="800">
                Lihat di Akun Saya
              </Button>
            </Link>

            <a
              href={`https://wa.me/${settings.businessInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20Bengkel%20JTM%20Tech,%20saya%20sudah%20booking%20nomor%20${booking.bookingNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button colorScheme="whatsapp" leftIcon={<IoLogoWhatsapp />} h="48px" px="20px" borderRadius="12px">
                Konfirmasi WhatsApp
              </Button>
            </a>

            <Link href="/">
              <Button variant="outline" h="48px" px="20px" borderRadius="12px">
                Kembali ke Beranda
              </Button>
            </Link>
          </HStack>
        </Box>
      </Container>

      <PublicFooter />
    </Box>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<Box minH="100vh" />}>
      <BookingSuccessPageInner />
    </Suspense>
  );
}
