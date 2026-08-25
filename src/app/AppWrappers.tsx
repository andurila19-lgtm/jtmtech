'use client';
import React, { ReactNode } from 'react';
import 'styles/App.css';
import 'styles/Contact.css';
import 'styles/MiniCalendar.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme/theme';

import { StoreProvider } from 'contexts/StoreContext';
import PublicMobileBottomNav from 'components/navigation/PublicMobileBottomNav';

export default function AppWrappers({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <StoreProvider>
        {children}
        <PublicMobileBottomNav />
      </StoreProvider>
    </ChakraProvider>
  );
}



