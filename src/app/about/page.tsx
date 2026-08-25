'use client';

import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Badge,
  Button,
  Image,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  MdBuild,
  MdVerified,
  MdSpeed,
  MdShield,
  MdTwoWheeler,
  MdGroup,
} from 'react-icons/md';
import Link from 'next/link';
import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import { useStore } from 'contexts/StoreContext';

export default function AboutPage() {
  const { settings } = useStore();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const bgSubtle = useColorModeValue('secondaryGray.300', 'navy.950');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'navy.900')}>
      <PublicNavbar />

      {/* Header Banner */}
      <Box bg="navy.900" color="white" py={{ base: '40px', md: '60px' }} textAlign="center">
        <Container maxW="1280px">
          <Badge colorScheme="purple" px="10px" py="4px" borderRadius="full" mb="12px" fontSize="12px">
            PROFIL PERUSAHAAN
          </Badge>
          <Heading as="h1" fontSize={{ base: '28px', md: '42px' }} fontWeight="900" mb="10px">
            Tentang {settings.businessInfo.name}
          </Heading>
          <Text fontSize="15px" color="gray.300" maxW="600px" mx="auto">
            Membangun standar baru perawatan motor profesional berbasis teknologi diagnostik presisi dan keterbukaan kepada konsumen.
          </Text>
        </Container>
      </Box>

      {/* Story & Facilities */}
      <Container maxW="1280px" py="50px">
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="40px" alignItems="center" mb="60px">
          <Box borderRadius="24px" overflow="hidden" boxShadow="xl">
            <Image
              src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=900&auto=format&fit=crop&q=80"
              alt="Fasilitas Bengkel JTM Tech"
              w="100%"
              h={{ base: '260px', md: '380px' }}
              objectFit="cover"
            />
          </Box>

          <Box>
            <Badge colorScheme="purple" mb="8px">
              SEJARAH & KOMITMEN
            </Badge>
            <Heading as="h2" fontSize={{ base: '22px', md: '30px' }} fontWeight="900" color={textColor} mb="12px">
              Didirikan oleh Penghobi Balap, Didedikasikan untuk Semua Pengendara
            </Heading>
            <Text fontSize="14px" color={textColorSecondary} lineHeight="1.8" mb="14px">
              <strong>{settings.businessInfo.name}</strong> bermula dari kecintaan kami terhadap dunia balap motor dan tuning mesin presisi. Kami melihat banyak pemilik motor yang kesulitan menemukan bengkel yang benar-benar jujur, transparan dalam penetapan harga, dan memiliki alat diagnostik yang memadai.
            </Text>
            <Text fontSize="14px" color={textColorSecondary} lineHeight="1.8" mb="20px">
              Kini, kami telah berkembang menjadi bengkel terpadu modern dengan pit servis bersertifikat, mesin dyno test, ultrasonic cleaner injektor, serta toko online suku cadang original yang melayani ribuan pelanggan setiap tahunnya.
            </Text>

            <HStack spacing="20px" pt="10px">
              <Box>
                <Text fontSize="28px" fontWeight="900" color="brand.500">8+ Tahun</Text>
                <Text fontSize="12px" color={textColorSecondary}>Pengalaman Bengkel</Text>
              </Box>
              <Box>
                <Text fontSize="28px" fontWeight="900" color="green.500">15.000+</Text>
                <Text fontSize="12px" color={textColorSecondary}>Motor Diservis</Text>
              </Box>
              <Box>
                <Text fontSize="28px" fontWeight="900" color="purple.500">100%</Text>
                <Text fontSize="12px" color={textColorSecondary}>Part Asli Bergaransi</Text>
              </Box>
            </HStack>
          </Box>
        </SimpleGrid>

        {/* Facilities Grid */}
        <Box mb="60px">
          <Box textAlign="center" maxW="600px" mx="auto" mb="30px">
            <Badge colorScheme="purple" mb="6px">FASILITAS BENGKEL</Badge>
            <Heading as="h3" fontSize={{ base: '20px', md: '28px' }} fontWeight="900" color={textColor}>
              Peralatan Modern Berstandar Pabrikan
            </Heading>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
            <Box p="20px" borderRadius="18px" bg={bgCard} border="1px solid" borderColor={borderColor}>
              <Icon as={MdSpeed} w="32px" h="32px" color="brand.500" mb="12px" />
              <Text fontSize="16px" fontWeight="800" color={textColor} mb="6px">
                Mesin Dyno Test & Remap ECU
              </Text>
              <Text fontSize="13px" color={textColorSecondary}>
                Pengujian kurva tenaga (Horsepower & Torsi) secara akurat untuk kalibrasi injeksi dan setting motor harian maupun race.
              </Text>
            </Box>

            <Box p="20px" borderRadius="18px" bg={bgCard} border="1px solid" borderColor={borderColor}>
              <Icon as={MdBuild} w="32px" h="32px" color="green.500" mb="12px" />
              <Text fontSize="16px" fontWeight="800" color={textColor} mb="6px">
                Pit Lift & Ultrasonic Cleaner
              </Text>
              <Text fontSize="13px" color={textColorSecondary}>
                Pembersihan injektor dengan gelombang ultrasonik untuk mengembalikan semprotan bahan bakar yang sempurna dan efisien.
              </Text>
            </Box>

            <Box p="20px" borderRadius="18px" bg={bgCard} border="1px solid" borderColor={borderColor}>
              <Icon as={MdVerified} w="32px" h="32px" color="orange.500" mb="12px" />
              <Text fontSize="16px" fontWeight="800" color={textColor} mb="6px">
                Gudang Suku Cadang Terintegrasi
              </Text>
              <Text fontSize="13px" color={textColorSecondary}>
                Stok suku cadang fast-moving dan oli selalu siap di lokasi tanpa perlu menunggu pengiriman dari toko luar.
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Container>

      <PublicFooter />
    </Box>
  );
}
