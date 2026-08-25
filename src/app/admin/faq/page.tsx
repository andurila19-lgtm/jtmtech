'use client';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { useState } from 'react';
import { MdQuiz, MdAdd } from 'react-icons/md';
import { initialFAQs } from 'services/mockData';
import { FAQ } from 'types/workshop';

export default function FAQPage() {
  const [faqs] = useState<FAQ[]>(initialFAQs);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const itemBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const itemHoverBg = useColorModeValue('secondaryGray.400', 'whiteAlpha.200');
  const toast = useToast();

  return (
    <Box pt={{ base: '10px', md: '70px', xl: '70px' }} pb="30px">
      <Flex justify="space-between" align="center" mb="16px" flexWrap="wrap" gap="10px">
        <Box>
          <HStack spacing="8px">
            <Icon as={MdQuiz} color="brand.500" w="24px" h="24px" />
            <Text fontSize="22px" fontWeight="800" color={textColor}>
              Tanya Jawab & FAQ
            </Text>
            <Badge colorScheme="purple" borderRadius="full">
              {faqs.length} FAQ
            </Badge>
          </HStack>
          <Text fontSize="13px" color={textColorSecondary}>
            Pusat bantuan & SOP bengkel terkait garansi sparepart, booking, & servis.
          </Text>
        </Box>

        <Button
          colorScheme="purple"
          leftIcon={<MdAdd />}
          borderRadius="12px"
          w={{ base: '100%', sm: 'auto' }}
          h="44px"
          onClick={() =>
            toast({
              title: 'Tambah FAQ Baru',
              description: 'Form tambah FAQ siap digunakan.',
              status: 'info',
              duration: 2500,
            })
          }
        >
          + Tambah FAQ
        </Button>
      </Flex>

      <Card p={{ base: '12px', md: '20px' }}>
        <Accordion allowMultiple defaultIndex={[0]}>
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} border="none" mb="12px">
              <h2>
                <AccordionButton
                  p="14px"
                  bg={itemBg}
                  borderRadius="12px"
                  _hover={{ bg: itemHoverBg }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    <HStack spacing="8px">
                      <Badge colorScheme="purple">{faq.category}</Badge>
                      <Text fontSize="14px" fontWeight="700" color={textColor}>
                        {faq.question}
                      </Text>
                    </HStack>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} px="16px" pt="12px">
                <Text fontSize="13px" color={textColorSecondary} lineHeight="160%">
                  {faq.answer}
                </Text>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </Box>
  );
}
