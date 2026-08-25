/* eslint-disable */
'use client';

// chakra imports
import {
  Box,
  Flex,
  HStack,
  Text,
  Badge,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import Link from 'next/link';
import { IRoute } from 'types/navigation';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

interface SidebarLinksProps {
  routes: IRoute[];
}

export function SidebarLinks(props: SidebarLinksProps) {
  const { routes } = props;

  // Chakra color mode
  const pathname = usePathname();

  let activeColor = useColorModeValue('brand.500', 'white');
  let inactiveColor = useColorModeValue('secondaryGray.600', 'secondaryGray.500');
  let activeBg = useColorModeValue('brand.50', 'whiteAlpha.100');
  let activeIcon = useColorModeValue('brand.500', 'white');
  let textColor = useColorModeValue('secondaryGray.700', 'secondaryGray.400');
  let brandColor = useColorModeValue('brand.500', 'brand.400');
  let groupTitleColor = useColorModeValue('gray.400', 'gray.500');
  let dividerColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  let hoverBg = useColorModeValue('gray.50', 'whiteAlpha.50');

  // verifies if route is active
  const isActive = useCallback(
    (routePath: string) => {
      const fullPath = '/admin' + routePath;
      if (routePath === '/default' && pathname === '/admin/default') return true;
      if (routePath === '/default' && pathname === '/admin') return true;
      if (routePath !== '/default' && pathname?.startsWith(fullPath)) return true;
      return false;
    },
    [pathname],
  );

  // Group routes by category
  const categories: { [key: string]: IRoute[] } = {};
  routes.forEach((route) => {
    const cat = route.category || 'OTHER';
    if (!categories[cat]) {
      categories[cat] = [];
    }
    categories[cat].push(route);
  });

  return (
    <Box pb="30px">
      {Object.entries(categories).map(([categoryName, catRoutes], catIndex) => {
        return (
          <Box key={categoryName} mb="18px">
            {categoryName !== 'MAIN' && (
              <Box px="12px" pt="14px" pb="6px">
                <Flex align="center" justify="space-between">
                  <Text
                    fontSize="11px"
                    fontWeight="800"
                    letterSpacing="1px"
                    color={groupTitleColor}
                    textTransform="uppercase"
                  >
                    {categoryName}
                  </Text>
                  <Divider borderColor={dividerColor} w="40%" />
                </Flex>
              </Box>
            )}

            {catRoutes.map((route, index) => {
              const active = isActive(route.path);
              return (
                <Link key={index} href={route.layout + route.path} style={{ textDecoration: 'none' }}>
                  <Box
                    my="3px"
                    px="12px"
                    py="8px"
                    borderRadius="12px"
                    bg={active ? activeBg : 'transparent'}
                    _hover={{
                      bg: active ? activeBg : hoverBg,
                    }}
                    transition="all 0.2s ease"
                    cursor="pointer"
                  >
                    <Flex align="center" justify="space-between">
                      <HStack spacing="12px">
                        <Box color={active ? activeIcon : textColor} fontSize="18px">
                          {route.icon}
                        </Box>
                        <Text
                          color={active ? activeColor : textColor}
                          fontWeight={active ? '700' : '500'}
                          fontSize="13.5px"
                          lineHeight="100%"
                        >
                          {route.name}
                        </Text>
                      </HStack>

                      {route.badge && (
                        <Badge
                          colorScheme={
                            route.badgeColor === 'brand.500'
                              ? 'purple'
                              : route.badgeColor === 'orange.500'
                              ? 'orange'
                              : route.badgeColor === 'green.500'
                              ? 'green'
                              : route.badgeColor === 'red.500'
                              ? 'red'
                              : 'gray'
                          }
                          variant="solid"
                          fontSize="10px"
                          borderRadius="full"
                          px="7px"
                          py="1px"
                        >
                          {route.badge}
                        </Badge>
                      )}
                    </Flex>
                  </Box>
                </Link>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
}

export default SidebarLinks;
