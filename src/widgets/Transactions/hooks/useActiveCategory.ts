import { useSearchParams } from 'react-router';

import { type CategoryKey, CATEGORIES } from '@/widgets/Transactions/ui/CategorySelector/config';

export const useActiveCategory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get('category');
  const active: CategoryKey = raw && raw in CATEGORIES ? (raw as CategoryKey) : 'all';
  const select = (key: CategoryKey) => setSearchParams(key === 'all' ? {} : { category: key });
  return { active, select };
};
