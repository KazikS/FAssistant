import { Box, type BoxProps, type StackProps, Button, HStack } from '@chakra-ui/react';
import type { IconType } from 'react-icons';

type ChipSelectProps<T extends string> = {
  items: { value: T; label: string; icon?: IconType }[];
  activeChip: T | null;
  onValueChange: (value: T) => void;
  variant?: 'default' | 'icon' | 'grid';
  checkedBg?: BoxProps['bgColor'];
  checkedTextColor?: BoxProps['color'];
} & StackProps;

export const ChipSelect = <T extends string>({
  items,
  activeChip,
  onValueChange,
  variant = 'default',
  checkedBg,
  checkedTextColor,
  ...props
}: ChipSelectProps<T>) => {
  const isIcon = variant === 'icon';
  return (
    <HStack
      w="full"
      overflowX="auto"
      scrollbar="hidden"
      display={{ base: 'flex', md: 'none' }}
      {...props}
    >
      {items.map((item) => {
        const isActive = item.value === activeChip;
        const ItemIcon = item.icon;
        return (
          <Button
            key={item.value}
            px="3"
            py="2"
            gap="0"
            rounded={isIcon ? 'xl' : '3xl'}
            bgColor={isActive ? (checkedBg ?? 'brand.solid') : 'transparent'}
            onClick={() => onValueChange(item.value)}
            type="button"
            aria-pressed={isActive}
            textWrap="nowrap"
            cursor="pointer"
            textStyle="control"
            color={isActive ? (checkedTextColor ?? 'text.onBrand') : 'text.subtle'}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box display={isIcon ? 'flex' : 'none'}>
              {ItemIcon ? <ItemIcon aria-hidden="true" /> : item.label}
            </Box>
            <Box>{item.label}</Box>
          </Button>
        );
      })}
    </HStack>
  );
};
