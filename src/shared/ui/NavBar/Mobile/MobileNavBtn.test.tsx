import { screen } from '@testing-library/react';
import { LuHouse } from 'react-icons/lu';
import { describe, expect, it } from 'vitest';

import { render } from '@/test/test-utils-hooks';

import { MobileNavBtn } from './MobileNavBtn';

describe('MobileNavBtn', () => {
  it('рендер подзаголовка', () => {
    render(<MobileNavBtn flex="1" subtitle="Home" icon={LuHouse} to="/" />);

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('ссылка по переданному пути', () => {
    render(<MobileNavBtn flex="1" subtitle="Home" icon={LuHouse} to="/dashboard" />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/dashboard');
  });
});
