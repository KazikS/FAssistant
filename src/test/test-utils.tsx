import { MemoryRouter } from 'react-router';

import { Provider } from '@/shared/theme/provider';

export const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <Provider>{children}</Provider>
  </MemoryRouter>
);
