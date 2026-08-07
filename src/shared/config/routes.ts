type RouteType = {
  route: string;
  screenName: string;
};

export const routes: Record<string, RouteType> = {
  dashboard: { route: '/', screenName: 'Главная' },
  login: { route: '/login', screenName: 'Логин' },
  transactions: { route: '/transactions', screenName: 'Операции' },
  budgets: { route: '/budgets', screenName: 'Бюджеты' },
  reports: { route: '/reports', screenName: 'Отчеты' },
  settings: { route: '/settings', screenName: 'Настройки' },
} as const;
