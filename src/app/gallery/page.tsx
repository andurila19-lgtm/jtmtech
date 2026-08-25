'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Badge,
  Image,
  Flex,
  HStack,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  Button,
} from '@chakra-ui/react';
import { MdBuild, MdPhotoLibrary } from 'react-icons/md';
import Link from 'next/link';
import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import { initialGallery } from 'services/mockData';

export default function GalleryPage() {
  const [selectedCat, setSelectedCat] = useState('ALL');

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const categories = ['ALL', 'Modifikasi', 'Dyno Tuning', 'Service CVT', 'Fasilitas Bengkel'];

  const filteredItems =
    selectedCat === 'ALL'
      ? initialGallery
      : initialGallery.filter((g) => g.category.toLowerCase().includes(selectedCat.toLowerCase()));

  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'navy.900')}>
      <PublicNavbar />

      {/* Header Banner */}
      <Box bg="navy.900" color="white" py={{ base: '40px', md: '60px' }} textAlign="center">
        <Container maxW="1280px">
          <Badge colorScheme="purple" px="10px" py="4px" borderRadius="full" mb="12px" fontSize="12px">
            DOKUMENTASI KARYA
          </Badge>
          <Heading as="h1" fontSize={{ base: '28px', md: '42px' }} fontWeight="900" mb="10px">
            Galeri Pengerjaan & Fasilitas Bengkel
          </Heading>
          <Text fontSize="15px" color="gray.300" maxW="600px" mx="auto">
            Kumpulan dokumentasi servis harian, dyno tuning performa tinggi, perakitan mesin balap, dan modifikasi motor pelanggan kami.
          </Text>
        </Container>
      </Box>

      {/* Category Tabs & Image Grid */}
      <Container maxW="1280px" py="40px">
        <Tabs variant="soft-rounded" colorScheme="purple" mb="30px" onChange={(idx) => setSelectedCat(categories[idx])}>
          <TabList overflowX="auto" pb="6px" gap="8px" justifyContent={{ base: 'flex-start', md: 'center' }}>
            {categories.map((c) => (
              <Tab key={c} fontSize="13.5px" fontWeight="700">
                {c === 'ALL' ? 'Semua Foto' : c}
              </Tab>
            ))}
          </TabList>
        </Tabs>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap="20px">
          {filteredItems.map((item) => (
            <Box
              key={item.id}
              borderRadius="18px"
              bg={bgCard}
              border="1px solid"
              borderColor={borderColor}
              overflow="hidden"
              _hover={{ transform: 'translateY(-3px)', borderColor: 'brand.500' }}
              transition="0.2s"
              boxShadow="sm"
            >
              <Image src={item.imageUrl} alt={item.title} w="100%" h="220px" objectFit="cover" />
              <Box p="16px">
                <Badge colorScheme="purple" fontSize="10.5px" mb="6px">
                  {item.category}
                </Badge>
                <Text fontSize="15px" fontWeight="800" color={textColor} mb="4px">
                  {item.title}
                </Text>
                <Text fontSize="12.5px" color={textColorSecondary} noOfLines={2}>
                  {item.description}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>

        <Box mt="50px" p="30px" borderRadius="20px" bg={useColorModeValue('secondaryGray.300', 'navy.950')} textAlign="center">
          <Heading as="h3" fontSize="20px" fontWeight="800" color={textColor} mb="8px">
            Ingin Motor Anda Dikerjakan dengan Standar Presisi Ini?
          </Heading>
          <Text fontSize="14px" color={textColorSecondary} maxW="500px" mx="auto" mb="20px">
            Daftarkan jadwal servis motor Anda sekarang untuk mendapatkan slot antrean prioritas.
          </Text>
          <Link href="/booking">
            <Button colorScheme="purple" size="md" borderRadius="12px" fontWeight="800" leftIcon={<MdBuild />}>
              Booking Servis Sekarang
            </Button>
          </Link>
        </Box>
      </Container>

      <PublicFooter />
    </Box>
  );
}
