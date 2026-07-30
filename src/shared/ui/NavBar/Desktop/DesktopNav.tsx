import { Flex, Spacer, VStack } from '@chakra-ui/react';
import {
  LuChartColumn,
  LuChartNoAxesColumnDecreasing,
  LuChartSpline,
  LuLayoutDashboard,
  LuSettings,
} from 'react-icons/lu';

import { selectUserEmail, selectUserName } from '@/entities/user';
import { routes } from '@/shared/config/routes';
import { Identity } from '@/shared/ui/Identity/Identity';
import { useAppSelector } from '@/store/hooks';

import { DesktopNavBtn } from './DesktopNavBtn';

export const DesktopNav = () => {
  const name = useAppSelector(selectUserName);
  const email = useAppSelector(selectUserEmail);
  return (
    <Flex
      as="aside"
      position="sticky"
      flexDirection="column"
      w="1/5"
      py="5"
      px="4"
      bgColor="brand.solid"
      top="0"
      minW="256px"
    >
      <Identity title="FAssistant" subtitle="личные финансы" />
      <VStack alignItems="start" w="full" gap="1" mt={5}>
        <DesktopNavBtn to={routes.dashboard} icon={LuLayoutDashboard} title="Дашборд" />
        <DesktopNavBtn
          to={routes.transactions}
          icon={LuChartNoAxesColumnDecreasing}
          rotate="90deg"
          title="Операции"
        />
        <DesktopNavBtn to={routes.budgets} icon={LuChartColumn} title="Бюджеты" />
        <DesktopNavBtn to={routes.reports} icon={LuChartSpline} title="Отчеты" />
        <DesktopNavBtn to={routes.settings} icon={LuSettings} title="Настройки" />
      </VStack>

      <Spacer />
      <Identity title={name} subtitle={email} bgColor="nav.userChipBg" px="4" />
    </Flex>
  );
};
