'use client';

import {
  Avatar,
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
  Input,
  InputGroup,
  InputLeftElement,
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
  VStack,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { useState } from 'react';
import {
  MdPeople,
  MdSearch,
  MdVisibility,
  MdBikeScooter,
  MdShoppingCart,
  MdCalendarMonth,
  MdLocationOn,
  MdPhone,
  MdEmail,
} from 'react-icons/md';
import { initialCustomers, initialOrders, initialBookings } from 'services/mockData';
import { Customer } from 'types/workshop';

export default function CustomersPage() {
  const [customers] = useState<Customer[]>(initialCustomers);
  const [search, setSearch] = useState('');
  const [selectedCust, setSelectedCust] = useState<Customer | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const inputBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const boxBg = useColorModeValue('gray.50', 'navy.700');
  const hoverBg = useColorModeValue('gray.50', 'whiteAlpha.50');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

  const handleOpenDetail = (cust: Customer) => {
    setSelectedCust(cust);
    onOpen();
  };

  return (
    <Box pt={{ base: '10px', md: '70px', xl: '70px' }} pb="30px">
      <Flex justify="space-between" align="center" mb="16px" flexWrap="wrap" gap="10px">
        <Box>
          <HStack spacing="8px">
            <Icon as={MdPeople} color="brand.500" w="24px" h="24px" />
            <Text fontSize="22px" fontWeight="800" color={textColor}>
              Database Pelanggan (CRM)
            </Text>
            <Badge colorScheme="purple" borderRadius="full">
              {filtered.length} Pelanggan
            </Badge>
          </HStack>
          <Text fontSize="13px" color={textColorSecondary}>
            Database pelanggan, riwayat servis, omset belanja, & kepemilikan motor.
          </Text>
        </Box>
      </Flex>

      <Card p="16px" mb="16px">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={MdSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Cari nama pelanggan, nomor telepon, atau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            bg={inputBg}
            borderRadius="12px"
          />
        </InputGroup>
      </Card>

      <Card p={{ base: '14px', md: '20px' }}>
        {/* MOBILE CARD VIEW (< md) */}
        <Box display={{ base: 'block', md: 'none' }}>
          <VStack spacing="12px" align="stretch">
            {filtered.map((c) => (
              <Box
                key={c.id}
                p="14px"
                borderRadius="14px"
                bg={boxBg}
                border="1px solid"
                borderColor={borderColor}
              >
                <Flex justify="space-between" align="center" mb="10px">
                  <HStack spacing="10px">
                    <Avatar size="sm" name={c.name} src={c.avatar} />
                    <Box>
                      <Text fontSize="14px" fontWeight="700" color={textColor}>
                        {c.name}
                      </Text>
                      <Text fontSize="11px" color={textColorSecondary}>
                        {c.phone} • {c.address?.city || 'Malang'}
                      </Text>
                    </Box>
                  </HStack>
                  <Badge colorScheme="purple" fontSize="10px">
                    {c.totalOrders} Order
                  </Badge>
                </Flex>

                <Flex justify="space-between" align="center" pt="8px" borderTop="1px solid" borderColor={borderColor}>
                  <Box>
                    <Text fontSize="10.5px" color={textColorSecondary}>Total Belanja:</Text>
                    <Text fontSize="14px" fontWeight="800" color="brand.500">
                      Rp {c.totalSpending.toLocaleString('id-ID')}
                    </Text>
                  </Box>
                  <Button
                    size="sm"
                    colorScheme="purple"
                    leftIcon={<MdVisibility />}
                    h="38px"
                    onClick={() => handleOpenDetail(c)}
                  >
                    Profil 360°
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
                <Th borderColor={borderColor} color="gray.400">PELANGGAN</Th>
                <Th borderColor={borderColor} color="gray.400">KONTAK & KOTA</Th>
                <Th borderColor={borderColor} color="gray.400">TOTAL BELANJA (RP)</Th>
                <Th borderColor={borderColor} color="gray.400">TOTAL PESANAN</Th>
                <Th borderColor={borderColor} color="gray.400">KENDARAAN TERDAFTAR</Th>
                <Th borderColor={borderColor} color="gray.400">SERVIS TERAKHIR</Th>
                <Th borderColor={borderColor} color="gray.400" textAlign="right">DETAIL</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filtered.map((c) => (
                <Tr key={c.id} _hover={{ bg: hoverBg }}>
                  <Td borderColor={borderColor}>
                    <HStack spacing="10px">
                      <Avatar size="sm" name={c.name} src={c.avatar} />
                      <Box>
                        <Text color={textColor} fontSize="13.5px" fontWeight="700">
                          {c.name}
                        </Text>
                        <Text fontSize="11px" color="gray.400">
                          Member sejak {c.createdAt}
                        </Text>
                      </Box>
                    </HStack>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text color={textColor} fontSize="12.5px" fontWeight="600">
                      {c.phone}
                    </Text>
                    <Text fontSize="11px" color="gray.400">
                      {c.address?.city || 'Malang'}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text color="brand.500" fontSize="13.5px" fontWeight="800">
                      Rp {c.totalSpending.toLocaleString('id-ID')}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Badge colorScheme="purple">{c.totalOrders} Pesanan</Badge>
                  </Td>
                  <Td borderColor={borderColor}>
                    <HStack spacing="4px">
                      <Icon as={MdBikeScooter} color="gray.400" />
                      <Text fontSize="12.5px" color={textColor} fontWeight="600">
                        {c.vehicles.length} Motor
                      </Text>
                    </HStack>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text fontSize="12px" color={textColorSecondary}>
                      {c.lastBookingDate || '-'}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor} textAlign="right">
                    <Button
                      size="xs"
                      colorScheme="purple"
                      leftIcon={<MdVisibility />}
                      onClick={() => handleOpenDetail(c)}
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

      {/* Customer Detail Drawer */}
      <Drawer isOpen={isOpen} placement="right" size={{ base: 'full', md: 'lg' }} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue('white', 'navy.800')}>
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px solid" borderColor={borderColor}>
            Profil Lengkap Pelanggan (360°)
          </DrawerHeader>

          {selectedCust && (
            <DrawerBody py="20px">
              <VStack spacing="18px" align="stretch">
                {/* Header info */}
                <Flex p="16px" bg={boxBg} borderRadius="14px" align="center" gap="16px">
                  <Avatar size="lg" name={selectedCust.name} src={selectedCust.avatar} />
                  <Box>
                    <Text fontSize="18px" fontWeight="800" color={textColor}>
                      {selectedCust.name}
                    </Text>
                    <HStack spacing="12px" fontSize="12px" color="gray.500" mt="2px">
                      <HStack spacing="4px">
                        <Icon as={MdPhone} />
                        <Text>{selectedCust.phone}</Text>
                      </HStack>
                      <HStack spacing="4px">
                        <Icon as={MdEmail} />
                        <Text>{selectedCust.email}</Text>
                      </HStack>
                    </HStack>
                    {selectedCust.address && (
                      <HStack spacing="4px" fontSize="11.5px" color="gray.400" mt="4px">
                        <Icon as={MdLocationOn} />
                        <Text>
                          {selectedCust.address.street}, {selectedCust.address.city}
                        </Text>
                      </HStack>
                    )}
                  </Box>
                </Flex>

                {/* Spending Stats */}
                <SimpleGrid columns={2} gap="12px">
                  <Box p="14px" border="1px solid" borderColor={borderColor} borderRadius="12px">
                    <Text fontSize="11px" color="gray.400">TOTAL PEMBELANJAAN</Text>
                    <Text fontSize="18px" fontWeight="800" color="brand.500" mt="2px">
                      Rp {selectedCust.totalSpending.toLocaleString('id-ID')}
                    </Text>
                  </Box>
                  <Box p="14px" border="1px solid" borderColor={borderColor} borderRadius="12px">
                    <Text fontSize="11px" color="gray.400">TOTAL TRANSAKSI ORDER</Text>
                    <Text fontSize="18px" fontWeight="800" color={textColor} mt="2px">
                      {selectedCust.totalOrders} Transaksi
                    </Text>
                  </Box>
                </SimpleGrid>

                {/* Registered Vehicles */}
                <Box>
                  <Text fontSize="14px" fontWeight="700" color={textColor} mb="10px">
                    Garasi Kendaraan ({selectedCust.vehicles.length})
                  </Text>
                  <VStack align="stretch" spacing="8px">
                    {selectedCust.vehicles.map((v) => (
                      <Box key={v.id} p="12px" bg={boxBg} borderRadius="10px">
                        <Flex justify="space-between" align="center">
                          <HStack spacing="8px">
                            <Icon as={MdBikeScooter} color="brand.500" />
                            <Box>
                              <Text fontSize="13px" fontWeight="700" color={textColor}>
                                {v.brand} {v.model} ({v.year})
                              </Text>
                              <Text fontSize="11px" color="gray.400">
                                Mesin: {v.engineType} | Warna: {v.color || '-'}
                              </Text>
                            </Box>
                          </HStack>
                          <Badge colorScheme="purple" fontSize="11px">
                            {v.licensePlate}
                          </Badge>
                        </Flex>
                      </Box>
                    ))}
                  </VStack>
                </Box>

                {/* Order History */}
                <Box>
                  <Text fontSize="14px" fontWeight="700" color={textColor} mb="10px">
                    Riwayat Pembelian Suku Cadang Terakhir
                  </Text>
                  <VStack align="stretch" spacing="8px">
                    {initialOrders
                      .filter((o) => o.customerName === selectedCust.name)
                      .map((ord) => (
                        <Box key={ord.id} p="12px" border="1px solid" borderColor={borderColor} borderRadius="10px">
                          <Flex justify="space-between" align="center" mb="4px">
                            <Text fontSize="12.5px" fontWeight="700" color={textColor}>
                              {ord.orderNumber}
                            </Text>
                            <Badge colorScheme="green">{ord.orderStatus}</Badge>
                          </Flex>
                          <Flex justify="space-between" fontSize="12px" color="gray.500">
                            <Text>{ord.items.length} item ({ord.paymentMethod})</Text>
                            <Text fontWeight="700" color={textColor}>
                              Rp {ord.total.toLocaleString('id-ID')}
                            </Text>
                          </Flex>
                        </Box>
                      ))}
                  </VStack>
                </Box>
              </VStack>
            </DrawerBody>
          )}

          <DrawerFooter borderTop="1px solid" borderColor={borderColor}>
            <Button variant="outline" onClick={onClose}>
              Tutup
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
