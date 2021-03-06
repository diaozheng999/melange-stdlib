

import * as Seq from "./seq.js";
import * as Curry from "./curry.js";
import * as Caml_option from "./caml_option.js";

function some(v) {
  return Caml_option.some(v);
}

function value(o, $$default) {
  if (o !== undefined) {
    return Caml_option.valFromOption(o);
  } else {
    return $$default;
  }
}

function get(v) {
  if (v !== undefined) {
    return Caml_option.valFromOption(v);
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "option is None",
        Error: new Error()
      };
}

function bind(o, f) {
  if (o !== undefined) {
    return Curry._1(f, Caml_option.valFromOption(o));
  }
  
}

function join(o) {
  if (o !== undefined) {
    return Caml_option.valFromOption(o);
  }
  
}

function map(f, o) {
  if (o !== undefined) {
    return Caml_option.some(Curry._1(f, Caml_option.valFromOption(o)));
  }
  
}

function fold(none, some, v) {
  if (v !== undefined) {
    return Curry._1(some, Caml_option.valFromOption(v));
  } else {
    return none;
  }
}

function iter(f, v) {
  if (v !== undefined) {
    return Curry._1(f, Caml_option.valFromOption(v));
  }
  
}

function is_none(param) {
  return param === undefined;
}

function is_some(param) {
  return param !== undefined;
}

function equal(eq, o0, o1) {
  if (o0 !== undefined) {
    if (o1 !== undefined) {
      return Curry._2(eq, Caml_option.valFromOption(o0), Caml_option.valFromOption(o1));
    } else {
      return false;
    }
  } else {
    return o1 === undefined;
  }
}

function compare(cmp, o0, o1) {
  if (o0 !== undefined) {
    if (o1 !== undefined) {
      return Curry._2(cmp, Caml_option.valFromOption(o0), Caml_option.valFromOption(o1));
    } else {
      return 1;
    }
  } else if (o1 !== undefined) {
    return -1;
  } else {
    return 0;
  }
}

function to_result(none, v) {
  if (v !== undefined) {
    return {
            TAG: /* Ok */0,
            _0: Caml_option.valFromOption(v)
          };
  } else {
    return {
            TAG: /* Error */1,
            _0: none
          };
  }
}

function to_list(v) {
  if (v !== undefined) {
    return {
            hd: Caml_option.valFromOption(v),
            tl: /* [] */0
          };
  } else {
    return /* [] */0;
  }
}

function to_seq(v) {
  if (v === undefined) {
    return Seq.empty;
  }
  var partial_arg = Caml_option.valFromOption(v);
  return function (param) {
    return Seq.$$return(partial_arg, param);
  };
}

var none;

export {
  none ,
  some ,
  value ,
  get ,
  bind ,
  join ,
  map ,
  fold ,
  iter ,
  is_none ,
  is_some ,
  equal ,
  compare ,
  to_result ,
  to_list ,
  to_seq ,
  
}
/* No side effect */
