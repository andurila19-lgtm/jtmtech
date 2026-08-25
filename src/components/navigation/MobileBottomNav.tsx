'use client';

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
  MdShoppingCart,
  MdCalendarMonth,
  MdBarChart,
  MdMenu,
} from 'react-icons/md';

interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: string;
  badgeColor?: string;
}

const navItems: NavItem[] = [
  {
    name: 'Beranda',
    href: '/admin/default',
    icon: MdHome,
  },
  {
    name: 'Pesanan',
    href: '/admin/orders',
    icon: MdShoppingCart,
    badge: '3',
    badgeColor: 'red.500',
  },
  {
    name: 'Booking',
    href: '/admin/bookings',
    icon: MdCalendarMonth,
    badge: '4',
    badgeColor: 'green.500',
  },
  {
    name: 'Penjualan',
    href: '/admin/sales',
    icon: MdBarChart,
  },
  {
    name: 'Lainnya',
    href: '/admin/more',
    icon: MdMenu,
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navBg = useColorModeValue('rgba(255, 255, 255, 0.96)', 'rgba(17, 28, 68, 0.96)');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const activeColor = useColorModeValue('brand.500', 'brand.400');
  const inactiveColor = useColorModeValue('gray.500', 'gray.400');
  const activePillBg = useColorModeValue('purple.50', 'whiteAlpha.200');

  const checkIsActive = (href: string) => {
    if (href === '/admin/default') {
      return pathname === '/admin/default' || pathname === '/admin' || pathname === '/admin/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <Box
      display={{ base: 'block', md: 'none' }}
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      zIndex="1100"
      bg={navBg}
      backdropFilter="blur(16px)"
      borderTop="1px solid"
      borderColor={borderColor}
      boxShadow="0px -4px 20px rgba(0, 0, 0, 0.06)"
      pb="max(10px, env(safe-area-inset-bottom))"
      pt="6px"
      px="4px"
    >
      <Flex justify="space-around" align="center" maxW="500px" mx="auto">
        {navItems.map((item) => {
          const isActive = checkIsActive(item.href);

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
                px="6px"
                borderRadius="12px"
                minH="48px"
                w="100%"
                maxW="72px"
                bg={isActive ? activePillBg : 'transparent'}
                transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                position="relative"
                cursor="pointer"
              >
                {/* Icon Container with Badge */}
                <Box position="relative">
                  <Icon
                    as={item.icon}
                    w="22px"
                    h="22px"
                    color={isActive ? activeColor : inactiveColor}
                    transition="transform 0.15s ease"
                    transform={isActive ? 'scale(1.1)' : 'scale(1)'}
                  />
                  {item.badge && (
                    <Badge
                      position="absolute"
                      top="-4px"
                      right="-10px"
                      bg={item.badgeColor || 'red.500'}
                      color="white"
                      borderRadius="full"
                      fontSize="9px"
                      px="4px"
                      py="1px"
                      lineHeight="1"
                      fontWeight="800"
                      boxShadow="0 0 0 1.5px white"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Box>

                {/* Text Label */}
                <Text
                  fontSize="10.5px"
                  fontWeight={isActive ? '800' : '600'}
                  color={isActive ? activeColor : inactiveColor}
                  mt="3px"
                  lineHeight="1"
                  letterSpacing="-0.2px"
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
