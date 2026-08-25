'use client';

import React from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Icon,
  Divider,
  Flex,
  Badge,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import {
  MdTwoWheeler,
  MdLocationOn,
  MdPhone,
  MdEmail,
  MdAccessTime,
  MdVerified,
  MdSecurity,
  MdBuild,
  MdQrCode2,
} from 'react-icons/md';
import { IoLogoWhatsapp } from 'react-icons/io';
import Link from 'next/link';
import { useStore } from 'contexts/StoreContext';

export default function PublicFooter() {
  const { settings } = useStore();

  const bg = useColorModeValue('navy.900', 'navy.950');
  const textColor = 'white';
  const textColorSecondary = 'gray.400';
  const borderColor = 'whiteAlpha.100';

  return (
    <Box as="footer" bg={bg} color={textColor} pt="60px" pb={{ base: '90px', md: '30px' }} borderTop="1px solid" borderColor={borderColor}>
      <Box maxW="1280px" mx="auto" px={{ base: '20px', md: '30px' }}>
        {/* Value Proposition Bar */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px" pb="40px" mb="40px" borderBottom="1px solid" borderColor={borderColor}>
          <HStack spacing="14px" align="center">
            <Box p="10px" borderRadius="12px" bg="whiteAlpha.100" color="brand.400">
              <Icon as={MdVerified} w="26px" h="26px" />
            </Box>
            <Box>
              <Text fontSize="15px" fontWeight="800">
                100% Suku Cadang Asli
              </Text>
              <Text fontSize="12px" color={textColorSecondary}>
                Oli & sparepart original langsung dari distributor resmi.
              </Text>
            </Box>
          </HStack>

          <HStack spacing="14px" align="center">
            <Box p="10px" borderRadius="12px" bg="whiteAlpha.100" color="green.400">
              <Icon as={MdSecurity} w="26px" h="26px" />
            </Box>
            <Box>
              <Text fontSize="15px" fontWeight="800">
                Garansi Hasil Servis
              </Text>
              <Text fontSize="12px" color={textColorSecondary}>
                Garansi pengerjaan dan komplain perbaikan tanpa ribet.
              </Text>
            </Box>
          </HStack>

          <HStack spacing="14px" align="center">
            <Box p="10px" borderRadius="12px" bg="whiteAlpha.100" color="orange.400">
              <Icon as={MdBuild} w="26px" h="26px" />
            </Box>
            <Box>
              <Text fontSize="15px" fontWeight="800">
                Teknisi Tersertifikasi
              </Text>
              <Text fontSize="12px" color={textColorSecondary}>
                Mekanik ahli spesialis CVT, Overhaul mesin, & Injeksi.
              </Text>
            </Box>
          </HStack>
        </SimpleGrid>

        {/* Main Footer Columns */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="36px" mb="40px">
          {/* Col 1: Workshop Brand */}
          <VStack align="flex-start" spacing="14px">
            <HStack spacing="10px">
              <Box
                w="38px"
                h="38px"
                borderRadius="10px"
                bg="linear-gradient(135deg, #7551FF 0%, #422AFB 100%)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
              >
                <Icon as={MdTwoWheeler} w="22px" h="22px" />
              </Box>
              <Box>
                <Text fontSize="18px" fontWeight="900" letterSpacing="-0.5px">
                  {settings.businessInfo.name}
                </Text>
                <Text fontSize="11px" color="brand.400" fontWeight="700">
                  {settings.businessInfo.tagline}
                </Text>
              </Box>
            </HStack>
            <Text fontSize="13px" color={textColorSecondary} lineHeight="1.6">
              Bengkel motor profesional terintegrasi dengan toko suku cadang original dan booking jadwal servis online tanpa antre.
            </Text>

            <a
              href={`https://wa.me/${settings.businessInfo.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="sm"
                colorScheme="whatsapp"
                leftIcon={<IoLogoWhatsapp />}
                borderRadius="10px"
                fontWeight="700"
                fontSize="12.5px"
              >
                Chat WhatsApp Bengkel
              </Button>
            </a>
          </VStack>

          {/* Col 2: Navigation Links */}
          <VStack align="flex-start" spacing="10px">
            <Text fontSize="14px" fontWeight="800" textTransform="uppercase" letterSpacing="0.5px" mb="4px">
              Jelajahi Bengkel
            </Text>
            <Link href="/services">
              <Text fontSize="13.5px" color={textColorSecondary} _hover={{ color: 'white' }}>
                Layanan & Paket Servis
              </Text>
            </Link>
            <Link href="/shop">
              <Text fontSize="13.5px" color={textColorSecondary} _hover={{ color: 'white' }}>
                Katalog Suku Cadang & Oli
              </Text>
            </Link>
            <Link href="/booking">
              <Text fontSize="13.5px" color={textColorSecondary} _hover={{ color: 'white' }}>
                Booking Jadwal Servis
              </Text>
            </Link>
            <Link href="/about">
              <Text fontSize="13.5px" color={textColorSecondary} _hover={{ color: 'white' }}>
                Profil & Fasilitas Bengkel
              </Text>
            </Link>
            <Link href="/gallery">
              <Text fontSize="13.5px" color={textColorSecondary} _hover={{ color: 'white' }}>
                Galeri Hasil Modifikasi & Pit
              </Text>
            </Link>
            <Link href="/articles">
              <Text fontSize="13.5px" color={textColorSecondary} _hover={{ color: 'white' }}>
                Tips & Edukasi Motor
              </Text>
            </Link>
          </VStack>

          {/* Col 3: Customer Account */}
          <VStack align="flex-start" spacing="10px">
            <Text fontSize="14px" fontWeight="800" textTransform="uppercase" letterSpacing="0.5px" mb="4px">
              Pelanggan
            </Text>
            <Link href="/account">
              <Text fontSize="13.5px" color={textColorSecondary} _hover={{ color: 'white' }}>
                Dashboard Akun Saya
              </Text>
            </Link>
            <Link href="/account/orders">
              <Text fontSize="13.5px" color={textColorSecondary} _hover={{ color: 'white' }}>
                Riwayat & Status Pesanan
              </Text>
            </Link>
            <Link href="/account/bookings">
              <Text fontSize="13.5px" color={textColorSecondary} _hover={{ color: 'white' }}>
                Jadwal Servis Kendaraan
              </Text>
            </Link>
            <Link href="/account/vehicles">
              <Text fontSize="13.5px" color={textColorSecondary} _hover={{ color: 'white' }}>
                Garasi Motor Tersimpan
              </Text>
            </Link>
            <Link href="/cart">
              <Text fontSize="13.5px" color={textColorSecondary} _hover={{ color: 'white' }}>
                Keranjang Belanja
              </Text>
            </Link>
            <Link href="/contact">
              <Text fontSize="13.5px" color={textColorSecondary} _hover={{ color: 'white' }}>
                Hubungi Kami & Lokasi
              </Text>
            </Link>
          </VStack>

          {/* Col 4: Workshop Hours & Contact */}
          <VStack align="flex-start" spacing="12px">
            <Text fontSize="14px" fontWeight="800" textTransform="uppercase" letterSpacing="0.5px" mb="4px">
              Kontak & Jam Buka
            </Text>
            <HStack spacing="10px" align="flex-start">
              <Icon as={MdLocationOn} color="brand.400" mt="2px" />
              <Text fontSize="12.5px" color={textColorSecondary}>
                {settings.businessInfo.address}, {settings.businessInfo.city}, {settings.businessInfo.province}
              </Text>
            </HStack>
            <HStack spacing="10px" align="center">
              <Icon as={MdPhone} color="green.400" />
              <Text fontSize="12.5px" color={textColorSecondary}>
                {settings.businessInfo.phone}
              </Text>
            </HStack>
            <HStack spacing="10px" align="center">
              <Icon as={MdEmail} color="purple.400" />
              <Text fontSize="12.5px" color={textColorSecondary}>
                {settings.businessInfo.email}
              </Text>
            </HStack>
            <HStack spacing="10px" align="center">
              <Icon as={MdAccessTime} color="orange.400" />
              <Text fontSize="12.5px" color={textColorSecondary}>
                Senin - Jumat: {settings.businessInfo.openingHours.weekdays} | Sabtu: {settings.businessInfo.openingHours.saturday}
              </Text>
            </HStack>

            <Box pt="6px">
              <Text fontSize="11px" color="gray.500" mb="6px">
                METODE PEMBAYARAN:
              </Text>
              <HStack spacing="6px" flexWrap="wrap">
                <Badge colorScheme="purple">QRIS Universal</Badge>
                <Badge colorScheme="blue">BCA</Badge>
                <Badge colorScheme="cyan">Mandiri</Badge>
                <Badge colorScheme="green">Tunai Kasir</Badge>
              </HStack>
            </Box>
          </VStack>
        </SimpleGrid>

        <Divider borderColor={borderColor} mb="24px" />

        {/* Bottom Copyright */}
        <Flex justify="space-between" align="center" flexWrap="wrap" gap="10px" fontSize="12.5px" color="gray.500">
          <Text>
            &copy; {new Date().getFullYear()} {settings.businessInfo.name}. All rights reserved.
          </Text>
          <HStack spacing="16px">
            <Link href="/admin/default">
              <Text _hover={{ color: 'brand.400' }}>Admin Portal</Text>
            </Link>
            <Link href="/about">
              <Text _hover={{ color: 'white' }}>Tentang</Text>
            </Link>
            <Link href="/contact">
              <Text _hover={{ color: 'white' }}>Bantuan</Text>
            </Link>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
}
