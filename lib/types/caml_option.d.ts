import type {
  OCamlOption,
  OCamlPolyVariant,
  ValueOfOCamlPolyVariant,
} from "./melange";

export function nullable_to_opt<T>(x: T | null | undefined): OCamlOption<T>;

export function undefined_to_opt<T>(x: T | undefined): OCamlOption<T>;

export function null_to_opt<T>(x: T | null): OCamlOption<T>;

export function valFromOption<T extends undefined | void>(
  x: OCamlOption<undefined>
): OCamlOption<undefined>;
export function valFromOption<T>(x: OCamlOption<T>): T | undefined;

export function isNested<T>(x: OCamlOption<T>): boolean;

export function some<T>(x: T): OCamlOption<T>;

export function option_get<T>(value: OCamlOption<T>): T | undefined;

export function option_unwrap<T extends OCamlPolyVariant<unknown, unknown>>(
  value: OCamlOption<T>
): ValueOfOCamlPolyVariant<T>;
