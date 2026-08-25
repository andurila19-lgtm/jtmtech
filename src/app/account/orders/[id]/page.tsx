'use client';

import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Badge,
  Button,
  VStack,
  HStack,
  Flex,
  Image,
  Input,
  Icon,
  FormControl,
  FormLabel,
  useColorModeValue,
  useToast,
  SimpleGrid,
  Divider,
} from '@chakra-ui/react';
import {
  MdCheckCircle,
  MdArrowBack,
  MdUpload,
  MdPayment,
  MdLocalShipping,
  MdQrCode2,
} from 'react-icons/md';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ImageUpload from 'components/imageUpload/ImageUpload';
import { useStore } from 'contexts/StoreContext';

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params?.id as string;
  const { orders, updateOrderPaymentProof, settings } = useStore();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const bgInput = useColorModeValue('secondaryGray.300', 'navy.900');
  const bgItem = useColorModeValue('gray.50', 'navy.900');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const order = orders.find((o) => o.id === orderId || o.orderNumber === orderId) || orders[0];

  // Upload proof state
  const [proofImage, setProofImage] = useState(order.paymentProof?.imageUrl || '');
  const [accountHolder, setAccountHolder] = useState(order.paymentProof?.accountHolder || '');
  const [bankName, setBankName] = useState(order.paymentProof?.bankName || 'BCA');
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofImage) {
      toast({
        title: 'Gambar Belum Dipilih',
        description: 'Silakan unggah foto struk bukti transfer atau screenshot QRIS.',
        status: 'warning',
      });
      return;
    }

    setIsUploading(true);
    updateOrderPaymentProof(order.id, {
      imageUrl: proofImage,
      accountHolder: accountHolder || 'Ahmad Fauzi',
      bankName: bankName || 'BCA',
      transferDate: new Date().toISOString().slice(0, 10),
    });

    toast({
      title: 'Bukti Pembayaran Berhasil Diunggah!',
      description: 'Admin bengkel akan segera memverifikasi transaksi Anda.',
      status: 'success',
      duration: 3500,
      position: 'top-right',
    });
    setIsUploading(false);
  };

  return (
    <Box p={{ base: '18px', md: '26px' }} borderRadius="20px" bg={bgCard} border="1px solid" borderColor={borderColor}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb="18px" flexWrap="wrap" gap="10px">
        <HStack spacing="12px">
          <Link href="/account/orders">
            <Button size="sm" variant="ghost" leftIcon={<MdArrowBack />}>
              Kembali
            </Button>
          </Link>
          <Box>
            <Heading as="h1" fontSize={{ base: '18px', md: '22px' }} fontWeight="900" color={textColor}>
              {order.orderNumber}
            </Heading>
            <Text fontSize="12px" color={textColorSecondary}>
              Dibuat pada: {order.createdAt}
            </Text>
          </Box>
        </HStack>

        <HStack spacing="8px">
          <Badge colorScheme={order.paymentStatus === 'PAID' ? 'green' : 'orange'} fontSize="12px" px="8px" py="3px">
            {order.paymentStatus}
          </Badge>
          <Badge colorScheme={order.orderStatus === 'COMPLETED' ? 'green' : 'blue'} fontSize="12px" px="8px" py="3px">
            {order.orderStatus}
          </Badge>
        </HStack>
      </Flex>

      <Divider borderColor={borderColor} mb="24px" />

      {/* Items List */}
      <Box mb="26px">
        <Text fontSize="14px" fontWeight="800" color={textColor} mb="12px">
          Barang yang Dipesan:
        </Text>
        <VStack spacing="10px" align="stretch">
          {order.items.map((item, idx) => (
            <Flex
              key={idx}
              p="12px"
              borderRadius="12px"
              bg={bgItem}
              border="1px solid"
              borderColor={borderColor}
              justify="space-between"
              align="center"
            >
              <HStack spacing="12px">
                <Image src={item.image} alt="" w="48px" h="48px" borderRadius="8px" objectFit="cover" />
                <Box>
                  <Text fontSize="13.5px" fontWeight="800" color={textColor}>
                    {item.productName}
                  </Text>
                  <Text fontSize="12px" color={textColorSecondary}>
                    {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                  </Text>
                </Box>
              </HStack>
              <Text fontSize="14px" fontWeight="900" color={textColor}>
                Rp {(item.price * item.quantity).toLocaleString('id-ID')}
              </Text>
            </Flex>
          ))}
        </VStack>
      </Box>

      {/* Order Totals Breakdown */}
      <Box p="16px" borderRadius="14px" bg={useColorModeValue('gray.50', 'navy.900')} mb="26px">
        <VStack spacing="8px" align="stretch" fontSize="13px">
          <Flex justify="space-between">
            <Text color={textColorSecondary}>Subtotal Barang:</Text>
            <Text fontWeight="700" color={textColor}>Rp {order.subtotal.toLocaleString('id-ID')}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text color={textColorSecondary}>Biaya Pengiriman:</Text>
            <Text fontWeight="700" color={textColor}>Rp {order.shippingFee.toLocaleString('id-ID')}</Text>
          </Flex>
          <Divider borderColor={borderColor} />
          <Flex justify="space-between" align="baseline">
            <Text fontSize="14px" fontWeight="800" color={textColor}>Total Tagihan:</Text>
            <Text fontSize="20px" fontWeight="900" color="brand.500">
              Rp {order.total.toLocaleString('id-ID')}
            </Text>
          </Flex>
        </VStack>
      </Box>

      {/* Shipping & Payment Section */}
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px" mb="30px">
        {/* Shipping Address */}
        <Box p="16px" borderRadius="14px" border="1px solid" borderColor={borderColor}>
          <HStack spacing="8px" mb="10px">
            <Icon as={MdLocalShipping} color="brand.500" />
            <Text fontSize="13.5px" fontWeight="800" color={textColor}>
              Tujuan Pengiriman
            </Text>
          </HStack>
          <Text fontSize="13px" fontWeight="700" color={textColor}>
            {order.shippingAddress.recipientName} ({order.shippingAddress.phone})
          </Text>
          <Text fontSize="12.5px" color={textColorSecondary} mt="2px">
            {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}
          </Text>
          <Text fontSize="12px" color="brand.500" fontWeight="700" mt="6px">
            Kurir: {order.shippingAddress.courier || 'Ekspedisi Regular'}
          </Text>
        </Box>

        {/* Payment Method & Upload Proof */}
        <Box p="16px" borderRadius="14px" border="1px solid" borderColor={borderColor}>
          <HStack spacing="8px" mb="10px">
            <Icon as={MdPayment} color="green.500" />
            <Text fontSize="13.5px" fontWeight="800" color={textColor}>
              Metode Pembayaran: {order.paymentMethod}
            </Text>
          </HStack>

          {order.paymentMethod === 'QRIS' ? (
            <Box fontSize="12.5px" color={textColorSecondary} mb="12px">
              Silakan scan QRIS resmi bengkel di aplikasi m-banking atau e-wallet Anda sebesar{' '}
              <strong>Rp {order.total.toLocaleString('id-ID')}</strong>.
            </Box>
          ) : (
            <Box fontSize="12.5px" color={textColorSecondary} mb="12px">
              Rekening Transfer: <strong>BCA 123-456-7890 an Bengkel JTM Tech</strong>
            </Box>
          )}

          {order.paymentStatus === 'PAID' ? (
            <Badge colorScheme="green" p="6px 10px" borderRadius="8px" fontSize="12px">
              ✓ Pembayaran Telah Lunas & Terverifikasi
            </Badge>
          ) : order.paymentStatus === 'WAITING_VERIFICATION' ? (
            <Badge colorScheme="purple" p="6px 10px" borderRadius="8px" fontSize="12px">
              ⏳ Bukti Pembayaran Sedang Diverifikasi Admin
            </Badge>
          ) : (
            <form onSubmit={handleUploadProof}>
              <VStack spacing="12px" align="stretch" pt="8px">
                <SimpleGrid columns={2} gap="8px">
                  <Box>
                    <Text fontSize="11.5px" fontWeight="700" color={textColor} mb="2px">
                      Atas Nama Rekening
                    </Text>
                    <Input
                      size="sm"
                      placeholder="Nama Pengirim"
                      value={accountHolder}
                      onChange={(e) => setAccountHolder(e.target.value)}
                      bg={bgInput}
                      borderRadius="8px"
                    />
                  </Box>
                  <Box>
                    <Text fontSize="11.5px" fontWeight="700" color={textColor} mb="2px">
                      Bank Pengirim
                    </Text>
                    <Input
                      size="sm"
                      placeholder="BCA / Mandiri"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      bg={bgInput}
                      borderRadius="8px"
                    />
                  </Box>
                </SimpleGrid>

                <ImageUpload
                  label="Pilih Foto Bukti Struk Transfer"
                  helperText="Format JPG, PNG, WEBP max 5MB."
                  value={proofImage}
                  onChange={(url) => setProofImage(url)}
                />

                <Button
                  type="submit"
                  size="sm"
                  colorScheme="purple"
                  borderRadius="10px"
                  fontWeight="800"
                  leftIcon={<MdUpload />}
                  isLoading={isUploading}
                >
                  Kirim Bukti Pembayaran
                </Button>
              </VStack>
            </form>
          )}
        </Box>
      </SimpleGrid>

      {/* Order Status Timeline */}
      <Box p="16px" borderRadius="14px" bg={bgItem}>
        <Text fontSize="13.5px" fontWeight="800" color={textColor} mb="12px">
          Riwayat Perjalanan Pesanan (Timeline)
        </Text>
        <VStack spacing="10px" align="stretch">
          {order.timeline.map((step, idx) => (
            <HStack key={idx} spacing="10px" align="flex-start">
              <Icon as={MdCheckCircle} color="green.500" mt="2px" />
              <Box>
                <HStack spacing="6px">
                  <Text fontSize="13px" fontWeight="800" color={textColor}>
                    {step.status}
                  </Text>
                  <Text fontSize="11px" color="gray.400">
                    ({step.timestamp})
                  </Text>
                </HStack>
                <Text fontSize="12px" color={textColorSecondary}>
                  {step.description}
                </Text>
              </Box>
            </HStack>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}
