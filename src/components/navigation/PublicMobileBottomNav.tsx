'use client';

import React from 'react';
import {
  Box,
  Flex,
  Icon,
  Text,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MdHome,
  MdBuild,
  MdStorefront,
  MdCalendarToday,
  MdPerson,
} from 'react-icons/md';
import { useStore } from 'contexts/StoreContext';

export default function PublicMobileBottomNav() {
  const pathname = usePathname();
  const { cartCount, isLoggedIn } = useStore();

  const bg = useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(11, 20, 55, 0.95)');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const activeColor = 'brand.500';
  const inactiveColor = useColorModeValue('gray.500', 'gray.400');
  const activePillBg = useColorModeValue('brand.50', 'navy.700');

  // Do not show on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const items = [
    {
      name: 'Beranda',
      href: '/',
      icon: MdHome,
      isActive: pathname === '/',
    },
    {
      name: 'Layanan',
      href: '/services',
      icon: MdBuild,
      isActive: pathname?.startsWith('/services'),
    },
    {
      name: 'Booking',
      href: '/booking',
      icon: MdCalendarToday,
      isSpecial: true,
      isActive: pathname?.startsWith('/booking'),
    },
    {
      name: 'Toko',
      href: '/shop',
      icon: MdStorefront,
      badge: cartCount > 0 ? String(cartCount) : undefined,
      isActive: pathname?.startsWith('/shop') || pathname?.startsWith('/cart') || pathname?.startsWith('/checkout'),
    },
    {
      name: isLoggedIn ? 'Akun' : 'Masuk',
      href: isLoggedIn ? '/account' : '/login',
      icon: MdPerson,
      isActive: pathname?.startsWith('/account') || pathname?.startsWith('/login') || pathname?.startsWith('/register'),
    },
  ];

  return (
    <Box
      display={{ base: 'block', lg: 'none' }}
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      zIndex="990"
      bg={bg}
      backdropFilter="blur(16px)"
      borderTop="1px solid"
      borderColor={borderColor}
      boxShadow="0px -4px 20px rgba(0, 0, 0, 0.08)"
      pb="max(8px, env(safe-area-inset-bottom))"
      pt="4px"
      px="4px"
    >
      <Flex justify="space-around" align="center" maxW="500px" mx="auto">
        {items.map((item) => {
          if (item.isSpecial) {
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  flex: 1,
                  textDecoration: 'none',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  position="relative"
                  top="-12px"
                >
                  <Box
                    w="44px"
                    h="44px"
                    borderRadius="full"
                    bg="linear-gradient(135deg, #7551FF 0%, #422AFB 100%)"
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    boxShadow="0 4px 14px rgba(66, 42, 251, 0.4)"
                    transition="transform 0.15s ease"
                    _active={{ transform: 'scale(0.95)' }}
                  >
                    <Icon as={item.icon} w="22px" h="22px" />
                  </Box>
                  <Text
                    fontSize="10px"
                    fontWeight="800"
                    color="brand.500"
                    mt="2px"
                    lineHeight="1"
                  >
                    {item.name}
                  </Text>
                </Flex>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                flex: 1,
                textDecoration: 'none',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Flex
                direction="column"
                align="center"
                justify="center"
                py="4px"
                px="4px"
                borderRadius="10px"
                minH="46px"
                w="100%"
                maxW="68px"
                bg={item.isActive ? activePillBg : 'transparent'}
                transition="all 0.2s ease"
                cursor="pointer"
              >
                <Box position="relative">
                  <Icon
                    as={item.icon}
                    w="20px"
                    h="20px"
                    color={item.isActive ? activeColor : inactiveColor}
                  />
                  {item.badge && (
                    <Badge
                      position="absolute"
                      top="-4px"
                      right="-10px"
                      bg="brand.500"
                      color="white"
                      borderRadius="full"
                      fontSize="9px"
                      px="4px"
                      py="1px"
                      lineHeight="1"
                      fontWeight="800"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Box>
                <Text
                  fontSize="10px"
                  fontWeight={item.isActive ? '800' : '600'}
                  color={item.isActive ? activeColor : inactiveColor}
                  mt="3px"
                  lineHeight="1"
                >
                  {item.name}
                </Text>
              </Flex>
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
}
