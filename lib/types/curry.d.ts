export type CurriedFunction<A extends unknown[], B> = A extends []
  ? () => B
  : A extends [infer Arg]
  ? (arg: Arg) => B
  : A extends [infer Arg1, ...infer Rest]
  ? ((arg: Arg) => CurriedFunction<Rest, B>) | ((...args: A) => B)
  : never;

export function app<A extends [], B>(f: CurriedFunction<A, B>, args: A): B;

export function _1<A, B>(a: CurriedFunction<[A], B>, a0: A): B;
export function _1<A, Rest extends unknown[], B>(
  a: CurriedFunction<[A, ...Rest], B>,
  a0: A
): (...args: Rest) => B;

export function __1<A, B>(a: CurriedFunction<[A], B>): (arg: A) => B;

export function _2<A, B, C>(a: CurriedFunction<[A, B], C>, a0: A, a1: B): C;
export function _2<A, B, Rest extends unknown[], C>(
  a: CurriedFunction<[A, B, ...Rest], C>,
  a0: A,
  a1: B
): (...args: Rest) => C;

export function __2<A, B, C>(
  a: CurriedFunction<[A, B], C>
): (a0: A, a1: B) => C;

export function _3<A, B, C, D>(
  a: CurriedFunction<[A, B, C], D>,
  a0: A,
  a1: B,
  a2: C
): D;
export function _3<A, B, C, Rest extends unknown[], D>(
  a: CurriedFunction<[A, B, C], D>,
  a0: A,
  a1: B,
  a2: C
): (...args: Rest) => D;

export function __3<A, B, C, D>(
  a: CurriedFunction<[A, B, C], D>
): (a0: A, a1: B, a2: C) => D;

export function _4<A, B, C, D, E>(
  a: CurriedFunction<[A, B, C, D], E>,
  a0: A,
  a1: B,
  a2: C,
  a3: D
): E;
export function _4<A, B, C, D, Rest extends unknown[], E>(
  a: CurriedFunction<[A, B, C, D, ...Rest], E>,
  a0: A,
  a1: B,
  a2: C,
  a3: D
): (...rest: Rest) => E;

export function __4<A, B, C, D, E>(
  a: CurriedFunction<[A, B, C, D], E>
): (a0: A, a1: B, a2: C, a3: D) => E;
