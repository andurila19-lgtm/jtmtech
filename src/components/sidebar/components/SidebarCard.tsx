'use client';

import {
  Box,
  Flex,
  HStack,
  Icon,
  Text,
  Badge,
  useColorModeValue,
  Progress,
} from '@chakra-ui/react';
import { MdEngineering, MdCircle } from 'react-icons/md';

export default function SidebarDocs() {
  const cardBg = useColorModeValue('secondaryGray.300', 'navy.700');
  const textColor = useColorModeValue('navy.700', 'white');
  const secondaryText = useColorModeValue('secondaryGray.600', 'secondaryGray.400');

  return (
    <Box
      bg={cardBg}
      borderRadius="18px"
      p="16px"
      me="10px"
      border="1px solid"
      borderColor={useColorModeValue('gray.100', 'whiteAlpha.100')}
    >
      <Flex justify="space-between" align="center" mb="10px">
        <HStack spacing="6px">
          <Icon as={MdCircle} color="green.400" w="8px" h="8px" />
          <Text fontSize="12px" fontWeight="700" color={textColor}>
            Status Bengkel
          </Text>
        </HStack>
        <Badge colorScheme="green" fontSize="10px" borderRadius="full">
          Buka
        </Badge>
      </Flex>

      <Text fontSize="11.5px" color={secondaryText} mb="12px">
        Mekanik Siap: <strong>2/4 Standby</strong>
      </Text>

      <Box mb="10px">
        <Flex justify="space-between" fontSize="10.5px" color={secondaryText} mb="4px">
          <Text>Kapasitas Pit Servis</Text>
          <Text fontWeight="700">75% (3/4 Pit)</Text>
        </Flex>
        <Progress value={75} size="xs" colorScheme="purple" borderRadius="full" />
      </Box>

      <Text fontSize="10px" color="gray.400" textAlign="center">
        Shift Operasional: 08:00 - 17:00 WIB
      </Text>
    </Box>
  );
}
