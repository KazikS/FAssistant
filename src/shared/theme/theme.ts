import { createSystem, defineConfig, defaultConfig } from '@chakra-ui/react';

import { semanticTokens } from './semantic-tokens';
import { slotRecipes } from './slot-recipes';
import { textStyles } from './textStyles';

const config = defineConfig({
  theme: {
    semanticTokens,
    slotRecipes,
    textStyles,
  },
});

export const system = createSystem(defaultConfig, config);
