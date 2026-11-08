import { Grid } from '@chakra-ui/react';

import { selectType, setType, TRANSACTION_TYPES } from '@/entities/transaction';
import { isTransactionType } from '@/entities/transaction/model/guards';
import { useAppSelector, useAppDispatch } from '@/store/hooks';

import { TypeVariant } from './TypeVariant';

export const TypeTabs = () => {
  const allTypes = Object.keys(TRANSACTION_TYPES).filter(isTransactionType);
  const activeType = useAppSelector(selectType);
  const dispatch = useAppDispatch();

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
      <TypeVariant
        label="Все"
        isActive={activeType === null}
        setActive={() => dispatch(setType(null))}
      />
      {allTypes.map((type) => (
        <TypeVariant
          label={TRANSACTION_TYPES[type].label}
          key={type}
          isActive={type === activeType}
          setActive={() => dispatch(setType(type))}
        />
      ))}
    </Grid>
  );
};
