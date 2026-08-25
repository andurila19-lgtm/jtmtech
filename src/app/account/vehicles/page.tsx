'use client';

import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Badge,
  Button,
  VStack,
  HStack,
  Flex,
  useColorModeValue,
  Icon,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import {
  MdTwoWheeler,
  MdAdd,
  MdBuild,
  MdDelete,
  MdShoppingCart,
  MdSpeed,
} from 'react-icons/md';
import Link from 'next/link';
import { useStore } from 'contexts/StoreContext';

export default function CustomerVehiclesPage() {
  const { vehicles, addVehicle, removeVehicle } = useStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const bgInput = useColorModeValue('secondaryGray.300', 'navy.900');
  const bgItem = useColorModeValue('gray.50', 'navy.900');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  // New vehicle form state
  const [brand, setBrand] = useState('Honda');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('2024');
  const [licensePlate, setLicensePlate] = useState('');
  const [engineType, setEngineType] = useState('160cc eSP+');
  const [odometerKm, setOdometerKm] = useState<number>(12500);

  const handleSaveVehicle = () => {
    if (!model || !licensePlate) {
      toast({
        title: 'Model dan Plat Nomor Wajib Diisi',
        status: 'warning',
      });
      return;
    }

    addVehicle({
      brand,
      model,
      year: parseInt(year) || 2024,
      licensePlate: licensePlate.toUpperCase(),
      engineType,
      odometerKm,
    });

    toast({
      title: 'Motor Berhasil Ditambahkan ke Garasi!',
      description: `${model} (${licensePlate.toUpperCase()}) siap digunakan untuk booking servis.`,
      status: 'success',
      duration: 3000,
      position: 'top-right',
    });

    setModel('');
    setLicensePlate('');
    onClose();
  };

  return (
    <Box p="24px" borderRadius="20px" bg={bgCard} border="1px solid" borderColor={borderColor}>
      <Flex justify="space-between" align="center" mb="6px" flexWrap="wrap" gap="10px">
        <Heading as="h1" fontSize="22px" fontWeight="900" color={textColor}>
          Garasi Motor Saya
        </Heading>
        <Button colorScheme="purple" size="sm" borderRadius="10px" leftIcon={<MdAdd />} onClick={onOpen}>
          + Tambah Motor
        </Button>
      </Flex>
      <Text fontSize="13.5px" color={textColorSecondary} mb="24px">
        Simpan data motor Anda untuk mempercepat proses booking servis dan mendapatkan rekomendasi suku cadang yang 100% cocok.
      </Text>

      {vehicles.length === 0 ? (
        <Box py="40px" textAlign="center">
          <Icon as={MdTwoWheeler} w="48px" h="48px" color="gray.300" mb="12px" />
          <Text fontSize="14px" color={textColorSecondary} mb="16px">
            Belum ada motor yang tersimpan di garasi Anda.
          </Text>
          <Button colorScheme="purple" size="sm" borderRadius="10px" onClick={onOpen}>
            Daftarkan Motor Pertama Anda
          </Button>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
          {vehicles.map((veh) => (
            <Box
              key={veh.id}
              p="18px"
              borderRadius="18px"
              bg={bgItem}
              border="1px solid"
              borderColor={borderColor}
              display="flex"
              flexDirection="column"
            >
              <Flex justify="space-between" align="flex-start" mb="10px">
                <HStack spacing="10px">
                  <Box p="8px" borderRadius="10px" bg="brand.500" color="white">
                    <Icon as={MdTwoWheeler} w="22px" h="22px" />
                  </Box>
                  <Box>
                    <Text fontSize="15px" fontWeight="800" color={textColor}>
                      {veh.model}
                    </Text>
                    <Text fontSize="12px" color={textColorSecondary}>
                      {veh.brand} • Tahun {veh.year}
                    </Text>
                  </Box>
                </HStack>

                <Badge colorScheme="purple" fontSize="12px" px="8px" py="3px" borderRadius="full">
                  {veh.licensePlate}
                </Badge>
              </Flex>

              <VStack spacing="6px" align="stretch" py="10px" borderTop="1px solid" borderBottom="1px solid" borderColor={borderColor} mb="14px" fontSize="12.5px">
                <Flex justify="space-between">
                  <Text color={textColorSecondary}>Tipe Mesin:</Text>
                  <Text fontWeight="700" color={textColor}>{veh.engineType || 'Injeksi Standard'}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color={textColorSecondary}>Odometer Terakhir:</Text>
                  <Text fontWeight="700" color={textColor}>{veh.odometerKm ? `${veh.odometerKm.toLocaleString('id-ID')} KM` : '-'}</Text>
                </Flex>
              </VStack>

              <HStack spacing="8px" mt="auto">
                <Link href={`/booking`} style={{ width: '100%' }}>
                  <Button size="sm" colorScheme="purple" w="100%" borderRadius="10px" leftIcon={<MdBuild />}>
                    Booking Servis
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => removeVehicle(veh.id)}
                >
                  <Icon as={MdDelete} />
                </Button>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      )}

      {/* Modal Add Vehicle */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: 'full', md: 'md' }}>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('white', 'navy.800')}>
          <ModalHeader>Tambah Motor ke Garasi</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="14px" align="stretch">
              <FormControl isRequired>
                <FormLabel fontSize="12.5px">Merk Motor</FormLabel>
                <Select value={brand} onChange={(e) => setBrand(e.target.value)} bg={bgInput} borderRadius="10px">
                  <option value="Honda">Honda</option>
                  <option value="Yamaha">Yamaha</option>
                  <option value="Kawasaki">Kawasaki</option>
                  <option value="Suzuki">Suzuki</option>
                  <option value="Vespa">Vespa</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="12.5px">Model / Tipe Motor</FormLabel>
                <Input
                  placeholder="e.g. Vario 160, NMAX 155, Aerox"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  bg={bgInput}
                  borderRadius="10px"
                />
              </FormControl>

              <SimpleGrid columns={2} gap="10px">
                <FormControl isRequired>
                  <FormLabel fontSize="12.5px">Tahun Pembuatan</FormLabel>
                  <Input
                    placeholder="2024"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    bg={bgInput}
                    borderRadius="10px"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontSize="12.5px">Nomor Polisi (Plat)</FormLabel>
                  <Input
                    placeholder="N 1234 XX"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    bg={bgInput}
                    borderRadius="10px"
                    textTransform="uppercase"
                  />
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel fontSize="12.5px">Tipe Mesin & Odometer (KM)</FormLabel>
                <SimpleGrid columns={2} gap="10px">
                  <Input
                    placeholder="e.g. 160cc 4-Valve"
                    value={engineType}
                    onChange={(e) => setEngineType(e.target.value)}
                    bg={bgInput}
                    borderRadius="10px"
                  />
                  <Input
                    type="number"
                    placeholder="12000"
                    value={odometerKm}
                    onChange={(e) => setOdometerKm(parseInt(e.target.value) || 0)}
                    bg={bgInput}
                    borderRadius="10px"
                  />
                </SimpleGrid>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="purple" onClick={handleSaveVehicle} borderRadius="10px">
              Simpan ke Garasi
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
