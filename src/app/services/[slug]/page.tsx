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
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import {
  MdBuild,
  MdSchedule,
  MdCheckCircle,
  MdArrowBack,
  MdShield,
  MdStar,
  MdChevronRight,
} from 'react-icons/md';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import { useStore } from 'contexts/StoreContext';

export default function SingleServicePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { services } = useStore();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const service = services.find((s) => s.slug === slug || s.id === slug) || services[0];

  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'navy.900')}>
      <PublicNavbar />

      <Container maxW="1280px" py="30px">
        {/* Breadcrumb */}
        <Breadcrumb spacing="8px" separator={<MdChevronRight color="gray.500" />} fontSize="13px" mb="24px">
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/">
              Beranda
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/services">
              Layanan
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="brand.500" fontWeight="700">
              {service.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <SimpleGrid columns={{ base: 1, lg: 3 }} gap="40px">
          {/* Main Service Content (2 Cols) */}
          <Box gridColumn={{ base: 'span 1', lg: 'span 2' }}>
            <Box borderRadius="24px" overflow="hidden" mb="24px" boxShadow="md">
              <Image src={service.image} alt={service.name} w="100%" h={{ base: '220px', md: '360px' }} objectFit="cover" />
            </Box>

            <Badge colorScheme="purple" mb="8px" fontSize="12px">
              {service.category}
            </Badge>
            <Heading as="h1" fontSize={{ base: '24px', md: '34px' }} fontWeight="900" color={textColor} mb="12px">
              {service.name}
            </Heading>

            <Text fontSize="15px" color={textColorSecondary} lineHeight="1.8" mb="30px">
              {service.description}
            </Text>

            <Divider borderColor={borderColor} mb="24px" />

            <Heading as="h3" fontSize="18px" fontWeight="800" color={textColor} mb="16px">
              Item Pengerjaan & Manfaat Paket:
            </Heading>

            <VStack spacing="12px" align="stretch" mb="30px">
              <HStack spacing="12px" p="12px" bg={useColorModeValue('gray.50', 'navy.800')} borderRadius="12px">
                <Icon as={MdCheckCircle} color="green.500" w="20px" h="20px" />
                <Box>
                  <Text fontSize="14px" fontWeight="700" color={textColor}>
                    Pembersihan & Detailing Komponen
                  </Text>
                  <Text fontSize="12px" color={textColorSecondary}>
                    Bongkar total dan cuci part menggunakan cairan degreaser khusus otomotif.
                  </Text>
                </Box>
              </HStack>

              <HStack spacing="12px" p="12px" bg={useColorModeValue('gray.50', 'navy.800')} borderRadius="12px">
                <Icon as={MdCheckCircle} color="green.500" w="20px" h="20px" />
                <Box>
                  <Text fontSize="14px" fontWeight="700" color={textColor}>
                    Greasing Suhu Tinggi (High-Temp)
                  </Text>
                  <Text fontSize="12px" color={textColorSecondary}>
                    Pelumasan bearing dan pulley dengan gemuk khusus anti-lumer performa tinggi.
                  </Text>
                </Box>
              </HStack>

              <HStack spacing="12px" p="12px" bg={useColorModeValue('gray.50', 'navy.800')} borderRadius="12px">
                <Icon as={MdCheckCircle} color="green.500" w="20px" h="20px" />
                <Box>
                  <Text fontSize="14px" fontWeight="700" color={textColor}>
                    Pengecekan Komputer & Kalibrasi Sensor
                  </Text>
                  <Text fontSize="12px" color={textColorSecondary}>
                    Reset TPS, diagnosa error kode MIL, dan setting altitude motor injeksi.
                  </Text>
                </Box>
              </HStack>

              <HStack spacing="12px" p="12px" bg={useColorModeValue('gray.50', 'navy.800')} borderRadius="12px">
                <Icon as={MdShield} color="brand.500" w="20px" h="20px" />
                <Box>
                  <Text fontSize="14px" fontWeight="700" color={textColor}>
                    Garansi Servis 14 Hari
                  </Text>
                  <Text fontSize="12px" color={textColorSecondary}>
                    Jika keluhan belum sembuh atau timbul kendala, perbaikan ulang gratis.
                  </Text>
                </Box>
              </HStack>
            </VStack>
          </Box>

          {/* Right Sidebar: Booking Card (1 Col) */}
          <Box>
            <Box
              p="24px"
              borderRadius="24px"
              bg={bgCard}
              border="2px solid"
              borderColor="brand.500"
              boxShadow="xl"
              position="sticky"
              top="100px"
            >
              <Text fontSize="12px" color={textColorSecondary} textTransform="uppercase" fontWeight="800">
                Estimasi Biaya Jasa:
              </Text>
              <Text fontSize="28px" fontWeight="900" color="brand.500" mb="12px">
                Rp {service.price.toLocaleString('id-ID')}
              </Text>

              <HStack spacing="8px" color={textColor} fontSize="13px" mb="18px">
                <Icon as={MdSchedule} color="brand.500" />
                <Text>Durasi Pengerjaan: <strong>{service.estimatedDuration}</strong></Text>
              </HStack>

              <Link href={`/booking?serviceId=${service.id}`}>
                <Button
                  w="100%"
                  size="lg"
                  colorScheme="purple"
                  h="50px"
                  borderRadius="14px"
                  fontWeight="800"
                  leftIcon={<MdBuild />}
                  mb="12px"
                >
                  Booking Servis Ini
                </Button>
              </Link>

              <Link href="/services">
                <Button w="100%" variant="outline" borderRadius="14px" size="sm">
                  &larr; Lihat Layanan Lain
                </Button>
              </Link>

              <Box mt="20px" pt="16px" borderTop="1px solid" borderColor={borderColor} fontSize="12px" color={textColorSecondary}>
                <Text fontWeight="700" color={textColor} mb="4px">
                  Catatan Penting:
                </Text>
                <Text>
                  Biaya di atas adalah jasa servis. Jika terdapat penggantian suku cadang atau oli tambahan, mekanik akan mengonfirmasi persetujuan Anda terlebih dahulu.
                </Text>
              </Box>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>

      <PublicFooter />
    </Box>
  );
}
