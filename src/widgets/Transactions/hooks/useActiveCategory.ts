import { useSearchParams } from 'react-router';

import { type CategoryKey, toCategoryKey } from '@/widgets/Transactions/ui/CategorySelector/config';

export const useActiveCategory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get('category');
  const active: CategoryKey = toCategoryKey(raw);
  const select = (key: CategoryKey) => setSearchParams(key === 'all' ? {} : { category: key });
  return { active, select };
};
