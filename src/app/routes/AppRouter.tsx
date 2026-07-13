import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import BudgetPage from '@/pages/BudgetPage';
import DashboardPage from '@/pages/DashboardPage';
import LoginPage from '@/pages/LoginPage';
import ReportsPage from '@/pages/Reports';
import SettingsPage from '@/pages/Settings';
import TransactionsPage from '@/pages/TransactionsPage';
import { routes } from '@/shared/config/routes';

const router = createBrowserRouter([
  {
    path: routes.dashboard,
    element: <DashboardPage />,
  },
  {
    path: routes.login,
    element: <LoginPage />,
  },
  {
    path: routes.budgets,
    element: <BudgetPage />,
  },
  {
    path: routes.reports,
    element: <ReportsPage />,
  },
  {
    path: routes.transactions,
    element: <TransactionsPage />,
  },
  {
    path: routes.settings,
    element: <SettingsPage />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
