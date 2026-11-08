import { Box, Text } from '@chakra-ui/react';

type TypeVariantProps = {
  label: string;
  setActive: () => void;
  isActive?: boolean;
};

export const TypeVariant = ({ label, setActive, isActive }: TypeVariantProps) => {
  return (
    <Box
      px="4"
      py="2"
      rounded="xl"
      bgColor={isActive ? 'surface.primary' : 'transparent'}
      onClick={setActive}
      as="button"
    >
      <Text
        cursor="pointer"
        color="black"
        fontWeight={{ base: '600' }}
        textWrap="nowrap"
        fontSize="13px"
      >
        {label}
      </Text>
    </Box>
  );
};
