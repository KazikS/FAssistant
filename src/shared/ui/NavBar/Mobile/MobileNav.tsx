import { Flex, Icon, Button } from '@chakra-ui/react';
import {
  LuChartColumn,
  LuChartNoAxesColumnDecreasing,
  LuChartSpline,
  LuHouse,
  LuPlus,
} from 'react-icons/lu';

import { routes } from '@/shared/config/routes';

import { MobileNavBtn } from './MobileNavBtn';

export const MobileNav = () => {
  return (
    <Flex
      bg="surface.navBar"
      w="full"
      as="aside"
      position="fixed"
      bottom="0"
      flexDirection="row"
      alignItems="center"
      px={3}
      h="64px"
    >
      <MobileNavBtn flex="1" subtitle="Главная" icon={LuHouse} to={routes.dashboard} />
      <MobileNavBtn
        flex="1"
        subtitle="Операции"
        icon={LuChartNoAxesColumnDecreasing}
        rotate="90deg"
        to={routes.transactions}
      />
      <Flex flex="1" justifyContent="center">
        <Button
          bg="accent.primary"
          borderRadius="2xl"
          position="relative"
          boxSize="64px"
          p="0"
          transform="translateY(-18px)"
          boxShadow="0 8px 18px -6px rgba(195, 242, 78, .7)"
          aria-label="LuPlus"
        >
          <Icon as={LuPlus} w={22} h={22} color="black" />
        </Button>
      </Flex>
      <MobileNavBtn flex="1" subtitle="Бюджет" icon={LuChartColumn} to={routes.budgets} />
      <MobileNavBtn flex="1" subtitle="Отчеты" icon={LuChartSpline} to={routes.reports} />
    </Flex>
  );
};
