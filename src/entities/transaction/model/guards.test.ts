import { expect, it, describe } from 'vitest';

import { isCategoryKey } from './guards';

describe('Transaction entity', () => {
  it('значение относится к CategoryKey', () => {
    expect(isCategoryKey('all')).toBe(false);
    expect(isCategoryKey('income')).toBe(false);
    expect(isCategoryKey('expense')).toBe(false);
    expect(isCategoryKey('groceries')).toBe(true);
    expect(isCategoryKey('transport')).toBe(true);
    expect(isCategoryKey('cafe')).toBe(true);
    expect(isCategoryKey('health')).toBe(true);
    expect(isCategoryKey('fun')).toBe(true);
    expect(isCategoryKey('salary')).toBe(true);
    expect(isCategoryKey('toString')).toBe(false);
    expect(isCategoryKey('2')).toBe(false);
  });
});
