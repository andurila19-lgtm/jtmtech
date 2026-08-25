'use client';

import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { useState } from 'react';
import {
  MdShoppingCart,
  MdSearch,
  MdVisibility,
  MdLocalShipping,
  MdCheckCircle,
  MdPayment,
  MdLocationOn,
  MdPerson,
} from 'react-icons/md';
import { initialOrders } from 'services/mockData';
import { Order, OrderStatus, PaymentStatus } from 'types/workshop';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState('');
  const [filterOrderStatus, setFilterOrderStatus] = useState('ALL');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('ALL');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Drawer status change state
  const [newOrderStatus, setNewOrderStatus] = useState<OrderStatus>('PROCESSING');
  const [newPaymentStatus, setNewPaymentStatus] = useState<PaymentStatus>('PAID');
  const [trackingNo, setTrackingNo] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const inputBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const boxBg = useColorModeValue('gray.50', 'navy.700');
  const hoverBg = useColorModeValue('gray.50', 'whiteAlpha.50');

  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(search.toLowerCase()) ||
      ord.shippingAddress.city.toLowerCase().includes(search.toLowerCase());

    const matchesOrder = filterOrderStatus === 'ALL' || ord.orderStatus === filterOrderStatus;
    const matchesPayment =
      filterPaymentStatus === 'ALL' || ord.paymentStatus === filterPaymentStatus;

    return matchesSearch && matchesOrder && matchesPayment;
  });

  const handleOpenDetail = (ord: Order) => {
    setSelectedOrder(ord);
    setNewOrderStatus(ord.orderStatus);
    setNewPaymentStatus(ord.paymentStatus);
    setTrackingNo(ord.shippingAddress.trackingNumber || '');
    onOpen();
  };

  const handleUpdateStatus = () => {
    if (!selectedOrder) return;

    const updated = orders.map((o) => {
      if (o.id === selectedOrder.id) {
        const newTimeline = [...o.timeline];
        if (o.orderStatus !== newOrderStatus) {
          newTimeline.push({
            status: `Status diubah ke ${newOrderStatus}`,
            timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
            description: `Admin memperbarui status pesanan. No Resi: ${trackingNo || '-'}`,
          });
        }
        return {
          ...o,
          orderStatus: newOrderStatus,
          paymentStatus: newPaymentStatus,
          shippingAddress: {
            ...o.shippingAddress,
            trackingNumber: trackingNo,
          },
          timeline: newTimeline,
          updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
        };
      }
      return o;
    });

    setOrders(updated);
    toast({
      title: 'Status Pesanan Diperbarui',
      description: `Pesanan ${selectedOrder.orderNumber} berhasil diperbarui.`,
      status: 'success',
      duration: 3000,
      position: 'top-right',
    });
    onClose();
  };

  const getOrderStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'COMPLETED':
        return <Badge colorScheme="green">SELESAI</Badge>;
      case 'SHIPPED':
        return <Badge colorScheme="blue">DIKIRIM</Badge>;
      case 'PROCESSING':
        return <Badge colorScheme="purple">DIPROSES</Badge>;
      case 'WAITING_PAYMENT':
        return <Badge colorScheme="orange">MENUNGGU BAYAR</Badge>;
      case 'CANCELLED':
        return <Badge colorScheme="red">DIBATALKAN</Badge>;
      default:
        return <Badge colorScheme="gray">{status}</Badge>;
    }
  };

  const getPaymentBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'PAID':
        return <Badge colorScheme="green" variant="subtle">LUNAS</Badge>;
      case 'WAITING_VERIFICATION':
        return <Badge colorScheme="orange" variant="solid">PERLU VERIFIKASI</Badge>;
      case 'PENDING':
        return <Badge colorScheme="yellow">PENDING</Badge>;
      case 'REJECTED':
        return <Badge colorScheme="red">DITOLAK</Badge>;
      case 'REFUNDED':
        return <Badge colorScheme="purple">REFUND</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Box pt={{ base: '10px', md: '70px', xl: '70px' }} pb="30px">
      <Flex justify="space-between" align="center" mb="16px" flexWrap="wrap" gap="10px">
        <Box>
          <HStack spacing="8px">
            <Icon as={MdShoppingCart} color="brand.500" w="24px" h="24px" />
            <Text fontSize="22px" fontWeight="800" color={textColor}>
              Pesanan Toko Suku Cadang
            </Text>
            <Badge colorScheme="purple" borderRadius="full">
              {filteredOrders.length} Pesanan
            </Badge>
          </HStack>
          <Text fontSize="13px" color={textColorSecondary}>
            Kelola pesanan sparepart, pelacakan nomor resi, dan status pembayaran pelanggan.
          </Text>
        </Box>
      </Flex>

      {/* Filter Card */}
      <Card p="16px" mb="20px">
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="14px">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={MdSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Cari Nomor Order, Nama Pelanggan, Kota..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              bg={inputBg}
              borderRadius="12px"
            />
          </InputGroup>

          <Select
            value={filterOrderStatus}
            onChange={(e) => setFilterOrderStatus(e.target.value)}
            bg={inputBg}
            borderRadius="12px"
          >
            <option value="ALL">Semua Status Pesanan</option>
            <option value="PENDING">Menunggu (Pending)</option>
            <option value="WAITING_PAYMENT">Menunggu Pembayaran</option>
            <option value="PROCESSING">Sedang Diproses Gudang</option>
            <option value="SHIPPED">Sedang Dikirim Kurir</option>
            <option value="COMPLETED">Selesai & Diterima</option>
            <option value="CANCELLED">Dibatalkan</option>
          </Select>

          <Select
            value={filterPaymentStatus}
            onChange={(e) => setFilterPaymentStatus(e.target.value)}
            bg={inputBg}
            borderRadius="12px"
          >
            <option value="ALL">Semua Status Pembayaran</option>
            <option value="WAITING_VERIFICATION">Perlu Verifikasi Transfer</option>
            <option value="PAID">Lunas (Paid)</option>
            <option value="PENDING">Belum Bayar (Pending)</option>
            <option value="REJECTED">Ditolak / Gagal</option>
          </Select>
        </SimpleGrid>
      </Card>

      {/* Orders List Container */}
      <Card p={{ base: '14px', md: '20px' }}>
        {/* MOBILE CARD VIEW (< md) */}
        <Box display={{ base: 'block', md: 'none' }}>
          <VStack spacing="12px" align="stretch">
            {filteredOrders.map((ord) => (
              <Box
                key={ord.id}
                p="14px"
                borderRadius="14px"
                bg={boxBg}
                border="1px solid"
                borderColor={borderColor}
              >
                <Flex justify="space-between" align="center" mb="8px">
                  <Text fontSize="13.5px" fontWeight="800" color="brand.500">
                    {ord.orderNumber}
                  </Text>
                  <HStack spacing="4px">
                    {getPaymentBadge(ord.paymentStatus)}
                    {getOrderStatusBadge(ord.orderStatus)}
                  </HStack>
                </Flex>

                <Box mb="10px">
                  <Text fontSize="13.5px" fontWeight="700" color={textColor}>
                    {ord.customerName}
                  </Text>
                  <Text fontSize="11.5px" color={textColorSecondary}>
                    {ord.customerPhone} • {ord.shippingAddress.city}
                  </Text>
                  <Text fontSize="11px" color="gray.400" mt="2px">
                    📅 {ord.createdAt} • {ord.items.length} jenis sparepart
                  </Text>
                </Box>

                <Flex justify="space-between" align="center" pt="8px" borderTop="1px solid" borderColor={borderColor}>
                  <Box>
                    <Text fontSize="10.5px" color={textColorSecondary}>Total Tagihan:</Text>
                    <Text fontSize="14px" fontWeight="800" color={textColor}>
                      Rp {ord.total.toLocaleString('id-ID')}
                    </Text>
                  </Box>
                  <Button
                    size="sm"
                    colorScheme="purple"
                    leftIcon={<MdVisibility />}
                    h="38px"
                    px="14px"
                    onClick={() => handleOpenDetail(ord)}
                  >
                    Detail & Resi
                  </Button>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* DESKTOP TABLE VIEW (>= md) */}
        <Box display={{ base: 'none', md: 'block' }} overflowX="auto">
          <Table variant="simple" color="gray.500">
            <Thead>
              <Tr>
                <Th borderColor={borderColor} color="gray.400">NO. PESANAN & TANGGAL</Th>
                <Th borderColor={borderColor} color="gray.400">PELANGGAN</Th>
                <Th borderColor={borderColor} color="gray.400">TOTAL TRANSAKSI</Th>
                <Th borderColor={borderColor} color="gray.400">METODE BAYAR</Th>
                <Th borderColor={borderColor} color="gray.400">STATUS BAYAR</Th>
                <Th borderColor={borderColor} color="gray.400">STATUS PESANAN</Th>
                <Th borderColor={borderColor} color="gray.400" textAlign="right">DETAIL</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredOrders.map((ord) => (
                <Tr key={ord.id} _hover={{ bg: hoverBg }}>
                  <Td borderColor={borderColor}>
                    <Text color={textColor} fontSize="13px" fontWeight="700">
                      {ord.orderNumber}
                    </Text>
                    <Text fontSize="11px" color="gray.400">
                      {ord.createdAt}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text color={textColor} fontSize="13px" fontWeight="600">
                      {ord.customerName}
                    </Text>
                    <Text fontSize="11px" color="gray.400">
                      {ord.customerPhone} ({ord.shippingAddress.city})
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text color={textColor} fontSize="13.5px" fontWeight="700">
                      Rp {ord.total.toLocaleString('id-ID')}
                    </Text>
                    <Text fontSize="11px" color="gray.400">
                      {ord.items.length} jenis suku cadang
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Badge colorScheme="purple">{ord.paymentMethod}</Badge>
                  </Td>
                  <Td borderColor={borderColor}>{getPaymentBadge(ord.paymentStatus)}</Td>
                  <Td borderColor={borderColor}>{getOrderStatusBadge(ord.orderStatus)}</Td>
                  <Td borderColor={borderColor} textAlign="right">
                    <Button
                      size="xs"
                      colorScheme="purple"
                      leftIcon={<MdVisibility />}
                      onClick={() => handleOpenDetail(ord)}
                    >
                      Detail
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Card>

      {/* Order Detail Drawer */}
      <Drawer isOpen={isOpen} placement="right" size={{ base: 'full', md: 'lg' }} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue('white', 'navy.800')}>
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px solid" borderColor={borderColor}>
            Detail Pesanan {selectedOrder?.orderNumber}
          </DrawerHeader>

          {selectedOrder && (
            <DrawerBody py="20px">
              <VStack spacing="18px" align="stretch">
                {/* Status Bar */}
                <Box p="14px" bg={boxBg} borderRadius="12px">
                  <Flex justify="space-between" align="center" flexWrap="wrap" gap="10px">
                    <Box>
                      <Text fontSize="11px" color="gray.400">STATUS ORDER</Text>
                      <Box mt="2px">{getOrderStatusBadge(selectedOrder.orderStatus)}</Box>
                    </Box>
                    <Box>
                      <Text fontSize="11px" color="gray.400">STATUS BAYAR</Text>
                      <Box mt="2px">{getPaymentBadge(selectedOrder.paymentStatus)}</Box>
                    </Box>
                    <Box>
                      <Text fontSize="11px" color="gray.400">METODE PEMBAYARAN</Text>
                      <Text fontWeight="700" fontSize="13px" color={textColor}>
                        {selectedOrder.paymentMethod}
                      </Text>
                    </Box>
                  </Flex>
                </Box>

                {/* Customer & Shipping Info */}
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="14px">
                  <Box p="12px" border="1px solid" borderColor={borderColor} borderRadius="12px">
                    <HStack mb="8px">
                      <Icon as={MdPerson} color="brand.500" />
                      <Text fontSize="13px" fontWeight="700" color={textColor}>
                        Informasi Pelanggan
                      </Text>
                    </HStack>
                    <Text fontSize="12.5px" fontWeight="600" color={textColor}>
                      {selectedOrder.customerName}
                    </Text>
                    <Text fontSize="12px" color="gray.500">
                      {selectedOrder.customerEmail}
                    </Text>
                    <Text fontSize="12px" color="gray.500">
                      {selectedOrder.customerPhone}
                    </Text>
                  </Box>

                  <Box p="12px" border="1px solid" borderColor={borderColor} borderRadius="12px">
                    <HStack mb="8px">
                      <Icon as={MdLocationOn} color="brand.500" />
                      <Text fontSize="13px" fontWeight="700" color={textColor}>
                        Alamat Pengiriman & Kurir
                      </Text>
                    </HStack>
                    <Text fontSize="12.5px" color={textColor}>
                      {selectedOrder.shippingAddress.recipientName} ({selectedOrder.shippingAddress.phone})
                    </Text>
                    <Text fontSize="12px" color="gray.500">
                      {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city},{' '}
                      {selectedOrder.shippingAddress.province} {selectedOrder.shippingAddress.postalCode}
                    </Text>
                    <Text fontSize="12px" color="brand.500" fontWeight="600" mt="4px">
                      🚚 Kurir: {selectedOrder.shippingAddress.courier || 'Ambil di Bengkel'}
                    </Text>
                  </Box>
                </SimpleGrid>

                {/* Products Purchased */}
                <Box>
                  <Text fontSize="13px" fontWeight="700" color={textColor} mb="8px">
                    Item Suku Cadang yang Dipesan
                  </Text>
                  <Table variant="simple" size="sm">
                    <Thead>
                      <Tr>
                        <Th borderColor={borderColor}>PRODUK</Th>
                        <Th borderColor={borderColor}>HARGA</Th>
                        <Th borderColor={borderColor}>QTY</Th>
                        <Th borderColor={borderColor} textAlign="right">SUBTOTAL</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {selectedOrder.items.map((item, idx) => (
                        <Tr key={idx}>
                          <Td borderColor={borderColor}>
                            <HStack spacing="8px">
                              <Image
                                src={item.image}
                                alt={item.productName}
                                w="36px"
                                h="36px"
                                borderRadius="6px"
                                objectFit="cover"
                              />
                              <Box>
                                <Text fontSize="12px" fontWeight="700" color={textColor} noOfLines={1}>
                                  {item.productName}
                                </Text>
                                <Text fontSize="10.5px" color="gray.400">
                                  {item.sku}
                                </Text>
                              </Box>
                            </HStack>
                          </Td>
                          <Td borderColor={borderColor} fontSize="12px">
                            Rp {item.price.toLocaleString('id-ID')}
                          </Td>
                          <Td borderColor={borderColor} fontSize="12px" fontWeight="700">
                            {item.quantity}x
                          </Td>
                          <Td borderColor={borderColor} fontSize="12px" fontWeight="700" textAlign="right">
                            Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>

                {/* Calculation Summary */}
                <Box p="14px" bg={boxBg} borderRadius="12px" fontSize="12.5px">
                  <Flex justify="space-between" mb="4px">
                    <Text color="gray.500">Subtotal Barang:</Text>
                    <Text fontWeight="600" color={textColor}>
                      Rp {selectedOrder.subtotal.toLocaleString('id-ID')}
                    </Text>
                  </Flex>
                  <Flex justify="space-between" mb="4px">
                    <Text color="gray.500">Ongkos Kirim:</Text>
                    <Text fontWeight="600" color={textColor}>
                      Rp {selectedOrder.shippingFee.toLocaleString('id-ID')}
                    </Text>
                  </Flex>
                  {selectedOrder.discount > 0 && (
                    <Flex justify="space-between" mb="4px">
                      <Text color="green.500">Potongan Diskon:</Text>
                      <Text fontWeight="600" color="green.500">
                        - Rp {selectedOrder.discount.toLocaleString('id-ID')}
                      </Text>
                    </Flex>
                  )}
                  <Divider my="6px" borderColor={borderColor} />
                  <Flex justify="space-between">
                    <Text fontWeight="700" fontSize="14px" color={textColor}>
                      Total Tagihan:
                    </Text>
                    <Text fontWeight="800" fontSize="15px" color="brand.500">
                      Rp {selectedOrder.total.toLocaleString('id-ID')}
                    </Text>
                  </Flex>
                </Box>

                {/* Payment Proof (if any) */}
                {selectedOrder.paymentProof && (
                  <Box p="14px" border="1px solid" borderColor="orange.200" borderRadius="12px">
                    <Text fontSize="13px" fontWeight="700" color="orange.600" mb="6px">
                      Bukti Pembayaran Manual
                    </Text>
                    <HStack spacing="14px" align="flex-start">
                      <Image
                        src={selectedOrder.paymentProof.imageUrl}
                        alt="Bukti Transfer"
                        w="80px"
                        h="80px"
                        borderRadius="8px"
                        objectFit="cover"
                        border="1px solid #ddd"
                      />
                      <Box fontSize="12px" color="gray.600">
                        <Text>Bank Pengirim: <strong>{selectedOrder.paymentProof.bankName}</strong></Text>
                        <Text>Nama Rekening: <strong>{selectedOrder.paymentProof.accountHolder}</strong></Text>
                        <Text>Waktu Transfer: {selectedOrder.paymentProof.transferDate}</Text>
                        {selectedOrder.paymentProof.notes && (
                          <Text mt="4px" fontStyle="italic">&quot;{selectedOrder.paymentProof.notes}&quot;</Text>
                        )}
                      </Box>
                    </HStack>
                  </Box>
                )}

                {/* Timeline */}
                <Box>
                  <Text fontSize="13px" fontWeight="700" color={textColor} mb="8px">
                    Timeline Riwayat Pesanan
                  </Text>
                  <VStack align="stretch" spacing="10px">
                    {selectedOrder.timeline.map((t, idx) => (
                      <HStack key={idx} spacing="10px" align="flex-start">
                        <Icon as={MdCheckCircle} color="green.500" mt="2px" />
                        <Box fontSize="12px">
                          <Text fontWeight="700" color={textColor}>{t.status} ({t.timestamp})</Text>
                          <Text color="gray.500">{t.description}</Text>
                        </Box>
                      </HStack>
                    ))}
                  </VStack>
                </Box>

                {/* Status Update Control */}
                <Box p="14px" border="1px solid" borderColor={borderColor} borderRadius="12px">
                  <Text fontSize="13px" fontWeight="700" color={textColor} mb="10px">
                    Update Status & Nomor Resi
                  </Text>
                  <SimpleGrid columns={2} gap="10px" mb="10px">
                    <Box>
                      <Text fontSize="11px" color="gray.400" mb="2px">Status Order</Text>
                      <Select
                        size="sm"
                        value={newOrderStatus}
                        onChange={(e) => setNewOrderStatus(e.target.value as OrderStatus)}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="WAITING_PAYMENT">WAITING PAYMENT</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </Select>
                    </Box>
                    <Box>
                      <Text fontSize="11px" color="gray.400" mb="2px">Status Pembayaran</Text>
                      <Select
                        size="sm"
                        value={newPaymentStatus}
                        onChange={(e) => setNewPaymentStatus(e.target.value as PaymentStatus)}
                      >
                        <option value="WAITING_VERIFICATION">WAITING VERIFICATION</option>
                        <option value="PAID">PAID</option>
                        <option value="PENDING">PENDING</option>
                        <option value="REJECTED">REJECTED</option>
                      </Select>
                    </Box>
                  </SimpleGrid>

                  <Box>
                    <Text fontSize="11px" color="gray.400" mb="2px">Nomor Resi Pengiriman</Text>
                    <Input
                      size="sm"
                      placeholder="e.g. JNE99182310293"
                      value={trackingNo}
                      onChange={(e) => setTrackingNo(e.target.value)}
                    />
                  </Box>
                </Box>
              </VStack>
            </DrawerBody>
          )}

          <DrawerFooter borderTop="1px solid" borderColor={borderColor}>
            <Button variant="outline" mr={3} onClick={onClose}>
              Tutup
            </Button>
            <Button colorScheme="purple" onClick={handleUpdateStatus}>
              Simpan Perubahan
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
