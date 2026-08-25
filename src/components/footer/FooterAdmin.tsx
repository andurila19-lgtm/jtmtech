/*eslint-disable*/
import {
  Flex,
  Link,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Footer() {
  const textColor = useColorModeValue('gray.400', 'white');
  return (
    <Flex
      zIndex="3"
      flexDirection={{
        base: 'column',
        xl: 'row',
      }}
      alignItems={{
        base: 'center',
        xl: 'start',
      }}
      justifyContent="space-between"
      px={{ base: '30px', md: '50px' }}
      pb="30px"
    >
      <Text
        color={textColor}
        textAlign={{
          base: 'center',
          xl: 'start',
        }}
        mb={{ base: '20px', xl: '0px' }}
        fontSize="sm"
      >
        &copy; {new Date().getFullYear()}
        <Text as="span" fontWeight="600" ms="4px">
          JTM TECH MotoWorkshop & Store. Hak Cipta Dilindungi.
        </Text>
      </Text>
      <List display="flex" fontSize="sm">
        <ListItem me={{ base: '20px', md: '30px' }}>
          <Link fontWeight="500" color={textColor} href="/admin/settings">
            Info Bengkel
          </Link>
        </ListItem>
        <ListItem me={{ base: '20px', md: '30px' }}>
          <Link fontWeight="500" color={textColor} href="/admin/faq">
            Panduan & FAQ
          </Link>
        </ListItem>
        <ListItem me={{ base: '20px', md: '30px' }}>
          <Link fontWeight="500" color={textColor} href="/admin/media">
            Pustaka Media
          </Link>
        </ListItem>
        <ListItem>
          <Link fontWeight="500" color={textColor} href="/admin/roles">
            Matriks Hak Akses
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
