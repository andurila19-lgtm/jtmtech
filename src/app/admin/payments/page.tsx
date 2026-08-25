'use client';

import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
  MdCheckCircle,
  MdCancel,
  MdPayment,
  MdQrCode2,
  MdAccountBalance,
  MdVisibility,
} from 'react-icons/md';
import { initialPayments } from 'services/mockData';
import { Payment } from 'types/workshop';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isRejectModal, setIsRejectModal] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const boxBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const spotlightBg = useColorModeValue('orange.50', 'whiteAlpha.100');
  const itemCardBg = useColorModeValue('white', 'navy.800');
  const hoverBg = useColorModeValue('gray.50', 'whiteAlpha.50');

  const pendingVerificationList = payments.filter(
    (p) => p.paymentStatus === 'WAITING_VERIFICATION',
  );

  const handleInspect = (pay: Payment) => {
    setSelectedPayment(pay);
    setIsRejectModal(false);
    onOpen();
  };

  const handleApprove = (payId: string) => {
    setPayments(
      payments.map((p) =>
        p.id === payId
          ? {
              ...p,
              paymentStatus: 'PAID',
              verifiedBy: 'Ahmad Fauzi (Owner/Admin)',
              verifiedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
            }
          : p,
      ),
    );
    toast({
      title: 'Pembayaran Disetujui (Approved)',
      description: 'Status pembayaran diubah menjadi PAID dan pesanan otomatis diproses.',
      status: 'success',
      duration: 3000,
      position: 'top-right',
    });
    onClose();
  };

  const handleReject = () => {
    if (!selectedPayment) return;
    setPayments(
      payments.map((p) =>
        p.id === selectedPayment.id
          ? {
              ...p,
              paymentStatus: 'REJECTED',
              rejectionReason: rejectReason || 'Bukti transfer tidak valid / nominal tidak cocok',
              verifiedBy: 'Ahmad Fauzi (Owner/Admin)',
              verifiedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
            }
          : p,
      ),
    );
    toast({
      title: 'Pembayaran Ditolak (Rejected)',
      description: 'Notifikasi penolakan & alasan telah dikirimkan ke pelanggan.',
      status: 'warning',
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
            <Icon as={MdPayment} color="brand.500" w="24px" h="24px" />
            <Text fontSize="22px" fontWeight="800" color={textColor}>
              Verifikasi Pembayaran
            </Text>
            {pendingVerificationList.length > 0 && (
              <Badge colorScheme="orange" variant="solid" borderRadius="full">
                {pendingVerificationList.length} Perlu Verifikasi
              </Badge>
            )}
          </HStack>
          <Text fontSize="13px" color={textColorSecondary}>
            Verifikasi transfer bank (BCA, Mandiri, BRI) dan pantau mutasi QRIS & kasir.
          </Text>
        </Box>
      </Flex>

      {/* Pending Verification Spotlight */}
      {pendingVerificationList.length > 0 && (
        <Card p="20px" mb="24px" border="2px solid" borderColor="orange.400" bg={spotlightBg}>
          <HStack spacing="8px" mb="14px">
            <Icon as={MdAccountBalance} color="orange.500" w="22px" h="22px" />
            <Text fontSize="16px" fontWeight="800" color={textColor}>
              Antrian Verifikasi Bukti Transfer Manual ({pendingVerificationList.length})
            </Text>
          </HStack>

          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="16px">
            {pendingVerificationList.map((pay) => (
              <Box
                key={pay.id}
                p="16px"
                bg={itemCardBg}
                borderRadius="14px"
                boxShadow="sm"
                border="1px solid"
                borderColor={borderColor}
              >
                <Flex justify="space-between" align="center" mb="10px">
                  <Text fontSize="13px" fontWeight="700" color={textColor}>
                    {pay.orderNumber}
                  </Text>
                  <Badge colorScheme="orange">PERLU VERIFIKASI</Badge>
                </Flex>

                <HStack spacing="12px" mb="12px" align="center">
                  {pay.paymentProof?.imageUrl && (
                    <Image
                      src={pay.paymentProof.imageUrl}
                      alt="Struk Transfer"
                      w="60px"
                      h="60px"
                      borderRadius="8px"
                      objectFit="cover"
                      border="1px solid #eee"
                      cursor="pointer"
                      onClick={() => handleInspect(pay)}
                    />
                  )}
                  <Box>
                    <Text fontSize="12px" color="gray.500">Pelanggan:</Text>
                    <Text fontSize="13px" fontWeight="700" color={textColor}>{pay.customerName}</Text>
                    <Text fontSize="14px" fontWeight="800" color="brand.500" mt="2px">
                      Rp {pay.amount.toLocaleString('id-ID')}
                    </Text>
                  </Box>
                </HStack>

                <Text fontSize="11px" color="gray.400" mb="12px">
                  Rekening: {pay.paymentProof?.bankName} a.n {pay.paymentProof?.accountHolder}
                </Text>

                <HStack spacing="8px">
                  <Button
                    size="sm"
                    colorScheme="green"
                    leftIcon={<MdCheckCircle />}
                    w="50%"
                    onClick={() => handleApprove(pay.id)}
                  >
                    Setujui (Lunas)
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                    leftIcon={<MdCancel />}
                    w="50%"
                    onClick={() => {
                      setSelectedPayment(pay);
                      setIsRejectModal(true);
                      onOpen();
                    }}
                  >
                    Tolak
                  </Button>
                </HStack>
              </Box>
            ))}
          </SimpleGrid>
        </Card>
      )}

      {/* All Payments Container */}
      <Card p={{ base: '14px', md: '20px' }}>
        <Text fontSize="16px" fontWeight="700" color={textColor} mb="14px">
          Semua Riwayat Transaksi Pembayaran
        </Text>

        {/* MOBILE CARD VIEW (< md) */}
        <Box display={{ base: 'block', md: 'none' }}>
          <VStack spacing="12px" align="stretch">
            {payments.map((p) => (
              <Box
                key={p.id}
                p="14px"
                borderRadius="14px"
                bg={itemCardBg}
                border="1px solid"
                borderColor={borderColor}
              >
                <Flex justify="space-between" align="center" mb="6px">
                  <Text fontSize="13px" fontWeight="800" color="brand.500">
                    {p.orderNumber}
                  </Text>
                  <Badge
                    colorScheme={
                      p.paymentStatus === 'PAID'
                        ? 'green'
                        : p.paymentStatus === 'WAITING_VERIFICATION'
                        ? 'orange'
                        : 'red'
                    }
                  >
                    {p.paymentStatus === 'PAID'
                      ? 'LUNAS'
                      : p.paymentStatus === 'WAITING_VERIFICATION'
                      ? 'PERLU VERIFIKASI'
                      : p.paymentStatus === 'PENDING'
                      ? 'PENDING'
                      : 'DITOLAK'}
                  </Badge>
                </Flex>

                <Flex justify="space-between" align="flex-start" mb="8px">
                  <Box>
                    <Text fontSize="13.5px" fontWeight="700" color={textColor}>
                      {p.customerName}
                    </Text>
                    <HStack spacing="6px" mt="2px">
                      <Icon as={p.paymentMethod === 'QRIS' ? MdQrCode2 : MdAccountBalance} color="gray.400" />
                      <Text fontSize="11.5px" color={textColorSecondary}>
                        {p.paymentMethod} • {p.bankDestination || p.qrisRef || 'Kasir'}
                      </Text>
                    </HStack>
                    <Text fontSize="10.5px" color="gray.400" mt="2px">
                      {p.createdAt}
                    </Text>
                  </Box>
                  <Text fontSize="14px" fontWeight="800" color={textColor}>
                    Rp {p.amount.toLocaleString('id-ID')}
                  </Text>
                </Flex>

                {p.paymentProof?.imageUrl && (
                  <Button
                    size="sm"
                    w="100%"
                    variant="outline"
                    colorScheme="purple"
                    leftIcon={<MdVisibility />}
                    h="38px"
                    mt="4px"
                    onClick={() => handleInspect(p)}
                  >
                    Lihat Bukti Transfer
                  </Button>
                )}
              </Box>
            ))}
          </VStack>
        </Box>

        {/* DESKTOP TABLE VIEW (>= md) */}
        <Box display={{ base: 'none', md: 'block' }} overflowX="auto">
          <Table variant="simple" color="gray.500">
            <Thead>
              <Tr>
                <Th borderColor={borderColor} color="gray.400">NO TRANSAKSI & WAKTU</Th>
                <Th borderColor={borderColor} color="gray.400">PELANGGAN</Th>
                <Th borderColor={borderColor} color="gray.400">NOMINAL</Th>
                <Th borderColor={borderColor} color="gray.400">METODE</Th>
                <Th borderColor={borderColor} color="gray.400">DETAIL REKENING / QRIS</Th>
                <Th borderColor={borderColor} color="gray.400">STATUS</Th>
                <Th borderColor={borderColor} color="gray.400" textAlign="right">TINDAKAN</Th>
              </Tr>
            </Thead>
            <Tbody>
              {payments.map((p) => (
                <Tr key={p.id} _hover={{ bg: hoverBg }}>
                  <Td borderColor={borderColor}>
                    <Text color={textColor} fontSize="13px" fontWeight="700">
                      {p.orderNumber}
                    </Text>
                    <Text fontSize="11px" color="gray.400">
                      {p.createdAt}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text color={textColor} fontSize="13px" fontWeight="600">
                      {p.customerName}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text color={textColor} fontSize="13.5px" fontWeight="800">
                      Rp {p.amount.toLocaleString('id-ID')}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <HStack spacing="6px">
                      <Icon as={p.paymentMethod === 'QRIS' ? MdQrCode2 : MdAccountBalance} />
                      <Text fontSize="12.5px" fontWeight="600">{p.paymentMethod}</Text>
                    </HStack>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text fontSize="12px" color={textColorSecondary}>
                      {p.bankDestination || p.qrisRef || 'Tunai di Kasir'}
                    </Text>
                    {p.verifiedBy && (
                      <Text fontSize="10.5px" color="green.500">
                        Verifikasi: {p.verifiedBy}
                      </Text>
                    )}
                    {p.rejectionReason && (
                      <Text fontSize="10.5px" color="red.500">
                        Alasan Tolak: {p.rejectionReason}
                      </Text>
                    )}
                  </Td>
                  <Td borderColor={borderColor}>
                    <Badge
                      colorScheme={
                        p.paymentStatus === 'PAID'
                          ? 'green'
                          : p.paymentStatus === 'WAITING_VERIFICATION'
                          ? 'orange'
                          : 'red'
                      }
                    >
                      {p.paymentStatus === 'PAID'
                        ? 'LUNAS'
                        : p.paymentStatus === 'WAITING_VERIFICATION'
                        ? 'PERLU VERIFIKASI'
                        : p.paymentStatus === 'PENDING'
                        ? 'PENDING'
                        : 'DITOLAK'}
                    </Badge>
                  </Td>
                  <Td borderColor={borderColor} textAlign="right">
                    {p.paymentProof?.imageUrl && (
                      <Button
                        size="xs"
                        variant="outline"
                        leftIcon={<MdVisibility />}
                        onClick={() => handleInspect(p)}
                      >
                        Lihat Bukti
                      </Button>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Card>

      {/* Inspect / Reject Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: 'full', md: 'md' }}>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('white', 'navy.800')}>
          <ModalHeader>
            {isRejectModal ? 'Tolak Pembayaran' : 'Bukti Pembayaran Pelanggan'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedPayment && !isRejectModal && (
              <Box>
                {selectedPayment.paymentProof?.imageUrl && (
                  <Image
                    src={selectedPayment.paymentProof.imageUrl}
                    alt="Bukti Transfer"
                    w="100%"
                    maxH="320px"
                    objectFit="contain"
                    borderRadius="10px"
                    bg="#f0f0f0"
                    mb="14px"
                  />
                )}
                <Box p="12px" bg={boxBg} borderRadius="10px" fontSize="12.5px">
                  <Text>Nomor Pesanan: <strong>{selectedPayment.orderNumber}</strong></Text>
                  <Text>Pelanggan: <strong>{selectedPayment.customerName}</strong></Text>
                  <Text>Nominal: <strong>Rp {selectedPayment.amount.toLocaleString('id-ID')}</strong></Text>
                  <Text>Bank Pengirim: {selectedPayment.paymentProof?.bankName}</Text>
                  <Text>Nama Rekening: {selectedPayment.paymentProof?.accountHolder}</Text>
                  <Text>Waktu: {selectedPayment.paymentProof?.transferDate}</Text>
                  {selectedPayment.paymentProof?.notes && (
                    <Text mt="4px" fontStyle="italic">&quot;{selectedPayment.paymentProof.notes}&quot;</Text>
                  )}
                </Box>
              </Box>
            )}

            {selectedPayment && isRejectModal && (
              <Box>
                <Text fontSize="13px" color={textColor} mb="10px">
                  Berikan alasan penolakan pembayaran untuk pesanan <strong>{selectedPayment.orderNumber}</strong>:
                </Text>
                <Textarea
                  rows={3}
                  placeholder="Contoh: Nominal tidak sesuai, foto bukti buram, atau dana belum masuk mutasi rekening."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
              </Box>
            )}
          </ModalBody>

          <ModalFooter>
            {isRejectModal ? (
              <>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Batal
                </Button>
                <Button colorScheme="red" onClick={handleReject}>
                  Konfirmasi Tolak
                </Button>
              </>
            ) : (
              <>
                {selectedPayment?.paymentStatus === 'WAITING_VERIFICATION' && (
                  <>
                    <Button
                      colorScheme="red"
                      variant="outline"
                      mr={2}
                      onClick={() => setIsRejectModal(true)}
                    >
                      Tolak
                    </Button>
                    <Button
                      colorScheme="green"
                      onClick={() => selectedPayment && handleApprove(selectedPayment.id)}
                    >
                      Setujui (Lunas)
                    </Button>
                  </>
                )}
                {selectedPayment?.paymentStatus !== 'WAITING_VERIFICATION' && (
                  <Button variant="ghost" onClick={onClose}>
                    Tutup
                  </Button>
                )}
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
