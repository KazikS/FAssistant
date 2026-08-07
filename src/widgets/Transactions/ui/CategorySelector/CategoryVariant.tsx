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
      rounded={{ base: '3xl', md: 'xl' }}
      bgColor={{
        base: isActive ? 'brand.solid' : 'surface.primary',
        md: isActive ? 'surface.primary' : undefined,
      }}
      onClick={setActive}
      as="button"
      borderWidth="1px"
      borderColor={{ base: 'border.primary' }}
    >
      <Text
        cursor="pointer"
        color={{
          base: isActive ? 'brand.contrast' : 'black',
        }}
        fontWeight={{ base: '600' }}
        textWrap="nowrap"
      >
        {label}
      </Text>
    </Box>
  );
};
