'use client';

import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  SimpleGrid,
  HStack,
  VStack,
  Badge,
  Icon,
  Image,
  Input,
  Select,
  useColorModeValue,
  useToast,
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import {
  MdBuild,
  MdShoppingCart,
  MdStar,
  MdCheckCircle,
  MdLocationOn,
  MdPhone,
  MdCalendarToday,
  MdArrowForward,
  MdDirectionsBike,
  MdVerified,
  MdSpeed,
  MdTwoWheeler,
  MdLocalOffer,
  MdArticle,
  MdSchedule,
  MdSearch,
} from 'react-icons/md';
import { IoLogoWhatsapp } from 'react-icons/io';
import Link from 'next/link';
import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import { useStore } from 'contexts/StoreContext';
import { initialCategories } from 'services/mockData';
import { Product } from 'types/workshop';

export default function HomePage() {
  const { products, services, articles, settings, addToCart } = useStore();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgLight = useColorModeValue('white', 'navy.900');
  const bgCard = useColorModeValue('white', 'navy.800');
  const bgSubtle = useColorModeValue('secondaryGray.300', 'navy.950');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  // "Find Parts By Motorcycle" state
  const [selectedBrand, setSelectedBrand] = useState('Honda');
  const [selectedModel, setSelectedModel] = useState('Honda Vario 160');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [isMotorFilterSearched, setIsMotorFilterSearched] = useState(false);

  // Shop category tab filter state
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('ALL');

  const motorcycleModels: Record<string, string[]> = {
    Honda: ['Honda Vario 160', 'Honda Vario 125', 'Honda PCX 160', 'Honda ADV 160', 'Honda Beat FI', 'Honda Scoopy'],
    Yamaha: ['Yamaha NMAX 155', 'Yamaha Aerox 155', 'Yamaha XMAX 250', 'Yamaha Mio M3', 'Yamaha Fazzio'],
    Kawasaki: ['Kawasaki Ninja ZX25R', 'Kawasaki KLX 150', 'Kawasaki W175'],
    Vespa: ['Vespa Sprint 150', 'Vespa Primavera 150', 'Vespa GTS 300'],
    Suzuki: ['Suzuki Satria F150', 'Suzuki GSX-R150', 'Suzuki Address'],
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel(motorcycleModels[brand]?.[0] || '');
    setIsMotorFilterSearched(false);
  };

  const handleSearchCompatibleParts = () => {
    setIsMotorFilterSearched(true);
  };

  const compatibleProducts = isMotorFilterSearched
    ? products.filter((p) =>
        p.compatibleVehicles.some(
          (v) =>
            v.toLowerCase().includes(selectedModel.toLowerCase()) ||
            selectedModel.toLowerCase().includes(v.toLowerCase()) ||
            v.toLowerCase().includes(selectedBrand.toLowerCase())
        )
      )
    : [];

  const filteredFeaturedProducts =
    selectedCategoryTab === 'ALL'
      ? products.slice(0, 8)
      : products.filter((p) => p.category === selectedCategoryTab).slice(0, 8);

  const handleAddToCartClick = (p: Product) => {
    addToCart(p, 1);
    toast({
      title: 'Ditambahkan ke Keranjang',
      description: `${p.name} berhasil dimasukkan ke keranjang belanja.`,
      status: 'success',
      duration: 2500,
      position: 'top-right',
    });
  };

  return (
    <Box minH="100vh" bg={bgLight}>
      <PublicNavbar />

      {/* 1. HERO SECTION */}
      <Box
        position="relative"
        bg="navy.900"
        color="white"
        pt={{ base: '40px', md: '70px' }}
        pb={{ base: '50px', md: '80px' }}
        overflow="hidden"
      >
        {/* Subtle Background Glow */}
        <Box
          position="absolute"
          top="-10%"
          right="-5%"
          w="500px"
          h="500px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(66, 42, 251, 0.35) 0%, rgba(0,0,0,0) 70%)"
          pointerEvents="none"
        />

        <Container maxW="1280px" position="relative" zIndex="2">
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: '30px', lg: '50px' }} alignItems="center">
            {/* Left Hero Text */}
            <Box>
              <HStack spacing="8px" mb="16px">
                <Badge colorScheme="purple" px="10px" py="4px" borderRadius="full" fontSize="12px" fontWeight="800">
                  ★ Bengkel Spesialis & Suku Cadang Original
                </Badge>
              </HStack>

              <Heading
                as="h1"
                fontSize={{ base: '30px', sm: '38px', md: '48px' }}
                fontWeight="900"
                lineHeight="1.15"
                letterSpacing="-1px"
                mb="16px"
              >
                Servis Motor Lebih Mudah.{' '}
                <Text as="span" color="brand.400">
                  Sparepart Berkualitas
                </Text>
                , Ditangani Profesional.
              </Heading>

              <Text fontSize={{ base: '14.5px', md: '16px' }} color="gray.300" mb="26px" lineHeight="1.6" maxW="540px">
                Percayakan perawatan motor Anda kepada teknisi bersertifikat. Nikmati kemudahan booking jadwal servis tanpa antre dan pesan suku cadang asli bergaransi langsung secara online.
              </Text>

              <HStack spacing="14px" flexWrap="wrap">
                <Link href="/booking">
                  <Button
                    size="lg"
                    colorScheme="purple"
                    leftIcon={<MdBuild />}
                    h="52px"
                    px="24px"
                    fontSize="15px"
                    fontWeight="800"
                    borderRadius="14px"
                    boxShadow="0 4px 20px rgba(66, 42, 251, 0.4)"
                  >
                    Booking Servis Sekarang
                  </Button>
                </Link>

                <Link href="/shop">
                  <Button
                    size="lg"
                    variant="outline"
                    color="white"
                    borderColor="whiteAlpha.400"
                    _hover={{ bg: 'whiteAlpha.200' }}
                    leftIcon={<MdShoppingCart />}
                    h="52px"
                    px="24px"
                    fontSize="15px"
                    borderRadius="14px"
                  >
                    Lihat Katalog Sparepart
                  </Button>
                </Link>
              </HStack>

              {/* Mini Quick Stats */}
              <HStack spacing="24px" mt="32px" pt="24px" borderTop="1px solid" borderColor="whiteAlpha.200">
                <Box>
                  <Text fontSize="20px" fontWeight="900" color="white">
                    4.9 / 5.0
                  </Text>
                  <HStack spacing="2px" color="orange.400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Icon as={MdStar} key={i} w="14px" h="14px" />
                    ))}
                  </HStack>
                  <Text fontSize="11px" color="gray.400">
                    500+ Ulasan Pelanggan
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="20px" fontWeight="900" color="brand.400">
                    100% Asli
                  </Text>
                  <Text fontSize="11px" color="gray.400">
                    Garansi Suku Cadang Original
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="20px" fontWeight="900" color="green.400">
                    30 Menit
                  </Text>
                  <Text fontSize="11px" color="gray.400">
                    Servis Cepat Selesai
                  </Text>
                </Box>
              </HStack>
            </Box>

            {/* Right Hero Image Card */}
            <Box position="relative">
              <Box
                borderRadius="24px"
                overflow="hidden"
                boxShadow="0 20px 50px rgba(0, 0, 0, 0.4)"
                border="2px solid"
                borderColor="whiteAlpha.200"
                position="relative"
              >
                <Image
                  src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=900&auto=format&fit=crop&q=80"
                  alt="Bengkel Motor Profesional JTM Tech"
                  w="100%"
                  h={{ base: '260px', sm: '350px', md: '420px' }}
                  objectFit="cover"
                />

                {/* Floating Service Badge */}
                <Box
                  position="absolute"
                  bottom="16px"
                  left="16px"
                  right="16px"
                  p="14px"
                  bg="rgba(17, 28, 68, 0.9)"
                  backdropFilter="blur(8px)"
                  borderRadius="16px"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                >
                  <Flex justify="space-between" align="center">
                    <HStack spacing="10px">
                      <Box p="8px" borderRadius="10px" bg="brand.500" color="white">
                        <Icon as={MdSpeed} w="20px" h="20px" />
                      </Box>
                      <Box>
                        <Text fontSize="13px" fontWeight="800" color="white">
                          Fasilitas Dyno Test & Pit Lift
                        </Text>
                        <Text fontSize="11px" color="gray.300">
                          Diagnosa Injeksi & Remap ECU Komputer
                        </Text>
                      </Box>
                    </HStack>
                    <Badge colorScheme="green">Siap Pakai</Badge>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* 2. TRUST INDICATORS BAR */}
      <Box bg={bgSubtle} py="20px" borderBottom="1px solid" borderColor={borderColor}>
        <Container maxW="1280px">
          <SimpleGrid columns={{ base: 2, md: 4 }} gap="16px">
            <HStack spacing="10px">
              <Icon as={MdVerified} color="brand.500" w="24px" h="24px" />
              <Box>
                <Text fontSize="13px" fontWeight="800" color={textColor}>
                  Teknisi Berpengalaman
                </Text>
                <Text fontSize="11px" color={textColorSecondary}>
                  Sertifikasi resmi pabrikan
                </Text>
              </Box>
            </HStack>

            <HStack spacing="10px">
              <Icon as={MdCheckCircle} color="green.500" w="24px" h="24px" />
              <Box>
                <Text fontSize="13px" fontWeight="800" color={textColor}>
                  Sparepart 100% Asli
                </Text>
                <Text fontSize="11px" color={textColorSecondary}>
                  Langsung distributor resmi
                </Text>
              </Box>
            </HStack>

            <HStack spacing="10px">
              <Icon as={MdLocalOffer} color="orange.500" w="24px" h="24px" />
              <Box>
                <Text fontSize="13px" fontWeight="800" color={textColor}>
                  Harga Transparan
                </Text>
                <Text fontSize="11px" color={textColorSecondary}>
                  Estimasi biaya sebelum pengerjaan
                </Text>
              </Box>
            </HStack>

            <HStack spacing="10px">
              <Icon as={MdCalendarToday} color="purple.500" w="24px" h="24px" />
              <Box>
                <Text fontSize="13px" fontWeight="800" color={textColor}>
                  Booking Online Pasti
                </Text>
                <Text fontSize="11px" color={textColorSecondary}>
                  Tanpa perlu antre di bengkel
                </Text>
              </Box>
            </HStack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* 3. QUICK ACTIONS SHORTCUTS */}
      <Container maxW="1280px" py="30px">
        <SimpleGrid columns={{ base: 2, md: 4 }} gap="14px">
          <Link href="/booking">
            <Box
              p="16px"
              borderRadius="16px"
              bg={bgCard}
              border="1px solid"
              borderColor={borderColor}
              _hover={{ borderColor: 'brand.500', transform: 'translateY(-2px)' }}
              transition="0.2s"
              textAlign="center"
            >
              <Icon as={MdBuild} w="32px" h="32px" color="brand.500" mb="8px" />
              <Text fontSize="14px" fontWeight="800" color={textColor}>
                Booking Servis
              </Text>
              <Text fontSize="11px" color={textColorSecondary}>
                Atur jadwal kedatangan
              </Text>
            </Box>
          </Link>

          <Link href="/shop">
            <Box
              p="16px"
              borderRadius="16px"
              bg={bgCard}
              border="1px solid"
              borderColor={borderColor}
              _hover={{ borderColor: 'brand.500', transform: 'translateY(-2px)' }}
              transition="0.2s"
              textAlign="center"
            >
              <Icon as={MdShoppingCart} w="32px" h="32px" color="green.500" mb="8px" />
              <Text fontSize="14px" fontWeight="800" color={textColor}>
                Belanja Sparepart
              </Text>
              <Text fontSize="11px" color={textColorSecondary}>
                Oli, busi, kampas rem, CVT
              </Text>
            </Box>
          </Link>

          <Link href="/about#promo">
            <Box
              p="16px"
              borderRadius="16px"
              bg={bgCard}
              border="1px solid"
              borderColor={borderColor}
              _hover={{ borderColor: 'brand.500', transform: 'translateY(-2px)' }}
              transition="0.2s"
              textAlign="center"
            >
              <Icon as={MdLocalOffer} w="32px" h="32px" color="orange.500" mb="8px" />
              <Text fontSize="14px" fontWeight="800" color={textColor}>
                Cek Promo Aktif
              </Text>
              <Text fontSize="11px" color={textColorSecondary}>
                Voucher diskon servis & part
              </Text>
            </Box>
          </Link>

          <Link href="/contact">
            <Box
              p="16px"
              borderRadius="16px"
              bg={bgCard}
              border="1px solid"
              borderColor={borderColor}
              _hover={{ borderColor: 'brand.500', transform: 'translateY(-2px)' }}
              transition="0.2s"
              textAlign="center"
            >
              <Icon as={MdLocationOn} w="32px" h="32px" color="red.500" mb="8px" />
              <Text fontSize="14px" fontWeight="800" color={textColor}>
                Lokasi Bengkel
              </Text>
              <Text fontSize="11px" color={textColorSecondary}>
                Petunjuk arah & jam buka
              </Text>
            </Box>
          </Link>
        </SimpleGrid>
      </Container>

      {/* 4. SERVICES SECTION */}
      <Box py="40px" bg={bgSubtle}>
        <Container maxW="1280px">
          <Flex justify="space-between" align="flex-end" mb="24px" flexWrap="wrap" gap="10px">
            <Box>
              <Badge colorScheme="purple" mb="6px">
                LAYANAN PERAWATAN
              </Badge>
              <Heading as="h2" fontSize={{ base: '22px', md: '30px' }} fontWeight="900" color={textColor}>
                Paket Layanan Servis Bengkel
              </Heading>
              <Text fontSize="13.5px" color={textColorSecondary}>
                Dikerjakan oleh teknisi ahli menggunakan peralatan diagnosa canggih.
              </Text>
            </Box>

            <Link href="/services">
              <Button rightIcon={<MdArrowForward />} variant="outline" size="sm" borderRadius="10px">
                Lihat Semua Layanan
              </Button>
            </Link>
          </Flex>

          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="20px">
            {services.slice(0, 4).map((srv) => (
              <Box
                key={srv.id}
                borderRadius="18px"
                bg={bgCard}
                border="1px solid"
                borderColor={borderColor}
                overflow="hidden"
                _hover={{ borderColor: 'brand.500', transform: 'translateY(-3px)' }}
                transition="0.2s"
                display="flex"
                flexDirection="column"
              >
                <Image src={srv.image} alt={srv.name} w="100%" h="160px" objectFit="cover" />
                <Box p="16px" flex="1" display="flex" flexDirection="column">
                  <Badge colorScheme="purple" alignSelf="flex-start" mb="8px" fontSize="10.5px">
                    Estimasi {srv.estimatedDuration}
                  </Badge>
                  <Text fontSize="16px" fontWeight="800" color={textColor} mb="6px">
                    {srv.name}
                  </Text>
                  <Text fontSize="12.5px" color={textColorSecondary} mb="16px" flex="1" noOfLines={3}>
                    {srv.description}
                  </Text>

                  <Flex justify="space-between" align="center" pt="12px" borderTop="1px solid" borderColor={borderColor}>
                    <Box>
                      <Text fontSize="11px" color={textColorSecondary}>
                        Mulai dari
                      </Text>
                      <Text fontSize="15px" fontWeight="900" color="brand.500">
                        Rp {srv.price.toLocaleString('id-ID')}
                      </Text>
                    </Box>
                    <Link href={`/booking?serviceId=${srv.id}`}>
                      <Button size="sm" colorScheme="purple" borderRadius="10px">
                        Booking
                      </Button>
                    </Link>
                  </Flex>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* 5. SHOP SECTION (FEATURED PRODUCTS) */}
      <Container maxW="1280px" py="50px">
        <Flex justify="space-between" align="flex-end" mb="20px" flexWrap="wrap" gap="10px">
          <Box>
            <Badge colorScheme="green" mb="6px">
              SUKU CADANG & OLI
            </Badge>
            <Heading as="h2" fontSize={{ base: '22px', md: '30px' }} fontWeight="900" color={textColor}>
              Sparepart & Produk Pilihan
            </Heading>
            <Text fontSize="13.5px" color={textColorSecondary}>
              Suku cadang original dan cairan pelumas performa tinggi untuk segala jenis motor.
            </Text>
          </Box>

          <Link href="/shop">
            <Button rightIcon={<MdArrowForward />} variant="outline" size="sm" borderRadius="10px">
              Lihat Semua Produk
            </Button>
          </Link>
        </Flex>

        {/* Category Tabs */}
        <Tabs variant="soft-rounded" colorScheme="purple" mb="24px" onChange={(idx) => {
          const catList = ['ALL', 'Oli & Pelumas Mesin', 'Sparepart CVT Matic', 'Sistem Pengereman', 'Mesin & Performa (Tune Up)', 'Kelistrikan & Aki'];
          setSelectedCategoryTab(catList[idx]);
        }}>
          <TabList overflowX="auto" pb="6px" gap="6px">
            <Tab fontSize="13px" fontWeight="700">Semua</Tab>
            <Tab fontSize="13px" fontWeight="700">Oli & Pelumas</Tab>
            <Tab fontSize="13px" fontWeight="700">CVT Matic</Tab>
            <Tab fontSize="13px" fontWeight="700">Pengereman</Tab>
            <Tab fontSize="13px" fontWeight="700">Mesin Tune Up</Tab>
            <Tab fontSize="13px" fontWeight="700">Aki & Listrik</Tab>
          </TabList>
        </Tabs>

        {/* Product Grid */}
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={{ base: '12px', md: '20px' }}>
          {filteredFeaturedProducts.map((prod) => (
            <Box
              key={prod.id}
              borderRadius="16px"
              bg={bgCard}
              border="1px solid"
              borderColor={borderColor}
              overflow="hidden"
              _hover={{ borderColor: 'brand.500', transform: 'translateY(-2px)' }}
              transition="0.2s"
              display="flex"
              flexDirection="column"
            >
              <Link href={`/shop/${prod.id}`}>
                <Box position="relative">
                  <Image src={prod.images[0]} alt={prod.name} w="100%" h={{ base: '140px', md: '180px' }} objectFit="cover" />
                  {prod.discountPrice && (
                    <Badge position="absolute" top="8px" left="8px" colorScheme="red" fontSize="10px" borderRadius="full" px="6px">
                      DISKON
                    </Badge>
                  )}
                </Box>
              </Link>

              <Box p={{ base: '10px', md: '14px' }} flex="1" display="flex" flexDirection="column">
                <Text fontSize="11px" color="gray.400" fontWeight="700" textTransform="uppercase">
                  {prod.brand}
                </Text>
                <Link href={`/shop/${prod.id}`}>
                  <Text fontSize={{ base: '13px', md: '14px' }} fontWeight="700" color={textColor} noOfLines={2} mb="6px">
                    {prod.name}
                  </Text>
                </Link>

                <Text fontSize="10.5px" color={textColorSecondary} noOfLines={1} mb="8px">
                  Cocok: {prod.compatibleVehicles.slice(0, 2).join(', ')}
                </Text>

                <Box mt="auto">
                  <Flex align="baseline" gap="6px" flexWrap="wrap" mb="10px">
                    <Text fontSize={{ base: '14px', md: '16px' }} fontWeight="900" color="brand.500">
                      Rp {(prod.discountPrice || prod.price).toLocaleString('id-ID')}
                    </Text>
                    {prod.discountPrice && (
                      <Text fontSize="11px" color="gray.400" as="s">
                        Rp {prod.price.toLocaleString('id-ID')}
                      </Text>
                    )}
                  </Flex>

                  <Button
                    size="sm"
                    w="100%"
                    colorScheme="purple"
                    variant="solid"
                    borderRadius="10px"
                    fontSize="12px"
                    fontWeight="700"
                    leftIcon={<MdShoppingCart />}
                    onClick={() => handleAddToCartClick(prod)}
                  >
                    + Keranjang
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      {/* 6. FIND PARTS BY MOTORCYCLE */}
      <Box py="50px" bg="navy.900" color="white">
        <Container maxW="1280px">
          <SimpleGrid columns={{ base: 1, lg: 3 }} gap="30px" alignItems="center">
            <Box>
              <Badge colorScheme="purple" mb="8px" fontSize="11px" px="8px" py="3px" borderRadius="full">
                FITUR REKOMENDASI PINTAR
              </Badge>
              <Heading as="h2" fontSize={{ base: '24px', md: '32px' }} fontWeight="900" mb="10px">
                Cari Sparepart Sesuai Motor Anda
              </Heading>
              <Text fontSize="14px" color="gray.300" lineHeight="1.6">
                Hindari salah beli suku cadang. Pilih merk, model, dan tahun motor Anda untuk menemukan oli, busi, v-belt, dan kampas rem yang 100% pas dan kompatibel.
              </Text>
            </Box>

            {/* Filter Dropdown Form */}
            <Box gridColumn={{ base: 'span 1', lg: 'span 2' }}>
              <Box p="20px" bg="navy.800" borderRadius="20px" border="1px solid" borderColor="whiteAlpha.200">
                <SimpleGrid columns={{ base: 1, sm: 3 }} gap="12px" mb="14px">
                  <Box>
                    <Text fontSize="12px" fontWeight="700" color="gray.300" mb="4px">
                      1. Merk Motor
                    </Text>
                    <Select
                      value={selectedBrand}
                      onChange={(e) => handleBrandChange(e.target.value)}
                      bg="navy.900"
                      color="white"
                      borderRadius="12px"
                      h="46px"
                      fontSize="14px"
                    >
                      {Object.keys(motorcycleModels).map((b) => (
                        <option key={b} value={b} style={{ color: '#000' }}>
                          {b}
                        </option>
                      ))}
                    </Select>
                  </Box>

                  <Box>
                    <Text fontSize="12px" fontWeight="700" color="gray.300" mb="4px">
                      2. Model & Tipe
                    </Text>
                    <Select
                      value={selectedModel}
                      onChange={(e) => {
                        setSelectedModel(e.target.value);
                        setIsMotorFilterSearched(false);
                      }}
                      bg="navy.900"
                      color="white"
                      borderRadius="12px"
                      h="46px"
                      fontSize="14px"
                    >
                      {motorcycleModels[selectedBrand]?.map((m) => (
                        <option key={m} value={m} style={{ color: '#000' }}>
                          {m}
                        </option>
                      ))}
                    </Select>
                  </Box>

                  <Box>
                    <Text fontSize="12px" fontWeight="700" color="gray.300" mb="4px">
                      3. Tahun Pembuatan
                    </Text>
                    <Select
                      value={selectedYear}
                      onChange={(e) => {
                        setSelectedYear(e.target.value);
                        setIsMotorFilterSearched(false);
                      }}
                      bg="navy.900"
                      color="white"
                      borderRadius="12px"
                      h="46px"
                      fontSize="14px"
                    >
                      <option value="2025" style={{ color: '#000' }}>2025</option>
                      <option value="2024" style={{ color: '#000' }}>2024</option>
                      <option value="2023" style={{ color: '#000' }}>2023</option>
                      <option value="2022" style={{ color: '#000' }}>2022</option>
                      <option value="2021" style={{ color: '#000' }}>2021</option>
                      <option value="2020" style={{ color: '#000' }}>2020</option>
                    </Select>
                  </Box>
                </SimpleGrid>

                <Button
                  colorScheme="purple"
                  w="100%"
                  h="48px"
                  borderRadius="12px"
                  fontWeight="800"
                  leftIcon={<MdSearch />}
                  onClick={handleSearchCompatibleParts}
                >
                  Temukan Sparepart Kompatibel untuk {selectedModel} ({selectedYear})
                </Button>
              </Box>

              {/* Compatible Search Results */}
              {isMotorFilterSearched && (
                <Box mt="20px" p="16px" bg="navy.800" borderRadius="18px" border="1px solid" borderColor="brand.500">
                  <Flex justify="space-between" align="center" mb="12px">
                    <Text fontSize="14px" fontWeight="800">
                      Hasil Suku Cadang Cocok untuk: <Text as="span" color="brand.400">{selectedModel} {selectedYear}</Text>
                    </Text>
                    <Badge colorScheme="green">{compatibleProducts.length} Produk Ditemukan</Badge>
                  </Flex>

                  {compatibleProducts.length === 0 ? (
                    <Text fontSize="13px" color="gray.400" py="10px">
                      Belum ada suku cadang spesifik yang tercatat untuk model ini. Hubungi mekanik kami melalui WhatsApp untuk konfirmasi kecocokan.
                    </Text>
                  ) : (
                    <SimpleGrid columns={{ base: 1, sm: 2 }} gap="10px">
                      {compatibleProducts.map((prod) => (
                        <Flex
                          key={prod.id}
                          p="10px"
                          borderRadius="12px"
                          bg="navy.900"
                          align="center"
                          justify="space-between"
                          gap="10px"
                        >
                          <HStack spacing="10px">
                            <Image src={prod.images[0]} alt={prod.name} w="44px" h="44px" borderRadius="8px" objectFit="cover" />
                            <Box>
                              <Text fontSize="13px" fontWeight="700" color="white" noOfLines={1}>
                                {prod.name}
                              </Text>
                              <Text fontSize="12px" color="brand.400" fontWeight="700">
                                Rp {(prod.discountPrice || prod.price).toLocaleString('id-ID')}
                              </Text>
                            </Box>
                          </HStack>
                          <Button size="xs" colorScheme="purple" onClick={() => handleAddToCartClick(prod)}>
                            + Keranjang
                          </Button>
                        </Flex>
                      ))}
                    </SimpleGrid>
                  )}
                </Box>
              )}
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* 7. BOOKING SERVICE WORKFLOW PREVIEW */}
      <Container maxW="1280px" py="60px">
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="40px" alignItems="center">
          <Box>
            <Badge colorScheme="purple" mb="8px">
              BOOKING MUDAH & CEPAT
            </Badge>
            <Heading as="h2" fontSize={{ base: '24px', md: '34px' }} fontWeight="900" color={textColor} mb="12px">
              Booking Servis Tanpa Perlu Antre
            </Heading>
            <Text fontSize="14px" color={textColorSecondary} lineHeight="1.6" mb="24px">
              Daftarkan motor Anda secara online, pilih mekanik spesialis, dan datang langsung tepat waktu sesuai jadwal tanpa buang waktu menunggu giliran di bengkel.
            </Text>

            <VStack spacing="16px" align="stretch" mb="26px">
              <HStack spacing="14px" align="flex-start">
                <Box
                  w="32px"
                  h="32px"
                  borderRadius="full"
                  bg="brand.500"
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="800"
                  fontSize="14px"
                  flexShrink={0}
                >
                  1
                </Box>
                <Box>
                  <Text fontSize="14.5px" fontWeight="800" color={textColor}>
                    Pilih Kendaraan & Layanan Servis
                  </Text>
                  <Text fontSize="12.5px" color={textColorSecondary}>
                    Gunakan motor tersimpan di akun Anda atau masukkan tipe motor baru serta paket servis.
                  </Text>
                </Box>
              </HStack>

              <HStack spacing="14px" align="flex-start">
                <Box
                  w="32px"
                  h="32px"
                  borderRadius="full"
                  bg="brand.500"
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="800"
                  fontSize="14px"
                  flexShrink={0}
                >
                  2
                </Box>
                <Box>
                  <Text fontSize="14.5px" fontWeight="800" color={textColor}>
                    Tentukan Tanggal & Jam Slot Waktu
                  </Text>
                  <Text fontSize="12.5px" color={textColorSecondary}>
                    Sistem otomatis menampilkan slot jam pit bengkel yang masih tersedia secara real-time.
                  </Text>
                </Box>
              </HStack>

              <HStack spacing="14px" align="flex-start">
                <Box
                  w="32px"
                  h="32px"
                  borderRadius="full"
                  bg="brand.500"
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="800"
                  fontSize="14px"
                  flexShrink={0}
                >
                  3
                </Box>
                <Box>
                  <Text fontSize="14.5px" fontWeight="800" color={textColor}>
                    Konfirmasi & Langsung Masuk Pit
                  </Text>
                  <Text fontSize="12.5px" color={textColorSecondary}>
                    Dapatkan nomor booking resmi dan pantau status pengerjaan langsung dari smartphone.
                  </Text>
                </Box>
              </HStack>
            </VStack>

            <Link href="/booking">
              <Button
                colorScheme="purple"
                size="lg"
                h="50px"
                px="28px"
                borderRadius="14px"
                fontWeight="800"
                rightIcon={<MdArrowForward />}
              >
                Mulai Booking Servis
              </Button>
            </Link>
          </Box>

          {/* Booking Slots Visual Demonstration */}
          <Box p="24px" borderRadius="24px" bg={bgCard} border="1px solid" borderColor={borderColor} boxShadow="lg">
            <Text fontSize="15px" fontWeight="800" color={textColor} mb="6px">
              Contoh Ketersediaan Slot Waktu Pit Hari Ini:
            </Text>
            <Text fontSize="12px" color={textColorSecondary} mb="16px">
              Lokasi: Pit Utama JTM Tech Workshop
            </Text>

            <SimpleGrid columns={2} gap="12px" mb="20px">
              <Box p="12px" borderRadius="12px" border="1px solid" borderColor="green.400" bg={useColorModeValue('green.50', 'whiteAlpha.50')}>
                <Flex justify="space-between" align="center">
                  <Text fontSize="15px" fontWeight="800" color={textColor}>
                    09:00 WIB
                  </Text>
                  <Badge colorScheme="green">Tersedia</Badge>
                </Flex>
                <Text fontSize="11px" color={textColorSecondary} mt="2px">
                  Pit 1 & Pit 2 Ready
                </Text>
              </Box>

              <Box p="12px" borderRadius="12px" border="1px solid" borderColor="green.400" bg={useColorModeValue('green.50', 'whiteAlpha.50')}>
                <Flex justify="space-between" align="center">
                  <Text fontSize="15px" fontWeight="800" color={textColor}>
                    10:30 WIB
                  </Text>
                  <Badge colorScheme="green">Tersedia</Badge>
                </Flex>
                <Text fontSize="11px" color={textColorSecondary} mt="2px">
                  Pit 2 Ready
                </Text>
              </Box>

              <Box p="12px" borderRadius="12px" border="1px solid" borderColor="gray.300" opacity="0.6">
                <Flex justify="space-between" align="center">
                  <Text fontSize="15px" fontWeight="800" color={textColor}>
                    13:00 WIB
                  </Text>
                  <Badge colorScheme="red">Penuh</Badge>
                </Flex>
                <Text fontSize="11px" color={textColorSecondary} mt="2px">
                  Slot Terisi
                </Text>
              </Box>

              <Box p="12px" borderRadius="12px" border="1px solid" borderColor="green.400" bg={useColorModeValue('green.50', 'whiteAlpha.50')}>
                <Flex justify="space-between" align="center">
                  <Text fontSize="15px" fontWeight="800" color={textColor}>
                    14:30 WIB
                  </Text>
                  <Badge colorScheme="green">Tersedia</Badge>
                </Flex>
                <Text fontSize="11px" color={textColorSecondary} mt="2px">
                  Pit 1 Ready
                </Text>
              </Box>
            </SimpleGrid>

            <Link href="/booking">
              <Button w="100%" colorScheme="purple" variant="outline" borderRadius="12px" h="44px">
                Pilih Tanggal & Jam Anda
              </Button>
            </Link>
          </Box>
        </SimpleGrid>
      </Container>

      {/* 8. WHY CHOOSE US */}
      <Box py="50px" bg={bgSubtle}>
        <Container maxW="1280px">
          <Box textAlign="center" maxW="600px" mx="auto" mb="36px">
            <Badge colorScheme="purple" mb="6px">
              KEUNGGULAN BENGKEL
            </Badge>
            <Heading as="h2" fontSize={{ base: '22px', md: '30px' }} fontWeight="900" color={textColor}>
              Kenapa Memilih JTM Tech Workshop?
            </Heading>
            <Text fontSize="13.5px" color={textColorSecondary} mt="6px">
              Standar pengerjaan presisi demi performa dan kenyamanan berkendara harian maupun balap.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap="20px">
            <Box p="20px" borderRadius="18px" bg={bgCard} border="1px solid" borderColor={borderColor}>
              <Icon as={MdVerified} w="32px" h="32px" color="brand.500" mb="12px" />
              <Text fontSize="16px" fontWeight="800" color={textColor} mb="6px">
                Teknisi Ahli Bersertifikat
              </Text>
              <Text fontSize="13px" color={textColorSecondary}>
                Mekanik kami memiliki pengalaman lebih dari 8 tahun dalam menangani motor matic injeksi, moge, dan 2-tak.
              </Text>
            </Box>

            <Box p="20px" borderRadius="18px" bg={bgCard} border="1px solid" borderColor={borderColor}>
              <Icon as={MdCheckCircle} w="32px" h="32px" color="green.500" mb="12px" />
              <Text fontSize="16px" fontWeight="800" color={textColor} mb="6px">
                Suku Cadang 100% Original
              </Text>
              <Text fontSize="13px" color={textColorSecondary}>
                Semua suku cadang dan oli didatangkan langsung dari pabrikan resmi (Motul, Daytona, TDR, Honda, Yamaha).
              </Text>
            </Box>

            <Box p="20px" borderRadius="18px" bg={bgCard} border="1px solid" borderColor={borderColor}>
              <Icon as={MdSpeed} w="32px" h="32px" color="orange.500" mb="12px" />
              <Text fontSize="16px" fontWeight="800" color={textColor} mb="6px">
                Peralatan Diagnosa Komputer
              </Text>
              <Text fontSize="13px" color={textColorSecondary}>
                Dilengkapi scanner injeksi OBD, ultrasonic cleaner injektor, dyno tuning, dan kunci torsi kalibrasi.
              </Text>
            </Box>

            <Box p="20px" borderRadius="18px" bg={bgCard} border="1px solid" borderColor={borderColor}>
              <Icon as={MdSchedule} w="32px" h="32px" color="purple.500" mb="12px" />
              <Text fontSize="16px" fontWeight="800" color={textColor} mb="6px">
                Garansi Hasil Servis
              </Text>
              <Text fontSize="13px" color={textColorSecondary}>
                Jaminan garansi pengerjaan hingga 14 hari. Apabila masih terdapat kendala, kami perbaiki kembali secara gratis.
              </Text>
            </Box>

            <Box p="20px" borderRadius="18px" bg={bgCard} border="1px solid" borderColor={borderColor}>
              <Icon as={MdDirectionsBike} w="32px" h="32px" color="red.500" mb="12px" />
              <Text fontSize="16px" fontWeight="800" color={textColor} mb="6px">
                Riwayat Servis Digital (Account)
              </Text>
              <Text fontSize="13px" color={textColorSecondary}>
                Semua rekam jejak servis dan penggantian part motor Anda tersimpan rapi di dashboard akun pelanggan.
              </Text>
            </Box>

            <Box p="20px" borderRadius="18px" bg={bgCard} border="1px solid" borderColor={borderColor}>
              <Icon as={MdLocationOn} w="32px" h="32px" color="blue.500" mb="12px" />
              <Text fontSize="16px" fontWeight="800" color={textColor} mb="6px">
                Ruang Tunggu Nyaman & Ber-AC
              </Text>
              <Text fontSize="13px" color={textColorSecondary}>
                Nikmati fasilitas ruang tunggu dingin dengan Free Wi-Fi, minuman gratis, dan view langsung ke area pit servis.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* 9. ABOUT WORKSHOP (SPLIT SECTION) */}
      <Container maxW="1280px" py="60px">
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="40px" alignItems="center">
          <Box borderRadius="20px" overflow="hidden" boxShadow="xl">
            <Image
              src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=80"
              alt="Fasilitas Bengkel Motor JTM Tech"
              w="100%"
              h={{ base: '260px', md: '360px' }}
              objectFit="cover"
            />
          </Box>

          <Box>
            <Badge colorScheme="purple" mb="8px">
              TENTANG BENGKEL KAMI
            </Badge>
            <Heading as="h2" fontSize={{ base: '24px', md: '32px' }} fontWeight="900" color={textColor} mb="12px">
              Membangun Standar Baru Perawatan Motor Modern
            </Heading>
            <Text fontSize="14px" color={textColorSecondary} lineHeight="1.7" mb="16px">
              Berdiri sejak tahun 2018 di Kota Malang, <strong>{settings.businessInfo.name}</strong> hadir untuk memberikan solusi perawatan motor yang transparan, profesional, dan berbasis teknologi digital.
            </Text>
            <Text fontSize="14px" color={textColorSecondary} lineHeight="1.7" mb="24px">
              Kami melayani servis harian, upgrade performa mesin, bore-up balap, hingga restorasi total dengan teknisi yang berdedikasi tinggi terhadap keselamatan dan kepuasan Anda di jalan raya.
            </Text>

            <Link href="/about">
              <Button colorScheme="purple" variant="outline" borderRadius="12px" rightIcon={<MdArrowForward />}>
                Pelajari Profil & Fasilitas Kami
              </Button>
            </Link>
          </Box>
        </SimpleGrid>
      </Container>

      {/* 10. PROMOTIONS BANNER */}
      <Box id="promo" py="40px" bg="linear-gradient(135deg, #11047A 0%, #422AFB 100%)" color="white">
        <Container maxW="1280px">
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px" alignItems="center">
            <Box gridColumn={{ base: 'span 1', md: 'span 2' }}>
              <Badge colorScheme="yellow" mb="6px" fontSize="12px">
                VOUCHER PROMO BULAN INI
              </Badge>
              <Heading as="h3" fontSize={{ base: '20px', md: '28px' }} fontWeight="900" mb="6px">
                Diskon 20% Paket Service CVT & Potongan Oli Motul
              </Heading>
              <Text fontSize="13.5px" color="whiteAlpha.800">
                Gunakan kode voucher <strong>MERDEKACVT</strong> saat checkout atau tunjukkan ke kasir bengkel saat booking online.
              </Text>
            </Box>
            <Box textAlign={{ base: 'left', md: 'right' }}>
              <Link href="/shop">
                <Button size="lg" bg="white" color="brand.500" _hover={{ bg: 'gray.100' }} borderRadius="14px" fontWeight="800">
                  Klaim Promo Sekarang
                </Button>
              </Link>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* 11. TESTIMONIALS */}
      <Box py="60px" bg={bgSubtle}>
        <Container maxW="1280px">
          <Box textAlign="center" maxW="600px" mx="auto" mb="36px">
            <Badge colorScheme="purple" mb="6px">
              TESTIMONI NYATA
            </Badge>
            <Heading as="h2" fontSize={{ base: '22px', md: '30px' }} fontWeight="900" color={textColor}>
              Apa Kata Pemilik Motor?
            </Heading>
            <Text fontSize="13.5px" color={textColorSecondary} mt="6px">
              Kepuasan pelanggan adalah bukti kualitas dan ketepatan servis kami.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
            <Box p="20px" borderRadius="18px" bg={bgCard} border="1px solid" borderColor={borderColor}>
              <HStack spacing="2px" color="orange.400" mb="12px">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Icon as={MdStar} key={i} w="16px" h="16px" />
                ))}
              </HStack>
              <Text fontSize="13.5px" color={textColor} fontStyle="italic" mb="16px" lineHeight="1.6">
                &ldquo;Servis CVT Vario 160 di JTM Tech bener-bener mantap, gredek hilang total dan tarikan atasnya enteng banget. Booking online nya juga gampang tanpa antre!&rdquo;
              </Text>
              <Text fontSize="14px" fontWeight="800" color={textColor}>
                Dimas Anggara
              </Text>
              <Text fontSize="11.5px" color={textColorSecondary}>
                Honda Vario 160 (Servis CVT & Oli Motul)
              </Text>
            </Box>

            <Box p="20px" borderRadius="18px" bg={bgCard} border="1px solid" borderColor={borderColor}>
              <HStack spacing="2px" color="orange.400" mb="12px">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Icon as={MdStar} key={i} w="16px" h="16px" />
                ))}
              </HStack>
              <Text fontSize="13.5px" color={textColor} fontStyle="italic" mb="16px" lineHeight="1.6">
                &ldquo;Beli sparepart online di web nya langsung dikirim di hari yang sama, packing rapi dan 100% original. Senang punya langganan bengkel yang transparan gini.&rdquo;
              </Text>
              <Text fontSize="14px" fontWeight="800" color={textColor}>
                Budi Santoso
              </Text>
              <Text fontSize="11.5px" color={textColorSecondary}>
                Yamaha NMAX 155 (Beli Kampas Rem & Busi Iridium)
              </Text>
            </Box>

            <Box p="20px" borderRadius="18px" bg={bgCard} border="1px solid" borderColor={borderColor}>
              <HStack spacing="2px" color="orange.400" mb="12px">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Icon as={MdStar} key={i} w="16px" h="16px" />
                ))}
              </HStack>
              <Text fontSize="13.5px" color={textColor} fontStyle="italic" mb="16px" lineHeight="1.6">
                &ldquo;Hasil Dyno Tuning ZX25R saya naik 3.8 HP setelah setting ECU di JTM Tech. Mekaniknya sangat teliti dan edukatif menjelaskan detail grafik tenaganya.&rdquo;
              </Text>
              <Text fontSize="14px" fontWeight="800" color={textColor}>
                Rizky Maulana
              </Text>
              <Text fontSize="11.5px" color={textColorSecondary}>
                Kawasaki Ninja ZX25R (Dyno & Remap ECU)
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* 12. ARTICLES & TIPS */}
      <Container maxW="1280px" py="50px">
        <Flex justify="space-between" align="flex-end" mb="24px" flexWrap="wrap" gap="10px">
          <Box>
            <Badge colorScheme="purple" mb="6px">
              EDUKASI & ARTIKEL
            </Badge>
            <Heading as="h2" fontSize={{ base: '22px', md: '30px' }} fontWeight="900" color={textColor}>
              Tips & Informasi Perawatan Motor
            </Heading>
            <Text fontSize="13.5px" color={textColorSecondary}>
              Panduan praktis merawat kendaraan Anda agar tetap prima di setiap perjalanan.
            </Text>
          </Box>

          <Link href="/articles">
            <Button rightIcon={<MdArrowForward />} variant="outline" size="sm" borderRadius="10px">
              Lihat Semua Artikel
            </Button>
          </Link>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
          {articles.slice(0, 3).map((art) => (
            <Box
              key={art.id}
              borderRadius="18px"
              bg={bgCard}
              border="1px solid"
              borderColor={borderColor}
              overflow="hidden"
              _hover={{ borderColor: 'brand.500', transform: 'translateY(-2px)' }}
              transition="0.2s"
              display="flex"
              flexDirection="column"
            >
              <Image src={art.thumbnail} alt={art.title} w="100%" h="170px" objectFit="cover" />
              <Box p="16px" flex="1" display="flex" flexDirection="column">
                <Badge colorScheme="purple" alignSelf="flex-start" mb="8px" fontSize="10px">
                  {art.category}
                </Badge>
                <Link href={`/articles/${art.slug}`}>
                  <Text fontSize="15px" fontWeight="800" color={textColor} mb="8px" lineHeight="1.3">
                    {art.title}
                  </Text>
                </Link>
                <Text fontSize="12.5px" color={textColorSecondary} flex="1" noOfLines={3} mb="14px">
                  {art.excerpt}
                </Text>

                <Flex justify="space-between" align="center" pt="10px" borderTop="1px solid" borderColor={borderColor}>
                  <Text fontSize="11px" color="gray.400">
                    Oleh: {art.author}
                  </Text>
                  <Link href={`/articles/${art.slug}`}>
                    <Text fontSize="12.5px" fontWeight="700" color="brand.500">
                      Baca Selengkapnya &rarr;
                    </Text>
                  </Link>
                </Flex>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      {/* 13. LOCATION & WORKSHOP CONTACT */}
      <Box py="50px" bg={bgSubtle}>
        <Container maxW="1280px">
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap="30px" alignItems="center">
            <Box>
              <Badge colorScheme="red" mb="8px">
                LOKASI BENGKEL FISIK
              </Badge>
              <Heading as="h2" fontSize={{ base: '24px', md: '32px' }} fontWeight="900" color={textColor} mb="12px">
                Kunjungi Bengkel Resmi JTM Tech
              </Heading>
              <Text fontSize="14px" color={textColorSecondary} mb="20px" lineHeight="1.6">
                Datang langsung ke bengkel kami untuk konsultasi kerusakan, ganti oli cepat, atau servis besar.
              </Text>

              <VStack spacing="14px" align="stretch" mb="24px">
                <HStack spacing="12px">
                  <Icon as={MdLocationOn} color="red.500" w="22px" h="22px" />
                  <Box>
                    <Text fontSize="13px" fontWeight="800" color={textColor}>
                      Alamat:
                    </Text>
                    <Text fontSize="13px" color={textColorSecondary}>
                      {settings.businessInfo.address}, {settings.businessInfo.city}, Jawa Timur
                    </Text>
                  </Box>
                </HStack>

                <HStack spacing="12px">
                  <Icon as={MdPhone} color="green.500" w="22px" h="22px" />
                  <Box>
                    <Text fontSize="13px" fontWeight="800" color={textColor}>
                      Telepon / WhatsApp:
                    </Text>
                    <Text fontSize="13px" color={textColorSecondary}>
                      {settings.businessInfo.phone} ({settings.businessInfo.whatsapp})
                    </Text>
                  </Box>
                </HStack>

                <HStack spacing="12px">
                  <Icon as={MdSchedule} color="brand.500" w="22px" h="22px" />
                  <Box>
                    <Text fontSize="13px" fontWeight="800" color={textColor}>
                      Jam Operasional:
                    </Text>
                    <Text fontSize="13px" color={textColorSecondary}>
                      Senin - Jumat: {settings.businessInfo.openingHours.weekdays} | Sabtu: {settings.businessInfo.openingHours.saturday} | Minggu: {settings.businessInfo.openingHours.sunday}
                    </Text>
                  </Box>
                </HStack>
              </VStack>

              <HStack spacing="12px">
                <a
                  href={`https://wa.me/${settings.businessInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20Bengkel%20JTM%20Tech,%20saya%20mau%20tanya%20servis%20motor`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button colorScheme="whatsapp" leftIcon={<IoLogoWhatsapp />} borderRadius="12px" h="46px">
                    Hubungi via WhatsApp
                  </Button>
                </a>

                <Link href="/contact">
                  <Button variant="outline" borderRadius="12px" h="46px">
                    Petunjuk Arah & Peta
                  </Button>
                </Link>
              </HStack>
            </Box>

            {/* Embedded Visual Map Preview */}
            <Box
              h={{ base: '260px', md: '340px' }}
              borderRadius="20px"
              overflow="hidden"
              border="2px solid"
              borderColor={borderColor}
              boxShadow="md"
              position="relative"
            >
              <iframe
                title="Lokasi Bengkel JTM Tech"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126438.28345759714!2d112.561741!3d-7.978639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62822063dd0f9%3A0x3027376c3a38ee0!2sMalang%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1650000000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* 14. FOOTER */}
      <PublicFooter />
    </Box>
  );
}
