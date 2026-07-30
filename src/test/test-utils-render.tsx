import { type RenderOptions, render } from '@testing-library/react';
import type { ReactElement } from 'react';

import { AllProviders } from './test-utils';

type CustomOptions = Partial<RenderOptions & { route: string }>;

const customRender = (ui: ReactElement, { route = '/', ...options }: CustomOptions = {}) =>
  render(ui, {
    wrapper: ({ children }) => <AllProviders route={route}>{children}</AllProviders>,
    ...options,
  });

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { customRender as render };
