'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Image,
  Flex,
  HStack,
  VStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  useToast,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Badge,
} from '@chakra-ui/react';
import {
  MdShoppingCart,
  MdDelete,
  MdAdd,
  MdRemove,
  MdArrowForward,
  MdLocalOffer,
  MdShield,
  MdChevronRight,
} from 'react-icons/md';
import Link from 'next/link';
import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import { useStore } from 'contexts/StoreContext';

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, clearCart, cartSubtotal, cartCount } = useStore();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'MERDEKACVT') {
      const discount = Math.round(cartSubtotal * 0.2);
      setAppliedDiscount(discount);
      toast({
        title: 'Kupon Berhasil Digunakan!',
        description: `Diskon 20% (Rp ${discount.toLocaleString('id-ID')}) diterapkan.`,
        status: 'success',
        duration: 3000,
        position: 'top-right',
      });
    } else if (couponCode.toUpperCase() === 'MOTULRACING') {
      setAppliedDiscount(25000);
      toast({
        title: 'Kupon Berhasil Digunakan!',
        description: 'Potongan Rp 25.000 diterapkan.',
        status: 'success',
        duration: 3000,
        position: 'top-right',
      });
    } else {
      toast({
        title: 'Kode Kupon Tidak Valid',
        description: 'Gunakan kode MERDEKACVT atau MOTULRACING.',
        status: 'warning',
        duration: 3000,
        position: 'top-right',
      });
    }
  };

  const finalTotal = Math.max(0, cartSubtotal - appliedDiscount);

  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'navy.900')}>
      <PublicNavbar />

      <Container maxW="1280px" py="30px">
        {/* Breadcrumb */}
        <Breadcrumb spacing="8px" separator={<MdChevronRight color="gray.500" />} fontSize="13px" mb="20px">
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/">
              Beranda
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/shop">
              Toko
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="brand.500" fontWeight="700">
              Keranjang Belanja
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Heading as="h1" fontSize={{ base: '24px', md: '32px' }} fontWeight="900" color={textColor} mb="24px">
          Keranjang Belanja Suku Cadang ({cartCount} item)
        </Heading>

        {cart.length === 0 ? (
          <Box
            py="70px"
            textAlign="center"
            bg={bgCard}
            borderRadius="20px"
            border="1px solid"
            borderColor={borderColor}
          >
            <Icon as={MdShoppingCart} w="64px" h="64px" color="gray.300" mb="16px" />
            <Heading as="h3" fontSize="20px" fontWeight="800" color={textColor} mb="6px">
              Keranjang Anda Masih Kosong
            </Heading>
            <Text fontSize="14px" color={textColorSecondary} maxW="450px" mx="auto" mb="24px">
              Silakan jelajahi katalog suku cadang original dan cairan pelumas performa tinggi untuk motor kesayangan Anda.
            </Text>
            <Link href="/shop">
              <Button colorScheme="purple" size="lg" borderRadius="14px" fontWeight="800">
                Mulai Belanja Sparepart
              </Button>
            </Link>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, lg: 3 }} gap="30px" alignItems="flex-start">
            {/* Left: Cart Items Table / List (2 Cols) */}
            <Box gridColumn={{ base: 'span 1', lg: 'span 2' }}>
              <VStack spacing="14px" align="stretch">
                {cart.map((item) => (
                  <Box
                    key={item.product.id}
                    p="16px"
                    borderRadius="16px"
                    bg={bgCard}
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <Flex gap="16px" align="center">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        w="80px"
                        h="80px"
                        borderRadius="12px"
                        objectFit="cover"
                      />

                      <Box flex="1">
                        <Badge colorScheme="purple" fontSize="10px" mb="4px">
                          {item.product.brand}
                        </Badge>
                        <Link href={`/shop/${item.product.id}`}>
                          <Text fontSize="15px" fontWeight="800" color={textColor} noOfLines={1}>
                            {item.product.name}
                          </Text>
                        </Link>
                        <Text fontSize="13px" fontWeight="800" color="brand.500" mt="2px">
                          Rp {(item.product.discountPrice || item.product.price).toLocaleString('id-ID')}
                        </Text>
                      </Box>

                      {/* Quantity Stepper */}
                      <HStack
                        border="1px solid"
                        borderColor={borderColor}
                        borderRadius="10px"
                        p="2px"
                      >
                        <IconButton
                          aria-label="Kurangi"
                          icon={<MdRemove />}
                          size="xs"
                          variant="ghost"
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        />
                        <Text px="8px" fontWeight="800" fontSize="13.5px">
                          {item.quantity}
                        </Text>
                        <IconButton
                          aria-label="Tambah"
                          icon={<MdAdd />}
                          size="xs"
                          variant="ghost"
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        />
                      </HStack>

                      {/* Subtotal Item */}
                      <Box textAlign="right" minW="90px">
                        <Text fontSize="15px" fontWeight="900" color={textColor}>
                          Rp{' '}
                          {(
                            (item.product.discountPrice || item.product.price) * item.quantity
                          ).toLocaleString('id-ID')}
                        </Text>
                        <Button
                          size="xs"
                          variant="ghost"
                          colorScheme="red"
                          leftIcon={<MdDelete />}
                          onClick={() => removeFromCart(item.product.id)}
                          mt="2px"
                        >
                          Hapus
                        </Button>
                      </Box>
                    </Flex>
                  </Box>
                ))}
              </VStack>

              <Flex justify="space-between" align="center" mt="20px">
                <Link href="/shop">
                  <Button variant="ghost" colorScheme="purple" size="sm">
                    &larr; Tambah Produk Lain
                  </Button>
                </Link>
                <Button variant="outline" size="sm" colorScheme="red" onClick={clearCart}>
                  Kosongkan Keranjang
                </Button>
              </Flex>
            </Box>

            {/* Right: Order Summary & Coupon (1 Col) */}
            <Box>
              <Box
                p="24px"
                borderRadius="20px"
                bg={bgCard}
                border="1px solid"
                borderColor={borderColor}
                boxShadow="sm"
              >
                <Heading as="h3" fontSize="18px" fontWeight="800" color={textColor} mb="16px">
                  Ringkasan Belanja
                </Heading>

                {/* Coupon Code Input */}
                <Box mb="16px">
                  <Text fontSize="12px" fontWeight="700" color={textColorSecondary} mb="6px">
                    Kupon / Voucher Diskon:
                  </Text>
                  <InputGroup size="sm">
                    <Input
                      placeholder="e.g. MERDEKACVT"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      borderRadius="10px"
                      textTransform="uppercase"
                    />
                    <InputRightElement w="64px">
                      <Button size="xs" colorScheme="purple" borderRadius="8px" onClick={handleApplyCoupon}>
                        Gunakan
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Box>

                <VStack spacing="10px" align="stretch" py="14px" borderTop="1px solid" borderBottom="1px solid" borderColor={borderColor}>
                  <Flex justify="space-between">
                    <Text fontSize="13.5px" color={textColorSecondary}>
                      Total Harga ({cartCount} barang)
                    </Text>
                    <Text fontSize="14px" fontWeight="700" color={textColor}>
                      Rp {cartSubtotal.toLocaleString('id-ID')}
                    </Text>
                  </Flex>

                  {appliedDiscount > 0 && (
                    <Flex justify="space-between" color="green.500">
                      <Text fontSize="13.5px" fontWeight="700">
                        Diskon Kupon
                      </Text>
                      <Text fontSize="14px" fontWeight="800">
                        - Rp {appliedDiscount.toLocaleString('id-ID')}
                      </Text>
                    </Flex>
                  )}

                  <Flex justify="space-between">
                    <Text fontSize="13.5px" color={textColorSecondary}>
                      Estimasi Ongkir
                    </Text>
                    <Text fontSize="12px" color="gray.400">
                      Dihitung saat checkout
                    </Text>
                  </Flex>
                </VStack>

                <Flex justify="space-between" align="baseline" py="16px">
                  <Text fontSize="15px" fontWeight="800" color={textColor}>
                    Total Tagihan:
                  </Text>
                  <Text fontSize="24px" fontWeight="900" color="brand.500">
                    Rp {finalTotal.toLocaleString('id-ID')}
                  </Text>
                </Flex>

                <Link href="/checkout">
                  <Button
                    w="100%"
                    size="lg"
                    colorScheme="purple"
                    h="52px"
                    borderRadius="14px"
                    fontWeight="800"
                    rightIcon={<MdArrowForward />}
                    boxShadow="0 4px 14px rgba(66, 42, 251, 0.3)"
                  >
                    Lanjut ke Checkout
                  </Button>
                </Link>

                <HStack spacing="6px" justify="center" mt="14px" color={textColorSecondary} fontSize="12px">
                  <Icon as={MdShield} color="green.500" />
                  <Text>Transaksi Aman & Bergaransi Bengkel</Text>
                </HStack>
              </Box>
            </Box>
          </SimpleGrid>
        )}
      </Container>

      <PublicFooter />
    </Box>
  );
}
