import { defineSemanticTokens } from '@chakra-ui/react';

export const colors = defineSemanticTokens.colors({
  /* ---------- Поверхности ---------- */
  bg: { value: { base: '#e7ede9', _dark: '#0e1512' } },
  surface: {
    primary: { value: { base: '#ffffff', _dark: '#17211c' } },
    subtle: { value: { base: '#f4f7f5', _dark: '#1d2822' } },
    muted: { value: { base: '#eef2f0', _dark: '#232f28' } },
  },

  /* ---------- Границы ---------- */
  border: {
    primary: { value: { base: '#dde4e0', _dark: '#2a352f' } },
    subtle: { value: { base: '#e8ece9', _dark: '#222d27' } },
  },

  /* ---------- Текст ---------- */
  fg: {
    primary: {
      value: { base: '#14201b', _dark: '#e9f1ec' },
    },
    muted: { value: { base: '#3c4a44', _dark: '#b3c1ba' } },
    subtle: { value: { base: '#6b7a73', _dark: '#859890' } },
  },

  /* ---------- Бренд (хвойный) ---------- */
  brand: {
    solid: { value: { base: '#0e4f3c', _dark: '#0f4433' } },
    fg: { value: { base: '#0e4f3c', _dark: '#37b085' } },
    emphasis: { value: { base: '#1b7a5a', _dark: '#46c497' } },
    contrast: { value: { base: '#eafaf1', _dark: '#eafaf1' } },
  },

  /* ---------- Акцент (лайм) ---------- */
  accent: {
    primary: {
      value: { base: '#c3f24e', _dark: '#cbf65a' },
    },
    contrast: { value: { base: '#20361a', _dark: '#16250f' } },
  },

  /* ---------- Статусы ---------- */
  income: { value: { base: '#1b7a5a', _dark: '#3ec091' } },
  expense: { value: { base: '#e0533d', _dark: '#f2694f' } },
  warn: { value: { base: '#e8a13a', _dark: '#f0b354' } },

  /* ---------- Категории (данные / донат) ---------- */
  category: {
    products: { value: { base: '#1b7a5a', _dark: '#35b088' } },
    housing: { value: { base: '#0e4f3c', _dark: '#1f7d5e' } },
    food: { value: { base: '#e0533d', _dark: '#f2694f' } },
    transport: { value: { base: '#e8a13a', _dark: '#f0b354' } },
    fun: { value: { base: '#4fb08a', _dark: '#6fc9a6' } },
    health: { value: { base: '#9ad4be', _dark: '#8fcbb4' } },
    other: { value: { base: '#b7c0bb', _dark: '#7d8c85' } },
  },
});
