'use strict';

var Caml_option = require("./caml_option.js");
var Belt_internalAVLset = require("./belt_internalAVLset.js");
var Belt_internalSetString = require("./belt_internalSetString.js");

function add(t, x) {
  if (t === undefined) {
    return Belt_internalAVLset.singleton(x);
  }
  var nt = Caml_option.valFromOption(t);
  var v = nt.v;
  if (x === v) {
    return t;
  }
  var l = nt.l;
  var r = nt.r;
  if (x < v) {
    var ll = add(l, x);
    if (ll === l) {
      return t;
    } else {
      return Belt_internalAVLset.bal(ll, v, r);
    }
  }
  var rr = add(r, x);
  if (rr === r) {
    return t;
  } else {
    return Belt_internalAVLset.bal(l, v, rr);
  }
}

function mergeMany(h, arr) {
  var len = arr.length;
  var v = h;
  for(var i = 0; i < len; ++i){
    var key = arr[i];
    v = add(v, key);
  }
  return v;
}

function remove(t, x) {
  if (t === undefined) {
    return t;
  }
  var n = Caml_option.valFromOption(t);
  var v = n.v;
  var l = n.l;
  var r = n.r;
  if (x === v) {
    if (l === undefined) {
      return r;
    }
    if (r === undefined) {
      return l;
    }
    var v$1 = {
      contents: r.v
    };
    var r$1 = Belt_internalAVLset.removeMinAuxWithRef(r, v$1);
    return Belt_internalAVLset.bal(l, v$1.contents, r$1);
  }
  if (x < v) {
    var ll = remove(l, x);
    if (ll === l) {
      return t;
    } else {
      return Belt_internalAVLset.bal(ll, v, r);
    }
  }
  var rr = remove(r, x);
  if (rr === r) {
    return t;
  } else {
    return Belt_internalAVLset.bal(l, v, rr);
  }
}

function removeMany(h, arr) {
  var len = arr.length;
  var v = h;
  for(var i = 0; i < len; ++i){
    var key = arr[i];
    v = remove(v, key);
  }
  return v;
}

function splitAuxNoPivot(n, x) {
  var v = n.v;
  var l = n.l;
  var r = n.r;
  if (x === v) {
    return [
            l,
            r
          ];
  }
  if (x < v) {
    if (l === undefined) {
      return [
              undefined,
              n
            ];
    }
    var match = splitAuxNoPivot(l, x);
    return [
            match[0],
            Belt_internalAVLset.joinShared(match[1], v, r)
          ];
  }
  if (r === undefined) {
    return [
            n,
            undefined
          ];
  }
  var match$1 = splitAuxNoPivot(r, x);
  return [
          Belt_internalAVLset.joinShared(l, v, match$1[0]),
          match$1[1]
        ];
}

function splitAuxPivot(n, x, pres) {
  var v = n.v;
  var l = n.l;
  var r = n.r;
  if (x === v) {
    pres.contents = true;
    return [
            l,
            r
          ];
  }
  if (x < v) {
    if (l === undefined) {
      return [
              undefined,
              n
            ];
    }
    var match = splitAuxPivot(l, x, pres);
    return [
            match[0],
            Belt_internalAVLset.joinShared(match[1], v, r)
          ];
  }
  if (r === undefined) {
    return [
            n,
            undefined
          ];
  }
  var match$1 = splitAuxPivot(r, x, pres);
  return [
          Belt_internalAVLset.joinShared(l, v, match$1[0]),
          match$1[1]
        ];
}

function split(t, x) {
  if (t === undefined) {
    return [
            [
              undefined,
              undefined
            ],
            false
          ];
  }
  var pres = {
    contents: false
  };
  var v = splitAuxPivot(Caml_option.valFromOption(t), x, pres);
  return [
          v,
          pres.contents
        ];
}

function union(s1, s2) {
  if (s1 === undefined) {
    return s2;
  }
  if (s2 === undefined) {
    return s1;
  }
  var n2 = Caml_option.valFromOption(s2);
  var n1 = Caml_option.valFromOption(s1);
  var h1 = n1.h;
  var h2 = n2.h;
  if (h1 >= h2) {
    if (h2 === 1) {
      return add(s1, n2.v);
    }
    var v1 = n1.v;
    var l1 = n1.l;
    var r1 = n1.r;
    var match = splitAuxNoPivot(n2, v1);
    return Belt_internalAVLset.joinShared(union(l1, match[0]), v1, union(r1, match[1]));
  }
  if (h1 === 1) {
    return add(s2, n1.v);
  }
  var v2 = n2.v;
  var l2 = n2.l;
  var r2 = n2.r;
  var match$1 = splitAuxNoPivot(n1, v2);
  return Belt_internalAVLset.joinShared(union(match$1[0], l2), v2, union(match$1[1], r2));
}

