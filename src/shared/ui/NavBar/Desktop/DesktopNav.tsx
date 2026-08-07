import { Flex, Spacer, VStack } from '@chakra-ui/react';
import {
  LuChartColumn,
  LuChartNoAxesColumnDecreasing,
  LuChartSpline,
  LuLayoutDashboard,
  LuSettings,
  LuUser,
} from 'react-icons/lu';

import { selectUserEmail, selectUserName } from '@/entities/user';
import { routes } from '@/shared/config/routes';
import { Identity } from '@/shared/ui/Identity';
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
      <VStack as="nav" alignItems="start" w="full" gap="1" mt={5}>
        <DesktopNavBtn to={routes.dashboard.route} icon={LuLayoutDashboard} title="Дашборд" />
        <DesktopNavBtn
          to={routes.transactions.route}
          icon={LuChartNoAxesColumnDecreasing}
          rotate="90deg"
          title="Операции"
        />
        <DesktopNavBtn to={routes.budgets.route} icon={LuChartColumn} title="Бюджеты" />
        <DesktopNavBtn to={routes.reports.route} icon={LuChartSpline} title="Отчеты" />
        <DesktopNavBtn to={routes.settings.route} icon={LuSettings} title="Настройки" />
      </VStack>

      <Spacer />
      {name && email ? (
        <Identity title={name} subtitle={email} bgColor="nav.userChipBg" px="4" />
      ) : (
        <DesktopNavBtn to={routes.login.route} title="Войти" icon={LuUser} />
      )}
    </Flex>
  );
};
