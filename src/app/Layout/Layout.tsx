import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { DesktopNav, MobileNav } from '@/widgets/NavBar';

export const Layout = () => {
  return (
    <Flex flexDirection={{ base: 'column', md: 'row' }} position="relative" minH="100vh">
      <MobileNav display={{ base: 'flex', md: 'none' }} />
      <DesktopNav display={{ base: 'none', md: 'flex' }} />
      {/* pb нужен потому что фиксированный элемент MobileNav перекрывает низ контента */}
      <Box as="main" flex="1" bgColor="bg" p="5" pb={{ base: '64px' }} overflowX="clip">
        <Outlet />
      </Box>
    </Flex>
  );
};
