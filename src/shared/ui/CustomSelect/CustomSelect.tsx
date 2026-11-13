import { Box, createListCollection, Portal, Select, type FlexProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export type SelectItemType = {
  label: string;
  value: string;
};

type SelectProps = {
  items: SelectItemType[];
  placeholder: string;
  onValueChange: (value: string | undefined) => void;
  value?: string | null;
  display?: FlexProps['display'];
  mobileIcon?: ReactNode;
};

export const CustomSelect = ({
  items,
  placeholder,
  onValueChange,
  value,
  display = 'flex',
  mobileIcon,
}: SelectProps) => {
  const collection = createListCollection({ items });
  const selectedValues = value === null ? [] : value === undefined ? undefined : [value];
  return (
    <Select.Root
      collection={collection}
      w="fit"
      minW={{ base: mobileIcon ? '10' : '190px', md: '190px' }}
      onValueChange={(details) => onValueChange(details.value[0])}
      value={selectedValues}
      display={display}
      positioning={{ sameWidth: !mobileIcon }}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger
          aria-label={`Выбрать: ${placeholder}`}
          px={{ base: mobileIcon ? '0' : '3', md: '3' }}
          justifyContent={{ base: mobileIcon ? 'center' : 'space-between', md: 'space-between' }}
          w={{ base: mobileIcon ? '10' : 'full', md: 'full' }}
          minH={{
            base: mobileIcon ? '10' : 'var(--select-trigger-height)',
            md: 'var(--select-trigger-height)',
          }}
        >
          {mobileIcon && (
            <Box display={{ base: 'flex', md: 'none' }} aria-hidden="true">
              {mobileIcon}
            </Box>
          )}

          <Select.ValueText
            placeholder={placeholder}
            display={{ base: mobileIcon ? 'none' : 'block', md: 'block' }}
          />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator display={{ base: mobileIcon ? 'none' : 'flex', md: 'flex' }} />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content scrollbar="hidden" minW="190px">
            {collection.items.map((category) => (
              <Select.Item item={category} key={category.value}>
                {category.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
