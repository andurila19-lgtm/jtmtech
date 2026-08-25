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
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { useState } from 'react';
import {
  MdEngineering,
  MdStar,
  MdPhone,
  MdCheckCircle,
  MdCancel,
  MdBuild,
} from 'react-icons/md';
import { initialMechanics } from 'services/mockData';
import { Mechanic } from 'types/workshop';

export default function MechanicsPage() {
  const [mechanics, setMechanics] = useState<Mechanic[]>(initialMechanics);
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');

  const handleToggleStatus = (id: string, newStatus: 'AVAILABLE' | 'BUSY' | 'OFF_DUTY') => {
    setMechanics(
      mechanics.map((m) => (m.id === id ? { ...m, status: newStatus } : m)),
    );
    toast({
      title: 'Status Mekanik Diperbarui',
      description: `Status mekanik diubah menjadi ${newStatus}.`,
      status: 'info',
      duration: 2000,
      position: 'top-right',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return <Badge colorScheme="green" variant="solid">SIAP / STANDBY</Badge>;
      case 'BUSY':
        return <Badge colorScheme="orange" variant="solid">SEDANG SERVIS</Badge>;
      case 'OFF_DUTY':
        return <Badge colorScheme="gray" variant="solid">LIBUR / OFF</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Box pt={{ base: '10px', md: '70px', xl: '70px' }} pb="30px">
      <Flex justify="space-between" align="center" mb="16px" flexWrap="wrap" gap="10px">
        <Box>
          <HStack spacing="8px">
            <Icon as={MdEngineering} color="brand.500" w="24px" h="24px" />
            <Text fontSize="22px" fontWeight="800" color={textColor}>
              Daftar Mekanik & Shift
            </Text>
            <Badge colorScheme="purple" borderRadius="full">
              {mechanics.length} Teknisi
            </Badge>
          </HStack>
          <Text fontSize="13px" color={textColorSecondary}>
            Manajemen penugasan mekanik pit, status standby/sibuk, & performa teknisi.
          </Text>
        </Box>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="16px" mb="20px">
        {mechanics.map((mech) => (
          <Card key={mech.id} p="16px">
            <Flex justify="space-between" align="flex-start" mb="12px">
              <Avatar size="md" name={mech.name} bg="brand.500" color="white" />
              {getStatusBadge(mech.status)}
            </Flex>

            <Text fontSize="16px" fontWeight="800" color={textColor} mb="2px">
              {mech.name}
            </Text>
            <Text fontSize="12px" color="purple.500" fontWeight="600" mb="8px">
              {mech.specialization}
            </Text>

            <HStack spacing="4px" fontSize="12px" color="gray.500" mb="6px">
              <Icon as={MdPhone} />
              <Text>{mech.phone}</Text>
            </HStack>

            <Flex justify="space-between" align="center" fontSize="12px" mt="10px" pt="10px" borderTop="1px solid" borderColor={borderColor}>
              <HStack spacing="2px">
                <Icon as={MdStar} color="yellow.400" />
                <Text fontWeight="700" color={textColor}>{mech.rating.toFixed(2)}</Text>
              </HStack>
              <Text color={textColorSecondary}>
                <strong>{mech.activeBookingsCount}</strong> Servis Aktif
              </Text>
            </Flex>

            <HStack spacing="6px" mt="12px">
              <Button
                size="sm"
                w="100%"
                h="38px"
                variant={mech.status === 'AVAILABLE' ? 'solid' : 'outline'}
                colorScheme="green"
                onClick={() => handleToggleStatus(mech.id, 'AVAILABLE')}
              >
                Ready
              </Button>
              <Button
                size="sm"
                w="100%"
                h="38px"
                variant={mech.status === 'BUSY' ? 'solid' : 'outline'}
                colorScheme="orange"
                onClick={() => handleToggleStatus(mech.id, 'BUSY')}
              >
                Sibuk
              </Button>
              <Button
                size="sm"
                w="100%"
                h="38px"
                variant={mech.status === 'OFF_DUTY' ? 'solid' : 'outline'}
                colorScheme="gray"
                onClick={() => handleToggleStatus(mech.id, 'OFF_DUTY')}
              >
                Libur
              </Button>
            </HStack>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}
