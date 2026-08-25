'use client';

import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  Avatar,
  useColorModeValue,
  Button,
  Divider,
} from '@chakra-ui/react';
import {
  MdDashboard,
  MdReceiptLong,
  MdCalendarToday,
  MdTwoWheeler,
  MdLocationOn,
  MdPerson,
  MdLogout,
} from 'react-icons/md';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import { useStore } from 'contexts/StoreContext';

export default function CustomerAccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { customer, logout } = useStore();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const pageBg = useColorModeValue('white', 'navy.900');
  const activeItemBg = useColorModeValue('brand.50', 'navy.700');
  const hoverItemBg = useColorModeValue('gray.100', 'navy.700');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const menuItems = [
    { label: 'Ringkasan Akun', href: '/account', icon: MdDashboard },
    { label: 'Pesanan Saya', href: '/account/orders', icon: MdReceiptLong },
    { label: 'Jadwal Booking', href: '/account/bookings', icon: MdCalendarToday },
    { label: 'Garasi Motor', href: '/account/vehicles', icon: MdTwoWheeler },
    { label: 'Buku Alamat', href: '/account/addresses', icon: MdLocationOn },
    { label: 'Profil Saya', href: '/account/profile', icon: MdPerson },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <Box minH="100vh" bg={pageBg}>
      <PublicNavbar />

      <Container maxW="1280px" py="30px">
        <SimpleGrid columns={{ base: 1, lg: 4 }} gap="30px" alignItems="flex-start">
          {/* Left: Customer Navigation Sidebar (1 Col) */}
          <Box
            p="20px"
            borderRadius="20px"
            bg={bgCard}
            border="1px solid"
            borderColor={borderColor}
            position={{ lg: 'sticky' }}
            top="90px"
          >
            {/* Customer Profile Mini Card */}
            <HStack spacing="12px" mb="18px" pb="16px" borderBottom="1px solid" borderColor={borderColor}>
              <Avatar
                size="md"
                name={customer?.name || 'Ahmad Fauzi'}
                src={customer?.avatar}
                border="2px solid"
                borderColor="brand.500"
              />
              <Box>
                <Text fontSize="15px" fontWeight="800" color={textColor} noOfLines={1}>
                  {customer?.name || 'Ahmad Fauzi'}
                </Text>
                <Text fontSize="11.5px" color={textColorSecondary}>
                  {customer?.phone || '081234567890'}
                </Text>
              </Box>
            </HStack>

            {/* Menu List */}
            <VStack spacing="4px" align="stretch">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <HStack
                      p="10px 14px"
                      borderRadius="12px"
                      bg={isActive ? activeItemBg : 'transparent'}
                      color={isActive ? 'brand.500' : textColor}
                      fontWeight={isActive ? '800' : '600'}
                      fontSize="13.5px"
                      spacing="10px"
                      _hover={{ bg: hoverItemBg }}
                      transition="0.2s"
                    >
                      <Icon as={item.icon} color={isActive ? 'brand.500' : 'gray.400'} w="18px" h="18px" />
                      <Text>{item.label}</Text>
                    </HStack>
                  </Link>
                );
              })}
            </VStack>

            <Divider borderColor={borderColor} my="14px" />

            <Button
              w="100%"
              variant="ghost"
              colorScheme="red"
              size="sm"
              borderRadius="10px"
              leftIcon={<MdLogout />}
              onClick={handleLogout}
              justifyContent="flex-start"
              fontSize="13px"
            >
              Keluar dari Akun
            </Button>
          </Box>

          {/* Right: Main Content (3 Cols) */}
          <Box gridColumn={{ base: 'span 1', lg: 'span 3' }}>{children}</Box>
        </SimpleGrid>
      </Container>

      <PublicFooter />
    </Box>
  );
}
