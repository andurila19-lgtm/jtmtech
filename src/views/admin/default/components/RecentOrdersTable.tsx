'use client';

import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import Link from 'next/link';
import { MdOutlineArrowForward, MdShoppingCart, MdChevronRight } from 'react-icons/md';
import { initialOrders } from 'services/mockData';

export default function RecentOrdersTable() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const cardItemBg = useColorModeValue('gray.50', 'navy.700');
  const hoverBg = useColorModeValue('purple.50', 'whiteAlpha.50');

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <Badge colorScheme="green" fontSize="10px">SELESAI</Badge>;
      case 'SHIPPED':
        return <Badge colorScheme="blue" fontSize="10px">DIKIRIM</Badge>;
      case 'PROCESSING':
        return <Badge colorScheme="purple" fontSize="10px">DIPROSES</Badge>;
      case 'WAITING_PAYMENT':
        return <Badge colorScheme="orange" fontSize="10px">MENUNGGU BAYAR</Badge>;
      case 'CANCELLED':
        return <Badge colorScheme="red" fontSize="10px">BATAL</Badge>;
      default:
        return <Badge colorScheme="gray" fontSize="10px">{status}</Badge>;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'PAID':
        return <Badge colorScheme="green" variant="subtle" fontSize="10px">LUNAS</Badge>;
      case 'WAITING_VERIFICATION':
        return <Badge colorScheme="orange" variant="solid" fontSize="10px">VERIFIKASI</Badge>;
      case 'PENDING':
        return <Badge colorScheme="yellow" variant="subtle" fontSize="10px">PENDING</Badge>;
      case 'REJECTED':
        return <Badge colorScheme="red" variant="subtle" fontSize="10px">DITOLAK</Badge>;
      default:
        return <Badge fontSize="10px">{status}</Badge>;
    }
  };

  // Limit to 4 recent orders
  const displayOrders = initialOrders.slice(0, 4);

  return (
    <Card p={{ base: '16px', md: '20px' }} w="100%">
      <Flex justify="space-between" align="center" mb="14px">
        <HStack spacing="6px">
          <Icon as={MdShoppingCart} color="brand.500" w="18px" h="18px" />
          <Text color={textColor} fontSize="16px" fontWeight="700">
            Pesanan Suku Cadang Terbaru
          </Text>
        </HStack>
        <Link href="/admin/orders">
          <Button size="xs" variant="ghost" colorScheme="purple" rightIcon={<MdOutlineArrowForward />}>
            Lihat Semua
          </Button>
        </Link>
      </Flex>

      {/* MOBILE CARD VIEW (< md) */}
      <Box display={{ base: 'block', md: 'none' }}>
        <VStack spacing="10px" align="stretch">
          {displayOrders.map((order) => (
            <Link key={order.id} href="/admin/orders" style={{ textDecoration: 'none' }}>
              <Box
                p="12px"
                borderRadius="12px"
                bg={cardItemBg}
                border="1px solid"
                borderColor={borderColor}
                transition="all 0.2s"
                _hover={{ bg: hoverBg, borderColor: 'brand.300' }}
                cursor="pointer"
              >
                <Flex justify="space-between" align="center" mb="6px">
                  <Text fontSize="12.5px" fontWeight="800" color="brand.500">
                    {order.orderNumber}
                  </Text>
                  <HStack spacing="4px">
                    {getPaymentBadge(order.paymentStatus)}
                    {getOrderStatusBadge(order.orderStatus)}
                  </HStack>
                </Flex>

                <Flex justify="space-between" align="flex-end">
                  <Box>
                    <Text fontSize="13px" fontWeight="700" color={textColor}>
                      {order.customerName}
                    </Text>
                    <Text fontSize="11px" color={textColorSecondary}>
                      {order.items.length} produk • {order.shippingAddress.city}
                    </Text>
                  </Box>
                  <Text fontSize="13.5px" fontWeight="800" color={textColor}>
                    Rp {order.total.toLocaleString('id-ID')}
                  </Text>
                </Flex>
              </Box>
            </Link>
          ))}
        </VStack>
      </Box>

      {/* DESKTOP TABLE VIEW (>= md) */}
      <Box display={{ base: 'none', md: 'block' }} overflowX="auto">
        <Table variant="simple" size="sm" color="gray.500">
          <Thead>
            <Tr>
              <Th borderColor={borderColor} color="gray.400" fontSize="10.5px">NO. PESANAN</Th>
              <Th borderColor={borderColor} color="gray.400" fontSize="10.5px">PELANGGAN</Th>
              <Th borderColor={borderColor} color="gray.400" fontSize="10.5px">TOTAL</Th>
              <Th borderColor={borderColor} color="gray.400" fontSize="10.5px">PEMBAYARAN</Th>
              <Th borderColor={borderColor} color="gray.400" fontSize="10.5px">STATUS</Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayOrders.map((order) => (
              <Tr key={order.id} _hover={{ bg: hoverBg }}>
                <Td borderColor={borderColor}>
                  <Text color={textColor} fontSize="12.5px" fontWeight="700">
                    {order.orderNumber}
                  </Text>
                  <Text fontSize="10.5px" color="gray.400">
                    {order.items.length} item • {order.paymentMethod}
                  </Text>
                </Td>
                <Td borderColor={borderColor}>
                  <Text color={textColor} fontSize="12.5px" fontWeight="600">
                    {order.customerName}
                  </Text>
                  <Text fontSize="10.5px" color="gray.400">
                    {order.shippingAddress.city}
                  </Text>
                </Td>
                <Td borderColor={borderColor}>
                  <Text color={textColor} fontSize="12.5px" fontWeight="700">
                    Rp {order.total.toLocaleString('id-ID')}
                  </Text>
                </Td>
                <Td borderColor={borderColor}>{getPaymentBadge(order.paymentStatus)}</Td>
                <Td borderColor={borderColor}>{getOrderStatusBadge(order.orderStatus)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}

