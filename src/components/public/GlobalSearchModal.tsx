'use client';

import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  Box,
  Text,
  Badge,
  Icon,
  Image,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdSearch, MdBuild, MdShoppingCart, MdArticle, MdChevronRight } from 'react-icons/md';
import Link from 'next/link';
import { useStore } from 'contexts/StoreContext';

export default function GlobalSearchModal() {
  const { isSearchOpen, closeSearch, products, services, articles } = useStore();
  const [query, setQuery] = useState('');

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgHover = useColorModeValue('gray.50', 'navy.700');
  const modalBg = useColorModeValue('white', 'navy.800');
  const inputBg = useColorModeValue('secondaryGray.300', 'navy.900');

  const q = query.trim().toLowerCase();

  const matchedProducts = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.compatibleVehicles.some((v) => v.toLowerCase().includes(q))
      ).slice(0, 4)
    : [];

  const matchedServices = q
    ? services.filter(
        (s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const matchedArticles = q
    ? articles.filter(
        (a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const totalResults = matchedProducts.length + matchedServices.length + matchedArticles.length;

  const handleSelect = () => {
    setQuery('');
    closeSearch();
  };

  return (
    <Modal isOpen={isSearchOpen} onClose={closeSearch} size={{ base: 'full', md: 'xl' }} isCentered>
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent bg={modalBg} borderRadius={{ base: 0, md: '18px' }} overflow="hidden" my={{ base: 0, md: 'auto' }}>
        <ModalHeader p="16px" pb="10px">
          <InputGroup>
            <InputLeftElement pointerEvents="none" h="48px">
              <Icon as={MdSearch} color="brand.500" w="22px" h="22px" />
            </InputLeftElement>
            <Input
              placeholder="Cari suku cadang, oli, layanan servis, atau artikel..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              bg={inputBg}
              borderRadius="12px"
              h="48px"
              fontSize="15px"
              autoFocus
            />
          </InputGroup>
        </ModalHeader>

        <ModalBody p="16px" pt="0" maxH="70vh" overflowY="auto">
          {!q && (
            <Box py="30px" textAlign="center">
              <Text fontSize="14px" color={textColorSecondary}>
                Ketik nama sparepart (e.g. <i>Motul, V-Belt, Busi</i>), layanan (e.g. <i>CVT, Tune Up</i>), atau model motor (e.g. <i>Vario 160</i>).
              </Text>
            </Box>
          )}

          {q && totalResults === 0 && (
            <Box py="30px" textAlign="center">
              <Text fontSize="15px" fontWeight="700" color={textColor}>
                Tidak ditemukan hasil untuk &quot;{query}&quot;
              </Text>
              <Text fontSize="13px" color={textColorSecondary} mt="4px">
                Coba gunakan kata kunci lain seperti merk motor atau kategori suku cadang.
              </Text>
            </Box>
          )}

          {/* Matched Products */}
          {matchedProducts.length > 0 && (
            <Box mb="16px">
              <HStack spacing="6px" mb="8px">
                <Icon as={MdShoppingCart} color="brand.500" />
                <Text fontSize="12px" fontWeight="800" textTransform="uppercase" color={textColorSecondary}>
                  Suku Cadang & Produk ({matchedProducts.length})
                </Text>
              </HStack>
              <VStack spacing="6px" align="stretch">
                {matchedProducts.map((p) => (
                  <Link href={`/shop/${p.id}`} key={p.id} onClick={handleSelect}>
                    <Flex
                      p="10px"
                      borderRadius="12px"
                      align="center"
                      justify="space-between"
                      _hover={{ bg: bgHover }}
                      transition="0.2s"
                    >
                      <HStack spacing="10px">
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          w="42px"
                          h="42px"
                          borderRadius="8px"
                          objectFit="cover"
                        />
                        <Box>
                          <Text fontSize="13.5px" fontWeight="700" color={textColor} noOfLines={1}>
                            {p.name}
                          </Text>
                          <Text fontSize="12px" color="brand.500" fontWeight="700">
                            Rp {(p.discountPrice || p.price).toLocaleString('id-ID')}
                          </Text>
                        </Box>
                      </HStack>
                      <Icon as={MdChevronRight} color="gray.400" />
                    </Flex>
                  </Link>
                ))}
              </VStack>
            </Box>
          )}

          {/* Matched Services */}
          {matchedServices.length > 0 && (
            <Box mb="16px">
              <HStack spacing="6px" mb="8px">
                <Icon as={MdBuild} color="orange.500" />
                <Text fontSize="12px" fontWeight="800" textTransform="uppercase" color={textColorSecondary}>
                  Layanan Bengkel ({matchedServices.length})
                </Text>
              </HStack>
              <VStack spacing="6px" align="stretch">
                {matchedServices.map((s) => (
                  <Link href={`/services/${s.slug}`} key={s.id} onClick={handleSelect}>
                    <Flex
                      p="10px"
                      borderRadius="12px"
                      align="center"
                      justify="space-between"
                      _hover={{ bg: bgHover }}
                      transition="0.2s"
                    >
                      <Box>
                        <Text fontSize="13.5px" fontWeight="700" color={textColor}>
                          {s.name}
                        </Text>
                        <Text fontSize="11.5px" color={textColorSecondary}>
                          Estimasi {s.estimatedDuration} • Mulai Rp {s.price.toLocaleString('id-ID')}
                        </Text>
                      </Box>
                      <Badge colorScheme="orange">Servis</Badge>
                    </Flex>
                  </Link>
                ))}
              </VStack>
            </Box>
          )}

          {/* Matched Articles */}
          {matchedArticles.length > 0 && (
            <Box mb="10px">
              <HStack spacing="6px" mb="8px">
                <Icon as={MdArticle} color="purple.500" />
                <Text fontSize="12px" fontWeight="800" textTransform="uppercase" color={textColorSecondary}>
                  Artikel & Tips ({matchedArticles.length})
                </Text>
              </HStack>
              <VStack spacing="6px" align="stretch">
                {matchedArticles.map((a) => (
                  <Link href={`/articles/${a.slug}`} key={a.id} onClick={handleSelect}>
                    <Flex
                      p="10px"
                      borderRadius="12px"
                      align="center"
                      justify="space-between"
                      _hover={{ bg: bgHover }}
                      transition="0.2s"
                    >
                      <Box>
                        <Text fontSize="13.5px" fontWeight="700" color={textColor} noOfLines={1}>
                          {a.title}
                        </Text>
                        <Text fontSize="11px" color={textColorSecondary}>
                          {a.category} • {a.views}x dibaca
                        </Text>
                      </Box>
                      <Icon as={MdChevronRight} color="gray.400" />
                    </Flex>
                  </Link>
                ))}
              </VStack>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
