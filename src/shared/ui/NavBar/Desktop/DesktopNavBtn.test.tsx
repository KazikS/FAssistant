import { LuChartColumn, LuLayoutDashboard } from 'react-icons/lu';
import { describe, expect, it } from 'vitest';

import { routes } from '@/shared/config/routes';
import { render, screen } from '@/test/test-utils-render';

import { DesktopNavBtn } from './DesktopNavBtn';

describe('DesktopNavBtn', () => {
  it('активна кнопка текущего раздела', () => {
    render(<DesktopNavBtn to={routes.dashboard} title="Дашборд" icon={LuLayoutDashboard} />, {
      route: '/',
    });
    render(<DesktopNavBtn to={routes.budgets} title="Бюджеты" icon={LuChartColumn} />, {
      route: '/',
    });
    expect(screen.getByRole('link', { name: 'Дашборд' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Бюджеты' })).not.toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('ссылка по переданному пути', () => {
    render(<DesktopNavBtn to={routes.dashboard} title="Дашборд" icon={LuLayoutDashboard} />, {
      route: '/',
    });

    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});
