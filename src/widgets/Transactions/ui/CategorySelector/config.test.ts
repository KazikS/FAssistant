import { describe, expect, it } from 'vitest';

import { getCategories } from './config';

describe('category selector', () => {
  const MAIN_CATEGORIES = ['all', 'income', 'expense'];
  const OTHER_CATEGORIES = ['products', 'transport', 'cafe', 'health', 'fun', 'salary'];
  it('получение основных категорий', () => {
    expect(getCategories('main')).toEqual(MAIN_CATEGORIES);
  });
  it('получение всех категорий', () => {
    expect(getCategories('all')).toEqual([...MAIN_CATEGORIES, ...OTHER_CATEGORIES]);
  });
  it('получение побочных категорий', () => {
    expect(getCategories('other')).toEqual(OTHER_CATEGORIES);
  });
});
