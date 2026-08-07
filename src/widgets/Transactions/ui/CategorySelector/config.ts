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
