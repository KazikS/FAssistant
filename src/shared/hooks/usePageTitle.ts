import { useLocation } from 'react-router';

import { routes } from '@/shared/config/routes';

export const usePageTitle = () => {
  const location = useLocation();
  return Object.values(routes).find((r) => r.route === location.pathname)?.screenName;
};
