import React from 'react';

export default function RootHead() {
  return (
    <>
      <link rel="apple-touch-icon" href="/logo192.png" />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href={process.env.NEXT_PUBLIC_BASE_PATH || '' + '/favicon.ico'}
      />

      <title>JTM TECH - Modern Workshop & Moto Parts Store Dashboard</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#4318FF" />
      <meta
        name="description"
        content="Sistem Manajemen Bengkel Motor Modern, Booking Servis Online, dan Toko Sparepart Racing Original Terlengkap."
      />
    </>
  );
}