function intersect(s1, s2) {
  if (s1 === undefined) {
    return ;
  }
  if (s2 === undefined) {
    return ;
  }
  var n1 = Caml_option.valFromOption(s1);
  var v1 = n1.v;
  var l1 = n1.l;
  var r1 = n1.r;
  var pres = {
    contents: false
  };
  var match = splitAuxPivot(Caml_option.valFromOption(s2), v1, pres);
  var ll = intersect(l1, match[0]);
  var rr = intersect(r1, match[1]);
  if (pres.contents) {
    return Belt_internalAVLset.joinShared(ll, v1, rr);
  } else {
    return Belt_internalAVLset.concatShared(ll, rr);
  }
}

function diff(s1, s2) {
  if (s1 === undefined) {
    return s1;
  }
  if (s2 === undefined) {
    return s1;
  }
  var n1 = Caml_option.valFromOption(s1);
  var v1 = n1.v;
  var l1 = n1.l;
  var r1 = n1.r;
  var pres = {
    contents: false
  };
  var match = splitAuxPivot(Caml_option.valFromOption(s2), v1, pres);
  var ll = diff(l1, match[0]);
  var rr = diff(r1, match[1]);
  if (pres.contents) {
    return Belt_internalAVLset.concatShared(ll, rr);
  } else {
    return Belt_internalAVLset.joinShared(ll, v1, rr);
  }
}

var empty;

var fromArray = Belt_internalSetString.fromArray;

var fromSortedArrayUnsafe = Belt_internalAVLset.fromSortedArrayUnsafe;

var isEmpty = Belt_internalAVLset.isEmpty;

var has = Belt_internalSetString.has;

var subset = Belt_internalSetString.subset;

var cmp = Belt_internalSetString.cmp;

var eq = Belt_internalSetString.eq;

var forEachU = Belt_internalAVLset.forEachU;

var forEach = Belt_internalAVLset.forEach;

var reduceU = Belt_internalAVLset.reduceU;

var reduce = Belt_internalAVLset.reduce;

var everyU = Belt_internalAVLset.everyU;

var every = Belt_internalAVLset.every;

var someU = Belt_internalAVLset.someU;

var some = Belt_internalAVLset.some;

var keepU = Belt_internalAVLset.keepSharedU;

var keep = Belt_internalAVLset.keepShared;

var partitionU = Belt_internalAVLset.partitionSharedU;

var partition = Belt_internalAVLset.partitionShared;

var size = Belt_internalAVLset.size;

var toList = Belt_internalAVLset.toList;

var toArray = Belt_internalAVLset.toArray;

var minimum = Belt_internalAVLset.minimum;

var minUndefined = Belt_internalAVLset.minUndefined;

var maximum = Belt_internalAVLset.maximum;

var maxUndefined = Belt_internalAVLset.maxUndefined;

var get = Belt_internalSetString.get;

var getUndefined = Belt_internalSetString.getUndefined;

var getExn = Belt_internalSetString.getExn;

var checkInvariantInternal = Belt_internalAVLset.checkInvariantInternal;

exports.empty = empty;
exports.fromArray = fromArray;
exports.fromSortedArrayUnsafe = fromSortedArrayUnsafe;
exports.isEmpty = isEmpty;
exports.has = has;
exports.add = add;
exports.mergeMany = mergeMany;
exports.remove = remove;
exports.removeMany = removeMany;
exports.union = union;
exports.intersect = intersect;
exports.diff = diff;
exports.subset = subset;
exports.cmp = cmp;
exports.eq = eq;
exports.forEachU = forEachU;
exports.forEach = forEach;
exports.reduceU = reduceU;
exports.reduce = reduce;
exports.everyU = everyU;
exports.every = every;
exports.someU = someU;
exports.some = some;
exports.keepU = keepU;
exports.keep = keep;
exports.partitionU = partitionU;
exports.partition = partition;
exports.size = size;
exports.toList = toList;
exports.toArray = toArray;
exports.minimum = minimum;
exports.minUndefined = minUndefined;
exports.maximum = maximum;
exports.maxUndefined = maxUndefined;
exports.get = get;
exports.getUndefined = getUndefined;
exports.getExn = getExn;
exports.split = split;
exports.checkInvariantInternal = checkInvariantInternal;
/* No side effect */
