'use client';

// Chakra Imports
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import AdminNavbarLinks from 'components/navbar/NavbarLinksAdmin';
import { isWindowAvailable } from 'utils/navigation';

export default function AdminNavbar(props: {
  secondary: boolean;
  message: string | boolean;
  brandText: string;
  logoText: string;
  fixed: boolean;
  onOpen: (...args: any[]) => any;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isWindowAvailable()) {
      const changeNavbar = () => {
        if (window.scrollY > 1) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
      window.addEventListener('scroll', changeNavbar);

      return () => {
        window.removeEventListener('scroll', changeNavbar);
      };
    }
  }, []);

  const { secondary, brandText } = props;

  let mainText = useColorModeValue('navy.700', 'white');
  let secondaryText = useColorModeValue('gray.700', 'white');
  let navbarPosition = 'fixed' as const;
  let navbarFilter = 'none';
  let navbarBackdrop = 'blur(20px)';
  let navbarShadow = 'none';
  let navbarBg = useColorModeValue(
    'rgba(244, 247, 254, 0.2)',
    'rgba(11,20,55,0.5)',
  );
  let navbarBorder = 'transparent';
  let secondaryMargin = '0px';
  let paddingX = '15px';
  let gap = '0px';

  return (
    <Box
      position={navbarPosition}
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      backgroundPosition="center"
      backgroundSize="cover"
      borderRadius="16px"
      borderWidth="1.5px"
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration="0.25s, 0.25s, 0.25s, 0s"
      transitionProperty="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: 'center' }}
      display={secondary ? 'block' : 'flex'}
      minH={{ base: '52px', md: '75px' }}
      justifyContent={{ xl: 'center' }}
      lineHeight="25.6px"
      mx="auto"
      mt={secondaryMargin}
      pb={{ base: '4px', md: '8px' }}
      right={{ base: '10px', md: '30px', lg: '30px', xl: '30px' }}
      px={{
        base: '10px',
        md: '10px',
      }}
      ps={{
        xl: '12px',
      }}
      pt={{ base: '4px', md: '8px' }}
      top={{ base: '8px', md: '16px', xl: '18px' }}
      w={{
        base: 'calc(100vw - 20px)',
        md: 'calc(100vw - 8%)',
        lg: 'calc(100vw - 6%)',
        xl: 'calc(100vw - 350px)',
        '2xl': 'calc(100vw - 365px)',
      }}
      zIndex="5"
    >
      <Flex
        w="100%"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb={gap}
      >
        <Box>
          <Breadcrumb display={{ base: 'none', md: 'flex' }}>
            <BreadcrumbItem color={secondaryText} fontSize="sm" mb="5px">
              <BreadcrumbLink href="#" color={secondaryText}>
                Menu
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem color={secondaryText} fontSize="sm">
              <BreadcrumbLink href="#" color={secondaryText}>
                {brandText}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Text
            color={mainText}
            fontWeight="bold"
            fontSize={{ base: '17px', md: '26px', xl: '30px' }}
            lineHeight="120%"
            noOfLines={1}
          >
            {brandText}
          </Text>
        </Box>
        <Box ms="auto">
          <AdminNavbarLinks
            onOpen={props.onOpen}
            secondary={props.secondary}
            fixed={props.fixed}
          />
        </Box>
      </Flex>
    </Box>
  );
}
