export interface OCamlPolyVariant<TName, TValue> {
  NAME: TName;
  VAL: TValue;
}

export type ValueOfOCamlPolyVariant<T> = T extends OCamlPolyVariant<
  unknown,
  infer TValue
>
  ? TValue
  : never;

export interface OCamlVariant<TName, T> {
  TAG: TName;
  _0: T;
}

export interface OCamlError<ID extends string, TPayload> {
  RE_EXN_ID: ID;
  _1: TPayload;
  Error: Error;
}

export type OCamlOptionSome<T> = T extends undefined | void
  ? { BS_PRIVATE_NESTED_SOME_NONE: number }
  : T;

export type OCamlOption<T> = void | OCamlOptionSome<T>;

export type OCamlLazy<T> =
 | { LAZY_DONE: false; VAL(): T }
 | { LAZY_DONE: true; VAL: T }


declare const OCamlOpaque: unique symbol;

export type int = number & { [OCamlOpaque]: "int" };

export type char = number & { [OCamlOpaque]: "char" };

export type int64 = [number, number] & { [OCamlOpaque]: "int64" };
