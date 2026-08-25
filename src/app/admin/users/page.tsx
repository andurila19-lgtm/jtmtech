'use client';

import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { useState } from 'react';
import { MdManageAccounts, MdAdd, MdEdit, MdDelete, MdSecurity } from 'react-icons/md';
import Link from 'next/link';
import { initialUsers } from 'services/mockData';
import { RoleType, User } from 'types/workshop';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<RoleType>('ADMIN');
  const [status, setStatus] = useState<'ACTIVE' | 'INACTIVE'>('ACTIVE');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const hoverBg = useColorModeValue('gray.50', 'whiteAlpha.50');
  const cardBg = useColorModeValue('gray.50', 'navy.700');

  const handleOpenCreate = () => {
    setEditingUser(null);
    setName('');
    setEmail('');
    setPhone('');
    setRole('ADMIN');
    setStatus('ACTIVE');
    onOpen();
  };

  const handleOpenEdit = (u: User) => {
    setEditingUser(u);
    setName(u.name);
    setEmail(u.email);
    setPhone(u.phone);
    setRole(u.role);
    setStatus(u.status);
    onOpen();
  };

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      toast({
        title: 'Nama dan Email wajib diisi',
        status: 'error',
        duration: 2500,
      });
      return;
    }

    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id ? { ...u, name, email, phone, role, status } : u,
        ),
      );
      toast({
        title: 'Akun Pengguna Diperbarui',
        status: 'success',
        duration: 2500,
      });
    } else {
      const newU: User = {
        id: `usr-${Date.now()}`,
        name,
        email,
        phone,
        role,
        status,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setUsers([...users, newU]);
      toast({
        title: 'Pengguna Baru Terdaftar',
        status: 'success',
        duration: 2500,
      });
    }
    onClose();
  };

  const getRoleBadge = (r: RoleType) => {
    switch (r) {
      case 'OWNER':
        return <Badge colorScheme="red" variant="solid">PEMILIK (OWNER)</Badge>;
      case 'ADMIN':
        return <Badge colorScheme="purple" variant="solid">ADMINISTRATOR</Badge>;
      case 'CASHIER':
        return <Badge colorScheme="blue" variant="solid">KASIR TOKO</Badge>;
      case 'MECHANIC':
        return <Badge colorScheme="green" variant="solid">KEPALA MEKANIK</Badge>;
      case 'CONTENT_MANAGER':
        return <Badge colorScheme="orange" variant="solid">KONTEN CMS</Badge>;
      default:
        return <Badge>{r}</Badge>;
    }
  };

  return (
    <Box pt={{ base: '10px', md: '70px', xl: '70px' }} pb="30px">
      <Flex justify="space-between" align="center" mb="16px" flexWrap="wrap" gap="10px">
        <Box>
          <HStack spacing="8px">
            <Icon as={MdManageAccounts} color="brand.500" w="24px" h="24px" />
            <Text fontSize="22px" fontWeight="800" color={textColor}>
              Pengguna & Staf Bengkel
            </Text>
            <Badge colorScheme="purple" borderRadius="full">
              {users.length} Akun
            </Badge>
          </HStack>
          <Text fontSize="13px" color={textColorSecondary}>
            Kelola akun staf, kasir, mekanik, admin, & hak akses sistem.
          </Text>
        </Box>

        <HStack spacing="10px" w={{ base: '100%', sm: 'auto' }}>
          <Link href="/admin/roles" style={{ width: '100%' }}>
            <Button
              variant="outline"
              leftIcon={<MdSecurity />}
              borderRadius="12px"
              borderColor={useColorModeValue('gray.300', 'whiteAlpha.300')}
              w={{ base: '100%', sm: 'auto' }}
              h="44px"
            >
              Matriks RBAC
            </Button>
          </Link>
          <Button
            colorScheme="purple"
            leftIcon={<MdAdd />}
            onClick={handleOpenCreate}
            borderRadius="12px"
            w={{ base: '100%', sm: 'auto' }}
            h="44px"
          >
            + Tambah Staf
          </Button>
        </HStack>
      </Flex>

      <Card p={{ base: '14px', md: '20px' }}>
        {/* MOBILE CARD VIEW (< md) */}
        <Box display={{ base: 'block', md: 'none' }}>
          <VStack spacing="12px" align="stretch">
            {users.map((u) => (
              <Box
                key={u.id}
                p="14px"
                borderRadius="14px"
                bg={cardBg}
                border="1px solid"
                borderColor={borderColor}
              >
                <Flex justify="space-between" align="flex-start" mb="8px">
                  <HStack spacing="10px">
                    <Avatar size="sm" name={u.name} src={u.avatar} />
                    <Box>
                      <Text fontSize="14px" fontWeight="700" color={textColor}>
                        {u.name}
                      </Text>
                      <Text fontSize="11px" color={textColorSecondary}>
                        {u.email}
                      </Text>
                    </Box>
                  </HStack>
                  {getRoleBadge(u.role)}
                </Flex>

                <Flex justify="space-between" align="center" pt="8px" borderTop="1px solid" borderColor={borderColor}>
                  <Text fontSize="11.5px" color="gray.400">
                    Telp: {u.phone || '-'}
                  </Text>
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="purple"
                    leftIcon={<MdEdit />}
                    h="36px"
                    onClick={() => handleOpenEdit(u)}
                  >
                    Edit Akun
                  </Button>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* DESKTOP TABLE VIEW (>= md) */}
        <Box display={{ base: 'none', md: 'block' }} overflowX="auto">
          <Table variant="simple" color="gray.500">
            <Thead>
              <Tr>
                <Th borderColor={borderColor} color="gray.400">STAF & EMAIL</Th>
                <Th borderColor={borderColor} color="gray.400">ROLE / JABATAN</Th>
                <Th borderColor={borderColor} color="gray.400">NOMOR TELEPON</Th>
                <Th borderColor={borderColor} color="gray.400">LOGIN TERAKHIR</Th>
                <Th borderColor={borderColor} color="gray.400">STATUS</Th>
                <Th borderColor={borderColor} color="gray.400" textAlign="right">TINDAKAN</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((u) => (
                <Tr key={u.id} _hover={{ bg: hoverBg }}>
                  <Td borderColor={borderColor}>
                    <HStack spacing="10px">
                      <Avatar size="sm" name={u.name} src={u.avatar} />
                      <Box>
                        <Text color={textColor} fontSize="13.5px" fontWeight="700">
                          {u.name}
                        </Text>
                        <Text fontSize="11px" color="gray.400">
                          {u.email}
                        </Text>
                      </Box>
                    </HStack>
                  </Td>
                  <Td borderColor={borderColor}>{getRoleBadge(u.role)}</Td>
                  <Td borderColor={borderColor}>
                    <Text fontSize="12.5px" color={textColor}>
                      {u.phone}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Text fontSize="12px" color={textColorSecondary}>
                      {u.lastLogin || '-'}
                    </Text>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Badge colorScheme={u.status === 'ACTIVE' ? 'green' : 'gray'}>
                      {u.status}
                    </Badge>
                  </Td>
                  <Td borderColor={borderColor} textAlign="right">
                    <HStack spacing="6px" justify="flex-end">
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => handleOpenEdit(u)}
                        colorScheme="purple"
                      >
                        <Icon as={MdEdit} />
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Card>

      {/* Modal Add / Edit User */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: 'full', md: 'md' }}>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('white', 'navy.800')}>
          <ModalHeader>{editingUser ? 'Edit Akun Staf' : 'Tambah Staf Baru'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="14px" align="stretch">
              <FormControl isRequired>
                <FormLabel fontSize="12.5px">Nama Lengkap</FormLabel>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="12.5px">Email Login</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="12.5px">Nomor WhatsApp / Telepon</FormLabel>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="12.5px">Role / Hak Akses</FormLabel>
                <Select value={role} onChange={(e) => setRole(e.target.value as RoleType)}>
                  <option value="OWNER">OWNER (Full Akses Keuangan & Sistem)</option>
                  <option value="ADMIN">ADMIN (Operasional Harian)</option>
                  <option value="CASHIER">CASHIER (Kasir Toko & Booking)</option>
                  <option value="MECHANIC">MECHANIC (Jadwal & Progres Servis)</option>
                  <option value="CONTENT_MANAGER">CONTENT MANAGER (Website & CMS)</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel fontSize="12.5px">Status Akun</FormLabel>
                <Select value={status} onChange={(e) => setStatus(e.target.value as any)}>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="purple" onClick={handleSave}>
              Simpan Akun
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
