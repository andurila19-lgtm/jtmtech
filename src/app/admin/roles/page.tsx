'use client';

import {
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Icon,
  Select,
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
  VStack,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { useState } from 'react';
import { MdSecurity, MdCheckCircle } from 'react-icons/md';
import { initialRoles } from 'services/mockData';
import { RolePermissions, RoleType } from 'types/workshop';

export default function RolesPage() {
  const [roles, setRoles] = useState<RolePermissions[]>(initialRoles);
  const [selectedRole, setSelectedRole] = useState<RoleType>('ADMIN');

  const toast = useToast();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const hoverBg = useColorModeValue('gray.50', 'whiteAlpha.50');
  const cardBg = useColorModeValue('gray.50', 'navy.700');

  const currentRoleData = roles.find((r) => r.role === selectedRole) || roles[0];

  const handleTogglePerm = (
    moduleKey: keyof RolePermissions['permissions'],
    action: 'view' | 'create' | 'update' | 'delete',
  ) => {
    if (selectedRole === 'OWNER') {
      toast({
        title: 'Role Owner Memiliki Full Akses',
        description: 'Hak akses Owner tidak dapat dibatasi untuk menjaga integritas sistem.',
        status: 'warning',
        duration: 2500,
      });
      return;
    }

    setRoles(
      roles.map((r) => {
        if (r.role === selectedRole) {
          return {
            ...r,
            permissions: {
              ...r.permissions,
              [moduleKey]: {
                ...r.permissions[moduleKey],
                [action]: !r.permissions[moduleKey][action],
              },
            },
          };
        }
        return r;
      }),
    );
  };

  const handleSaveMatrix = () => {
    toast({
      title: 'Hak Akses RBAC Disimpan',
      description: `Perubahan permission untuk role ${selectedRole} telah diterapkan di Payload CMS.`,
      status: 'success',
      duration: 3000,
      position: 'top-right',
    });
  };

  const modulesList: { key: keyof RolePermissions['permissions']; name: string; desc: string }[] = [
    { key: 'products', name: 'Products & Katalog', desc: 'Katalog barang, penyesuaian harga jual, foto produk' },
    { key: 'orders', name: 'Orders Transaksi', desc: 'Melihat pesanan e-commerce, update status kirim & resi' },
    { key: 'inventory', name: 'Inventory & Stok Gudang', desc: 'Stok opname, restock vendor, mutasi barang' },
    { key: 'bookings', name: 'Service Bookings', desc: 'Jadwal antrean servis motor, penugasan pit & mekanik' },
    { key: 'customers', name: 'Customers Database', desc: 'Database pelanggan, riwayat servis, alamat' },
    { key: 'payments', name: 'Payments & Keuangan', desc: 'Verifikasi bukti transfer bank, approve/reject pembayaran' },
    { key: 'cms', name: 'CMS & Konten Website', desc: 'Artikel blog, banner promo, galeri, testimoni, FAQ' },
    { key: 'users', name: 'User Management', desc: 'Tambah/edit akun staf bengkel dan kasir' },
    { key: 'settings', name: 'Workshop Settings', desc: 'Pengaturan profil bengkel, nomor rekening bank, dan SEO' },
  ];

  return (
    <Box pt={{ base: '10px', md: '70px', xl: '70px' }} pb="30px">
      <Flex justify="space-between" align="center" mb="16px" flexWrap="wrap" gap="10px">
        <Box>
          <HStack spacing="8px">
            <Icon as={MdSecurity} color="brand.500" w="24px" h="24px" />
            <Text fontSize="22px" fontWeight="800" color={textColor}>
              Matriks Hak Akses (RBAC)
            </Text>
            <Badge colorScheme="purple" borderRadius="full">
              Keamanan
            </Badge>
          </HStack>
          <Text fontSize="13px" color={textColorSecondary}>
            Atur izin granular (Lihat, Buat, Edit, Hapus) per modul untuk setiap jabatan staf.
          </Text>
        </Box>

        <Button
          colorScheme="purple"
          leftIcon={<MdCheckCircle />}
          onClick={handleSaveMatrix}
          borderRadius="12px"
          w={{ base: '100%', sm: 'auto' }}
          h="44px"
        >
          Simpan Hak Akses
        </Button>
      </Flex>

      {/* Role Selector Card */}
      <Card p="16px" mb="16px">
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="12px" alignItems="center">
          <Box>
            <Text fontSize="12px" color="gray.400" fontWeight="600" mb="4px">
              PILIH JABATAN / ROLE
            </Text>
            <Select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as RoleType)}
              fontWeight="700"
              borderRadius="12px"
              h="44px"
            >
              <option value="OWNER">OWNER (Pemilik Bengkel - Akses Penuh)</option>
              <option value="ADMIN">ADMIN (Operasional & Gudang)</option>
              <option value="CASHIER">CASHIER (Kasir POS & Toko)</option>
              <option value="MECHANIC">MECHANIC (Teknisi Bengkel)</option>
              <option value="CONTENT_MANAGER">CONTENT MANAGER (Pengelola Web)</option>
            </Select>
          </Box>

          <Box p="12px" bg={useColorModeValue('secondaryGray.300', 'whiteAlpha.100')} borderRadius="12px">
            <Text fontSize="12px" fontWeight="700" color={textColor}>
              Deskripsi Tugas:
            </Text>
            <Text fontSize="12px" color={textColorSecondary} mt="2px">
              {currentRoleData.description}
            </Text>
          </Box>
        </SimpleGrid>
      </Card>

      {/* Matrix Table */}
      <Card p={{ base: '14px', md: '20px' }}>
        {/* MOBILE CARD VIEW (< md) */}
        <Box display={{ base: 'block', md: 'none' }}>
          <VStack spacing="12px" align="stretch">
            {modulesList.map((m) => {
              const perm = currentRoleData.permissions[m.key];
              return (
                <Box
                  key={m.key}
                  p="14px"
                  borderRadius="14px"
                  bg={cardBg}
                  border="1px solid"
                  borderColor={borderColor}
                >
                  <Text fontSize="14px" fontWeight="700" color={textColor} mb="2px">
                    {m.name}
                  </Text>
                  <Text fontSize="11px" color={textColorSecondary} mb="10px">
                    {m.desc}
                  </Text>

                  <SimpleGrid columns={2} gap="10px" pt="8px" borderTop="1px solid" borderColor={borderColor}>
                    <Checkbox
                      colorScheme="purple"
                      isChecked={perm.view}
                      onChange={() => handleTogglePerm(m.key, 'view')}
                    >
                      <Text fontSize="12px">Lihat (View)</Text>
                    </Checkbox>
                    <Checkbox
                      colorScheme="purple"
                      isChecked={perm.create}
                      onChange={() => handleTogglePerm(m.key, 'create')}
                    >
                      <Text fontSize="12px">Tambah (Create)</Text>
                    </Checkbox>
                    <Checkbox
                      colorScheme="purple"
                      isChecked={perm.update}
                      onChange={() => handleTogglePerm(m.key, 'update')}
                    >
                      <Text fontSize="12px">Edit (Update)</Text>
                    </Checkbox>
                    <Checkbox
                      colorScheme="purple"
                      isChecked={perm.delete}
                      onChange={() => handleTogglePerm(m.key, 'delete')}
                    >
                      <Text fontSize="12px">Hapus (Delete)</Text>
                    </Checkbox>
                  </SimpleGrid>
                </Box>
              );
            })}
          </VStack>
        </Box>

        {/* DESKTOP TABLE VIEW (>= md) */}
        <Box display={{ base: 'none', md: 'block' }} overflowX="auto">
          <Table variant="simple" color="gray.500">
            <Thead>
              <Tr>
                <Th borderColor={borderColor} color="gray.400">MODUL SISTEM</Th>
                <Th borderColor={borderColor} color="gray.400" textAlign="center">VIEW (LIHAT)</Th>
                <Th borderColor={borderColor} color="gray.400" textAlign="center">CREATE (TAMBAH)</Th>
                <Th borderColor={borderColor} color="gray.400" textAlign="center">UPDATE (EDIT)</Th>
                <Th borderColor={borderColor} color="gray.400" textAlign="center">DELETE (HAPUS)</Th>
              </Tr>
            </Thead>
            <Tbody>
              {modulesList.map((m) => {
                const perm = currentRoleData.permissions[m.key];
                return (
                  <Tr key={m.key} _hover={{ bg: hoverBg }}>
                    <Td borderColor={borderColor}>
                      <Text color={textColor} fontSize="13.5px" fontWeight="700">
                        {m.name}
                      </Text>
                      <Text fontSize="11px" color="gray.400">
                        {m.desc}
                      </Text>
                    </Td>
                    <Td borderColor={borderColor} textAlign="center">
                      <Checkbox
                        colorScheme="purple"
                        isChecked={perm.view}
                        onChange={() => handleTogglePerm(m.key, 'view')}
                      />
                    </Td>
                    <Td borderColor={borderColor} textAlign="center">
                      <Checkbox
                        colorScheme="purple"
                        isChecked={perm.create}
                        onChange={() => handleTogglePerm(m.key, 'create')}
                      />
                    </Td>
                    <Td borderColor={borderColor} textAlign="center">
                      <Checkbox
                        colorScheme="purple"
                        isChecked={perm.update}
                        onChange={() => handleTogglePerm(m.key, 'update')}
                      />
                    </Td>
                    <Td borderColor={borderColor} textAlign="center">
                      <Checkbox
                        colorScheme="purple"
                        isChecked={perm.delete}
                        onChange={() => handleTogglePerm(m.key, 'delete')}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </Card>
    </Box>
  );
}
