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
  useToast,
  VStack,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { useState } from 'react';
import { MdLocalOffer, MdAdd, MdCheckCircle } from 'react-icons/md';

interface Promo {
  id: string;
  code: string;
  title: string;
  discountType: 'PERCENT' | 'FIXED';
  discountValue: number;
  minSpend: number;
  validUntil: string;
  status: 'ACTIVE' | 'EXPIRED';
  usageCount: number;
}

export default function PromotionsPage() {
  const [promos] = useState<Promo[]>([
    {
      id: 'promo-001',
      code: 'MERDEKACVT',
      title: 'Diskon Spesial Paket Service CVT Komplit',
      discountType: 'PERCENT',
      discountValue: 20,
      minSpend: 80000,
      validUntil: '2026-08-31',
      status: 'ACTIVE',
      usageCount: 42,
    },
    {
      id: 'promo-002',
      code: 'MOTULRACING',
      title: 'Potongan Rp 25.000 Pembelian Oli Motul 7100',
      discountType: 'FIXED',
      discountValue: 25000,
      minSpend: 200000,
      validUntil: '2026-09-15',
      status: 'ACTIVE',
      usageCount: 88,
    },
    {
      id: 'promo-003',
      code: 'NEWBIE10',
      title: 'Voucher Pelanggan Baru Booking Web',
      discountType: 'PERCENT',
      discountValue: 10,
      minSpend: 50000,
      validUntil: '2026-12-31',
      status: 'ACTIVE',
      usageCount: 154,
    },
  ]);

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const hoverBg = useColorModeValue('gray.50', 'whiteAlpha.50');
  const cardBg = useColorModeValue('gray.50', 'navy.700');
  const toast = useToast();

  return (
    <Box pt={{ base: '10px', md: '70px', xl: '70px' }} pb="30px">
      <Flex justify="space-between" align="center" mb="16px" flexWrap="wrap" gap="10px">
        <Box>
          <HStack spacing="8px">
            <Icon as={MdLocalOffer} color="brand.500" w="24px" h="24px" />
            <Text fontSize="22px" fontWeight="800" color={textColor}>
              Promo & Kupon Diskon
            </Text>
            <Badge colorScheme="purple" borderRadius="full">
              {promos.length} Kupon
            </Badge>
          </HStack>
          <Text fontSize="13px" color={textColorSecondary}>
            Kelola kode voucher diskon checkout suku cadang dan promo servis bengkel.
          </Text>
        </Box>

        <Button
          colorScheme="purple"
          leftIcon={<MdAdd />}
          borderRadius="12px"
          w={{ base: '100%', sm: 'auto' }}
          h="44px"
          onClick={() =>
            toast({
              title: 'Buat Kupon Diskon Baru',
              description: 'Form pembuatan voucher promo baru siap digunakan.',
              status: 'info',
              duration: 2000,
              position: 'top-right',
            })
          }
        >
          + Buat Kupon Baru
        </Button>
      </Flex>

      <Card p={{ base: '14px', md: '20px' }}>
        {/* MOBILE CARD VIEW (< md) */}
        <Box display={{ base: 'block', md: 'none' }}>
          <VStack spacing="12px" align="stretch">
            {promos.map((p) => (
              <Box
                key={p.id}
                p="14px"
                borderRadius="14px"
                bg={cardBg}
                border="1px solid"
                borderColor={borderColor}
              >
                <Flex justify="space-between" align="center" mb="8px">
                  <Badge colorScheme="purple" fontSize="13px" px="8px" py="3px">
                    {p.code}
                  </Badge>
                  <Badge colorScheme="green" fontSize="10px">AKTIF</Badge>
                </Flex>

                <Text fontSize="14px" fontWeight="700" color={textColor} mb="6px">
                  {p.title}
                </Text>

                <Flex justify="space-between" align="center" my="6px">
                  <Box>
                    <Text fontSize="10.5px" color={textColorSecondary}>Potongan Diskon:</Text>
                    <Text fontSize="15px" fontWeight="800" color="green.500">
                      {p.discountType === 'PERCENT'
                        ? `${p.discountValue}% OFF`
                        : `Rp ${p.discountValue.toLocaleString('id-ID')}`}
                    </Text>
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="10.5px" color={textColorSecondary}>Min. Belanja:</Text>
                    <Text fontSize="13px" fontWeight="700" color={textColor}>
                      Rp {p.minSpend.toLocaleString('id-ID')}
                    </Text>
                  </Box>
                </Flex>

                <Flex justify="space-between" align="center" pt="8px" borderTop="1px solid" borderColor={borderColor} fontSize="11.5px" color="gray.400">
                  <Text>Digunakan: <strong>{p.usageCount}x</strong></Text>
                  <Text>Berlaku s/d: {p.validUntil}</Text>
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
                <Th borderColor={borderColor} color="gray.400">KODE KUPON & JUDUL PROMO</Th>
                <Th borderColor={borderColor} color="gray.400">NILAI DISKON</Th>
                <Th borderColor={borderColor} color="gray.400">MIN. BELANJA</Th>
                <Th borderColor={borderColor} color="gray.400">BERLAKU HINGGA</Th>
                <Th borderColor={borderColor} color="gray.400">JUMLAH TERPAKAI</Th>
                <Th borderColor={borderColor} color="gray.400">STATUS</Th>
              </Tr>
            </Thead>
            <Tbody>
              {promos.map((p) => (
                <Tr key={p.id} _hover={{ bg: hoverBg }}>
                  <Td borderColor={borderColor}>
                    <Badge colorScheme="purple" fontSize="13px" px="8px" py="3px">
                      {p.code}
                    </Badge>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text color={textColor} fontSize="13px" fontWeight="700">
                      {p.title}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text color="green.500" fontSize="13.5px" fontWeight="800">
                      {p.discountType === 'PERCENT'
                        ? `${p.discountValue}% OFF`
                        : `Rp ${p.discountValue.toLocaleString('id-ID')}`}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text fontSize="12.5px" color={textColor}>
                      Rp {p.minSpend.toLocaleString('id-ID')}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text fontSize="12px" color={textColorSecondary}>
                      {p.validUntil}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text fontSize="12.5px" fontWeight="600" color={textColor}>
                      {p.usageCount}x Digunakan
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Badge colorScheme="green">AKTIF</Badge>
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
