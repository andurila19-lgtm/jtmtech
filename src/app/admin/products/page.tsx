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
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Switch,
  Table,
  Tag,
  TagCloseButton,
  TagLabel,
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
import {
  MdAdd,
  MdDelete,
  MdEdit,
  MdInventory,
  MdSearch,
  MdFilterList,
  MdCheckCircle,
} from 'react-icons/md';
import { initialCategories, initialProducts } from 'services/mockData';
import { Product } from 'types/workshop';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStockStatus, setSelectedStockStatus] = useState('ALL');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPrice, setFormPrice] = useState<number>(0);
  const [formDiscountPrice, setFormDiscountPrice] = useState<number | undefined>(undefined);
  const [formStock, setFormStock] = useState<number>(0);
  const [formMinStock, setFormMinStock] = useState<number>(5);
  const [formWeight, setFormWeight] = useState<number>(500);
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formStatus, setFormStatus] = useState<'ACTIVE' | 'DRAFT' | 'ARCHIVED'>('ACTIVE');
  const [formFeatured, setFormFeatured] = useState(false);
  const [formBrand, setFormBrand] = useState('');
  const [formCompatibleVehicles, setFormCompatibleVehicles] = useState<string[]>([]);
  const [newVehicleTag, setNewVehicleTag] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const inputBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const hoverBg = useColorModeValue('gray.50', 'whiteAlpha.50');
  const cardBg = useColorModeValue('gray.50', 'navy.700');

  // Filter logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'ALL' || p.category === selectedCategory;

    const matchesStock =
      selectedStockStatus === 'ALL' ||
      (selectedStockStatus === 'LOW' && p.stock > 0 && p.stock <= p.minStock) ||
      (selectedStockStatus === 'OUT' && p.stock === 0) ||
      (selectedStockStatus === 'IN_STOCK' && p.stock > p.minStock);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormName('');
    setFormSku(`PRD-${Math.floor(1000 + Math.random() * 9000)}`);
    setFormCategory(initialCategories[0].name);
    setFormDescription('');
    setFormPrice(150000);
    setFormDiscountPrice(undefined);
    setFormStock(20);
    setFormMinStock(5);
    setFormWeight(500);
    setFormImageUrl('https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=500&auto=format&fit=crop&q=80');
    setFormStatus('ACTIVE');
    setFormFeatured(false);
    setFormBrand('Motul');
    setFormCompatibleVehicles(['Honda Vario 160', 'Yamaha NMAX 155']);
    onOpen();
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormSku(prod.sku);
    setFormCategory(prod.category);
    setFormDescription(prod.description);
    setFormPrice(prod.price);
    setFormDiscountPrice(prod.discountPrice);
    setFormStock(prod.stock);
    setFormMinStock(prod.minStock);
    setFormWeight(prod.weightGram);
    setFormImageUrl(prod.images[0] || '');
    setFormStatus(prod.status);
    setFormFeatured(prod.featured);
    setFormBrand(prod.brand);
    setFormCompatibleVehicles([...prod.compatibleVehicles]);
    onOpen();
  };

  const handleAddVehicleTag = () => {
    if (newVehicleTag.trim() && !formCompatibleVehicles.includes(newVehicleTag.trim())) {
      setFormCompatibleVehicles([...formCompatibleVehicles, newVehicleTag.trim()]);
      setNewVehicleTag('');
    }
  };

  const handleRemoveVehicleTag = (tagToRemove: string) => {
    setFormCompatibleVehicles(formCompatibleVehicles.filter((t) => t !== tagToRemove));
  };

  const handleSaveProduct = () => {
    if (!formName.trim() || !formSku.trim()) {
      toast({
        title: 'Form Belum Lengkap',
        description: 'Nama produk dan SKU wajib diisi.',
        status: 'error',
        duration: 3000,
        position: 'top-right',
      });
      return;
    }

    if (editingProduct) {
      // Update existing
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formName,
                sku: formSku,
                category: formCategory,
                description: formDescription,
                price: Number(formPrice),
                discountPrice: formDiscountPrice ? Number(formDiscountPrice) : undefined,
                stock: Number(formStock),
                minStock: Number(formMinStock),
                weightGram: Number(formWeight),
                images: [formImageUrl],
                status: formStatus,
                featured: formFeatured,
                brand: formBrand,
                compatibleVehicles: formCompatibleVehicles,
                updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
              }
            : p,
        ),
      );
      toast({
        title: 'Produk Berhasil Diperbarui',
        description: `Perubahan pada ${formName} telah disimpan ke database Payload CMS.`,
        status: 'success',
        duration: 3000,
        position: 'top-right',
      });
    } else {
      // Create new
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        name: formName,
        sku: formSku,
        category: formCategory,
        categoryId: 'cat-custom',
        description: formDescription,
        price: Number(formPrice),
        discountPrice: formDiscountPrice ? Number(formDiscountPrice) : undefined,
        stock: Number(formStock),
        minStock: Number(formMinStock),
        weightGram: Number(formWeight),
        images: [formImageUrl],
        status: formStatus,
        featured: formFeatured,
        brand: formBrand,
        compatibleVehicles: formCompatibleVehicles,
        rating: 5.0,
        salesCount: 0,
        updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      };
      setProducts([newProd, ...products]);
      toast({
        title: 'Produk Baru Ditambahkan',
        description: `${formName} siap dipublikasikan ke toko online.`,
        status: 'success',
        duration: 3000,
        position: 'top-right',
      });
    }
    onClose();
  };

  const handleDeleteProduct = (id: string, name: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast({
      title: 'Produk Dihapus',
      description: `${name} telah dihapus dari katalog produk.`,
      status: 'info',
      duration: 3000,
      position: 'top-right',
    });
  };

  return (
    <Box pt={{ base: '10px', md: '70px', xl: '70px' }} pb="30px">
      {/* Top Header */}
      <Flex justify="space-between" align="center" mb="16px" flexWrap="wrap" gap="10px">
        <Box>
          <HStack spacing="8px">
            <Icon as={MdInventory} color="brand.500" w="24px" h="24px" />
            <Text fontSize="22px" fontWeight="800" color={textColor}>
              Katalog Suku Cadang
            </Text>
            <Badge colorScheme="purple" borderRadius="full">
              {filteredProducts.length} Produk
            </Badge>
          </HStack>
          <Text fontSize="13px" color={textColorSecondary}>
            Kelola suku cadang, pelumas mesin, harga, stok, & kompatibilitas motor.
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
          + Tambah Suku Cadang Baru
        </Button>
      </Flex>

      {/* Filters & Search Card */}
      <Card p="16px" mb="20px">
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="14px">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={MdSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Cari nama produk, SKU, atau merek..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg={inputBg}
              borderRadius="12px"
            />
          </InputGroup>

          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            bg={inputBg}
            borderRadius="12px"
          >
            <option value="ALL">Semua Kategori Produk</option>
            {initialCategories
              .filter((c) => c.type === 'PRODUCT')
              .map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
          </Select>

          <Select
            value={selectedStockStatus}
            onChange={(e) => setSelectedStockStatus(e.target.value)}
            bg={inputBg}
            borderRadius="12px"
          >
            <option value="ALL">Semua Status Stok</option>
            <option value="IN_STOCK">Stok Aman (&gt; Min)</option>
            <option value="LOW">Stok Kritis / Rendah</option>
            <option value="OUT">Stok Habis (0 Unit)</option>
          </Select>
        </SimpleGrid>
      </Card>

      {/* Products List Container */}
      <Card p={{ base: '14px', md: '20px' }}>
        {/* MOBILE CARD VIEW (< md) */}
        <Box display={{ base: 'block', md: 'none' }}>
          <VStack spacing="12px" align="stretch">
            {filteredProducts.map((product) => (
              <Box
                key={product.id}
                p="14px"
                borderRadius="14px"
                bg={cardBg}
                border="1px solid"
                borderColor={borderColor}
              >
                <Flex gap="12px" mb="10px">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    w="70px"
                    h="70px"
                    objectFit="cover"
                    borderRadius="10px"
                    border="1px solid #e2e8f0"
                  />
                  <Box flex="1">
                    <Flex justify="space-between" align="flex-start">
                      <Text fontSize="13.5px" fontWeight="700" color={textColor} noOfLines={2}>
                        {product.name}
                      </Text>
                      {product.stock === 0 ? (
                        <Badge colorScheme="red" fontSize="9.5px">HABIS</Badge>
                      ) : product.stock <= product.minStock ? (
                        <Badge colorScheme="orange" fontSize="9.5px">KRITIS</Badge>
                      ) : (
                        <Badge colorScheme="green" fontSize="9.5px">STOK {product.stock}</Badge>
                      )}
                    </Flex>
                    <Text fontSize="11px" color={textColorSecondary} mt="2px">
                      SKU: {product.sku} • {product.category}
                    </Text>
                    <HStack spacing="6px" mt="4px">
                      <Text fontSize="14px" fontWeight="800" color="brand.500">
                        Rp {product.price.toLocaleString('id-ID')}
                      </Text>
                      {product.discountPrice && (
                        <Text fontSize="11px" color="gray.400" as="s">
                          Rp {product.discountPrice.toLocaleString('id-ID')}
                        </Text>
                      )}
                    </HStack>
                  </Box>
                </Flex>

                {/* Compatibility Tags */}
                {product.compatibleVehicles.length > 0 && (
                  <HStack spacing="4px" mb="10px" flexWrap="wrap">
                    {product.compatibleVehicles.slice(0, 3).map((v, i) => (
                      <Tag size="sm" key={i} colorScheme="blue" fontSize="10px">
                        {v}
                      </Tag>
                    ))}
                    {product.compatibleVehicles.length > 3 && (
                      <Tag size="sm" colorScheme="gray" fontSize="10px">
                        +{product.compatibleVehicles.length - 3} motor
                      </Tag>
                    )}
                  </HStack>
                )}

                {/* Actions */}
                <SimpleGrid columns={2} gap="8px" pt="8px" borderTop="1px solid" borderColor={borderColor}>
                  <Button
                    size="sm"
                    colorScheme="purple"
                    leftIcon={<MdEdit />}
                    h="38px"
                    onClick={() => handleOpenEdit(product)}
                  >
                    Edit Produk
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                    leftIcon={<MdDelete />}
                    h="38px"
                    onClick={() => handleDeleteProduct(product.id, product.name)}
                  >
                    Hapus
                  </Button>
                </SimpleGrid>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* DESKTOP TABLE VIEW (>= md) */}
        <Box display={{ base: 'none', md: 'block' }} overflowX="auto">
          <Table variant="simple" color="gray.500">
            <Thead>
              <Tr>
                <Th borderColor={borderColor} color="gray.400" fontSize="11px">FOTO & PRODUK</Th>
                <Th borderColor={borderColor} color="gray.400" fontSize="11px">KODE SKU & MEREK</Th>
                <Th borderColor={borderColor} color="gray.400" fontSize="11px">KATEGORI</Th>
                <Th borderColor={borderColor} color="gray.400" fontSize="11px">HARGA (RP)</Th>
                <Th borderColor={borderColor} color="gray.400" fontSize="11px">STOK GUDANG</Th>
                <Th borderColor={borderColor} color="gray.400" fontSize="11px">KOMPATIBILITAS</Th>
                <Th borderColor={borderColor} color="gray.400" fontSize="11px">STATUS</Th>
                <Th borderColor={borderColor} color="gray.400" fontSize="11px" textAlign="right">AKSI</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredProducts.map((product) => (
                <Tr key={product.id} _hover={{ bg: hoverBg }}>
                  <Td borderColor={borderColor}>
                    <HStack spacing="12px">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        w="46px"
                        h="46px"
                        objectFit="cover"
                        borderRadius="10px"
                      />
                      <Box maxW="240px">
                        <Text color={textColor} fontSize="13px" fontWeight="700" noOfLines={2}>
                          {product.name}
                        </Text>
                        {product.featured && (
                          <Badge colorScheme="purple" fontSize="9px">
                            FEATURED
                          </Badge>
                        )}
                      </Box>
                    </HStack>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text color={textColor} fontSize="12.5px" fontWeight="600">
                      {product.sku}
                    </Text>
                    <Text fontSize="11px" color="gray.400">
                      {product.brand}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text fontSize="12px" color={textColorSecondary}>
                      {product.category}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text color={textColor} fontSize="13px" fontWeight="700">
                      Rp {product.price.toLocaleString('id-ID')}
                    </Text>
                    {product.discountPrice && (
                      <Text fontSize="11px" color="green.500" fontWeight="600">
                        Diskon: Rp {product.discountPrice.toLocaleString('id-ID')}
                      </Text>
                    )}
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text
                      fontSize="13px"
                      fontWeight="800"
                      color={
                        product.stock === 0
                          ? 'red.500'
                          : product.stock <= product.minStock
                          ? 'orange.500'
                          : 'green.500'
                      }
                    >
                      {product.stock} unit
                    </Text>
                    <Text fontSize="10px" color="gray.400">
                      Min: {product.minStock}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor} maxW="180px">
                    <HStack spacing="4px" flexWrap="wrap">
                      {product.compatibleVehicles.slice(0, 2).map((v, i) => (
                        <Tag size="sm" key={i} colorScheme="blue" fontSize="10px">
                          {v}
                        </Tag>
                      ))}
                      {product.compatibleVehicles.length > 2 && (
                        <Tag size="sm" colorScheme="gray" fontSize="10px">
                          +{product.compatibleVehicles.length - 2}
                        </Tag>
                      )}
                    </HStack>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Badge
                      colorScheme={
                        product.status === 'ACTIVE'
                          ? 'green'
                          : product.status === 'DRAFT'
                          ? 'yellow'
                          : 'gray'
                      }
                    >
                      {product.status}
                    </Badge>
                  </Td>
                  <Td borderColor={borderColor} textAlign="right">
                    <HStack spacing="6px" justify="flex-end">
                      <Button
                        size="xs"
                        colorScheme="purple"
                        leftIcon={<MdEdit />}
                        onClick={() => handleOpenEdit(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="xs"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => handleDeleteProduct(product.id, product.name)}
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

      {/* Product Form Drawer */}
      <Drawer isOpen={isOpen} placement="right" size={{ base: 'full', md: 'lg' }} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue('white', 'navy.800')}>
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px solid" borderColor={borderColor}>
            {editingProduct ? 'Edit Suku Cadang' : 'Tambah Suku Cadang Baru'}
          </DrawerHeader>

          <DrawerBody py="20px">
            <VStack spacing="16px" align="stretch">
              <FormControl isRequired>
                <FormLabel fontSize="12.5px">Nama Produk</FormLabel>
                <Input
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Motul 7100 4T 10W-40 Synthetic"
                />
              </FormControl>

              <SimpleGrid columns={{ base: 1, md: 2 }} gap="12px">
                <FormControl isRequired>
                  <FormLabel fontSize="12.5px">SKU / Kode Barang</FormLabel>
                  <Input value={formSku} onChange={(e) => setFormSku(e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="12.5px">Brand / Merk</FormLabel>
                  <Input value={formBrand} onChange={(e) => setFormBrand(e.target.value)} />
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={{ base: 1, md: 2 }} gap="12px">
                <FormControl>
                  <FormLabel fontSize="12.5px">Kategori</FormLabel>
                  <Select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                  >
                    {initialCategories
                      .filter((c) => c.type === 'PRODUCT')
                      .map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="12.5px">Status Produk</FormLabel>
                  <Select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="DRAFT">DRAFT</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </Select>
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel fontSize="12.5px">Deskripsi & Spesifikasi Produk</FormLabel>
                <Textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Keterangan spesifikasi teknis part motor..."
                />
              </FormControl>

              <SimpleGrid columns={{ base: 1, md: 2 }} gap="12px">
                <FormControl isRequired>
                  <FormLabel fontSize="12.5px">Harga Jual Normal (IDR)</FormLabel>
                  <Input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="12.5px">Harga Diskon / Promo (IDR)</FormLabel>
                  <Input
                    type="number"
                    value={formDiscountPrice || ''}
                    placeholder="Kosongkan jika tidak promo"
                    onChange={(e) =>
                      setFormDiscountPrice(e.target.value ? Number(e.target.value) : undefined)
                    }
                  />
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={{ base: 1, md: 3 }} gap="12px">
                <FormControl isRequired>
                  <FormLabel fontSize="12.5px">Stok Saat Ini</FormLabel>
                  <Input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="12.5px">Batas Min Stok</FormLabel>
                  <Input
                    type="number"
                    value={formMinStock}
                    onChange={(e) => setFormMinStock(Number(e.target.value))}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="12.5px">Berat (Gram)</FormLabel>
                  <Input
                    type="number"
                    value={formWeight}
                    onChange={(e) => setFormWeight(Number(e.target.value))}
                  />
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <ImageUpload
                  label="Foto Produk / Suku Cadang"
                  helperText="Format JPG, PNG, WEBP hingga 5MB. Gambar akan otomatis tersimpan di katalog."
                  value={formImageUrl}
                  onChange={(url) => setFormImageUrl(url)}
                />
              </FormControl>

              {/* Compatible Vehicles */}
              <FormControl>
                <FormLabel fontSize="12.5px">Kompatibilitas Tipe Motor</FormLabel>
                <HStack mb="8px">
                  <Input
                    size="sm"
                    placeholder="e.g. Honda Vario 160"
                    value={newVehicleTag}
                    onChange={(e) => setNewVehicleTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddVehicleTag();
                      }
                    }}
                  />
                  <Button size="sm" onClick={handleAddVehicleTag} colorScheme="purple">
                    + Tambah
                  </Button>
                </HStack>
                <HStack spacing="6px" flexWrap="wrap">
                  {formCompatibleVehicles.map((tag) => (
                    <Tag size="md" key={tag} borderRadius="full" colorScheme="purple">
                      <TagLabel fontSize="11.5px">{tag}</TagLabel>
                      <TagCloseButton onClick={() => handleRemoveVehicleTag(tag)} />
                    </Tag>
                  ))}
                </HStack>
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <Switch
                  id="featured-switch"
                  isChecked={formFeatured}
                  onChange={(e) => setFormFeatured(e.target.checked)}
                  colorScheme="purple"
                  me="10px"
                />
                <FormLabel htmlFor="featured-switch" mb="0" fontSize="12.5px">
                  Tampilkan sebagai Produk Unggulan (Featured) di Beranda
                </FormLabel>
              </FormControl>
            </VStack>
          </DrawerBody>

          <DrawerFooter borderTop="1px solid" borderColor={borderColor}>
            <Button variant="outline" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="purple" onClick={handleSaveProduct} leftIcon={<MdCheckCircle />}>
              Simpan Produk
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
