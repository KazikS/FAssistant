import { CATEGORIES, type CategoryKey } from '@/entities/transaction';
import { isCategoryKey } from '@/entities/transaction/model/guards';
import type { TransactionType } from '@/entities/transaction/model/types';

export const toCategory = (value: string | undefined): CategoryKey | null => {
  return value !== undefined && isCategoryKey(value) ? value : null;
};

export const getCategories = (type: TransactionType | null) => {
  const categories = Object.keys(CATEGORIES)
    .filter(isCategoryKey)
    .filter((category) => {
      if (type) {
        const allowedTypes: TransactionType[] = CATEGORIES[category].types;
        return allowedTypes.includes(type);
      } else {
        return isCategoryKey(category);
      }
    })
    .map((category) => {
      return {
        label: CATEGORIES[category].label,
        value: CATEGORIES[category].value,
      };
    });
  return categories;
};
