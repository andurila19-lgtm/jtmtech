import React, { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import AppWrappers from './AppWrappers';

export const metadata: Metadata = {
  title: 'JTM TECH - Bengkel Motor & Suku Cadang Original',
  description: 'Sistem Manajemen Bengkel Motor Modern, Booking Servis Online, dan Toko Sparepart Racing Original Terlengkap.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo192.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#422AFB',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body id={'root'}>
        <AppWrappers>{children}</AppWrappers>
      </body>
    </html>
  );
}

