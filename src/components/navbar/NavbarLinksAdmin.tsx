'use client';

// Chakra Imports
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Badge,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom Components
import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import { SidebarResponsive } from 'components/sidebar/Sidebar';
// Assets
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import {
  MdNotificationsNone,
  MdPayment,
  MdCalendarMonth,
  MdWarning,
  MdLogout,
  MdPerson,
  MdSettings,
} from 'react-icons/md';
import routes from 'routes';

export default function HeaderLinks(props: {
  secondary: boolean;
  onOpen?: boolean | any;
  fixed?: boolean | any;
}) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  // Chakra Color Mode
  const navbarIcon = useColorModeValue('gray.400', 'white');
  let menuBg = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.700', 'brand.400');
  const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
  );
  const alertOrangeBg = useColorModeValue('orange.50', 'whiteAlpha.100');
  const alertGreenBg = useColorModeValue('green.50', 'whiteAlpha.100');
  const alertRedBg = useColorModeValue('red.50', 'whiteAlpha.100');

  return (
    <Flex
      w="auto"
      alignItems="center"
      flexDirection="row"
      bg={menuBg}
      p={{ base: '4px 8px', md: '8px 12px' }}
      borderRadius="30px"
      boxShadow={shadow}
      gap={{ base: '6px', md: '10px' }}
    >
      <Box display={{ base: 'none', md: 'block' }}>
        <SearchBar
          mb={() => {
            if (secondary) {
              return { base: '10px', md: 'unset' };
            }
            return 'unset';
          }}
          me="4px"
          borderRadius="30px"
        />
      </Box>

      {/* Notifications Menu */}
      <Menu>
        <MenuButton p="0px" position="relative">
          <Icon
            mt="6px"
            as={MdNotificationsNone}
            color={navbarIcon}
            w="20px"
            h="20px"
            me="10px"
          />
          <Badge
            position="absolute"
            top="0"
            right="6px"
            bg="red.500"
            color="white"
            borderRadius="full"
            fontSize="9px"
            px="4px"
          >
            3
          </Badge>
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="20px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
          mt="22px"
          me={{ base: '30px', md: 'unset' }}
          minW={{ base: 'unset', md: '380px' }}
          maxW={{ base: '360px', md: 'unset' }}
        >
          <Flex w="100%" mb="16px" justify="space-between" align="center">
            <Text fontSize="md" fontWeight="700" color={textColor}>
              Pemberitahuan Bengkel
            </Text>
            <Badge colorScheme="red" borderRadius="full">
              3 Perlu Penanganan
            </Badge>
          </Flex>

          <Flex flexDirection="column" gap="8px">
            <Link href="/admin/payments" style={{ textDecoration: 'none' }}>
              <Box
                p="10px"
                borderRadius="12px"
                bg={alertOrangeBg}
                _hover={{ opacity: 0.85 }}
              >
                <HStack spacing="10px">
                  <Center bg="orange.400" w="32px" h="32px" borderRadius="8px" color="white">
                    <Icon as={MdPayment} />
                  </Center>
                  <Box>
                    <Text fontSize="12.5px" fontWeight="700" color={textColor}>
                      Verifikasi Pembayaran Transfer
                    </Text>
                    <Text fontSize="11px" color="gray.500">
                      Siti Rahmawati - Rp 275.000 (BCA)
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </Link>

            <Link href="/admin/bookings" style={{ textDecoration: 'none' }}>
              <Box
                p="10px"
                borderRadius="12px"
                bg={alertGreenBg}
                _hover={{ opacity: 0.85 }}
              >
                <HStack spacing="10px">
                  <Center bg="green.500" w="32px" h="32px" borderRadius="8px" color="white">
                    <Icon as={MdCalendarMonth} />
                  </Center>
                  <Box>
                    <Text fontSize="12.5px" fontWeight="700" color={textColor}>
                      Booking Servis Baru Hari Ini
                    </Text>
                    <Text fontSize="11px" color="gray.500">
                      Reza Fahlevi - Beat Street (15:30 WIB)
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </Link>

            <Link href="/admin/inventory" style={{ textDecoration: 'none' }}>
              <Box
                p="10px"
                borderRadius="12px"
                bg={alertRedBg}
                _hover={{ opacity: 0.85 }}
              >
                <HStack spacing="10px">
                  <Center bg="red.500" w="32px" h="32px" borderRadius="8px" color="white">
                    <Icon as={MdWarning} />
                  </Center>
                  <Box>
                    <Text fontSize="12.5px" fontWeight="700" color={textColor}>
                      Stok Kritis: Busi Iridium NGK
                    </Text>
                    <Text fontSize="11px" color="gray.500">
                      Tersisa 3 unit (Batas min: 15)
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </Link>
          </Flex>
        </MenuList>
      </Menu>

      {/* Dark / Light Toggle */}
      <Button
        variant="no-hover"
        bg="transparent"
        p="0px"
        minW="unset"
        minH="unset"
        h="18px"
        w="max-content"
        onClick={toggleColorMode}
      >
        <Icon
          me="12px"
          h="18px"
          w="18px"
          color={navbarIcon}
          as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
        />
      </Button>

      {/* User Profile Menu */}
      <Menu>
        <MenuButton p="0px" style={{ position: 'relative' }}>
          <Box
            _hover={{ cursor: 'pointer' }}
            color="white"
            bg="linear-gradient(135deg, #4318FF 0%, #868CFF 100%)"
            w="40px"
            h="40px"
            borderRadius={'50%'}
          />
          <Center top={0} left={0} position={'absolute'} w={'100%'} h={'100%'}>
            <Text fontSize={'xs'} fontWeight="bold" color={'white'}>
              AF
            </Text>
          </Center>
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="0px"
          mt="10px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
        >
          <Flex w="100%" mb="0px" direction="column" ps="20px" pt="16px" pb="12px" borderBottom="1px solid" borderColor={borderColor}>
            <HStack spacing="6px">
              <Text fontSize="sm" fontWeight="700" color={textColor}>
                Ahmad Fauzi
              </Text>
              <Badge colorScheme="purple" fontSize="9px">
                PEMILIK
              </Badge>
            </HStack>
            <Text fontSize="11px" color="gray.400">
              fauzi@jtmtech.id
            </Text>
          </Flex>
          <Flex flexDirection="column" p="10px">
            <Link href="/admin/users" style={{ textDecoration: 'none' }}>
              <MenuItem
                _hover={{ bg: 'none' }}
                _focus={{ bg: 'none' }}
                borderRadius="8px"
                px="14px"
              >
                <HStack spacing="8px">
                  <Icon as={MdPerson} />
                  <Text fontSize="sm">Profil & Data Staf</Text>
                </HStack>
              </MenuItem>
            </Link>
            <Link href="/admin/settings" style={{ textDecoration: 'none' }}>
              <MenuItem
                _hover={{ bg: 'none' }}
                _focus={{ bg: 'none' }}
                borderRadius="8px"
                px="14px"
              >
                <HStack spacing="8px">
                  <Icon as={MdSettings} />
                  <Text fontSize="sm">Pengaturan Bengkel</Text>
                </HStack>
              </MenuItem>
            </Link>
            <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              color="red.400"
              borderRadius="8px"
              px="14px"
            >
              <HStack spacing="8px">
                <Icon as={MdLogout} />
                <Text fontSize="sm">Keluar Akun (Logout)</Text>
              </HStack>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}
