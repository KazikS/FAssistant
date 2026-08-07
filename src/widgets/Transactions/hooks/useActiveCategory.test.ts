import { describe, expect, it } from 'vitest';

import { act, renderHook } from '@/test/test-utils-render';

import { useActiveCategory } from './useActiveCategory';

describe('useActiveCategory', () => {
  it('возвращает "all" когда не выбрана никакая категория', () => {
    const { result } = renderHook(() => useActiveCategory());
    expect(result.current.active).toBe('all');
  });
  it('возвращает "all" при неизвестной категории', () => {
    const { result } = renderHook(() => useActiveCategory(), {
      route: '/transactions?category=unknown',
    });
    expect(result.current.active).toBe('all');
  });
  it('возвращает "all" когда выбрана категория Все', () => {
    const { result } = renderHook(() => useActiveCategory(), {
      route: '/transactions?category=all',
    });
    expect(result.current.active).toBe('all');
  });
  it('возвращает "income" когда выбрана категория Доход', () => {
    const { result } = renderHook(() => useActiveCategory(), {
      route: '/transactions?category=income',
    });
    expect(result.current.active).toBe('income');
    expect(result.current.active).not.toBe('all');
  });
  it('смена категории при вызове соответсвующей функции', () => {
    const { result } = renderHook(() => useActiveCategory());

    expect(result.current.active).toBe('all');
    act(() => result.current.select('income'));
    expect(result.current.active).toBe('income');
  });
});
