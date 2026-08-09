export const CATEGORIES = {
  all: 'Все',
  income: 'Доход',
  expense: 'Расход',
  products: 'Продукты',
  transport: 'Транспорт',
  cafe: 'Кафе и Рестораны',
  health: 'Здоровье',
  fun: 'Развлечения',
  salary: 'Зарплата',
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

const MAIN: CategoryKey[] = ['all', 'income', 'expense'];
const OTHER: CategoryKey[] = ['products', 'transport', 'cafe', 'health', 'fun', 'salary'];

/**
 * Это type guard, если в эту функцию передать значение строковое, то будет выполнена проверка,
 * существует ли это значение внутри объекта. Результат функции не просто булевое значение, а именно подтверждение того,
 * что переданное значение находится внутри объекта, а значит переменная содержащая это значение имеет тип CategoryKey
 */
export const isCategoryKey = (value: string): value is CategoryKey =>
  Object.hasOwn(CATEGORIES, value);

/**
 * Функция которая приводит значение, не из списка CategoryKey к варианту 'all'
 */
export const toCategoryKey = (value: string | null): CategoryKey =>
  value && isCategoryKey(value) ? value : 'all';

export const getCategories = (variant: 'main' | 'all' | 'other') => {
  switch (variant) {
    case 'main':
      return MAIN;
    case 'all':
      return [...MAIN, ...OTHER];
    case 'other':
      return OTHER;
    default:
      throw new Error('Такого варианта не существует');
  }
};
