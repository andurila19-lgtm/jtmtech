'use client';

import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import Link from 'next/link';
import { MdWarning, MdAddShoppingCart, MdOutlineArrowForward, MdCheckCircle } from 'react-icons/md';
import { initialProducts } from 'services/mockData';

export default function LowStockAlertTable() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const cardItemBg = useColorModeValue('gray.50', 'navy.700');
  const hoverBg = useColorModeValue('purple.50', 'whiteAlpha.50');
  const toast = useToast();

  const lowStockItems = initialProducts.filter((p) => p.stock <= p.minStock);

  const handleQuickRestock = (productName: string) => {
    toast({
      title: 'Permintaan Restock Dibuat',
      description: `Draft PO Restock untuk ${productName} telah ditambahkan ke antrian gudang.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };

  if (lowStockItems.length === 0) {
    return (
      <Card p="16px" w="100%">
        <Flex align="center" justify="space-between">
          <HStack spacing="8px">
            <Icon as={MdCheckCircle} color="green.500" w="20px" h="20px" />
            <Text color={textColor} fontSize="14px" fontWeight="700">
              Semua Stok Suku Cadang Aman
            </Text>
          </HStack>
          <Badge colorScheme="green" variant="subtle" fontSize="11px" px="8px" py="2px" borderRadius="full">
            Stok Optimal
          </Badge>
        </Flex>
      </Card>
    );
  }

  return (
    <Card p={{ base: '16px', md: '20px' }} w="100%">
      <Flex justify="space-between" align="center" mb="14px">
        <HStack spacing="6px">
          <Icon as={MdWarning} color="orange.500" w="18px" h="18px" />
          <Text color={textColor} fontSize="16px" fontWeight="700">
            Peringatan Stok Menipis
          </Text>
          <Badge colorScheme="red" borderRadius="full" fontSize="10px">
            {lowStockItems.length} Part
          </Badge>
        </HStack>
        <Link href="/admin/inventory">
          <Button size="xs" variant="ghost" colorScheme="purple" rightIcon={<MdOutlineArrowForward />}>
            Kelola Stok
          </Button>
        </Link>
      </Flex>

      {/* MOBILE CARD VIEW (< md) */}
      <Box display={{ base: 'block', md: 'none' }}>
        <VStack spacing="10px" align="stretch">
          {lowStockItems.map((product) => (
            <Box
              key={product.id}
              p="12px"
              borderRadius="12px"
              bg={cardItemBg}
              border="1px solid"
              borderColor={borderColor}
            >
              <Flex justify="space-between" align="flex-start" mb="4px">
                <Box flex="1" me="10px">
                  <Text fontSize="13px" fontWeight="700" color={textColor} noOfLines={1}>
                    {product.name}
                  </Text>
                  <Text fontSize="11px" color={textColorSecondary}>
                    SKU: {product.sku} • {product.category}
                  </Text>
                </Box>
                {product.stock === 0 ? (
                  <Badge colorScheme="red" fontSize="10px">HABIS</Badge>
                ) : (
                  <Badge colorScheme="orange" fontSize="10px">KRITIS</Badge>
                )}
              </Flex>

              <Flex justify="space-between" align="center" mt="8px">
                <Text fontSize="12.5px" fontWeight="800" color={product.stock === 0 ? 'red.500' : 'orange.500'}>
                  Tersisa {product.stock} unit (Min: {product.minStock})
                </Text>
                <Button
                  size="xs"
                  colorScheme="purple"
                  leftIcon={<MdAddShoppingCart />}
                  onClick={() => handleQuickRestock(product.name)}
                >
                  Restock
                </Button>
              </Flex>
            </Box>
          ))}
        </VStack>
      </Box>

      {/* DESKTOP TABLE VIEW (>= md) */}
      <Box display={{ base: 'none', md: 'block' }} overflowX="auto">
        <Table variant="simple" size="sm" color="gray.500">
          <Thead>
            <Tr>
              <Th borderColor={borderColor} color="gray.400" fontSize="10.5px">PRODUK & SKU</Th>
              <Th borderColor={borderColor} color="gray.400" fontSize="10.5px">KATEGORI</Th>
              <Th borderColor={borderColor} color="gray.400" fontSize="10.5px">SISA STOK</Th>
              <Th borderColor={borderColor} color="gray.400" fontSize="10.5px">STATUS</Th>
              <Th borderColor={borderColor} color="gray.400" fontSize="10.5px" textAlign="right">AKSI</Th>
            </Tr>
          </Thead>
          <Tbody>
            {lowStockItems.map((product) => (
              <Tr key={product.id} _hover={{ bg: hoverBg }}>
                <Td borderColor={borderColor}>
                  <Text color={textColor} fontSize="12.5px" fontWeight="700">
                    {product.name}
                  </Text>
                  <Text fontSize="10.5px" color="gray.400">
                    SKU: {product.sku}
                  </Text>
                </Td>
                <Td borderColor={borderColor}>
                  <Text fontSize="12px" color={textColorSecondary}>
                    {product.category}
                  </Text>
                </Td>
                <Td borderColor={borderColor}>
                  <Text
                    fontSize="12.5px"
                    fontWeight="800"
                    color={product.stock === 0 ? 'red.500' : 'orange.500'}
                  >
                    {product.stock} unit (Min: {product.minStock})
                  </Text>
                </Td>
                <Td borderColor={borderColor}>
                  {product.stock === 0 ? (
                    <Badge colorScheme="red">HABIS</Badge>
                  ) : (
                    <Badge colorScheme="orange">KRITIS</Badge>
                  )}
                </Td>
                <Td borderColor={borderColor} textAlign="right">
                  <Button
                    size="xs"
                    colorScheme="purple"
                    leftIcon={<MdAddShoppingCart />}
                    onClick={() => handleQuickRestock(product.name)}
                  >
                    Restock
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}

