import { Input, InputGroup } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';

export const Search = ({ onTextChanged }: { onTextChanged: (value: string) => void }) => {
  return (
    <InputGroup startElement={<LuSearch />}>
      <Input
        placeholder="Поиск по названию"
        bgColor="surface.primary"
        p="2"
        rounded="xl"
        onChange={(e) => onTextChanged(e.target.value.trim())}
      />
    </InputGroup>
  );
};
