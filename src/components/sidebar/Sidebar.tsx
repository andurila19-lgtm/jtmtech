'use client';

import React from 'react';
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  useColorModeValue,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import Content from 'components/sidebar/components/Content';
import { IoMenuOutline } from 'react-icons/io5';
import { IRoute } from 'types/navigation';
import { isWindowAvailable } from 'utils/navigation';

interface SidebarResponsiveProps {
  routes: IRoute[];
}

interface SidebarProps extends SidebarResponsiveProps {
  [x: string]: any;
}

function Sidebar(props: SidebarProps) {
  const { routes } = props;

  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.08)',
    'unset',
  );
  const sidebarBg = useColorModeValue('white', 'navy.800');

  return (
    <Box display={{ sm: 'none', xl: 'block' }} position="fixed" minH="100vh" zIndex="10">
      <Box
        bg={sidebarBg}
        w="290px"
        h="100vh"
        minH="100%"
        overflowX="hidden"
        overflowY="auto"
        boxShadow={shadow}
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#CBD5E0',
            borderRadius: '24px',
          },
        }}
      >
        <Content routes={routes} />
      </Box>
    </Box>
  );
}

export function SidebarResponsive(props: SidebarResponsiveProps) {
  const sidebarBackgroundColor = useColorModeValue('white', 'navy.800');
  const menuColor = useColorModeValue('gray.400', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLDivElement>(null);

  const { routes } = props;

  return (
    <Flex display={{ sm: 'flex', xl: 'none' }} alignItems="center">
      <Flex ref={btnRef} w="max-content" h="max-content" onClick={onOpen}>
        <Icon
          as={IoMenuOutline}
          color={menuColor}
          my="auto"
          w="20px"
          h="20px"
          me="10px"
          _hover={{ cursor: 'pointer' }}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={
          isWindowAvailable() && window.document.documentElement.dir === 'rtl'
            ? 'right'
            : 'left'
        }
        finalFocusRef={btnRef as any}
      >
        <DrawerOverlay />
        <DrawerContent w="285px" maxW="285px" bg={sidebarBackgroundColor}>
          <DrawerCloseButton
            zIndex="3"
            onClick={onClose}
            _focus={{ boxShadow: 'none' }}
            _hover={{ boxShadow: 'none' }}
          />
          <DrawerBody
            maxW="285px"
            px="0rem"
            pb="0"
            overflowY="auto"
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#CBD5E0',
                borderRadius: '24px',
              },
            }}
          >
            <Content routes={routes} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default Sidebar;
