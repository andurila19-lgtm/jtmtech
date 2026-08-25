'use client';

import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Text,
  useColorModeValue,
  useToast,
  VStack,
  HStack,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { MdCloudUpload, MdDelete, MdRefresh, MdCheckCircle } from 'react-icons/md';

interface ImageUploadProps {
  value?: string;
  onChange: (dataUrl: string) => void;
  label?: string;
  helperText?: string;
  maxH?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label = 'Unggah Gambar / Foto',
  helperText = 'Format JPG, PNG, WEBP hingga 5MB',
  maxH = '160px',
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
  const borderHoverColor = useColorModeValue('brand.500', 'brand.400');
  const dragBg = useColorModeValue('brand.50', 'whiteAlpha.100');
  const defaultBg = useColorModeValue('gray.50', 'navy.900');
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = useColorModeValue('gray.500', 'gray.400');

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Format Berkas Tidak Sesuai',
        description: 'Harap pilih berkas gambar (PNG, JPG, JPEG, WEBP).',
        status: 'error',
        duration: 3000,
        position: 'top-right',
      });
      return;
    }

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Ukuran Gambar Terlalu Besar',
        description: 'Ukuran berkas maksimal adalah 5MB.',
        status: 'warning',
        duration: 3000,
        position: 'top-right',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onChange(e.target.result as string);
        toast({
          title: 'Gambar Berhasil Dipilih',
          description: `${file.name} (${(file.size / 1024).toFixed(0)} KB)`,
          status: 'success',
          duration: 2000,
          position: 'top-right',
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Box w="100%">
      {label && (
        <Text fontSize="12.5px" fontWeight="600" color={textColor} mb="6px">
          {label}
        </Text>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/jpg, image/webp"
        style={{ display: 'none' }}
      />

      {value ? (
        <Box
          position="relative"
          border="1.5px solid"
          borderColor={borderColor}
          borderRadius="14px"
          overflow="hidden"
          bg={defaultBg}
          p="12px"
        >
          <Flex align="center" gap="14px" flexWrap={{ base: 'wrap', sm: 'nowrap' }}>
            <Image
              src={value}
              alt="Preview"
              maxH={maxH}
              maxW="200px"
              w="auto"
              h="auto"
              objectFit="cover"
              borderRadius="10px"
              bg="gray.100"
            />
            <VStack align="flex-start" spacing="8px" flex="1">
              <HStack spacing="6px">
                <Icon as={MdCheckCircle} color="green.500" />
                <Text fontSize="12.5px" fontWeight="700" color="green.500">
                  Foto Gambar Terpilih
                </Text>
              </HStack>
              <Text fontSize="11px" color={textColorSecondary}>
                Berkas siap disimpan ke katalog sistem atau server.
              </Text>
              <HStack spacing="8px">
                <Button
                  size="xs"
                  colorScheme="purple"
                  variant="outline"
                  leftIcon={<MdRefresh />}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Ganti File Foto
                </Button>
                <Button
                  size="xs"
                  colorScheme="red"
                  variant="ghost"
                  leftIcon={<MdDelete />}
                  onClick={handleRemove}
                >
                  Hapus
                </Button>
              </HStack>
            </VStack>
          </Flex>
        </Box>
      ) : (
        <Box
          border="2px dashed"
          borderColor={isDragging ? borderHoverColor : borderColor}
          borderRadius="14px"
          bg={isDragging ? dragBg : defaultBg}
          p="20px"
          textAlign="center"
          cursor="pointer"
          transition="all 0.2s"
          _hover={{ borderColor: borderHoverColor, bg: dragBg }}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <VStack spacing="8px">
            <Flex
              w="44px"
              h="44px"
              borderRadius="12px"
              bg="purple.50"
              color="brand.500"
              align="center"
              justify="center"
            >
              <Icon as={MdCloudUpload} w="24px" h="24px" />
            </Flex>
            <Text fontSize="13px" fontWeight="700" color={textColor}>
              Klik untuk pilih gambar dari komputer / seret berkas ke sini
            </Text>
            <Text fontSize="11px" color={textColorSecondary}>
              {helperText}
            </Text>
          </VStack>
        </Box>
      )}
    </Box>
  );
}
