import { describe, expect, it } from 'vitest';

import { render, screen } from '@/test/test-utils-render';

import { DesktopNav } from './DesktopNav';

describe('DesktopNav', () => {
  it('все 6 кнопок - ссылки', () => {
    render(<DesktopNav />);
    expect(screen.getAllByRole('link')).toHaveLength(6);
  });

  it('наличие всех необходимых кнопок', () => {
    render(<DesktopNav />);
    const expectedTexts = ['Дашборд', 'Операции', 'Бюджеты', 'Отчеты', 'Настройки'];
    expectedTexts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('корректное отображение текущего раздела', () => {
    render(<DesktopNav />, { route: '/' });
    expect(screen.getByRole('link', { name: 'Дашборд' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Отчеты' })).not.toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('snapshot', () => {
    render(<DesktopNav />);
    expect(screen.getByRole('navigation')).toMatchSnapshot();
    expect(screen.getByRole('article')).toMatchSnapshot();
  });
});
