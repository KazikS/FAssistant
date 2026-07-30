import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { DesktopNav } from '@/shared/ui/NavBar/Desktop/';
import { MobileNav } from '@/shared/ui/NavBar/Mobile/';

export const Layout = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Flex flexDirection={isMobile ? 'column' : 'row'} position="relative" minH="100vh">
      {isMobile ? <MobileNav /> : <DesktopNav />}
      {/* pb нужен потому, что фиксированный элемент перекрывает низ контента */}
      <Box as="main" flex="1" bgColor="bg" pb={isMobile ? '64px' : undefined}>
        <Outlet />
      </Box>
    </Flex>
  );
};
