import { useState } from 'react';

export const useNewTransactionWindow = () => {
  const [active, setActive] = useState(false);
  return { active, setActive };
};
