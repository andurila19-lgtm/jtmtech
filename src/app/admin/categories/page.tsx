'use client';

import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
import { useState } from 'react';
import { MdCategory, MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import { initialCategories } from 'services/mockData';
import { Category } from 'types/workshop';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'PRODUCT' | 'SERVICE'>('PRODUCT');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const hoverBg = useColorModeValue('gray.50', 'whiteAlpha.50');
  const cardBg = useColorModeValue('gray.50', 'navy.700');

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setType('PRODUCT');
    onOpen();
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setType(cat.type);
    onOpen();
  };

  const handleSave = () => {
    if (!name.trim()) {
      toast({
        title: 'Nama Kategori Wajib Diisi',
        status: 'error',
        duration: 3000,
        position: 'top-right',
      });
      return;
    }

    if (editingCategory) {
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name, slug: slug || name.toLowerCase().replace(/\s+/g, '-'), description, type }
            : c,
        ),
      );
      toast({
        title: 'Kategori Diperbarui',
        status: 'success',
        duration: 3000,
        position: 'top-right',
      });
    } else {
      const newCat: Category = {
        id: `cat-${Date.now()}`,
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
        description,
        itemCount: 0,
        type,
      };
      setCategories([...categories, newCat]);
      toast({
        title: 'Kategori Baru Ditambahkan',
        status: 'success',
        duration: 3000,
        position: 'top-right',
      });
    }
    onClose();
  };

  const handleDelete = (id: string, catName: string) => {
    setCategories(categories.filter((c) => c.id !== id));
    toast({
      title: 'Kategori Dihapus',
      description: `${catName} telah dihapus.`,
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
            <Icon as={MdCategory} color="brand.500" w="24px" h="24px" />
            <Text fontSize="22px" fontWeight="800" color={textColor}>
              Kategori Produk & Servis
            </Text>
            <Badge colorScheme="purple" borderRadius="full">
              {categories.length} Kategori
            </Badge>
          </HStack>
          <Text fontSize="13px" color={textColorSecondary}>
            Pengelompokan etalase suku cadang dan jenis paket perawatan bengkel.
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
          + Tambah Kategori
        </Button>
      </Flex>

      <Card p={{ base: '14px', md: '20px' }}>
        {/* MOBILE CARD VIEW (< md) */}
        <Box display={{ base: 'block', md: 'none' }}>
          <VStack spacing="12px" align="stretch">
            {categories.map((c) => (
              <Box
                key={c.id}
                p="14px"
                borderRadius="14px"
                bg={cardBg}
                border="1px solid"
                borderColor={borderColor}
              >
                <Flex justify="space-between" align="flex-start" mb="6px">
                  <Box>
                    <Text fontSize="14px" fontWeight="700" color={textColor}>
                      {c.name}
                    </Text>
                    <Text fontSize="11px" color="brand.500">
                      /{c.slug}
                    </Text>
                  </Box>
                  <Badge colorScheme={c.type === 'PRODUCT' ? 'blue' : 'green'} fontSize="10px">
                    {c.type === 'PRODUCT' ? 'PRODUK' : 'SERVIS'}
                  </Badge>
                </Flex>

                <Text fontSize="12px" color={textColorSecondary} mb="8px">
                  {c.description || 'Tanpa keterangan'}
                </Text>

                <Flex justify="space-between" align="center" pt="8px" borderTop="1px solid" borderColor={borderColor}>
                  <Text fontSize="12px" fontWeight="700" color={textColor}>
                    {c.itemCount} Item Terkait
                  </Text>
                  <HStack spacing="6px">
                    <Button
                      size="sm"
                      variant="outline"
                      colorScheme="purple"
                      leftIcon={<MdEdit />}
                      h="36px"
                      onClick={() => handleOpenEdit(c)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      leftIcon={<MdDelete />}
                      h="36px"
                      onClick={() => handleDelete(c.id, c.name)}
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
                <Th borderColor={borderColor} color="gray.400">NAMA KATEGORI</Th>
                <Th borderColor={borderColor} color="gray.400">SLUG URL</Th>
                <Th borderColor={borderColor} color="gray.400">TIPE KATEGORI</Th>
                <Th borderColor={borderColor} color="gray.400">DESKRIPSI</Th>
                <Th borderColor={borderColor} color="gray.400">JUMLAH ITEM</Th>
                <Th borderColor={borderColor} color="gray.400" textAlign="right">TINDAKAN</Th>
              </Tr>
            </Thead>
            <Tbody>
              {categories.map((c) => (
                <Tr key={c.id} _hover={{ bg: hoverBg }}>
                  <Td borderColor={borderColor}>
                    <Text color={textColor} fontSize="13.5px" fontWeight="700">
                      {c.name}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text fontSize="12px" color="brand.500">
                      /{c.slug}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Badge colorScheme={c.type === 'PRODUCT' ? 'blue' : 'green'}>
                      {c.type === 'PRODUCT' ? 'PRODUK / PART' : 'LAYANAN SERVIS'}
                    </Badge>
                  </Td>
                  <Td borderColor={borderColor} maxW="280px">
                    <Text fontSize="12px" color={textColorSecondary} noOfLines={2}>
                      {c.description || '-'}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text fontSize="13px" fontWeight="700" color={textColor}>
                      {c.itemCount} Item
                    </Text>
                  </Td>
                  <Td borderColor={borderColor} textAlign="right">
                    <HStack spacing="6px" justify="flex-end">
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => handleOpenEdit(c)}
                        colorScheme="purple"
                      >
                        <Icon as={MdEdit} />
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleDelete(c.id, c.name)}
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

      {/* Modal Add / Edit */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: 'full', md: 'md' }}>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('white', 'navy.800')}>
          <ModalHeader>
            {editingCategory ? 'Edit Kategori' : 'Tambah Kategori Baru'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="14px" align="stretch">
              <FormControl isRequired>
                <FormLabel fontSize="12.5px">Nama Kategori</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!editingCategory) {
                      setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                    }
                  }}
                  placeholder="e.g. Sparepart CVT Matic"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="12.5px">Slug URL</FormLabel>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="12.5px">Tipe Kategori</FormLabel>
                <Select value={type} onChange={(e) => setType(e.target.value as any)}>
                  <option value="PRODUCT">PRODUCT (Toko Suku Cadang)</option>
                  <option value="SERVICE">SERVICE (Paket Servis Bengkel)</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel fontSize="12.5px">Deskripsi Singkat</FormLabel>
                <Textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="purple" onClick={handleSave}>
              Simpan Kategori
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
