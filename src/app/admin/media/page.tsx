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
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import ImageUpload from 'components/imageUpload/ImageUpload';
import { useState } from 'react';
import { MdPermMedia, MdUpload, MdSearch, MdContentCopy, MdDelete, MdCheckCircle } from 'react-icons/md';
import { initialMedia } from 'services/mockData';
import { MediaFile } from 'types/workshop';

export default function MediaPage() {
  const [mediaList, setMediaList] = useState<MediaFile[]>(initialMedia);
  const [search, setSearch] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('ALL');

  // Upload modal state
  const [fileName, setFileName] = useState('');
  const [fileFolder, setFileFolder] = useState<'products' | 'services' | 'banners' | 'articles' | 'payments' | 'gallery'>('products');
  const [uploadedUrl, setUploadedUrl] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const inputBg = useColorModeValue('secondaryGray.300', 'navy.900');

  const filtered = mediaList.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchesFolder = selectedFolder === 'ALL' || m.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const handleOpenUpload = () => {
    setFileName('');
    setFileFolder('products');
    setUploadedUrl('');
    onOpen();
  };

  const handleSaveMedia = () => {
    if (!uploadedUrl) {
      toast({
        title: 'Gambar Belum Dipilih',
        description: 'Silakan pilih atau seret berkas gambar terlebih dahulu.',
        status: 'warning',
        duration: 3000,
        position: 'top-right',
      });
      return;
    }

    const newMedia: MediaFile = {
      id: `media-${Date.now()}`,
      name: fileName.trim() || `image-${Date.now()}.webp`,
      url: uploadedUrl,
      folder: fileFolder,
      mimeType: 'image/webp',
      sizeBytes: 156000,
      dimensions: '1200x800',
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setMediaList([newMedia, ...mediaList]);
    toast({
      title: 'Berkas Berhasil Diunggah',
      description: `Disimpan ke direktori /${fileFolder}`,
      status: 'success',
      duration: 3000,
      position: 'top-right',
    });
    onClose();
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'URL Disalin ke Clipboard',
      description: url.slice(0, 45) + '...',
      status: 'success',
      duration: 2000,
      position: 'top-right',
    });
  };

  const handleDelete = (id: string) => {
    setMediaList(mediaList.filter((m) => m.id !== id));
    toast({
      title: 'Media Dihapus',
      status: 'info',
      duration: 2000,
    });
  };

  return (
    <Box pt={{ base: '10px', md: '70px', xl: '70px' }} pb="30px">
      <Flex justify="space-between" align="center" mb="16px" flexWrap="wrap" gap="10px">
        <Box>
          <HStack spacing="8px">
            <Icon as={MdPermMedia} color="brand.500" w="24px" h="24px" />
            <Text fontSize="22px" fontWeight="800" color={textColor}>
              Pustaka Media & Gambar
            </Text>
            <Badge colorScheme="purple" borderRadius="full">
              {mediaList.length} Berkas
            </Badge>
          </HStack>
          <Text fontSize="13px" color={textColorSecondary}>
            Pusat penyimpanan media suku cadang, banner, paket servis, & bukti transfer.
          </Text>
        </Box>

        <Button
          colorScheme="purple"
          leftIcon={<MdUpload />}
          borderRadius="12px"
          w={{ base: '100%', sm: 'auto' }}
          h="44px"
          onClick={handleOpenUpload}
        >
          + Unggah Gambar Baru
        </Button>
      </Flex>

      <Card p="16px" mb="16px">
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="12px">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={MdSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Cari nama file media..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              bg={inputBg}
              borderRadius="12px"
            />
          </InputGroup>

          <Select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            bg={inputBg}
            borderRadius="12px"
          >
            <option value="ALL">Semua Direktori Media</option>
            <option value="products">Direktori Produk / Suku Cadang</option>
            <option value="services">Direktori Layanan Servis</option>
            <option value="banners">Direktori Banner Promo</option>
            <option value="articles">Direktori Artikel Blog</option>
            <option value="payments">Direktori Bukti Transfer</option>
            <option value="gallery">Direktori Galeri Foto</option>
          </Select>
        </SimpleGrid>
      </Card>

      <SimpleGrid columns={{ base: 1, md: 3, xl: 4 }} gap="20px">
        {filtered.map((m) => (
          <Card key={m.id} p="14px" display="flex" flexDirection="column" justifyContent="space-between">
            <Box>
              <Image
                src={m.url}
                alt={m.name}
                w="100%"
                h="160px"
                objectFit="cover"
                borderRadius="10px"
                mb="10px"
                bg="#f5f5f5"
              />
              <Badge colorScheme="purple" fontSize="10px" mb="4px">
                /{m.folder}
              </Badge>
              <Text fontSize="13px" fontWeight="700" color={textColor} noOfLines={1}>
                {m.name}
              </Text>
              <Text fontSize="11px" color="gray.400">
                {(m.sizeBytes / 1024).toFixed(0)} KB | {m.dimensions || 'Image'}
              </Text>
            </Box>

            <HStack spacing="6px" mt="12px" pt="10px" borderTop="1px solid" borderColor={borderColor}>
              <Button
                size="xs"
                variant="outline"
                leftIcon={<MdContentCopy />}
                w="50%"
                onClick={() => handleCopyUrl(m.url)}
              >
                Salin URL
              </Button>
              <Button
                size="xs"
                colorScheme="red"
                variant="ghost"
                leftIcon={<MdDelete />}
                w="50%"
                onClick={() => handleDelete(m.id)}
              >
                Hapus
              </Button>
            </HStack>
          </Card>
        ))}
      </SimpleGrid>

      {/* Modal Upload Media */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: 'full', md: 'md' }}>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('white', 'navy.800')}>
          <ModalHeader>Unggah Berkas Gambar Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="14px" align="stretch">
              <FormControl isRequired>
                <FormLabel fontSize="12.5px">Nama Berkas</FormLabel>
                <Input
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="e.g. motul-7100-synthetic.png"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="12.5px">Pilih Direktori Penyimpanan</FormLabel>
                <Select
                  value={fileFolder}
                  onChange={(e) => setFileFolder(e.target.value as any)}
                >
                  <option value="products">Folder Products (Suku Cadang)</option>
                  <option value="services">Folder Services (Layanan Servis)</option>
                  <option value="banners">Folder Banners (Banner Promosi)</option>
                  <option value="articles">Folder Articles (Artikel Blog)</option>
                  <option value="payments">Folder Payments (Bukti Pembayaran)</option>
                  <option value="gallery">Folder Gallery (Galeri Foto)</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <ImageUpload
                  label="Pilih Berkas Gambar dari Komputer"
                  helperText="Format JPG, PNG, WEBP hingga 5MB."
                  value={uploadedUrl}
                  onChange={(url) => setUploadedUrl(url)}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="purple" onClick={handleSaveMedia} leftIcon={<MdCheckCircle />}>
              Simpan ke Pustaka Media
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

