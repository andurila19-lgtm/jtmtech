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
  Input,
  Textarea,
  Radio,
  RadioGroup,
  Stack,
  useColorModeValue,
  useToast,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Badge,
} from '@chakra-ui/react';
import {
  MdCheckCircle,
  MdLocationOn,
  MdPayment,
  MdLocalShipping,
  MdStorefront,
  MdQrCode2,
  MdAccountBalance,
  MdShield,
  MdChevronRight,
  MdLock,
} from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import { useStore } from 'contexts/StoreContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, cartCount, createOrder, customer, settings } = useStore();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const bgInput = useColorModeValue('secondaryGray.300', 'navy.900');
  const qrisNoticeBg = useColorModeValue('purple.50', 'navy.900');
  const bankNoticeBg = useColorModeValue('gray.50', 'navy.900');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  // Form States
  const [name, setName] = useState(customer?.name || 'Ahmad Fauzi');
  const [phone, setPhone] = useState(customer?.phone || '081234567890');
  const [email, setEmail] = useState(customer?.email || 'ahmad.fauzi@gmail.com');

  const [deliveryType, setDeliveryType] = useState<'SHIPPING' | 'PICKUP'>('SHIPPING');
  const [street, setStreet] = useState(customer?.address?.street || 'Jl. Soekarno Hatta No. 45');
  const [city, setCity] = useState(customer?.address?.city || 'Kota Malang');
  const [postalCode, setPostalCode] = useState(customer?.address?.postalCode || '65141');

  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'BANK_TRANSFER'>('QRIS');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingFee = deliveryType === 'SHIPPING' ? 20000 : 0;
  const grandTotal = cartSubtotal + shippingFee;

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast({
        title: 'Keranjang Masih Kosong',
        description: 'Silakan pilih suku cadang terlebih dahulu.',
        status: 'warning',
      });
      return;
    }

    if (deliveryType === 'SHIPPING' && (!street || !city)) {
      toast({
        title: 'Alamat Belum Lengkap',
        description: 'Mohon lengkapi jalan dan kota pengiriman.',
        status: 'warning',
      });
      return;
    }

    setIsSubmitting(true);

    const orderItems = cart.map((c) => ({
      productId: c.product.id,
      productName: c.product.name,
      sku: c.product.sku,
      price: c.product.discountPrice || c.product.price,
      quantity: c.quantity,
      image: c.product.images[0],
    }));

    const newOrder = createOrder({
      items: orderItems,
      subtotal: cartSubtotal,
      shippingFee,
      discount: 0,
      total: grandTotal,
      shippingAddress: {
        recipientName: name,
        phone,
        street: deliveryType === 'SHIPPING' ? street : 'Ambil di Bengkel JTM Tech',
        city: deliveryType === 'SHIPPING' ? city : settings.businessInfo.city,
        province: 'Jawa Timur',
        postalCode: deliveryType === 'SHIPPING' ? postalCode : '65141',
        courier: deliveryType === 'SHIPPING' ? 'JNE Regular (1-2 Hari)' : 'Ambil Langsung',
      },
      paymentMethod,
    });

    toast({
      title: 'Pesanan Berhasil Dibuat!',
      description: `Nomor pesanan ${newOrder.orderNumber}. Silakan selesaikan pembayaran.`,
      status: 'success',
      duration: 4000,
      position: 'top-right',
    });

    router.push(`/account/orders/${newOrder.id}`);
  };

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
            <BreadcrumbLink as={Link} href="/cart">
              Keranjang
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="brand.500" fontWeight="700">
              Checkout
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Heading as="h1" fontSize={{ base: '24px', md: '30px' }} fontWeight="900" color={textColor} mb="24px">
          Pembayaran & Pengiriman Pesanan
        </Heading>

        <SimpleGrid columns={{ base: 1, lg: 3 }} gap="30px" alignItems="flex-start">
          {/* Left Column: Form Details (2 Cols) */}
          <Box gridColumn={{ base: 'span 1', lg: 'span 2' }}>
            <VStack spacing="20px" align="stretch">
              {/* Step 1: Customer Contact */}
              <Box p="20px" borderRadius="18px" bg={bgCard} border="1px solid" borderColor={borderColor}>
                <HStack spacing="8px" mb="14px">
                  <Badge colorScheme="purple" borderRadius="full" px="8px" py="2px">
                    1
                  </Badge>
                  <Heading as="h3" fontSize="16px" fontWeight="800" color={textColor}>
                    Informasi Pembeli
                  </Heading>
                </HStack>

                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="14px">
                  <Box>
                    <Text fontSize="12.5px" fontWeight="700" color={textColor} mb="4px">
                      Nama Lengkap
                    </Text>
                    <Input value={name} onChange={(e) => setName(e.target.value)} bg={bgInput} borderRadius="10px" />
                  </Box>
                  <Box>
                    <Text fontSize="12.5px" fontWeight="700" color={textColor} mb="4px">
                      Nomor WhatsApp
                    </Text>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} bg={bgInput} borderRadius="10px" />
                  </Box>
                </SimpleGrid>
              </Box>

              {/* Step 2: Delivery Option */}
              <Box p="20px" borderRadius="18px" bg={bgCard} border="1px solid" borderColor={borderColor}>
                <HStack spacing="8px" mb="14px">
                  <Badge colorScheme="purple" borderRadius="full" px="8px" py="2px">
                    2
                  </Badge>
                  <Heading as="h3" fontSize="16px" fontWeight="800" color={textColor}>
                    Metode Pengiriman
                  </Heading>
                </HStack>

                <RadioGroup value={deliveryType} onChange={(val) => setDeliveryType(val as any)} mb="16px">
                  <Stack spacing="12px">
                    <Box
                      p="14px"
                      borderRadius="12px"
                      border="2px solid"
                      borderColor={deliveryType === 'SHIPPING' ? 'brand.500' : borderColor}
                      cursor="pointer"
                      onClick={() => setDeliveryType('SHIPPING')}
                    >
                      <Radio value="SHIPPING" colorScheme="purple">
                        <HStack spacing="8px" ml="6px">
                          <Icon as={MdLocalShipping} color="brand.500" />
                          <Box>
                            <Text fontSize="14px" fontWeight="800" color={textColor}>
                              Kirim ke Alamat Rumah (+ Rp 20.000)
                            </Text>
                            <Text fontSize="12px" color={textColorSecondary}>
                              Ekspedisi JNE / SiCepat / J&T Regular (Estimasi 1-2 Hari)
                            </Text>
                          </Box>
                        </HStack>
                      </Radio>
                    </Box>

                    <Box
                      p="14px"
                      borderRadius="12px"
                      border="2px solid"
                      borderColor={deliveryType === 'PICKUP' ? 'brand.500' : borderColor}
                      cursor="pointer"
                      onClick={() => setDeliveryType('PICKUP')}
                    >
                      <Radio value="PICKUP" colorScheme="purple">
                        <HStack spacing="8px" ml="6px">
                          <Icon as={MdStorefront} color="green.500" />
                          <Box>
                            <Text fontSize="14px" fontWeight="800" color={textColor}>
                              Ambil Sendiri di Bengkel JTM Tech (Gratis)
                            </Text>
                            <Text fontSize="12px" color={textColorSecondary}>
                              {settings.businessInfo.address}, {settings.businessInfo.city}
                            </Text>
                          </Box>
                        </HStack>
                      </Radio>
                    </Box>
                  </Stack>
                </RadioGroup>

                {/* Shipping Address Inputs if Shipping selected */}
                {deliveryType === 'SHIPPING' && (
                  <VStack spacing="12px" align="stretch" pt="10px" borderTop="1px solid" borderColor={borderColor}>
                    <Box>
                      <Text fontSize="12.5px" fontWeight="700" color={textColor} mb="4px">
                        Alamat Lengkap (Nama Jalan, No. Rumah, RT/RW, Kelurahan)
                      </Text>
                      <Textarea
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        bg={bgInput}
                        borderRadius="10px"
                        rows={2}
                      />
                    </Box>

                    <SimpleGrid columns={{ base: 1, sm: 2 }} gap="12px">
                      <Box>
                        <Text fontSize="12.5px" fontWeight="700" color={textColor} mb="4px">
                          Kota / Kabupaten
                        </Text>
                        <Input value={city} onChange={(e) => setCity(e.target.value)} bg={bgInput} borderRadius="10px" />
                      </Box>
                      <Box>
                        <Text fontSize="12.5px" fontWeight="700" color={textColor} mb="4px">
                          Kode Pos
                        </Text>
                        <Input
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          bg={bgInput}
                          borderRadius="10px"
                        />
                      </Box>
                    </SimpleGrid>
                  </VStack>
                )}
              </Box>

              {/* Step 3: Payment Method Selection */}
              <Box p="20px" borderRadius="18px" bg={bgCard} border="1px solid" borderColor={borderColor}>
                <HStack spacing="8px" mb="14px">
                  <Badge colorScheme="purple" borderRadius="full" px="8px" py="2px">
                    3
                  </Badge>
                  <Heading as="h3" fontSize="16px" fontWeight="800" color={textColor}>
                    Metode Pembayaran
                  </Heading>
                </HStack>

                <RadioGroup value={paymentMethod} onChange={(val) => setPaymentMethod(val as any)}>
                  <Stack spacing="12px">
                    {/* QRIS Universal */}
                    <Box
                      p="14px"
                      borderRadius="12px"
                      border="2px solid"
                      borderColor={paymentMethod === 'QRIS' ? 'brand.500' : borderColor}
                      cursor="pointer"
                      onClick={() => setPaymentMethod('QRIS')}
                    >
                      <Radio value="QRIS" colorScheme="purple">
                        <HStack spacing="8px" ml="6px">
                          <Icon as={MdQrCode2} color="brand.500" w="22px" h="22px" />
                          <Box>
                            <Text fontSize="14px" fontWeight="800" color={textColor}>
                              QRIS Universal (Gopay, OVO, Dana, BCA Mobile, ShopeePay)
                            </Text>
                            <Text fontSize="12px" color={textColorSecondary}>
                              Scan kode QR langsung dari aplikasi e-wallet / m-banking Anda.
                            </Text>
                          </Box>
                        </HStack>
                      </Radio>

                      {paymentMethod === 'QRIS' && (
                        <Box mt="12px" p="12px" bg={qrisNoticeBg} borderRadius="10px">
                          <Text fontSize="12px" color="purple.700" fontWeight="600">
                            ✓ QRIS akan langsung ditampilkan setelah pesanan dibuat untuk Anda scan & bayar.
                          </Text>
                        </Box>
                      )}
                    </Box>

                    {/* Bank Transfer Manual */}
                    <Box
                      p="14px"
                      borderRadius="12px"
                      border="2px solid"
                      borderColor={paymentMethod === 'BANK_TRANSFER' ? 'brand.500' : borderColor}
                      cursor="pointer"
                      onClick={() => setPaymentMethod('BANK_TRANSFER')}
                    >
                      <Radio value="BANK_TRANSFER" colorScheme="purple">
                        <HStack spacing="8px" ml="6px">
                          <Icon as={MdAccountBalance} color="brand.500" w="22px" h="22px" />
                          <Box>
                            <Text fontSize="14px" fontWeight="800" color={textColor}>
                              Transfer Bank Manual (BCA / Mandiri / BRI)
                            </Text>
                            <Text fontSize="12px" color={textColorSecondary}>
                              Transfer ke rekening resmi bengkel dan upload bukti transfer.
                            </Text>
                          </Box>
                        </HStack>
                      </Radio>

                      {paymentMethod === 'BANK_TRANSFER' && (
                        <Box mt="12px" p="12px" bg={bankNoticeBg} borderRadius="10px">
                          <Text fontSize="12.5px" fontWeight="700" color={textColor}>
                            BCA: 123-456-7890 an Bengkel JTM Tech
                          </Text>
                          <Text fontSize="11.5px" color={textColorSecondary}>
                            Konfirmasi pembayaran instan setelah mengunggah foto struk/bukti transfer.
                          </Text>
                        </Box>
                      )}
                    </Box>
                  </Stack>
                </RadioGroup>
              </Box>
            </VStack>
          </Box>

          {/* Right Column: Order Items Summary & Submit (1 Col) */}
          <Box>
            <Box p="24px" borderRadius="20px" bg={bgCard} border="1px solid" borderColor={borderColor} boxShadow="md">
              <Heading as="h3" fontSize="18px" fontWeight="800" color={textColor} mb="16px">
                Rincian Pesanan ({cartCount})
              </Heading>

              <VStack spacing="10px" align="stretch" maxH="240px" overflowY="auto" mb="16px">
                {cart.map((c) => (
                  <Flex key={c.product.id} justify="space-between" align="center" gap="10px">
                    <Image src={c.product.images[0]} alt="" w="40px" h="40px" borderRadius="8px" objectFit="cover" />
                    <Box flex="1">
                      <Text fontSize="12.5px" fontWeight="700" color={textColor} noOfLines={1}>
                        {c.product.name}
                      </Text>
                      <Text fontSize="11px" color={textColorSecondary}>
                        {c.quantity}x Rp {(c.product.discountPrice || c.product.price).toLocaleString('id-ID')}
                      </Text>
                    </Box>
                    <Text fontSize="13px" fontWeight="800" color={textColor}>
                      Rp {((c.product.discountPrice || c.product.price) * c.quantity).toLocaleString('id-ID')}
                    </Text>
                  </Flex>
                ))}
              </VStack>

              <VStack spacing="10px" align="stretch" py="14px" borderTop="1px solid" borderBottom="1px solid" borderColor={borderColor}>
                <Flex justify="space-between">
                  <Text fontSize="13px" color={textColorSecondary}>
                    Subtotal Produk
                  </Text>
                  <Text fontSize="13.5px" fontWeight="700" color={textColor}>
                    Rp {cartSubtotal.toLocaleString('id-ID')}
                  </Text>
                </Flex>

                <Flex justify="space-between">
                  <Text fontSize="13px" color={textColorSecondary}>
                    Biaya Pengiriman
                  </Text>
                  <Text fontSize="13.5px" fontWeight="700" color={shippingFee === 0 ? 'green.500' : textColor}>
                    {shippingFee === 0 ? 'GRATIS' : `Rp ${shippingFee.toLocaleString('id-ID')}`}
                  </Text>
                </Flex>
              </VStack>

              <Flex justify="space-between" align="baseline" py="16px">
                <Text fontSize="15px" fontWeight="800" color={textColor}>
                  Total Pembayaran:
                </Text>
                <Text fontSize="24px" fontWeight="900" color="brand.500">
                  Rp {grandTotal.toLocaleString('id-ID')}
                </Text>
              </Flex>

              <Button
                w="100%"
                size="lg"
                colorScheme="purple"
                h="52px"
                borderRadius="14px"
                fontWeight="800"
                leftIcon={<MdLock />}
                onClick={handlePlaceOrder}
                isLoading={isSubmitting}
                boxShadow="0 4px 16px rgba(66, 42, 251, 0.3)"
              >
                Buat Pesanan Sekarang
              </Button>

              <HStack spacing="6px" justify="center" mt="14px" color={textColorSecondary} fontSize="12px">
                <Icon as={MdShield} color="green.500" />
                <Text>Jaminan Transaksi Aman & Terpercaya</Text>
              </HStack>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>

      <PublicFooter />
    </Box>
  );
}
