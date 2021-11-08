import { OCamlLazy } from "./melange";

export const Undefined: "CamlinternalLazy.Undefined/0";

export function is_val<T>(l: OCamlLazy<T>): l is { LAZY_DONE: true; VAL: T };

export function force<T>(l: OCamlLazy<T>): T;

export function force_lazy_block<T>(l: OCamlLazy<T>): T;

export function force_val_lazy_block<T>(l: OCamlLazy<T>): T;

export function force_val<T>(l: OCamlLazy<T>): T;
