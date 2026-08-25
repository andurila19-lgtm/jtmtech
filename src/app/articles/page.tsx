'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Badge,
  Button,
  Image,
  Flex,
  HStack,
  VStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { MdSearch, MdArticle, MdChevronRight, MdPerson, MdVisibility } from 'react-icons/md';
import Link from 'next/link';
import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import { useStore } from 'contexts/StoreContext';

export default function ArticlesPage() {
  const { articles } = useStore();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const categories = ['ALL', 'Tips Perawatan Motor', 'Edukasi CVT Matic', 'Performa Mesin & Tune Up'];

  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || a.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'navy.900')}>
      <PublicNavbar />

      {/* Header Banner */}
      <Box bg="navy.900" color="white" py={{ base: '40px', md: '60px' }} textAlign="center">
        <Container maxW="1280px">
          <Badge colorScheme="purple" px="10px" py="4px" borderRadius="full" mb="12px" fontSize="12px">
            BLOG & EDUKASI OTOMOTIF
          </Badge>
          <Heading as="h1" fontSize={{ base: '28px', md: '42px' }} fontWeight="900" mb="10px">
            Tips & Panduan Perawatan Motor
          </Heading>
          <Text fontSize="15px" color="gray.300" maxW="600px" mx="auto">
            Pelajari cara merawat motor matic, memilih oli terbaik, mendeteksi kerusakan sejak dini, dan tips meningkatkan performa harian.
          </Text>
        </Container>
      </Box>

      {/* Search & Article Grid */}
      <Container maxW="1280px" py="40px">
        <Flex justify="space-between" align="center" mb="30px" flexWrap="wrap" gap="14px">
          <HStack spacing="8px" overflowX="auto" pb="4px">
            {categories.map((c) => (
              <Button
                key={c}
                size="sm"
                variant={selectedCategory === c ? 'solid' : 'outline'}
                colorScheme="purple"
                borderRadius="10px"
                onClick={() => setSelectedCategory(c)}
                fontSize="12.5px"
              >
                {c === 'ALL' ? 'Semua Artikel' : c}
              </Button>
            ))}
          </HStack>

          <InputGroup size="sm" maxW="280px">
            <InputLeftElement pointerEvents="none">
              <Icon as={MdSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Cari topik artikel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              borderRadius="10px"
            />
          </InputGroup>
        </Flex>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap="24px">
          {filteredArticles.map((art) => (
            <Box
              key={art.id}
              borderRadius="18px"
              bg={bgCard}
              border="1px solid"
              borderColor={borderColor}
              overflow="hidden"
              _hover={{ transform: 'translateY(-3px)', borderColor: 'brand.500' }}
              transition="0.2s"
              display="flex"
              flexDirection="column"
              boxShadow="sm"
            >
              <Image src={art.thumbnail} alt={art.title} w="100%" h="180px" objectFit="cover" />
              <Box p="18px" flex="1" display="flex" flexDirection="column">
                <Badge colorScheme="purple" alignSelf="flex-start" mb="8px" fontSize="10.5px">
                  {art.category}
                </Badge>
                <Link href={`/articles/${art.slug}`}>
                  <Heading as="h3" fontSize="16px" fontWeight="800" color={textColor} mb="8px" lineHeight="1.4" _hover={{ color: 'brand.500' }}>
                    {art.title}
                  </Heading>
                </Link>
                <Text fontSize="13px" color={textColorSecondary} mb="16px" flex="1" noOfLines={3}>
                  {art.excerpt}
                </Text>

                <Flex justify="space-between" align="center" pt="12px" borderTop="1px solid" borderColor={borderColor} fontSize="11.5px" color={textColorSecondary}>
                  <HStack spacing="4px">
                    <Icon as={MdPerson} />
                    <Text>{art.author}</Text>
                  </HStack>
                  <HStack spacing="4px">
                    <Icon as={MdVisibility} />
                    <Text>{art.views}x dibaca</Text>
                  </HStack>
                </Flex>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      <PublicFooter />
    </Box>
  );
}
