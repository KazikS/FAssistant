import type { IconType } from 'react-icons';
import {
  LuArrowLeftRight,
  LuBaby,
  LuBanknote,
  LuBriefcase,
  LuBus,
  LuCar,
  LuChartLine,
  LuCreditCard,
  LuDumbbell,
  LuEllipsis,
  LuGamepad2,
  LuGift,
  LuGraduationCap,
  LuHandCoins,
  LuHandshake,
  LuHeartHandshake,
  LuHeartPulse,
  LuHouse,
  LuKeyRound,
  LuLandmark,
  LuPawPrint,
  LuPercent,
  LuPiggyBank,
  LuPlane,
  LuPlug,
  LuRepeat,
  LuShirt,
  LuShoppingCart,
  LuSofa,
  LuSparkles,
  LuTag,
  LuTrendingUp,
  LuUtensils,
  LuWallet,
  LuWifi,
} from 'react-icons/lu';

import type { TransactionType } from './types';

export const TRANSACTION_TYPES = {
  income: { label: 'Доход' },
  expense: { label: 'Расход' },
};

export type CategoryMeta = {
  value: string;
  label: string;
  types: TransactionType[];
  icon: IconType;
};

export const CATEGORIES = {
  /* ---------- Только расход ---------- */
  groceries: {
    value: 'groceries',
    label: 'Продукты',
    types: ['expense'],
    icon: LuShoppingCart,
  },
  cafe: { value: 'cafe', label: 'Кафе и рестораны', types: ['expense'], icon: LuUtensils },
  transport: { value: 'transport', label: 'Транспорт', types: ['expense'], icon: LuBus },
  car: { value: 'car', label: 'Авто', types: ['expense'], icon: LuCar },
  housing: { value: 'housing', label: 'Жильё', types: ['expense'], icon: LuHouse },
  utilities: {
    value: 'utilities',
    label: 'Коммунальные услуги',
    types: ['expense'],
    icon: LuPlug,
  },
  connection: {
    value: 'connection',
    label: 'Связь и интернет',
    types: ['expense'],
    icon: LuWifi,
  },
  subscriptions: {
    value: 'subscriptions',
    label: 'Подписки и сервисы',
    types: ['expense'],
    icon: LuRepeat,
  },
  health: { value: 'health', label: 'Здоровье', types: ['expense'], icon: LuHeartPulse },
  beauty: {
    value: 'beauty',
    label: 'Красота и уход',
    types: ['expense'],
    icon: LuSparkles,
  },
  clothes: {
    value: 'clothes',
    label: 'Одежда и обувь',
    types: ['expense'],
    icon: LuShirt,
  },
  home: { value: 'home', label: 'Дом и быт', types: ['expense'], icon: LuSofa },
  fun: { value: 'fun', label: 'Развлечения', types: ['expense'], icon: LuGamepad2 },
  sport: { value: 'sport', label: 'Спорт и фитнес', types: ['expense'], icon: LuDumbbell },
  education: {
    value: 'education',
    label: 'Образование',
    types: ['expense'],
    icon: LuGraduationCap,
  },
  travel: { value: 'travel', label: 'Путешествия', types: ['expense'], icon: LuPlane },
  kids: { value: 'kids', label: 'Дети', types: ['expense'], icon: LuBaby },
  pets: { value: 'pets', label: 'Питомцы', types: ['expense'], icon: LuPawPrint },
  taxes: {
    value: 'taxes',
    label: 'Налоги и штрафы',
    types: ['expense'],
    icon: LuLandmark,
  },
  credit: {
    value: 'credit',
    label: 'Кредиты и комиссии',
    types: ['expense'],
    icon: LuCreditCard,
  },
  charity: {
    value: 'charity',
    label: 'Благотворительность',
    types: ['expense'],
    icon: LuHeartHandshake,
  },

  /* ---------- Только доход ---------- */
  salary: { value: 'salary', label: 'Зарплата', types: ['income'], icon: LuBanknote },
  bonus: {
    value: 'bonus',
    label: 'Премии и бонусы',
    types: ['income'],
    icon: LuTrendingUp,
  },
  freelance: {
    value: 'freelance',
    label: 'Подработка и фриланс',
    types: ['income'],
    icon: LuBriefcase,
  },
  business: {
    value: 'business',
    label: 'Доход от бизнеса',
    types: ['income'],
    icon: LuHandshake,
  },
  rentIncome: {
    value: 'rentIncome',
    label: 'Доход от аренды',
    types: ['income'],
    icon: LuKeyRound,
  },
  cashback: {
    value: 'cashback',
    label: 'Кэшбэк и возвраты',
    types: ['income'],
    icon: LuPercent,
  },
  benefits: {
    value: 'benefits',
    label: 'Пособия и выплаты',
    types: ['income'],
    icon: LuWallet,
  },
  sale: { value: 'sale', label: 'Продажа вещей', types: ['income'], icon: LuTag },

  /* ---------- Оба типа ---------- */
  savings: {
    value: 'savings',
    label: 'Сбережения',
    types: ['income', 'expense'],
    icon: LuPiggyBank,
  },
  investments: {
    value: 'investments',
    label: 'Инвестиции',
    types: ['income', 'expense'],
    icon: LuChartLine,
  },
  transfers: {
    value: 'transfers',
    label: 'Личные переводы',
    types: ['income', 'expense'],
    icon: LuArrowLeftRight,
  },
  debts: {
    value: 'debts',
    label: 'Долги',
    types: ['income', 'expense'],
    icon: LuHandCoins,
  },
  gifts: { value: 'gifts', label: 'Подарки', types: ['income', 'expense'], icon: LuGift },
  other: {
    value: 'other',
    label: 'Прочее',
    types: ['income', 'expense'],
    icon: LuEllipsis,
  },
} satisfies Record<string, CategoryMeta>;

export type CategoryKey = keyof typeof CATEGORIES;
