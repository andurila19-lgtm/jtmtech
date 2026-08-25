'use client';

import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
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
  MdInventory,
  MdSwapHoriz,
  MdAddShoppingCart,
  MdWarning,
  MdHistory,
} from 'react-icons/md';
import Link from 'next/link';
import { initialProducts, initialStockMovements } from 'services/mockData';
import { Product, StockMovement, StockMovementType } from 'types/workshop';

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [movements, setMovements] = useState<StockMovement[]>(initialStockMovements);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Adjustment Modal State
  const [adjustType, setAdjustType] = useState<StockMovementType>('RESTOCK');
  const [adjustQty, setAdjustQty] = useState<number>(10);
  const [adjustReason, setAdjustReason] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const boxBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const hoverBg = useColorModeValue('gray.50', 'whiteAlpha.50');
  const cardBg = useColorModeValue('gray.50', 'navy.700');

  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= p.minStock).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  const handleOpenAdjustment = (prod: Product, defaultType: StockMovementType = 'RESTOCK') => {
    setSelectedProduct(prod);
    setAdjustType(defaultType);
    setAdjustQty(defaultType === 'RESTOCK' ? 10 : 1);
    setAdjustReason(
      defaultType === 'RESTOCK'
        ? 'Restock pengadaan barang supplier'
        : defaultType === 'DAMAGE'
        ? 'Barang rusak / cacat fisik'
        : 'Penyesuaian stok opname',
    );
    onOpen();
  };

  const handleSaveAdjustment = () => {
    if (!selectedProduct) return;
    const qtyChange =
      adjustType === 'RESTOCK' || adjustType === 'RETURN' ? Math.abs(adjustQty) : -Math.abs(adjustQty);
    const newStock = Math.max(0, selectedProduct.stock + qtyChange);

    // Update product stock
    setProducts(
      products.map((p) => (p.id === selectedProduct.id ? { ...p, stock: newStock } : p)),
    );

    // Add movement audit
    const newMovement: StockMovement = {
      id: `sm-${Date.now()}`,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      sku: selectedProduct.sku,
      type: adjustType,
      quantity: qtyChange,
      previousStock: selectedProduct.stock,
      newStock: newStock,
      reason: adjustReason || `Penyesuaian stok ${adjustType}`,
      userName: 'Ahmad Fauzi',
      userRole: 'Owner / Admin',
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
    };
    setMovements([newMovement, ...movements]);

    toast({
      title: 'Stok Berhasil Disesuaikan',
      description: `Stok ${selectedProduct.name} telah diupdate menjadi ${newStock} unit.`,
      status: 'success',
      duration: 3000,
      position: 'top-right',
    });
    onClose();
  };

  return (
    <Box pt={{ base: '10px', md: '70px', xl: '70px' }} pb="30px">
      {/* Header */}
      <Flex justify="space-between" align="center" mb="16px" flexWrap="wrap" gap="10px">
        <Box>
          <HStack spacing="8px">
            <Icon as={MdInventory} color="brand.500" w="24px" h="24px" />
            <Text fontSize="22px" fontWeight="800" color={textColor}>
              Inventaris & Stok Gudang
            </Text>
          </HStack>
          <Text fontSize="13px" color={textColorSecondary}>
            Pantau stok fisik gudang, kontrol stok minimum, dan audit mutasi barang.
          </Text>
        </Box>

        <Link href="/admin/stock-movements" style={{ textDecoration: 'none' }}>
          <Button
            variant="outline"
            leftIcon={<MdHistory />}
            borderRadius="12px"
            borderColor={useColorModeValue('gray.300', 'whiteAlpha.300')}
            w={{ base: '100%', sm: 'auto' }}
            h="44px"
          >
            Riwayat Mutasi Stok
          </Button>
        </Link>
      </Flex>

      {/* KPI Overview */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="16px" mb="20px">
        <Card p="18px">
          <Text fontSize="12px" color="gray.400" fontWeight="600">
            TOTAL SKU SUKU CADANG
          </Text>
          <Text fontSize="24px" fontWeight="800" color={textColor} my="4px">
            {products.length} Item
          </Text>
          <Text fontSize="12px" color="green.500">
            Semua item aktif dalam sistem
          </Text>
        </Card>

        <Card p="18px">
          <Text fontSize="12px" color="gray.400" fontWeight="600">
            STOK KRITIS (MENDEKATI HABIS)
          </Text>
          <Text fontSize="24px" fontWeight="800" color="orange.500" my="4px">
            {lowStockCount} Item
          </Text>
          <Text fontSize="12px" color="gray.500">
            Perlu pemesanan PO ke supplier
          </Text>
        </Card>

        <Card p="18px">
          <Text fontSize="12px" color="gray.400" fontWeight="600">
            STOK HABIS (KOSONG)
          </Text>
          <Text fontSize="24px" fontWeight="800" color="red.500" my="4px">
            {outOfStockCount} Item
          </Text>
          <Text fontSize="12px" color="red.400">
            Tidak dapat dipesan customer
          </Text>
        </Card>
      </SimpleGrid>

      {/* Tabs */}
      <Card p="20px">
        <Tabs variant="soft-rounded" colorScheme="purple">
          <TabList mb="16px" flexWrap="wrap">
            <Tab>Semua Item ({products.length})</Tab>
            <Tab>
              Stok Kritis{' '}
              {lowStockCount > 0 && (
                <Badge ms="6px" colorScheme="orange" borderRadius="full">
                  {lowStockCount}
                </Badge>
              )}
            </Tab>
            <Tab>
              Stok Habis{' '}
              {outOfStockCount > 0 && (
                <Badge ms="6px" colorScheme="red" borderRadius="full">
                  {outOfStockCount}
                </Badge>
              )}
            </Tab>
          </TabList>

          <TabPanels>
            {/* All Products Tab */}
            <TabPanel px="0">
              {/* MOBILE CARD VIEW (< md) */}
              <Box display={{ base: 'block', md: 'none' }}>
                <VStack spacing="12px" align="stretch">
                  {products.map((p) => (
                    <Box
                      key={p.id}
                      p="14px"
                      borderRadius="14px"
                      bg={cardBg}
                      border="1px solid"
                      borderColor={borderColor}
                    >
                      <Flex justify="space-between" align="flex-start" mb="6px">
                        <Box flex="1" me="8px">
                          <Text fontSize="13.5px" fontWeight="700" color={textColor} noOfLines={2}>
                            {p.name}
                          </Text>
                          <Text fontSize="11px" color={textColorSecondary}>
                            SKU: {p.sku} • {p.category}
                          </Text>
                        </Box>
                        {p.stock === 0 ? (
                          <Badge colorScheme="red" fontSize="9.5px">HABIS</Badge>
                        ) : p.stock <= p.minStock ? (
                          <Badge colorScheme="orange" fontSize="9.5px">KRITIS</Badge>
                        ) : (
                          <Badge colorScheme="green" fontSize="9.5px">AMAN</Badge>
                        )}
                      </Flex>

                      <Flex justify="space-between" align="center" my="8px">
                        <Text
                          fontSize="13px"
                          fontWeight="800"
                          color={
                            p.stock === 0
                              ? 'red.500'
                              : p.stock <= p.minStock
                              ? 'orange.500'
                              : 'green.500'
                          }
                        >
                          Tersisa {p.stock} unit (Min: {p.minStock})
                        </Text>
                        <Text fontSize="11.5px" color="gray.400">
                          {p.brand}
                        </Text>
                      </Flex>

                      <SimpleGrid columns={2} gap="8px" pt="8px" borderTop="1px solid" borderColor={borderColor}>
                        <Button
                          size="sm"
                          colorScheme="purple"
                          leftIcon={<MdAddShoppingCart />}
                          h="38px"
                          onClick={() => handleOpenAdjustment(p, 'RESTOCK')}
                        >
                          Restock
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          leftIcon={<MdSwapHoriz />}
                          h="38px"
                          onClick={() => handleOpenAdjustment(p, 'ADJUSTMENT')}
                        >
                          Penyesuaian
                        </Button>
                      </SimpleGrid>
                    </Box>
                  ))}
                </VStack>
              </Box>

              {/* DESKTOP TABLE VIEW (>= md) */}
              <Box display={{ base: 'none', md: 'block' }} overflowX="auto">
                <Table variant="simple" color="gray.500">
                  <Thead>
                    <Tr>
                      <Th borderColor={borderColor} color="gray.400">PRODUK & SKU</Th>
                      <Th borderColor={borderColor} color="gray.400">KATEGORI</Th>
                      <Th borderColor={borderColor} color="gray.400">STOK SAAT INI</Th>
                      <Th borderColor={borderColor} color="gray.400">BATAS MINIMUM</Th>
                      <Th borderColor={borderColor} color="gray.400">STATUS</Th>
                      <Th borderColor={borderColor} color="gray.400" textAlign="right">TINDAKAN</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {products.map((p) => (
                      <Tr key={p.id} _hover={{ bg: hoverBg }}>
                        <Td borderColor={borderColor}>
                          <Text color={textColor} fontWeight="700" fontSize="13px">
                            {p.name}
                          </Text>
                          <Text fontSize="11px" color="gray.400">
                            SKU: {p.sku} | Brand: {p.brand}
                          </Text>
                        </Td>
                        <Td borderColor={borderColor}>
                          <Text fontSize="12.5px">{p.category}</Text>
                        </Td>
                        <Td borderColor={borderColor}>
                          <Text
                            fontSize="13.5px"
                            fontWeight="800"
                            color={
                              p.stock === 0
                                ? 'red.500'
                                : p.stock <= p.minStock
                                ? 'orange.500'
                                : 'green.500'
                            }
                          >
                            {p.stock} unit
                          </Text>
                        </Td>
                        <Td borderColor={borderColor}>
                          <Text fontSize="12.5px" color="gray.400">
                            {p.minStock} unit
                          </Text>
                        </Td>
                        <Td borderColor={borderColor}>
                          {p.stock === 0 ? (
                            <Badge colorScheme="red">HABIS</Badge>
                          ) : p.stock <= p.minStock ? (
                            <Badge colorScheme="orange">KRITIS</Badge>
                          ) : (
                            <Badge colorScheme="green">AMAN</Badge>
                          )}
                        </Td>
                        <Td borderColor={borderColor} textAlign="right">
                          <HStack spacing="6px" justify="flex-end">
                            <Button
                              size="xs"
                              colorScheme="purple"
                              leftIcon={<MdAddShoppingCart />}
                              onClick={() => handleOpenAdjustment(p, 'RESTOCK')}
                            >
                              Restock
                            </Button>
                            <Button
                              size="xs"
                              variant="outline"
                              onClick={() => handleOpenAdjustment(p, 'ADJUSTMENT')}
                            >
                              Penyesuaian
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </TabPanel>

            {/* Low Stock Only */}
            <TabPanel px="0">
              <Table variant="simple" color="gray.500">
                <Thead>
                  <Tr>
                    <Th borderColor={borderColor} color="gray.400">PRODUK</Th>
                    <Th borderColor={borderColor} color="gray.400">STOK SAAT INI</Th>
                    <Th borderColor={borderColor} color="gray.400">BATAS MINIMUM</Th>
                    <Th borderColor={borderColor} color="gray.400" textAlign="right">TINDAKAN</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products
                    .filter((p) => p.stock > 0 && p.stock <= p.minStock)
                    .map((p) => (
                      <Tr key={p.id}>
                        <Td borderColor={borderColor}>
                          <Text color={textColor} fontWeight="700">
                            {p.name}
                          </Text>
                          <Text fontSize="11px" color="gray.400">
                            SKU: {p.sku}
                          </Text>
                        </Td>
                        <Td borderColor={borderColor}>
                          <Text color="orange.500" fontWeight="800">
                            {p.stock} unit
                          </Text>
                        </Td>
                        <Td borderColor={borderColor}>{p.minStock} unit</Td>
                        <Td borderColor={borderColor} textAlign="right">
                          <Button
                            size="xs"
                            colorScheme="purple"
                            onClick={() => handleOpenAdjustment(p, 'RESTOCK')}
                          >
                            Restock Sekarang
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TabPanel>

            {/* Out of stock */}
            <TabPanel px="0">
              <Table variant="simple" color="gray.500">
                <Thead>
                  <Tr>
                    <Th borderColor={borderColor} color="gray.400">PRODUK</Th>
                    <Th borderColor={borderColor} color="gray.400">SKU</Th>
                    <Th borderColor={borderColor} color="gray.400">STATUS</Th>
                    <Th borderColor={borderColor} color="gray.400" textAlign="right">TINDAKAN</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products
                    .filter((p) => p.stock === 0)
                    .map((p) => (
                      <Tr key={p.id}>
                        <Td borderColor={borderColor}>
                          <Text color={textColor} fontWeight="700">
                            {p.name}
                          </Text>
                        </Td>
                        <Td borderColor={borderColor}>{p.sku}</Td>
                        <Td borderColor={borderColor}>
                          <Badge colorScheme="red">HABIS (0 UNIT)</Badge>
                        </Td>
                        <Td borderColor={borderColor} textAlign="right">
                          <Button
                            size="xs"
                            colorScheme="purple"
                            onClick={() => handleOpenAdjustment(p, 'RESTOCK')}
                          >
                            Isi Ulang Stok
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>

      {/* Stock Adjustment Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: 'full', md: 'md' }}>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('white', 'navy.800')}>
          <ModalHeader>
            {adjustType === 'RESTOCK' ? 'Restock Barang Masuk' : 'Penyesuaian Stok Gudang'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedProduct && (
              <Box mb="16px" p="12px" bg={boxBg} borderRadius="12px">
                <Text fontWeight="700" fontSize="13.5px" color={textColor}>
                  {selectedProduct.name}
                </Text>
                <HStack spacing="12px" fontSize="12px" color="gray.400" mt="4px">
                  <Text>SKU: {selectedProduct.sku}</Text>
                  <Text>
                    Stok Saat Ini: <strong>{selectedProduct.stock} unit</strong>
                  </Text>
                </HStack>
              </Box>
            )}

            <FormControl mb="14px">
              <FormLabel fontSize="12.5px">Jenis Transaksi Stok</FormLabel>
              <Select
                value={adjustType}
                onChange={(e) => setAdjustType(e.target.value as StockMovementType)}
              >
                <option value="RESTOCK">RESTOCK (Penerimaan Barang Supplier)</option>
                <option value="ADJUSTMENT">ADJUSTMENT (Koreksi Stok Opname)</option>
                <option value="DAMAGE">DAMAGE (Barang Rusak / Pecah)</option>
                <option value="RETURN">RETURN (Retur dari Customer)</option>
                <option value="SALE">SALE (Penjualan Manual Offline)</option>
              </Select>
            </FormControl>

            <FormControl mb="14px" isRequired>
              <FormLabel fontSize="12.5px">Jumlah / Kuantitas (Unit)</FormLabel>
              <Input
                type="number"
                min={1}
                value={adjustQty}
                onChange={(e) => setAdjustQty(Number(e.target.value))}
              />
            </FormControl>

            <FormControl mb="14px">
              <FormLabel fontSize="12.5px">Alasan / Catatan Penyesuaian</FormLabel>
              <Textarea
                rows={2}
                value={adjustReason}
                onChange={(e) => setAdjustReason(e.target.value)}
                placeholder="Nomor invoice PO supplier / keterangan kondisi fisik..."
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="purple" onClick={handleSaveAdjustment}>
              Simpan Perubahan Stok
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
