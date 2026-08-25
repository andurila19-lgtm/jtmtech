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
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import ImageUpload from 'components/imageUpload/ImageUpload';
import { useState } from 'react';
import { MdViewCarousel, MdAdd, MdDelete, MdCheckCircle } from 'react-icons/md';
import { initialBanners } from 'services/mockData';
import { Banner } from 'types/workshop';

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('/promotions');
  const [position, setPosition] = useState<'HERO_SLIDER' | 'PROMO_BAR' | 'POPUP' | 'FOOTER'>('HERO_SLIDER');
  const [status, setStatus] = useState<'ACTIVE' | 'INACTIVE'>('ACTIVE');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');

  const handleOpenCreate = () => {
    setTitle('');
    setSubtitle('');
    setImageUrl('');
    setLinkUrl('/promotions');
    setPosition('HERO_SLIDER');
    setStatus('ACTIVE');
    onOpen();
  };

  const handleSaveBanner = () => {
    if (!title.trim()) {
      toast({
        title: 'Judul Banner Wajib Diisi',
        status: 'error',
        duration: 3000,
        position: 'top-right',
      });
      return;
    }

    if (!imageUrl) {
      toast({
        title: 'Gambar Banner Wajib Diunggah',
        description: 'Silakan pilih atau unggah foto banner terlebih dahulu.',
        status: 'warning',
        duration: 3000,
        position: 'top-right',
      });
      return;
    }

    const newBanner: Banner = {
      id: `banner-${Date.now()}`,
      title,
      subtitle,
      imageUrl,
      linkUrl,
      target: '_self',
      position,
      status,
      order: banners.length + 1,
    };

    setBanners([newBanner, ...banners]);
    toast({
      title: 'Banner Baru Berhasil Ditambahkan',
      status: 'success',
      duration: 3000,
      position: 'top-right',
    });
    onClose();
  };

  const handleDelete = (id: string) => {
    setBanners(banners.filter((b) => b.id !== id));
    toast({
      title: 'Banner Dihapus',
      status: 'info',
      duration: 2500,
    });
  };

  return (
    <Box pt={{ base: '10px', md: '70px', xl: '70px' }} pb="30px">
      <Flex justify="space-between" align="center" mb="16px" flexWrap="wrap" gap="10px">
        <Box>
          <HStack spacing="8px">
            <Icon as={MdViewCarousel} color="brand.500" w="24px" h="24px" />
            <Text fontSize="22px" fontWeight="800" color={textColor}>
              Banner Promosi & Slider
            </Text>
            <Badge colorScheme="purple" borderRadius="full">
              {banners.length} Banner
            </Badge>
          </HStack>
          <Text fontSize="13px" color={textColorSecondary}>
            Kelola slider promo beranda, banner event, & CTA link diskon website.
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
          + Tambah Banner Baru
        </Button>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap="16px">
        {banners.map((b) => (
          <Card key={b.id} p="16px">
            <Image
              src={b.imageUrl}
              alt={b.title}
              w="100%"
              h={{ base: '150px', md: '180px' }}
              objectFit="cover"
              borderRadius="12px"
              mb="12px"
            />
            <Flex justify="space-between" align="flex-start" mb="6px">
              <Badge colorScheme="purple">{b.position}</Badge>
              <Badge colorScheme={b.status === 'ACTIVE' ? 'green' : 'gray'}>
                {b.status === 'ACTIVE' ? 'AKTIF' : 'NONAKTIF'}
              </Badge>
            </Flex>
            <Text fontSize="15px" fontWeight="800" color={textColor} mb="4px">
              {b.title}
            </Text>
            <Text fontSize="12px" color={textColorSecondary} mb="12px">
              {b.subtitle}
            </Text>
            <Flex justify="space-between" align="center" pt="8px" borderTop="1px solid" borderColor={borderColor}>
              <Text fontSize="11px" color="gray.400" noOfLines={1} maxW="70%">
                Tautan: {b.linkUrl || '-'}
              </Text>
              <Button size="sm" colorScheme="red" variant="ghost" h="36px" onClick={() => handleDelete(b.id)}>
                Hapus
              </Button>
            </Flex>
          </Card>
        ))}
      </SimpleGrid>

      {/* Modal Add Banner */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: 'full', md: 'lg' }}>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('white', 'navy.800')}>
          <ModalHeader>Tambah Banner Promosi Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="14px" align="stretch">
              <FormControl isRequired>
                <FormLabel fontSize="12.5px">Judul Banner Promosi</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Diskon Spesial Paket Service CVT Merdeka"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="12.5px">Subjudul / Keterangan Singkat</FormLabel>
                <Input
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Dapatkan potongan harga hingga 20% khusus bulan ini"
                />
              </FormControl>

              <FormControl isRequired>
                <ImageUpload
                  label="Unggah File Gambar Banner"
                  helperText="Format JPG, PNG, WEBP hingga 5MB. Rasio landscape (16:9 / 21:9) disarankan."
                  value={imageUrl}
                  onChange={(url) => setImageUrl(url)}
                />
              </FormControl>

              <SimpleGrid columns={{ base: 1, md: 2 }} gap="12px">
                <FormControl>
                  <FormLabel fontSize="12.5px">Posisi Tampilan</FormLabel>
                  <Select value={position} onChange={(e) => setPosition(e.target.value as any)}>
                    <option value="HERO_SLIDER">Slider Utama Beranda</option>
                    <option value="PROMO_BAR">Banner Promo Toko</option>
                    <option value="POPUP">Popup Pengumuman</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="12.5px">Tautan Arah (Link)</FormLabel>
                  <Input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
                </FormControl>
              </SimpleGrid>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="purple" onClick={handleSaveBanner} leftIcon={<MdCheckCircle />}>
              Simpan Banner
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

