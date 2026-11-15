import { Box, Button, Grid, Text, type BoxProps, type GridProps } from '@chakra-ui/react';
import type { IconType } from 'react-icons';

type GridSelectProps<T extends string> = {
  items: { value: T; label: string; icon?: IconType }[];
  activeCell: T | null;
  onValueChange: (value: T) => void;
  variant?: 'default' | 'icon';
  checkedBg?: BoxProps['bgColor'];
  checkedTextColor?: BoxProps['color'];
} & GridProps;

export const GridSelect = <T extends string>({
  items,
  activeCell,
  onValueChange,
  variant,
  checkedBg,
  checkedTextColor,
  ...props
}: GridSelectProps<T>) => {
  const isIcon = variant === 'icon';
  return (
    <Grid gridTemplateColumns="repeat(3, minmax(0, 1fr))" gap="3" {...props}>
      {items.map((item) => {
        const isActive = item.value === activeCell;
        const ItemIcon = item.icon;
        return (
          <Button
            key={item.value}
            rounded={isIcon ? 'xl' : '3xl'}
            bgColor={isActive ? (checkedBg ?? 'brand.solid') : 'transparent'}
            onClick={() => onValueChange(item.value)}
            type="button"
            aria-pressed={isActive}
            textWrap="wrap"
            cursor="pointer"
            color={isActive ? (checkedTextColor ?? 'text.onBrand') : 'text.subtle'}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            borderWidth="1px"
            borderColor="border.primary"
            h="auto"
            minH="20"
            minW="0"
            p="3"
            gap="1"
          >
            <Box display={isIcon ? 'flex' : 'none'}>
              {ItemIcon ? <ItemIcon aria-hidden="true" /> : item.label}
            </Box>
            <Text>{item.label}</Text>
          </Button>
        );
      })}
    </Grid>
  );
};
