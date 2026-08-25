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
  useToast,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  IconButton,
} from '@chakra-ui/react';
import {
  MdShoppingCart,
  MdStar,
  MdCheckCircle,
  MdShield,
  MdLocalShipping,
  MdChevronRight,
  MdAdd,
  MdRemove,
  MdArrowBack,
} from 'react-icons/md';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import { useStore } from 'contexts/StoreContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const { products, addToCart } = useStore();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const bgSubtle = useColorModeValue('secondaryGray.300', 'navy.950');
  const bgItem = useColorModeValue('gray.50', 'navy.900');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  // Find product by id or sku
  const product = products.find((p) => p.id === slug || p.sku.toLowerCase() === slug?.toLowerCase()) || products[0];

  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: 'Ditambahkan ke Keranjang',
      description: `${quantity}x ${product.name} telah dimasukkan ke keranjang.`,
      status: 'success',
      duration: 2500,
      position: 'top-right',
    });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

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
            <BreadcrumbLink as={Link} href="/shop">
              Toko Sparepart
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="brand.500" fontWeight="700">
              {product.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Product Hero Details Grid */}
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: '30px', md: '50px' }} mb="50px">
          {/* Left Column: Image Gallery */}
          <Box>
            <Box
              borderRadius="20px"
              overflow="hidden"
              border="1px solid"
              borderColor={borderColor}
              mb="14px"
              bg={bgCard}
            >
              <Image
                src={activeImage}
                alt={product.name}
                w="100%"
                h={{ base: '280px', sm: '380px', md: '440px' }}
                objectFit="cover"
              />
            </Box>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <HStack spacing="10px">
                {product.images.map((img, idx) => (
                  <Box
                    key={idx}
                    w="70px"
                    h="70px"
                    borderRadius="10px"
                    overflow="hidden"
                    cursor="pointer"
                    border="2px solid"
                    borderColor={activeImage === img ? 'brand.500' : borderColor}
                    onClick={() => setActiveImage(img)}
                  >
                    <Image src={img} alt="" w="100%" h="100%" objectFit="cover" />
                  </Box>
                ))}
              </HStack>
            )}
          </Box>

          {/* Right Column: Product Specs & Buy CTA */}
          <Box>
            <HStack spacing="8px" mb="8px">
              <Badge colorScheme="purple" fontSize="11px" px="8px" py="3px" borderRadius="full">
                {product.brand}
              </Badge>
              <Text fontSize="12px" color="gray.400">
                SKU: {product.sku}
              </Text>
            </HStack>

            <Heading as="h1" fontSize={{ base: '22px', md: '28px' }} fontWeight="900" color={textColor} mb="12px">
              {product.name}
            </Heading>

            {/* Rating and Stock */}
            <HStack spacing="14px" mb="18px">
              <HStack spacing="4px" color="orange.400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Icon as={MdStar} key={i} w="16px" h="16px" />
                ))}
                <Text fontSize="13px" fontWeight="700" color={textColor} ml="4px">
                  4.9 (48 Ulasan)
                </Text>
              </HStack>

              <Badge colorScheme={product.stock > 5 ? 'green' : product.stock > 0 ? 'orange' : 'red'}>
                {product.stock > 5 ? `Tersedia (${product.stock} unit)` : product.stock > 0 ? `Sisa ${product.stock} unit` : 'Stok Habis'}
              </Badge>
            </HStack>

            {/* Price Box */}
            <Box p="16px" borderRadius="16px" bg={useColorModeValue('gray.50', 'navy.800')} mb="20px">
              <Flex align="baseline" gap="10px">
                <Text fontSize={{ base: '26px', md: '32px' }} fontWeight="900" color="brand.500">
                  Rp {(product.discountPrice || product.price).toLocaleString('id-ID')}
                </Text>
                {product.discountPrice && (
                  <Text fontSize="15px" color="gray.400" as="s">
                    Rp {product.price.toLocaleString('id-ID')}
                  </Text>
                )}
              </Flex>
            </Box>

            {/* Compatibility Box */}
            <Box p="16px" borderRadius="16px" border="1px solid" borderColor={borderColor} mb="24px">
              <HStack spacing="6px" mb="8px">
                <Icon as={MdCheckCircle} color="green.500" />
                <Text fontSize="13px" fontWeight="800" color={textColor}>
                  Kompatibilitas Kendaraan:
                </Text>
              </HStack>
              <HStack spacing="6px" flexWrap="wrap">
                {product.compatibleVehicles.map((veh) => (
                  <Badge key={veh} colorScheme="purple" px="8px" py="3px" borderRadius="8px" fontSize="11px">
                    {veh}
                  </Badge>
                ))}
              </HStack>
            </Box>

            {/* Quantity Selector & Action Buttons */}
            <Box mb="26px">
              <Text fontSize="13px" fontWeight="700" color={textColor} mb="8px">
                Jumlah Pesanan:
              </Text>
              <HStack spacing="12px" mb="18px">
                <HStack
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="12px"
                  p="4px"
                  bg={bgCard}
                >
                  <IconButton
                    aria-label="Kurangi"
                    icon={<MdRemove />}
                    size="sm"
                    variant="ghost"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    isDisabled={quantity <= 1}
                  />
                  <Text px="12px" fontWeight="800" fontSize="15px">
                    {quantity}
                  </Text>
                  <IconButton
                    aria-label="Tambah"
                    icon={<MdAdd />}
                    size="sm"
                    variant="ghost"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    isDisabled={quantity >= product.stock}
                  />
                </HStack>
                <Text fontSize="12px" color={textColorSecondary}>
                  Berat: {product.weightGram} gram / item
                </Text>
              </HStack>

              <SimpleGrid columns={{ base: 1, sm: 2 }} gap="12px">
                <Button
                  colorScheme="purple"
                  variant="outline"
                  h="50px"
                  borderRadius="14px"
                  fontWeight="800"
                  leftIcon={<MdShoppingCart />}
                  onClick={handleAddToCart}
                  isDisabled={product.stock === 0}
                >
                  + Keranjang
                </Button>

                <Button
                  colorScheme="purple"
                  h="50px"
                  borderRadius="14px"
                  fontWeight="800"
                  onClick={handleBuyNow}
                  isDisabled={product.stock === 0}
                  boxShadow="0 4px 14px rgba(66, 42, 251, 0.3)"
                >
                  Beli Sekarang
                </Button>
              </SimpleGrid>
            </Box>

            {/* Trust Assurance */}
            <SimpleGrid columns={2} gap="12px" pt="16px" borderTop="1px solid" borderColor={borderColor}>
              <HStack spacing="8px">
                <Icon as={MdShield} color="green.500" />
                <Text fontSize="12px" color={textColorSecondary}>
                  100% Produk Original
                </Text>
              </HStack>
              <HStack spacing="8px">
                <Icon as={MdLocalShipping} color="brand.500" />
                <Text fontSize="12px" color={textColorSecondary}>
                  Kirim Cepat / Ambil di Bengkel
                </Text>
              </HStack>
            </SimpleGrid>
          </Box>
        </SimpleGrid>

        {/* Product Information Tabs */}
        <Box mb="60px">
          <Tabs variant="enclosed" colorScheme="purple">
            <TabList>
              <Tab fontWeight="700" fontSize="14px">Deskripsi</Tab>
              <Tab fontWeight="700" fontSize="14px">Spesifikasi</Tab>
              <Tab fontWeight="700" fontSize="14px">Kompatibilitas</Tab>
              <Tab fontWeight="700" fontSize="14px">Ulasan (48)</Tab>
            </TabList>

            <TabPanels>
              {/* Description */}
              <TabPanel p="24px" bg={bgCard} borderRadius="0 0 16px 16px" border="1px solid" borderColor={borderColor}>
                <Text fontSize="14.5px" color={textColorSecondary} lineHeight="1.8">
                  {product.description}
                </Text>
              </TabPanel>

              {/* Specifications */}
              <TabPanel p="24px" bg={bgCard} borderRadius="0 0 16px 16px" border="1px solid" borderColor={borderColor}>
                <VStack spacing="10px" align="stretch" maxW="500px">
                  <Flex justify="space-between" py="6px" borderBottom="1px solid" borderColor={borderColor}>
                    <Text fontSize="13px" color={textColorSecondary}>Brand / Merk:</Text>
                    <Text fontSize="13px" fontWeight="700" color={textColor}>{product.brand}</Text>
                  </Flex>
                  <Flex justify="space-between" py="6px" borderBottom="1px solid" borderColor={borderColor}>
                    <Text fontSize="13px" color={textColorSecondary}>Kategori:</Text>
                    <Text fontSize="13px" fontWeight="700" color={textColor}>{product.category}</Text>
                  </Flex>
                  <Flex justify="space-between" py="6px" borderBottom="1px solid" borderColor={borderColor}>
                    <Text fontSize="13px" color={textColorSecondary}>Berat Pengiriman:</Text>
                    <Text fontSize="13px" fontWeight="700" color={textColor}>{product.weightGram} gram</Text>
                  </Flex>
                  <Flex justify="space-between" py="6px">
                    <Text fontSize="13px" color={textColorSecondary}>Kode SKU:</Text>
                    <Text fontSize="13px" fontWeight="700" color={textColor}>{product.sku}</Text>
                  </Flex>
                </VStack>
              </TabPanel>

              {/* Compatibility */}
              <TabPanel p="24px" bg={bgCard} borderRadius="0 0 16px 16px" border="1px solid" borderColor={borderColor}>
                <Text fontSize="14px" fontWeight="700" color={textColor} mb="12px">
                  Daftar motor yang telah teruji kompatibel 100% (Plug & Play):
                </Text>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap="10px">
                  {product.compatibleVehicles.map((v) => (
                    <HStack key={v} p="10px" bg={bgItem} borderRadius="10px">
                      <Icon as={MdCheckCircle} color="green.500" />
                      <Text fontSize="13px" fontWeight="600" color={textColor}>{v}</Text>
                    </HStack>
                  ))}
                </SimpleGrid>
              </TabPanel>

              {/* Reviews */}
              <TabPanel p="24px" bg={bgCard} borderRadius="0 0 16px 16px" border="1px solid" borderColor={borderColor}>
                <VStack spacing="16px" align="stretch">
                  <Box p="14px" bg={bgItem} borderRadius="12px">
                    <HStack spacing="4px" color="orange.400" mb="4px">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Icon as={MdStar} key={i} w="14px" h="14px" />
                      ))}
                      <Text fontSize="13px" fontWeight="800" color={textColor} ml="6px">
                        Dimas Anggara
                      </Text>
                    </HStack>
                    <Text fontSize="13px" color={textColorSecondary}>
                      Barang original 100%, tarikan motor jadi responsif dan mesin lebih adem. Pengiriman sangat cepat!
                    </Text>
                  </Box>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <Box>
            <Heading as="h3" fontSize="20px" fontWeight="900" color={textColor} mb="20px">
              Produk Terkait Lainnya
            </Heading>
            <SimpleGrid columns={{ base: 2, md: 4 }} gap="16px">
              {relatedProducts.map((rel) => (
                <Box
                  key={rel.id}
                  borderRadius="16px"
                  bg={bgCard}
                  border="1px solid"
                  borderColor={borderColor}
                  overflow="hidden"
                  p="12px"
                >
                  <Link href={`/shop/${rel.id}`}>
                    <Image src={rel.images[0]} alt={rel.name} w="100%" h="140px" objectFit="cover" borderRadius="10px" mb="8px" />
                    <Text fontSize="13px" fontWeight="700" color={textColor} noOfLines={1} mb="4px">
                      {rel.name}
                    </Text>
                    <Text fontSize="14px" fontWeight="900" color="brand.500">
                      Rp {(rel.discountPrice || rel.price).toLocaleString('id-ID')}
                    </Text>
                  </Link>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Container>

      <PublicFooter />
    </Box>
  );
}
