import { Box, Text } from '@chakra-ui/react';

type CategoryVariantProps = {
  label: string;
  setActive: () => void;
  isActive?: boolean;
};

export const CategoryVariant = ({ label, setActive, isActive }: CategoryVariantProps) => {
  return (
    <Box
      px="4"
      py="2"
      rounded="xl"
      bgColor={isActive ? 'surface.primary' : undefined}
      onClick={setActive}
      as="button"
    >
      <Text cursor="pointer">{label}</Text>
    </Box>
  );
};
