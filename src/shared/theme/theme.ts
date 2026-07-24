import { createSystem, defineConfig, defaultConfig } from '@chakra-ui/react';

import { semanticTokens } from './semantic-tokens';

const config = defineConfig({
  theme: {
    semanticTokens,
  },
});

export const system = createSystem(defaultConfig, config);
