'use client';

// Chakra imports
import {
  Box,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin';
// Layout components
import Navbar from 'components/navbar/NavbarAdmin';
import Sidebar from 'components/sidebar/Sidebar';
import MobileBottomNav from 'components/navigation/MobileBottomNav';
import { SidebarContext } from 'contexts/SidebarContext';
import { PropsWithChildren, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import routes from 'routes';

interface DashboardLayoutProps extends PropsWithChildren {
  [x: string]: any;
}

export default function AdminLayout(props: DashboardLayoutProps) {
  const { children, ...rest } = props;
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { onOpen } = useDisclosure();
  const pathname = usePathname();

  useEffect(() => {
    window.document.documentElement.dir = 'ltr';
  }, []);

  const bg = useColorModeValue('secondaryGray.300', 'navy.900');

  // Active route title determination from pathname
  const currentRoute = routes.find((r) => {
    const full = r.layout + r.path;
    if (r.path === '/default' && (pathname === '/admin/default' || pathname === '/admin' || pathname === '/admin/')) {
      return true;
    }
    return r.path !== '/default' && pathname?.startsWith(full);
  });

  const activeTitle = currentRoute?.name || 'Dashboard';

  return (
    <Box minH="100vh" w="100vw" bg={bg} overflowX="hidden">
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar routes={routes} {...rest} />
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Box>
            <Navbar
              onOpen={onOpen}
              logoText={'JTM TECH MotoWorkshop & Store'}
              brandText={activeTitle}
              secondary={currentRoute?.secondary || false}
              message={activeTitle}
              fixed={fixed}
              {...rest}
            />
          </Box>

          <Box
            mx="auto"
            p={{ base: '14px', md: '30px' }}
            pe={{ base: '14px', md: '20px' }}
            minH="100vh"
            pt={{ base: '80px', md: '85px' }}
            pb={{ base: '96px', md: '40px' }}
          >
            {children}
          </Box>
          <Box display={{ base: 'none', md: 'block' }}>
            <Footer />
          </Box>
        </Box>

        {/* Mobile Fixed Bottom Navigation (Owner-First) */}
        <MobileBottomNav />
      </SidebarContext.Provider>
    </Box>
  );
}

