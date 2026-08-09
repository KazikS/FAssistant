import { defineSlotRecipe } from '@chakra-ui/react';
import { selectAnatomy } from '@chakra-ui/react/anatomy';

export const selectSlotRecipe = defineSlotRecipe({
  className: 'chakra-select',
  slots: selectAnatomy.keys(),
  base: {
    root: {
      bgColor: 'surface.primary',
      fontWeight: '600',
      rounded: 'xl',
    },
    content: {
      bgColor: 'surface.primary',
      rounded: 'xl',
      fontWeight: '600',
    },
    item: {
      transition: 'all .3s',
      rounded: 'xl',
      textStyle: 'control',
      _hover: {
        bgColor: 'surface.subtle',
      },
    },
  },
  variants: {
    variant: {
      outline: { trigger: { borderColor: 'border.primary', bg: 'surface.primary', rounded: 'xl' } },
    },
    size: {
      lg: { trigger: { textStyle: 'control' }, content: { textStyle: 'control' } },
    },
  },
});
