'use client';

import {
  Box,
  Flex,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
  Badge,
  Divider,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import Link from 'next/link';
import {
  MdInventory,
  MdCategory,
  MdSwapHoriz,
  MdLocalOffer,
  MdBuild,
  MdBikeScooter,
  MdEngineering,
  MdPeople,
  MdDescription,
  MdArticle,
  MdViewCarousel,
  MdPhotoLibrary,
  MdRateReview,
  MdQuiz,
  MdPermMedia,
  MdSettings,
  MdManageAccounts,
  MdSecurity,
  MdChevronRight,
  MdApps,
  MdPayment,
} from 'react-icons/md';

interface MenuItem {
  title: string;
  desc: string;
  href: string;
  icon: any;
  badge?: string;
  badgeColor?: string;
  iconBg?: string;
}

interface MenuSection {
  category: string;
  items: MenuItem[];
}

export default function MorePage() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const sectionTitleColor = useColorModeValue('brand.500', 'brand.400');
  const cardBg = useColorModeValue('white', 'navy.800');
  const hoverBg = useColorModeValue('purple.50', 'whiteAlpha.100');
  const iconDefaultBg = useColorModeValue('purple.50', 'whiteAlpha.100');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');

  const menuSections: MenuSection[] = [
    {
      category: 'TOKO & SUKU CADANG',
      items: [
        {
          title: 'Produk & Suku Cadang',
          desc: 'Katalog oli, sparepart, dan ban motor',
          href: '/admin/products',
          icon: MdInventory,
        },
        {
          title: 'Kategori Produk',
          desc: 'Pengelompokan etalase barang',
          href: '/admin/categories',
          icon: MdCategory,
        },
        {
          title: 'Inventaris & Stok Fisik',
          desc: 'Monitoring stok minimum & restock',
          href: '/admin/inventory',
          icon: MdInventory,
          badge: 'Stok Kritis',
          badgeColor: 'orange.500',
        },
        {
          title: 'Riwayat Mutasi Stok',
          desc: 'Log keluar masuk suku cadang gudang',
          href: '/admin/stock-movements',
          icon: MdSwapHoriz,
        },
        {
          title: 'Promo & Kupon Diskon',
          desc: 'Voucher potongan harga belanja',
          href: '/admin/promotions',
          icon: MdLocalOffer,
        },
      ],
    },
    {
      category: 'OPERASIONAL BENGKEL',
      items: [
        {
          title: 'Layanan & Paket Servis',
          desc: 'Tarif jasa tune up, CVT, & overhaul',
          href: '/admin/services',
          icon: MdBuild,
        },
        {
          title: 'Database Kendaraan',
          desc: 'Data motor pelanggan & nomor polisi',
          href: '/admin/vehicles',
          icon: MdBikeScooter,
        },
        {
          title: 'Daftar Mekanik & Shift',
          desc: 'Jadwal kerja & teknisi standby bengkel',
          href: '/admin/mechanics',
          icon: MdEngineering,
        },
      ],
    },
    {
      category: 'PELANGGAN (CRM)',
      items: [
        {
          title: 'Data Pelanggan',
          desc: 'Profil 360° pelanggan & histori servis',
          href: '/admin/customers',
          icon: MdPeople,
        },
      ],
    },
    {
      category: 'KONTEN WEBSITE (CMS)',
      items: [
        {
          title: 'Halaman Statis',
          desc: 'Tentang bengkel, kontak, & syarat ketentuan',
          href: '/admin/pages',
          icon: MdDescription,
        },
        {
          title: 'Artikel & Blog',
          desc: 'Tips otomotif, edukasi perawatan mesin',
          href: '/admin/articles',
          icon: MdArticle,
        },
        {
          title: 'Banner & Slider',
          desc: 'Banner promo beranda website',
          href: '/admin/banners',
          icon: MdViewCarousel,
        },
        {
          title: 'Galeri Foto Bengkel',
          desc: 'Dokumentasi dyno test & pengerjaan servis',
          href: '/admin/gallery',
          icon: MdPhotoLibrary,
        },
        {
          title: 'Ulasan Pelanggan',
          desc: 'Moderasi testimoni & rating kepuasan',
          href: '/admin/testimonials',
          icon: MdRateReview,
        },
        {
          title: 'Tanya Jawab (FAQ)',
          desc: 'Daftar pertanyaan umum & SOP servis',
          href: '/admin/faq',
          icon: MdQuiz,
        },
        {
          title: 'Pustaka Media',
          desc: 'Penyimpanan berkas foto & gambar',
          href: '/admin/media',
          icon: MdPermMedia,
        },
      ],
    },
    {
      category: 'PENGATURAN & SISTEM',
      items: [
        {
          title: 'Profil Bisnis & Jam Buka',
          desc: 'Informasi bengkel, alamat, & kontak',
          href: '/admin/settings',
          icon: MdSettings,
        },
        {
          title: 'Pembayaran, QRIS & Bank',
          desc: 'Konfigurasi rekening dan QRIS toko',
          href: '/admin/settings',
          icon: MdPayment,
        },
        {
          title: 'Manajemen Pengguna',
          desc: 'Akun staf kasir, admin, & mekanik',
          href: '/admin/users',
          icon: MdManageAccounts,
        },
        {
          title: 'Hak Akses & Role (RBAC)',
          desc: 'Matriks izin akses per divisi',
          href: '/admin/roles',
          icon: MdSecurity,
        },
      ],
    },
  ];

  return (
    <Box pt={{ base: '10px', md: '70px', xl: '70px' }} pb="30px">
      {/* Header */}
      <Box mb="20px">
        <HStack spacing="8px" mb="4px">
          <Icon as={MdApps} color="brand.500" w="24px" h="24px" />
          <Text fontSize="22px" fontWeight="800" color={textColor}>
            Menu & Fitur Lengkap
          </Text>
        </HStack>
        <Text fontSize="13px" color={textColorSecondary}>
          Akses seluruh modul toko, operasional servis bengkel, konten CMS, dan konfigurasi sistem.
        </Text>
      </Box>

      <VStack spacing="24px" align="stretch">
        {menuSections.map((section) => (
          <Box key={section.category}>
            <Text
              fontSize="12px"
              fontWeight="800"
              color={sectionTitleColor}
              letterSpacing="0.8px"
              textTransform="uppercase"
              mb="10px"
              px="4px"
            >
              {section.category}
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="12px">
              {section.items.map((item) => (
                <Link key={item.title} href={item.href} style={{ textDecoration: 'none' }}>
                  <Card
                    p="14px"
                    bg={cardBg}
                    borderRadius="14px"
                    border="1px solid"
                    borderColor={borderColor}
                    _hover={{
                      bg: hoverBg,
                      transform: 'translateY(-2px)',
                      borderColor: 'brand.300',
                    }}
                    transition="all 0.2s ease"
                    cursor="pointer"
                    minH="68px"
                  >
                    <Flex justify="space-between" align="center">
                      <HStack spacing="14px" flex="1">
                        <Flex
                          w="42px"
                          h="42px"
                          borderRadius="12px"
                          bg={iconDefaultBg}
                          color="brand.500"
                          align="center"
                          justify="center"
                          flexShrink={0}
                        >
                          <Icon as={item.icon} w="22px" h="22px" />
                        </Flex>
                        <Box flex="1" minW="0">
                          <HStack spacing="8px" mb="2px">
                            <Text
                              fontSize="13.5px"
                              fontWeight="700"
                              color={textColor}
                              noOfLines={1}
                            >
                              {item.title}
                            </Text>
                            {item.badge && (
                              <Badge
                                colorScheme={item.badgeColor === 'orange.500' ? 'orange' : 'purple'}
                                fontSize="9.5px"
                                borderRadius="full"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </HStack>
                          <Text
                            fontSize="11.5px"
                            color={textColorSecondary}
                            noOfLines={1}
                          >
                            {item.desc}
                          </Text>
                        </Box>
                      </HStack>

                      <Icon as={MdChevronRight} color="gray.400" w="20px" h="20px" ms="6px" />
                    </Flex>
                  </Card>
                </Link>
              ))}
            </SimpleGrid>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
