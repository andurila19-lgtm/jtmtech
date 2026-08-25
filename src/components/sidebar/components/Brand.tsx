'use client';

// Chakra imports
import { Flex, HStack, Icon, Text, useColorModeValue, Badge, Box } from '@chakra-ui/react';
import { MdSpeed, MdBikeScooter } from 'react-icons/md';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
  const brandColor = useColorModeValue('brand.500', 'brand.400');
  const textColor = useColorModeValue('navy.700', 'white');
  const tagBg = useColorModeValue('brand.50', 'whiteAlpha.200');

  return (
    <Flex alignItems="center" flexDirection="column" px="20px">
      <HStack spacing="10px" my="20px" w="100%" justify="flex-start">
        <Flex
          w="40px"
          h="40px"
          bg="linear-gradient(135deg, #4318FF 0%, #868CFF 100%)"
          borderRadius="12px"
          align="center"
          justify="center"
          boxShadow="0px 8px 16px rgba(67, 24, 255, 0.25)"
        >
          <Icon as={MdSpeed} color="white" w="24px" h="24px" />
        </Flex>
        <Box>
          <HStack spacing="6px">
            <Text color={textColor} fontSize="17px" fontWeight="800" letterSpacing="-0.5px">
              JTM TECH
            </Text>
            <Badge colorScheme="purple" fontSize="9px" px="5px" borderRadius="4px">
              v3.0
            </Badge>
          </HStack>
          <Text color="gray.400" fontSize="11px" fontWeight="600" letterSpacing="0.2px">
            MotoWorkshop & Store
          </Text>
        </Box>
      </HStack>
      <HSeparator mb="14px" />
    </Flex>
  );
}

export default SidebarBrand;
