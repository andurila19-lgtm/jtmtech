'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Button,
  VStack,
  HStack,
  Icon,
  Input,
  Textarea,
  useColorModeValue,
  useToast,
  Badge,
} from '@chakra-ui/react';
import {
  MdLocationOn,
  MdPhone,
  MdEmail,
  MdSchedule,
  MdSend,
} from 'react-icons/md';
import { IoLogoWhatsapp } from 'react-icons/io';
import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import { useStore } from 'contexts/StoreContext';

export default function ContactPage() {
  const { settings } = useStore();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const bgInput = useColorModeValue('secondaryGray.300', 'navy.900');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Pesan Anda Terkirim!',
      description: 'Customer service kami akan segera membalas via WhatsApp.',
      status: 'success',
      duration: 3000,
      position: 'top-right',
    });
    setName('');
    setPhone('');
    setMessage('');
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'navy.900')}>
      <PublicNavbar />

      {/* Header Banner */}
      <Box bg="navy.900" color="white" py={{ base: '40px', md: '60px' }} textAlign="center">
        <Container maxW="1280px">
          <Badge colorScheme="purple" px="10px" py="4px" borderRadius="full" mb="12px" fontSize="12px">
            PUSAT BANTUAN
          </Badge>
          <Heading as="h1" fontSize={{ base: '28px', md: '42px' }} fontWeight="900" mb="10px">
            Hubungi Bengkel Kami
          </Heading>
          <Text fontSize="15px" color="gray.300" maxW="600px" mx="auto">
            Punya pertanyaan mengenai suku cadang, konsultasi kerusakan mesin, atau reservasi jadwal? Tim kami siap melayani Anda.
          </Text>
        </Container>
      </Box>

      <Container maxW="1280px" py="50px">
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="40px">
          {/* Left: Contact Info */}
          <Box>
            <Heading as="h2" fontSize="22px" fontWeight="800" color={textColor} mb="16px">
              Informasi Kontak Resmi
            </Heading>
            <Text fontSize="14px" color={textColorSecondary} mb="26px" lineHeight="1.7">
              Silakan hubungi kami melalui saluran komunikasi di bawah atau kunjungi langsung workshop kami di Kota Malang.
            </Text>

            <VStack spacing="18px" align="stretch" mb="30px">
              <HStack spacing="14px" p="14px" borderRadius="14px" bg={bgCard} border="1px solid" borderColor={borderColor}>
                <Icon as={MdLocationOn} w="26px" h="26px" color="red.500" />
                <Box>
                  <Text fontSize="12px" color={textColorSecondary} fontWeight="700">
                    Alamat Workshop
                  </Text>
                  <Text fontSize="14px" fontWeight="700" color={textColor}>
                    {settings.businessInfo.address}, {settings.businessInfo.city}, Jawa Timur
                  </Text>
                </Box>
              </HStack>

              <HStack spacing="14px" p="14px" borderRadius="14px" bg={bgCard} border="1px solid" borderColor={borderColor}>
                <Icon as={MdPhone} w="26px" h="26px" color="green.500" />
                <Box>
                  <Text fontSize="12px" color={textColorSecondary} fontWeight="700">
                    Telepon & WhatsApp
                  </Text>
                  <Text fontSize="14px" fontWeight="700" color={textColor}>
                    {settings.businessInfo.phone} ({settings.businessInfo.whatsapp})
                  </Text>
                </Box>
              </HStack>

              <HStack spacing="14px" p="14px" borderRadius="14px" bg={bgCard} border="1px solid" borderColor={borderColor}>
                <Icon as={MdEmail} w="26px" h="26px" color="purple.500" />
                <Box>
                  <Text fontSize="12px" color={textColorSecondary} fontWeight="700">
                    Email Resmi
                  </Text>
                  <Text fontSize="14px" fontWeight="700" color={textColor}>
                    {settings.businessInfo.email}
                  </Text>
                </Box>
              </HStack>

              <HStack spacing="14px" p="14px" borderRadius="14px" bg={bgCard} border="1px solid" borderColor={borderColor}>
                <Icon as={MdSchedule} w="26px" h="26px" color="orange.500" />
                <Box>
                  <Text fontSize="12px" color={textColorSecondary} fontWeight="700">
                    Jam Operasional
                  </Text>
                  <Text fontSize="14px" fontWeight="700" color={textColor}>
                    Senin - Jumat: {settings.businessInfo.openingHours.weekdays} | Sabtu: {settings.businessInfo.openingHours.saturday}
                  </Text>
                </Box>
              </HStack>
            </VStack>

            <a
              href={`https://wa.me/${settings.businessInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20Bengkel%20JTM%20Tech`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button colorScheme="whatsapp" size="lg" leftIcon={<IoLogoWhatsapp />} borderRadius="14px" w="100%">
                Chat Langsung via WhatsApp
              </Button>
            </a>
          </Box>

          {/* Right: Message Form */}
          <Box p="26px" borderRadius="24px" bg={bgCard} border="1px solid" borderColor={borderColor} boxShadow="md">
            <Heading as="h3" fontSize="20px" fontWeight="800" color={textColor} mb="8px">
              Kirim Pesan / Pertanyaan
            </Heading>
            <Text fontSize="13px" color={textColorSecondary} mb="20px">
              Isi formulir berikut dan staf kami akan merespon pertanyaan Anda dalam waktu kurang dari 1 jam kerja.
            </Text>

            <form onSubmit={handleSubmit}>
              <VStack spacing="16px" align="stretch">
                <Box>
                  <Text fontSize="13px" fontWeight="700" color={textColor} mb="4px">
                    Nama Anda
                  </Text>
                  <Input
                    placeholder="e.g. Budi Santoso"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    bg={bgInput}
                    borderRadius="10px"
                    required
                  />
                </Box>

                <Box>
                  <Text fontSize="13px" fontWeight="700" color={textColor} mb="4px">
                    Nomor WhatsApp / HP
                  </Text>
                  <Input
                    placeholder="e.g. 08123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    bg={bgInput}
                    borderRadius="10px"
                    required
                  />
                </Box>

                <Box>
                  <Text fontSize="13px" fontWeight="700" color={textColor} mb="4px">
                    Pesan / Keluhan Motor Anda
                  </Text>
                  <Textarea
                    placeholder="Tuliskan pertanyaan suku cadang atau konsultasi masalah motor Anda..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    bg={bgInput}
                    borderRadius="10px"
                    rows={4}
                    required
                  />
                </Box>

                <Button
                  type="submit"
                  colorScheme="purple"
                  size="lg"
                  borderRadius="12px"
                  h="48px"
                  fontWeight="800"
                  leftIcon={<MdSend />}
                >
                  Kirimkan Pesan
                </Button>
              </VStack>
            </form>
          </Box>
        </SimpleGrid>
      </Container>

      <PublicFooter />
    </Box>
  );
}
