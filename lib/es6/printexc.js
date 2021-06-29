

import * as Curry from "./curry.js";
import * as Atomic from "./atomic.js";
import * as $$Buffer from "./buffer.js";
import * as Printf from "./printf.js";
import * as Caml_io from "./caml_io.js";
import * as Caml_array from "./caml_array.js";
import * as Caml_option from "./caml_option.js";
import * as Caml_exceptions from "./caml_exceptions.js";
import * as Caml_js_exceptions from "./caml_js_exceptions.js";
import * as Stdlib__no_aliases from "./stdlib__no_aliases.js";
import * as Caml_external_polyfill from "./caml_external_polyfill.js";

var printers = Atomic.make(/* [] */0);

var locfmt = /* Format */{
  _0: {
    TAG: /* String_literal */11,
    _0: "File \"",
    _1: {
      TAG: /* String */2,
      _0: /* No_padding */0,
      _1: {
        TAG: /* String_literal */11,
        _0: "\", line ",
        _1: {
          TAG: /* Int */4,
          _0: /* Int_d */0,
          _1: /* No_padding */0,
          _2: /* No_precision */0,
          _3: {
            TAG: /* String_literal */11,
            _0: ", characters ",
            _1: {
              TAG: /* Int */4,
              _0: /* Int_d */0,
              _1: /* No_padding */0,
              _2: /* No_precision */0,
              _3: {
                TAG: /* Char_literal */12,
                _0: /* '-' */45,
                _1: {
                  TAG: /* Int */4,
                  _0: /* Int_d */0,
                  _1: /* No_padding */0,
                  _2: /* No_precision */0,
                  _3: {
                    TAG: /* String_literal */11,
                    _0: ": ",
                    _1: {
                      TAG: /* String */2,
                      _0: /* No_padding */0,
                      _1: /* End_of_format */0
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  _1: "File \"%s\", line %d, characters %d-%d: %s"
};

var fields = (function(x){
  var s = ""
  var index = 1
  while ("_"+index in x){
    s += x ["_" + index];
    ++ index
  }
  if(index === 1){
    return s
  }
  return "(" + s + ")"
});

function use_printers(x) {
  var _param = Atomic.get(printers);
  while(true) {
    var param = _param;
    if (!param) {
      return ;
    }
    var tl = param.tl;
    var s;
    try {
      s = Curry._1(param.hd, x);
    }
    catch (exn){
      _param = tl;
      continue ;
    }
    if (s !== undefined) {
      return Caml_option.some(Caml_option.valFromOption(s));
    }
    _param = tl;
    continue ;
  };
}

function to_string_default(x) {
  if (x.RE_EXN_ID === Stdlib__no_aliases.Out_of_memory) {
    return "Out of memory";
  }
  if (x.RE_EXN_ID === Stdlib__no_aliases.Stack_overflow) {
    return "Stack overflow";
  }
  if (x.RE_EXN_ID === Stdlib__no_aliases.Match_failure) {
    var match = x._1;
    var $$char = match[2];
    return Curry._5(Printf.sprintf(locfmt), match[0], match[1], $$char, $$char + 5 | 0, "Pattern matching failed");
  }
  if (x.RE_EXN_ID === Stdlib__no_aliases.Assert_failure) {
    var match$1 = x._1;
    var $$char$1 = match$1[2];
    return Curry._5(Printf.sprintf(locfmt), match$1[0], match$1[1], $$char$1, $$char$1 + 6 | 0, "Assertion failed");
  }
  if (x.RE_EXN_ID === Stdlib__no_aliases.Undefined_recursive_module) {
    var match$2 = x._1;
    var $$char$2 = match$2[2];
    return Curry._5(Printf.sprintf(locfmt), match$2[0], match$2[1], $$char$2, $$char$2 + 6 | 0, "Undefined recursive module");
  }
  var constructor = Caml_exceptions.caml_exn_slot_name(x);
  return constructor + fields(x);
}

function to_string(e) {
  var s = use_printers(e);
  if (s !== undefined) {
    return s;
  } else {
    return to_string_default(e);
  }
}

function print(fct, arg) {
  try {
    return Curry._1(fct, arg);
  }
  catch (raw_x){
    var x = Caml_js_exceptions.internalToOCamlException(raw_x);
    Curry._1(Printf.eprintf(/* Format */{
              _0: {
                TAG: /* String_literal */11,
                _0: "Uncaught exception: ",
                _1: {
                  TAG: /* String */2,
                  _0: /* No_padding */0,
                  _1: {
                    TAG: /* Char_literal */12,
                    _0: /* '\n' */10,
                    _1: /* End_of_format */0
                  }
                }
              },
              _1: "Uncaught exception: %s\n"
            }), to_string(x));
    Caml_io.caml_ml_flush(Stdlib__no_aliases.stderr);
    throw x;
  }
}

function $$catch(fct, arg) {
  try {
    return Curry._1(fct, arg);
  }
  catch (raw_x){
    var x = Caml_js_exceptions.internalToOCamlException(raw_x);
    Caml_io.caml_ml_flush(Stdlib__no_aliases.stdout);
    Curry._1(Printf.eprintf(/* Format */{
              _0: {
                TAG: /* String_literal */11,
                _0: "Uncaught exception: ",
                _1: {
                  TAG: /* String */2,
                  _0: /* No_padding */0,
                  _1: {
                    TAG: /* Char_literal */12,
                    _0: /* '\n' */10,
                    _1: /* End_of_format */0
                  }
                }
              },
              _1: "Uncaught exception: %s\n"
            }), to_string(x));
    return Stdlib__no_aliases.exit(2);
  }
}

function raw_backtrace_entries(bt) {
  return bt;
}

function convert_raw_backtrace_slot(param) {
  throw {
        RE_EXN_ID: "Failure",
        _1: "convert_raw_backtrace_slot not implemented",
        Error: new Error()
      };
}

function convert_raw_backtrace(bt) {
  try {
    return undefined;
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === Stdlib__no_aliases.Failure) {
      return ;
    }
    throw exn;
  }
}

function format_backtrace_slot(pos, slot) {
  var info = function (is_raise) {
    if (is_raise) {
      if (pos === 0) {
        return "Raised at";
      } else {
        return "Re-raised at";
      }
    } else if (pos === 0) {
      return "Raised by primitive operation at";
    } else {
      return "Called from";
    }
  };
  if (slot.TAG === /* Known_location */0) {
    return Curry._7(Printf.sprintf(/* Format */{
                    _0: {
                      TAG: /* String */2,
                      _0: /* No_padding */0,
                      _1: {
                        TAG: /* Char_literal */12,
                        _0: /* ' ' */32,
                        _1: {
                          TAG: /* String */2,
                          _0: /* No_padding */0,
                          _1: {
                            TAG: /* String_literal */11,
                            _0: " in file \"",
                            _1: {
                              TAG: /* String */2,
                              _0: /* No_padding */0,
                              _1: {
                                TAG: /* Char_literal */12,
                                _0: /* '"' */34,
                                _1: {
                                  TAG: /* String */2,
                                  _0: /* No_padding */0,
                                  _1: {
                                    TAG: /* String_literal */11,
                                    _0: ", line ",
                                    _1: {
                                      TAG: /* Int */4,
                                      _0: /* Int_d */0,
                                      _1: /* No_padding */0,
                                      _2: /* No_precision */0,
                                      _3: {
                                        TAG: /* String_literal */11,
                                        _0: ", characters ",
                                        _1: {
                                          TAG: /* Int */4,
                                          _0: /* Int_d */0,
                                          _1: /* No_padding */0,
                                          _2: /* No_precision */0,
                                          _3: {
                                            TAG: /* Char_literal */12,
                                            _0: /* '-' */45,
                                            _1: {
                                              TAG: /* Int */4,
                                              _0: /* Int_d */0,
                                              _1: /* No_padding */0,
                                              _2: /* No_precision */0,
                                              _3: /* End_of_format */0
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    _1: "%s %s in file \"%s\"%s, line %d, characters %d-%d"
                  }), info(slot.is_raise), slot.defname, slot.filename, slot.is_inline ? " (inlined)" : "", slot.line_number, slot.start_char, slot.end_char);
  } else if (slot.is_raise) {
    return ;
  } else {
    return Curry._1(Printf.sprintf(/* Format */{
                    _0: {
                      TAG: /* String */2,
                      _0: /* No_padding */0,
                      _1: {
                        TAG: /* String_literal */11,
                        _0: " unknown location",
                        _1: /* End_of_format */0
                      }
                    },
                    _1: "%s unknown location"
                  }), info(false));
  }
}

function print_raw_backtrace(outchan, raw_backtrace) {
  var backtrace = convert_raw_backtrace(raw_backtrace);
  if (backtrace === undefined) {
    return Printf.fprintf(outchan, /* Format */{
                _0: {
                  TAG: /* String_literal */11,
                  _0: "(Program not linked with -g, cannot print stack backtrace)\n",
                  _1: /* End_of_format */0
                },
                _1: "(Program not linked with -g, cannot print stack backtrace)\n"
              });
  }
  for(var i = 0 ,i_finish = backtrace.length; i < i_finish; ++i){
    var str = format_backtrace_slot(i, Caml_array.get(backtrace, i));
    if (str !== undefined) {
      Curry._1(Printf.fprintf(outchan, /* Format */{
                _0: {
                  TAG: /* String */2,
                  _0: /* No_padding */0,
                  _1: {
                    TAG: /* Char_literal */12,
                    _0: /* '\n' */10,
                    _1: /* End_of_format */0
                  }
                },
                _1: "%s\n"
              }), str);
    }
    
  }
  
}

function print_backtrace(outchan) {
  return print_raw_backtrace(outchan, undefined);
}

function raw_backtrace_to_string(raw_backtrace) {
  var backtrace = convert_raw_backtrace(raw_backtrace);
  if (backtrace === undefined) {
    return "(Program not linked with -g, cannot print stack backtrace)\n";
  }
  var b = $$Buffer.create(1024);
  for(var i = 0 ,i_finish = backtrace.length; i < i_finish; ++i){
    var str = format_backtrace_slot(i, Caml_array.get(backtrace, i));
    if (str !== undefined) {
      Curry._1(Printf.bprintf(b, /* Format */{
                _0: {
                  TAG: /* String */2,
                  _0: /* No_padding */0,
                  _1: {
                    TAG: /* Char_literal */12,
                    _0: /* '\n' */10,
                    _1: /* End_of_format */0
                  }
                },
                _1: "%s\n"
              }), str);
    }
    
  }
  return $$Buffer.contents(b);
}

function backtrace_slot_is_raise(l) {
  return l.is_raise;
}

function backtrace_slot_is_inline(l) {
  if (l.TAG === /* Known_location */0) {
    return l.is_inline;
  } else {
    return false;
  }
}

function backtrace_slot_location(l) {
  if (l.TAG === /* Known_location */0) {
    return {
            filename: l.filename,
            line_number: l.line_number,
            start_char: l.start_char,
            end_char: l.end_char
          };
  }
  
}

function backtrace_slot_defname(l) {
  if (l.TAG === /* Known_location */0 && l.defname !== "") {
    return l.defname;
  }
  
}

function backtrace_slots(raw_backtrace) {
  var backtrace = convert_raw_backtrace(raw_backtrace);
  if (backtrace === undefined) {
    return ;
  }
  var usable_slot = function (param) {
    if (param.TAG === /* Known_location */0) {
      return true;
    } else {
      return false;
    }
  };
  var exists_usable = function (_i) {
    while(true) {
      var i = _i;
      if (i === -1) {
        return false;
      }
      if (usable_slot(Caml_array.get(backtrace, i))) {
        return true;
      }
      _i = i - 1 | 0;
      continue ;
    };
  };
  if (exists_usable(backtrace.length - 1 | 0)) {
    return backtrace;
  }
  
}

function backtrace_slots_of_raw_entry(entry) {
  return backtrace_slots([entry]);
}

function raw_backtrace_length(bt) {
  return bt.length;
}

function get_backtrace(param) {
  return raw_backtrace_to_string(undefined);
}

function register_printer(fn) {
  while(true) {
    var old_printers = Atomic.get(printers);
    var new_printers = {
      hd: fn,
      tl: old_printers
    };
    var success = Atomic.compare_and_set(printers, old_printers, new_printers);
    if (success) {
      return ;
    }
    continue ;
  };
}

var errors = [
  "",
  "(Cannot print locations:\n bytecode executable program file not found)",
  "(Cannot print locations:\n bytecode executable program file appears to be corrupt)",
  "(Cannot print locations:\n bytecode executable program file has wrong magic number)",
  "(Cannot print locations:\n bytecode executable program file cannot be opened;\n -- too many open files. Try running with OCAMLRUNPARAM=b=2)"
];

function default_uncaught_exception_handler(exn, raw_backtrace) {
  Curry._1(Printf.eprintf(/* Format */{
            _0: {
              TAG: /* String_literal */11,
              _0: "Fatal error: exception ",
              _1: {
                TAG: /* String */2,
                _0: /* No_padding */0,
                _1: {
                  TAG: /* Char_literal */12,
                  _0: /* '\n' */10,
                  _1: /* End_of_format */0
                }
              }
            },
            _1: "Fatal error: exception %s\n"
          }), to_string(exn));
  print_raw_backtrace(Stdlib__no_aliases.stderr, raw_backtrace);
  var status = Caml_external_polyfill.resolve("caml_ml_debug_info_status")(undefined);
  if (status < 0) {
    console.error(Caml_array.get(errors, Stdlib__no_aliases.abs(status)));
  }
  return Caml_io.caml_ml_flush(Stdlib__no_aliases.stderr);
}

function set_uncaught_exception_handler(param) {
  
}

function record_backtrace(prim) {
  
}

function backtrace_status(prim) {
  
}

function get_raw_backtrace(prim) {
  
}

var Slot = {
  is_raise: backtrace_slot_is_raise,
  is_inline: backtrace_slot_is_inline,
  $$location: backtrace_slot_location,
  name: backtrace_slot_defname,
  format: format_backtrace_slot
};

function get_raw_backtrace_slot(prim0, prim1) {
  return Caml_external_polyfill.resolve("caml_raw_backtrace_slot")(prim0, prim1);
}

function get_raw_backtrace_next_slot(prim) {
  return Caml_external_polyfill.resolve("caml_raw_backtrace_next_slot")(prim);
}

var exn_slot_id = Caml_exceptions.caml_exn_slot_id;

var exn_slot_name = Caml_exceptions.caml_exn_slot_name;

export {
  to_string ,
  to_string_default ,
  print ,
  $$catch ,
  print_backtrace ,
  get_backtrace ,
  record_backtrace ,
  backtrace_status ,
  register_printer ,
  use_printers ,
  raw_backtrace_entries ,
  get_raw_backtrace ,
  print_raw_backtrace ,
  raw_backtrace_to_string ,
  default_uncaught_exception_handler ,
  set_uncaught_exception_handler ,
  backtrace_slots ,
  backtrace_slots_of_raw_entry ,
  Slot ,
  raw_backtrace_length ,
  get_raw_backtrace_slot ,
  convert_raw_backtrace_slot ,
  get_raw_backtrace_next_slot ,
  exn_slot_id ,
  exn_slot_name ,
  
}
/* printers Not a pure module */