'use client';

import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Image,
  Input,
  SimpleGrid,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import ImageUpload from 'components/imageUpload/ImageUpload';
import { useState } from 'react';
import {
  MdSettings,
  MdStorefront,
  MdPayment,
  MdLocalShipping,
  MdLanguage,
  MdCheckCircle,
  MdQrCode2,
} from 'react-icons/md';
import { initialSettings } from 'services/mockData';
import { WorkshopSettings } from 'types/workshop';

export default function SettingsPage() {
  const [settings, setSettings] = useState<WorkshopSettings>(initialSettings);
  const toast = useToast();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const boxBg = useColorModeValue('secondaryGray.300', 'navy.900');

  const handleSaveSettings = (sectionName: string) => {
    toast({
      title: `Pengaturan ${sectionName} Disimpan`,
      description: 'Konfigurasi telah diperbarui ke sistem dan database Payload CMS.',
      status: 'success',
      duration: 3000,
      position: 'top-right',
    });
  };

  return (
    <Box pt={{ base: '10px', md: '70px', xl: '70px' }} pb="30px">
      <Flex justify="space-between" align="center" mb="16px" flexWrap="wrap" gap="10px">
        <Box>
          <HStack spacing="8px">
            <Icon as={MdSettings} color="brand.500" w="24px" h="24px" />
            <Text fontSize="22px" fontWeight="800" color={textColor}>
              Pengaturan Toko & Bengkel
            </Text>
            <Badge colorScheme="purple" borderRadius="full">
              Sistem
            </Badge>
          </HStack>
          <Text fontSize="13px" color={textColorSecondary}>
            Konfigurasi profil bengkel, rekening QRIS/Bank, kurir, & identitas website.
          </Text>
        </Box>
      </Flex>

      <Card p={{ base: '14px', md: '20px' }}>
        <Tabs variant="soft-rounded" colorScheme="purple">
          <TabList mb="20px" flexWrap="wrap" gap="6px">
            <Tab>
              <HStack spacing="6px">
                <Icon as={MdStorefront} />
                <Text>Profil & Jam Buka</Text>
              </HStack>
            </Tab>
            <Tab>
              <HStack spacing="6px">
                <Icon as={MdPayment} />
                <Text>Pembayaran & QRIS</Text>
              </HStack>
            </Tab>
            <Tab>
              <HStack spacing="6px">
                <Icon as={MdLocalShipping} />
                <Text>Kurir & Pickup Bengkel</Text>
              </HStack>
            </Tab>
            <Tab>
              <HStack spacing="6px">
                <Icon as={MdLanguage} />
                <Text>Website & SEO</Text>
              </HStack>
            </Tab>
          </TabList>

          <TabPanels>
            {/* 1. Business Info */}
            <TabPanel px="0">
              <VStack spacing="18px" align="stretch">
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="14px">
                  <FormControl isRequired>
                    <FormLabel fontSize="12.5px">Nama Bisnis / Bengkel</FormLabel>
                    <Input
                      value={settings.businessInfo.name}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          businessInfo: { ...settings.businessInfo, name: e.target.value },
                        })
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="12.5px">Tagline / Slogan</FormLabel>
                    <Input
                      value={settings.businessInfo.tagline}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          businessInfo: { ...settings.businessInfo, tagline: e.target.value },
                        })
                      }
                    />
                  </FormControl>
                </SimpleGrid>

                <FormControl isRequired>
                  <FormLabel fontSize="12.5px">Alamat Lengkap Bengkel</FormLabel>
                  <Textarea
                    rows={2}
                    value={settings.businessInfo.address}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        businessInfo: { ...settings.businessInfo, address: e.target.value },
                      })
                    }
                  />
                </FormControl>

                <SimpleGrid columns={{ base: 1, md: 3 }} gap="12px">
                  <FormControl>
                    <FormLabel fontSize="12.5px">Kota</FormLabel>
                    <Input
                      value={settings.businessInfo.city}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          businessInfo: { ...settings.businessInfo, city: e.target.value },
                        })
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="12.5px">Provinsi</FormLabel>
                    <Input
                      value={settings.businessInfo.province}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          businessInfo: { ...settings.businessInfo, province: e.target.value },
                        })
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="12.5px">Kode Pos</FormLabel>
                    <Input
                      value={settings.businessInfo.postalCode}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          businessInfo: { ...settings.businessInfo, postalCode: e.target.value },
                        })
                      }
                    />
                  </FormControl>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 3 }} gap="12px">
                  <FormControl isRequired>
                    <FormLabel fontSize="12.5px">Nomor Telepon Kantor</FormLabel>
                    <Input
                      value={settings.businessInfo.phone}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          businessInfo: { ...settings.businessInfo, phone: e.target.value },
                        })
                      }
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel fontSize="12.5px">Nomor WhatsApp CS</FormLabel>
                    <Input
                      value={settings.businessInfo.whatsapp}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          businessInfo: { ...settings.businessInfo, whatsapp: e.target.value },
                        })
                      }
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel fontSize="12.5px">Email Resmi</FormLabel>
                    <Input
                      value={settings.businessInfo.email}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          businessInfo: { ...settings.businessInfo, email: e.target.value },
                        })
                      }
                    />
                  </FormControl>
                </SimpleGrid>

                <Box p="14px" bg={boxBg} borderRadius="12px">
                  <Text fontSize="13px" fontWeight="700" color={textColor} mb="10px">
                    Jam Operasional Layanan Servis
                  </Text>
                  <SimpleGrid columns={{ base: 1, md: 3 }} gap="10px">
                    <Box>
                      <Text fontSize="11.5px" color="gray.400">Senin - Jumat</Text>
                      <Input
                        size="sm"
                        value={settings.businessInfo.openingHours.weekdays}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            businessInfo: {
                              ...settings.businessInfo,
                              openingHours: {
                                ...settings.businessInfo.openingHours,
                                weekdays: e.target.value,
                              },
                            },
                          })
                        }
                      />
                    </Box>
                    <Box>
                      <Text fontSize="11.5px" color="gray.400">Sabtu</Text>
                      <Input
                        size="sm"
                        value={settings.businessInfo.openingHours.saturday}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            businessInfo: {
                              ...settings.businessInfo,
                              openingHours: {
                                ...settings.businessInfo.openingHours,
                                saturday: e.target.value,
                              },
                            },
                          })
                        }
                      />
                    </Box>
                    <Box>
                      <Text fontSize="11.5px" color="gray.400">Minggu / Tanggal Merah</Text>
                      <Input
                        size="sm"
                        value={settings.businessInfo.openingHours.sunday}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            businessInfo: {
                              ...settings.businessInfo,
                              openingHours: {
                                ...settings.businessInfo.openingHours,
                                sunday: e.target.value,
                              },
                            },
                          })
                        }
                      />
                    </Box>
                  </SimpleGrid>
                </Box>

                <Button
                  colorScheme="purple"
                  alignSelf="flex-end"
                  onClick={() => handleSaveSettings('Informasi Bisnis')}
                  leftIcon={<MdCheckCircle />}
                >
                  Simpan Informasi Bisnis
                </Button>
              </VStack>
            </TabPanel>

            {/* 2. Payment & QRIS */}
            <TabPanel px="0">
              <VStack spacing="18px" align="stretch">
                {/* QRIS Config */}
                <Box p="16px" border="1px solid" borderColor={borderColor} borderRadius="14px">
                  <Flex justify="space-between" align="center" mb="12px">
                    <HStack spacing="8px">
                      <Icon as={MdQrCode2} color="brand.500" w="22px" h="22px" />
                      <Text fontSize="15px" fontWeight="700" color={textColor}>
                        Konfigurasi QRIS Universal (GOPAY, OVO, DANA, ShopeePay, BCA)
                      </Text>
                    </HStack>
                    <Switch
                      colorScheme="purple"
                      isChecked={settings.paymentSettings.qrisEnabled}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          paymentSettings: {
                            ...settings.paymentSettings,
                            qrisEnabled: e.target.checked,
                          },
                        })
                      }
                    />
                  </Flex>

                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="14px">
                    <Box>
                      <FormControl mb="10px">
                        <FormLabel fontSize="12px">Nama Merchant QRIS</FormLabel>
                        <Input
                          size="sm"
                          value={settings.paymentSettings.qrisMerchantName}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              paymentSettings: {
                                ...settings.paymentSettings,
                                qrisMerchantName: e.target.value,
                              },
                            })
                          }
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="12px">National Merchant ID (NMID)</FormLabel>
                        <Input
                          size="sm"
                          value={settings.paymentSettings.qrisNMID}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              paymentSettings: {
                                ...settings.paymentSettings,
                                qrisNMID: e.target.value,
                              },
                            })
                          }
                        />
                      </FormControl>
                    </Box>

                    <Box>
                      <FormControl>
                        <ImageUpload
                          label="Upload Foto / Barcode QRIS Toko"
                          helperText="Format JPG, PNG hingga 5MB. Ditampilkan di checkout kasir & online."
                          value={settings.paymentSettings.qrisImageUrl}
                          onChange={(url) =>
                            setSettings({
                              ...settings,
                              paymentSettings: {
                                ...settings.paymentSettings,
                                qrisImageUrl: url,
                              },
                            })
                          }
                        />
                      </FormControl>
                    </Box>
                  </SimpleGrid>
                </Box>

                {/* Bank Accounts */}
                <Box p="16px" border="1px solid" borderColor={borderColor} borderRadius="14px">
                  <Text fontSize="15px" fontWeight="700" color={textColor} mb="12px">
                    Daftar Rekening Bank Tujuan Transfer Manual
                  </Text>
                  <VStack align="stretch" spacing="10px">
                    {settings.paymentSettings.bankAccounts.map((acc, i) => (
                      <Flex
                        key={i}
                        p="12px"
                        bg={boxBg}
                        borderRadius="10px"
                        justify="space-between"
                        align="center"
                      >
                        <Box>
                          <Text fontSize="13px" fontWeight="700" color={textColor}>
                            {acc.bank}
                          </Text>
                          <Text fontSize="12px" color="brand.500" fontWeight="600">
                            No. Rekening: {acc.accountNumber}
                          </Text>
                          <Text fontSize="11px" color="gray.400">
                            a.n {acc.accountHolder}
                          </Text>
                        </Box>
                        <Badge colorScheme="green">AKTIF</Badge>
                      </Flex>
                    ))}
                  </VStack>
                </Box>

                <Button
                  colorScheme="purple"
                  alignSelf="flex-end"
                  onClick={() => handleSaveSettings('Pembayaran')}
                  leftIcon={<MdCheckCircle />}
                >
                  Simpan Konfigurasi Pembayaran
                </Button>
              </VStack>
            </TabPanel>

            {/* 3. Shipping & Pickup */}
            <TabPanel px="0">
              <VStack spacing="18px" align="stretch">
                <Box p="16px" border="1px solid" borderColor={borderColor} borderRadius="14px">
                  <Flex justify="space-between" align="center" mb="10px">
                    <Box>
                      <Text fontSize="14px" fontWeight="700" color={textColor}>
                        Ambil Langsung di Bengkel (Self-Pickup)
                      </Text>
                      <Text fontSize="12px" color={textColorSecondary}>
                        Izinkan pelanggan checkout online lalu mengambil suku cadang di kasir bengkel.
                      </Text>
                    </Box>
                    <Switch
                      colorScheme="purple"
                      isChecked={settings.shippingSettings.allowWorkshopPickup}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          shippingSettings: {
                            ...settings.shippingSettings,
                            allowWorkshopPickup: e.target.checked,
                          },
                        })
                      }
                    />
                  </Flex>
                  <FormControl mt="8px">
                    <FormLabel fontSize="12px">Petunjuk Pengambilan Barang</FormLabel>
                    <Input
                      size="sm"
                      value={settings.shippingSettings.pickupInstructions}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          shippingSettings: {
                            ...settings.shippingSettings,
                            pickupInstructions: e.target.value,
                          },
                        })
                      }
                    />
                  </FormControl>
                </Box>

                <Box p="16px" border="1px solid" borderColor={borderColor} borderRadius="14px">
                  <Text fontSize="14px" fontWeight="700" color={textColor} mb="12px">
                    Ekspedisi Kurir Pengiriman Terintegrasi
                  </Text>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="12px">
                    {settings.shippingSettings.couriers.map((c, i) => (
                      <Flex
                        key={i}
                        p="12px"
                        bg={boxBg}
                        borderRadius="10px"
                        justify="space-between"
                        align="center"
                      >
                        <Text fontSize="13px" fontWeight="600" color={textColor}>
                          {c.name}
                        </Text>
                        <Switch colorScheme="purple" isChecked={c.active} />
                      </Flex>
                    ))}
                  </SimpleGrid>
                </Box>

                <Button
                  colorScheme="purple"
                  alignSelf="flex-end"
                  onClick={() => handleSaveSettings('Pengiriman & Pickup')}
                  leftIcon={<MdCheckCircle />}
                >
                  Simpan Opsi Pengiriman
                </Button>
              </VStack>
            </TabPanel>

            {/* 4. Website & SEO */}
            <TabPanel px="0">
              <VStack spacing="18px" align="stretch">
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="14px">
                  <FormControl isRequired>
                    <FormLabel fontSize="12.5px">Site Title (Meta Title Global)</FormLabel>
                    <Input
                      value={settings.websiteSettings.siteTitle}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          websiteSettings: {
                            ...settings.websiteSettings,
                            siteTitle: e.target.value,
                          },
                        })
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <ImageUpload
                      label="Upload Logo Brand Website"
                      helperText="Format PNG transparan / SVG disarankan (Maks 2MB)."
                      value={settings.websiteSettings.logoUrl}
                      onChange={(url) =>
                        setSettings({
                          ...settings,
                          websiteSettings: {
                            ...settings.websiteSettings,
                            logoUrl: url,
                          },
                        })
                      }
                    />
                  </FormControl>
                </SimpleGrid>

                <FormControl isRequired>
                  <FormLabel fontSize="12.5px">Meta Description (SEO & AEO/GEO)</FormLabel>
                  <Textarea
                    rows={3}
                    value={settings.websiteSettings.metaDescription}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        websiteSettings: {
                          ...settings.websiteSettings,
                          metaDescription: e.target.value,
                        },
                      })
                    }
                  />
                </FormControl>

                <Box p="14px" border="1px solid" borderColor={borderColor} borderRadius="12px">
                  <Text fontSize="13px" fontWeight="700" color={textColor} mb="10px">
                    Tautan Media Sosial Bengkel
                  </Text>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="10px">
                    <FormControl>
                      <FormLabel fontSize="12px">Instagram URL</FormLabel>
                      <Input
                        size="sm"
                        value={settings.websiteSettings.socialMedia.instagram}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            websiteSettings: {
                              ...settings.websiteSettings,
                              socialMedia: {
                                ...settings.websiteSettings.socialMedia,
                                instagram: e.target.value,
                              },
                            },
                          })
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize="12px">TikTok URL</FormLabel>
                      <Input
                        size="sm"
                        value={settings.websiteSettings.socialMedia.tiktok}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            websiteSettings: {
                              ...settings.websiteSettings,
                              socialMedia: {
                                ...settings.websiteSettings.socialMedia,
                                tiktok: e.target.value,
                              },
                            },
                          })
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize="12px">YouTube Channel</FormLabel>
                      <Input
                        size="sm"
                        value={settings.websiteSettings.socialMedia.youtube}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            websiteSettings: {
                              ...settings.websiteSettings,
                              socialMedia: {
                                ...settings.websiteSettings.socialMedia,
                                youtube: e.target.value,
                              },
                            },
                          })
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize="12px">Facebook Page</FormLabel>
                      <Input
                        size="sm"
                        value={settings.websiteSettings.socialMedia.facebook}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            websiteSettings: {
                              ...settings.websiteSettings,
                              socialMedia: {
                                ...settings.websiteSettings.socialMedia,
                                facebook: e.target.value,
                              },
                            },
                          })
                        }
                      />
                    </FormControl>
                  </SimpleGrid>
                </Box>

                <Button
                  colorScheme="purple"
                  alignSelf="flex-end"
                  onClick={() => handleSaveSettings('Website & SEO')}
                  leftIcon={<MdCheckCircle />}
                >
                  Simpan Pengaturan Website
                </Button>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </Box>
  );
}
