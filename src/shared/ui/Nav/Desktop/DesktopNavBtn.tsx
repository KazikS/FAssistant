import { HStack, Icon, Text } from '@chakra-ui/react';
import type { ElementType } from 'react';
import { NavLink } from 'react-router';

type DesktopNavBtnProps = {
  to: string;
  title: string;
  icon: ElementType;
  rotate?: string;
};

export const DesktopNavBtn = ({ to, title, icon, rotate }: DesktopNavBtnProps) => {
  return (
    <NavLink to={to} style={{ display: 'block', width: '100%' }}>
      {({ isActive }) => (
        <HStack
          bgColor={isActive ? 'nav.itemActiveBg' : undefined}
          w="full"
          rounded="xl"
          px="3"
          py="4"
        >
          <Icon
            as={icon}
            boxSize={6}
            color={isActive ? 'nav.itemActiveFg' : 'nav.itemFg'}
            rotate={rotate}
          />
          <Text color={isActive ? 'nav.itemActiveFg' : 'nav.itemFg'}>{title}</Text>
        </HStack>
      )}
    </NavLink>
  );
};
