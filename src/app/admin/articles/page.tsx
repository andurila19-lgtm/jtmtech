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
  Image,
  Input,
  Select,
  SimpleGrid,
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
import ImageUpload from 'components/imageUpload/ImageUpload';
import { useState } from 'react';
import { MdArticle, MdAdd, MdEdit, MdDelete, MdCheckCircle, MdVisibility } from 'react-icons/md';
import { initialArticles } from 'services/mockData';
import { Article } from 'types/workshop';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Tips Perawatan Motor');
  const [thumbnail, setThumbnail] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Ahmad Fauzi');
  const [status, setStatus] = useState<'PUBLISHED' | 'DRAFT'>('PUBLISHED');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const hoverBg = useColorModeValue('gray.50', 'whiteAlpha.50');
  const cardBg = useColorModeValue('gray.50', 'navy.700');

  const handleOpenCreate = () => {
    setEditingArticle(null);
    setTitle('');
    setCategory('Tips Perawatan Motor');
    setThumbnail('https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&auto=format&fit=crop&q=80');
    setExcerpt('');
    setContent('');
    setAuthor('Ahmad Fauzi');
    setStatus('PUBLISHED');
    onOpen();
  };

  const handleOpenEdit = (a: Article) => {
    setEditingArticle(a);
    setTitle(a.title);
    setCategory(a.category);
    setThumbnail(a.thumbnail);
    setExcerpt(a.excerpt);
    setContent(a.content);
    setAuthor(a.author);
    setStatus(a.status as any);
    onOpen();
  };

  const handleSave = () => {
    if (!title.trim()) return;

    if (editingArticle) {
      setArticles(
        articles.map((a) =>
          a.id === editingArticle.id
            ? { ...a, title, category, thumbnail, excerpt, content, author, status }
            : a,
        ),
      );
      toast({
        title: 'Artikel Diperbarui',
        status: 'success',
        duration: 3000,
        position: 'top-right',
      });
    } else {
      const newArt: Article = {
        id: `art-${Date.now()}`,
        title,
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        category,
        thumbnail,
        excerpt,
        content,
        author,
        views: 0,
        status,
        publishedAt: new Date().toISOString().slice(0, 10),
      };
      setArticles([...articles, newArt]);
      toast({
        title: 'Artikel Baru Dipublikasikan',
        status: 'success',
        duration: 3000,
        position: 'top-right',
      });
    }
    onClose();
  };

  const handleDelete = (id: string, artTitle: string) => {
    setArticles(articles.filter((a) => a.id !== id));
    toast({
      title: 'Artikel Dihapus',
      description: `${artTitle} telah dihapus.`,
      status: 'info',
      duration: 3000,
      position: 'top-right',
    });
  };

  return (
    <Box pt={{ base: '10px', md: '70px', xl: '70px' }} pb="30px">
      <Flex justify="space-between" align="center" mb="16px" flexWrap="wrap" gap="10px">
        <Box>
          <HStack spacing="8px">
            <Icon as={MdArticle} color="brand.500" w="24px" h="24px" />
            <Text fontSize="22px" fontWeight="800" color={textColor}>
              Artikel & Berita Blog
            </Text>
            <Badge colorScheme="purple" borderRadius="full">
              {articles.length} Artikel
            </Badge>
          </HStack>
          <Text fontSize="13px" color={textColorSecondary}>
            Publikasi tips otomotif, edukasi perawatan motor, & konten SEO blog.
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
          + Tulis Artikel Baru
        </Button>
      </Flex>

      <Card p={{ base: '14px', md: '20px' }}>
        {/* MOBILE CARD VIEW (< md) */}
        <Box display={{ base: 'block', md: 'none' }}>
          <VStack spacing="12px" align="stretch">
            {articles.map((a) => (
              <Box
                key={a.id}
                p="14px"
                borderRadius="14px"
                bg={cardBg}
                border="1px solid"
                borderColor={borderColor}
              >
                <HStack spacing="12px" align="flex-start" mb="8px">
                  <Image
                    src={a.thumbnail}
                    alt={a.title}
                    w="70px"
                    h="70px"
                    borderRadius="10px"
                    objectFit="cover"
                    flexShrink={0}
                  />
                  <Box flex="1">
                    <Flex justify="space-between" align="flex-start" mb="4px">
                      <Badge colorScheme="purple" fontSize="9.5px">
                        {a.category}
                      </Badge>
                      <Badge colorScheme={a.status === 'PUBLISHED' ? 'green' : 'gray'} fontSize="9.5px">
                        {a.status === 'PUBLISHED' ? 'TERBIT' : 'DRAFT'}
                      </Badge>
                    </Flex>
                    <Text fontSize="13px" fontWeight="700" color={textColor} noOfLines={2}>
                      {a.title}
                    </Text>
                  </Box>
                </HStack>

                <Flex justify="space-between" align="center" pt="8px" borderTop="1px solid" borderColor={borderColor}>
                  <HStack spacing="4px" fontSize="11.5px" color="gray.400">
                    <Icon as={MdVisibility} />
                    <Text>{a.views.toLocaleString('id-ID')} views</Text>
                  </HStack>
                  <HStack spacing="6px">
                    <Button
                      size="sm"
                      variant="outline"
                      colorScheme="purple"
                      leftIcon={<MdEdit />}
                      h="36px"
                      onClick={() => handleOpenEdit(a)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      leftIcon={<MdDelete />}
                      h="36px"
                      onClick={() => handleDelete(a.id, a.title)}
                    >
                      Hapus
                    </Button>
                  </HStack>
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
                <Th borderColor={borderColor} color="gray.400">THUMBNAIL & JUDUL</Th>
                <Th borderColor={borderColor} color="gray.400">KATEGORI</Th>
                <Th borderColor={borderColor} color="gray.400">PENULIS</Th>
                <Th borderColor={borderColor} color="gray.400">DIBACA (VIEWS)</Th>
                <Th borderColor={borderColor} color="gray.400">TANGGAL TERBIT</Th>
                <Th borderColor={borderColor} color="gray.400">STATUS</Th>
                <Th borderColor={borderColor} color="gray.400" textAlign="right">TINDAKAN</Th>
              </Tr>
            </Thead>
            <Tbody>
              {articles.map((a) => (
                <Tr key={a.id} _hover={{ bg: hoverBg }}>
                  <Td borderColor={borderColor}>
                    <HStack spacing="12px">
                      <Image
                        src={a.thumbnail}
                        alt={a.title}
                        w="48px"
                        h="48px"
                        borderRadius="8px"
                        objectFit="cover"
                      />
                      <Box maxW="300px">
                        <Text color={textColor} fontSize="13px" fontWeight="700" noOfLines={2}>
                          {a.title}
                        </Text>
                      </Box>
                    </HStack>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Badge colorScheme="purple" fontSize="11px">{a.category}</Badge>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text fontSize="12.5px" color={textColor} fontWeight="600">
                      {a.author}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <HStack spacing="4px" fontSize="12px" color="gray.500">
                      <Icon as={MdVisibility} />
                      <Text>{a.views.toLocaleString('id-ID')}x</Text>
                    </HStack>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text fontSize="12px" color={textColorSecondary}>
                      {a.publishedAt}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Badge colorScheme={a.status === 'PUBLISHED' ? 'green' : 'gray'}>
                      {a.status === 'PUBLISHED' ? 'TERBIT' : 'DRAFT'}
                    </Badge>
                  </Td>
                  <Td borderColor={borderColor} textAlign="right">
                    <HStack spacing="6px" justify="flex-end">
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => handleOpenEdit(a)}
                        colorScheme="purple"
                      >
                        <Icon as={MdEdit} />
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleDelete(a.id, a.title)}
                      >
                        <Icon as={MdDelete} />
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Card>

      {/* Article Drawer */}
      <Drawer isOpen={isOpen} placement="right" size={{ base: 'full', md: 'lg' }} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue('white', 'navy.800')}>
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px solid" borderColor={borderColor}>
            {editingArticle ? 'Edit Artikel Blog' : 'Tulis Artikel Blog Baru'}
          </DrawerHeader>

          <DrawerBody py="20px">
            <VStack spacing="16px" align="stretch">
              <FormControl isRequired>
                <FormLabel fontSize="12.5px">Judul Artikel</FormLabel>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </FormControl>

              <SimpleGrid columns={2} gap="12px">
                <FormControl>
                  <FormLabel fontSize="12.5px">Kategori</FormLabel>
                  <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Tips Perawatan Motor">Tips Perawatan Motor</option>
                    <option value="Modifikasi & Performa">Modifikasi & Performa</option>
                    <option value="Panduan Sparepart">Panduan Sparepart</option>
                    <option value="Event & Promo">Event & Promo</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="12.5px">Penulis / Author</FormLabel>
                  <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <ImageUpload
                  label="Thumbnail Foto Cover Artikel"
                  helperText="Format JPG, PNG, WEBP hingga 5MB. Rasio 16:9 disarankan."
                  value={thumbnail}
                  onChange={(url) => setThumbnail(url)}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="12.5px">Ringkasan / Excerpt</FormLabel>
                <Textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Ringkasan singkat 1-2 kalimat untuk preview card..."
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="12.5px">Isi Konten Artikel</FormLabel>
                <Textarea
                  rows={8}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tuliskan isi artikel lengkap..."
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="12.5px">Status</FormLabel>
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
              Simpan & Terbitkan
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
