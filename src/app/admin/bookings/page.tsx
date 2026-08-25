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
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
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
  MdCalendarMonth,
  MdAdd,
  MdEngineering,
  MdBikeScooter,
  MdCheckCircle,
  MdPlayArrow,
  MdDoneAll,
} from 'react-icons/md';
import {
  initialBookings,
  initialCustomers,
  initialMechanics,
  initialServices,
} from 'services/mockData';
import { BookingStatus, ServiceBooking } from 'types/workshop';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<ServiceBooking[]>(initialBookings);
  const [viewMode, setViewMode] = useState<'LIST' | 'CALENDAR'>('LIST');

  // New/Edit Booking Form
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [vehicleModel, setVehicleModel] = useState('Honda Vario 160');
  const [vehiclePlate, setVehiclePlate] = useState('N 1234 XX');
  const [serviceId, setServiceId] = useState(initialServices[0].id);
  const [mechanicId, setMechanicId] = useState(initialMechanics[0].id);
  const [bookingDate, setBookingDate] = useState('2026-08-25');
  const [bookingTime, setBookingTime] = useState('10:00 WIB');
  const [notes, setNotes] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const boxBg = useColorModeValue('gray.50', 'navy.700');
  const hoverBg = useColorModeValue('gray.50', 'whiteAlpha.50');

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'IN_SERVICE':
        return <Badge colorScheme="purple" variant="solid">DIKERJAKAN</Badge>;
      case 'CONFIRMED':
        return <Badge colorScheme="blue" variant="solid">DIKONFIRMASI</Badge>;
      case 'PENDING':
        return <Badge colorScheme="orange" variant="solid">MENUNGGU</Badge>;
      case 'COMPLETED':
        return <Badge colorScheme="green" variant="solid">SELESAI</Badge>;
      case 'CANCELLED':
        return <Badge colorScheme="red" variant="solid">DIBATALKAN</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleUpdateStatus = (bookingId: string, newStatus: BookingStatus) => {
    setBookings(
      bookings.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b)),
    );
    toast({
      title: 'Status Booking Diperbarui',
      description: `Status diubah menjadi ${newStatus}.`,
      status: 'success',
      duration: 3000,
      position: 'top-right',
    });
  };

  const handleCreateBooking = () => {
    if (!custName.trim() || !vehiclePlate.trim()) {
      toast({
        title: 'Data Belum Lengkap',
        description: 'Nama pelanggan dan Plat Nomor wajib diisi.',
        status: 'error',
        duration: 3000,
        position: 'top-right',
      });
      return;
    }

    const selectedSrv = initialServices.find((s) => s.id === serviceId) || initialServices[0];
    const selectedMech = initialMechanics.find((m) => m.id === mechanicId);

    const newBooking: ServiceBooking = {
      id: `sb-${Date.now()}`,
      bookingNumber: `SB-202608-${Math.floor(100 + Math.random() * 900)}`,
      customerId: 'cust-custom',
      customerName: custName,
      customerPhone: custPhone || '0812-0000-0000',
      vehicleId: 'veh-custom',
      vehicleModel: vehicleModel,
      vehiclePlate: vehiclePlate,
      vehicleYear: 2024,
      serviceId: selectedSrv.id,
      serviceName: selectedSrv.name,
      mechanicId: selectedMech?.id,
      mechanicName: selectedMech?.name,
      date: bookingDate,
      time: bookingTime,
      status: 'CONFIRMED',
      notes: notes,
      estimatedCost: selectedSrv.price,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
    };

    setBookings([newBooking, ...bookings]);
    toast({
      title: 'Booking Berhasil Ditambahkan',
      description: `Jadwal antrean untuk ${custName} (${vehiclePlate}) telah terdaftar.`,
      status: 'success',
      duration: 3000,
      position: 'top-right',
    });
    onClose();
  };

  return (
    <Box pt={{ base: '10px', md: '70px', xl: '70px' }} pb="30px">
      <Flex justify="space-between" align="center" mb="16px" flexWrap="wrap" gap="10px">
        <Box>
          <HStack spacing="8px">
            <Icon as={MdCalendarMonth} color="brand.500" w="24px" h="24px" />
            <Text fontSize="22px" fontWeight="800" color={textColor}>
              Jadwal Booking Servis
            </Text>
            <Badge colorScheme="purple" borderRadius="full">
              {bookings.length} Terdaftar
            </Badge>
          </HStack>
          <Text fontSize="13px" color={textColorSecondary}>
            Kelola jadwal kedatangan pelanggan, alokasi mekanik pit, & progres servis.
          </Text>
        </Box>

        <Button
          colorScheme="purple"
          leftIcon={<MdAdd />}
          onClick={onOpen}
          borderRadius="12px"
          w={{ base: '100%', sm: 'auto' }}
          h="44px"
        >
          + Booking Servis Baru
        </Button>
      </Flex>

      {/* Tabs Filter */}
      <Card p="20px">
        <Tabs variant="soft-rounded" colorScheme="purple">
          <TabList mb="16px" flexWrap="wrap">
            <Tab>Semua ({bookings.length})</Tab>
            <Tab>Hari Ini ({bookings.filter((b) => b.date === '2026-08-25').length})</Tab>
            <Tab>Sedang Dikerjakan ({bookings.filter((b) => b.status === 'IN_SERVICE').length})</Tab>
            <Tab>Terkonfirmasi ({bookings.filter((b) => b.status === 'CONFIRMED').length})</Tab>
            <Tab>Selesai ({bookings.filter((b) => b.status === 'COMPLETED').length})</Tab>
          </TabList>

          <TabPanels>
            {/* All Bookings Tab */}
            <TabPanel px="0">
              {/* MOBILE CARD VIEW (< md) */}
              <Box display={{ base: 'block', md: 'none' }}>
                <VStack spacing="12px" align="stretch">
                  {bookings.map((b) => (
                    <Box
                      key={b.id}
                      p="14px"
                      borderRadius="14px"
                      bg={boxBg}
                      border="1px solid"
                      borderColor={borderColor}
                    >
                      <Flex justify="space-between" align="center" mb="6px">
                        <HStack spacing="6px">
                          <Badge colorScheme="purple" fontSize="11px" px="6px" py="2px">
                            ⏰ {b.time}
                          </Badge>
                          <Badge fontSize="10.5px" colorScheme="gray">
                            {b.vehiclePlate}
                          </Badge>
                        </HStack>
                        {getStatusBadge(b.status)}
                      </Flex>

                      <Box mb="8px">
                        <Text fontSize="14px" fontWeight="700" color={textColor}>
                          {b.customerName} — {b.vehicleModel}
                        </Text>
                        <Text fontSize="12px" color={textColorSecondary}>
                          {b.serviceName} • Est: Rp {b.estimatedCost.toLocaleString('id-ID')}
                        </Text>
                        <Text fontSize="11px" color="purple.500" fontWeight="600" mt="2px">
                          👨‍🔧 Mekanik: {b.mechanicName || 'Standby (Pit)'}
                        </Text>
                      </Box>

                      {/* Action buttons */}
                      <Box pt="6px" borderTop="1px solid" borderColor={borderColor}>
                        {b.status === 'CONFIRMED' && (
                          <Button
                            size="sm"
                            w="100%"
                            colorScheme="purple"
                            leftIcon={<MdPlayArrow />}
                            h="38px"
                            onClick={() => handleUpdateStatus(b.id, 'IN_SERVICE')}
                          >
                            Mulai Servis (Masuk Pit)
                          </Button>
                        )}
                        {b.status === 'IN_SERVICE' && (
                          <Button
                            size="sm"
                            w="100%"
                            colorScheme="green"
                            leftIcon={<MdDoneAll />}
                            h="38px"
                            onClick={() => handleUpdateStatus(b.id, 'COMPLETED')}
                          >
                            Tandai Servis Selesai
                          </Button>
                        )}
                        {b.status === 'PENDING' && (
                          <Button
                            size="sm"
                            w="100%"
                            colorScheme="blue"
                            leftIcon={<MdCheckCircle />}
                            h="38px"
                            onClick={() => handleUpdateStatus(b.id, 'CONFIRMED')}
                          >
                            Konfirmasi Jadwal
                          </Button>
                        )}
                      </Box>
                    </Box>
                  ))}
                </VStack>
              </Box>

              {/* DESKTOP TABLE VIEW (>= md) */}
              <Box display={{ base: 'none', md: 'block' }} overflowX="auto">
                <Table variant="simple" color="gray.500">
                  <Thead>
                    <Tr>
                      <Th borderColor={borderColor} color="gray.400">NO BOOKING & WAKTU</Th>
                      <Th borderColor={borderColor} color="gray.400">PELANGGAN & TELEPON</Th>
                      <Th borderColor={borderColor} color="gray.400">KENDARAAN & PLAT</Th>
                      <Th borderColor={borderColor} color="gray.400">PAKET SERVIS</Th>
                      <Th borderColor={borderColor} color="gray.400">MEKANIK BERTUGAS</Th>
                      <Th borderColor={borderColor} color="gray.400">STATUS</Th>
                      <Th borderColor={borderColor} color="gray.400" textAlign="right">TINDAKAN</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {bookings.map((b) => (
                      <Tr key={b.id} _hover={{ bg: hoverBg }}>
                        <Td borderColor={borderColor}>
                          <Text color={textColor} fontSize="13px" fontWeight="700">
                            {b.bookingNumber}
                          </Text>
                          <Text fontSize="11px" color="brand.500" fontWeight="600">
                            📅 {b.date} | ⏰ {b.time}
                          </Text>
                        </Td>
                        <Td borderColor={borderColor}>
                          <Text color={textColor} fontSize="13px" fontWeight="600">
                            {b.customerName}
                          </Text>
                          <Text fontSize="11px" color="gray.400">
                            {b.customerPhone}
                          </Text>
                        </Td>
                        <Td borderColor={borderColor}>
                          <HStack spacing="6px">
                            <Icon as={MdBikeScooter} color="gray.400" />
                            <Box>
                              <Text color={textColor} fontSize="12.5px" fontWeight="600">
                                {b.vehicleModel}
                              </Text>
                              <Badge fontSize="10px" colorScheme="gray">
                                {b.vehiclePlate}
                              </Badge>
                            </Box>
                          </HStack>
                        </Td>
                        <Td borderColor={borderColor} maxW="220px">
                          <Text fontSize="12px" color={textColor} fontWeight="600" noOfLines={1}>
                            {b.serviceName}
                          </Text>
                          <Text fontSize="11px" color="gray.400">
                            Est: Rp {b.estimatedCost.toLocaleString('id-ID')}
                          </Text>
                          {b.notes && (
                            <Text fontSize="10.5px" color="gray.500" fontStyle="italic" noOfLines={1}>
                              &quot;{b.notes}&quot;
                            </Text>
                          )}
                        </Td>
                        <Td borderColor={borderColor}>
                          <HStack spacing="6px">
                            <Icon as={MdEngineering} color="purple.500" />
                            <Text fontSize="12.5px" fontWeight="600" color={textColor}>
                              {b.mechanicName || 'Auto-Assign'}
                            </Text>
                          </HStack>
                        </Td>
                        <Td borderColor={borderColor}>{getStatusBadge(b.status)}</Td>
                        <Td borderColor={borderColor} textAlign="right">
                          <HStack spacing="6px" justify="flex-end">
                            {b.status === 'CONFIRMED' && (
                              <Button
                                size="xs"
                                colorScheme="purple"
                                leftIcon={<MdPlayArrow />}
                                onClick={() => handleUpdateStatus(b.id, 'IN_SERVICE')}
                              >
                                Mulai Servis
                              </Button>
                            )}
                            {b.status === 'IN_SERVICE' && (
                              <Button
                                size="xs"
                                colorScheme="green"
                                leftIcon={<MdDoneAll />}
                                onClick={() => handleUpdateStatus(b.id, 'COMPLETED')}
                              >
                                Selesai
                              </Button>
                            )}
                            {b.status === 'PENDING' && (
                              <Button
                                size="xs"
                                colorScheme="blue"
                                onClick={() => handleUpdateStatus(b.id, 'CONFIRMED')}
                              >
                                Konfirmasi
                              </Button>
                            )}
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </TabPanel>

            {/* Other tabs map to filtered lists cleanly */}
            {['2026-08-25', 'IN_SERVICE', 'CONFIRMED', 'COMPLETED'].map((filterKey, i) => (
              <TabPanel key={i} px="0">
                {/* Mobile */}
                <Box display={{ base: 'block', md: 'none' }}>
                  <VStack spacing="12px" align="stretch">
                    {bookings
                      .filter((b) => b.date === filterKey || b.status === filterKey)
                      .map((b) => (
                        <Box
                          key={b.id}
                          p="14px"
                          borderRadius="14px"
                          bg={boxBg}
                          border="1px solid"
                          borderColor={borderColor}
                        >
                          <Flex justify="space-between" align="center" mb="4px">
                            <Text fontSize="12.5px" fontWeight="700" color="brand.500">
                              {b.bookingNumber} • {b.time}
                            </Text>
                            {getStatusBadge(b.status)}
                          </Flex>
                          <Text fontSize="13px" fontWeight="700" color={textColor}>
                            {b.customerName} ({b.vehiclePlate})
                          </Text>
                          <Text fontSize="11.5px" color={textColorSecondary}>
                            {b.serviceName}
                          </Text>
                        </Box>
                      ))}
                  </VStack>
                </Box>

                {/* Desktop */}
                <Box display={{ base: 'none', md: 'block' }} overflowX="auto">
                  <Table variant="simple" color="gray.500">
                    <Thead>
                      <Tr>
                        <Th borderColor={borderColor}>BOOKING NO</Th>
                        <Th borderColor={borderColor}>CUSTOMER</Th>
                        <Th borderColor={borderColor}>KENDARAAN</Th>
                        <Th borderColor={borderColor}>PAKET</Th>
                        <Th borderColor={borderColor}>MEKANIK</Th>
                        <Th borderColor={borderColor}>STATUS</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {bookings
                        .filter((b) => b.date === filterKey || b.status === filterKey)
                        .map((b) => (
                          <Tr key={b.id}>
                            <Td borderColor={borderColor}>
                              <Text color={textColor} fontWeight="700">{b.bookingNumber}</Text>
                              <Text fontSize="11px" color="brand.500">{b.time}</Text>
                            </Td>
                            <Td borderColor={borderColor}>{b.customerName}</Td>
                            <Td borderColor={borderColor}>{b.vehicleModel} ({b.vehiclePlate})</Td>
                            <Td borderColor={borderColor}>{b.serviceName}</Td>
                            <Td borderColor={borderColor}>{b.mechanicName}</Td>
                            <Td borderColor={borderColor}>{getStatusBadge(b.status)}</Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Card>

      {/* Create Booking Drawer */}
      <Drawer isOpen={isOpen} placement="right" size={{ base: 'full', md: 'md' }} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue('white', 'navy.800')}>
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px solid" borderColor={borderColor}>
            Buat Janji Booking Servis Baru
          </DrawerHeader>

          <DrawerBody py="20px">
            <VStack spacing="16px" align="stretch">
              <FormControl isRequired>
                <FormLabel fontSize="12.5px">Nama Pelanggan</FormLabel>
                <Input
                  placeholder="e.g. Dimas Pratama"
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="12.5px">Nomor WhatsApp / HP</FormLabel>
                <Input
                  placeholder="e.g. 0812-3456-7890"
                  value={custPhone}
                  onChange={(e) => setCustPhone(e.target.value)}
                />
              </FormControl>

              <SimpleGrid columns={2} gap="12px">
                <FormControl isRequired>
                  <FormLabel fontSize="12.5px">Model Motor</FormLabel>
                  <Input
                    placeholder="e.g. Honda Vario 160"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="12.5px">Plat Nomor</FormLabel>
                  <Input
                    placeholder="e.g. N 1234 XX"
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                  />
                </FormControl>
              </SimpleGrid>

              <FormControl isRequired>
                <FormLabel fontSize="12.5px">Pilih Paket Layanan Servis</FormLabel>
                <Select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                >
                  {initialServices.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.name} (Rp {srv.price.toLocaleString('id-ID')} - {srv.estimatedDuration})
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel fontSize="12.5px">Pilih Mekanik Bertugas</FormLabel>
                <Select
                  value={mechanicId}
                  onChange={(e) => setMechanicId(e.target.value)}
                >
                  {initialMechanics.map((mech) => (
                    <option key={mech.id} value={mech.id}>
                      {mech.name} ({mech.specialization}) - {mech.status}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <SimpleGrid columns={2} gap="12px">
                <FormControl isRequired>
                  <FormLabel fontSize="12.5px">Tanggal Booking</FormLabel>
                  <Input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="12.5px">Jam Kedatangan</FormLabel>
                  <Select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                  >
                    <option value="08:30 WIB">08:30 WIB</option>
                    <option value="09:00 WIB">09:00 WIB</option>
                    <option value="10:00 WIB">10:00 WIB</option>
                    <option value="11:00 WIB">11:00 WIB</option>
                    <option value="13:30 WIB">13:30 WIB</option>
                    <option value="14:30 WIB">14:30 WIB</option>
                    <option value="15:30 WIB">15:30 WIB</option>
                  </Select>
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel fontSize="12.5px">Keluhan Motor / Catatan Tambahan</FormLabel>
                <Textarea
                  rows={3}
                  placeholder="Gejala gredek, brebet, atau permintaan khusus ganti oli..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </FormControl>
            </VStack>
          </DrawerBody>

          <DrawerFooter borderTop="1px solid" borderColor={borderColor}>
            <Button variant="outline" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="purple" onClick={handleCreateBooking} leftIcon={<MdCheckCircle />}>
              Simpan Jadwal Booking
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
