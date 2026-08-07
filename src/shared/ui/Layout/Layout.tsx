import { Box, Flex, Heading, useBreakpointValue } from '@chakra-ui/react';
import { Outlet, useLocation } from 'react-router';

import { routes } from '@/shared/config/routes';
import { DesktopNav } from '@/shared/ui/NavBar/Desktop/';
import { MobileNav } from '@/shared/ui/NavBar/Mobile/';

export const Layout = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const location = useLocation();
  const title = Object.values(routes).find((r) => r.route === location.pathname)?.screenName ?? '';
  return (
    <Flex flexDirection={{ base: 'column', md: 'row' }} position="relative" minH="100vh">
      {isMobile ? <MobileNav /> : <DesktopNav />}
      {/* pb нужен потому что фиксированный элемент MobileNav перекрывает низ контента */}
      <Box as="main" flex="1" bgColor="bg" p="5" pb={{ base: '64px' }}>
        <Heading fontSize={{ base: '18px', md: '22px' }}>{title}</Heading>
        <Outlet />
      </Box>
    </Flex>
  );
};
