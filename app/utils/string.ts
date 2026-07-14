export const equalsIgnoreCase = (a: string, b: string) =>
  a.toLowerCase() === b.toLowerCase();

export const startsWithIgnoreCase = (str: string, prefix: string) =>
  str.toLowerCase().startsWith(prefix.toLowerCase());
