'use client';

import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Badge,
  Image,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  MdPerson,
  MdVisibility,
  MdChevronRight,
  MdArrowBack,
  MdShoppingCart,
  MdBuild,
} from 'react-icons/md';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import { useStore } from 'contexts/StoreContext';

export default function SingleArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { articles, products } = useStore();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const article = articles.find((a) => a.slug === slug || a.id === slug) || articles[0];
  const relatedArticles = articles.filter((a) => a.id !== article.id).slice(0, 3);
  const recommendedProduct = products[0];

  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'navy.900')}>
      <PublicNavbar />

      <Container maxW="900px" py="30px">
        {/* Breadcrumb */}
        <Breadcrumb spacing="8px" separator={<MdChevronRight color="gray.500" />} fontSize="13px" mb="20px">
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/">
              Beranda
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/articles">
              Artikel
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="brand.500" fontWeight="700">
              {article.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Badge colorScheme="purple" fontSize="12px" mb="10px">
          {article.category}
        </Badge>
        <Heading as="h1" fontSize={{ base: '26px', md: '36px' }} fontWeight="900" color={textColor} mb="16px" lineHeight="1.3">
          {article.title}
        </Heading>

        <HStack spacing="16px" color={textColorSecondary} fontSize="13px" mb="24px">
          <HStack spacing="6px">
            <Icon as={MdPerson} />
            <Text fontWeight="600">Ditulis oleh: {article.author}</Text>
          </HStack>
          <HStack spacing="6px">
            <Icon as={MdVisibility} />
            <Text>{article.views}x Dilihat</Text>
          </HStack>
        </HStack>

        <Box borderRadius="20px" overflow="hidden" mb="30px" boxShadow="md">
          <Image src={article.thumbnail} alt={article.title} w="100%" h={{ base: '240px', md: '400px' }} objectFit="cover" />
        </Box>

        {/* Main Article Text */}
        <Box fontSize="16px" color={textColor} lineHeight="1.9" mb="40px">
          <Text fontWeight="600" fontSize="18px" color={textColorSecondary} mb="20px">
            {article.excerpt}
          </Text>

          <Text mb="18px">
            {article.content ||
              'Perawatan rutin sepeda motor merupakan kunci utama agar performa mesin tetap bertenaga, hemat bahan bakar, dan terhindar dari mogok mendadak di tengah perjalanan.'}
          </Text>

          <Heading as="h2" fontSize="22px" fontWeight="800" mt="30px" mb="14px">
            Poin Penting Pemeriksaan Rutin:
          </Heading>

          <VStack spacing="12px" align="stretch" mb="24px" pl="14px">
            <Text>
              1. <strong>Cek Kualitas & Volume Oli Mesin:</strong> Ganti oli setiap 2.000 - 3.000 KM atau maksimal 2 bulan sekali agar gesekan komponen piston tetap terjaga optimal.
            </Text>
            <Text>
              2. <strong>Servis & Bersihkan Ruang CVT:</strong> Bersihkan debu kampas ganda dan roller secara berkala untuk mencegah timbulnya getaran atau gredek saat akselerasi.
            </Text>
            <Text>
              3. <strong>Pemeriksaan Busi & Filter Udara:</strong> Busi yang sudah aus dapat menyebabkan konsumsi bensin boros dan starter motor terasa berat.
            </Text>
          </VStack>

          {/* Embedded Product Recommendation Callout */}
          <Box
            p="20px"
            borderRadius="18px"
            bg={useColorModeValue('purple.50', 'navy.800')}
            border="1px solid"
            borderColor="brand.300"
            my="30px"
          >
            <Flex justify="space-between" align="center" flexWrap="wrap" gap="14px">
              <HStack spacing="14px">
                <Image src={recommendedProduct.images[0]} alt="" w="60px" h="60px" borderRadius="10px" objectFit="cover" />
                <Box>
                  <Text fontSize="12px" color="purple.700" fontWeight="700">
                    REKOMENDASI PRODUK TERKAIT
                  </Text>
                  <Text fontSize="15px" fontWeight="800" color={textColor}>
                    {recommendedProduct.name}
                  </Text>
                  <Text fontSize="13px" fontWeight="900" color="brand.500">
                    Rp {recommendedProduct.price.toLocaleString('id-ID')}
                  </Text>
                </Box>
              </HStack>

              <Link href={`/shop/${recommendedProduct.id}`}>
                <Button colorScheme="purple" size="sm" borderRadius="10px" leftIcon={<MdShoppingCart />}>
                  Beli Produk Ini
                </Button>
              </Link>
            </Flex>
          </Box>
        </Box>

        <Divider borderColor={borderColor} mb="40px" />

        {/* Related Articles */}
        <Box mb="40px">
          <Heading as="h3" fontSize="20px" fontWeight="800" color={textColor} mb="20px">
            Artikel Menarik Lainnya
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="18px">
            {relatedArticles.map((rel) => (
              <Box key={rel.id} p="14px" borderRadius="14px" bg={bgCard} border="1px solid" borderColor={borderColor}>
                <Link href={`/articles/${rel.slug}`}>
                  <Image src={rel.thumbnail} alt="" w="100%" h="120px" objectFit="cover" borderRadius="10px" mb="8px" />
                  <Text fontSize="13.5px" fontWeight="700" color={textColor} noOfLines={2}>
                    {rel.title}
                  </Text>
                </Link>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Container>

      <PublicFooter />
    </Box>
  );
}
