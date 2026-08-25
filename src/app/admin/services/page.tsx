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
  Switch,
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
import { MdBuild, MdAdd, MdEdit, MdDelete, MdCheckCircle, MdAccessTime } from 'react-icons/md';
import { initialServices, initialCategories } from 'services/mockData';
import { ServiceItem } from 'types/workshop';

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState(initialCategories[6].name);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(50000);
  const [duration, setDuration] = useState('45 Menit');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState<'ACTIVE' | 'INACTIVE'>('ACTIVE');
  const [featured, setFeatured] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');

  const handleOpenCreate = () => {
    setEditingService(null);
    setName('');
    setCategory(initialCategories[6].name);
    setDescription('');
    setPrice(75000);
    setDuration('45 Menit');
    setImageUrl('https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&auto=format&fit=crop&q=80');
    setStatus('ACTIVE');
    setFeatured(false);
    onOpen();
  };

  const handleOpenEdit = (srv: ServiceItem) => {
    setEditingService(srv);
    setName(srv.name);
    setCategory(srv.category);
    setDescription(srv.description);
    setPrice(srv.price);
    setDuration(srv.estimatedDuration);
    setImageUrl(srv.image);
    setStatus(srv.status);
    setFeatured(srv.featured || false);
    onOpen();
  };

  const handleSaveService = () => {
    if (!name.trim()) {
      toast({
        title: 'Nama Layanan Wajib Diisi',
        status: 'error',
        duration: 3000,
        position: 'top-right',
      });
      return;
    }

    if (editingService) {
      setServices(
        services.map((s) =>
          s.id === editingService.id
            ? {
                ...s,
                name,
                category,
                description,
                price: Number(price),
                estimatedDuration: duration,
                image: imageUrl,
                status,
                featured,
              }
            : s,
        ),
      );
      toast({
        title: 'Paket Layanan Diperbarui',
        status: 'success',
        duration: 3000,
        position: 'top-right',
      });
    } else {
      const newSrv: ServiceItem = {
        id: `srv-${Date.now()}`,
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        category,
        description,
        price: Number(price),
        estimatedDuration: duration,
        image: imageUrl,
        status,
        featured,
      };
      setServices([...services, newSrv]);
      toast({
        title: 'Layanan Baru Ditambahkan',
        status: 'success',
        duration: 3000,
        position: 'top-right',
      });
    }
    onClose();
  };

  const handleDelete = (id: string, srvName: string) => {
    setServices(services.filter((s) => s.id !== id));
    toast({
      title: 'Layanan Dihapus',
      description: `${srvName} telah dinonaktifkan dari katalog bengkel.`,
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
            <Icon as={MdBuild} color="brand.500" w="24px" h="24px" />
            <Text fontSize="22px" fontWeight="800" color={textColor}>
              Layanan & Paket Servis
            </Text>
            <Badge colorScheme="purple" borderRadius="full">
              {services.length} Paket
            </Badge>
          </HStack>
          <Text fontSize="13px" color={textColorSecondary}>
            Konfigurasi paket servis berkala, tune up, bongkar CVT, & estimasi durasi mekanik.
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
          + Tambah Paket Servis
        </Button>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="16px">
        {services.map((srv) => (
          <Card key={srv.id} p="16px" display="flex" flexDirection="column" justifyContent="space-between">
            <Box>
              <Image
                src={srv.image}
                alt={srv.name}
                w="100%"
                h={{ base: '140px', md: '160px' }}
                objectFit="cover"
                borderRadius="14px"
                mb="12px"
              />
              <Flex justify="space-between" align="flex-start" mb="6px">
                <Badge colorScheme="purple" fontSize="10px">
                  {srv.category}
                </Badge>
                <Badge colorScheme={srv.status === 'ACTIVE' ? 'green' : 'gray'}>
                  {srv.status === 'ACTIVE' ? 'AKTIF' : 'NONAKTIF'}
                </Badge>
              </Flex>
              <Text fontSize="15px" fontWeight="800" color={textColor} mb="4px">
                {srv.name}
              </Text>
              <Text fontSize="12px" color={textColorSecondary} noOfLines={3} mb="12px">
                {srv.description}
              </Text>
            </Box>

            <Box borderTop="1px solid" borderColor={borderColor} pt="12px">
              <Flex justify="space-between" align="center" mb="12px">
                <Box>
                  <Text fontSize="10.5px" color="gray.400">TARIF JASA</Text>
                  <Text fontSize="16px" fontWeight="800" color="brand.500">
                    Rp {srv.price.toLocaleString('id-ID')}
                  </Text>
                </Box>
                <HStack spacing="4px" fontSize="12px" color="gray.500">
                  <Icon as={MdAccessTime} />
                  <Text>{srv.estimatedDuration}</Text>
                </HStack>
              </Flex>

              <SimpleGrid columns={2} gap="8px">
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={<MdEdit />}
                  h="38px"
                  onClick={() => handleOpenEdit(srv)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                  leftIcon={<MdDelete />}
                  h="38px"
                  onClick={() => handleDelete(srv.id, srv.name)}
                >
                  Hapus
                </Button>
              </SimpleGrid>
            </Box>
          </Card>
        ))}
      </SimpleGrid>

      {/* Add / Edit Drawer */}
      <Drawer isOpen={isOpen} placement="right" size={{ base: 'full', md: 'md' }} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue('white', 'navy.800')}>
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px solid" borderColor={borderColor}>
            {editingService ? 'Edit Paket Layanan Servis' : 'Tambah Paket Servis Baru'}
          </DrawerHeader>

          <DrawerBody py="20px">
            <VStack spacing="16px" align="stretch">
              <FormControl isRequired>
                <FormLabel fontSize="12.5px">Nama Layanan / Paket</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Service CVT Komplit + Greasing High-Temp"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="12.5px">Kategori Layanan</FormLabel>
                <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {initialCategories
                    .filter((c) => c.type === 'SERVICE')
                    .map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel fontSize="12.5px">Deskripsi Pekerjaan & SOP</FormLabel>
                <Textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Rincian bagian yang dibersihkan, diperiksa, dan diganti..."
                />
              </FormControl>

              <SimpleGrid columns={2} gap="12px">
                <FormControl isRequired>
                  <FormLabel fontSize="12.5px">Tarif Biaya (IDR)</FormLabel>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="12.5px">Estimasi Waktu Pengerjaan</FormLabel>
                  <Input
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 45 Menit / 1.5 Jam"
                  />
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <ImageUpload
                  label="Foto Layanan / Servis Bengkel"
                  helperText="Format JPG, PNG, WEBP hingga 5MB. Ditampilkan di booking web."
                  value={imageUrl}
                  onChange={(url) => setImageUrl(url)}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="12.5px">Status Layanan</FormLabel>
                <Select value={status} onChange={(e) => setStatus(e.target.value as any)}>
                  <option value="ACTIVE">ACTIVE (Tampil di Booking Web)</option>
                  <option value="INACTIVE">INACTIVE (Disembunyikan)</option>
                </Select>
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <Switch
                  id="featured-service"
                  isChecked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  colorScheme="purple"
                  me="10px"
                />
                <FormLabel htmlFor="featured-service" mb="0" fontSize="12.5px">
                  Tampilkan sebagai Paket Populer / Rekomendasi
                </FormLabel>
              </FormControl>
            </VStack>
          </DrawerBody>

          <DrawerFooter borderTop="1px solid" borderColor={borderColor}>
            <Button variant="outline" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="purple" onClick={handleSaveService} leftIcon={<MdCheckCircle />}>
              Simpan Paket Servis
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
