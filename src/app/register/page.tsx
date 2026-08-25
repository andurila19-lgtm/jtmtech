'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  Icon,
  Input,
  useColorModeValue,
  useToast,
  Divider,
} from '@chakra-ui/react';
import { MdTwoWheeler, MdArrowForward } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import { useStore } from 'contexts/StoreContext';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useStore();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const bgInput = useColorModeValue('secondaryGray.300', 'navy.900');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || phone);
    toast({
      title: 'Pendaftaran Akun Berhasil!',
      description: 'Selamat datang di JTM Tech Workshop.',
      status: 'success',
      duration: 3000,
      position: 'top-right',
    });
    router.push('/account');
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'navy.900')}>
      <PublicNavbar />

      <Container maxW="480px" py="60px">
        <Box
          p={{ base: '24px', md: '32px' }}
          borderRadius="24px"
          bg={bgCard}
          border="1px solid"
          borderColor={borderColor}
          boxShadow="xl"
        >
          <Box textAlign="center" mb="24px">
            <Box
              w="50px"
              h="50px"
              borderRadius="14px"
              bg="brand.500"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mx="auto"
              mb="12px"
            >
              <Icon as={MdTwoWheeler} w="28px" h="28px" />
            </Box>
            <Heading as="h1" fontSize="24px" fontWeight="900" color={textColor} mb="6px">
              Daftar Akun Pelanggan
            </Heading>
            <Text fontSize="13px" color={textColorSecondary}>
              Dapatkan kemudahan booking servis online, lacak pesanan part, dan simpan data motor Anda.
            </Text>
          </Box>

          <form onSubmit={handleRegister}>
            <VStack spacing="14px" align="stretch">
              <Box>
                <Text fontSize="13px" fontWeight="700" color={textColor} mb="4px">
                  Nama Lengkap
                </Text>
                <Input
                  placeholder="e.g. Budi Santoso"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  bg={bgInput}
                  borderRadius="12px"
                  h="46px"
                  required
                />
              </Box>

              <Box>
                <Text fontSize="13px" fontWeight="700" color={textColor} mb="4px">
                  Nomor WhatsApp
                </Text>
                <Input
                  placeholder="e.g. 08123456789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  bg={bgInput}
                  borderRadius="12px"
                  h="46px"
                  required
                />
              </Box>

              <Box>
                <Text fontSize="13px" fontWeight="700" color={textColor} mb="4px">
                  Alamat Email
                </Text>
                <Input
                  type="email"
                  placeholder="e.g. budi@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg={bgInput}
                  borderRadius="12px"
                  h="46px"
                  required
                />
              </Box>

              <Box>
                <Text fontSize="13px" fontWeight="700" color={textColor} mb="4px">
                  Kata Sandi Baru
                </Text>
                <Input
                  type="password"
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  bg={bgInput}
                  borderRadius="12px"
                  h="46px"
                  required
                />
              </Box>

              <Button
                type="submit"
                colorScheme="purple"
                size="lg"
                h="50px"
                borderRadius="14px"
                fontWeight="800"
                rightIcon={<MdArrowForward />}
                boxShadow="0 4px 14px rgba(66, 42, 251, 0.3)"
                mt="8px"
              >
                Daftar Sekarang
              </Button>
            </VStack>
          </form>

          <Divider borderColor={borderColor} my="20px" />

          <Text fontSize="13px" color={textColorSecondary} textAlign="center">
            Sudah memiliki akun?{' '}
            <Link href="/login" style={{ color: '#422AFB', fontWeight: 800 }}>
              Masuk di Sini
            </Link>
          </Text>
        </Box>
      </Container>

      <PublicFooter />
    </Box>
  );
}
