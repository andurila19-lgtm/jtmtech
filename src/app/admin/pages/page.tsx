'use client';

import {
  Badge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { useState } from 'react';
import { MdDescription, MdAdd, MdEdit, MdCheckCircle } from 'react-icons/md';
import { initialCMSPages } from 'services/mockData';
import { CMSPage } from 'types/workshop';

export default function PagesCMSPage() {
  const [pages, setPages] = useState<CMSPage[]>(initialCMSPages);
  const [editingPage, setEditingPage] = useState<CMSPage | null>(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [status, setStatus] = useState<'PUBLISHED' | 'DRAFT'>('PUBLISHED');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const hoverBg = useColorModeValue('gray.50', 'whiteAlpha.50');
  const cardBg = useColorModeValue('gray.50', 'navy.700');

  const handleOpenEdit = (p: CMSPage) => {
    setEditingPage(p);
    setTitle(p.title);
    setSlug(p.slug);
    setContent(p.content);
    setMetaTitle(p.metaTitle);
    setMetaDescription(p.metaDescription);
    setStatus(p.status);
    onOpen();
  };

  const handleOpenCreate = () => {
    setEditingPage(null);
    setTitle('');
    setSlug('');
    setContent('');
    setMetaTitle('');
    setMetaDescription('');
    setStatus('PUBLISHED');
    onOpen();
  };

  const handleSave = () => {
    if (!title.trim()) return;

    if (editingPage) {
      setPages(
        pages.map((p) =>
          p.id === editingPage.id
            ? {
                ...p,
                title,
                slug,
                content,
                metaTitle,
                metaDescription,
                status,
                updatedAt: new Date().toISOString().slice(0, 10),
              }
            : p,
        ),
      );
      toast({
        title: 'Halaman Berhasil Disimpan',
        status: 'success',
        duration: 3000,
        position: 'top-right',
      });
    } else {
      const newP: CMSPage = {
        id: `page-${Date.now()}`,
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
        content,
        metaTitle,
        metaDescription,
        status,
        updatedAt: new Date().toISOString().slice(0, 10),
      };
      setPages([...pages, newP]);
      toast({
        title: 'Halaman Baru Dibuat',
        status: 'success',
        duration: 3000,
        position: 'top-right',
      });
    }
    onClose();
  };

  return (
    <Box pt={{ base: '10px', md: '70px', xl: '70px' }} pb="30px">
      <Flex justify="space-between" align="center" mb="16px" flexWrap="wrap" gap="10px">
        <Box>
          <HStack spacing="8px">
            <Icon as={MdDescription} color="brand.500" w="24px" h="24px" />
            <Text fontSize="22px" fontWeight="800" color={textColor}>
              Halaman Statis CMS
            </Text>
            <Badge colorScheme="purple" borderRadius="full">
              {pages.length} Halaman
            </Badge>
          </HStack>
          <Text fontSize="13px" color={textColorSecondary}>
            Kelola konten statis website bengkel & konfigurasi SEO Meta Tag.
          </Text>
        </Box>

        <Button
          colorScheme="purple"
          leftIcon={<MdAdd />}
          onClick={handleOpenCreate}
          borderRadius="12px"
          w={{ base: '100%', sm: 'auto' }}
          h="44px"
        >
          + Tambah Halaman Baru
        </Button>
      </Flex>

      <Card p={{ base: '14px', md: '20px' }}>
        {/* MOBILE CARD VIEW (< md) */}
        <Box display={{ base: 'block', md: 'none' }}>
          <VStack spacing="12px" align="stretch">
            {pages.map((p) => (
              <Box
                key={p.id}
                p="14px"
                borderRadius="14px"
                bg={cardBg}
                border="1px solid"
                borderColor={borderColor}
              >
                <Flex justify="space-between" align="flex-start" mb="4px">
                  <Box>
                    <Text fontSize="14px" fontWeight="700" color={textColor}>
                      {p.title}
                    </Text>
                    <Text fontSize="11px" color="brand.500">
                      /{p.slug}
                    </Text>
                  </Box>
                  <Badge colorScheme={p.status === 'PUBLISHED' ? 'green' : 'yellow'} fontSize="9.5px">
                    {p.status === 'PUBLISHED' ? 'TERBIT' : 'DRAFT'}
                  </Badge>
                </Flex>

                <Text fontSize="12px" color={textColorSecondary} noOfLines={1} my="4px">
                  SEO: {p.metaTitle || 'Default SEO'}
                </Text>

                <Flex justify="space-between" align="center" pt="8px" borderTop="1px solid" borderColor={borderColor}>
                  <Text fontSize="11px" color="gray.400">
                    Diupdate: {p.updatedAt}
                  </Text>
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="purple"
                    leftIcon={<MdEdit />}
                    h="36px"
                    onClick={() => handleOpenEdit(p)}
                  >
                    Edit Konten
                  </Button>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* DESKTOP TABLE VIEW (>= md) */}
        <Box display={{ base: 'none', md: 'block' }} overflowX="auto">
          <Table variant="simple" color="gray.500">
            <Thead>
              <Tr>
                <Th borderColor={borderColor} color="gray.400">JUDUL HALAMAN</Th>
                <Th borderColor={borderColor} color="gray.400">SLUG URL</Th>
                <Th borderColor={borderColor} color="gray.400">SEO META TITLE</Th>
                <Th borderColor={borderColor} color="gray.400">STATUS PUBLIKASI</Th>
                <Th borderColor={borderColor} color="gray.400">TERAKHIR DIUBAH</Th>
                <Th borderColor={borderColor} color="gray.400" textAlign="right">TINDAKAN</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pages.map((p) => (
                <Tr key={p.id} _hover={{ bg: hoverBg }}>
                  <Td borderColor={borderColor}>
                    <Text color={textColor} fontSize="13.5px" fontWeight="700">
                      {p.title}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text color="brand.500" fontSize="12px" fontWeight="600">
                      /{p.slug}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor} maxW="280px">
                    <Text fontSize="12px" color={textColorSecondary} noOfLines={1}>
                      {p.metaTitle}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Badge colorScheme={p.status === 'PUBLISHED' ? 'green' : 'yellow'}>
                      {p.status === 'PUBLISHED' ? 'TERBIT (PUBLISHED)' : 'DRAFT'}
                    </Badge>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text fontSize="12px" color={textColorSecondary}>
                      {p.updatedAt}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor} textAlign="right">
                    <Button
                      size="xs"
                      variant="ghost"
                      colorScheme="purple"
                      leftIcon={<MdEdit />}
                      onClick={() => handleOpenEdit(p)}
                    >
                      Edit Konten
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Card>

      {/* Editor Drawer */}
      <Drawer isOpen={isOpen} placement="right" size={{ base: 'full', md: 'lg' }} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue('white', 'navy.800')}>
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px solid" borderColor={borderColor}>
            {editingPage ? 'Edit Konten Halaman' : 'Tambah Halaman Baru'}
          </DrawerHeader>

          <DrawerBody py="20px">
            <VStack spacing="16px" align="stretch">
              <FormControl isRequired>
                <FormLabel fontSize="12.5px">Judul Halaman</FormLabel>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="12.5px">Slug URL Path</FormLabel>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="12.5px">Isi Konten (Rich Content / Markdown)</FormLabel>
                <Textarea
                  rows={8}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tuliskan konten teks, paragraf, dan struktur halaman..."
                />
              </FormControl>

              <Box p="14px" border="1px solid" borderColor={borderColor} borderRadius="12px">
                <Text fontSize="13px" fontWeight="700" color={textColor} mb="10px">
                  SEO & Search Engine Optimization
                </Text>
                <FormControl mb="10px">
                  <FormLabel fontSize="12px">Meta Title Tag</FormLabel>
                  <Input
                    size="sm"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="12px">Meta Description Tag</FormLabel>
                  <Textarea
                    size="sm"
                    rows={2}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                  />
                </FormControl>
              </Box>

              <FormControl>
                <FormLabel fontSize="12.5px">Status Publikasi</FormLabel>
                <Select value={status} onChange={(e) => setStatus(e.target.value as any)}>
                  <option value="PUBLISHED">PUBLISHED</option>
                  <option value="DRAFT">DRAFT</option>
                </Select>
              </FormControl>
            </VStack>
          </DrawerBody>

          <DrawerFooter borderTop="1px solid" borderColor={borderColor}>
            <Button variant="outline" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="purple" onClick={handleSave} leftIcon={<MdCheckCircle />}>
              Simpan Halaman
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
