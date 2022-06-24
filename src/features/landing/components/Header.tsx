import { Image, Text, Center, HStack } from '@chakra-ui/react';
import logo from '@/features/landing/assets/appeel-logo.png';

const Header = () => {
  return (
    <Center mb="2">
      <HStack spacing="1">
        <Image src={logo} height={['30px', '50px']} />
        <Text
          color="primary"
          fontSize={['2xl', '4xl']}
          fontWeight="500"
          sx={{ '> span': { color: 'secondary' } }}
        >
          GitPeel<span>.io</span>
        </Text>
      </HStack>
    </Center>
  );
};

export default Header;
