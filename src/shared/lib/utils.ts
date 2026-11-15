export const debounce = <T>(ms: number, callback: (value: T) => void) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return function (value: T) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback(value);
    }, ms);
  };
};
