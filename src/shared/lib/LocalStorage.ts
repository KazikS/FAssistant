type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
/**
 * Класс-обертка для работы с localStorage
 */
export class LS {
  /**
   * @param key ключ для записи в localStorage
   * @param value значение для записи в localStorage
   */
  set(key: string, value: JsonValue): void {
    try {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (error) {
      throw new Error(`Ошибка записи в localStorage по ключу "${key}"`, { cause: error });
    }
  }

  /**
   * @param key ключ для поиска значения в localStorage
   * @param customParse функция проверки формы: возвращает T либо null, если данные не подходят
   * @returns T, либо null если записи нет или проверка не прошла
   */
  get<T>(key: string, customParse: (raw: unknown) => T | null): T | null {
    const value = localStorage.getItem(key);
    if (value === null) {
      return null;
    }
    let json: unknown;
    try {
      json = JSON.parse(value);
    } catch (error) {
      console.error(`Битый JSON по ключу "${key}", ошибка: ${error}`);
      this.delete(key);
      return null;
    }

    return customParse(json);
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }
}

export const ls = new LS();
