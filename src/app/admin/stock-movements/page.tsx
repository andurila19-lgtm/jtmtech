'use client';

import {
  Badge,
  Box,
  Flex,
  HStack,
  Icon,
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
  VStack,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { useState } from 'react';
import { MdSwapHoriz, MdSearch, MdFilterList } from 'react-icons/md';
import { initialStockMovements } from 'services/mockData';
import { StockMovement } from 'types/workshop';

export default function StockMovementsPage() {
  const [movements] = useState<StockMovement[]>(initialStockMovements);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const inputBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const hoverBg = useColorModeValue('gray.50', 'whiteAlpha.50');
  const cardBg = useColorModeValue('gray.50', 'navy.700');

  const filtered = movements.filter((m) => {
    const matchesSearch =
      m.productName.toLowerCase().includes(search.toLowerCase()) ||
      m.sku.toLowerCase().includes(search.toLowerCase()) ||
      m.reason.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'ALL' || m.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'RESTOCK':
        return <Badge colorScheme="green" variant="solid">MASUK (RESTOCK +)</Badge>;
      case 'SALE':
        return <Badge colorScheme="blue" variant="subtle">KELUAR (TERJUAL -)</Badge>;
      case 'ADJUSTMENT':
        return <Badge colorScheme="purple" variant="subtle">PENYESUAIAN STOK</Badge>;
      case 'DAMAGE':
        return <Badge colorScheme="red" variant="solid">RUSAK / CACAT (-)</Badge>;
      case 'RETURN':
        return <Badge colorScheme="teal" variant="solid">RETUR BARANG (+)</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  return (
    <Box pt={{ base: '10px', md: '70px', xl: '70px' }} pb="30px">
      <Flex justify="space-between" align="center" mb="16px" flexWrap="wrap" gap="10px">
        <Box>
          <HStack spacing="8px">
            <Icon as={MdSwapHoriz} color="brand.500" w="24px" h="24px" />
            <Text fontSize="22px" fontWeight="800" color={textColor}>
              Riwayat Mutasi Stok
            </Text>
            <Badge colorScheme="purple" borderRadius="full">
              Audit Gudang
            </Badge>
          </HStack>
          <Text fontSize="13px" color={textColorSecondary}>
            Riwayat lengkap pergerakan barang keluar-masuk, restock, penjualan, & retur.
          </Text>
        </Box>
      </Flex>

      <Card p="16px" mb="16px">
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="12px">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={MdSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Cari barang, SKU, nomor PO / alasan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              bg={inputBg}
              borderRadius="12px"
            />
          </InputGroup>

          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            bg={inputBg}
            borderRadius="12px"
          >
            <option value="ALL">Semua Jenis Mutasi Stok</option>
            <option value="RESTOCK">Restock Masuk (+)</option>
            <option value="SALE">Penjualan Terjual (-)</option>
            <option value="ADJUSTMENT">Penyesuaian Opname</option>
            <option value="DAMAGE">Barang Rusak (-)</option>
            <option value="RETURN">Retur Pembeli (+)</option>
          </Select>
        </SimpleGrid>
      </Card>

      <Card p={{ base: '14px', md: '20px' }}>
        {/* MOBILE CARD VIEW (< md) */}
        <Box display={{ base: 'block', md: 'none' }}>
          <VStack spacing="12px" align="stretch">
            {filtered.map((m) => (
              <Box
                key={m.id}
                p="14px"
                borderRadius="14px"
                bg={cardBg}
                border="1px solid"
                borderColor={borderColor}
              >
                <Flex justify="space-between" align="center" mb="6px">
                  {getTypeBadge(m.type)}
                  <Text
                    fontSize="14px"
                    fontWeight="800"
                    color={m.quantity > 0 ? 'green.500' : 'red.500'}
                  >
                    {m.quantity > 0 ? `+${m.quantity}` : m.quantity} unit
                  </Text>
                </Flex>

                <Text fontSize="13.5px" fontWeight="700" color={textColor} mb="2px">
                  {m.productName}
                </Text>
                <Text fontSize="11px" color={textColorSecondary} mb="6px">
                  SKU: {m.sku} • {m.reason}
                </Text>

                <Flex justify="space-between" align="center" pt="8px" borderTop="1px solid" borderColor={borderColor} fontSize="11.5px">
                  <Text color="gray.400">
                    Stok: {m.previousStock} &rarr; <strong>{m.newStock} unit</strong>
                  </Text>
                  <Text color={textColorSecondary}>
                    {m.date}
                  </Text>
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
                <Th borderColor={borderColor} color="gray.400">TANGGAL</Th>
                <Th borderColor={borderColor} color="gray.400">PRODUK & SKU</Th>
                <Th borderColor={borderColor} color="gray.400">JENIS MUTASI</Th>
                <Th borderColor={borderColor} color="gray.400">PERUBAHAN JUMLAH</Th>
                <Th borderColor={borderColor} color="gray.400">PERGERAKAN STOK</Th>
                <Th borderColor={borderColor} color="gray.400">ALASAN / CATATAN</Th>
                <Th borderColor={borderColor} color="gray.400">OPERATOR</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filtered.map((m) => (
                <Tr key={m.id} _hover={{ bg: hoverBg }}>
                  <Td borderColor={borderColor}>
                    <Text color={textColor} fontSize="12.5px" fontWeight="600">
                      {m.date}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text color={textColor} fontSize="13px" fontWeight="700">
                      {m.productName}
                    </Text>
                    <Text fontSize="11px" color="gray.400">
                      {m.sku}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>{getTypeBadge(m.type)}</Td>
                  <Td borderColor={borderColor}>
                    <Text
                      fontSize="13.5px"
                      fontWeight="800"
                      color={m.quantity > 0 ? 'green.500' : 'red.500'}
                    >
                      {m.quantity > 0 ? `+${m.quantity}` : m.quantity} unit
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text fontSize="12px" color={textColor}>
                      {m.previousStock} &rarr; <strong>{m.newStock} unit</strong>
                    </Text>
                  </Td>
                  <Td borderColor={borderColor} maxW="240px">
                    <Text fontSize="12px" color={textColorSecondary}>
                      {m.reason}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text fontSize="12px" color={textColor}>
                      {m.userName}
                    </Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Card>
    </Box>
  );
}
