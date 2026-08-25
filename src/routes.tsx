import { Icon } from '@chakra-ui/react';
import {
  MdHome,
  MdShoppingCart,
  MdPayment,
  MdPeople,
  MdBuild,
  MdBikeScooter,
  MdEngineering,
  MdInventory,
  MdCategory,
  MdSwapHoriz,
  MdLocalOffer,
  MdArticle,
  MdViewCarousel,
  MdPhotoLibrary,
  MdRateReview,
  MdQuiz,
  MdManageAccounts,
  MdSecurity,
  MdPermMedia,
  MdSettings,
  MdCalendarMonth,
  MdDescription,
  MdBarChart,
  MdMenu,
} from 'react-icons/md';
import { IRoute } from 'types/navigation';

const routes: IRoute[] = [
  // DASHBOARD
  {
    name: 'Dashboard',
    layout: '/admin',
    path: '/default',
    category: 'MAIN',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },

  // TRANSAKSI
  {
    name: 'Pesanan',
    layout: '/admin',
    path: '/orders',
    category: 'TRANSAKSI',
    badge: '3',
    badgeColor: 'red.500',
    icon: <Icon as={MdShoppingCart} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Pembayaran',
    layout: '/admin',
    path: '/payments',
    category: 'TRANSAKSI',
    badge: '1',
    badgeColor: 'orange.500',
    icon: <Icon as={MdPayment} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Pelanggan',
    layout: '/admin',
    path: '/customers',
    category: 'TRANSAKSI',
    icon: <Icon as={MdPeople} width="20px" height="20px" color="inherit" />,
  },

  // BENGKEL
  {
    name: 'Booking',
    layout: '/admin',
    path: '/bookings',
    category: 'BENGKEL',
    badge: '4',
    badgeColor: 'green.500',
    icon: <Icon as={MdCalendarMonth} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Layanan',
    layout: '/admin',
    path: '/services',
    category: 'BENGKEL',
    icon: <Icon as={MdBuild} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Kendaraan',
    layout: '/admin',
    path: '/vehicles',
    category: 'BENGKEL',
    icon: <Icon as={MdBikeScooter} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Mekanik',
    layout: '/admin',
    path: '/mechanics',
    category: 'BENGKEL',
    icon: <Icon as={MdEngineering} width="20px" height="20px" color="inherit" />,
  },

  // TOKO
  {
    name: 'Produk',
    layout: '/admin',
    path: '/products',
    category: 'TOKO',
    icon: <Icon as={MdInventory} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Kategori',
    layout: '/admin',
    path: '/categories',
    category: 'TOKO',
    icon: <Icon as={MdCategory} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Stok',
    layout: '/admin',
    path: '/inventory',
    category: 'TOKO',
    icon: <Icon as={MdInventory} width="20px" height="20px" color="inherit" />,
  },

  // WEBSITE
  {
    name: 'Halaman',
    layout: '/admin',
    path: '/pages',
    category: 'WEBSITE',
    icon: <Icon as={MdDescription} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Artikel',
    layout: '/admin',
    path: '/articles',
    category: 'WEBSITE',
    icon: <Icon as={MdArticle} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Banner',
    layout: '/admin',
    path: '/banners',
    category: 'WEBSITE',
    icon: <Icon as={MdViewCarousel} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Galeri',
    layout: '/admin',
    path: '/gallery',
    category: 'WEBSITE',
    icon: <Icon as={MdPhotoLibrary} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Testimoni',
    layout: '/admin',
    path: '/testimonials',
    category: 'WEBSITE',
    icon: <Icon as={MdRateReview} width="20px" height="20px" color="inherit" />,
  },

  // SYSTEM
  {
    name: 'Pengaturan',
    layout: '/admin',
    path: '/settings',
    category: 'SYSTEM',
    icon: <Icon as={MdSettings} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'User & Role',
    layout: '/admin',
    path: '/users',
    category: 'SYSTEM',
    icon: <Icon as={MdManageAccounts} width="20px" height="20px" color="inherit" />,
  },

  // ADDITIONAL APP ROUTES (for navigation & mobile hub)
  {
    name: 'Penjualan',
    layout: '/admin',
    path: '/sales',
    secondary: true,
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Lainnya',
    layout: '/admin',
    path: '/more',
    secondary: true,
    icon: <Icon as={MdMenu} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Mutasi Stok',
    layout: '/admin',
    path: '/stock-movements',
    secondary: true,
    icon: <Icon as={MdSwapHoriz} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Promo & Kupon',
    layout: '/admin',
    path: '/promotions',
    secondary: true,
    icon: <Icon as={MdLocalOffer} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Tanya Jawab (FAQ)',
    layout: '/admin',
    path: '/faq',
    secondary: true,
    icon: <Icon as={MdQuiz} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Pustaka Media',
    layout: '/admin',
    path: '/media',
    secondary: true,
    icon: <Icon as={MdPermMedia} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Hak Akses (RBAC)',
    layout: '/admin',
    path: '/roles',
    secondary: true,
    icon: <Icon as={MdSecurity} width="20px" height="20px" color="inherit" />,
  },
];

export default routes;

