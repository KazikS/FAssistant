import { defineTextStyles } from '@chakra-ui/react';

export const textStyles = defineTextStyles({
  control: {
    description: 'Шрифт текста для элементов управления',
    value: {
      fontSize: '14px',
      fontWeight: '600',
      lineHeight: '1.5',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  },
  subtle: {
    description: 'Шрифт для подзаголовков',
    value: { fontSize: '12px', fontWeight: '400', lineHeight: '1.5', color: 'text.subtle' },
  },
  numbers: {
    description: 'Шрифт для чисел',
    value: {
      fontSize: '14px',
      fontFamily: 'Space Grotesk',
      fontWeight: '500',
    },
  },
});
