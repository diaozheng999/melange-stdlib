import { int, int64 } from "./melange";

export function caml_int_compare(x: int, y: int): 0 | 1 | -1;

export function caml_bool_compare(x: boolean, y: boolean): 0 | 1 | -1;

export function caml_float_compare(x: number, y: number): 0 | 1 | -1;

export function caml_string_compare(s1: string, s2: string): 0 | 1 | -1;

export function caml_bool_min(x: boolean, y: boolean): boolean;

export function caml_int_min(x: int, y: int): int;

export function caml_float_min(x: number, y: number): number;

export function caml_string_min(x: string, y: string): string;

export function caml_int32_min(x: int, y: int): int;

export function caml_bool_max(x: boolean, y: boolean): boolean;

export function caml_int_max(x: int, y: int): int;

export function caml_float_max(x: number, y: number): number;

export function caml_string_max(x: string, y: string): string;

export function caml_int32_max(x: int, y: int): int;

export function i64_eq(x: int64, y: int64): boolean;

export function i64_ge(x: int64, y: int64): boolean;

export function i64_neq(x: int64, y: int64): boolean;

export function i64_lt(x: int64, y: int64): boolean;

export function i64_gt(x: int64, y: int64): boolean;

export function i64_le(x: int64, y: int64): boolean;

export function i64_min(x: int64, y: int64): int64;

export function i64_max(x: int64, y: int64): int64;
