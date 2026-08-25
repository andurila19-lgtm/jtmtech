'use client';

import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Text,
  Button,
  IconButton,
  Badge,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  VStack,
  Image,
  Divider,
  DrawerFooter,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Icon,
} from '@chakra-ui/react';
import {
  MdSearch,
  MdShoppingCart,
  MdMenu,
  MdBuild,
  MdCalendarToday,
  MdPerson,
  MdDelete,
  MdArrowForward,
  MdPhone,
  MdLocationOn,
  MdTwoWheeler,
  MdReceiptLong,
  MdLogout,
  MdDashboard,
} from 'react-icons/md';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from 'contexts/StoreContext';
import GlobalSearchModal from './GlobalSearchModal';

export default function PublicNavbar() {
  const pathname = usePathname();
  const {
    cart,
    cartCount,
    cartSubtotal,
    removeFromCart,
    isCartDrawerOpen,
    openCartDrawer,
    closeCartDrawer,
    customer,
    isLoggedIn,
    logout,
    openSearch,
    settings,
  } = useStore();

  const { isOpen: isMenuOpen, onOpen: openMenu, onClose: closeMenu } = useDisclosure();

  const bg = useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(11, 20, 55, 0.95)');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const drawerBg = useColorModeValue('white', 'navy.800');
  const itemActiveBg = useColorModeValue('brand.50', 'navy.700');
  const itemHoverBg = useColorModeValue('gray.50', 'navy.700');
  const cartItemBg = useColorModeValue('gray.50', 'navy.700');
  const activeColor = 'brand.500';

  const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Layanan', href: '/services' },
    { label: 'Toko', href: '/shop' },
    { label: 'Booking Servis', href: '/booking' },
    { label: 'Tentang Kami', href: '/about' },
    { label: 'Artikel', href: '/articles' },
    { label: 'Kontak', href: '/contact' },
  ];

  return (
    <>
      <GlobalSearchModal />

      {/* Top Banner Info Bar */}
      <Box bg="navy.900" color="whiteAlpha.800" py="6px" px={{ base: '16px', md: '30px' }} fontSize="12px">
        <Flex justify="space-between" align="center" maxW="1280px" mx="auto">
          <HStack spacing={{ base: '12px', md: '20px' }}>
            <HStack spacing="6px">
              <Icon as={MdLocationOn} color="brand.400" />
              <Text noOfLines={1} display={{ base: 'none', sm: 'block' }}>
                {settings.businessInfo.address}, {settings.businessInfo.city}
              </Text>
            </HStack>
            <HStack spacing="6px">
              <Icon as={MdPhone} color="green.400" />
              <Text>{settings.businessInfo.phone}</Text>
            </HStack>
          </HStack>

          <HStack spacing="14px">
            <Text fontSize="11.5px" color="gray.400" display={{ base: 'none', md: 'block' }}>
              Buka: {settings.businessInfo.openingHours.weekdays}
            </Text>
            <Link href="/admin/default">
              <HStack spacing="4px" _hover={{ color: 'brand.400' }} transition="0.2s">
                <Icon as={MdDashboard} />
                <Text fontWeight="700">Admin Portal</Text>
              </HStack>
            </Link>
          </HStack>
        </Flex>
      </Box>

      {/* Main Sticky Navbar */}
      <Box
        as="header"
        position="sticky"
        top="0"
        zIndex="900"
        bg={bg}
        backdropFilter="blur(12px)"
        borderBottom="1px solid"
        borderColor={borderColor}
        py="12px"
        px={{ base: '16px', md: '30px' }}
      >
        <Flex align="center" justify="space-between" maxW="1280px" mx="auto">
          {/* Logo & Brand Name */}
          <Link href="/">
            <HStack spacing="10px">
              <Box
                w="38px"
                h="38px"
                borderRadius="10px"
                bg="linear-gradient(135deg, #7551FF 0%, #422AFB 100%)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
                boxShadow="0 4px 12px rgba(66, 42, 251, 0.3)"
              >
                <Icon as={MdTwoWheeler} w="22px" h="22px" />
              </Box>
              <Box>
                <Text fontSize="17px" fontWeight="900" letterSpacing="-0.5px" color={textColor} lineHeight="1.1">
                  JTM TECH
                </Text>
                <Text fontSize="10.5px" fontWeight="700" color="brand.500" letterSpacing="1px" textTransform="uppercase">
                  Bengkel & Suku Cadang
                </Text>
              </Box>
            </HStack>
          </Link>

          {/* Desktop Nav Links */}
          <HStack spacing="24px" display={{ base: 'none', lg: 'flex' }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link key={link.href} href={link.href}>
                  <Text
                    fontSize="14px"
                    fontWeight={isActive ? '800' : '600'}
                    color={isActive ? activeColor : textColorSecondary}
                    _hover={{ color: 'brand.500' }}
                    transition="0.2s"
                    position="relative"
                    py="4px"
                  >
                    {link.label}
                    {isActive && (
                      <Box
                        position="absolute"
                        bottom="-2px"
                        left="0"
                        right="0"
                        h="2px"
                        bg="brand.500"
                        borderRadius="full"
                      />
                    )}
                  </Text>
                </Link>
              );
            })}
          </HStack>

          {/* Right Action Icons & Primary CTA */}
          <HStack spacing={{ base: '8px', md: '12px' }}>
            {/* Search Icon */}
            <IconButton
              aria-label="Cari Suku Cadang"
              icon={<MdSearch size={22} />}
              variant="ghost"
              borderRadius="12px"
              onClick={openSearch}
              color={textColor}
              size="md"
            />

            {/* Cart Icon with Live Badge */}
            <Box position="relative">
              <IconButton
                aria-label="Keranjang Belanja"
                icon={<MdShoppingCart size={20} />}
                variant="ghost"
                borderRadius="12px"
                onClick={openCartDrawer}
                color={textColor}
                size="md"
              />
              {cartCount > 0 && (
                <Badge
                  position="absolute"
                  top="-2px"
                  right="-2px"
                  colorScheme="purple"
                  borderRadius="full"
                  px="6px"
                  py="2px"
                  fontSize="11px"
                  fontWeight="800"
                  boxShadow="0 2px 5px rgba(0,0,0,0.2)"
                >
                  {cartCount}
                </Badge>
              )}
            </Box>

            {/* Customer Account Button */}
            {isLoggedIn && customer ? (
              <Menu>
                <MenuButton>
                  <Avatar
                    size="sm"
                    name={customer.name}
                    src={customer.avatar}
                    cursor="pointer"
                    border="2px solid"
                    borderColor="brand.500"
                  />
                </MenuButton>
                <MenuList zIndex="1000" p="8px" borderRadius="14px" boxShadow="lg">
                  <Box px="12px" py="8px" borderBottom="1px solid" borderColor={borderColor} mb="6px">
                    <Text fontSize="13.5px" fontWeight="800" color={textColor}>
                      {customer.name}
                    </Text>
                    <Text fontSize="11px" color={textColorSecondary}>
                      {customer.phone}
                    </Text>
                  </Box>
                  <Link href="/account">
                    <MenuItem icon={<MdPerson size={18} />} borderRadius="8px" fontSize="13px">
                      Dashboard Akun
                    </MenuItem>
                  </Link>
                  <Link href="/account/orders">
                    <MenuItem icon={<MdReceiptLong size={18} />} borderRadius="8px" fontSize="13px">
                      Pesanan Saya
                    </MenuItem>
                  </Link>
                  <Link href="/account/bookings">
                    <MenuItem icon={<MdCalendarToday size={18} />} borderRadius="8px" fontSize="13px">
                      Jadwal Booking
                    </MenuItem>
                  </Link>
                  <Link href="/account/vehicles">
                    <MenuItem icon={<MdTwoWheeler size={18} />} borderRadius="8px" fontSize="13px">
                      Garasi Motor Saya
                    </MenuItem>
                  </Link>
                  <Divider my="6px" />
                  <MenuItem
                    icon={<MdLogout size={18} />}
                    color="red.500"
                    borderRadius="8px"
                    fontSize="13px"
                    onClick={logout}
                  >
                    Keluar Akun
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Link href="/login">
                <Button
                  size="sm"
                  variant="outline"
                  borderRadius="10px"
                  fontSize="13px"
                  display={{ base: 'none', sm: 'inline-flex' }}
                >
                  Masuk
                </Button>
              </Link>
            )}

            {/* Primary Booking CTA Desktop */}
            <Link href="/booking">
              <Button
                colorScheme="purple"
                borderRadius="12px"
                leftIcon={<MdBuild />}
                size="sm"
                h="40px"
                px="16px"
                fontWeight="800"
                display={{ base: 'none', sm: 'inline-flex' }}
                boxShadow="0 4px 14px rgba(66, 42, 251, 0.25)"
              >
                Booking Servis
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <IconButton
              aria-label="Buka Menu"
              icon={<MdMenu size={24} />}
              variant="outline"
              borderRadius="12px"
              onClick={openMenu}
              display={{ base: 'inline-flex', lg: 'none' }}
              size="md"
            />
          </HStack>
        </Flex>
      </Box>

      {/* Mobile Navigation Drawer */}
      <Drawer isOpen={isMenuOpen} placement="left" onClose={closeMenu}>
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue('white', 'navy.800')}>
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px solid" borderColor={borderColor}>
            <HStack spacing="10px">
              <Box
                w="32px"
                h="32px"
                borderRadius="8px"
                bg="brand.500"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
              >
                <Icon as={MdTwoWheeler} w="18px" h="18px" />
              </Box>
              <Text fontSize="16px" fontWeight="900" color={textColor}>
                JTM TECH
              </Text>
            </HStack>
          </DrawerHeader>

          <DrawerBody p="16px">
            <VStack spacing="6px" align="stretch" mb="20px">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href} onClick={closeMenu}>
                    <Box
                      p="12px 14px"
                      borderRadius="12px"
                      bg={isActive ? itemActiveBg : 'transparent'}
                      color={isActive ? 'brand.500' : textColor}
                      fontWeight={isActive ? '800' : '600'}
                      fontSize="14.5px"
                      _hover={{ bg: itemHoverBg }}
                    >
                      {link.label}
                    </Box>
                  </Link>
                );
              })}
            </VStack>

            <Divider mb="16px" />

            {/* Mobile Account Section */}
            {isLoggedIn && customer ? (
              <VStack spacing="8px" align="stretch" mb="20px">
                <Text fontSize="12px" fontWeight="800" color="gray.400" textTransform="uppercase">
                  Akun Pelanggan
                </Text>
                <Link href="/account" onClick={closeMenu}>
                  <HStack p="10px" borderRadius="10px" _hover={{ bg: itemHoverBg }}>
                    <Avatar size="xs" name={customer.name} src={customer.avatar} />
                    <Text fontSize="13.5px" fontWeight="700" color={textColor}>
                      {customer.name}
                    </Text>
                  </HStack>
                </Link>
                <Link href="/account/orders" onClick={closeMenu}>
                  <Text fontSize="13.5px" p="8px 10px" color={textColorSecondary}>
                    Pesanan Saya
                  </Text>
                </Link>
                <Link href="/account/bookings" onClick={closeMenu}>
                  <Text fontSize="13.5px" p="8px 10px" color={textColorSecondary}>
                    Jadwal Booking
                  </Text>
                </Link>
                <Link href="/account/vehicles" onClick={closeMenu}>
                  <Text fontSize="13.5px" p="8px 10px" color={textColorSecondary}>
                    Garasi Motor Saya
                  </Text>
                </Link>
              </VStack>
            ) : (
              <HStack spacing="10px" mb="20px">
                <Link href="/login" onClick={closeMenu} style={{ width: '50%' }}>
                  <Button w="100%" size="sm" variant="outline" borderRadius="10px">
                    Masuk
                  </Button>
                </Link>
                <Link href="/register" onClick={closeMenu} style={{ width: '50%' }}>
                  <Button w="100%" size="sm" colorScheme="purple" borderRadius="10px">
                    Daftar
                  </Button>
                </Link>
              </HStack>
            )}

            <Link href="/booking" onClick={closeMenu}>
              <Button
                w="100%"
                colorScheme="purple"
                leftIcon={<MdBuild />}
                h="44px"
                borderRadius="12px"
                fontWeight="800"
              >
                Booking Servis Sekarang
              </Button>
            </Link>
          </DrawerBody>

          <DrawerFooter borderTop="1px solid" borderColor={borderColor} p="14px">
            <Link href="/admin/default" style={{ width: '100%' }}>
              <Button w="100%" variant="ghost" size="xs" colorScheme="gray">
                Masuk ke Dashboard Pemilik Bengkel
              </Button>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Mini Cart Slide-over Drawer */}
      <Drawer isOpen={isCartDrawerOpen} placement="right" onClose={closeCartDrawer} size={{ base: 'full', sm: 'md' }}>
        <DrawerOverlay />
        <DrawerContent bg={drawerBg}>
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px solid" borderColor={borderColor}>
            <HStack spacing="8px">
              <Icon as={MdShoppingCart} color="brand.500" />
              <Text fontSize="16px" fontWeight="800" color={textColor}>
                Keranjang Belanja
              </Text>
              <Badge colorScheme="purple" borderRadius="full">
                {cartCount} item
              </Badge>
            </HStack>
          </DrawerHeader>

          <DrawerBody p="16px">
            {cart.length === 0 ? (
              <Box py="50px" textAlign="center">
                <Icon as={MdShoppingCart} w="48px" h="48px" color="gray.300" mb="12px" />
                <Text fontSize="16px" fontWeight="700" color={textColor}>
                  Keranjang Masih Kosong
                </Text>
                <Text fontSize="13px" color={textColorSecondary} mt="4px" mb="16px">
                  Pilih suku cadang atau oli berkualitas untuk motor Anda di toko kami.
                </Text>
                <Link href="/shop" onClick={closeCartDrawer}>
                  <Button colorScheme="purple" size="sm" borderRadius="10px">
                    Belanja Sekarang
                  </Button>
                </Link>
              </Box>
            ) : (
              <VStack spacing="12px" align="stretch">
                {cart.map((item) => (
                  <Flex
                    key={item.product.id}
                    p="12px"
                    borderRadius="12px"
                    bg={cartItemBg}
                    border="1px solid"
                    borderColor={borderColor}
                    gap="12px"
                    align="center"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      w="56px"
                      h="56px"
                      borderRadius="8px"
                      objectFit="cover"
                    />
                    <Box flex="1">
                      <Text fontSize="13px" fontWeight="700" color={textColor} noOfLines={1}>
                        {item.product.name}
                      </Text>
                      <Text fontSize="11px" color={textColorSecondary}>
                        {item.quantity} x Rp{' '}
                        {(item.product.discountPrice || item.product.price).toLocaleString('id-ID')}
                      </Text>
                      <Text fontSize="13px" fontWeight="800" color="brand.500" mt="2px">
                        Rp{' '}
                        {(
                          (item.product.discountPrice || item.product.price) * item.quantity
                        ).toLocaleString('id-ID')}
                      </Text>
                    </Box>
                    <IconButton
                      aria-label="Hapus item"
                      icon={<MdDelete />}
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => removeFromCart(item.product.id)}
                    />
                  </Flex>
                ))}
              </VStack>
            )}
          </DrawerBody>

          {cart.length > 0 && (
            <DrawerFooter borderTop="1px solid" borderColor={borderColor} flexDirection="column" gap="10px">
              <Flex justify="space-between" w="100%">
                <Text fontSize="13px" color={textColorSecondary}>
                  Subtotal:
                </Text>
                <Text fontSize="16px" fontWeight="900" color="brand.500">
                  Rp {cartSubtotal.toLocaleString('id-ID')}
                </Text>
              </Flex>

              <HStack spacing="10px" w="100%">
                <Link href="/cart" onClick={closeCartDrawer} style={{ width: '50%' }}>
                  <Button w="100%" variant="outline" h="44px" borderRadius="12px" fontSize="13.5px">
                    Buka Keranjang
                  </Button>
                </Link>
                <Link href="/checkout" onClick={closeCartDrawer} style={{ width: '50%' }}>
                  <Button
                    w="100%"
                    colorScheme="purple"
                    h="44px"
                    borderRadius="12px"
                    rightIcon={<MdArrowForward />}
                    fontSize="13.5px"
                    fontWeight="800"
                  >
                    Checkout
                  </Button>
                </Link>
              </HStack>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
