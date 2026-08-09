import { describe, it, expect } from 'vitest';

import { render, screen } from '@/test/test-utils-render';

import { MobileNav } from './MobileNav';

describe('MobileNav', () => {
  it('рендер четырех кнопок навигации', () => {
    render(<MobileNav />);
    const expectedTexts = ['Главная', 'Операции', 'Бюджет', 'Отчеты'];
    expectedTexts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('кнопка добавления операции существует', () => {
    render(<MobileNav />);
    expect(screen.getByLabelText('LuPlus')).toBeInTheDocument();
  });

  it('четыре ссылки в компоненте', () => {
    render(<MobileNav />);
    expect(screen.getAllByRole('link')).toHaveLength(4);
  });
  it('корректное отображение текущего раздела', () => {
    render(<MobileNav />);
    expect(screen.getByRole('link', { name: 'Главная' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Отчеты' })).not.toHaveAttribute('aria-current');
  });
  it('snapshot', () => {
    const { container } = render(<MobileNav />);
    expect(container).toMatchSnapshot();
  });
});
