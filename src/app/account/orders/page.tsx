'use client';

import React from 'react';
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
  useColorModeValue,
} from '@chakra-ui/react';
import { MdReceiptLong, MdArrowForward, MdShoppingCart } from 'react-icons/md';
import Link from 'next/link';
import { useStore } from 'contexts/StoreContext';

export default function CustomerOrdersPage() {
  const { orders } = useStore();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const bgItem = useColorModeValue('gray.50', 'navy.900');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  return (
    <Box p="24px" borderRadius="20px" bg={bgCard} border="1px solid" borderColor={borderColor}>
      <Heading as="h1" fontSize="22px" fontWeight="900" color={textColor} mb="6px">
        Riwayat Pesanan Suku Cadang
      </Heading>
      <Text fontSize="13.5px" color={textColorSecondary} mb="24px">
        Daftar transaksi pembelian sparepart, pelumas, dan status pengiriman barang Anda.
      </Text>

      {orders.length === 0 ? (
        <Box py="40px" textAlign="center">
          <Text fontSize="14px" color={textColorSecondary} mb="16px">
            Belum ada transaksi pesanan yang tercatat.
          </Text>
          <Link href="/shop">
            <Button colorScheme="purple" size="sm" borderRadius="10px">
              Buka Katalog Toko
            </Button>
          </Link>
        </Box>
      ) : (
        <VStack spacing="16px" align="stretch">
          {orders.map((ord) => (
            <Box
              key={ord.id}
              p="16px"
              borderRadius="16px"
              bg={bgItem}
              border="1px solid"
              borderColor={borderColor}
            >
              <Flex justify="space-between" align="center" mb="12px" flexWrap="wrap" gap="8px">
                <HStack spacing="10px">
                  <Text fontSize="15px" fontWeight="900" color="brand.500">
                    {ord.orderNumber}
                  </Text>
                  <Text fontSize="12px" color="gray.400">
                    • {ord.createdAt}
                  </Text>
                </HStack>
                <HStack spacing="6px">
                  <Badge colorScheme={ord.paymentStatus === 'PAID' ? 'green' : 'orange'}>
                    {ord.paymentStatus}
                  </Badge>
                  <Badge colorScheme={ord.orderStatus === 'COMPLETED' ? 'green' : 'blue'}>
                    {ord.orderStatus}
                  </Badge>
                </HStack>
              </Flex>

              {/* Items List Preview */}
              <VStack spacing="8px" align="stretch" mb="14px">
                {ord.items.map((it, idx) => (
                  <Flex key={idx} justify="space-between" align="center" gap="10px">
                    <HStack spacing="10px">
                      <Image src={it.image} alt="" w="36px" h="36px" borderRadius="6px" objectFit="cover" />
                      <Text fontSize="13px" fontWeight="700" color={textColor} noOfLines={1}>
                        {it.productName} ({it.quantity}x)
                      </Text>
                    </HStack>
                    <Text fontSize="13px" fontWeight="700" color={textColor}>
                      Rp {(it.price * it.quantity).toLocaleString('id-ID')}
                    </Text>
                  </Flex>
                ))}
              </VStack>

              <Flex justify="space-between" align="center" pt="12px" borderTop="1px solid" borderColor={borderColor}>
                <Box>
                  <Text fontSize="11.5px" color={textColorSecondary}>
                    Total Tagihan:
                  </Text>
                  <Text fontSize="16px" fontWeight="900" color="brand.500">
                    Rp {ord.total.toLocaleString('id-ID')}
                  </Text>
                </Box>

                <Link href={`/account/orders/${ord.id}`}>
                  <Button size="sm" colorScheme="purple" borderRadius="10px" rightIcon={<MdArrowForward />}>
                    Detail & Upload Bukti
                  </Button>
                </Link>
              </Flex>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}
