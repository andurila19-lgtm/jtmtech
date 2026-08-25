'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  Input,
  useColorModeValue,
  useToast,
  Divider,
} from '@chakra-ui/react';
import { MdLock, MdPerson, MdTwoWheeler, MdArrowForward } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import { useStore } from 'contexts/StoreContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useStore();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const bgInput = useColorModeValue('secondaryGray.300', 'navy.900');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const [emailOrPhone, setEmailOrPhone] = useState('ahmad.fauzi@gmail.com');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(emailOrPhone);
    toast({
      title: 'Selamat Datang Kembali!',
      description: 'Berhasil masuk ke akun pelanggan Anda.',
      status: 'success',
      duration: 3000,
      position: 'top-right',
    });
    router.push('/account');
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'navy.900')}>
      <PublicNavbar />

      <Container maxW="460px" py="60px">
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
              Masuk ke Akun Anda
            </Heading>
            <Text fontSize="13px" color={textColorSecondary}>
              Pantau riwayat pesanan part, jadwal servis, dan data motor Anda.
            </Text>
          </Box>

          <form onSubmit={handleLogin}>
            <VStack spacing="16px" align="stretch">
              <Box>
                <Text fontSize="13px" fontWeight="700" color={textColor} mb="4px">
                  Email atau Nomor WhatsApp
                </Text>
                <Input
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  bg={bgInput}
                  borderRadius="12px"
                  h="46px"
                  required
                />
              </Box>

              <Box>
                <Text fontSize="13px" fontWeight="700" color={textColor} mb="4px">
                  Kata Sandi
                </Text>
                <Input
                  type="password"
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
              >
                Masuk Sekarang
              </Button>
            </VStack>
          </form>

          <Divider borderColor={borderColor} my="20px" />

          <Text fontSize="13px" color={textColorSecondary} textAlign="center">
            Belum punya akun?{' '}
            <Link href="/register" style={{ color: '#422AFB', fontWeight: 800 }}>
              Daftar Akun Baru
            </Link>
          </Text>
        </Box>
      </Container>

      <PublicFooter />
    </Box>
  );
}
