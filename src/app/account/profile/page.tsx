'use client';

import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  useToast,
  SimpleGrid,
} from '@chakra-ui/react';
import { MdSave } from 'react-icons/md';
import { useStore } from 'contexts/StoreContext';

export default function CustomerProfilePage() {
  const { customer } = useStore();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const bgInput = useColorModeValue('secondaryGray.300', 'navy.900');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const [name, setName] = useState(customer?.name || 'Ahmad Fauzi');
  const [phone, setPhone] = useState(customer?.phone || '081234567890');
  const [email, setEmail] = useState(customer?.email || 'ahmad.fauzi@gmail.com');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Profil Berhasil Diperbarui',
      description: 'Data kontak Anda telah disimpan.',
      status: 'success',
      duration: 3000,
      position: 'top-right',
    });
  };

  return (
    <Box p="24px" borderRadius="20px" bg={bgCard} border="1px solid" borderColor={borderColor}>
      <Heading as="h1" fontSize="22px" fontWeight="900" color={textColor} mb="6px">
        Pengaturan Profil Saya
      </Heading>
      <Text fontSize="13.5px" color={textColorSecondary} mb="24px">
        Perbarui informasi nama lengkap dan saluran kontak WhatsApp aktif Anda.
      </Text>

      <HStack spacing="16px" mb="24px" p="16px" borderRadius="14px" bg={useColorModeValue('gray.50', 'navy.900')}>
        <Avatar size="lg" name={name} src={customer?.avatar} border="2px solid" borderColor="brand.500" />
        <Box>
          <Text fontSize="16px" fontWeight="800" color={textColor}>
            {name}
          </Text>
          <Text fontSize="12.5px" color={textColorSecondary}>
            Pelanggan Terdaftar sejak {customer?.createdAt || '2024'}
          </Text>
        </Box>
      </HStack>

      <form onSubmit={handleSaveProfile}>
        <VStack spacing="16px" align="stretch" maxW="600px">
          <FormControl isRequired>
            <FormLabel fontSize="12.5px">Nama Lengkap</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} bg={bgInput} borderRadius="10px" />
          </FormControl>

          <SimpleGrid columns={{ base: 1, sm: 2 }} gap="14px">
            <FormControl isRequired>
              <FormLabel fontSize="12.5px">Nomor WhatsApp</FormLabel>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} bg={bgInput} borderRadius="10px" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="12.5px">Alamat Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg={bgInput}
                borderRadius="10px"
              />
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
            Simpan Perubahan
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
