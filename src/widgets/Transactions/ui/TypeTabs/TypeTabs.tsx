import { Grid } from '@chakra-ui/react';

import { TRANSACTION_TYPES } from '@/entities/transaction';
import { isTransactionType } from '@/entities/transaction/model/guards';
import type { TransactionType } from '@/entities/transaction/model/types';

import { TypeVariant } from './TypeVariant';

export const TypeTabs = ({
  activeType,
  onSetType,
}: {
  activeType: TransactionType | null;
  onSetType: (value: TransactionType | null) => void;
}) => {
  const allTypes = Object.keys(TRANSACTION_TYPES).filter(isTransactionType);

  return (
    <Grid
      bgColor="surface.muted"
      maxW="full"
      w={{ base: 'full', md: 'fit' }}
      p="3px"
      rounded="xl"
      gap={{ base: '2', md: '0' }}
      overflowX="scroll"
      scrollbar="hidden"
      templateColumns={'repeat(3, 1fr)'}
    >
      <TypeVariant label="Все" isActive={activeType === null} setActive={() => onSetType(null)} />
      {allTypes.map((type) => (
        <TypeVariant
          label={TRANSACTION_TYPES[type].label}
          key={type}
          isActive={type === activeType}
          setActive={() => onSetType(type)}
        />
      ))}
    </Grid>
  );
};
