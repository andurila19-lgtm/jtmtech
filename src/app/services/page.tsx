'use client';

import React, { useState } from 'react';
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
  Tabs,
  TabList,
  Tab,
} from '@chakra-ui/react';
import { MdBuild, MdSchedule, MdCheckCircle, MdArrowForward, MdStar } from 'react-icons/md';
import Link from 'next/link';
import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import { useStore } from 'contexts/StoreContext';

export default function ServicesPage() {
  const { services } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const bgSubtle = useColorModeValue('secondaryGray.300', 'navy.950');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const categories = [
    { label: 'Semua Layanan', value: 'ALL' },
    { label: 'Servis CVT', value: 'Service Spesialis CVT Matic' },
    { label: 'Tune Up & Injeksi', value: 'Service Berkala & Reguler' },
    { label: 'Overhaul & Mesin', value: 'Overhaul & Heavy Repair' },
  ];

  const filteredServices =
    selectedCategory === 'ALL'
      ? services
      : services.filter((s) => s.category.toLowerCase().includes(selectedCategory.toLowerCase()) || s.category === selectedCategory);

  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'navy.900')}>
      <PublicNavbar />

      {/* Header Banner */}
      <Box bg="navy.900" color="white" py={{ base: '40px', md: '60px' }} textAlign="center">
        <Container maxW="1280px">
          <Badge colorScheme="purple" px="10px" py="4px" borderRadius="full" mb="12px" fontSize="12px">
            STANDAR PENGERJAAN PRESISI
          </Badge>
          <Heading as="h1" fontSize={{ base: '28px', md: '42px' }} fontWeight="900" mb="10px">
            Paket Layanan Servis Bengkel
          </Heading>
          <Text fontSize="15px" color="gray.300" maxW="600px" mx="auto">
            Pilihan perawatan motor lengkap mulai dari servis CVT, tune up injeksi, ganti oli, hingga overhaul mesin bergaransi resmi.
          </Text>
        </Container>
      </Box>

      {/* Category Tabs & Service Grid */}
      <Container maxW="1280px" py="40px">
        <Tabs variant="soft-rounded" colorScheme="purple" mb="30px" onChange={(idx) => setSelectedCategory(categories[idx].value)}>
          <TabList overflowX="auto" pb="6px" gap="8px" justifyContent={{ base: 'flex-start', md: 'center' }}>
            {categories.map((c) => (
              <Tab key={c.value} fontSize="13.5px" fontWeight="700">
                {c.label}
              </Tab>
            ))}
          </TabList>
        </Tabs>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="24px">
          {filteredServices.map((srv) => (
            <Box
              key={srv.id}
              borderRadius="20px"
              bg={bgCard}
              border="1px solid"
              borderColor={borderColor}
              overflow="hidden"
              _hover={{ borderColor: 'brand.500', transform: 'translateY(-3px)' }}
              transition="0.2s"
              display="flex"
              flexDirection="column"
              boxShadow="sm"
            >
              <Box position="relative">
                <Image src={srv.image} alt={srv.name} w="100%" h="200px" objectFit="cover" />
                <Badge
                  position="absolute"
                  top="12px"
                  right="12px"
                  colorScheme="purple"
                  borderRadius="full"
                  px="8px"
                  py="3px"
                  fontSize="11px"
                >
                  <HStack spacing="4px">
                    <Icon as={MdSchedule} />
                    <Text>{srv.estimatedDuration}</Text>
                  </HStack>
                </Badge>
              </Box>

              <Box p="20px" flex="1" display="flex" flexDirection="column">
                <Text fontSize="11.5px" color="gray.400" fontWeight="700" textTransform="uppercase" mb="4px">
                  {srv.category}
                </Text>
                <Link href={`/services/${srv.slug}`}>
                  <Heading as="h3" fontSize="18px" fontWeight="800" color={textColor} mb="8px" _hover={{ color: 'brand.500' }}>
                    {srv.name}
                  </Heading>
                </Link>
                <Text fontSize="13px" color={textColorSecondary} mb="16px" flex="1" lineHeight="1.6">
                  {srv.description}
                </Text>

                <VStack spacing="6px" align="stretch" mb="16px" py="10px" borderTop="1px solid" borderBottom="1px solid" borderColor={borderColor}>
                  <HStack spacing="8px" fontSize="12px" color={textColor}>
                    <Icon as={MdCheckCircle} color="green.500" />
                    <Text>Pembersihan & Pengecekan 12 Titik</Text>
                  </HStack>
                  <HStack spacing="8px" fontSize="12px" color={textColor}>
                    <Icon as={MdCheckCircle} color="green.500" />
                    <Text>Garansi Servis 14 Hari</Text>
                  </HStack>
                </VStack>

                <Flex justify="space-between" align="center">
                  <Box>
                    <Text fontSize="11px" color={textColorSecondary}>
                      Tarif Mulai
                    </Text>
                    <Text fontSize="18px" fontWeight="900" color="brand.500">
                      Rp {srv.price.toLocaleString('id-ID')}
                    </Text>
                  </Box>

                  <HStack spacing="8px">
                    <Link href={`/services/${srv.slug}`}>
                      <Button size="sm" variant="ghost" colorScheme="purple">
                        Rincian
                      </Button>
                    </Link>
                    <Link href={`/booking?serviceId=${srv.id}`}>
                      <Button size="sm" colorScheme="purple" borderRadius="10px" fontWeight="800">
                        Booking
                      </Button>
                    </Link>
                  </HStack>
                </Flex>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      {/* Booking CTA Banner */}
      <Box py="40px" bg={bgSubtle} borderTop="1px solid" borderColor={borderColor}>
        <Container maxW="1280px" textAlign="center">
          <Heading as="h3" fontSize="22px" fontWeight="900" color={textColor} mb="8px">
            Ingin Konsultasi Masalah Motor Anda Terlebih Dahulu?
          </Heading>
          <Text fontSize="14px" color={textColorSecondary} maxW="600px" mx="auto" mb="20px">
            Mekanik kami siap mendiagnosa dan memberikan rekomendasi perbaikan yang tepat sebelum pengerjaan.
          </Text>
          <HStack spacing="14px" justify="center">
            <Link href="/booking">
              <Button colorScheme="purple" size="md" borderRadius="12px" fontWeight="800" leftIcon={<MdBuild />}>
                Booking Jadwal Servis
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="md" borderRadius="12px">
                Hubungi Bengkel
              </Button>
            </Link>
          </HStack>
        </Container>
      </Box>

      <PublicFooter />
    </Box>
  );
}
