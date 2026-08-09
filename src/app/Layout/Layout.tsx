import { Box, Flex, Heading } from '@chakra-ui/react';
import { Outlet, useLocation } from 'react-router';

import { routes } from '@/shared/config/routes';
import { DesktopNav, MobileNav } from '@/widgets/NavBar';

export const Layout = () => {
  const location = useLocation();
  const title = Object.values(routes).find((r) => r.route === location.pathname)?.screenName ?? '';
  return (
    <Flex flexDirection={{ base: 'column', md: 'row' }} position="relative" minH="100vh">
      <MobileNav display={{ base: 'flex', md: 'none' }} />
      <DesktopNav display={{ base: 'none', md: 'flex' }} />
      {/* pb нужен потому что фиксированный элемент MobileNav перекрывает низ контента */}
      <Box as="main" flex="1" bgColor="bg" p="5" pb={{ base: '64px' }} overflowX="clip">
        <Heading fontSize={{ base: '18px', md: '22px' }} mb="4">
          {title}
        </Heading>
        <Outlet />
      </Box>
    </Flex>
  );
};
