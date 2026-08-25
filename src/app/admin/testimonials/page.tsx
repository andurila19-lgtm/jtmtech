'use client';

import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { useState } from 'react';
import { MdRateReview, MdStar, MdCheckCircle, MdCancel } from 'react-icons/md';
import { initialTestimonials } from 'services/mockData';
import { Testimonial } from 'types/workshop';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const toast = useToast();

  const handleUpdateStatus = (id: string, status: 'APPROVED' | 'REJECTED') => {
    setTestimonials(
      testimonials.map((t) => (t.id === id ? { ...t, status } : t)),
    );
    toast({
      title: `Testimoni ${status === 'APPROVED' ? 'Disetujui' : 'Ditolak'}`,
      status: status === 'APPROVED' ? 'success' : 'info',
      duration: 2500,
    });
  };

  return (
    <Box pt={{ base: '10px', md: '70px', xl: '70px' }} pb="30px">
      <Flex justify="space-between" align="center" mb="16px" flexWrap="wrap" gap="10px">
        <Box>
          <HStack spacing="8px">
            <Icon as={MdRateReview} color="brand.500" w="24px" h="24px" />
            <Text fontSize="22px" fontWeight="800" color={textColor}>
              Ulasan Pelanggan
            </Text>
            <Badge colorScheme="purple" borderRadius="full">
              {testimonials.length} Ulasan
            </Badge>
          </HStack>
          <Text fontSize="13px" color={textColorSecondary}>
            Moderasi ulasan dan testimoni kepuasan pelanggan bengkel.
          </Text>
        </Box>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap="16px">
        {testimonials.map((t) => (
          <Card key={t.id} p="16px">
            <Flex justify="space-between" align="flex-start" mb="12px">
              <HStack spacing="10px">
                <Avatar size="sm" name={t.customerName} />
                <Box>
                  <Text fontSize="13.5px" fontWeight="700" color={textColor}>
                    {t.customerName}
                  </Text>
                  <Text fontSize="11px" color="gray.400">
                    {t.vehicle} ({t.serviceUsed})
                  </Text>
                </Box>
              </HStack>
              <Badge colorScheme={t.status === 'APPROVED' ? 'green' : 'orange'} fontSize="9.5px">
                {t.status === 'APPROVED' ? 'DISETUJUI' : 'MODERASI'}
              </Badge>
            </Flex>

            <HStack spacing="2px" mb="10px">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Icon key={i} as={MdStar} color="yellow.400" />
              ))}
            </HStack>

            <Text fontSize="12.5px" color={textColorSecondary} fontStyle="italic" mb="14px">
              &quot;{t.comment}&quot;
            </Text>

            <Flex justify="space-between" align="center" pt="10px" borderTop="1px solid" borderColor={borderColor}>
              <Text fontSize="11px" color="gray.400">
                {t.date}
              </Text>
              <HStack spacing="6px">
                {t.status !== 'APPROVED' && (
                  <Button
                    size="sm"
                    colorScheme="green"
                    leftIcon={<MdCheckCircle />}
                    h="36px"
                    onClick={() => handleUpdateStatus(t.id, 'APPROVED')}
                  >
                    Setujui Ulasan
                  </Button>
                )}
                {t.status === 'APPROVED' && (
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    leftIcon={<MdCancel />}
                    h="36px"
                    onClick={() => handleUpdateStatus(t.id, 'REJECTED')}
                  >
                    Sembunyikan
                  </Button>
                )}
              </HStack>
            </Flex>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}
