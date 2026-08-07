import { type RenderOptions, render, renderHook } from '@testing-library/react';
import type { ReactElement } from 'react';

import { AllProviders } from './test-utils';

type CustomOptions = Partial<RenderOptions & { route: string }>;

/**
 *
 * Автоматически оборачивает тестируемый компонент в необходимые
 * провайдеры приложения:
 * - MemoryRouter;
 * - Redux Provider;
 * - ChakraProvider.
 *
 * @param ui React-элемент, который необходимо отрендерить в тесте.
 *
 * @param options Опции рендеринга.
 * @param options.route Начальный URL для MemoryRouter.
 * По умолчанию используется `/`.
 * Остальные переданные свойства прокидываются непосредственно
 * в стандартный `render` из React Testing Library.
 *
 * @returns Результат стандартного `render` из React Testing Library.
 */
const customRender = (ui: ReactElement, { route = '/', ...options }: CustomOptions = {}) =>
  render(ui, {
    wrapper: ({ children }) => <AllProviders route={route}>{children}</AllProviders>,
    ...options,
  });

/**
 *
 * Автоматически оборачивает тестируемый компонент в необходимые
 * провайдеры приложения:
 * - MemoryRouter;
 * - Redux Provider;
 * - ChakraProvider.
 *
 * @typeParam Result Тип значения, возвращаемого тестируемым хуком.
 * @typeParam Props Тип props, которые могут быть переданы в тестируемый хук.
 *
 * @param callback Функция, внутри которой вызывается тестируемый хук.
 * React Testing Library вызывает эту функцию во время рендеринга
 * тестового компонента.
 *
 * @param options Опции рендеринга.
 * @param options.route Начальный URL для MemoryRouter.
 * По умолчанию используется `/`.
 * Остальные переданные свойства прокидываются в `renderHook`.
 *
 * @returns Результат стандартного `renderHook` из React Testing Library.
 */
const customRenderHook = <Result, Props>(
  callback: (props: Props) => Result,
  { route = '/', ...options }: CustomOptions = {}
) =>
  renderHook(callback, {
    wrapper: ({ children }) => <AllProviders route={route}>{children}</AllProviders>,
    ...options,
  });
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { customRender as render };
export { customRenderHook as renderHook };
