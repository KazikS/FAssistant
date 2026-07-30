import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { Provider as ChakraProvider } from '@/shared/theme/provider';
import { store } from '@/store';

export const AllProviders = ({ children, route }: { children: React.ReactNode; route: string }) => (
  <MemoryRouter initialEntries={[route]}>
    <Provider store={store}>
      <ChakraProvider>{children}</ChakraProvider>
    </Provider>
  </MemoryRouter>
);
