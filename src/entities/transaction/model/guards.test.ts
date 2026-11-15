import { expect, it, describe } from 'vitest';

import { isCategoryKey, isTransaction } from './guards';

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

describe('transaction dates', () => {
  const transaction = {
    id: 'test',
    date: '2026-11-15',
    title: 'Зарплата',
    amount: 100,
    type: 'income',
    category: 'salary',
  };

  it.each(['2026-11-15', '2024-02-29', '2000-02-29', '2026-12-31'])(
    'принимает календарную дату %s',
    (date) => {
      expect(isTransaction({ ...transaction, date })).toBe(true);
    }
  );

  it.each([
    'invalid',
    '',
    '2026-2-01',
    '2026-13-01',
    '2026-00-01',
    '2026-11-00',
    '2026-04-31',
    '2026-02-29',
    '1900-02-29',
    '2026-11-15T00:00:00Z',
  ])('отклоняет некорректную дату %s', (date) => {
    expect(isTransaction({ ...transaction, date })).toBe(false);
  });
});
