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
  useColorModeValue,
  Icon,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  SimpleGrid,
} from '@chakra-ui/react';
import { MdLocationOn, MdHome, MdSave, MdCheckCircle } from 'react-icons/md';
import { useStore } from 'contexts/StoreContext';

export default function CustomerAddressesPage() {
  const { customer } = useStore();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const bgInput = useColorModeValue('secondaryGray.300', 'navy.900');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const [recipient, setRecipient] = useState(customer?.name || 'Ahmad Fauzi');
  const [phone, setPhone] = useState(customer?.phone || '081234567890');
  const [street, setStreet] = useState(customer?.address?.street || 'Jl. Soekarno Hatta No. 45');
  const [city, setCity] = useState(customer?.address?.city || 'Kota Malang');
  const [province, setProvince] = useState(customer?.address?.province || 'Jawa Timur');
  const [postalCode, setPostalCode] = useState(customer?.address?.postalCode || '65141');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Alamat Pengiriman Tersimpan',
      description: 'Alamat utama berhasil diperbarui untuk checkout pesanan.',
      status: 'success',
      duration: 3000,
      position: 'top-right',
    });
  };

  return (
    <Box p="24px" borderRadius="20px" bg={bgCard} border="1px solid" borderColor={borderColor}>
      <Heading as="h1" fontSize="22px" fontWeight="900" color={textColor} mb="6px">
        Buku Alamat Pengiriman
      </Heading>
      <Text fontSize="13.5px" color={textColorSecondary} mb="24px">
        Atur alamat pengiriman utama untuk pengiriman suku cadang langsung ke rumah Anda.
      </Text>

      <form onSubmit={handleSave}>
        <VStack spacing="16px" align="stretch" maxW="640px">
          <SimpleGrid columns={{ base: 1, sm: 2 }} gap="14px">
            <FormControl isRequired>
              <FormLabel fontSize="12.5px">Nama Penerima</FormLabel>
              <Input value={recipient} onChange={(e) => setRecipient(e.target.value)} bg={bgInput} borderRadius="10px" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="12.5px">Nomor WhatsApp / HP</FormLabel>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} bg={bgInput} borderRadius="10px" />
            </FormControl>
          </SimpleGrid>

          <FormControl isRequired>
            <FormLabel fontSize="12.5px">Alamat Lengkap (Jalan, No. Rumah, RT/RW)</FormLabel>
            <Textarea
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              bg={bgInput}
              borderRadius="10px"
              rows={3}
            />
          </FormControl>

          <SimpleGrid columns={{ base: 1, sm: 3 }} gap="12px">
            <FormControl isRequired>
              <FormLabel fontSize="12.5px">Kota / Kabupaten</FormLabel>
              <Input value={city} onChange={(e) => setCity(e.target.value)} bg={bgInput} borderRadius="10px" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="12.5px">Provinsi</FormLabel>
              <Input value={province} onChange={(e) => setProvince(e.target.value)} bg={bgInput} borderRadius="10px" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="12.5px">Kode Pos</FormLabel>
              <Input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} bg={bgInput} borderRadius="10px" />
            </FormControl>
          </SimpleGrid>

          <Button
            type="submit"
            colorScheme="purple"
            size="md"
            borderRadius="12px"
            leftIcon={<MdSave />}
            fontWeight="800"
            alignSelf="flex-start"
            mt="10px"
          >
            Simpan Perubahan Alamat
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
