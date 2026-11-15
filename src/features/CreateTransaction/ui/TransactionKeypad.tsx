import { Button, Grid, Icon } from '@chakra-ui/react';
import { LuDelete } from 'react-icons/lu';

const controls = ['1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '0', 'backspace'];

type TransactionKeypadProps = {
  addToInput: (value: string) => void;
  deleteSymbol: () => void;
};

export const TransactionKeypad = ({ addToInput, deleteSymbol }: TransactionKeypadProps) => {
  return (
    <Grid
      aria-label="Ввод суммы"
      gridTemplateColumns="repeat(3, minmax(0, 1fr))"
      gap="2"
      mt="2"
      display={{ base: 'grid', md: 'none' }}
    >
      {controls.map((key) => (
        <Button
          key={key}
          type="button"
          aria-label={key === 'backspace' ? 'Удалить последнюю цифру' : key}
          onClick={() => (key === 'backspace' ? deleteSymbol() : addToInput(key))}
          variant="plain"
          bgColor={key === ',' || key === 'backspace' ? 'transparent' : 'surface.subtle'}
          color={key === ',' || key === 'backspace' ? 'text.subtle' : 'text.primary'}
          w="full"
          minW="0"
          h="clamp(44px, 6.5dvh, 52px)"
          rounded="2xl"
          borderWidth="0"
          p="0"
          fontSize="22px"
          fontWeight="600"
          _hover={{ bg: 'surface.muted' }}
          _active={{ bg: 'surface.muted', transform: 'scale(0.97)' }}
        >
          {key === 'backspace' ? <Icon as={LuDelete} boxSize="5" /> : key}
        </Button>
      ))}
    </Grid>
  );
};
