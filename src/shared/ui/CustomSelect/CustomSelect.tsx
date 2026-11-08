import { createListCollection, Portal, Select, type FlexProps } from '@chakra-ui/react';

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
};

export const CustomSelect = ({
  items,
  placeholder,
  onValueChange,
  value,
  display = 'flex',
}: SelectProps) => {
  const collection = createListCollection({ items });
  const selectedValues = value === null ? [] : value === undefined ? undefined : [value];
  return (
    <Select.Root
      collection={collection}
      size="lg"
      w="fit"
      minW="190px"
      onValueChange={(details) => onValueChange(details.value[0])}
      value={selectedValues}
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
          <Select.Content scrollbar="hidden">
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
