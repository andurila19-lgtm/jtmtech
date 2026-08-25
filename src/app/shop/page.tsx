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
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Checkbox,
  useColorModeValue,
  useToast,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
} from '@chakra-ui/react';
import {
  MdSearch,
  MdShoppingCart,
  MdFilterList,
  MdChevronRight,
  MdStar,
  MdCheckCircle,
} from 'react-icons/md';
import Link from 'next/link';
import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import { useStore } from 'contexts/StoreContext';
import { initialCategories } from 'services/mockData';
import { Product } from 'types/workshop';

export default function ShopPage() {
  const { products, addToCart } = useStore();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const bgFilter = useColorModeValue('white', 'navy.800');
  const hoverCategoryBg = useColorModeValue('gray.100', 'whiteAlpha.100');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  // Filter States
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'name'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  const brands = ['ALL', 'Motul', 'Daytona Racing', 'TDR Racing', 'Honda Genuine Parts', 'Yamaha Genuine Parts', 'Denso', 'Brembo', 'KTC Kytaco'];

  // Filtering logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.compatibleVehicles.some((v) => v.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchesBrand = selectedBrand === 'ALL' || p.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchesStock = !onlyInStock || p.stock > 0;

    return matchesSearch && matchesCategory && matchesBrand && matchesStock;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price_asc') return (a.discountPrice || a.price) - (b.discountPrice || b.price);
    if (sortBy === 'price_desc') return (b.discountPrice || b.price) - (a.discountPrice || a.price);
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const handleAddToCart = (p: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(p, 1);
    toast({
      title: 'Ditambahkan ke Keranjang',
      description: `${p.name} berhasil dimasukkan.`,
      status: 'success',
      duration: 2500,
      position: 'top-right',
    });
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'navy.900')}>
      <PublicNavbar />

      {/* Top Breadcrumb & Title */}
      <Box bg={useColorModeValue('secondaryGray.300', 'navy.950')} py="24px" borderBottom="1px solid" borderColor={borderColor}>
        <Container maxW="1280px">
          <Breadcrumb spacing="8px" separator={<MdChevronRight color="gray.500" />} fontSize="13px" mb="8px">
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/">
                Beranda
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="brand.500" fontWeight="700">
                Toko Sparepart
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading as="h1" fontSize={{ base: '24px', md: '32px' }} fontWeight="900" color={textColor}>
            Katalog Suku Cadang & Oli Motor Original
          </Heading>
          <Text fontSize="13.5px" color={textColorSecondary} mt="4px">
            Menyediakan lebih dari 150+ suku cadang teruji, pelumas mesin sintetis, dan komponen performa racing.
          </Text>
        </Container>
      </Box>

      <Container maxW="1280px" py="30px">
        <SimpleGrid columns={{ base: 1, lg: 4 }} gap="30px" alignItems="flex-start">
          {/* LEFT SIDEBAR FILTERS (1 Col on Desktop) */}
          <Box
            p="20px"
            borderRadius="18px"
            bg={bgFilter}
            border="1px solid"
            borderColor={borderColor}
            position={{ lg: 'sticky' }}
            top="90px"
          >
            <Flex justify="space-between" align="center" mb="16px">
              <HStack spacing="6px">
                <Icon as={MdFilterList} color="brand.500" />
                <Text fontSize="15px" fontWeight="800" color={textColor}>
                  Filter Produk
                </Text>
              </HStack>
              {(selectedCategory !== 'ALL' || selectedBrand !== 'ALL' || search || onlyInStock) && (
                <Button
                  size="xs"
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => {
                    setSelectedCategory('ALL');
                    setSelectedBrand('ALL');
                    setSearch('');
                    setOnlyInStock(false);
                  }}
                >
                  Reset
                </Button>
              )}
            </Flex>

            {/* Search Filter */}
            <Box mb="16px">
              <Text fontSize="12px" fontWeight="700" color="gray.400" mb="6px" textTransform="uppercase">
                Cari Produk / Motor
              </Text>
              <InputGroup size="sm">
                <InputLeftElement pointerEvents="none">
                  <Icon as={MdSearch} color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="e.g. Motul, V-Belt Vario..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  borderRadius="10px"
                />
              </InputGroup>
            </Box>

            <Divider borderColor={borderColor} my="14px" />

            {/* Category Filter */}
            <Box mb="16px">
              <Text fontSize="12px" fontWeight="700" color="gray.400" mb="8px" textTransform="uppercase">
                Kategori Suku Cadang
              </Text>
              <VStack align="stretch" spacing="4px">
                <Box
                  p="6px 10px"
                  borderRadius="8px"
                  cursor="pointer"
                  bg={selectedCategory === 'ALL' ? 'brand.500' : 'transparent'}
                  color={selectedCategory === 'ALL' ? 'white' : textColor}
                  fontWeight={selectedCategory === 'ALL' ? '800' : '600'}
                  fontSize="13px"
                  onClick={() => setSelectedCategory('ALL')}
                  _hover={{ bg: selectedCategory === 'ALL' ? 'brand.500' : hoverCategoryBg }}
                >
                  Semua Kategori ({products.length})
                </Box>
                {initialCategories
                  .filter((c) => c.type === 'PRODUCT')
                  .map((cat) => (
                    <Box
                      key={cat.id}
                      p="6px 10px"
                      borderRadius="8px"
                      cursor="pointer"
                      bg={selectedCategory === cat.name ? 'brand.500' : 'transparent'}
                      color={selectedCategory === cat.name ? 'white' : textColor}
                      fontWeight={selectedCategory === cat.name ? '800' : '600'}
                      fontSize="13px"
                      onClick={() => setSelectedCategory(cat.name)}
                      _hover={{ bg: selectedCategory === cat.name ? 'brand.500' : hoverCategoryBg }}
                    >
                      {cat.name}
                    </Box>
                  ))}
              </VStack>
            </Box>

            <Divider borderColor={borderColor} my="14px" />

            {/* Brand Filter */}
            <Box mb="16px">
              <Text fontSize="12px" fontWeight="700" color="gray.400" mb="6px" textTransform="uppercase">
                Pilih Merk / Brand
              </Text>
              <Select
                size="sm"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                borderRadius="10px"
              >
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b === 'ALL' ? 'Semua Merk' : b}
                  </option>
                ))}
              </Select>
            </Box>

            <Checkbox
              colorScheme="purple"
              isChecked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
              fontSize="13px"
            >
              <Text fontSize="13px" color={textColor}>
                Hanya Stok Tersedia
              </Text>
            </Checkbox>
          </Box>

          {/* RIGHT PRODUCT GRID (3 Cols on Desktop) */}
          <Box gridColumn={{ base: 'span 1', lg: 'span 3' }}>
            {/* Top Toolbar */}
            <Flex justify="space-between" align="center" mb="16px" flexWrap="wrap" gap="10px">
              <Text fontSize="13.5px" color={textColorSecondary} fontWeight="600">
                Menampilkan <strong>{sortedProducts.length}</strong> produk
              </Text>

              <HStack spacing="8px">
                <Text fontSize="12.5px" color={textColorSecondary}>
                  Urutkan:
                </Text>
                <Select
                  size="sm"
                  w="180px"
                  borderRadius="10px"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="featured">Paling Populer</option>
                  <option value="price_asc">Harga Terendah</option>
                  <option value="price_desc">Harga Tertinggi</option>
                  <option value="name">Nama (A-Z)</option>
                </Select>
              </HStack>
            </Flex>

            {sortedProducts.length === 0 ? (
              <Box py="60px" textAlign="center" bg={bgCard} borderRadius="18px" border="1px solid" borderColor={borderColor}>
                <Icon as={MdSearch} w="48px" h="48px" color="gray.400" mb="12px" />
                <Text fontSize="16px" fontWeight="800" color={textColor}>
                  Tidak Ada Produk yang Sesuai Filter
                </Text>
                <Text fontSize="13px" color={textColorSecondary} mt="4px" mb="16px">
                  Coba ubah kata kunci pencarian atau reset filter kategori.
                </Text>
                <Button
                  size="sm"
                  colorScheme="purple"
                  onClick={() => {
                    setSelectedCategory('ALL');
                    setSelectedBrand('ALL');
                    setSearch('');
                  }}
                >
                  Reset Semua Filter
                </Button>
              </Box>
            ) : (
              <SimpleGrid columns={{ base: 2, sm: 2, md: 3 }} gap={{ base: '12px', md: '18px' }}>
                {sortedProducts.map((prod) => (
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
                        {prod.stock === 0 && (
                          <Badge position="absolute" top="8px" right="8px" colorScheme="gray" fontSize="10px" borderRadius="full" px="6px">
                            HABIS
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

                      <Text fontSize="10.5px" color={textColorSecondary} noOfLines={1} mb="10px">
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
                          borderRadius="10px"
                          fontSize="12px"
                          fontWeight="700"
                          leftIcon={<MdShoppingCart />}
                          isDisabled={prod.stock === 0}
                          onClick={(e) => handleAddToCart(prod, e)}
                        >
                          {prod.stock === 0 ? 'Stok Habis' : '+ Keranjang'}
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </Box>
        </SimpleGrid>
      </Container>

      <PublicFooter />
    </Box>
  );
}
