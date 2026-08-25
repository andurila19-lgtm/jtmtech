'use client';

import React, { useState, Suspense } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Flex,
  HStack,
  VStack,
  Icon,
  Input,
  Textarea,
  Select,
  useColorModeValue,
  useToast,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Badge,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import {
  MdBuild,
  MdCalendarToday,
  MdSchedule,
  MdCheckCircle,
  MdTwoWheeler,
  MdPerson,
  MdChevronRight,
  MdArrowForward,
} from 'react-icons/md';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import { useStore } from 'contexts/StoreContext';

function BookingPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedServiceId = searchParams.get('serviceId');

  const { services, vehicles, customer, createBooking, addVehicle } = useStore();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const bgInput = useColorModeValue('secondaryGray.300', 'navy.900');
  const serviceActiveBg = useColorModeValue('brand.50', 'navy.900');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  // Form State
  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicles[0]?.id || 'NEW');
  const [motorcycleBrand, setMotorcycleBrand] = useState('Honda');
  const [motorcycleModel, setMotorcycleModel] = useState('Honda Vario 160');
  const [motorcycleYear, setMotorcycleYear] = useState('2024');
  const [licensePlate, setLicensePlate] = useState('N 1234 XX');

  const [selectedServiceId, setSelectedServiceId] = useState(preselectedServiceId || services[0]?.id);
  const [bookingDate, setBookingDate] = useState(
    new Date(Date.now() + 86400000).toISOString().slice(0, 10)
  );
  const [bookingTime, setBookingTime] = useState('09:00');
  const [notes, setNotes] = useState('');

  const [customerName, setCustomerName] = useState(customer?.name || 'Ahmad Fauzi');
  const [customerPhone, setCustomerPhone] = useState(customer?.phone || '081234567890');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableSlots = [
    { time: '09:00', available: true },
    { time: '10:30', available: true },
    { time: '13:00', available: false },
    { time: '14:30', available: true },
    { time: '16:00', available: true },
  ];

  const currentService = services.find((s) => s.id === selectedServiceId) || services[0];

  const handleSubmitBooking = () => {
    if (!customerName || !customerPhone) {
      toast({
        title: 'Nama dan Nomor WhatsApp Wajib Diisi',
        status: 'warning',
      });
      return;
    }

    setIsSubmitting(true);

    let vModel = motorcycleModel;
    let vPlate = licensePlate;
    let vYear = parseInt(motorcycleYear) || 2024;

    if (selectedVehicleId !== 'NEW') {
      const saved = vehicles.find((v) => v.id === selectedVehicleId);
      if (saved) {
        vModel = saved.model;
        vPlate = saved.licensePlate;
        vYear = saved.year;
      }
    } else {
      // Save newly inputted vehicle to customer garage
      addVehicle({
        brand: motorcycleBrand,
        model: motorcycleModel,
        year: vYear,
        licensePlate: vPlate,
        engineType: 'Injeksi',
      });
    }

    const newBooking = createBooking({
      vehicleId: selectedVehicleId === 'NEW' ? `veh-${Date.now()}` : selectedVehicleId,
      vehicleModel: vModel,
      vehiclePlate: vPlate,
      vehicleYear: vYear,
      serviceId: currentService.id,
      serviceName: currentService.name,
      date: bookingDate,
      time: bookingTime,
      notes,
      estimatedCost: currentService.price,
      customerName,
      customerPhone,
      customerEmail: customer?.email,
    });

    toast({
      title: 'Booking Servis Berhasil Didaftarkan!',
      description: `Nomor antrean ${newBooking.bookingNumber}. Sampai jumpa di bengkel!`,
      status: 'success',
      duration: 3500,
      position: 'top-right',
    });

    router.push(`/booking/success?id=${newBooking.id}`);
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'navy.900')}>
      <PublicNavbar />

      <Container maxW="1280px" py="30px">
        {/* Breadcrumb */}
        <Breadcrumb spacing="8px" separator={<MdChevronRight color="gray.500" />} fontSize="13px" mb="20px">
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/">
              Beranda
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/services">
              Layanan
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="brand.500" fontWeight="700">
              Booking Servis Online
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Heading as="h1" fontSize={{ base: '24px', md: '32px' }} fontWeight="900" color={textColor} mb="8px">
          Form Pendaftaran Servis Motor
        </Heading>
        <Text fontSize="14px" color={textColorSecondary} mb="28px">
          Pilih motor, paket layanan, dan tentukan waktu kedatangan Anda tanpa perlu antre di bengkel.
        </Text>

        <SimpleGrid columns={{ base: 1, lg: 3 }} gap="30px" alignItems="flex-start">
          {/* Main Wizard Form (2 Cols) */}
          <Box gridColumn={{ base: 'span 1', lg: 'span 2' }}>
            <VStack spacing="24px" align="stretch">
              {/* Step 1: Vehicle Selection */}
              <Box p="22px" borderRadius="20px" bg={bgCard} border="1px solid" borderColor={borderColor}>
                <HStack spacing="10px" mb="16px">
                  <Box
                    w="28px"
                    h="28px"
                    borderRadius="full"
                    bg="brand.500"
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="800"
                    fontSize="13px"
                  >
                    1
                  </Box>
                  <Heading as="h3" fontSize="16px" fontWeight="800" color={textColor}>
                    Pilih Kendaraan / Motor
                  </Heading>
                </HStack>

                {vehicles.length > 0 && (
                  <Box mb="16px">
                    <Text fontSize="12.5px" fontWeight="700" color={textColorSecondary} mb="6px">
                      Gunakan Motor Tersimpan di Akun:
                    </Text>
                    <RadioGroup value={selectedVehicleId} onChange={(val) => setSelectedVehicleId(val)}>
                      <Stack spacing="8px">
                        {vehicles.map((v) => (
                          <Box
                            key={v.id}
                            p="12px"
                            borderRadius="12px"
                            border="2px solid"
                            borderColor={selectedVehicleId === v.id ? 'brand.500' : borderColor}
                            cursor="pointer"
                            onClick={() => setSelectedVehicleId(v.id)}
                          >
                            <Radio value={v.id} colorScheme="purple">
                              <HStack spacing="8px" ml="6px">
                                <Icon as={MdTwoWheeler} color="brand.500" />
                                <Text fontSize="13.5px" fontWeight="700" color={textColor}>
                                  {v.model} ({v.year}) — Plat {v.licensePlate}
                                </Text>
                              </HStack>
                            </Radio>
                          </Box>
                        ))}
                        <Box
                          p="12px"
                          borderRadius="12px"
                          border="2px solid"
                          borderColor={selectedVehicleId === 'NEW' ? 'brand.500' : borderColor}
                          cursor="pointer"
                          onClick={() => setSelectedVehicleId('NEW')}
                        >
                          <Radio value="NEW" colorScheme="purple">
                            <Text fontSize="13.5px" fontWeight="700" color={textColor} ml="6px">
                              + Gunakan / Daftarkan Motor Baru Lainnya
                            </Text>
                          </Radio>
                        </Box>
                      </Stack>
                    </RadioGroup>
                  </Box>
                )}

                {/* Form for new vehicle if selected */}
                {selectedVehicleId === 'NEW' && (
                  <SimpleGrid columns={{ base: 1, sm: 2 }} gap="14px" pt="10px">
                    <Box>
                      <Text fontSize="12.5px" fontWeight="700" color={textColor} mb="4px">
                        Merk Motor
                      </Text>
                      <Select
                        value={motorcycleBrand}
                        onChange={(e) => setMotorcycleBrand(e.target.value)}
                        bg={bgInput}
                        borderRadius="10px"
                      >
                        <option value="Honda">Honda</option>
                        <option value="Yamaha">Yamaha</option>
                        <option value="Kawasaki">Kawasaki</option>
                        <option value="Suzuki">Suzuki</option>
                        <option value="Vespa">Vespa</option>
                      </Select>
                    </Box>

                    <Box>
                      <Text fontSize="12.5px" fontWeight="700" color={textColor} mb="4px">
                        Model & Tipe Motor
                      </Text>
                      <Input
                        value={motorcycleModel}
                        onChange={(e) => setMotorcycleModel(e.target.value)}
                        placeholder="e.g. Vario 160, NMAX, ZX25R"
                        bg={bgInput}
                        borderRadius="10px"
                      />
                    </Box>

                    <Box>
                      <Text fontSize="12.5px" fontWeight="700" color={textColor} mb="4px">
                        Tahun Pembuatan
                      </Text>
                      <Input
                        value={motorcycleYear}
                        onChange={(e) => setMotorcycleYear(e.target.value)}
                        placeholder="2024"
                        bg={bgInput}
                        borderRadius="10px"
                      />
                    </Box>

                    <Box>
                      <Text fontSize="12.5px" fontWeight="700" color={textColor} mb="4px">
                        Nomor Polisi (Plat Nomor)
                      </Text>
                      <Input
                        value={licensePlate}
                        onChange={(e) => setLicensePlate(e.target.value)}
                        placeholder="N 1234 XX"
                        bg={bgInput}
                        borderRadius="10px"
                        textTransform="uppercase"
                      />
                    </Box>
                  </SimpleGrid>
                )}
              </Box>

              {/* Step 2: Service Selection */}
              <Box p="22px" borderRadius="20px" bg={bgCard} border="1px solid" borderColor={borderColor}>
                <HStack spacing="10px" mb="16px">
                  <Box
                    w="28px"
                    h="28px"
                    borderRadius="full"
                    bg="brand.500"
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="800"
                    fontSize="13px"
                  >
                    2
                  </Box>
                  <Heading as="h3" fontSize="16px" fontWeight="800" color={textColor}>
                    Pilih Paket Servis
                  </Heading>
                </HStack>

                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="12px">
                  {services.map((srv) => (
                    <Box
                      key={srv.id}
                      p="14px"
                      borderRadius="14px"
                      border="2px solid"
                      borderColor={selectedServiceId === srv.id ? 'brand.500' : borderColor}
                      bg={selectedServiceId === srv.id ? serviceActiveBg : bgCard}
                      cursor="pointer"
                      onClick={() => setSelectedServiceId(srv.id)}
                      transition="0.2s"
                    >
                      <Flex justify="space-between" align="flex-start" mb="4px">
                        <Text fontSize="14px" fontWeight="800" color={textColor}>
                          {srv.name}
                        </Text>
                        <Badge colorScheme="purple" fontSize="10px">
                          {srv.estimatedDuration}
                        </Badge>
                      </Flex>
                      <Text fontSize="12px" color={textColorSecondary} noOfLines={2} mb="8px">
                        {srv.description}
                      </Text>
                      <Text fontSize="14px" fontWeight="900" color="brand.500">
                        Rp {srv.price.toLocaleString('id-ID')}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>

              {/* Step 3: Date and Time Slot */}
              <Box p="22px" borderRadius="20px" bg={bgCard} border="1px solid" borderColor={borderColor}>
                <HStack spacing="10px" mb="16px">
                  <Box
                    w="28px"
                    h="28px"
                    borderRadius="full"
                    bg="brand.500"
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="800"
                    fontSize="13px"
                  >
                    3
                  </Box>
                  <Heading as="h3" fontSize="16px" fontWeight="800" color={textColor}>
                    Pilih Tanggal & Jam Kedatangan
                  </Heading>
                </HStack>

                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="14px" mb="16px">
                  <Box>
                    <Text fontSize="12.5px" fontWeight="700" color={textColor} mb="4px">
                      Tanggal Kedatangan
                    </Text>
                    <Input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      bg={bgInput}
                      borderRadius="10px"
                    />
                  </Box>

                  <Box>
                    <Text fontSize="12.5px" fontWeight="700" color={textColor} mb="4px">
                      Slot Jam Pit Bengkel
                    </Text>
                    <HStack spacing="8px" flexWrap="wrap">
                      {availableSlots.map((slot) => (
                        <Button
                          key={slot.time}
                          size="sm"
                          variant={bookingTime === slot.time ? 'solid' : 'outline'}
                          colorScheme="purple"
                          isDisabled={!slot.available}
                          onClick={() => setBookingTime(slot.time)}
                          borderRadius="8px"
                          fontSize="12.5px"
                        >
                          {slot.time} {slot.available ? '' : '(Penuh)'}
                        </Button>
                      ))}
                    </HStack>
                  </Box>
                </SimpleGrid>

                <Box>
                  <Text fontSize="12.5px" fontWeight="700" color={textColor} mb="4px">
                    Catatan Keluhan Motor (Opsional):
                  </Text>
                  <Textarea
                    placeholder="Contoh: Bunyi gredek saat tarikan awal, tarikan bawah brebet..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    bg={bgInput}
                    borderRadius="10px"
                    rows={2}
                  />
                </Box>
              </Box>

              {/* Step 4: Customer Details */}
              <Box p="22px" borderRadius="20px" bg={bgCard} border="1px solid" borderColor={borderColor}>
                <HStack spacing="10px" mb="16px">
                  <Box
                    w="28px"
                    h="28px"
                    borderRadius="full"
                    bg="brand.500"
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="800"
                    fontSize="13px"
                  >
                    4
                  </Box>
                  <Heading as="h3" fontSize="16px" fontWeight="800" color={textColor}>
                    Informasi Kontak Pemilik
                  </Heading>
                </HStack>

                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="14px">
                  <Box>
                    <Text fontSize="12.5px" fontWeight="700" color={textColor} mb="4px">
                      Nama Pemilik
                    </Text>
                    <Input
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      bg={bgInput}
                      borderRadius="10px"
                    />
                  </Box>
                  <Box>
                    <Text fontSize="12.5px" fontWeight="700" color={textColor} mb="4px">
                      Nomor WhatsApp (Untuk Notifikasi Antrean)
                    </Text>
                    <Input
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      bg={bgInput}
                      borderRadius="10px"
                    />
                  </Box>
                </SimpleGrid>
              </Box>
            </VStack>
          </Box>

          {/* Right Column: Booking Summary Card (1 Col) */}
          <Box>
            <Box
              p="24px"
              borderRadius="24px"
              bg={bgCard}
              border="2px solid"
              borderColor="brand.500"
              boxShadow="xl"
              position="sticky"
              top="100px"
            >
              <Heading as="h3" fontSize="18px" fontWeight="800" color={textColor} mb="14px">
                Ringkasan Booking
              </Heading>

              <VStack spacing="10px" align="stretch" fontSize="13px" mb="20px">
                <Flex justify="space-between">
                  <Text color={textColorSecondary}>Paket Servis:</Text>
                  <Text fontWeight="800" color={textColor}>{currentService.name}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color={textColorSecondary}>Estimasi Waktu:</Text>
                  <Text fontWeight="700" color={textColor}>{currentService.estimatedDuration}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color={textColorSecondary}>Jadwal Kedatangan:</Text>
                  <Text fontWeight="800" color="brand.500">
                    {bookingDate} ({bookingTime} WIB)
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color={textColorSecondary}>Kendaraan:</Text>
                  <Text fontWeight="700" color={textColor}>
                    {selectedVehicleId === 'NEW' ? motorcycleModel : vehicles.find((v) => v.id === selectedVehicleId)?.model}
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color={textColorSecondary}>Plat Nomor:</Text>
                  <Badge colorScheme="purple">
                    {selectedVehicleId === 'NEW' ? licensePlate : vehicles.find((v) => v.id === selectedVehicleId)?.licensePlate}
                  </Badge>
                </Flex>
              </VStack>

              <Box p="14px" borderRadius="12px" bg={useColorModeValue('gray.50', 'navy.900')} mb="20px">
                <Flex justify="space-between" align="baseline">
                  <Text fontSize="13px" color={textColorSecondary}>
                    Estimasi Biaya Jasa:
                  </Text>
                  <Text fontSize="22px" fontWeight="900" color="brand.500">
                    Rp {currentService.price.toLocaleString('id-ID')}
                  </Text>
                </Flex>
              </Box>

              <Button
                w="100%"
                size="lg"
                colorScheme="purple"
                h="52px"
                borderRadius="14px"
                fontWeight="800"
                leftIcon={<MdCheckCircle />}
                onClick={handleSubmitBooking}
                isLoading={isSubmitting}
                boxShadow="0 4px 16px rgba(66, 42, 251, 0.3)"
              >
                Konfirmasi Booking Servis
              </Button>

              <Text fontSize="11px" color="gray.400" textAlign="center" mt="12px">
                Pembayaran dapat dilakukan setelah servis selesai langsung di kasir bengkel atau via QRIS.
              </Text>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>

      <PublicFooter />
    </Box>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<Box minH="100vh" />}>
      <BookingPageInner />
    </Suspense>
  );
}
