export type ArrayProperties<T, U> = Pick<T, { [K in keyof T]: T[K] extends U[] ? K : never; }[keyof T]>;
