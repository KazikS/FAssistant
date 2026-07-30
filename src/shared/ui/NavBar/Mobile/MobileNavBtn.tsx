import { Icon, Text, Flex, Box } from '@chakra-ui/react';
import type { ElementType } from 'react';
import { NavLink } from 'react-router';

type MobileNavBtnProps = {
  flex: string;
  subtitle: string;
  icon: ElementType;
  rotate?: string;
  to: string;
};

export const MobileNavBtn = ({ subtitle, icon, rotate, flex, to }: MobileNavBtnProps) => {
  return (
    <Box flex={flex}>
      <NavLink to={to}>
        {({ isActive }) => (
          <Flex direction="column" justifyContent="center" alignItems="center" gap="2px">
            <Icon
              as={icon}
              boxSize="22px"
              rotate={rotate}
              color={isActive ? 'nav.tabActiveFg' : 'nav.tabFg'}
            />
            <Text
              fontSize="10px"
              fontWeight="600"
              color={isActive ? 'nav.tabActiveFg' : 'nav.tabFg'}
            >
              {subtitle}
            </Text>
          </Flex>
        )}
      </NavLink>
    </Box>
  );
};
