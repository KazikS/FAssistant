import { defineSemanticTokens } from '@chakra-ui/react';

export const colors = defineSemanticTokens.colors({
  /* ---------- Фон приложения ---------- */
  // Намеренно перекрывает дефолтный `bg` Chakra, чтобы канва была зеленоватой,
  // а не серой. Всё, что лежит поверх, — это surface.*
  bg: { value: { base: '#e7ede9', _dark: '#0e1512' } },

  /* ---------- Поверхности ---------- */
  surface: {
    primary: { value: { base: '#ffffff', _dark: '#17211c' } }, // карточки
    subtle: { value: { base: '#f4f7f5', _dark: '#1d2822' } }, // вложенные блоки, инпуты
    muted: { value: { base: '#eef2f0', _dark: '#232f28' } }, // треки прогресса, чипы, клавиши
    // Полупрозрачный фон нижней навигации (идёт в паре с backdropFilter="blur(8px)")
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
  // .surface — подложка плитки с эмодзи в списке операций
  category: {
    products: {
      solid: { value: { base: '#1b7a5a', _dark: '#35b088' } },
      surface: { value: { base: '#eaf3ee', _dark: '#182e25' } },
    },
    housing: {
      solid: { value: { base: '#0e4f3c', _dark: '#1f7d5e' } },
      surface: { value: { base: '#e9f7ef', _dark: '#15291f' } },
    },
    food: {
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
    other: {
      solid: { value: { base: '#b7c0bb', _dark: '#7d8c85' } },
      surface: { value: { base: '#f1f3f2', _dark: '#262f2a' } },
    },
  },
});
