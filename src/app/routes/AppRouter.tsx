import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import BudgetPage from '@/pages/BudgetPage';
import DashboardPage from '@/pages/DashboardPage';
import LoginPage from '@/pages/LoginPage';
import ReportsPage from '@/pages/Reports';
import SettingsPage from '@/pages/Settings';
import TransactionsPage from '@/pages/TransactionsPage';
import { routes } from '@/shared/config/routes';
import { Layout } from '@/shared/ui/Layout';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: routes.dashboard.route,
        element: <DashboardPage />,
      },
      {
        path: routes.login.route,
        element: <LoginPage />,
      },
      {
        path: routes.budgets.route,
        element: <BudgetPage />,
      },
      {
        path: routes.reports.route,
        element: <ReportsPage />,
      },
      {
        path: routes.transactions.route,
        element: <TransactionsPage />,
      },
      {
        path: routes.settings.route,
        element: <SettingsPage />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
