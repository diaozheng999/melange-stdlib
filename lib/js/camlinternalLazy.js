'use strict';

var Caml_exceptions = require("./caml_exceptions.js");

var Undefined = /* @__PURE__ */Caml_exceptions.create("CamlinternalLazy.Undefined");

function is_val(l) {
  return l.LAZY_DONE;
}

function forward_with_closure(blk, closure) {
  var result = closure();
  blk.VAL = result;
  blk.LAZY_DONE = true;
  return result;
}

function raise_undefined() {
  throw {
        RE_EXN_ID: Undefined,
        Error: new Error()
      };
}

function force_lazy_block(blk) {
  var closure = blk.VAL;
  blk.VAL = raise_undefined;
  try {
    return forward_with_closure(blk, closure);
  }
  catch (e){
    blk.VAL = (function () {
        throw e;
      });
    throw e;
  }
}

function force_val_lazy_block(blk) {
  var closure = blk.VAL;
  blk.VAL = raise_undefined;
  return forward_with_closure(blk, closure);
}

function force(lzv) {
  if (lzv.LAZY_DONE) {
    return lzv.VAL;
  } else {
    return force_lazy_block(lzv);
  }
}

function force_val(lzv) {
  if (lzv.LAZY_DONE) {
    return lzv.VAL;
  } else {
    return force_val_lazy_block(lzv);
  }
}

exports.Undefined = Undefined;
exports.force_lazy_block = force_lazy_block;
exports.force_val_lazy_block = force_val_lazy_block;
exports.force = force;
exports.force_val = force_val;
exports.is_val = is_val;
/* No side effect */