import { defineSemanticTokens } from '@chakra-ui/react';

const categoryPalettes = {
  groceries: {
    solid: { value: { base: 'rgb(27, 122, 90)', _dark: '#35b088' } },
    surface: { value: { base: '#eaf3ee', _dark: '#182e25' } },
  },
  housing: {
    solid: { value: { base: '#0e4f3c', _dark: '#1f7d5e' } },
    surface: { value: { base: '#e9f7ef', _dark: '#15291f' } },
  },
  cafe: {
    solid: { value: { base: '#e0533d', _dark: '#f2694f' } },
    surface: { value: { base: '#fdeee9', _dark: '#32211d' } },
  },
  transport: {
    solid: { value: { base: '#e8a13a', _dark: '#f0b354' } },
    surface: { value: { base: '#fdf3e5', _dark: '#322819' } },
  },
  fun: {
    solid: { value: { base: '#4fb08a', _dark: '#6fc9a6' } },
    surface: { value: { base: '#edf7f2', _dark: '#1a2f28' } },
  },
  health: {
    solid: { value: { base: '#9ad4be', _dark: '#8fcbb4' } },
    surface: { value: { base: '#edf7f2', _dark: '#1e322b' } },
  },
};

export const colors = defineSemanticTokens.colors({
  /* ---------- Фон приложения ---------- */
  // Намеренно перекрывает дефолтный `bg` Chakra, чтобы канва была зеленоватой,
  // а не серой. Всё, что лежит поверх, — это surface.*
  bg: { value: { base: '#e7ede9', _dark: '#0e1512' } },

  /* ---------- Поверхности ---------- */
  surface: {
    primary: { value: { base: '#ffffff', _dark: '#17211c' } }, // карточки
    subtle: { value: { base: '#f4f7f5', _dark: '#1d2822' } }, // вложенные блоки, инпуты
    muted: { value: { base: '#eef2f0', _dark: '#232f28' } }, // треки прогресса, чипы, клавиши)
    navBar: { value: { base: 'rgba(255,255,255,0.92)', _dark: 'rgba(23,33,28,0.92)' } },
    // Затемнение под bottom sheet / модалкой
    overlay: { value: { base: 'rgba(10,16,12,0.55)', _dark: 'rgba(0,0,0,0.62)' } },
  },

  /* ---------- Границы ---------- */
  border: {
    primary: { value: { base: '#dde4e0', _dark: '#2a352f' } },
    subtle: { value: { base: '#e8ece9', _dark: '#222d27' } },
    // Разделители на хвойном фоне (сайдбар, hero-карточка)
    onBrand: { value: { base: 'rgba(255,255,255,0.10)', _dark: 'rgba(255,255,255,0.10)' } },
  },

  /* ---------- Текст ---------- */
  text: {
    primary: { value: { base: '#14201b', _dark: '#e9f1ec' } }, // основной
    secondary: { value: { base: '#3c4a44', _dark: '#b3c1ba' } }, // вторичный
    subtle: { value: { base: '#6b7a73', _dark: '#859890' } }, // подписи, hint, «10 июля»

    // --- поверх хвойного фона (сайдбар, hero, сплэш) ---
    // Базовый и тёмный совпадают не по ошибке: brand.solid тёмный в обеих темах,
    // значит и текст на нём в обеих темах светлый.
    onBrand: { value: { base: '#eafaf1', _dark: '#eafaf1' } }, // заголовки, суммы
    onBrandMuted: { value: { base: '#8fc7ac', _dark: '#8fc7ac' } }, // лейблы и meta в hero
    onBrandSubtle: { value: { base: '#7fb59d', _dark: '#7fb59d' } }, // подзаголовок лого, «₽» в сумме

    // --- поверх лайма (FAB, primary-кнопка) ---
    onAccent: { value: { base: '#20361a', _dark: '#16250f' } },
  },

  /* ---------- Бренд (хвойный) ---------- */
  brand: {
    solid: { value: { base: '#0e4f3c', _dark: '#0f4433' } }, // сайдбар, hero, аватар-плитка
    fg: { value: { base: '#0e4f3c', _dark: '#37b085' } }, // брендовый текст/иконка на светлом
    emphasis: { value: { base: '#1b7a5a', _dark: '#46c497' } }, // ховер, линия графика
    contrast: { value: { base: '#eafaf1', _dark: '#eafaf1' } }, // = text.onBrand, для кнопок
    hover: { value: { base: '#eafbcb', _dark: '#c7e88d' } },
    gradientEnd: { value: { base: '#0a3a2c', _dark: '#083125' } }, // низ градиента сплэша
    // Трек прогресс-бара внутри hero-карточки (на хвойном, не на белом)
    track: { value: { base: 'rgba(255,255,255,0.15)', _dark: 'rgba(255,255,255,0.15)' } },
    // Мягкое лаймовое свечение в углу hero-карточки
    glow: { value: { base: 'rgba(195,242,78,0.18)', _dark: 'rgba(195,242,78,0.18)' } },
  },

  /* ---------- Навигация (сайдбар + таб-бар) ---------- */
  nav: {
    itemFg: { value: { base: '#a9cebc', _dark: '#a9cebc' } }, // неактивный пункт в сайдбаре
    itemActiveFg: { value: { base: '#eafbcb', _dark: '#eafbcb' } }, // активный пункт
    itemActiveBg: { value: { base: 'rgba(195,242,78,0.14)', _dark: 'rgba(195,242,78,0.14)' } },
    userChipBg: { value: { base: 'rgba(255,255,255,0.06)', _dark: 'rgba(255,255,255,0.06)' } },
    // Таб-бар стоит на белом, поэтому здесь цвета «как на светлом фоне»
    tabFg: { value: { base: '#6b7a73', _dark: '#859890' } },
    tabActiveFg: { value: { base: '#0e4f3c', _dark: '#37b085' } },
  },

  /* ---------- Акцент (лайм) ---------- */
  accent: {
    primary: { value: { base: '#c3f24e', _dark: '#cbf65a' } }, // FAB, primary, заливка прогресса
    contrast: { value: { base: '#20361a', _dark: '#16250f' } }, // текст/иконка на лайме
    // Тень под FAB — заменяет хардкод в boxShadow
    shadow: { value: { base: 'rgba(195,242,78,0.70)', _dark: 'rgba(195,242,78,0.45)' } },
    // Обводка иконки приложения / focus ring
    ring: { value: { base: 'rgba(195,242,78,0.60)', _dark: 'rgba(195,242,78,0.60)' } },
  },

  /* ---------- Статусы ---------- */
  // .solid — цифры, бары, точки-маркеры
  // .surface — мягкая подложка (плитка иконки, пилюля)
  income: {
    solid: { value: { base: '#1b7a5a', _dark: '#3ec091' } },
    surface: { value: { base: '#e9f7ef', _dark: '#142c22' } },
  },
  expense: {
    solid: { value: { base: '#e0533d', _dark: '#f2694f' } },
    surface: { value: { base: '#fdeee9', _dark: '#32211d' } },
  },
  warn: {
    solid: { value: { base: '#e8a13a', _dark: '#f0b354' } }, // заливка бара 75–99%
    surface: { value: { base: '#fdf3e5', _dark: '#322819' } }, // фон пилюли «89%»
    fg: { value: { base: '#c47f16', _dark: '#f0b354' } }, // текст на warn.surface
  },
  // Баннер «нет сети» в PWA
  offline: {
    fg: { value: { base: '#a56a12', _dark: '#edb45e' } },
    surface: { value: { base: '#fdf3e5', _dark: '#322819' } },
    border: { value: { base: '#f2dcae', _dark: '#5a461f' } },
  },

  /* ---------- Аватар пользователя ---------- */
  avatar: {
    bg: { value: { base: '#4fb08a', _dark: '#4fb08a' } },
    fg: { value: { base: '#062b1f', _dark: '#062b1f' } },
  },

  /* ---------- Категории (донат, плитки иконок, бары лимитов) ---------- */
  // .solid — сегмент доната, точка-маркер, заливка бара
  // .surface — подложка плитки с иконкой в списке операций
  category: {
    groceries: categoryPalettes.groceries,
    cafe: categoryPalettes.cafe,
    transport: categoryPalettes.transport,
    car: categoryPalettes.transport,
    housing: categoryPalettes.housing,
    utilities: categoryPalettes.housing,
    connection: {
      solid: { value: { base: '#087b9a', _dark: '#56cde9' } },
      surface: { value: { base: '#daebf0', _dark: '#25494b' } },
    },
    subscriptions: {
      solid: { value: { base: '#7442c8', _dark: '#ba98ff' } },
      surface: { value: { base: '#eae3f7', _dark: '#3c3c50' } },
    },
    health: categoryPalettes.health,
    beauty: categoryPalettes.health,
    clothes: {
      solid: { value: { base: '#a531b0', _dark: '#e58bf0' } },
      surface: { value: { base: '#f2e0f3', _dark: '#46394d' } },
    },
    home: categoryPalettes.housing,
    fun: categoryPalettes.fun,
    sport: categoryPalettes.health,
    education: {
      solid: { value: { base: '#454bbb', _dark: '#9fa5ff' } },
      surface: { value: { base: '#e3e4f5', _dark: '#363f50' } },
    },
    travel: categoryPalettes.fun,
    kids: {
      solid: { value: { base: '#bc592f', _dark: '#ffa984' } },
      surface: { value: { base: '#f5e6e0', _dark: '#4c4034' } },
    },
    pets: {
      solid: { value: { base: '#8a601e', _dark: '#e6b66c' } },
      surface: { value: { base: '#ede7dd', _dark: '#47432e' } },
    },
    taxes: {
      solid: { value: { base: '#784470', _dark: '#cc9ac3' } },
      surface: { value: { base: '#ebe3ea', _dark: '#413d42' } },
    },
    credit: {
      solid: { value: { base: '#aa4037', _dark: '#fb9286' } },
      surface: { value: { base: '#f2e2e1', _dark: '#4b3b34' } },
    },
    charity: {
      solid: { value: { base: '#b83c66', _dark: '#ff9cbd' } },
      surface: { value: { base: '#f4e2e8', _dark: '#4c3d41' } },
    },
    salary: {
      solid: { value: { base: '#1a804a', _dark: '#66d69a' } },
      surface: { value: { base: '#ddece4', _dark: '#294b39' } },
    },
    bonus: {
      solid: { value: { base: '#92720f', _dark: '#f2ce61' } },
      surface: { value: { base: '#efeadb', _dark: '#49492c' } },
    },
    freelance: {
      solid: { value: { base: '#2867c9', _dark: '#8ab9ff' } },
      surface: { value: { base: '#dfe8f7', _dark: '#314450' } },
    },
    business: {
      solid: { value: { base: '#176b77', _dark: '#68bfca' } },
      surface: { value: { base: '#dce9eb', _dark: '#2a4544' } },
    },
    rentIncome: categoryPalettes.housing,
    cashback: {
      solid: { value: { base: '#617b19', _dark: '#b9d96a' } },
      surface: { value: { base: '#e7ebdd', _dark: '#3c4b2e' } },
    },
    benefits: {
      solid: { value: { base: '#6267b7', _dark: '#b8bbf9' } },
      surface: { value: { base: '#e7e8f4', _dark: '#3c444f' } },
    },
    sale: {
      solid: { value: { base: '#993685', _dark: '#e18dce' } },
      surface: { value: { base: '#f0e1ed', _dark: '#453a45' } },
    },
    savings: {
      solid: { value: { base: '#3d7632', _dark: '#9ed28f' } },
      surface: { value: { base: '#e2eae0', _dark: '#364a36' } },
    },
    investments: {
      solid: { value: { base: '#633f9f', _dark: '#bd9cea' } },
      surface: { value: { base: '#e8e2f1', _dark: '#3d3d4b' } },
    },
    transfers: {
      solid: { value: { base: '#0d8276', _dark: '#62dac7' } },
      surface: { value: { base: '#dbecea', _dark: '#284c43' } },
    },
    debts: {
      solid: { value: { base: '#a13751', _dark: '#f287a1' } },
      surface: { value: { base: '#f1e1e5', _dark: '#49383b' } },
    },
    gifts: categoryPalettes.fun,
    other: {
      solid: { value: { base: '#426491', _dark: '#9bbce9' } },
      surface: { value: { base: '#e3e8ef', _dark: '#35454b' } },
    },
  },
});
