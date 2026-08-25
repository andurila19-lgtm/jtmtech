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
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import ImageUpload from 'components/imageUpload/ImageUpload';
import { useState } from 'react';
import { MdPhotoLibrary, MdAdd, MdCheckCircle, MdDelete } from 'react-icons/md';
import { initialGallery } from 'services/mockData';
import { GalleryItem } from 'types/workshop';

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'WORKSHOP_ACTIVITY' | 'MODIFICATION' | 'DYNO_TUNING' | 'RESTORATION'>('MODIFICATION');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');

  const handleOpenCreate = () => {
    setTitle('');
    setCategory('MODIFICATION');
    setImageUrl('');
    setDescription('');
    onOpen();
  };

  const handleSavePhoto = () => {
    if (!title.trim()) {
      toast({
        title: 'Judul Foto Wajib Diisi',
        status: 'error',
        duration: 3000,
        position: 'top-right',
      });
      return;
    }

    if (!imageUrl) {
      toast({
        title: 'Foto Wajib Diunggah',
        description: 'Silakan pilih berkas foto dari komputer terlebih dahulu.',
        status: 'warning',
        duration: 3000,
        position: 'top-right',
      });
      return;
    }

    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title,
      category,
      imageUrl,
      description,
      date: new Date().toISOString().slice(0, 10),
    };

    setGallery([newItem, ...gallery]);
    toast({
      title: 'Foto Dokumentasi Ditambahkan',
      status: 'success',
      duration: 3000,
      position: 'top-right',
    });
    onClose();
  };

  const handleDelete = (id: string) => {
    setGallery(gallery.filter((g) => g.id !== id));
    toast({
      title: 'Foto Galeri Dihapus',
      status: 'info',
      duration: 2000,
    });
  };

  return (
    <Box pt={{ base: '10px', md: '70px', xl: '70px' }} pb="30px">
      <Flex justify="space-between" align="center" mb="16px" flexWrap="wrap" gap="10px">
        <Box>
          <HStack spacing="8px">
            <Icon as={MdPhotoLibrary} color="brand.500" w="24px" h="24px" />
            <Text fontSize="22px" fontWeight="800" color={textColor}>
              Galeri Foto Dokumentasi
            </Text>
            <Badge colorScheme="purple" borderRadius="full">
              {gallery.length} Foto
            </Badge>
          </HStack>
          <Text fontSize="13px" color={textColorSecondary}>
            Galeri aktivitas bengkel, turun mesin, dyno tuning, & modifikasi pelanggan.
          </Text>
        </Box>

        <Button
          colorScheme="purple"
          leftIcon={<MdAdd />}
          borderRadius="12px"
          w={{ base: '100%', sm: 'auto' }}
          h="44px"
          onClick={handleOpenCreate}
        >
          + Unggah Foto Baru
        </Button>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="16px">
        {gallery.map((item) => (
          <Card key={item.id} p="14px" display="flex" flexDirection="column" justifyContent="space-between">
            <Box>
              <Image
                src={item.imageUrl}
                alt={item.title}
                w="100%"
                h={{ base: '180px', md: '200px' }}
                objectFit="cover"
                borderRadius="12px"
                mb="12px"
              />
              <Badge colorScheme="purple" fontSize="10px" mb="4px" w="max-content">
                {item.category}
              </Badge>
              <Text fontSize="14.5px" fontWeight="700" color={textColor} mb="4px">
                {item.title}
              </Text>
              <Text fontSize="12px" color={textColorSecondary} noOfLines={2}>
                {item.description}
              </Text>
            </Box>

            <Flex justify="space-between" align="center" mt="12px" pt="8px" borderTop="1px solid" borderColor={borderColor}>
              <Text fontSize="11px" color="gray.400">
                📅 {item.date}
              </Text>
              <Button size="sm" colorScheme="red" variant="ghost" h="36px" onClick={() => handleDelete(item.id)}>
                Hapus
              </Button>
            </Flex>
          </Card>
        ))}
      </SimpleGrid>

      {/* Modal Add Photo */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: 'full', md: 'md' }}>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('white', 'navy.800')}>
          <ModalHeader>Unggah Foto Dokumentasi Bengkel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="14px" align="stretch">
              <FormControl isRequired>
                <FormLabel fontSize="12.5px">Judul Aktivitas / Pengerjaan</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Dyno Test Yamaha R25 ECU Racing"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="12.5px">Kategori Dokumentasi</FormLabel>
                <Select value={category} onChange={(e) => setCategory(e.target.value as any)}>
                  <option value="MODIFICATION">Modifikasi & Tune Up</option>
                  <option value="WORKSHOP_ACTIVITY">Aktivitas Servis Bengkel</option>
                  <option value="DYNO_TUNING">Dyno Tuning Test</option>
                  <option value="RESTORATION">Restorasi Motor</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <ImageUpload
                  label="Pilih Berkas Foto"
                  helperText="Format JPG, PNG, WEBP hingga 5MB."
                  value={imageUrl}
                  onChange={(url) => setImageUrl(url)}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="12.5px">Keterangan Singkat</FormLabel>
                <Textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Rincian hasil dyno atau part yang dipasang..."
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="purple" onClick={handleSavePhoto} leftIcon={<MdCheckCircle />}>
              Simpan ke Galeri
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

