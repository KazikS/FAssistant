import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { MobileNav } from '@/shared/ui/NavBar/Mobile/';

export const Layout = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Flex flexDirection="column">
      {isMobile ? <MobileNav /> : undefined}
      <main>
        <Outlet />
      </main>
    </Flex>
  );
};
