import { describe, expect, it } from 'vitest';

import { setName, userReducer, setEmail, setUser } from './userSlice';

describe('user reducers', () => {
  const initial = {
    name: null,
    email: null,
  };
  it('установка имени', () => {
    expect(userReducer(initial, setName('Kaz'))).toEqual({ name: 'Kaz', email: null });
  });
  it('установка почты', () => {
    expect(userReducer(initial, setEmail('demo@example.ru'))).toEqual({
      name: null,
      email: 'demo@example.ru',
    });
  });
  it('полные данные юзера', () => {
    expect(userReducer(initial, setUser({ name: 'Kaz', email: 'demo@example.ru' }))).toEqual({
      name: 'Kaz',
      email: 'demo@example.ru',
    });
  });
});
