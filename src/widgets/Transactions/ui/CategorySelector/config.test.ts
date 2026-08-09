import { describe, expect, it } from 'vitest';

import { getCategories, isCategoryKey, toCategoryKey } from './config';

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

  it('значение относится к CategoryKey', () => {
    expect(isCategoryKey('all')).toBe(true);
    expect(isCategoryKey('income')).toBe(true);
    expect(isCategoryKey('expense')).toBe(true);
    expect(isCategoryKey('products')).toBe(true);
    expect(isCategoryKey('transport')).toBe(true);
    expect(isCategoryKey('cafe')).toBe(true);
    expect(isCategoryKey('health')).toBe(true);
    expect(isCategoryKey('fun')).toBe(true);
    expect(isCategoryKey('salary')).toBe(true);
    expect(isCategoryKey('toString')).toBe(false);
    expect(isCategoryKey('2')).toBe(false);
  });

  it('замена значения НЕ CategoryKey на "all"', () => {
    expect(toCategoryKey('some value')).toBe('all');
    expect(toCategoryKey('all')).toBe('all');
    expect(toCategoryKey('2')).toBe('all');
    expect(toCategoryKey('.toString')).toBe('all');
    expect(toCategoryKey('fun')).toBe('fun');
  });
});
