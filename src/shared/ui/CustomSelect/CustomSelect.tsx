import { createListCollection, Portal, Select, type FlexProps } from '@chakra-ui/react';

type SelectItemType = {
  label: string;
  value: string;
};

type SelectProps = {
  items: SelectItemType[];
  placeholder: string;
  onValueChange: (value: string) => void;
  value?: string;
  variant?: string;
  display: FlexProps['display'];
};

export const CustomSelect = ({
  items,
  placeholder,
  onValueChange,
  value = 'all',
  display = 'flex',
}: SelectProps) => {
  const collection = createListCollection({ items });
  return (
    <Select.Root
      collection={collection}
      size="lg"
      w="fit"
      minW="190px"
      onValueChange={(details) => onValueChange(details.value[0])}
      value={value ? [value] : undefined}
      display={display}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
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
