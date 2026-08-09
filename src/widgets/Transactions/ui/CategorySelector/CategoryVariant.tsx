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
        md: isActive ? 'surface.primary' : 'transparent',
      }}
      onClick={setActive}
      as="button"
      borderWidth={{ base: '1px', md: 0 }}
      borderColor={{ base: 'border.primary', md: 'none' }}
    >
      <Text
        cursor="pointer"
        color={{
          base: isActive ? 'brand.contrast' : 'black',
          md: 'black',
        }}
        fontWeight={{ base: '600' }}
        textWrap="nowrap"
      >
        {label}
      </Text>
    </Box>
  );
};
