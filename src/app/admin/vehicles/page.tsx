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
import {
  MdBikeScooter,
  MdAdd,
  MdSearch,
  MdEdit,
  MdDelete,
  MdBuild,
  MdPerson,
} from 'react-icons/md';
import { initialVehicles, initialCustomers } from 'services/mockData';
import { Vehicle } from 'types/workshop';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [search, setSearch] = useState('');
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  // Form states
  const [customerName, setCustomerName] = useState('Dimas Anggara');
  const [brand, setBrand] = useState('Honda');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number>(2024);
  const [licensePlate, setLicensePlate] = useState('');
  const [engineType, setEngineType] = useState('160cc 4-Katup eSP+');
  const [odometerKm, setOdometerKm] = useState<number>(5000);
  const [color, setColor] = useState('Hitam');
  const [notes, setNotes] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const inputBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const hoverBg = useColorModeValue('gray.50', 'whiteAlpha.50');
  const cardBg = useColorModeValue('gray.50', 'navy.700');

  const filtered = vehicles.filter(
    (v) =>
      v.licensePlate.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase()) ||
      v.customerName.toLowerCase().includes(search.toLowerCase()) ||
      v.brand.toLowerCase().includes(search.toLowerCase()),
  );

  const handleOpenCreate = () => {
    setEditingVehicle(null);
    setCustomerName('Dimas Anggara');
    setBrand('Honda');
    setModel('');
    setYear(2024);
    setLicensePlate('');
    setEngineType('160cc 4-Katup eSP+');
    setOdometerKm(5000);
    setColor('Hitam');
    setNotes('');
    onOpen();
  };

  const handleOpenEdit = (v: Vehicle) => {
    setEditingVehicle(v);
    setCustomerName(v.customerName);
    setBrand(v.brand);
    setModel(v.model);
    setYear(v.year);
    setLicensePlate(v.licensePlate);
    setEngineType(v.engineType);
    setOdometerKm(v.odometerKm || 0);
    setColor(v.color || '');
    setNotes(v.notes || '');
    onOpen();
  };

  const handleSaveVehicle = () => {
    if (!licensePlate.trim() || !model.trim()) {
      toast({
        title: 'Form Belum Lengkap',
        description: 'Plat Nomor dan Model Kendaraan wajib diisi.',
        status: 'error',
        duration: 3000,
        position: 'top-right',
      });
      return;
    }

    if (editingVehicle) {
      setVehicles(
        vehicles.map((v) =>
          v.id === editingVehicle.id
            ? {
                ...v,
                customerName,
                brand,
                model,
                year: Number(year),
                licensePlate,
                engineType,
                odometerKm: Number(odometerKm),
                color,
                notes,
              }
            : v,
        ),
      );
      toast({
        title: 'Data Kendaraan Diperbarui',
        status: 'success',
        duration: 3000,
        position: 'top-right',
      });
    } else {
      const newVeh: Vehicle = {
        id: `veh-${Date.now()}`,
        customerId: 'cust-custom',
        customerName,
        customerPhone: '0812-3456-7890',
        brand,
        model,
        year: Number(year),
        licensePlate,
        engineType,
        odometerKm: Number(odometerKm),
        color,
        notes,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setVehicles([...vehicles, newVeh]);
      toast({
        title: 'Kendaraan Baru Terdaftar',
        status: 'success',
        duration: 3000,
        position: 'top-right',
      });
    }
    onClose();
  };

  const handleDelete = (id: string, plate: string) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
    toast({
      title: 'Kendaraan Dihapus',
      description: `Motor plat ${plate} telah dihapus dari database.`,
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
            <Icon as={MdBikeScooter} color="brand.500" w="24px" h="24px" />
            <Text fontSize="22px" fontWeight="800" color={textColor}>
              Database Motor Pelanggan
            </Text>
            <Badge colorScheme="purple" borderRadius="full">
              {vehicles.length} Motor
            </Badge>
          </HStack>
          <Text fontSize="13px" color={textColorSecondary}>
            Database identitas motor pelanggan, nomor plat, tipe mesin, & histori odometer.
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
          + Registrasi Motor Baru
        </Button>
      </Flex>

      <Card p="16px" mb="16px">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={MdSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Cari Plat Nomor (N 1234 XX), Model (Vario 160), atau Pemilik..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            bg={inputBg}
            borderRadius="12px"
          />
        </InputGroup>
      </Card>

      <Card p={{ base: '14px', md: '20px' }}>
        {/* MOBILE CARD VIEW (< md) */}
        <Box display={{ base: 'block', md: 'none' }}>
          <VStack spacing="12px" align="stretch">
            {filtered.map((v) => (
              <Box
                key={v.id}
                p="14px"
                borderRadius="14px"
                bg={cardBg}
                border="1px solid"
                borderColor={borderColor}
              >
                <Flex justify="space-between" align="center" mb="6px">
                  <Badge colorScheme="purple" fontSize="13px" px="8px" py="2px">
                    {v.licensePlate}
                  </Badge>
                  <Text fontSize="11.5px" color={textColorSecondary} fontWeight="600">
                    {v.brand} • {v.year}
                  </Text>
                </Flex>

                <Box mb="8px">
                  <Text fontSize="14px" fontWeight="700" color={textColor}>
                    {v.model} ({v.color || 'Standar'})
                  </Text>
                  <HStack spacing="6px" mt="2px">
                    <Icon as={MdPerson} color="gray.400" />
                    <Text fontSize="12px" color={textColorSecondary}>
                      Pemilik: <strong>{v.customerName}</strong>
                    </Text>
                  </HStack>
                  <Text fontSize="11px" color="gray.400" mt="2px">
                    Mesin: {v.engineType} • Odometer: {v.odometerKm ? `${v.odometerKm.toLocaleString('id-ID')} km` : '-'}
                  </Text>
                </Box>

                {v.notes && (
                  <Text fontSize="11px" color="gray.500" fontStyle="italic" mb="8px">
                    &quot;{v.notes}&quot;
                  </Text>
                )}

                <SimpleGrid columns={2} gap="8px" pt="8px" borderTop="1px solid" borderColor={borderColor}>
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="purple"
                    leftIcon={<MdEdit />}
                    h="38px"
                    onClick={() => handleOpenEdit(v)}
                  >
                    Edit Data
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    leftIcon={<MdDelete />}
                    h="38px"
                    onClick={() => handleDelete(v.id, v.licensePlate)}
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
                <Th borderColor={borderColor} color="gray.400">PLAT NOMOR & MEREK</Th>
                <Th borderColor={borderColor} color="gray.400">MODEL & TAHUN</Th>
                <Th borderColor={borderColor} color="gray.400">PEMILIK / PELANGGAN</Th>
                <Th borderColor={borderColor} color="gray.400">TIPE MESIN</Th>
                <Th borderColor={borderColor} color="gray.400">ODOMETER</Th>
                <Th borderColor={borderColor} color="gray.400">CATATAN KHUSUS</Th>
                <Th borderColor={borderColor} color="gray.400" textAlign="right">TINDAKAN</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filtered.map((v) => (
                <Tr key={v.id} _hover={{ bg: hoverBg }}>
                  <Td borderColor={borderColor}>
                    <Badge colorScheme="purple" fontSize="12.5px" px="8px" py="2px">
                      {v.licensePlate}
                    </Badge>
                    <Text fontSize="11px" color="gray.400" mt="2px">
                      {v.brand}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text color={textColor} fontSize="13px" fontWeight="700">
                      {v.model}
                    </Text>
                    <Text fontSize="11px" color="gray.400">
                      Tahun {v.year} | {v.color || '-'}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <HStack spacing="6px">
                      <Icon as={MdPerson} color="gray.400" />
                      <Text color={textColor} fontSize="12.5px" fontWeight="600">
                        {v.customerName}
                      </Text>
                    </HStack>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text fontSize="12px" color={textColorSecondary}>
                      {v.engineType}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text fontSize="12.5px" fontWeight="700" color={textColor}>
                      {v.odometerKm ? `${v.odometerKm.toLocaleString('id-ID')} km` : '-'}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor} maxW="200px">
                    <Text fontSize="11.5px" color="gray.500" noOfLines={2}>
                      {v.notes || '-'}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor} textAlign="right">
                    <HStack spacing="6px" justify="flex-end">
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => handleOpenEdit(v)}
                        colorScheme="purple"
                      >
                        <Icon as={MdEdit} />
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleDelete(v.id, v.licensePlate)}
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

      {/* Modal Add / Edit Vehicle */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: 'full', md: 'md' }}>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('white', 'navy.800')}>
          <ModalHeader>
            {editingVehicle ? 'Edit Data Kendaraan' : 'Registrasi Kendaraan Pelanggan'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="14px" align="stretch">
              <FormControl isRequired>
                <FormLabel fontSize="12.5px">Nama Pemilik / Customer</FormLabel>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Dimas Anggara"
                />
              </FormControl>

              <SimpleGrid columns={2} gap="10px">
                <FormControl isRequired>
                  <FormLabel fontSize="12.5px">Pabrikan / Brand</FormLabel>
                  <Select value={brand} onChange={(e) => setBrand(e.target.value)}>
                    <option value="Honda">Honda</option>
                    <option value="Yamaha">Yamaha</option>
                    <option value="Kawasaki">Kawasaki</option>
                    <option value="Suzuki">Suzuki</option>
                    <option value="Vespa / Piaggio">Vespa / Piaggio</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="12.5px">Tahun Pembuatan</FormLabel>
                  <Input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                  />
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={2} gap="10px">
                <FormControl isRequired>
                  <FormLabel fontSize="12.5px">Model Motor</FormLabel>
                  <Input
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="e.g. Vario 160 ABS"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="12.5px">Nomor Plat Polisi</FormLabel>
                  <Input
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    placeholder="e.g. N 1234 XX"
                  />
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel fontSize="12.5px">Tipe / Kode Mesin</FormLabel>
                <Input
                  value={engineType}
                  onChange={(e) => setEngineType(e.target.value)}
                  placeholder="e.g. 160cc 4-Katup eSP+ PGM-FI"
                />
              </FormControl>

              <SimpleGrid columns={2} gap="10px">
                <FormControl>
                  <FormLabel fontSize="12.5px">Odometer (KM)</FormLabel>
                  <Input
                    type="number"
                    value={odometerKm}
                    onChange={(e) => setOdometerKm(Number(e.target.value))}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="12.5px">Warna Motor</FormLabel>
                  <Input value={color} onChange={(e) => setColor(e.target.value)} />
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel fontSize="12.5px">Catatan Khusus Kendaraan</FormLabel>
                <Textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Riwayat modifikasi mesin, part non-standar, dll..."
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="purple" onClick={handleSaveVehicle}>
              Simpan Data Kendaraan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
