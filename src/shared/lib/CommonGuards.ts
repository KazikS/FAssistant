export const isObject = (obj: unknown): obj is Record<string, unknown> =>
  typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
