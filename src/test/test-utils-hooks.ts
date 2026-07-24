import { type RenderOptions, render } from '@testing-library/react';
import type { ReactElement } from 'react';

import { AllProviders } from './test-utils';

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
