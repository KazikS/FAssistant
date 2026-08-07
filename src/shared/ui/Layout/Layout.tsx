import { Box, Flex, Heading, useBreakpointValue } from '@chakra-ui/react';
import { Outlet, useLocation } from 'react-router';

import { routes } from '@/shared/config/routes';
import { DesktopNav } from '@/shared/ui/NavBar/Desktop/';
import { MobileNav } from '@/shared/ui/NavBar/Mobile/';

export const Layout = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const location = useLocation();
  return (
    <Flex flexDirection={isMobile ? 'column' : 'row'} position="relative" minH="100vh">
      {isMobile ? <MobileNav /> : <DesktopNav />}
      {/* pb нужен потому что фиксированный элемент MobileNav перекрывает низ контента */}
      <Box as="main" flex="1" bgColor="bg" p="5" pb={isMobile ? '64px' : undefined}>
        <Heading fontSize={{ base: '18px', md: '22px' }}>
          {location.pathname === '/' ? 'Главная' : routes[location.pathname.slice(1)].screenName}
        </Heading>
        <Outlet />
      </Box>
    </Flex>
  );
};
