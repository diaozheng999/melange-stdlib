import type { char, int, OCamlOption } from "./melange";

export function failwith(s: string): never;

export function invalid_arg(s: string): never;

export const Exit: "Stdlib__no_aliases.Stdlib.Exit/0";

export const Match_failure: "Match_failure";

export const Assert_failure: "Assert_failure";

export const Invalid_argument: "Invalid_argument";

export const Failure: "Failure";

export const Not_found: "Not_found";

export const Out_of_memory: "Out_of_memory";

export const Stack_overflow: "Stack_overflow";

export const Sys_error: "Sys_error";

export const End_of_file: "End_of_file";

export const Division_by_zero: "Division_by_zero";

export const Sys_blocked_io: "Sys_blocked_io";

export const Undefined_recursive_module: "Undefined_recursive_module";

export function abs(x: int): int;

export function lnot(x: int): int;

export const min_int: int;

export const enum FP {
  Normal,
  Subnormal,
  Zero,
  Infinite,
  NaN,
}

export function classify_float(x: number): FP;
export function char_of_int(x: char): int;
export function string_of_bool(b: boolean): string;
export function bool_of_string(s: string): boolean;
export function bool_of_string_opt(s: string): OCamlOption<boolean>;
export function int_of_string_opt(s: string): OCamlOption<int>;
