var LZMA = (function () {
  var action_compress   = 1,
    action_decompress = 2,
    action_update   = 3;
  
  function update_progress(percent, callback_num) {
    ///TODO: Calculate ETA.
    postMessage({
      action: 3,
      callback_num: callback_num,
      result: percent
    });
  }
  
  var $moduleName, $moduleBase;
  
  var _,
    N8000000000000000_longLit = [0, -9223372036854775808],
    N1_longLit = [4294967295, -4294967296],
    P0_longLit = [0, 0],
    P1_longLit = [1, 0],
    P4_longLit = [4, 0],
    P1000_longLit = [4096, 0],
    Pffffff_longLit = [16777215, 0],
    P1000000_longLit = [16777216, 0],
    Pff000000_longLit = [4278190080, 0],
    Pffffffff_longLit = [4294967295, 0],
    P7fffffffffffffff_longLit = [4294967295, 9223372032559808512];

  function getClass_18() {
    return Ljava_lang_Object_2_classLit;
  }
  
  function Object_0() {
  }
  
  _ = Object_0.prototype = {};
  _.getClass$ = getClass_18;
  _.typeMarker$ = nullMethod;
  _.typeId$ = 1;
  function getClass_22() {
    return Ljava_lang_Throwable_2_classLit;
  }
  
  function Throwable() {
  }
  
  _ = Throwable.prototype = new Object_0();
  _.getClass$ = getClass_22;
  _.typeId$ = 3;
  _.detailMessage = null;
  function getClass_13() {
    return Ljava_lang_Exception_2_classLit;
  }
  
  function Exception() {
  }
  
  _ = Exception.prototype = new Throwable();
  _.getClass$ = getClass_13;
  _.typeId$ = 4;
  function $RuntimeException(this$static, message) {
    this$static.detailMessage = message;
    return this$static;
  }
  
  function getClass_19() {
    return Ljava_lang_RuntimeException_2_classLit;
  }
  
  function RuntimeException() {
  }
  
  _ = RuntimeException.prototype = new Exception();
  _.getClass$ = getClass_19;
  _.typeId$ = 5;
  function $JavaScriptException(this$static, e) {
    return this$static;
  }
  
  function getClass_0() {
    return Lcom_google_gwt_core_client_JavaScriptException_2_classLit;
  }
  
  function JavaScriptException() {
  }
  
  _ = JavaScriptException.prototype = new RuntimeException();
  _.getClass$ = getClass_0;
  _.typeId$ = 6;
  function $append(a, x) {
    a[a.explicitLength++] = x;
  }
  
  function $appendNonNull(a, x) {
    a[a.explicitLength++] = x;
  }
  
  function $toString(a) {
    var s_0, s;
    s_0 = (s = a.join('') , a.length = a.explicitLength = 0 , s);
    a[a.explicitLength++] = s_0;
    return s_0;
  }
  
  function createFromSeed(seedType, length_0) {
    var array = new Array(length_0);
    if (seedType > 0) {
      var value = [null, 0, false, [0, 0]][seedType];
      for (var i = 0; i < length_0; ++i) {
        array[i] = value;
      }
    }
    return array;
  }
  
  function getClass_2() {
    return this.arrayClass$;
  }
  
  function initDim(arrayClass, typeId, queryId, length_0, seedType) {
    var result;
    result = createFromSeed(seedType, length_0);
    $clinit_4();
    wrapArray(result, expandoNames_0, expandoValues_0);
    result.arrayClass$ = arrayClass;
    result.typeId$ = typeId;
    result.queryId$ = queryId;
    return result;
  }
  
  function initValues(arrayClass, typeId, queryId, array) {
    $clinit_4();
    wrapArray(array, expandoNames_0, expandoValues_0);
    array.arrayClass$ = arrayClass;
    array.typeId$ = typeId;
    array.queryId$ = queryId;
    return array;
  }
  
  function setCheck(array, index, value) {
    if (value != null) {
      if (array.queryId$ > 0 && !canCastUnsafe(value.typeId$, array.queryId$)) {
      throw new ArrayStoreException();
      }
      if (array.queryId$ < 0 && (value.typeMarker$ == nullMethod || value.typeId$ == 2)) {
      throw new ArrayStoreException();
      }
    }
    return array[index] = value;
  }
  
  function Array_0() {
  }
  
  _ = Array_0.prototype = new Object_0();
  _.getClass$ = getClass_2;
  _.typeId$ = 0;
  _.arrayClass$ = null;
  _.length = 0;
  _.queryId$ = 0;
  function $clinit_4() {
    $clinit_4 = nullMethod;
    expandoNames_0 = [];
    expandoValues_0 = [];
    initExpandos(new Array_0(), expandoNames_0, expandoValues_0);
  }
  
  function initExpandos(protoType, expandoNames, expandoValues) {
    var i = 0, value;
    for (var name_0 in protoType) {
      if (value = protoType[name_0]) {
      expandoNames[i] = name_0;
      expandoValues[i] = value;
      ++i;
      }
    }
  }
  
  function wrapArray(array, expandoNames, expandoValues) {
    $clinit_4();
    for (var i = 0, c = expandoNames.length; i < c; ++i) {
      array[expandoNames[i]] = expandoValues[i];
    }
  }
  
  var expandoNames_0, expandoValues_0;
  function canCast(srcId, dstId) {
    return srcId && !!typeIdArray[srcId][dstId];
  }
  
  function canCastUnsafe(srcId, dstId) {
    return srcId && typeIdArray[srcId][dstId];
  }
  
  function dynamicCast(src, dstId) {
    if (src != null && !canCastUnsafe(src.typeId$, dstId)) {
      throw new ClassCastException();
    }
    return src;
  }
  
  function instanceOf(src, dstId) {
    return src != null && canCast(src.typeId$, dstId);
  }
  
  function round_int(x) {
    return ~~Math.max(Math.min(x, 2147483647), -2147483648);
  }
  
  var typeIdArray = [
      {},
      {},
      {1:1},
      {2:1},
      {2:1},
      {2:1},
      {2:1},
      {2:1, 10:1},
      {2:1},
      {2:1},
      {2:1},
      {2:1},
      {2:1},
      {2:1, 11:1},
      {2:1},
      {2:1},
      {2:1},
      {4:1},
      {5:1},
      {6:1},
      {7:1},
      {8:1},
      {9:1}
    ];

  function caught(e) {
    if (e != null && canCast(e.typeId$, 2)) {
      return e;
    }
    return $JavaScriptException(new JavaScriptException(), e);
  }
  
  function add(a, b) {
    var newHigh, newLow;
    newHigh = a[1] + b[1];
    newLow = a[0] + b[0];
    return create(newLow, newHigh);
  }
  
  function addTimes(accum, a, b) {
    if (a == 0) {
      return accum;
    }
    if (b == 0) {
      return accum;
    }
    return add(accum, create(a * b, 0));
  }
  
  function and(a, b) {
    return makeFromBits(~~Math.max(Math.min(a[1] / 4294967296, 2147483647), -2147483648) & ~~Math.max(Math.min(b[1] / 4294967296, 2147483647), -2147483648), lowBits_0(a) & lowBits_0(b));
  }
  
  function compare(a, b) {
    var nega, negb;
    if (a[0] == b[0] && a[1] == b[1]) {
      return 0;
    }
    nega = a[1] < 0;
    negb = b[1] < 0;
    if (nega && !negb) {
      return -1;
    }
    if (!nega && negb) {
      return 1;
    }
    if (sub(a, b)[1] < 0) {
      return -1;
    }
    else {
      return 1;
    }
  }
  
  function create(valueLow, valueHigh) {
    var diffHigh, diffLow;
    valueHigh %= 1.8446744073709552E19;
    valueLow %= 1.8446744073709552E19;
    diffHigh = valueHigh % 4294967296;
    diffLow = Math.floor(valueLow / 4294967296) * 4294967296;
    valueHigh = valueHigh - diffHigh + diffLow;
    valueLow = valueLow - diffLow + diffHigh;
    while (valueLow < 0) {
      valueLow += 4294967296;
      valueHigh -= 4294967296;
    }
    while (valueLow > 4294967295) {
      valueLow -= 4294967296;
      valueHigh += 4294967296;
    }
    valueHigh = valueHigh % 1.8446744073709552E19;
    while (valueHigh > 9223372032559808512) {
      valueHigh -= 1.8446744073709552E19;
    }
    while (valueHigh < -9223372036854775808) {
      valueHigh += 1.8446744073709552E19;
    }
    return [valueLow, valueHigh];
  }
  
  function div(a, b) {
    var approx, deltaRem, deltaResult, halfa, rem, result;
    if (b[0] == 0 && b[1] == 0) {
      throw $ArithmeticException(new ArithmeticException(), '/ by zero');
    }
    if (a[0] == 0 && a[1] == 0) {
      return $clinit_10() , ZERO;
    }
    if (eq(a, ($clinit_10() , MIN_VALUE))) {
      if (eq(b, ONE) || eq(b, NEG_ONE)) {
        return MIN_VALUE;
      }
      halfa = shr(a, 1);
      approx = shl(div(halfa, b), 1);
      rem = sub(a, mul(b, approx));
      return add(approx, div(rem, b));
    }
    if (eq(b, MIN_VALUE)) {
      return ZERO;
    }
    if (a[1] < 0) {
      if (b[1] < 0) {
        return div(neg(a), neg(b));
      } else {
        return neg(div(neg(a), b));
      }
    }
    if (b[1] < 0) {
      return neg(div(a, neg(b)));
    }
    result = ZERO;
    rem = a;
    while (compare(rem, b) >= 0) {
      deltaResult = fromDouble(Math.floor(toDoubleRoundDown(rem) / toDoubleRoundUp(b)));
      if (deltaResult[0] == 0 && deltaResult[1] == 0) {
        deltaResult = ONE;
      }
      deltaRem = mul(deltaResult, b);
      result = add(result, deltaResult);
      rem = sub(rem, deltaRem);
    }
    return result;
  }
  
  function eq(a, b) {
    return a[0] == b[0] && a[1] == b[1];
  }
  
  function fromDouble(value) {
    if (isNaN(value)) {
      return $clinit_10() , ZERO;
    }
    if (value < -9223372036854775808) {
      return $clinit_10() , MIN_VALUE;
    }
    if (value >= 9223372036854775807) {
      return $clinit_10() , MAX_VALUE;
    }
    if (value > 0) {
      return create(Math.floor(value), 0);
    } else {
      return create(Math.ceil(value), 0);
    }
  }
  
  function fromInt(value) {
    var rebase, result;
    if (value > -129 && value < 128) {
      rebase = value + 128;
      result = ($clinit_9() , boxedValues)[rebase];
      if (result == null) {
        result = boxedValues[rebase] = internalFromInt(value);
      }
      return result;
    }
    return internalFromInt(value);
  }
  
  function internalFromInt(value) {
    if (value >= 0) {
      return [value, 0];
    } else {
      return [value + 4294967296, -4294967296];
    }
  }
  
  function lowBits_0(a) {
    if (a[0] >= 2147483648) {
      return ~~Math.max(Math.min(a[0] - 4294967296, 2147483647), -2147483648);
    } else {
      return ~~Math.max(Math.min(a[0], 2147483647), -2147483648);
    }
  }
  
  function makeFromBits(highBits, lowBits) {
    var high, low;
    high = highBits * 4294967296;
    low = lowBits;
    if (lowBits < 0) {
      low += 4294967296;
    }
    return [low, high];
  }
  
  function mul(a, b) {
    var a1, a2, a3, a4, b1, b2, b3, b4, res;
    if (a[0] == 0 && a[1] == 0) {
      return $clinit_10() , ZERO;
    }
    if (b[0] == 0 && b[1] == 0) {
      return $clinit_10() , ZERO;
    }
    if (eq(a, ($clinit_10() , MIN_VALUE))) {
      return multByMinValue(b);
    }
    if (eq(b, MIN_VALUE)) {
      return multByMinValue(a);
    }
    if (a[1] < 0) {
      if (b[1] < 0) {
        return mul(neg(a), neg(b));
      } else {
        return neg(mul(neg(a), b));
      }
    }
    if (b[1] < 0) {
      return neg(mul(a, neg(b)));
    }
    if (compare(a, TWO_PWR_24) < 0 && compare(b, TWO_PWR_24) < 0) {
      return create((a[1] + a[0]) * (b[1] + b[0]), 0);
    }
    a3 = a[1] % 281474976710656;
    a4 = a[1] - a3;
    a1 = a[0] % 65536;
    a2 = a[0] - a1;
    b3 = b[1] % 281474976710656;
    b4 = b[1] - b3;
    b1 = b[0] % 65536;
    b2 = b[0] - b1;
    res = ZERO;
    res = addTimes(res, a4, b1);
    res = addTimes(res, a3, b2);
    res = addTimes(res, a3, b1);
    res = addTimes(res, a2, b3);
    res = addTimes(res, a2, b2);
    res = addTimes(res, a2, b1);
    res = addTimes(res, a1, b4);
    res = addTimes(res, a1, b3);
    res = addTimes(res, a1, b2);
    res = addTimes(res, a1, b1);
    return res;
  }
  
  function multByMinValue(a) {
    if ((lowBits_0(a) & 1) == 1) {
      return $clinit_10() , MIN_VALUE;
    } else {
      return $clinit_10() , ZERO;
    }
  }
  
  function neg(a) {
    var newHigh, newLow;
    if (eq(a, ($clinit_10() , MIN_VALUE))) {
      return MIN_VALUE;
    }
    newHigh = -a[1];
    newLow = -a[0];
    if (newLow > 4294967295) {
      newLow -= 4294967296;
      newHigh += 4294967296;
    }
    if (newLow < 0) {
      newLow += 4294967296;
      newHigh -= 4294967296;
    }
    return [newLow, newHigh];
  }
  
  function pwrAsDouble(n) {
    if (n <= 30) {
      return 1 << n;
    } else {
      return pwrAsDouble(30) * pwrAsDouble(n - 30);
    }
  }
  
  function shl(a, n) {
    var diff, newHigh, newLow, twoToN;
    n &= 63;
    if (eq(a, ($clinit_10() , MIN_VALUE))) {
      if (n == 0) {
        return a;
      } else {
        return ZERO;
      }
    }
    if (a[1] < 0) {
      return neg(shl(neg(a), n));
    }
    twoToN = pwrAsDouble(n);
    newHigh = a[1] * twoToN % 1.8446744073709552E19;
    newLow = a[0] * twoToN;
    diff = newLow - newLow % 4294967296;
    newHigh += diff;
    newLow -= diff;
    if (newHigh >= 9223372036854775807) {
      newHigh -= 1.8446744073709552E19;
    }
    return [newLow, newHigh];
  }
  
  function shr(a, n) {
    var newHigh, newLow, shiftFact;
    n &= 63;
    shiftFact = pwrAsDouble(n);
    newHigh = a[1] / shiftFact;
    newLow = Math.floor(a[0] / shiftFact);
    return create(newLow, newHigh);
  }
  
  function shru(a, n) {
    var sr;
    n &= 63;
    sr = shr(a, n);
    if (a[1] < 0) {
      sr = add(sr, shl(($clinit_10() , TWO), 63 - n));
    }
    return sr;
  }
  
  function sub(a, b) {
    var newHigh, newLow;
    newHigh = a[1] - b[1];
    newLow = a[0] - b[0];
    return create(newLow, newHigh);
  }
  
  function toDoubleRoundDown(a) {
    var diff, magnitute, toSubtract;
    magnitute = round_int(Math.log(a[1]) / ($clinit_10() , LN_2));
    if (magnitute <= 48) {
      return a[1] + a[0];
    } else {
      diff = magnitute - 48;
      toSubtract = (1 << diff) - 1;
      return a[1] + (a[0] - toSubtract);
    }
  }
  
  function toDoubleRoundUp(a) {
    var diff, magnitute, toAdd;
    magnitute = round_int(Math.log(a[1]) / ($clinit_10() , LN_2));
    if (magnitute <= 48) {
      return a[1] + a[0];
    } else {
      diff = magnitute - 48;
      toAdd = (1 << diff) - 1;
      return a[1] + (a[0] + toAdd);
    }
  }
  
  function toString_0(a) {
    var digits, rem, remDivTenPower, res, tenPowerLong, zeroesNeeded;
    if (a[0] == 0 && a[1] == 0) {
      return '0';
    }
    if (eq(a, ($clinit_10() , MIN_VALUE))) {
      return '-9223372036854775808';
    }
    if (a[1] < 0) {
      return '-' + toString_0(neg(a));
    }
    rem = a;
    res = '';
    while (!(rem[0] == 0 && rem[1] == 0)) {
      tenPowerLong = fromInt(1000000000);
      remDivTenPower = div(rem, tenPowerLong);
      digits = '' + lowBits_0(sub(rem, mul(remDivTenPower, tenPowerLong)));
      rem = remDivTenPower;
      if (!(rem[0] == 0 && rem[1] == 0)) {
        zeroesNeeded = 9 - digits.length;
        for (; zeroesNeeded > 0; --zeroesNeeded) {
          digits = '0' + digits;
        }
      }
      res = digits + res;
    }
    return res;
  }
  
  function $clinit_9() {
    $clinit_9 = nullMethod;
    boxedValues = initDim(_3_3D_classLit, 0, 9, 256, 0);
  }
  
  var boxedValues;
  function $clinit_10() {
    $clinit_10 = nullMethod;
    LN_2 = Math.log(2);
    MAX_VALUE = P7fffffffffffffff_longLit;
    MIN_VALUE = N8000000000000000_longLit;
    NEG_ONE = fromInt(-1);
    ONE = fromInt(1);
    TWO = fromInt(2);
    TWO_PWR_24 = P1000000_longLit;
    ZERO = fromInt(0);
  }
  
  var LN_2, MAX_VALUE, MIN_VALUE, NEG_ONE, ONE, TWO, TWO_PWR_24, ZERO;
  function getClass_6() {
    return Ljava_io_InputStream_2_classLit;
  }
  
  function InputStream() {
  }
  
  _ = InputStream.prototype = new Object_0();
  _.getClass$ = getClass_6;
  _.typeId$ = 0;
  function $ByteArrayInputStream(this$static, buf) {
    $ByteArrayInputStream_0(this$static, buf, 0, buf.length);
    return this$static;
  }
  
  function $ByteArrayInputStream_0(this$static, buf, off, len) {
    this$static.buf = buf;
    this$static.pos = off;
    this$static.count = off + len;
    if (this$static.count > buf.length)
      this$static.count = buf.length;
    return this$static;
  }
  
  function $read(this$static) {
    if (this$static.pos >= this$static.count)
      return -1;
    return this$static.buf[this$static.pos++] & 255;
  }
  
  function $read_0(this$static, buf, off, len) {
    if (this$static.pos >= this$static.count)
      return -1;
    len = min(len, this$static.count - this$static.pos);
    arraycopy(this$static.buf, this$static.pos, buf, off, len);
    this$static.pos += len;
    return len;
  }
  
  function getClass_3() {
    return Ljava_io_ByteArrayInputStream_2_classLit;
  }
  
  function ByteArrayInputStream() {
  }
  
  _ = ByteArrayInputStream.prototype = new InputStream();
  _.getClass$ = getClass_3;
  _.typeId$ = 0;
  _.buf = null;
  _.count = 0;
  _.pos = 0;
  function getClass_7() {
    return Ljava_io_OutputStream_2_classLit;
  }
  
  function OutputStream() {
  }
  
  _ = OutputStream.prototype = new Object_0();
  _.getClass$ = getClass_7;
  _.typeId$ = 0;
  function $ByteArrayOutputStream(this$static) {
    this$static.buf = initDim(_3B_classLit, 0, -1, 32, 1);
    return this$static;
  }
  
  function $ensureCapacity(this$static, len) {
    var newbuf;
    if (len <= this$static.buf.length)
      return;
    len = max(len, this$static.buf.length * 2);
    newbuf = initDim(_3B_classLit, 0, -1, len, 1);
    arraycopy(this$static.buf, 0, newbuf, 0, this$static.buf.length);
    this$static.buf = newbuf;
  }
  
  function $toByteArray(this$static) {
    var data;
    data = initDim(_3B_classLit, 0, -1, this$static.count, 1);
    arraycopy(this$static.buf, 0, data, 0, this$static.count);
    return data;
  }
  
  function $write(this$static, b) {
    $ensureCapacity(this$static, this$static.count + 1);
    this$static.buf[this$static.count++] = b << 24 >> 24;
  }
  
  function $write_0(this$static, buf, off, len) {
    $ensureCapacity(this$static, this$static.count + len);
    arraycopy(buf, off, this$static.buf, this$static.count, len);
    this$static.count += len;
  }
  
  function getClass_4() {
    return Ljava_io_ByteArrayOutputStream_2_classLit;
  }
  
  function ByteArrayOutputStream() {
  }
  
  _ = ByteArrayOutputStream.prototype = new OutputStream();
  _.getClass$ = getClass_4;
  _.typeId$ = 0;
  _.buf = null;
  _.count = 0;
  function $IOException(this$static, message) {
    this$static.detailMessage = message;
    return this$static;
  }
  
  function getClass_5() {
    return Ljava_io_IOException_2_classLit;
  }
  
  function IOException() {
  }
  
  _ = IOException.prototype = new Exception();
  _.getClass$ = getClass_5;
  _.typeId$ = 7;
  function $ArithmeticException(this$static, explanation) {
    this$static.detailMessage = explanation;
    return this$static;
  }
  
  function getClass_8() {
    return Ljava_lang_ArithmeticException_2_classLit;
  }
  
  function ArithmeticException() {
  }
  
  _ = ArithmeticException.prototype = new RuntimeException();
  _.getClass$ = getClass_8;
  _.typeId$ = 8;
  function $ArrayStoreException(this$static, message) {
    this$static.detailMessage = message;
    return this$static;
  }
  
  function getClass_9() {
    return Ljava_lang_ArrayStoreException_2_classLit;
  }
  
  function ArrayStoreException() {
  }
  
  _ = ArrayStoreException.prototype = new RuntimeException();
  _.getClass$ = getClass_9;
  _.typeId$ = 9;
  function createForArray(packageName, className) {
    var clazz;
    clazz = new Class();
    clazz.typeName = packageName + className;
    return clazz;
  }
  
  function createForClass(packageName, className) {
    var clazz;
    clazz = new Class();
    clazz.typeName = packageName + className;
    return clazz;
  }
  
  function createForEnum(packageName, className) {
    var clazz;
    clazz = new Class();
    clazz.typeName = packageName + className;
    return clazz;
  }
  
  function getClass_11() {
    return Ljava_lang_Class_2_classLit;
  }
  
  function Class() {
  }
  
  _ = Class.prototype = new Object_0();
  _.getClass$ = getClass_11;
  _.typeId$ = 0;
  _.typeName = null;
  function getClass_10() {
    return Ljava_lang_ClassCastException_2_classLit;
  }
  
  function ClassCastException() {
  }
  
  _ = ClassCastException.prototype = new RuntimeException();
  _.getClass$ = getClass_10;
  _.typeId$ = 12;
  function getClass_12() {
    return Ljava_lang_Enum_2_classLit;
  }
  
  function Enum() {
  }
  
  _ = Enum.prototype = new Object_0();
  _.getClass$ = getClass_12;
  _.typeId$ = 0;
  function $IllegalArgumentException(this$static, message) {
    this$static.detailMessage = message;
    return this$static;
  }
  
  function getClass_14() {
    return Ljava_lang_IllegalArgumentException_2_classLit;
  }
  
  function IllegalArgumentException() {
  }
  
  _ = IllegalArgumentException.prototype = new RuntimeException();
  _.getClass$ = getClass_14;
  _.typeId$ = 13;
  function getClass_15() {
    return Ljava_lang_IllegalStateException_2_classLit;
  }
  
  function IllegalStateException() {
  }
  
  _ = IllegalStateException.prototype = new RuntimeException();
  _.getClass$ = getClass_15;
  _.typeId$ = 14;
  function getClass_16() {
    return Ljava_lang_IndexOutOfBoundsException_2_classLit;
  }
  
  function IndexOutOfBoundsException() {
  }
  
  _ = IndexOutOfBoundsException.prototype = new RuntimeException();
  _.getClass$ = getClass_16;
  _.typeId$ = 15;
  function max(x, y) {
    return x > y?x:y;
  }
  
  function min(x, y) {
    return x < y?x:y;
  }
  
  function getClass_17() {
    return Ljava_lang_NullPointerException_2_classLit;
  }
  
  function NullPointerException() {
  }
  
  _ = NullPointerException.prototype = new RuntimeException();
  _.getClass$ = getClass_17;
  _.typeId$ = 16;
  function $equals(this$static, other) {
    if (other == null) {
      return false;
    }
    return String(this$static) == other;
  }
  
  function $getChars(this$static, srcBegin, srcEnd, dst, dstBegin) {
    var srcIdx;
    for (srcIdx = srcBegin; srcIdx < srcEnd; ++srcIdx) {
      dst[dstBegin++] = this$static.charCodeAt(srcIdx);
    }
  }
  
  function getClass_21() {
    return Ljava_lang_String_2_classLit;
  }
  
  _ = String.prototype;
  _.getClass$ = getClass_21;
  _.typeId$ = 2;
  function $StringBuilder(this$static) {
    var array;
    this$static.data = (array = [] , array.explicitLength = 0 , array);
    return this$static;
  }
  
  function getClass_20() {
    return Ljava_lang_StringBuilder_2_classLit;
  }
  
  function StringBuilder() {
  }
  
  _ = StringBuilder.prototype = new Object_0();
  _.getClass$ = getClass_20;
  _.typeId$ = 0;
  function arraycopy(src, srcOfs, dest, destOfs, len) {
    var destArray, destEnd, destTypeName, destlen, i, srcArray, srcTypeName, srclen;
    
    if (src == null || dest == null) {
      throw new NullPointerException();
    }
    
    srcTypeName  = (src.typeMarker$  == nullMethod || src.typeId$  == 2 ? src.getClass$()  : Lcom_google_gwt_core_client_JavaScriptObject_2_classLit).typeName;
    destTypeName = (dest.typeMarker$ == nullMethod || dest.typeId$ == 2 ? dest.getClass$() : Lcom_google_gwt_core_client_JavaScriptObject_2_classLit).typeName;
    
    if (srcTypeName.charCodeAt(0) != 91 || destTypeName.charCodeAt(0) != 91) {
      throw $ArrayStoreException(new ArrayStoreException(), 'Must be array types');
    }
    if (srcTypeName.charCodeAt(1) != destTypeName.charCodeAt(1)) {
      throw $ArrayStoreException(new ArrayStoreException(), 'Array types must match');
    }
    
    srclen  = src.length;
    destlen = dest.length;
    if (srcOfs < 0 || destOfs < 0 || len < 0 || srcOfs + len > srclen || destOfs + len > destlen) {
      throw new IndexOutOfBoundsException();
    }
    if ((srcTypeName.charCodeAt(1) == 76 || srcTypeName.charCodeAt(1) == 91) && !$equals(srcTypeName, destTypeName)) {
      srcArray  = dynamicCast(src, 3);
      destArray = dynamicCast(dest, 3);
      if ((src == null ? null : src) === (dest == null ? null : dest) && srcOfs < destOfs) {
        srcOfs += len;
        for (destEnd = destOfs + len; destEnd-- > destOfs;) {
          setCheck(destArray, destEnd, srcArray[--srcOfs]);
        }
      } else {
        for (destEnd = destOfs + len; destOfs < destEnd;) {
          setCheck(destArray, destOfs++, srcArray[srcOfs++]);
        }
      }
    } else {
      for (i = 0; i < len; ++i) {
        dest[destOfs + i] = src[srcOfs + i]
      }
    }
  }
  
  
  function $configure(this$static, encoder) {
  if (!$SetDictionarySize_0(encoder, 1 << this$static.dictionarySize))
    throw $RuntimeException(new RuntimeException(), 'unexpected failure');
  if (!$SetNumFastBytes(encoder, this$static.fb))
    throw $RuntimeException(new RuntimeException(), 'unexpected failure');
  if (!$SetMatchFinder(encoder, this$static.matchFinder))
    throw $RuntimeException(new RuntimeException(), 'unexpected failure');
  if (!$SetLcLpPb_0(encoder, this$static.lc, this$static.lp, this$static.pb))
    throw $RuntimeException(new RuntimeException(), 'unexpected failure');
  }
  
  function getClass_23() {
    return Lorg_dellroad_lzma_client_CompressionMode_2_classLit;
  }
  
  function CompressionMode() {
  }
  
  _ = CompressionMode.prototype = new Enum();
  _.getClass$ = getClass_23;
  _.typeId$ = 0;
  _.dictionarySize = 0;
  _.fb = 0;
  _.lc = 0;
  _.lp = 0;
  _.matchFinder = 0;
  _.pb = 0;
  
  function $execute(this$static) {
    var $e0;
    try {
      return $processChunk(this$static.chunker);
    }
    catch ($e0) {
      $e0 = caught($e0);
      if (instanceOf($e0, 10)) {
        return false;
      } else {
        throw $e0;
      }
    }
  }
  
  function $init(this$static, input, output, length_0, mode) {
    var encoder, i;
    if (!mode)
      throw $IllegalArgumentException(new IllegalArgumentException(), 'null mode');
    if (compare(length_0, N1_longLit) < 0)
      throw $IllegalArgumentException(new IllegalArgumentException(), 'invalid length ' + toString_0(length_0));
    this$static.length_0 = length_0;
    encoder = $Encoder(new Encoder());
    $configure(mode, encoder);
    encoder._writeEndMark = true;
    $WriteCoderProperties(encoder, output);
    for (i = 0; i < 64; i += 8)
      $write(output, lowBits_0(shr(length_0, i)) & 255);
    this$static.chunker = (encoder._needReleaseMFStream = false , (encoder._inStream = input , encoder._finished = false , $Create_2(encoder) , encoder._rangeEncoder.Stream = output , $Init_4(encoder) , $FillDistancesPrices(encoder) , $FillAlignPrices(encoder) , encoder._lenEncoder._tableSize = encoder._numFastBytes + 1 - 2 , $UpdateTables(encoder._lenEncoder, 1 << encoder._posStateBits) , encoder._repMatchLenEncoder._tableSize = encoder._numFastBytes + 1 - 2 , $UpdateTables(encoder._repMatchLenEncoder, 1 << encoder._posStateBits) , encoder.nowPos64 = P0_longLit , undefined) , $Chunker_0(new Chunker(), encoder));
  }
  
  function getClass_26() {
    return Lorg_dellroad_lzma_client_LZMACompressor_2_classLit;
  }
  
  function LZMACompressor() {
  }
  
  _ = LZMACompressor.prototype = new Object_0();
  _.getClass$ = getClass_26;
  _.typeId$ = 0;
  _.chunker = null;
  
  function $LZMAByteArrayCompressor(this$static, data, mode) {
    var $e0;
    this$static.output = $ByteArrayOutputStream(new ByteArrayOutputStream());
    try {
      $init(this$static, $ByteArrayInputStream(new ByteArrayInputStream(), data), this$static.output, fromInt(data.length), mode);
    } catch ($e0) {
      $e0 = caught($e0);
      if (instanceOf($e0, 10)) {
        throw $RuntimeException(new RuntimeException(), 'impossible exception');
      } else {
        throw $e0;
      }
    }
    return this$static;
  }
  
  function getClass_24() {
    return Lorg_dellroad_lzma_client_LZMAByteArrayCompressor_2_classLit;
  }
  
  function LZMAByteArrayCompressor() {
  }
  
  _ = LZMAByteArrayCompressor.prototype = new LZMACompressor();
  _.getClass$ = getClass_24;
  _.typeId$ = 0;
  _.output = null;
  function $execute_0(this$static) {
    var $e0, e;
    try {
      return $processChunk(this$static.chunker);
    }
    catch ($e0) {
      $e0 = caught($e0);
      if (instanceOf($e0, 10)) {
        e = $e0;
        this$static.exception = e;
        return false;
      } else {
        throw $e0;
      }
    }
  }
  
  function $init_0(this$static, input, output) {
    var decoder,
      hex_length = "",
      i,
      properties,
      r,
      tmp_length;
    
    properties = initDim(_3B_classLit, 0, -1, 5, 1);
    for (i = 0; i < properties.length; ++i) {
      r = $read(input);
      if (r == -1)
        throw $IOException(new IOException(), 'truncated input');
      properties[i] = r << 24 >> 24;
    }
    decoder = $Decoder(new Decoder());
    if (!$SetDecoderProperties(decoder, properties))
      throw $IOException(new IOException(), 'corrupted input');
    
    for (i = 0; i < 64; i += 8) {
      r = $read(input);
      if (r == -1)
        throw $IOException(new IOException(), 'truncated input');
      r = r.toString(16);
      if (r.length == 1) r = "0" + r;
      hex_length = r + "" + hex_length;
    }
    
    /// Was the length set in the header (if it was compressed from a stream, the length is all f's).
    if (hex_length.toLowerCase() == "ffffffffffffffffff" || hex_length == 0) {
      /// The length is unknown, so set to -1.
      this$static.length_0 = N1_longLit;
    } else {
      ///NOTE: If there is a problem with the decoder because of the length, you can always set the length to -1 (N1_longLit) which means unknown.
      tmp_length = parseInt(hex_length, 16);
      /// If the length is too long to handle, just set it to unknown.
      if (tmp_length > 4294967295) {
        this$static.length_0 = N1_longLit;
      } else {
        this$static.length_0 = fromDouble(tmp_length);
      }
    }
    
    this$static.chunker = $CodeInChunks(decoder, input, output, this$static.length_0);
  }
  
  function getClass_27() {
    return Lorg_dellroad_lzma_client_LZMADecompressor_2_classLit;
  }
  
  function LZMADecompressor() {
  }
  
  _ = LZMADecompressor.prototype = new Object_0();
  _.getClass$ = getClass_27;
  _.typeId$ = 0;
  _.chunker = null;
  _.exception = null;
  _.length_0 = P0_longLit;
  function $LZMAByteArrayDecompressor(this$static, data) {
    this$static.output = $ByteArrayOutputStream(new ByteArrayOutputStream());
    $init_0(this$static, $ByteArrayInputStream(new ByteArrayInputStream(), data), this$static.output);
    return this$static;
  }
  
  function getClass_25() {
    return Lorg_dellroad_lzma_client_LZMAByteArrayDecompressor_2_classLit;
  }
  
  function LZMAByteArrayDecompressor() {
  }
  
  _ = LZMAByteArrayDecompressor.prototype = new LZMADecompressor();
  _.getClass$ = getClass_25;
  _.typeId$ = 0;
  _.output = null;
  function $Create_4(this$static, keepSizeBefore, keepSizeAfter, keepSizeReserv) {
    var blockSize;
    this$static._keepSizeBefore = keepSizeBefore;
    this$static._keepSizeAfter = keepSizeAfter;
    blockSize = keepSizeBefore + keepSizeAfter + keepSizeReserv;
    if (this$static._bufferBase == null || this$static._blockSize != blockSize) {
      this$static._bufferBase = null;
      this$static._blockSize = blockSize;
      this$static._bufferBase = initDim(_3B_classLit, 0, -1, this$static._blockSize, 1);
    }
    this$static._pointerToLastSafePosition = this$static._blockSize - keepSizeAfter;
  }
  
  function $GetIndexByte(this$static, index) {
    return this$static._bufferBase[this$static._bufferOffset + this$static._pos + index];
  }
  
  function $GetMatchLen(this$static, index, distance, limit) {
    var i, pby;
    if (this$static._streamEndWasReached) {
      if (this$static._pos + index + limit > this$static._streamPos) {
        limit = this$static._streamPos - (this$static._pos + index);
      }
    }
    ++distance;
    pby = this$static._bufferOffset + this$static._pos + index;
    for (i = 0; i < limit && this$static._bufferBase[pby + i] == this$static._bufferBase[pby + i - distance]; ++i) {
    }
    return i;
  }
  
  function $GetNumAvailableBytes(this$static) {
    return this$static._streamPos - this$static._pos;
  }
  
  function $MoveBlock(this$static) {
    var i, numBytes, offset;
    offset = this$static._bufferOffset + this$static._pos - this$static._keepSizeBefore;
    if (offset > 0) {
      --offset;
    }
    numBytes = this$static._bufferOffset + this$static._streamPos - offset;
    for (i = 0; i < numBytes; ++i) {
      this$static._bufferBase[i] = this$static._bufferBase[offset + i];
    }
    this$static._bufferOffset -= offset;
  }
  
  function $MovePos_1(this$static) {
    var pointerToPostion;
    ++this$static._pos;
    if (this$static._pos > this$static._posLimit) {
      pointerToPostion = this$static._bufferOffset + this$static._pos;
      if (pointerToPostion > this$static._pointerToLastSafePosition) {
        $MoveBlock(this$static);
      }
      $ReadBlock(this$static);
    }
  }
  
  function $ReadBlock(this$static) {
    var numReadBytes, pointerToPostion, size;
    if (this$static._streamEndWasReached)
      return;
    while (true) {
      size = -this$static._bufferOffset + this$static._blockSize - this$static._streamPos;
      if (size == 0)
        return;
      numReadBytes = $read_0(this$static._stream, this$static._bufferBase, this$static._bufferOffset + this$static._streamPos, size);
      if (numReadBytes == -1) {
        this$static._posLimit = this$static._streamPos;
        pointerToPostion = this$static._bufferOffset + this$static._posLimit;
        if (pointerToPostion > this$static._pointerToLastSafePosition) {
          this$static._posLimit = this$static._pointerToLastSafePosition - this$static._bufferOffset;
        }
        this$static._streamEndWasReached = true;
        return;
      }
      this$static._streamPos += numReadBytes;
      if (this$static._streamPos >= this$static._pos + this$static._keepSizeAfter) {
        this$static._posLimit = this$static._streamPos - this$static._keepSizeAfter;
      }
    }
  }
  
  function $ReduceOffsets(this$static, subValue) {
    this$static._bufferOffset += subValue;
    this$static._posLimit -= subValue;
    this$static._pos -= subValue;
    this$static._streamPos -= subValue;
  }
  
  function getClass_40() {
    return Lorg_dellroad_lzma_client_SevenZip_Compression_LZ_InWindow_2_classLit;
  }
  
  function InWindow() {
  }
  
  _ = InWindow.prototype = new Object_0();
  _.getClass$ = getClass_40;
  _.typeId$ = 0;
  _._blockSize = 0;
  _._bufferBase = null;
  _._bufferOffset = 0;
  _._keepSizeAfter = 0;
  _._keepSizeBefore = 0;
  _._pointerToLastSafePosition = 0;
  _._pos = 0;
  _._posLimit = 0;
  _._stream = null;
  _._streamEndWasReached = false;
  _._streamPos = 0;
  function $clinit_60() {
    $clinit_60 = nullMethod;
    var i, j, r;
    CrcTable = initDim(_3I_classLit, 0, -1, 256, 1);
    for (i = 0; i < 256; ++i) {
      r = i;
      for (j = 0; j < 8; ++j)
      if ((r & 1) != 0) {
        r = r >>> 1 ^ -306674912;
      } else {
        r >>>= 1;
      }
      CrcTable[i] = r;
    }
  }
  
  function $Create_3(this$static, historySize, keepAddBufferBefore, matchMaxLen, keepAddBufferAfter) {
    var cyclicBufferSize, hs, windowReservSize;
    if (historySize > 1073741567) {
      return false;
    }

    this$static._cutValue = 16 + (matchMaxLen >> 1);
    windowReservSize = ~~((historySize + keepAddBufferBefore + matchMaxLen + keepAddBufferAfter) / 2) + 256;
    $Create_4(this$static, historySize + keepAddBufferBefore, matchMaxLen + keepAddBufferAfter, windowReservSize);
    this$static._matchMaxLen = matchMaxLen;
    cyclicBufferSize = historySize + 1;
    if (this$static._cyclicBufferSize != cyclicBufferSize) {
      this$static._son = initDim(_3I_classLit, 0, -1, (this$static._cyclicBufferSize = cyclicBufferSize) * 2, 1);
    }

    hs = 65536;
    if (this$static.HASH_ARRAY) {
      hs = historySize - 1;
      hs |= hs >> 1;
      hs |= hs >> 2;
      hs |= hs >> 4;
      hs |= hs >> 8;
      hs >>= 1;
      hs |= 65535;
      if (hs > 16777216)
      hs >>= 1;
      this$static._hashMask = hs;
      ++hs;
      hs += this$static.kFixHashSize;
    }

    if (hs != this$static._hashSizeSum) {
      this$static._hash = initDim(_3I_classLit, 0, -1, this$static._hashSizeSum = hs, 1);
    }
    return true;
  }
  
  function $GetMatches(this$static, distances) {
    var count, cur, curMatch, curMatch2, curMatch3, cyclicPos, delta, hash2Value, hash3Value, hashValue, len, len0, len1, lenLimit, matchMinPos, maxLen, offset, pby1, ptr0, ptr1, temp;
    if (this$static._pos + this$static._matchMaxLen <= this$static._streamPos) {
      lenLimit = this$static._matchMaxLen;
    } else {
      lenLimit = this$static._streamPos - this$static._pos;
      if (lenLimit < this$static.kMinMatchCheck) {
        $MovePos_0(this$static);
        return 0;
      }
    }
    offset = 0;
    matchMinPos = this$static._pos > this$static._cyclicBufferSize?this$static._pos - this$static._cyclicBufferSize:0;
    cur = this$static._bufferOffset + this$static._pos;
    maxLen = 1;
    hash2Value = 0;
    hash3Value = 0;
    if (this$static.HASH_ARRAY) {
      temp = CrcTable[this$static._bufferBase[cur] & 255] ^ this$static._bufferBase[cur + 1] & 255;
      hash2Value = temp & 1023;
      temp ^= (this$static._bufferBase[cur + 2] & 255) << 8;
      hash3Value = temp & 65535;
      hashValue = (temp ^ CrcTable[this$static._bufferBase[cur + 3] & 255] << 5) & this$static._hashMask;
    } else {
      hashValue = this$static._bufferBase[cur] & 255 ^ (this$static._bufferBase[cur + 1] & 255) << 8;
    }

    curMatch = this$static._hash[this$static.kFixHashSize + hashValue];
    if (this$static.HASH_ARRAY) {
      curMatch2 = this$static._hash[hash2Value];
      curMatch3 = this$static._hash[1024 + hash3Value];
      this$static._hash[hash2Value] = this$static._pos;
      this$static._hash[1024 + hash3Value] = this$static._pos;
      if (curMatch2 > matchMinPos) {
        if (this$static._bufferBase[this$static._bufferOffset + curMatch2] == this$static._bufferBase[cur]) {
          distances[offset++] = maxLen = 2;
          distances[offset++] = this$static._pos - curMatch2 - 1;
        }
      }
      if (curMatch3 > matchMinPos) {
        if (this$static._bufferBase[this$static._bufferOffset + curMatch3] == this$static._bufferBase[cur]) {
          if (curMatch3 == curMatch2) {
            offset -= 2;
          }
          distances[offset++] = maxLen = 3;
          distances[offset++] = this$static._pos - curMatch3 - 1;
          curMatch2 = curMatch3;
        }
      }
      if (offset != 0 && curMatch2 == curMatch) {
        offset -= 2;
        maxLen = 1;
      }
    }
    this$static._hash[this$static.kFixHashSize + hashValue] = this$static._pos;
    ptr0 = (this$static._cyclicBufferPos << 1) + 1;
    ptr1 = this$static._cyclicBufferPos << 1;
    len0 = len1 = this$static.kNumHashDirectBytes;
    if (this$static.kNumHashDirectBytes != 0) {
      if (curMatch > matchMinPos) {
        if (this$static._bufferBase[this$static._bufferOffset + curMatch + this$static.kNumHashDirectBytes] != this$static._bufferBase[cur + this$static.kNumHashDirectBytes]) {
          distances[offset++] = maxLen = this$static.kNumHashDirectBytes;
          distances[offset++] = this$static._pos - curMatch - 1;
        }
      }
    }
    count = this$static._cutValue;
    while (true) {
      if (curMatch <= matchMinPos || count-- == 0) {
        this$static._son[ptr0] = this$static._son[ptr1] = 0;
        break;
      }
      delta = this$static._pos - curMatch;
      cyclicPos = (delta <= this$static._cyclicBufferPos?this$static._cyclicBufferPos - delta:this$static._cyclicBufferPos - delta + this$static._cyclicBufferSize) << 1;
      pby1 = this$static._bufferOffset + curMatch;
      len = len0 < len1?len0:len1;
      if (this$static._bufferBase[pby1 + len] == this$static._bufferBase[cur + len]) {
        while (++len != lenLimit) {
          if (this$static._bufferBase[pby1 + len] != this$static._bufferBase[cur + len]) {
            break;
          }
        }
        if (maxLen < len) {
          distances[offset++] = maxLen = len;
          distances[offset++] = delta - 1;
          if (len == lenLimit) {
          this$static._son[ptr1] = this$static._son[cyclicPos];
          this$static._son[ptr0] = this$static._son[cyclicPos + 1];
          break;
          }
        }
      }
      if ((this$static._bufferBase[pby1 + len] & 255) < (this$static._bufferBase[cur + len] & 255)) {
        this$static._son[ptr1] = curMatch;
        ptr1 = cyclicPos + 1;
        curMatch = this$static._son[ptr1];
        len1 = len;
      } else {
        this$static._son[ptr0] = curMatch;
        ptr0 = cyclicPos;
        curMatch = this$static._son[ptr0];
        len0 = len;
      }
    }
    $MovePos_0(this$static);
    return offset;
  }
  
  function $Init_5(this$static) {
    var i;
    this$static._bufferOffset = 0;
    this$static._pos = 0;
    this$static._streamPos = 0;
    this$static._streamEndWasReached = false;
    $ReadBlock(this$static);
    for (i = 0; i < this$static._hashSizeSum; ++i) {
      this$static._hash[i] = 0;
    }
    this$static._cyclicBufferPos = 0;
    $ReduceOffsets(this$static, -1);
  }
  
  function $MovePos_0(this$static) {
    var subValue;
    if (++this$static._cyclicBufferPos >= this$static._cyclicBufferSize) {
      this$static._cyclicBufferPos = 0;
    }
    $MovePos_1(this$static);
    if (this$static._pos == 1073741823) {
      subValue = this$static._pos - this$static._cyclicBufferSize;
      $NormalizeLinks(this$static._son, this$static._cyclicBufferSize * 2, subValue);
      $NormalizeLinks(this$static._hash, this$static._hashSizeSum, subValue);
      $ReduceOffsets(this$static, subValue);
    }
  }
  
  function $NormalizeLinks(items, numItems, subValue) {
    var i, value;
    for (i = 0; i < numItems; ++i) {
      value = items[i];
      if (value <= subValue) {
        value = 0;
      } else {
        value -= subValue;
      }
      items[i] = value;
    }
  }
  
  function $SetType(this$static, numHashBytes) {
    this$static.HASH_ARRAY = numHashBytes > 2;
    if (this$static.HASH_ARRAY) {
      this$static.kNumHashDirectBytes = 0;
      this$static.kMinMatchCheck = 4;
      this$static.kFixHashSize = 66560;
    } else {
      this$static.kNumHashDirectBytes = 2;
      this$static.kMinMatchCheck = 3;
      this$static.kFixHashSize = 0;
    }
  }
  
  function $Skip(this$static, num) {
    var count, cur, curMatch, cyclicPos, delta, hash2Value, hash3Value, hashValue, len, len0, len1, lenLimit, matchMinPos, pby1, ptr0, ptr1, temp;
    do {
      if (this$static._pos + this$static._matchMaxLen <= this$static._streamPos) {
        lenLimit = this$static._matchMaxLen;
      } else {
        lenLimit = this$static._streamPos - this$static._pos;
        if (lenLimit < this$static.kMinMatchCheck) {
          $MovePos_0(this$static);
          continue;
        }
      }
      matchMinPos = this$static._pos > this$static._cyclicBufferSize?this$static._pos - this$static._cyclicBufferSize:0;
      cur = this$static._bufferOffset + this$static._pos;
      if (this$static.HASH_ARRAY) {
        temp = CrcTable[this$static._bufferBase[cur] & 255] ^ this$static._bufferBase[cur + 1] & 255;
        hash2Value = temp & 1023;
        this$static._hash[hash2Value] = this$static._pos;
        temp ^= (this$static._bufferBase[cur + 2] & 255) << 8;
        hash3Value = temp & 65535;
        this$static._hash[1024 + hash3Value] = this$static._pos;
        hashValue = (temp ^ CrcTable[this$static._bufferBase[cur + 3] & 255] << 5) & this$static._hashMask;
      } else {
        hashValue = this$static._bufferBase[cur] & 255 ^ (this$static._bufferBase[cur + 1] & 255) << 8;
      }
      curMatch = this$static._hash[this$static.kFixHashSize + hashValue];
      this$static._hash[this$static.kFixHashSize + hashValue] = this$static._pos;
      ptr0 = (this$static._cyclicBufferPos << 1) + 1;
      ptr1 = this$static._cyclicBufferPos << 1;
      len0 = len1 = this$static.kNumHashDirectBytes;
      count = this$static._cutValue;
      while (true) {
        if (curMatch <= matchMinPos || count-- == 0) {
          this$static._son[ptr0] = this$static._son[ptr1] = 0;
          break;
        }
        delta = this$static._pos - curMatch;
        cyclicPos = (delta <= this$static._cyclicBufferPos?this$static._cyclicBufferPos - delta:this$static._cyclicBufferPos - delta + this$static._cyclicBufferSize) << 1;
        pby1 = this$static._bufferOffset + curMatch;
        len = len0 < len1?len0:len1;
        if (this$static._bufferBase[pby1 + len] == this$static._bufferBase[cur + len]) {
          while (++len != lenLimit) {
            if (this$static._bufferBase[pby1 + len] != this$static._bufferBase[cur + len]) {
              break;
            }
          }
          if (len == lenLimit) {
            this$static._son[ptr1] = this$static._son[cyclicPos];
            this$static._son[ptr0] = this$static._son[cyclicPos + 1];
            break;
          }
        }
        if ((this$static._bufferBase[pby1 + len] & 255) < (this$static._bufferBase[cur + len] & 255)) {
          this$static._son[ptr1] = curMatch;
          ptr1 = cyclicPos + 1;
          curMatch = this$static._son[ptr1];
          len1 = len;
        } else {
          this$static._son[ptr0] = curMatch;
          ptr0 = cyclicPos;
          curMatch = this$static._son[ptr0];
          len0 = len;
        }
      }
      $MovePos_0(this$static);
    }
    while (--num != 0);
  }
  
  function getClass_39() {
    return Lorg_dellroad_lzma_client_SevenZip_Compression_LZ_BinTree_2_classLit;
  }
  
  function BinTree() {
  }
  
  _ = BinTree.prototype = new InWindow();
  _.getClass$ = getClass_39;
  _.typeId$ = 0;
  _.HASH_ARRAY = true;
  _._cutValue = 255;
  _._cyclicBufferPos = 0;
  _._cyclicBufferSize = 0;
  _._hash = null;
  _._hashMask = 0;
  _._hashSizeSum = 0;
  _._matchMaxLen = 0;
  _._son = null;
  _.kFixHashSize = 66560;
  _.kMinMatchCheck = 4;
  _.kNumHashDirectBytes = 0;
  var CrcTable;
  function $CopyBlock(this$static, distance, len) {
    var pos;
    pos = this$static._pos - distance - 1;
    if (pos < 0) {
      pos += this$static._windowSize;
    }
    for (; len != 0; --len) {
      if (pos >= this$static._windowSize) {
        pos = 0;
      }
      this$static._buffer[this$static._pos++] = this$static._buffer[pos++];
      if (this$static._pos >= this$static._windowSize) {
        $Flush_0(this$static);
      }
    }
  }
  
  function $Create_5(this$static, windowSize) {
    if (this$static._buffer == null || this$static._windowSize != windowSize) {
      this$static._buffer = initDim(_3B_classLit, 0, -1, windowSize, 1);
    }
    this$static._windowSize = windowSize;
    this$static._pos = 0;
    this$static._streamPos = 0;
  }
  
  function $Flush_0(this$static) {
    var size;
    size = this$static._pos - this$static._streamPos;
    if (size == 0) {
      return;
    }
    $write_0(this$static._stream, this$static._buffer, this$static._streamPos, size);
    if (this$static._pos >= this$static._windowSize) {
      this$static._pos = 0;
    }
    this$static._streamPos = this$static._pos;
  }
  
  function $GetByte(this$static, distance) {
    var pos;
    pos = this$static._pos - distance - 1;
    if (pos < 0) {
      pos += this$static._windowSize;
    }
    return this$static._buffer[pos];
  }
  
  function $Init_7(this$static, solid) {
    if (!solid) {
      this$static._streamPos = 0;
      this$static._pos = 0;
    }
  }
  
  function $PutByte(this$static, b) {
    this$static._buffer[this$static._pos++] = b;
    if (this$static._pos >= this$static._windowSize) {
      $Flush_0(this$static);
    }
  }
  
  function $ReleaseStream(this$static) {
    $Flush_0(this$static);
    this$static._stream = null;
  }
  
  function $SetStream_0(this$static, stream) {
    $Flush_0(this$static);
    this$static._stream = null;
    this$static._stream = stream;
  }
  
  function getClass_41() {
    return Lorg_dellroad_lzma_client_SevenZip_Compression_LZ_OutWindow_2_classLit;
  }
  
  function OutWindow() {
  }
  
  _ = OutWindow.prototype = new Object_0();
  _.getClass$ = getClass_41;
  _.typeId$ = 0;
  _._buffer = null;
  _._pos = 0;
  _._stream = null;
  _._streamPos = 0;
  _._windowSize = 0;
  function GetLenToPosState(len) {
    len -= 2;
    if (len < 4) {
      return len;
    }
    return 3;
  }
  
  function StateUpdateChar(index) {
    if (index < 4) {
      return 0;
    }
    if (index < 10) {
      return index - 3;
    }
    return index - 6;
  }
  
  function $Chunker_0(this$static, encoder) {
    this$static.encoder = encoder;
    this$static.decoder = null;
    this$static.alive = true;
    return this$static;
  }
  
  function $Chunker(this$static, decoder) {
    this$static.decoder = decoder;
    this$static.encoder = null;
    this$static.alive = true;
    return this$static;
  }
  
  function $processChunk(this$static) {
    var exception;
    if (!this$static.alive) {
      throw new IllegalStateException();
    }
    exception = true;
    try {
      if (this$static.encoder) {
        $processEncoderChunk(this$static);
      } else {
        $processDecoderChunk(this$static);
      }
      exception = false;
      return this$static.alive;
    } finally {
      if (exception) {
        this$static.alive = false;
      }
    }
  }
  
  function $processDecoderChunk(this$static) {
    var result;
    result = $CodeOneChunk(this$static.decoder);
    if (result == -1) {
      throw $IOException(new IOException(), 'corrupted input');
    }
    this$static.inBytesProcessed = N1_longLit;
    this$static.outBytesProcessed = this$static.decoder.nowPos64;
    if (result == 1 || compare(this$static.decoder.outSize, P0_longLit) >= 0 && compare(this$static.decoder.nowPos64, this$static.decoder.outSize) >= 0) {
      $CodeFinish(this$static.decoder);
      this$static.alive = false;
    }
  }
  
  function $processEncoderChunk(this$static) {
    $CodeOneBlock(this$static.encoder, this$static.encoder.processedInSize, this$static.encoder.processedOutSize, this$static.encoder.finished);
    this$static.inBytesProcessed = this$static.encoder.processedInSize[0];
    if (this$static.encoder.finished[0]) {
      $ReleaseStreams(this$static.encoder);
      this$static.alive = false;
    }
  }
  
  function getClass_28() {
    return Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Chunker_2_classLit;
  }
  
  function Chunker() {
  }
  
  _ = Chunker.prototype = new Object_0();
  _.getClass$ = getClass_28;
  _.typeId$ = 0;
  _.alive = false;
  _.decoder = null;
  _.encoder = null;
  function $CodeFinish(this$static) {
    $Flush_0(this$static.m_OutWindow);
    $ReleaseStream(this$static.m_OutWindow);
    this$static.m_RangeDecoder.Stream = null;
  }
  
  function $CodeInChunks(this$static, inStream, outStream, outSize) {
    this$static.m_RangeDecoder.Stream = inStream;
    $SetStream_0(this$static.m_OutWindow, outStream);
    $Init_1(this$static);
    this$static.state = 0;
    this$static.rep0 = 0;
    this$static.rep1 = 0;
    this$static.rep2 = 0;
    this$static.rep3 = 0;
    this$static.outSize = outSize;
    this$static.nowPos64 = P0_longLit;
    this$static.prevByte = 0;
    return $Chunker(new Chunker(), this$static);
  }
  
  function $CodeOneChunk(this$static) {
  var decoder2, distance, len, numDirectBits, posSlot, posState;
  posState = lowBits_0(this$static.nowPos64) & this$static.m_PosStateMask;
  if ($DecodeBit(this$static.m_RangeDecoder, this$static.m_IsMatchDecoders, (this$static.state << 4) + posState) == 0) {
    decoder2 = $GetDecoder(this$static.m_LiteralDecoder, lowBits_0(this$static.nowPos64), this$static.prevByte);
    if (this$static.state < 7) {
    this$static.prevByte = $DecodeNormal(decoder2, this$static.m_RangeDecoder);
    }
    else {
    this$static.prevByte = $DecodeWithMatchByte(decoder2, this$static.m_RangeDecoder, $GetByte(this$static.m_OutWindow, this$static.rep0));
    }
    $PutByte(this$static.m_OutWindow, this$static.prevByte);
    this$static.state = StateUpdateChar(this$static.state);
    this$static.nowPos64 = add(this$static.nowPos64, P1_longLit);
  } else {
    if ($DecodeBit(this$static.m_RangeDecoder, this$static.m_IsRepDecoders, this$static.state) == 1) {
      len = 0;
      if ($DecodeBit(this$static.m_RangeDecoder, this$static.m_IsRepG0Decoders, this$static.state) == 0) {
        if ($DecodeBit(this$static.m_RangeDecoder, this$static.m_IsRep0LongDecoders, (this$static.state << 4) + posState) == 0) {
          this$static.state = this$static.state < 7?9:11;
          len = 1;
        }
      } else {
        if ($DecodeBit(this$static.m_RangeDecoder, this$static.m_IsRepG1Decoders, this$static.state) == 0) {
          distance = this$static.rep1;
        } else {
          if ($DecodeBit(this$static.m_RangeDecoder, this$static.m_IsRepG2Decoders, this$static.state) == 0) {
            distance = this$static.rep2;
          } else {
            distance = this$static.rep3;
            this$static.rep3 = this$static.rep2;
          }
          this$static.rep2 = this$static.rep1;
        }
        this$static.rep1 = this$static.rep0;
        this$static.rep0 = distance;
      }
      if (len == 0) {
        len = $Decode(this$static.m_RepLenDecoder, this$static.m_RangeDecoder, posState) + 2;
        this$static.state = this$static.state < 7?8:11;
      }
    } else {
      this$static.rep3 = this$static.rep2;
      this$static.rep2 = this$static.rep1;
      this$static.rep1 = this$static.rep0;
      len = 2 + $Decode(this$static.m_LenDecoder, this$static.m_RangeDecoder, posState);
      this$static.state = this$static.state < 7?7:10;
      posSlot = $Decode_0(this$static.m_PosSlotDecoder[GetLenToPosState(len)], this$static.m_RangeDecoder);
      if (posSlot >= 4) {
        numDirectBits = (posSlot >> 1) - 1;
        this$static.rep0 = (2 | posSlot & 1) << numDirectBits;
        if (posSlot < 14) {
          this$static.rep0 += ReverseDecode(this$static.m_PosDecoders, this$static.rep0 - posSlot - 1, this$static.m_RangeDecoder, numDirectBits);
        } else {
          this$static.rep0 += $DecodeDirectBits(this$static.m_RangeDecoder, numDirectBits - 4) << 4;
          this$static.rep0 += $ReverseDecode(this$static.m_PosAlignDecoder, this$static.m_RangeDecoder);
          if (this$static.rep0 < 0) {
            if (this$static.rep0 == -1) {
              return 1;
            }
            return -1;
          }
        }
      } else 
        this$static.rep0 = posSlot;
      }
      if (compare(fromInt(this$static.rep0), this$static.nowPos64) >= 0 || this$static.rep0 >= this$static.m_DictionarySizeCheck) {
        return -1;
      }
      $CopyBlock(this$static.m_OutWindow, this$static.rep0, len);
      this$static.nowPos64 = add(this$static.nowPos64, fromInt(len));
      this$static.prevByte = $GetByte(this$static.m_OutWindow, 0);
    }
    return 0;
  }
  
  function $Decoder(this$static) {
    var i;
    this$static.m_OutWindow = new OutWindow();
    this$static.m_RangeDecoder = new Decoder_0();
    this$static.m_IsMatchDecoders = initDim(_3S_classLit, 0, -1, 192, 1);
    this$static.m_IsRepDecoders = initDim(_3S_classLit, 0, -1, 12, 1);
    this$static.m_IsRepG0Decoders = initDim(_3S_classLit, 0, -1, 12, 1);
    this$static.m_IsRepG1Decoders = initDim(_3S_classLit, 0, -1, 12, 1);
    this$static.m_IsRepG2Decoders = initDim(_3S_classLit, 0, -1, 12, 1);
    this$static.m_IsRep0LongDecoders = initDim(_3S_classLit, 0, -1, 192, 1);
    this$static.m_PosSlotDecoder = initDim(_3Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeDecoder_2_classLit, 0, 7, 4, 0);
    this$static.m_PosDecoders = initDim(_3S_classLit, 0, -1, 114, 1);
    this$static.m_PosAlignDecoder = $BitTreeDecoder(new BitTreeDecoder(), 4);
    this$static.m_LenDecoder = $Decoder$LenDecoder(new Decoder$LenDecoder());
    this$static.m_RepLenDecoder = $Decoder$LenDecoder(new Decoder$LenDecoder());
    this$static.m_LiteralDecoder = new Decoder$LiteralDecoder();
    for (i = 0; i < 4; ++i) {
      this$static.m_PosSlotDecoder[i] = $BitTreeDecoder(new BitTreeDecoder(), 6);
    }
    return this$static;
  }
  
  function $Init_1(this$static) {
    var i;
    $Init_7(this$static.m_OutWindow, false);
    InitBitModels(this$static.m_IsMatchDecoders);
    InitBitModels(this$static.m_IsRep0LongDecoders);
    InitBitModels(this$static.m_IsRepDecoders);
    InitBitModels(this$static.m_IsRepG0Decoders);
    InitBitModels(this$static.m_IsRepG1Decoders);
    InitBitModels(this$static.m_IsRepG2Decoders);
    InitBitModels(this$static.m_PosDecoders);
    $Init_0(this$static.m_LiteralDecoder);
    for (i = 0; i < 4; ++i) {
      InitBitModels(this$static.m_PosSlotDecoder[i].Models);
    }
    $Init(this$static.m_LenDecoder);
    $Init(this$static.m_RepLenDecoder);
    InitBitModels(this$static.m_PosAlignDecoder.Models);
    $Init_8(this$static.m_RangeDecoder);
  }
  
  function $SetDecoderProperties(this$static, properties) {
    var dictionarySize, i, lc, lp, pb, remainder, val;
    if (properties.length < 5)
      return false;
    val = properties[0] & 255;
    lc = val % 9;
    remainder = ~~(val / 9);
    lp = remainder % 5;
    pb = ~~(remainder / 5);
    dictionarySize = 0;
    for (i = 0; i < 4; ++i) {
      dictionarySize += (properties[1 + i] & 255) << i * 8;
    }
    if (!$SetLcLpPb(this$static, lc, lp, pb)) {
      return false;
    }
    return $SetDictionarySize(this$static, dictionarySize);
  }
  
  function $SetDictionarySize(this$static, dictionarySize) {
    if (dictionarySize < 0) {
      return false;
    }
    if (this$static.m_DictionarySize != dictionarySize) {
      this$static.m_DictionarySize = dictionarySize;
      this$static.m_DictionarySizeCheck = max(this$static.m_DictionarySize, 1);
      $Create_5(this$static.m_OutWindow, max(this$static.m_DictionarySizeCheck, 4096));
    }
    return true;
  }
  
  function $SetLcLpPb(this$static, lc, lp, pb) {
    var numPosStates;
    if (lc > 8 || lp > 4 || pb > 4) {
      return false;
    }
    $Create_0(this$static.m_LiteralDecoder, lp, lc);
    numPosStates = 1 << pb;
    $Create(this$static.m_LenDecoder, numPosStates);
    $Create(this$static.m_RepLenDecoder, numPosStates);
    this$static.m_PosStateMask = numPosStates - 1;
    return true;
  }
  
  function getClass_32() {
    return Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Decoder_2_classLit;
  }
  
  function Decoder() {
  }
  
  _ = Decoder.prototype = new Object_0();
  _.getClass$ = getClass_32;
  _.typeId$ = 0;
  _.m_DictionarySize = -1;
  _.m_DictionarySizeCheck = -1;
  _.m_PosStateMask = 0;
  _.nowPos64 = P0_longLit;
  _.outSize = P0_longLit;
  _.prevByte = 0;
  _.rep0 = 0;
  _.rep1 = 0;
  _.rep2 = 0;
  _.rep3 = 0;
  _.state = 0;
  function $Create(this$static, numPosStates) {
    for (; this$static.m_NumPosStates < numPosStates; ++this$static.m_NumPosStates) {
      this$static.m_LowCoder[this$static.m_NumPosStates] = $BitTreeDecoder(new BitTreeDecoder(), 3);
      this$static.m_MidCoder[this$static.m_NumPosStates] = $BitTreeDecoder(new BitTreeDecoder(), 3);
    }
  }
  
  function $Decode(this$static, rangeDecoder, posState) {
    var symbol;
    if ($DecodeBit(rangeDecoder, this$static.m_Choice, 0) == 0) {
      return $Decode_0(this$static.m_LowCoder[posState], rangeDecoder);
    }
    symbol = 8;
    if ($DecodeBit(rangeDecoder, this$static.m_Choice, 1) == 0) {
      symbol += $Decode_0(this$static.m_MidCoder[posState], rangeDecoder);
    } else {
      symbol += 8 + $Decode_0(this$static.m_HighCoder, rangeDecoder);
    }
    return symbol;
  }
  
  function $Decoder$LenDecoder(this$static) {
    this$static.m_Choice = initDim(_3S_classLit, 0, -1, 2, 1);
    this$static.m_LowCoder = initDim(_3Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeDecoder_2_classLit, 0, 7, 16, 0);
    this$static.m_MidCoder = initDim(_3Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeDecoder_2_classLit, 0, 7, 16, 0);
    this$static.m_HighCoder = $BitTreeDecoder(new BitTreeDecoder(), 8);
    return this$static;
  }
  
  function $Init(this$static) {
    var posState;
    InitBitModels(this$static.m_Choice);
    for (posState = 0; posState < this$static.m_NumPosStates; ++posState) {
      InitBitModels(this$static.m_LowCoder[posState].Models);
      InitBitModels(this$static.m_MidCoder[posState].Models);
    }
    InitBitModels(this$static.m_HighCoder.Models);
  }
  
  function getClass_29() {
    return Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Decoder$LenDecoder_2_classLit;
  }
  
  function Decoder$LenDecoder() {
  }
  
  _ = Decoder$LenDecoder.prototype = new Object_0();
  _.getClass$ = getClass_29;
  _.typeId$ = 0;
  _.m_NumPosStates = 0;
  function $Create_0(this$static, numPosBits, numPrevBits) {
  var i, numStates;
  if (this$static.m_Coders != null && this$static.m_NumPrevBits == numPrevBits && this$static.m_NumPosBits == numPosBits)
    return;
  this$static.m_NumPosBits = numPosBits;
  this$static.m_PosMask = (1 << numPosBits) - 1;
  this$static.m_NumPrevBits = numPrevBits;
  numStates = 1 << this$static.m_NumPrevBits + this$static.m_NumPosBits;
  this$static.m_Coders = initDim(_3Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Decoder$LiteralDecoder$Decoder2_2_classLit, 0, 4, numStates, 0);
  for (i = 0; i < numStates; ++i)
    this$static.m_Coders[i] = $Decoder$LiteralDecoder$Decoder2(new Decoder$LiteralDecoder$Decoder2());
  }
  
  function $GetDecoder(this$static, pos, prevByte) {
    return this$static.m_Coders[((pos & this$static.m_PosMask) << this$static.m_NumPrevBits) + ((prevByte & 255) >>> 8 - this$static.m_NumPrevBits)];
  }
  
  function $Init_0(this$static) {
    var i, numStates;
    numStates = 1 << this$static.m_NumPrevBits + this$static.m_NumPosBits;
    for (i = 0; i < numStates; ++i) {
      InitBitModels(this$static.m_Coders[i].m_Decoders);
    }
  }
  
  function getClass_31() {
    return Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Decoder$LiteralDecoder_2_classLit;
  }
  
  function Decoder$LiteralDecoder() {
  }
  
  _ = Decoder$LiteralDecoder.prototype = new Object_0();
  _.getClass$ = getClass_31;
  _.typeId$ = 0;
  _.m_Coders = null;
  _.m_NumPosBits = 0;
  _.m_NumPrevBits = 0;
  _.m_PosMask = 0;
  function $DecodeNormal(this$static, rangeDecoder) {
    var symbol;
    symbol = 1;
    do {
      symbol = symbol << 1 | $DecodeBit(rangeDecoder, this$static.m_Decoders, symbol);
    } while (symbol < 256);
    return symbol << 24 >> 24;
  }
  
  function $DecodeWithMatchByte(this$static, rangeDecoder, matchByte) {
    var bit, matchBit, symbol;
    symbol = 1;
    do {
      matchBit = matchByte >> 7 & 1;
      matchByte <<= 1;
      bit = $DecodeBit(rangeDecoder, this$static.m_Decoders, (1 + matchBit << 8) + symbol);
      symbol = symbol << 1 | bit;
      if (matchBit != bit) {
        while (symbol < 256) {
          symbol = symbol << 1 | $DecodeBit(rangeDecoder, this$static.m_Decoders, symbol);
        }
      break;
      }
    } while (symbol < 256);
    return symbol << 24 >> 24;
  }
  
  function $Decoder$LiteralDecoder$Decoder2(this$static) {
    this$static.m_Decoders = initDim(_3S_classLit, 0, -1, 768, 1);
    return this$static;
  }
  
  function getClass_30() {
    return Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Decoder$LiteralDecoder$Decoder2_2_classLit;
  }
  
  function Decoder$LiteralDecoder$Decoder2() {
  }
  
  _ = Decoder$LiteralDecoder$Decoder2.prototype = new Object_0();
  _.getClass$ = getClass_30;
  _.typeId$ = 17;
  function $clinit_59() {
    $clinit_59 = nullMethod;
    var c, j, k, slotFast;
    g_FastPos = initDim(_3B_classLit, 0, -1, 2048, 1);
    c = 2;
    g_FastPos[0] = 0;
    g_FastPos[1] = 1;
    for (slotFast = 2; slotFast < 22; ++slotFast) {
      k = 1 << (slotFast >> 1) - 1;
      for (j = 0; j < k; ++j , ++c)
      g_FastPos[c] = slotFast << 24 >> 24;
    }
  }
  
  function $Backward(this$static, cur) {
    var backCur, backMem, posMem, posPrev;
    this$static._optimumEndIndex = cur;
    posMem = this$static._optimum[cur].PosPrev;
    backMem = this$static._optimum[cur].BackPrev;
    do {
      if (this$static._optimum[cur].Prev1IsChar) {
        $MakeAsChar(this$static._optimum[posMem]);
        this$static._optimum[posMem].PosPrev = posMem - 1;
        if (this$static._optimum[cur].Prev2) {
          this$static._optimum[posMem - 1].Prev1IsChar = false;
          this$static._optimum[posMem - 1].PosPrev = this$static._optimum[cur].PosPrev2;
          this$static._optimum[posMem - 1].BackPrev = this$static._optimum[cur].BackPrev2;
        }
      }
      posPrev = posMem;
      backCur = backMem;
      backMem = this$static._optimum[posPrev].BackPrev;
      posMem = this$static._optimum[posPrev].PosPrev;
      this$static._optimum[posPrev].BackPrev = backCur;
      this$static._optimum[posPrev].PosPrev = cur;
      cur = posPrev;
    } while (cur > 0);
    this$static.backRes = this$static._optimum[0].BackPrev;
    this$static._optimumCurrentIndex = this$static._optimum[0].PosPrev;
    return this$static._optimumCurrentIndex;
  }
  
  function $BaseInit(this$static) {
    var i;
    this$static._state = 0;
    this$static._previousByte = 0;
    for (i = 0; i < 4; ++i) {
      this$static._repDistances[i] = 0;
    }
  }
  
  function $CodeOneBlock(this$static, inSize, outSize, finished) {
    var baseVal, complexState, curByte, distance, footerBits, i, len, lenToPosState, matchByte, pos, posReduced, posSlot, posState, progressPosValuePrev, subCoder;
    inSize[0] = P0_longLit;
    outSize[0] = P0_longLit;
    finished[0] = true;
    if (this$static._inStream) {
      this$static._matchFinder._stream = this$static._inStream;
      $Init_5(this$static._matchFinder);
      this$static._needReleaseMFStream = true;
      this$static._inStream = null;
    }
    if (this$static._finished) {
      return;
    }
    this$static._finished = true;
    progressPosValuePrev = this$static.nowPos64;
    if (eq(this$static.nowPos64, P0_longLit)) {
      if ($GetNumAvailableBytes(this$static._matchFinder) == 0) {
        $Flush(this$static, lowBits_0(this$static.nowPos64));
        return;
      }
      $ReadMatchDistances(this$static);
      posState = lowBits_0(this$static.nowPos64) & this$static._posStateMask;
      $Encode_3(this$static._rangeEncoder, this$static._isMatch, (this$static._state << 4) + posState, 0);
      this$static._state = StateUpdateChar(this$static._state);
      curByte = $GetIndexByte(this$static._matchFinder, -this$static._additionalOffset);
      $Encode_1($GetSubCoder(this$static._literalEncoder, lowBits_0(this$static.nowPos64), this$static._previousByte), this$static._rangeEncoder, curByte);
      this$static._previousByte = curByte;
      --this$static._additionalOffset;
      this$static.nowPos64 = add(this$static.nowPos64, P1_longLit);
    }
    if ($GetNumAvailableBytes(this$static._matchFinder) == 0) {
      $Flush(this$static, lowBits_0(this$static.nowPos64));
      return;
    }
    while (true) {
      len = $GetOptimum(this$static, lowBits_0(this$static.nowPos64));
      pos = this$static.backRes;
      posState = lowBits_0(this$static.nowPos64) & this$static._posStateMask;
      complexState = (this$static._state << 4) + posState;
      if (len == 1 && pos == -1) {
        $Encode_3(this$static._rangeEncoder, this$static._isMatch, complexState, 0);
        curByte = $GetIndexByte(this$static._matchFinder, -this$static._additionalOffset);
        subCoder = $GetSubCoder(this$static._literalEncoder, lowBits_0(this$static.nowPos64), this$static._previousByte);
        if (this$static._state < 7) {
          $Encode_1(subCoder, this$static._rangeEncoder, curByte);
        } else {
          matchByte = $GetIndexByte(this$static._matchFinder, -this$static._repDistances[0] - 1 - this$static._additionalOffset);
          $EncodeMatched(subCoder, this$static._rangeEncoder, matchByte, curByte);
        }
        this$static._previousByte = curByte;
        this$static._state = StateUpdateChar(this$static._state);
      } else {
        $Encode_3(this$static._rangeEncoder, this$static._isMatch, complexState, 1);
        if (pos < 4) {
          $Encode_3(this$static._rangeEncoder, this$static._isRep, this$static._state, 1);
          if (pos == 0) {
            $Encode_3(this$static._rangeEncoder, this$static._isRepG0, this$static._state, 0);
            if (len == 1) {
              $Encode_3(this$static._rangeEncoder, this$static._isRep0Long, complexState, 0);
            } else {
              $Encode_3(this$static._rangeEncoder, this$static._isRep0Long, complexState, 1);
            }
          } else {
            $Encode_3(this$static._rangeEncoder, this$static._isRepG0, this$static._state, 1);
            if (pos == 1) {
              $Encode_3(this$static._rangeEncoder, this$static._isRepG1, this$static._state, 0);
            } else {
              $Encode_3(this$static._rangeEncoder, this$static._isRepG1, this$static._state, 1);
              $Encode_3(this$static._rangeEncoder, this$static._isRepG2, this$static._state, pos - 2);
            }
          }
          if (len == 1) {
            this$static._state = this$static._state < 7?9:11;
          } else {
            $Encode_0(this$static._repMatchLenEncoder, this$static._rangeEncoder, len - 2, posState);
            this$static._state = this$static._state < 7?8:11;
          }
          distance = this$static._repDistances[pos];
          if (pos != 0) {
            for (i = pos; i >= 1; --i) {
              this$static._repDistances[i] = this$static._repDistances[i - 1];
            }
            this$static._repDistances[0] = distance;
          }
        } else {
          $Encode_3(this$static._rangeEncoder, this$static._isRep, this$static._state, 0);
          this$static._state = this$static._state < 7?7:10;
          $Encode_0(this$static._lenEncoder, this$static._rangeEncoder, len - 2, posState);
          pos -= 4;
          posSlot = GetPosSlot(pos);
          lenToPosState = GetLenToPosState(len);
          $Encode_2(this$static._posSlotEncoder[lenToPosState], this$static._rangeEncoder, posSlot);
          if (posSlot >= 4) {
            footerBits = (posSlot >> 1) - 1;
            baseVal = (2 | posSlot & 1) << footerBits;
            posReduced = pos - baseVal;
            if (posSlot < 14) {
              ReverseEncode(this$static._posEncoders, baseVal - posSlot - 1, this$static._rangeEncoder, footerBits, posReduced);
            } else {
              $EncodeDirectBits(this$static._rangeEncoder, posReduced >> 4, footerBits - 4);
              $ReverseEncode(this$static._posAlignEncoder, this$static._rangeEncoder, posReduced & 15);
              ++this$static._alignPriceCount;
            }
          }
          distance = pos;
          for (i = 3; i >= 1; --i) {
            this$static._repDistances[i] = this$static._repDistances[i - 1];
          }
          this$static._repDistances[0] = distance;
          ++this$static._matchPriceCount;
        }
        this$static._previousByte = $GetIndexByte(this$static._matchFinder, len - 1 - this$static._additionalOffset);
      }
      this$static._additionalOffset -= len;
      this$static.nowPos64 = add(this$static.nowPos64, fromInt(len));
      if (this$static._additionalOffset == 0) {
        if (this$static._matchPriceCount >= 128) {
          $FillDistancesPrices(this$static);
        }
        if (this$static._alignPriceCount >= 16) {
          $FillAlignPrices(this$static);
        }
        inSize[0] = this$static.nowPos64;
        outSize[0] = $GetProcessedSizeAdd(this$static._rangeEncoder);
        if ($GetNumAvailableBytes(this$static._matchFinder) == 0) {
          $Flush(this$static, lowBits_0(this$static.nowPos64));
          return;
        }
        if (compare(sub(this$static.nowPos64, progressPosValuePrev), P1000_longLit) >= 0) {
          this$static._finished = false;
          finished[0] = false;
          return;
        }
      }
    }
  }
  
  function $Create_2(this$static) {
    var bt, numHashBytes;
    if (!this$static._matchFinder) {
      bt = ($clinit_60() , new BinTree());
      numHashBytes = 4;
      if (this$static._matchFinderType == 0) {
        numHashBytes = 2;
      }
      $SetType(bt, numHashBytes);
      this$static._matchFinder = bt;
    }
    $Create_1(this$static._literalEncoder, this$static._numLiteralPosStateBits, this$static._numLiteralContextBits);
    if (this$static._dictionarySize == this$static._dictionarySizePrev && this$static._numFastBytesPrev == this$static._numFastBytes) {
      return;
    }
    $Create_3(this$static._matchFinder, this$static._dictionarySize, 4096, this$static._numFastBytes, 274);
    this$static._dictionarySizePrev = this$static._dictionarySize;
    this$static._numFastBytesPrev = this$static._numFastBytes;
  }
  
  function $Encoder(this$static) {
    var i;
    $clinit_59();
    this$static._repDistances = initDim(_3I_classLit, 0, -1, 4, 1);
    this$static._optimum = initDim(_3Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$Optimal_2_classLit, 0, 6, 4096, 0);
    this$static._rangeEncoder = ($clinit_66() , new Encoder_0());
    this$static._isMatch = initDim(_3S_classLit, 0, -1, 192, 1);
    this$static._isRep = initDim(_3S_classLit, 0, -1, 12, 1);
    this$static._isRepG0 = initDim(_3S_classLit, 0, -1, 12, 1);
    this$static._isRepG1 = initDim(_3S_classLit, 0, -1, 12, 1);
    this$static._isRepG2 = initDim(_3S_classLit, 0, -1, 12, 1);
    this$static._isRep0Long = initDim(_3S_classLit, 0, -1, 192, 1);
    this$static._posSlotEncoder = initDim(_3Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeEncoder_2_classLit, 0, 8, 4, 0);
    this$static._posEncoders = initDim(_3S_classLit, 0, -1, 114, 1);
    this$static._posAlignEncoder = $BitTreeEncoder(new BitTreeEncoder(), 4);
    this$static._lenEncoder = $Encoder$LenPriceTableEncoder(new Encoder$LenPriceTableEncoder());
    this$static._repMatchLenEncoder = $Encoder$LenPriceTableEncoder(new Encoder$LenPriceTableEncoder());
    this$static._literalEncoder = new Encoder$LiteralEncoder();
    this$static._matchDistances = initDim(_3I_classLit, 0, -1, 548, 1);
    this$static._posSlotPrices = initDim(_3I_classLit, 0, -1, 256, 1);
    this$static._distancesPrices = initDim(_3I_classLit, 0, -1, 512, 1);
    this$static._alignPrices = initDim(_3I_classLit, 0, -1, 16, 1);
    this$static.reps = initDim(_3I_classLit, 0, -1, 4, 1);
    this$static.repLens = initDim(_3I_classLit, 0, -1, 4, 1);
    this$static.processedInSize = initDim(_3J_classLit, 0, -1, 1, 3);
    this$static.processedOutSize = initDim(_3J_classLit, 0, -1, 1, 3);
    this$static.finished = initDim(_3Z_classLit, 0, -1, 1, 2);
    this$static.properties = initDim(_3B_classLit, 0, -1, 5, 1);
    this$static.tempPrices = initDim(_3I_classLit, 0, -1, 128, 1);
    for (i = 0; i < 4096; ++i) {
      this$static._optimum[i] = new Encoder$Optimal();
    }
    for (i = 0; i < 4; ++i) {
      this$static._posSlotEncoder[i] = $BitTreeEncoder(new BitTreeEncoder(), 6);
    }
    return this$static;
  }
  
  function $FillAlignPrices(this$static) {
    var i;
    for (i = 0; i < 16; ++i) {
      this$static._alignPrices[i] = $ReverseGetPrice(this$static._posAlignEncoder, i);
    }
    this$static._alignPriceCount = 0;
  }
  
  function $FillDistancesPrices(this$static) {
    var baseVal, encoder, footerBits, i, lenToPosState, posSlot, st, st2;
    for (i = 4; i < 128; ++i) {
      posSlot = GetPosSlot(i);
      footerBits = (posSlot >> 1) - 1;
      baseVal = (2 | posSlot & 1) << footerBits;
      this$static.tempPrices[i] = ReverseGetPrice(this$static._posEncoders, baseVal - posSlot - 1, footerBits, i - baseVal);
    }
    for (lenToPosState = 0; lenToPosState < 4; ++lenToPosState) {
      encoder = this$static._posSlotEncoder[lenToPosState];
      st = lenToPosState << 6;
      for (posSlot = 0; posSlot < this$static._distTableSize; ++posSlot) {
        this$static._posSlotPrices[st + posSlot] = $GetPrice_1(encoder, posSlot);
      }
      for (posSlot = 14; posSlot < this$static._distTableSize; ++posSlot) {
        this$static._posSlotPrices[st + posSlot] += (posSlot >> 1) - 1 - 4 << 6;
      }
      st2 = lenToPosState * 128;
      for (i = 0; i < 4; ++i) {
        this$static._distancesPrices[st2 + i] = this$static._posSlotPrices[st + i];
      }
      for (; i < 128; ++i) {
        this$static._distancesPrices[st2 + i] = this$static._posSlotPrices[st + GetPosSlot(i)] + this$static.tempPrices[i];
      }
    }
    this$static._matchPriceCount = 0;
  }
  
  function $Flush(this$static, nowPos) {
    $ReleaseMFStream(this$static);
    $WriteEndMarker(this$static, nowPos & this$static._posStateMask);
    $FlushData(this$static._rangeEncoder);
  }
  
  function $GetOptimum(this$static, position) {
    var cur, curAnd1Price, curAndLenCharPrice, curAndLenPrice, curBack, curPrice, currentByte, distance, i, len, lenEnd, lenMain, lenRes, lenTest, lenTest2, lenTestTemp, matchByte, matchPrice, newLen, nextIsChar, nextMatchPrice, nextOptimum, nextRepMatchPrice, normalMatchPrice, numAvailableBytes, numAvailableBytesFull, numDistancePairs, offs, offset, opt, optimum, pos, posPrev, posState, posStateNext, price_4, repIndex, repLen, repMatchPrice, repMaxIndex, shortRepPrice, startLen, state, state2, t, price, price_0, price_1, price_2, price_3;
    if (this$static._optimumEndIndex != this$static._optimumCurrentIndex) {
      lenRes = this$static._optimum[this$static._optimumCurrentIndex].PosPrev - this$static._optimumCurrentIndex;
      this$static.backRes = this$static._optimum[this$static._optimumCurrentIndex].BackPrev;
      this$static._optimumCurrentIndex = this$static._optimum[this$static._optimumCurrentIndex].PosPrev;
      return lenRes;
    }
    this$static._optimumCurrentIndex = this$static._optimumEndIndex = 0;
    if (this$static._longestMatchWasFound) {
      lenMain = this$static._longestMatchLength;
      this$static._longestMatchWasFound = false;
    } else {
      lenMain = $ReadMatchDistances(this$static);
    }
    numDistancePairs = this$static._numDistancePairs;
    numAvailableBytes = $GetNumAvailableBytes(this$static._matchFinder) + 1;
    if (numAvailableBytes < 2) {
      this$static.backRes = -1;
      return 1;
    }
    if (numAvailableBytes > 273) {
      numAvailableBytes = 273;
    }
    repMaxIndex = 0;
    for (i = 0; i < 4; ++i) {
      this$static.reps[i] = this$static._repDistances[i];
      this$static.repLens[i] = $GetMatchLen(this$static._matchFinder, -1, this$static.reps[i], 273);
      if (this$static.repLens[i] > this$static.repLens[repMaxIndex]) {
        repMaxIndex = i;
      }
    }
    if (this$static.repLens[repMaxIndex] >= this$static._numFastBytes) {
      this$static.backRes = repMaxIndex;
      lenRes = this$static.repLens[repMaxIndex];
      $MovePos(this$static, lenRes - 1);
      return lenRes;
    }
    if (lenMain >= this$static._numFastBytes) {
      this$static.backRes = this$static._matchDistances[numDistancePairs - 1] + 4;
      $MovePos(this$static, lenMain - 1);
      return lenMain;
    }
    currentByte = $GetIndexByte(this$static._matchFinder, -1);
    matchByte = $GetIndexByte(this$static._matchFinder, -this$static._repDistances[0] - 1 - 1);
    if (lenMain < 2 && currentByte != matchByte && this$static.repLens[repMaxIndex] < 2) {
      this$static.backRes = -1;
      return 1;
    }
    this$static._optimum[0].State = this$static._state;
    posState = position & this$static._posStateMask;
    this$static._optimum[1].Price = ($clinit_66() , ProbPrices[this$static._isMatch[(this$static._state << 4) + posState] >>> 2]) + $GetPrice_0($GetSubCoder(this$static._literalEncoder, position, this$static._previousByte), this$static._state >= 7, matchByte, currentByte);
    $MakeAsChar(this$static._optimum[1]);
    matchPrice = ProbPrices[2048 - this$static._isMatch[(this$static._state << 4) + posState] >>> 2];
    repMatchPrice = matchPrice + ProbPrices[2048 - this$static._isRep[this$static._state] >>> 2];
    if (matchByte == currentByte) {
      shortRepPrice = repMatchPrice + $GetRepLen1Price(this$static, this$static._state, posState);
      if (shortRepPrice < this$static._optimum[1].Price) {
        this$static._optimum[1].Price = shortRepPrice;
        $MakeAsShortRep(this$static._optimum[1]);
      }
    }
    lenEnd = lenMain >= this$static.repLens[repMaxIndex]?lenMain:this$static.repLens[repMaxIndex];
    if (lenEnd < 2) {
      this$static.backRes = this$static._optimum[1].BackPrev;
      return 1;
    }
    this$static._optimum[1].PosPrev = 0;
    this$static._optimum[0].Backs0 = this$static.reps[0];
    this$static._optimum[0].Backs1 = this$static.reps[1];
    this$static._optimum[0].Backs2 = this$static.reps[2];
    this$static._optimum[0].Backs3 = this$static.reps[3];
    len = lenEnd;
    do {
      this$static._optimum[len--].Price = 268435455;
    } while (len >= 2);
    for (i = 0; i < 4; ++i) {
      repLen = this$static.repLens[i];
      if (repLen < 2) {
        continue;
      }
      price_4 = repMatchPrice + $GetPureRepPrice(this$static, i, this$static._state, posState);
      do {
        curAndLenPrice = price_4 + $GetPrice(this$static._repMatchLenEncoder, repLen - 2, posState);
        optimum = this$static._optimum[repLen];
        if (curAndLenPrice < optimum.Price) {
          optimum.Price = curAndLenPrice;
          optimum.PosPrev = 0;
          optimum.BackPrev = i;
          optimum.Prev1IsChar = false;
        }
      } while (--repLen >= 2);
    }
    normalMatchPrice = matchPrice + ProbPrices[this$static._isRep[this$static._state] >>> 2];
    len = this$static.repLens[0] >= 2?this$static.repLens[0] + 1:2;
    if (len <= lenMain) {
      offs = 0;
      while (len > this$static._matchDistances[offs]) {
        offs += 2;
      }
      for (;; ++len) {
        distance = this$static._matchDistances[offs + 1];
        curAndLenPrice = normalMatchPrice + $GetPosLenPrice(this$static, distance, len, posState);
        optimum = this$static._optimum[len];
        if (curAndLenPrice < optimum.Price) {
          optimum.Price = curAndLenPrice;
          optimum.PosPrev = 0;
          optimum.BackPrev = distance + 4;
          optimum.Prev1IsChar = false;
        }
        if (len == this$static._matchDistances[offs]) {
          offs += 2;
          if (offs == numDistancePairs) {
            break;
          }
        }
      }
    }
    cur = 0;
    while (true) {
      ++cur;
      if (cur == lenEnd) {
        return $Backward(this$static, cur);
      }
      newLen = $ReadMatchDistances(this$static);
      numDistancePairs = this$static._numDistancePairs;
      if (newLen >= this$static._numFastBytes) {
        this$static._longestMatchLength = newLen;
        this$static._longestMatchWasFound = true;
        return $Backward(this$static, cur);
      }
      ++position;
      posPrev = this$static._optimum[cur].PosPrev;
      if (this$static._optimum[cur].Prev1IsChar) {
        --posPrev;
        if (this$static._optimum[cur].Prev2) {
          state = this$static._optimum[this$static._optimum[cur].PosPrev2].State;
          if (this$static._optimum[cur].BackPrev2 < 4) {
            state = (state < 7) ? 8 : 11;
          } else {
            state = (state < 7) ? 7 : 10;
          }
        } else {
          state = this$static._optimum[posPrev].State;
        }
        state = StateUpdateChar(state);
      } else {
        state = this$static._optimum[posPrev].State;
      }
      if (posPrev == cur - 1) {
        if (this$static._optimum[cur].BackPrev == 0) {
          state = state < 7?9:11;
        } else {
          state = StateUpdateChar(state);
        }
      } else {
        if (this$static._optimum[cur].Prev1IsChar && this$static._optimum[cur].Prev2) {
          posPrev = this$static._optimum[cur].PosPrev2;
          pos = this$static._optimum[cur].BackPrev2;
          state = state < 7?8:11;
        } else {
          pos = this$static._optimum[cur].BackPrev;
          if (pos < 4) {
            state = state < 7?8:11;
          } else {
            state = state < 7?7:10;
          }
        }
        opt = this$static._optimum[posPrev];
        if (pos < 4) {
          if (pos == 0) {
            this$static.reps[0] = opt.Backs0;
            this$static.reps[1] = opt.Backs1;
            this$static.reps[2] = opt.Backs2;
            this$static.reps[3] = opt.Backs3;
          } else if (pos == 1) {
            this$static.reps[0] = opt.Backs1;
            this$static.reps[1] = opt.Backs0;
            this$static.reps[2] = opt.Backs2;
            this$static.reps[3] = opt.Backs3;
          } else if (pos == 2) {
            this$static.reps[0] = opt.Backs2;
            this$static.reps[1] = opt.Backs0;
            this$static.reps[2] = opt.Backs1;
            this$static.reps[3] = opt.Backs3;
          } else {
            this$static.reps[0] = opt.Backs3;
            this$static.reps[1] = opt.Backs0;
            this$static.reps[2] = opt.Backs1;
            this$static.reps[3] = opt.Backs2;
          }
        } else {
          this$static.reps[0] = pos - 4;
          this$static.reps[1] = opt.Backs0;
          this$static.reps[2] = opt.Backs1;
          this$static.reps[3] = opt.Backs2;
        }
      }
      this$static._optimum[cur].State = state;
      this$static._optimum[cur].Backs0 = this$static.reps[0];
      this$static._optimum[cur].Backs1 = this$static.reps[1];
      this$static._optimum[cur].Backs2 = this$static.reps[2];
      this$static._optimum[cur].Backs3 = this$static.reps[3];
      curPrice = this$static._optimum[cur].Price;
      currentByte = $GetIndexByte(this$static._matchFinder, -1);
      matchByte = $GetIndexByte(this$static._matchFinder, -this$static.reps[0] - 1 - 1);
      posState = position & this$static._posStateMask;
      curAnd1Price = curPrice + ProbPrices[this$static._isMatch[(state << 4) + posState] >>> 2] + $GetPrice_0($GetSubCoder(this$static._literalEncoder, position, $GetIndexByte(this$static._matchFinder, -2)), state >= 7, matchByte, currentByte);
      nextOptimum = this$static._optimum[cur + 1];
      nextIsChar = false;
      if (curAnd1Price < nextOptimum.Price) {
        nextOptimum.Price = curAnd1Price;
        nextOptimum.PosPrev = cur;
        nextOptimum.BackPrev = -1;
        nextOptimum.Prev1IsChar = false;
        nextIsChar = true;
      }
      matchPrice = curPrice + ProbPrices[2048 - this$static._isMatch[(state << 4) + posState] >>> 2];
      repMatchPrice = matchPrice + ProbPrices[2048 - this$static._isRep[state] >>> 2];
      if (matchByte == currentByte && !(nextOptimum.PosPrev < cur && nextOptimum.BackPrev == 0)) {
        shortRepPrice = repMatchPrice + (ProbPrices[this$static._isRepG0[state] >>> 2] + ProbPrices[this$static._isRep0Long[(state << 4) + posState] >>> 2]);
        if (shortRepPrice <= nextOptimum.Price) {
          nextOptimum.Price = shortRepPrice;
          nextOptimum.PosPrev = cur;
          nextOptimum.BackPrev = 0;
          nextOptimum.Prev1IsChar = false;
          nextIsChar = true;
        }
      }
      numAvailableBytesFull = $GetNumAvailableBytes(this$static._matchFinder) + 1;
      numAvailableBytesFull = 4095 - cur < numAvailableBytesFull?4095 - cur:numAvailableBytesFull;
      numAvailableBytes = numAvailableBytesFull;
      if (numAvailableBytes < 2) {
        continue;
      }
      if (numAvailableBytes > this$static._numFastBytes) {
        numAvailableBytes = this$static._numFastBytes;
      }
      if (!nextIsChar && matchByte != currentByte) {
        t = min(numAvailableBytesFull - 1, this$static._numFastBytes);
        lenTest2 = $GetMatchLen(this$static._matchFinder, 0, this$static.reps[0], t);
        if (lenTest2 >= 2) {
          state2 = StateUpdateChar(state);
          posStateNext = position + 1 & this$static._posStateMask;
          nextRepMatchPrice = curAnd1Price + ProbPrices[2048 - this$static._isMatch[(state2 << 4) + posStateNext] >>> 2] + ProbPrices[2048 - this$static._isRep[state2] >>> 2];
          offset = cur + 1 + lenTest2;
          while (lenEnd < offset) {
            this$static._optimum[++lenEnd].Price = 268435455;
          }
          curAndLenPrice = nextRepMatchPrice + (price = $GetPrice(this$static._repMatchLenEncoder, lenTest2 - 2, posStateNext) , price + $GetPureRepPrice(this$static, 0, state2, posStateNext));
          optimum = this$static._optimum[offset];
          if (curAndLenPrice < optimum.Price) {
            optimum.Price = curAndLenPrice;
            optimum.PosPrev = cur + 1;
            optimum.BackPrev = 0;
            optimum.Prev1IsChar = true;
            optimum.Prev2 = false;
          }
        }
      }
      startLen = 2;
      for (repIndex = 0; repIndex < 4; ++repIndex) {
        lenTest = $GetMatchLen(this$static._matchFinder, -1, this$static.reps[repIndex], numAvailableBytes);
        if (lenTest < 2) {
          continue;
        }
        lenTestTemp = lenTest;
        do {
          while (lenEnd < cur + lenTest) {
            this$static._optimum[++lenEnd].Price = 268435455;
          }
          curAndLenPrice = repMatchPrice + (price_0 = $GetPrice(this$static._repMatchLenEncoder, lenTest - 2, posState) , price_0 + $GetPureRepPrice(this$static, repIndex, state, posState));
          optimum = this$static._optimum[cur + lenTest];
          if (curAndLenPrice < optimum.Price) {
            optimum.Price = curAndLenPrice;
            optimum.PosPrev = cur;
            optimum.BackPrev = repIndex;
            optimum.Prev1IsChar = false;
          }
        } while (--lenTest >= 2);
        lenTest = lenTestTemp;
        if (repIndex == 0) {
          startLen = lenTest + 1;
        }
        if (lenTest < numAvailableBytesFull) {
          t = min(numAvailableBytesFull - 1 - lenTest, this$static._numFastBytes);
          lenTest2 = $GetMatchLen(this$static._matchFinder, lenTest, this$static.reps[repIndex], t);
          if (lenTest2 >= 2) {
            state2 = state < 7?8:11;
            posStateNext = position + lenTest & this$static._posStateMask;
            curAndLenCharPrice = repMatchPrice + (price_1 = $GetPrice(this$static._repMatchLenEncoder, lenTest - 2, posState) , price_1 + $GetPureRepPrice(this$static, repIndex, state, posState)) + ProbPrices[this$static._isMatch[(state2 << 4) + posStateNext] >>> 2] + $GetPrice_0($GetSubCoder(this$static._literalEncoder, position + lenTest, $GetIndexByte(this$static._matchFinder, lenTest - 1 - 1)), true, $GetIndexByte(this$static._matchFinder, lenTest - 1 - (this$static.reps[repIndex] + 1)), $GetIndexByte(this$static._matchFinder, lenTest - 1));
            state2 = StateUpdateChar(state2);
            posStateNext = position + lenTest + 1 & this$static._posStateMask;
            nextMatchPrice = curAndLenCharPrice + ProbPrices[2048 - this$static._isMatch[(state2 << 4) + posStateNext] >>> 2];
            nextRepMatchPrice = nextMatchPrice + ProbPrices[2048 - this$static._isRep[state2] >>> 2];
            offset = lenTest + 1 + lenTest2;
            while (lenEnd < cur + offset) {
              this$static._optimum[++lenEnd].Price = 268435455;
            }
            curAndLenPrice = nextRepMatchPrice + (price_2 = $GetPrice(this$static._repMatchLenEncoder, lenTest2 - 2, posStateNext) , price_2 + $GetPureRepPrice(this$static, 0, state2, posStateNext));
            optimum = this$static._optimum[cur + offset];
            if (curAndLenPrice < optimum.Price) {
              optimum.Price = curAndLenPrice;
              optimum.PosPrev = cur + lenTest + 1;
              optimum.BackPrev = 0;
              optimum.Prev1IsChar = true;
              optimum.Prev2 = true;
              optimum.PosPrev2 = cur;
              optimum.BackPrev2 = repIndex;
            }
          }
        }
      }
      if (newLen > numAvailableBytes) {
        newLen = numAvailableBytes;
        for (numDistancePairs = 0; newLen > this$static._matchDistances[numDistancePairs]; numDistancePairs += 2) {
        }
        this$static._matchDistances[numDistancePairs] = newLen;
        numDistancePairs += 2;
      }
      if (newLen >= startLen) {
      normalMatchPrice = matchPrice + ProbPrices[this$static._isRep[state] >>> 2];
      while (lenEnd < cur + newLen) {
        this$static._optimum[++lenEnd].Price = 268435455;
      }
      offs = 0;
      while (startLen > this$static._matchDistances[offs]) {
        offs += 2;
      }
      for (lenTest = startLen;; ++lenTest) {
        curBack = this$static._matchDistances[offs + 1];
        curAndLenPrice = normalMatchPrice + $GetPosLenPrice(this$static, curBack, lenTest, posState);
        optimum = this$static._optimum[cur + lenTest];
        if (curAndLenPrice < optimum.Price) {
          optimum.Price = curAndLenPrice;
          optimum.PosPrev = cur;
          optimum.BackPrev = curBack + 4;
          optimum.Prev1IsChar = false;
        }
        if (lenTest == this$static._matchDistances[offs]) {
          if (lenTest < numAvailableBytesFull) {
            t = min(numAvailableBytesFull - 1 - lenTest, this$static._numFastBytes);
            lenTest2 = $GetMatchLen(this$static._matchFinder, lenTest, curBack, t);
            if (lenTest2 >= 2) {
              state2 = state < 7?7:10;
              posStateNext = position + lenTest & this$static._posStateMask;
              curAndLenCharPrice = curAndLenPrice + ProbPrices[this$static._isMatch[(state2 << 4) + posStateNext] >>> 2] + $GetPrice_0($GetSubCoder(this$static._literalEncoder, position + lenTest, $GetIndexByte(this$static._matchFinder, lenTest - 1 - 1)), true, $GetIndexByte(this$static._matchFinder, lenTest - (curBack + 1) - 1), $GetIndexByte(this$static._matchFinder, lenTest - 1));
              state2 = StateUpdateChar(state2);
              posStateNext = position + lenTest + 1 & this$static._posStateMask;
              nextMatchPrice = curAndLenCharPrice + ProbPrices[2048 - this$static._isMatch[(state2 << 4) + posStateNext] >>> 2];
              nextRepMatchPrice = nextMatchPrice + ProbPrices[2048 - this$static._isRep[state2] >>> 2];
              offset = lenTest + 1 + lenTest2;
              while (lenEnd < cur + offset) {
                this$static._optimum[++lenEnd].Price = 268435455;
              }
              curAndLenPrice = nextRepMatchPrice + (price_3 = $GetPrice(this$static._repMatchLenEncoder, lenTest2 - 2, posStateNext) , price_3 + $GetPureRepPrice(this$static, 0, state2, posStateNext));
              optimum = this$static._optimum[cur + offset];
              if (curAndLenPrice < optimum.Price) {
                optimum.Price = curAndLenPrice;
                optimum.PosPrev = cur + lenTest + 1;
                optimum.BackPrev = 0;
                optimum.Prev1IsChar = true;
                optimum.Prev2 = true;
                optimum.PosPrev2 = cur;
                optimum.BackPrev2 = curBack + 4;
              }
            }
          }
          offs += 2;
          if (offs == numDistancePairs)
            break;
          }
        }
      }
    }
  }
  
  function $GetPosLenPrice(this$static, pos, len, posState) {
    var lenToPosState, price;
    lenToPosState = GetLenToPosState(len);
    if (pos < 128) {
      price = this$static._distancesPrices[lenToPosState * 128 + pos];
    } else {
      price = this$static._posSlotPrices[(lenToPosState << 6) + GetPosSlot2(pos)] + this$static._alignPrices[pos & 15];
    }
    return price + $GetPrice(this$static._lenEncoder, len - 2, posState);
  }
  
  function $GetPureRepPrice(this$static, repIndex, state, posState) {
    var price;
    if (repIndex == 0) {
      price = ($clinit_66() , ProbPrices[this$static._isRepG0[state] >>> 2]);
      price += ProbPrices[2048 - this$static._isRep0Long[(state << 4) + posState] >>> 2];
    } else {
      price = ($clinit_66() , ProbPrices[2048 - this$static._isRepG0[state] >>> 2]);
      if (repIndex == 1) {
        price += ProbPrices[this$static._isRepG1[state] >>> 2];
      } else {
        price += ProbPrices[2048 - this$static._isRepG1[state] >>> 2];
        price += GetPrice(this$static._isRepG2[state], repIndex - 2);
      }
    }
    return price;
  }
  
  function $GetRepLen1Price(this$static, state, posState) {
    return ($clinit_66() , ProbPrices[this$static._isRepG0[state] >>> 2]) + ProbPrices[this$static._isRep0Long[(state << 4) + posState] >>> 2];
  }
  
  function $Init_4(this$static) {
    var i;
    $BaseInit(this$static);
    $Init_9(this$static._rangeEncoder);
    InitBitModels_0(this$static._isMatch);
    InitBitModels_0(this$static._isRep0Long);
    InitBitModels_0(this$static._isRep);
    InitBitModels_0(this$static._isRepG0);
    InitBitModels_0(this$static._isRepG1);
    InitBitModels_0(this$static._isRepG2);
    InitBitModels_0(this$static._posEncoders);
    $Init_3(this$static._literalEncoder);
    for (i = 0; i < 4; ++i) {
      InitBitModels(this$static._posSlotEncoder[i].Models);
    }
    $Init_2(this$static._lenEncoder, 1 << this$static._posStateBits);
    $Init_2(this$static._repMatchLenEncoder, 1 << this$static._posStateBits);
    InitBitModels(this$static._posAlignEncoder.Models);
    this$static._longestMatchWasFound = false;
    this$static._optimumEndIndex = 0;
    this$static._optimumCurrentIndex = 0;
    this$static._additionalOffset = 0;
  }
  
  function $MovePos(this$static, num) {
    if (num > 0) {
      $Skip(this$static._matchFinder, num);
      this$static._additionalOffset += num;
    }
  }
  
  function $ReadMatchDistances(this$static) {
    var lenRes;
    lenRes = 0;
    this$static._numDistancePairs = $GetMatches(this$static._matchFinder, this$static._matchDistances);
    if (this$static._numDistancePairs > 0) {
      lenRes = this$static._matchDistances[this$static._numDistancePairs - 2];
      if (lenRes == this$static._numFastBytes)
      lenRes += $GetMatchLen(this$static._matchFinder, lenRes - 1, this$static._matchDistances[this$static._numDistancePairs - 1], 273 - lenRes);
    }
    ++this$static._additionalOffset;
    return lenRes;
  }
  
  function $ReleaseMFStream(this$static) {
    if (!!this$static._matchFinder && this$static._needReleaseMFStream) {
      this$static._matchFinder._stream = null;
      this$static._needReleaseMFStream = false;
    }
  }
  
  function $ReleaseStreams(this$static) {
    $ReleaseMFStream(this$static);
    this$static._rangeEncoder.Stream = null;
  }
  
  function $SetDictionarySize_0(this$static, dictionarySize) {
    var dicLogSize;
    if (dictionarySize < 1 || dictionarySize > 536870912) {
      return false;
    }
    this$static._dictionarySize = dictionarySize;
    for (dicLogSize = 0; dictionarySize > 1 << dicLogSize; ++dicLogSize) {
    }
    this$static._distTableSize = dicLogSize * 2;
    return true;
  }
  
  function $SetLcLpPb_0(this$static, lc, lp, pb) {
    if (lp < 0 || lp > 4 || lc < 0 || lc > 8 || pb < 0 || pb > 4) {
      return false;
    }
    this$static._numLiteralPosStateBits = lp;
    this$static._numLiteralContextBits = lc;
    this$static._posStateBits = pb;
    this$static._posStateMask = (1 << this$static._posStateBits) - 1;
    return true;
  }
  
  function $SetMatchFinder(this$static, matchFinderIndex) {
    var matchFinderIndexPrev;
    if (matchFinderIndex < 0 || matchFinderIndex > 2) {
      return false;
    }
    matchFinderIndexPrev = this$static._matchFinderType;
    this$static._matchFinderType = matchFinderIndex;
    if (!!this$static._matchFinder && matchFinderIndexPrev != this$static._matchFinderType) {
      this$static._dictionarySizePrev = -1;
      this$static._matchFinder = null;
    }
    return true;
  }
  
  function $SetNumFastBytes(this$static, numFastBytes) {
    if (numFastBytes < 5 || numFastBytes > 273) {
      return false;
    }
    this$static._numFastBytes = numFastBytes;
    return true;
  }
  
  function $WriteCoderProperties(this$static, outStream) {
    var i;
    this$static.properties[0] = (this$static._posStateBits * 5 + this$static._numLiteralPosStateBits) * 9 + this$static._numLiteralContextBits << 24 >> 24;
    for (i = 0; i < 4; ++i) {
      this$static.properties[1 + i] = this$static._dictionarySize >> 8 * i << 24 >> 24;
    }
    $write_0(outStream, this$static.properties, 0, 5);
  }
  
  function $WriteEndMarker(this$static, posState) {
    var lenToPosState;
    if (!this$static._writeEndMark) {
      return;
    }
    $Encode_3(this$static._rangeEncoder, this$static._isMatch, (this$static._state << 4) + posState, 1);
    $Encode_3(this$static._rangeEncoder, this$static._isRep, this$static._state, 0);
    this$static._state = this$static._state < 7?7:10;
    $Encode_0(this$static._lenEncoder, this$static._rangeEncoder, 0, posState);
    lenToPosState = GetLenToPosState(2);
    $Encode_2(this$static._posSlotEncoder[lenToPosState], this$static._rangeEncoder, 63);
    $EncodeDirectBits(this$static._rangeEncoder, 67108863, 26);
    $ReverseEncode(this$static._posAlignEncoder, this$static._rangeEncoder, 15);
  }
  
  function GetPosSlot(pos) {
    if (pos < 2048) {
      return g_FastPos[pos];
    }
    if (pos < 2097152) {
      return g_FastPos[pos >> 10] + 20;
    }
    return g_FastPos[pos >> 20] + 40;
  }
  
  function GetPosSlot2(pos) {
    if (pos < 131072) {
      return g_FastPos[pos >> 6] + 12;
    }
    if (pos < 134217728) {
      return g_FastPos[pos >> 16] + 32;
    }
    return g_FastPos[pos >> 26] + 52;
  }
  
  function getClass_38() {
    return Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder_2_classLit;
  }
  
  function Encoder() {
  }
  
  _ = Encoder.prototype = new Object_0();
  _.getClass$ = getClass_38;
  _.typeId$ = 0;
  _._additionalOffset = 0;
  _._alignPriceCount = 0;
  _._dictionarySize = 4194304;
  _._dictionarySizePrev = -1;
  _._distTableSize = 44;
  _._finished = false;
  _._inStream = null;
  _._longestMatchLength = 0;
  _._longestMatchWasFound = false;
  _._matchFinder = null;
  _._matchFinderType = 1;
  _._matchPriceCount = 0;
  _._needReleaseMFStream = false;
  _._numDistancePairs = 0;
  _._numFastBytes = 32;
  _._numFastBytesPrev = -1;
  _._numLiteralContextBits = 3;
  _._numLiteralPosStateBits = 0;
  _._optimumCurrentIndex = 0;
  _._optimumEndIndex = 0;
  _._posStateBits = 2;
  _._posStateMask = 3;
  _._previousByte = 0;
  _._state = 0;
  _._writeEndMark = false;
  _.backRes = 0;
  _.nowPos64 = P0_longLit;
  var g_FastPos;
  function $Encode(this$static, rangeEncoder, symbol, posState) {
    if (symbol < 8) {
      $Encode_3(rangeEncoder, this$static._choice, 0, 0);
      $Encode_2(this$static._lowCoder[posState], rangeEncoder, symbol);
    } else {
      symbol -= 8;
      $Encode_3(rangeEncoder, this$static._choice, 0, 1);
      if (symbol < 8) {
        $Encode_3(rangeEncoder, this$static._choice, 1, 0);
        $Encode_2(this$static._midCoder[posState], rangeEncoder, symbol);
      } else {
        $Encode_3(rangeEncoder, this$static._choice, 1, 1);
        $Encode_2(this$static._highCoder, rangeEncoder, symbol - 8);
      }
    }
  }
  
  function $Encoder$LenEncoder(this$static) {
    var posState;
    this$static._choice = initDim(_3S_classLit, 0, -1, 2, 1);
    this$static._lowCoder = initDim(_3Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeEncoder_2_classLit, 0, 8, 16, 0);
    this$static._midCoder = initDim(_3Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeEncoder_2_classLit, 0, 8, 16, 0);
    this$static._highCoder = $BitTreeEncoder(new BitTreeEncoder(), 8);
    for (posState = 0; posState < 16; ++posState) {
      this$static._lowCoder[posState] = $BitTreeEncoder(new BitTreeEncoder(), 3);
      this$static._midCoder[posState] = $BitTreeEncoder(new BitTreeEncoder(), 3);
    }
    return this$static;
  }
  
  function $Init_2(this$static, numPosStates) {
    var posState;
    InitBitModels_0(this$static._choice);
    for (posState = 0; posState < numPosStates; ++posState) {
      InitBitModels(this$static._lowCoder[posState].Models);
      InitBitModels(this$static._midCoder[posState].Models);
    }
    InitBitModels(this$static._highCoder.Models);
  }
  
  function $SetPrices(this$static, posState, numSymbols, prices, st) {
    var a0, a1, b0, b1, i;
    a0 = ($clinit_66() , ProbPrices[this$static._choice[0] >>> 2]);
    a1 = ProbPrices[2048 - this$static._choice[0] >>> 2];
    b0 = a1 + ProbPrices[this$static._choice[1] >>> 2];
    b1 = a1 + ProbPrices[2048 - this$static._choice[1] >>> 2];
    i = 0;
    for (i = 0; i < 8; ++i) {
      if (i >= numSymbols)
      return;
      prices[st + i] = a0 + $GetPrice_1(this$static._lowCoder[posState], i);
    }
    for (; i < 16; ++i) {
      if (i >= numSymbols)
      return;
      prices[st + i] = b0 + $GetPrice_1(this$static._midCoder[posState], i - 8);
    }
    for (; i < numSymbols; ++i) {
      prices[st + i] = b1 + $GetPrice_1(this$static._highCoder, i - 8 - 8);
    }
  }
    
  function getClass_33() {
    return Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$LenEncoder_2_classLit;
  }
  
  function Encoder$LenEncoder() {
  }
  
  _ = Encoder$LenEncoder.prototype = new Object_0();
  _.getClass$ = getClass_33;
  _.typeId$ = 0;
  function $Encode_0(this$static, rangeEncoder, symbol, posState) {
    $Encode(this$static, rangeEncoder, symbol, posState);
    if (--this$static._counters[posState] == 0) {
      $SetPrices(this$static, posState, this$static._tableSize, this$static._prices, posState * 272);
      this$static._counters[posState] = this$static._tableSize;
    }
  }
  
  function $Encoder$LenPriceTableEncoder(this$static) {
    $Encoder$LenEncoder(this$static);
    this$static._prices = initDim(_3I_classLit, 0, -1, 4352, 1);
    this$static._counters = initDim(_3I_classLit, 0, -1, 16, 1);
    return this$static;
  }
  
  function $GetPrice(this$static, symbol, posState) {
    return this$static._prices[posState * 272 + symbol];
  }
  
  function $UpdateTables(this$static, numPosStates) {
    var posState;
    for (posState = 0; posState < numPosStates; ++posState) {
      $SetPrices(this$static, posState, this$static._tableSize, this$static._prices, posState * 272);
      this$static._counters[posState] = this$static._tableSize;
    }
  }
  
  function getClass_34() {
    return Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$LenPriceTableEncoder_2_classLit;
  }
  
  function Encoder$LenPriceTableEncoder() {
  }
  
  _ = Encoder$LenPriceTableEncoder.prototype = new Encoder$LenEncoder();
  _.getClass$ = getClass_34;
  _.typeId$ = 0;
  _._tableSize = 0;
  function $Create_1(this$static, numPosBits, numPrevBits) {
    var i, numStates;
    if (this$static.m_Coders != null && this$static.m_NumPrevBits == numPrevBits && this$static.m_NumPosBits == numPosBits) {
      return;
    }
    this$static.m_NumPosBits = numPosBits;
    this$static.m_PosMask = (1 << numPosBits) - 1;
    this$static.m_NumPrevBits = numPrevBits;
    numStates = 1 << this$static.m_NumPrevBits + this$static.m_NumPosBits;
    this$static.m_Coders = initDim(_3Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$LiteralEncoder$Encoder2_2_classLit, 0, 5, numStates, 0);
    for (i = 0; i < numStates; ++i) {
      this$static.m_Coders[i] = $Encoder$LiteralEncoder$Encoder2(new Encoder$LiteralEncoder$Encoder2());
    }
  }
  
  function $GetSubCoder(this$static, pos, prevByte) {
    return this$static.m_Coders[((pos & this$static.m_PosMask) << this$static.m_NumPrevBits) + ((prevByte & 255) >>> 8 - this$static.m_NumPrevBits)];
  }
  
  function $Init_3(this$static) {
    var i, numStates;
    numStates = 1 << this$static.m_NumPrevBits + this$static.m_NumPosBits;
    for (i = 0; i < numStates; ++i) {
      InitBitModels_0(this$static.m_Coders[i].m_Encoders);
    }
  }
  
  function getClass_36() {
    return Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$LiteralEncoder_2_classLit;
  }
  
  function Encoder$LiteralEncoder() {
  }
  
  _ = Encoder$LiteralEncoder.prototype = new Object_0();
  _.getClass$ = getClass_36;
  _.typeId$ = 0;
  _.m_Coders = null;
  _.m_NumPosBits = 0;
  _.m_NumPrevBits = 0;
  _.m_PosMask = 0;
  function $Encode_1(this$static, rangeEncoder, symbol) {
    var bit, context, i;
    context = 1;
    for (i = 7; i >= 0; --i) {
      bit = symbol >> i & 1;
      $Encode_3(rangeEncoder, this$static.m_Encoders, context, bit);
      context = context << 1 | bit;
    }
  }
  
  function $EncodeMatched(this$static, rangeEncoder, matchByte, symbol) {
    var bit, context, i, matchBit, same, state;
    context = 1;
    same = true;
    for (i = 7; i >= 0; --i) {
      bit = symbol >> i & 1;
      state = context;
      if (same) {
        matchBit = matchByte >> i & 1;
        state += 1 + matchBit << 8;
        same = matchBit == bit;
      }
      $Encode_3(rangeEncoder, this$static.m_Encoders, state, bit);
      context = context << 1 | bit;
    }
  }
  
  function $Encoder$LiteralEncoder$Encoder2(this$static) {
    this$static.m_Encoders = initDim(_3S_classLit, 0, -1, 768, 1);
    return this$static;
  }
  
  function $GetPrice_0(this$static, matchMode, matchByte, symbol) {
    var bit, context, i, matchBit, price;
    price = 0;
    context = 1;
    i = 7;
    if (matchMode) {
      for (; i >= 0; --i) {
        matchBit = matchByte >> i & 1;
        bit = symbol >> i & 1;
        price += GetPrice(this$static.m_Encoders[(1 + matchBit << 8) + context], bit);
        context = context << 1 | bit;
        if (matchBit != bit) {
          --i;
          break;
        }
      }
    }
    for (; i >= 0; --i) {
      bit = symbol >> i & 1;
      price += GetPrice(this$static.m_Encoders[context], bit);
      context = context << 1 | bit;
    }
    return price;
  }
  
  function getClass_35() {
    return Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$LiteralEncoder$Encoder2_2_classLit;
  }
  
  function Encoder$LiteralEncoder$Encoder2() {
  }
  
  _ = Encoder$LiteralEncoder$Encoder2.prototype = new Object_0();
  _.getClass$ = getClass_35;
  _.typeId$ = 18;
  function $MakeAsChar(this$static) {
    this$static.BackPrev = -1;
    this$static.Prev1IsChar = false;
  }
  
  function $MakeAsShortRep(this$static) {
    this$static.BackPrev = 0;
    this$static.Prev1IsChar = false;
  }
  
  function getClass_37() {
    return Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$Optimal_2_classLit;
  }
  
  function Encoder$Optimal() {
  }
  
  _ = Encoder$Optimal.prototype = new Object_0();
  _.getClass$ = getClass_37;
  _.typeId$ = 19;
  _.BackPrev = 0;
  _.BackPrev2 = 0;
  _.Backs0 = 0;
  _.Backs1 = 0;
  _.Backs2 = 0;
  _.Backs3 = 0;
  _.PosPrev = 0;
  _.PosPrev2 = 0;
  _.Prev1IsChar = false;
  _.Prev2 = false;
  _.Price = 0;
  _.State = 0;
  function $BitTreeDecoder(this$static, numBitLevels) {
    this$static.NumBitLevels = numBitLevels;
    this$static.Models = initDim(_3S_classLit, 0, -1, 1 << numBitLevels, 1);
    return this$static;
  }
  
  function $Decode_0(this$static, rangeDecoder) {
    var bitIndex, m;
    m = 1;
    for (bitIndex = this$static.NumBitLevels; bitIndex != 0; --bitIndex) {
      m = (m << 1) + $DecodeBit(rangeDecoder, this$static.Models, m);
    }
    return m - (1 << this$static.NumBitLevels);
  }
  
  function $ReverseDecode(this$static, rangeDecoder) {
    var bit, bitIndex, m, symbol;
    m = 1;
    symbol = 0;
    for (bitIndex = 0; bitIndex < this$static.NumBitLevels; ++bitIndex) {
      bit = $DecodeBit(rangeDecoder, this$static.Models, m);
      m <<= 1;
      m += bit;
      symbol |= bit << bitIndex;
    }
    return symbol;
  }
  
  function ReverseDecode(Models, startIndex, rangeDecoder, NumBitLevels) {
    var bit, bitIndex, m, symbol;
    m = 1;
    symbol = 0;
    for (bitIndex = 0; bitIndex < NumBitLevels; ++bitIndex) {
      bit = $DecodeBit(rangeDecoder, Models, startIndex + m);
      m <<= 1;
      m += bit;
      symbol |= bit << bitIndex;
    }
    return symbol;
  }
  
  function getClass_42() {
    return Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeDecoder_2_classLit;
  }
  
  function BitTreeDecoder() {
  }
  
  _ = BitTreeDecoder.prototype = new Object_0();
  _.getClass$ = getClass_42;
  _.typeId$ = 20;
  _.Models = null;
  _.NumBitLevels = 0;
  function $BitTreeEncoder(this$static, numBitLevels) {
    this$static.NumBitLevels = numBitLevels;
    this$static.Models = initDim(_3S_classLit, 0, -1, 1 << numBitLevels, 1);
    return this$static;
  }
  
  function $Encode_2(this$static, rangeEncoder, symbol) {
    var bit, bitIndex, m;
    m = 1;
    for (bitIndex = this$static.NumBitLevels; bitIndex != 0;) {
      --bitIndex;
      bit = symbol >>> bitIndex & 1;
      $Encode_3(rangeEncoder, this$static.Models, m, bit);
      m = m << 1 | bit;
    }
  }
  
  function $GetPrice_1(this$static, symbol) {
    var bit, bitIndex, m, price;
    price = 0;
    m = 1;
    for (bitIndex = this$static.NumBitLevels; bitIndex != 0;) {
      --bitIndex;
      bit = symbol >>> bitIndex & 1;
      price += GetPrice(this$static.Models[m], bit);
      m = (m << 1) + bit;
    }
    return price;
  }
  
  function $ReverseEncode(this$static, rangeEncoder, symbol) {
    var bit, i, m;
    m = 1;
    for (i = 0; i < this$static.NumBitLevels; ++i) {
      bit = symbol & 1;
      $Encode_3(rangeEncoder, this$static.Models, m, bit);
      m = m << 1 | bit;
      symbol >>= 1;
    }
  }
  
  function $ReverseGetPrice(this$static, symbol) {
    var bit, i, m, price;
    price = 0;
    m = 1;
    for (i = this$static.NumBitLevels; i != 0; --i) {
      bit = symbol & 1;
      symbol >>>= 1;
      price += GetPrice(this$static.Models[m], bit);
      m = m << 1 | bit;
    }
    return price;
  }
  
  function ReverseEncode(Models, startIndex, rangeEncoder, NumBitLevels, symbol) {
    var bit, i, m;
    m = 1;
    for (i = 0; i < NumBitLevels; ++i) {
      bit = symbol & 1;
      $Encode_3(rangeEncoder, Models, startIndex + m, bit);
      m = m << 1 | bit;
      symbol >>= 1;
    }
  }
  
  function ReverseGetPrice(Models, startIndex, NumBitLevels, symbol) {
    var bit, i, m, price;
    price = 0;
    m = 1;
    for (i = NumBitLevels; i != 0; --i) {
      bit = symbol & 1;
      symbol >>>= 1;
      price += ($clinit_66() , ProbPrices[((Models[startIndex + m] - bit ^ -bit) & 2047) >>> 2]);
      m = m << 1 | bit;
    }
    return price;
  }
  
  function getClass_43() {
    return Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeEncoder_2_classLit;
  }
  
  function BitTreeEncoder() {
  }
  
  _ = BitTreeEncoder.prototype = new Object_0();
  _.getClass$ = getClass_43;
  _.typeId$ = 21;
  _.Models = null;
  _.NumBitLevels = 0;
  function $DecodeBit(this$static, probs, index) {
    var newBound, prob;
    prob = probs[index];
    newBound = (this$static.Range >>> 11) * prob;
    if ((this$static.Code ^ -2147483648) < (newBound ^ -2147483648)) {
      this$static.Range = newBound;
      probs[index] = prob + (2048 - prob >>> 5) << 16 >> 16;
      if ((this$static.Range & -16777216) == 0) {
        this$static.Code = this$static.Code << 8 | $read(this$static.Stream);
        this$static.Range <<= 8;
      }
      return 0;
    } else {
      this$static.Range -= newBound;
      this$static.Code -= newBound;
      probs[index] = prob - (prob >>> 5) << 16 >> 16;
      if ((this$static.Range & -16777216) == 0) {
        this$static.Code = this$static.Code << 8 | $read(this$static.Stream);
        this$static.Range <<= 8;
      }
      return 1;
    }
  }
  
  function $DecodeDirectBits(this$static, numTotalBits) {
    var i, result, t;
    result = 0;
    for (i = numTotalBits; i != 0; --i) {
      this$static.Range >>>= 1;
      t = this$static.Code - this$static.Range >>> 31;
      this$static.Code -= this$static.Range & t - 1;
      result = result << 1 | 1 - t;
      if ((this$static.Range & -16777216) == 0) {
        this$static.Code = this$static.Code << 8 | $read(this$static.Stream);
        this$static.Range <<= 8;
      }
    }
    return result;
  }
  
  function $Init_8(this$static) {
    var i;
    this$static.Code = 0;
    this$static.Range = -1;
    for (i = 0; i < 5; ++i) {
      this$static.Code = this$static.Code << 8 | $read(this$static.Stream);
    }
  }
  
  function InitBitModels(probs) {
    var i;
    for (i = 0; i < probs.length; ++i) {
      probs[i] = 1024;
    }
  }
  
  function getClass_44() {
    return Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_Decoder_2_classLit;
  }
  
  function Decoder_0() {
  }
  
  _ = Decoder_0.prototype = new Object_0();
  _.getClass$ = getClass_44;
  _.typeId$ = 0;
  _.Code = 0;
  _.Range = 0;
  _.Stream = null;
  function $clinit_66() {
    $clinit_66 = nullMethod;
    var end, i, j, start;
    ProbPrices = initDim(_3I_classLit, 0, -1, 512, 1);
    for (i = 8; i >= 0; --i) {
      start = 1 << 9 - i - 1;
      end = 1 << 9 - i;
      for (j = start; j < end; ++j) {
        ProbPrices[j] = (i << 6) + (end - j << 6 >>> 9 - i - 1);
      }
    }
  }
  
  function $Encode_3(this$static, probs, index, symbol) {
    var newBound, prob;
    prob = probs[index];
    newBound = (this$static.Range >>> 11) * prob;
    if (symbol == 0) {
      this$static.Range = newBound;
      probs[index] = prob + (2048 - prob >>> 5) << 16 >> 16;
    } else {
      this$static.Low = add(this$static.Low, and(fromInt(newBound), Pffffffff_longLit));
      this$static.Range -= newBound;
      probs[index] = prob - (prob >>> 5) << 16 >> 16;
    }
    if ((this$static.Range & -16777216) == 0) {
      this$static.Range <<= 8;
      $ShiftLow(this$static);
    }
  }
  
  function $EncodeDirectBits(this$static, v, numTotalBits) {
    var i;
    for (i = numTotalBits - 1; i >= 0; --i) {
      this$static.Range >>>= 1;
      if ((v >>> i & 1) == 1) {
        this$static.Low = add(this$static.Low, fromInt(this$static.Range));
      }
      if ((this$static.Range & -16777216) == 0) {
        this$static.Range <<= 8;
        $ShiftLow(this$static);
      }
    }
  }
  
  function $FlushData(this$static) {
    var i;
    for (i = 0; i < 5; ++i) {
      $ShiftLow(this$static);
    }
  }
  
  function $GetProcessedSizeAdd(this$static) {
    return add(add(fromInt(this$static._cacheSize), this$static._position), P4_longLit);
  }
  
  function $Init_9(this$static) {
    this$static._position = P0_longLit;
    this$static.Low = P0_longLit;
    this$static.Range = -1;
    this$static._cacheSize = 1;
    this$static._cache = 0;
  }
  
  function $ShiftLow(this$static) {
    var LowHi, temp;
    LowHi = lowBits_0(shru(this$static.Low, 32));
    if (LowHi != 0 || compare(this$static.Low, Pff000000_longLit) < 0) {
      this$static._position = add(this$static._position, fromInt(this$static._cacheSize));
      temp = this$static._cache;
      do {
        $write(this$static.Stream, temp + LowHi);
        temp = 255;
      } while (--this$static._cacheSize != 0);
      this$static._cache = lowBits_0(this$static.Low) >>> 24;
    }
    ++this$static._cacheSize;
    this$static.Low = shl(and(this$static.Low, Pffffff_longLit), 8);
  }
  
  function GetPrice(Prob, symbol) {
    $clinit_66();
    return ProbPrices[((Prob - symbol ^ -symbol) & 2047) >>> 2];
  }
  
  function InitBitModels_0(probs) {
    $clinit_66();
    var i;
    for (i = 0; i < probs.length; ++i) {
      probs[i] = 1024;
    }
  }
  
  function getClass_45() {
    return Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_Encoder_2_classLit;
  }
  
  function Encoder_0() {
  }
  
  _ = Encoder_0.prototype = new Object_0();
  _.getClass$ = getClass_45;
  _.typeId$ = 0;
  _.Low = P0_longLit;
  _.Range = 0;
  _.Stream = null;
  _._cache = 0;
  _._cacheSize = 0;
  _._position = P0_longLit;
  var ProbPrices;
  function decode(utf) {
    var buf, i, x, y, z;
    buf = $StringBuilder(new StringBuilder());
    for (i = 0; i < utf.length; ++i) {
      x = utf[i] & 255;
      if ((x & 128) == 0) {
        if (x == 0) {
          throw $IllegalArgumentException(new IllegalArgumentException(), 'invalid UTF-8');
        }
        $appendNonNull(buf.data, String.fromCharCode(x & 65535));
      } else if ((x & 224) == 192) {
        if (i + 1 >= utf.length) {
          throw $IllegalArgumentException(new IllegalArgumentException(), 'invalid UTF-8');
        }
        y = utf[++i] & 255;
        if ((y & 192) != 128) {
          throw $IllegalArgumentException(new IllegalArgumentException(), 'invalid UTF-8');
        }
        $append(buf.data, String.fromCharCode((x & 31) << 6 & 65535 | y & 63));
      } else if ((x & 240) == 224) {
        if (i + 2 >= utf.length) {
          throw $IllegalArgumentException(new IllegalArgumentException(), 'invalid UTF-8');
        }
        y = utf[++i] & 255;
        if ((y & 192) != 128) {
          throw $IllegalArgumentException(new IllegalArgumentException(), 'invalid UTF-8');
        }
        z = utf[++i] & 255;
        if ((z & 192) != 128) {
          throw $IllegalArgumentException(new IllegalArgumentException(), 'invalid UTF-8');
        }
        $appendNonNull(buf.data, String.fromCharCode(((x & 15) << 12 | (y & 63) << 6 | z & 63) & 65535));
      } else {
        throw $IllegalArgumentException(new IllegalArgumentException(), 'invalid UTF-8');
      }
    }
    return $toString(buf.data);
  }
  
  function encode(s) {
    var ch, chars, data, elen, i, charArr, n;
    chars = (n = s.length , charArr = initDim(_3C_classLit, 0, -1, n, 1) , $getChars(s, 0, n, charArr, 0) , charArr);
    elen = 0;
    for (i = 0; i < s.length; ++i) {
      ch = chars[i];
      if (ch >= 1 && ch <= 127) {
        ++elen;
      } else if (ch == 0 || ch >= 128 && ch <= 2047) {
        elen += 2;
      } else {
        elen += 3;
      }
    }
    data = initDim(_3B_classLit, 0, -1, elen, 1);
    elen = 0;
    for (i = 0; i < s.length; ++i) {
      ch = chars[i];
      if (ch >= 1 && ch <= 127) {
        data[elen++] = ch << 24 >> 24;
      } else if (ch == 0 || ch >= 128 && ch <= 2047) {
        data[elen++] = (192 | ch >> 6 & 31) << 24 >> 24;
        data[elen++] = (128 | ch & 63) << 24 >> 24;
      } else {
        data[elen++] = (224 | ch >> 12 & 15) << 24 >> 24;
        data[elen++] = (128 | ch >> 6 & 63) << 24 >> 24;
        data[elen++] = (128 | ch & 63) << 24 >> 24;
      }
    }
    return data;
  }
  
  function $LZMADemo(this$static) {
    return this$static;
  }
  function toDouble(a) {
    return a[1] + a[0];
  }
  
  function compress() {
    var this$static = $LZMADemo(new LZMADemo()),
      percent,
      start,
      /// Arguments
      str = arguments[0],
      mode = arguments[1],
      callback_num,
      on_finish,
      on_progress;
    
    if (typeof arguments[2] === "function") {
      on_finish = arguments[2];
      if (typeof arguments[3] === "function") {
        on_progress = arguments[3];
      }
    } else {
      callback_num = arguments[2];
    }
    
    this$static.mode = get_mode_obj(mode);
    
    this$static.c = $LZMAByteArrayCompressor(new LZMAByteArrayCompressor(), encode(str), this$static.mode);
    
    if (on_progress) {
      on_progress(0);
    } else if (typeof callback_num !== "undefined") {
      update_progress(0, callback_num);
    }
    
    function do_action() {
      var res;
      start = (new Date).getTime();
      while ($execute(this$static.c)) {
        percent = toDouble(this$static.c.chunker.inBytesProcessed) / toDouble(this$static.c.length_0);
        /// If about 200 miliseconds have passed, update the progress.
        if ((new Date).getTime() - start > 200) {
          if (on_progress) {
            on_progress(percent);
          } else if (typeof callback_num !== "undefined") {
            update_progress(percent, callback_num);
          }
          setTimeout(do_action, 0);
          return false;
        }
      }
      
      if (on_progress) {
        on_progress(1);
      } else if (typeof callback_num !== "undefined") {
        update_progress(1, callback_num);
      }
      
      /// .slice(0) is required for Firefox 4.0 (because I think arrays are now passed by reference, which is not allowed when sending messages to or from web workers).
      /// .slice(0) simply returns the entire array by value.
      res = $toByteArray(this$static.c.output).slice(0);
      
      if (on_finish) {
        on_finish(res);
      } else if (typeof callback_num !== "undefined") {
        postMessage({
          action: action_compress,
          callback_num: callback_num,
          result: res
        });
      }
    }
    
    setTimeout(do_action, 1);
  }
  
  function decompress() {
    var this$static = $LZMADemo(new LZMADemo()),
      percent,
      data,
      start,
      text,
      /// Arguments
      byte_arr = arguments[0],
      callback_num,
      on_finish,
      on_progress;
    
    if (typeof arguments[1] === "function") {
      on_finish = arguments[1];
      if (typeof arguments[2] === "function") {
        on_progress = arguments[2];
      }
    } else {
      callback_num = arguments[1];
    }
    
    data = initValues(_3B_classLit, 0, -1, byte_arr);
    
    this$static.d = $LZMAByteArrayDecompressor(new LZMAByteArrayDecompressor(), data);
    
    if (on_progress) {
      on_progress(0);
    } else if (typeof callback_num !== "undefined") {
      update_progress(0, callback_num);
    }
    
    function do_action() {
      var res;
      start = (new Date).getTime();
      while ($execute_0(this$static.d)) {
        percent = toDouble(this$static.d.chunker.decoder.nowPos64) / toDouble(this$static.d.length_0);
        /// If about 200 miliseconds have passed, update the progress.
        if ((new Date).getTime() - start > 200) {
          if (on_progress) {
            on_progress(percent);
          } else if (typeof callback_num !== "undefined") {
            update_progress(percent, callback_num);
          }
          setTimeout(do_action, 0);
          return false;
        }
      }
      
      if (on_progress) {
        on_progress(1);
      } else if (typeof callback_num !== "undefined") {
        update_progress(1, callback_num);
      }
      
      res = decode($toByteArray(this$static.d.output));
      
      if (on_finish) {
        on_finish(res);
      } else if (typeof callback_num !== "undefined") {
        postMessage({
          action: action_decompress,
          callback_num: callback_num,
          result: res
        });
      }
    }
    
    setTimeout(do_action, 0);
  }
  
  function $onModuleLoad(this$static) {
    compress(this$static);
    decompress(this$static);
  }
  
  function getClass_46() {
    return Lorg_dellroad_lzma_demo_client_LZMADemo_2_classLit;
  }
  
  function LZMADemo () {}
  
  _ = LZMADemo.prototype = new Object_0();
  _.getClass$ = getClass_46;
  _.typeId$ = 0;
  _.c = null;
  _.d = null;
  var DEFAULT_COMPRESSION_MODE;
  function init() {
    !!$stats && $stats({moduleName:$moduleName, subSystem:'startup', evtGroup:'moduleStartup', millis:(new Date()).getTime(), type:'onModuleLoadStart', className:'org.dellroad.lzma.demo.client.LZMADemo'});
  }
  
  function gwtOnLoad(errFn, modName, modBase) {
    $moduleName = modName;
    $moduleBase = modBase;
    if (errFn) {
      try {
        init();
      }
      catch (e) {
        errFn(modName);
      }
    } else {
      init();
    }
  }
  
  function nullMethod() {
  }
  
  var Ljava_lang_Object_2_classLit = createForClass('java.lang.', 'Object'),
    Ljava_lang_Throwable_2_classLit = createForClass('java.lang.', 'Throwable'),
    Ljava_lang_Exception_2_classLit = createForClass('java.lang.', 'Exception'),
    Ljava_lang_RuntimeException_2_classLit = createForClass('java.lang.', 'RuntimeException'),
    Lcom_google_gwt_core_client_JavaScriptException_2_classLit = createForClass('com.google.gwt.core.client.', 'JavaScriptException'),
    Lcom_google_gwt_core_client_JavaScriptObject_2_classLit = createForClass('com.google.gwt.core.client.', 'JavaScriptObject$'), _3_3D_classLit = createForArray('', '[[D'),
    Ljava_io_InputStream_2_classLit = createForClass('java.io.', 'InputStream'),
    Ljava_io_ByteArrayInputStream_2_classLit = createForClass('java.io.', 'ByteArrayInputStream'), _3B_classLit = createForArray('', '[B'),
    Ljava_io_OutputStream_2_classLit = createForClass('java.io.', 'OutputStream'),
    Ljava_io_ByteArrayOutputStream_2_classLit = createForClass('java.io.', 'ByteArrayOutputStream'),
    Ljava_io_IOException_2_classLit = createForClass('java.io.', 'IOException'),
    Ljava_lang_Enum_2_classLit = createForClass('java.lang.', 'Enum'),
    Ljava_lang_ArithmeticException_2_classLit = createForClass('java.lang.', 'ArithmeticException'),
    Ljava_lang_ArrayStoreException_2_classLit = createForClass('java.lang.', 'ArrayStoreException'), _3C_classLit = createForArray('', '[C'),
    Ljava_lang_Class_2_classLit = createForClass('java.lang.', 'Class'),
    Ljava_lang_ClassCastException_2_classLit = createForClass('java.lang.', 'ClassCastException'),
    Ljava_lang_IllegalArgumentException_2_classLit = createForClass('java.lang.', 'IllegalArgumentException'),
    Ljava_lang_IllegalStateException_2_classLit = createForClass('java.lang.', 'IllegalStateException'),
    Ljava_lang_IndexOutOfBoundsException_2_classLit = createForClass('java.lang.', 'IndexOutOfBoundsException'), _3I_classLit = createForArray('', '[I'),
    Ljava_lang_NullPointerException_2_classLit = createForClass('java.lang.', 'NullPointerException'),
    Ljava_lang_String_2_classLit = createForClass('java.lang.', 'String'),
    Ljava_lang_StringBuilder_2_classLit = createForClass('java.lang.', 'StringBuilder'),
    Lorg_dellroad_lzma_client_SevenZip_Compression_LZ_InWindow_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZ.', 'InWindow'),
    Lorg_dellroad_lzma_client_SevenZip_Compression_LZ_BinTree_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZ.', 'BinTree'),
    Lorg_dellroad_lzma_client_SevenZip_Compression_LZ_OutWindow_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZ.', 'OutWindow'),
    Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Chunker_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Chunker'), _3S_classLit = createForArray('', '[S'), _3Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeDecoder_2_classLit = createForArray('[Lorg.dellroad.lzma.client.SevenZip.Compression.RangeCoder.', 'BitTreeDecoder;'),
    Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Decoder_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Decoder'),
    Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Decoder$LenDecoder_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Decoder$LenDecoder'), _3Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Decoder$LiteralDecoder$Decoder2_2_classLit = createForArray('[Lorg.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Decoder$LiteralDecoder$Decoder2;'),
    Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Decoder$LiteralDecoder_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Decoder$LiteralDecoder'),
    Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Decoder$LiteralDecoder$Decoder2_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Decoder$LiteralDecoder$Decoder2'), _3Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$Optimal_2_classLit = createForArray('[Lorg.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Encoder$Optimal;'), _3Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeEncoder_2_classLit = createForArray('[Lorg.dellroad.lzma.client.SevenZip.Compression.RangeCoder.', 'BitTreeEncoder;'), _3J_classLit = createForArray('', '[J'), _3Z_classLit = createForArray('', '[Z'),
    Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Encoder'), _3Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$LiteralEncoder$Encoder2_2_classLit = createForArray('[Lorg.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Encoder$LiteralEncoder$Encoder2;'),
    Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$LiteralEncoder_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Encoder$LiteralEncoder'),
    Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$LiteralEncoder$Encoder2_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Encoder$LiteralEncoder$Encoder2'),
    Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$LenEncoder_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Encoder$LenEncoder'),
    Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$LenPriceTableEncoder_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Encoder$LenPriceTableEncoder'),
    Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$Optimal_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Encoder$Optimal'),
    Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeDecoder_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.RangeCoder.', 'BitTreeDecoder'),
    Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeEncoder_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.RangeCoder.', 'BitTreeEncoder'),
    Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_Decoder_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.RangeCoder.', 'Decoder'),
    Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_Encoder_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.RangeCoder.', 'Encoder'),
    Lorg_dellroad_lzma_client_CompressionMode_2_classLit = createForEnum('org.dellroad.lzma.client.', 'CompressionMode'),
    Lorg_dellroad_lzma_client_LZMACompressor_2_classLit = createForClass('org.dellroad.lzma.client.', 'LZMACompressor'),
    Lorg_dellroad_lzma_client_LZMAByteArrayCompressor_2_classLit = createForClass('org.dellroad.lzma.client.', 'LZMAByteArrayCompressor'),
    Lorg_dellroad_lzma_client_LZMADecompressor_2_classLit = createForClass('org.dellroad.lzma.client.', 'LZMADecompressor'),
    Lorg_dellroad_lzma_client_LZMAByteArrayDecompressor_2_classLit = createForClass('org.dellroad.lzma.client.', 'LZMAByteArrayDecompressor'),
    Lorg_dellroad_lzma_demo_client_LZMADemo_2_classLit = createForClass('org.dellroad.lzma.demo.client.', 'LZMADemo');
  
  gwtOnLoad(function() {},'lzma_demo','');
  
  
  var get_mode_obj = (function () {
    var modes = [
            {dictionarySize: 16, fb: 64,  matchFinder: 0, lc: 3, lp: 0, pb: 2},
            {dictionarySize: 20, fb: 64,  matchFinder: 0, lc: 3, lp: 0, pb: 2},
            {dictionarySize: 19, fb: 64,  matchFinder: 1, lc: 3, lp: 0, pb: 2},
            {dictionarySize: 20, fb: 64,  matchFinder: 1, lc: 3, lp: 0, pb: 2},
            {dictionarySize: 21, fb: 128, matchFinder: 1, lc: 3, lp: 0, pb: 2},
            {dictionarySize: 22, fb: 128, matchFinder: 1, lc: 3, lp: 0, pb: 2},
            {dictionarySize: 23, fb: 128, matchFinder: 1, lc: 3, lp: 0, pb: 2},
            {dictionarySize: 24, fb: 255, matchFinder: 1, lc: 3, lp: 0, pb: 2},
            {dictionarySize: 25, fb: 255, matchFinder: 1, lc: 3, lp: 0, pb: 2}
          ];
    
    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    return function (mode) {
      if (!isNumber(mode)) {
        mode = 1;
      } else {
        if (mode < 1) {
          mode = 1;
        } else if (mode > 9) {
          mode = 9;
        }
      }
      
      return modes[mode - 1];
    }
  }());
  
  return {
    compress:   compress,
    decompress: decompress
  };
}());

/// Allow node.js to be able to access this directly if it is included directly.
this.LZMA = LZMA;


// CartoDB.js version: 3.15.10 
// sha: b0f743801efcdf67255637c955b8fcfc9e811f64 
! function() {
    function MapProperties(a) { this.mapProperties = a }

    function MapBase(a) {
        var b = this;
        this.options = _.defaults(a, { ajax: window.$ ? window.$.ajax : reqwest.compat, pngParams: ["map_key", "api_key", "cache_policy", "updated_at"], gridParams: ["map_key", "api_key", "cache_policy", "updated_at"], cors: cdb.core.util.isCORSSupported(), MAX_GET_SIZE: 2033, force_cors: !1, instanciateCallback: function() {
                return "_cdbc_" + b._callbackName() } }), this.mapProperties = null, this.urls = null, this.silent = !1, this.interactionEnabled = [], this._timeout = -1, this._createMapCallsStack = [], this._createMapCallbacks = [], this._waiting = !1, this.lastTimeUpdated = null, this._refreshTimer = -1, this.options.maps_api_template || this._buildMapsApiTemplate(this.options) }

    function LayerDefinition(a, b) { MapBase.call(this, b), this.endPoint = MapBase.BASE_URL, this.setLayerDefinition(a, { silent: !0 }) }

    function NamedMap(a, b) { MapBase.call(this, b), this.options.pngParams.push("auth_token"), this.options.gridParams.push("auth_token"), this.setLayerDefinition(a, b), this.stat_tag = a.stat_tag }

    function SubLayerFactory() {}

    function SubLayerBase(a, b) { this._parent = a, this._position = b, this._added = !0 }

    function CartoDBSubLayer(a, b) { SubLayerBase.call(this, a, b), this._bindInteraction();
        var a = this._parent.getLayer(this._position);
        Backbone.Model && a && (this.infowindow = new Backbone.Model(a.infowindow), this.infowindow.bind("change", function() { a.infowindow = this.infowindow.toJSON(), this._parent.setLayer(this._position, a) }, this)) }

    function HttpSubLayer(a, b) { SubLayerBase.call(this, a, b) }
    this.cartodb = {};
    var Backbone = {};
    (function() {
        var a = this,
            b = a._,
            c = {},
            d = Array.prototype,
            e = Object.prototype,
            f = Function.prototype,
            g = d.push,
            h = d.slice,
            i = d.concat,
            j = e.toString,
            k = e.hasOwnProperty,
            l = d.forEach,
            m = d.map,
            n = d.reduce,
            o = d.reduceRight,
            p = d.filter,
            q = d.every,
            r = d.some,
            s = d.indexOf,
            t = d.lastIndexOf,
            u = Array.isArray,
            v = Object.keys,
            w = f.bind,
            x = function(a) {
                return a instanceof x ? a : this instanceof x ? void(this._wrapped = a) : new x(a) }; "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = x), exports._ = x) : a._ = x, x.VERSION = "1.4.4";
        var y = x.each = x.forEach = function(a, b, d) {
            if (null != a)
                if (l && a.forEach === l) a.forEach(b, d);
                else if (a.length === +a.length) {
                for (var e = 0, f = a.length; f > e; e++)
                    if (b.call(d, a[e], e, a) === c) return } else
                for (var g in a)
                    if (x.has(a, g) && b.call(d, a[g], g, a) === c) return };
        x.map = x.collect = function(a, b, c) {
            var d = [];
            return null == a ? d : m && a.map === m ? a.map(b, c) : (y(a, function(a, e, f) { d[d.length] = b.call(c, a, e, f) }), d) };
        var z = "Reduce of empty array with no initial value";
        x.reduce = x.foldl = x.inject = function(a, b, c, d) {
            var e = arguments.length > 2;
            if (null == a && (a = []), n && a.reduce === n) return d && (b = x.bind(b, d)), e ? a.reduce(b, c) : a.reduce(b);
            if (y(a, function(a, f, g) { e ? c = b.call(d, c, a, f, g) : (c = a, e = !0) }), !e) throw new TypeError(z);
            return c }, x.reduceRight = x.foldr = function(a, b, c, d) {
            var e = arguments.length > 2;
            if (null == a && (a = []), o && a.reduceRight === o) return d && (b = x.bind(b, d)), e ? a.reduceRight(b, c) : a.reduceRight(b);
            var f = a.length;
            if (f !== +f) {
                var g = x.keys(a);
                f = g.length }
            if (y(a, function(h, i, j) { i = g ? g[--f] : --f, e ? c = b.call(d, c, a[i], i, j) : (c = a[i], e = !0) }), !e) throw new TypeError(z);
            return c }, x.find = x.detect = function(a, b, c) {
            var d;
            return A(a, function(a, e, f) {
                return b.call(c, a, e, f) ? (d = a, !0) : void 0 }), d }, x.filter = x.select = function(a, b, c) {
            var d = [];
            return null == a ? d : p && a.filter === p ? a.filter(b, c) : (y(a, function(a, e, f) { b.call(c, a, e, f) && (d[d.length] = a) }), d) }, x.reject = function(a, b, c) {
            return x.filter(a, function(a, d, e) {
                return !b.call(c, a, d, e) }, c) }, x.every = x.all = function(a, b, d) { b || (b = x.identity);
            var e = !0;
            return null == a ? e : q && a.every === q ? a.every(b, d) : (y(a, function(a, f, g) {
                return (e = e && b.call(d, a, f, g)) ? void 0 : c }), !!e) };
        var A = x.some = x.any = function(a, b, d) { b || (b = x.identity);
            var e = !1;
            return null == a ? e : r && a.some === r ? a.some(b, d) : (y(a, function(a, f, g) {
                return e || (e = b.call(d, a, f, g)) ? c : void 0 }), !!e) };
        x.contains = x.include = function(a, b) {
            return null == a ? !1 : s && a.indexOf === s ? -1 != a.indexOf(b) : A(a, function(a) {
                return a === b }) }, x.invoke = function(a, b) {
            var c = h.call(arguments, 2),
                d = x.isFunction(b);
            return x.map(a, function(a) {
                return (d ? b : a[b]).apply(a, c) }) }, x.pluck = function(a, b) {
            return x.map(a, function(a) {
                return a[b] }) }, x.where = function(a, b, c) {
            return x.isEmpty(b) ? c ? null : [] : x[c ? "find" : "filter"](a, function(a) {
                for (var c in b)
                    if (b[c] !== a[c]) return !1;
                return !0 }) }, x.findWhere = function(a, b) {
            return x.where(a, b, !0) }, x.max = function(a, b, c) {
            if (!b && x.isArray(a) && a[0] === +a[0] && 65535 > a.length) return Math.max.apply(Math, a);
            if (!b && x.isEmpty(a)) return -1 / 0;
            var d = { computed: -1 / 0, value: -1 / 0 };
            return y(a, function(a, e, f) {
                var g = b ? b.call(c, a, e, f) : a;
                g >= d.computed && (d = { value: a, computed: g }) }), d.value }, x.min = function(a, b, c) {
            if (!b && x.isArray(a) && a[0] === +a[0] && 65535 > a.length) return Math.min.apply(Math, a);
            if (!b && x.isEmpty(a)) return 1 / 0;
            var d = { computed: 1 / 0, value: 1 / 0 };
            return y(a, function(a, e, f) {
                var g = b ? b.call(c, a, e, f) : a;
                d.computed > g && (d = { value: a, computed: g }) }), d.value }, x.shuffle = function(a) {
            var b, c = 0,
                d = [];
            return y(a, function(a) { b = x.random(c++), d[c - 1] = d[b], d[b] = a }), d };
        var B = function(a) {
            return x.isFunction(a) ? a : function(b) {
                return b[a] } };
        x.sortBy = function(a, b, c) {
            var d = B(b);
            return x.pluck(x.map(a, function(a, b, e) {
                return { value: a, index: b, criteria: d.call(c, a, b, e) } }).sort(function(a, b) {
                var c = a.criteria,
                    d = b.criteria;
                if (c !== d) {
                    if (c > d || void 0 === c) return 1;
                    if (d > c || void 0 === d) return -1 }
                return a.index < b.index ? -1 : 1 }), "value") };
        var C = function(a, b, c, d) {
            var e = {},
                f = B(b || x.identity);
            return y(a, function(b, g) {
                var h = f.call(c, b, g, a);
                d(e, h, b) }), e };
        x.groupBy = function(a, b, c) {
            return C(a, b, c, function(a, b, c) {
                (x.has(a, b) ? a[b] : a[b] = []).push(c) }) }, x.countBy = function(a, b, c) {
            return C(a, b, c, function(a, b) { x.has(a, b) || (a[b] = 0), a[b]++ }) }, x.sortedIndex = function(a, b, c, d) { c = null == c ? x.identity : B(c);
            for (var e = c.call(d, b), f = 0, g = a.length; g > f;) {
                var h = f + g >>> 1;
                e > c.call(d, a[h]) ? f = h + 1 : g = h }
            return f }, x.toArray = function(a) {
            return a ? x.isArray(a) ? h.call(a) : a.length === +a.length ? x.map(a, x.identity) : x.values(a) : [] }, x.size = function(a) {
            return null == a ? 0 : a.length === +a.length ? a.length : x.keys(a).length }, x.first = x.head = x.take = function(a, b, c) {
            return null == a ? void 0 : null == b || c ? a[0] : h.call(a, 0, b) }, x.initial = function(a, b, c) {
            return h.call(a, 0, a.length - (null == b || c ? 1 : b)) }, x.last = function(a, b, c) {
            return null == a ? void 0 : null == b || c ? a[a.length - 1] : h.call(a, Math.max(a.length - b, 0)) }, x.rest = x.tail = x.drop = function(a, b, c) {
            return h.call(a, null == b || c ? 1 : b) }, x.compact = function(a) {
            return x.filter(a, x.identity) };
        var D = function(a, b, c) {
            return y(a, function(a) { x.isArray(a) ? b ? g.apply(c, a) : D(a, b, c) : c.push(a) }), c };
        x.flatten = function(a, b) {
            return D(a, b, []) }, x.without = function(a) {
            return x.difference(a, h.call(arguments, 1)) }, x.uniq = x.unique = function(a, b, c, d) { x.isFunction(b) && (d = c, c = b, b = !1);
            var e = c ? x.map(a, c, d) : a,
                f = [],
                g = [];
            return y(e, function(c, d) {
                (b ? d && g[g.length - 1] === c : x.contains(g, c)) || (g.push(c), f.push(a[d])) }), f }, x.union = function() {
            return x.uniq(i.apply(d, arguments)) }, x.intersection = function(a) {
            var b = h.call(arguments, 1);
            return x.filter(x.uniq(a), function(a) {
                return x.every(b, function(b) {
                    return x.indexOf(b, a) >= 0 }) }) }, x.difference = function(a) {
            var b = i.apply(d, h.call(arguments, 1));
            return x.filter(a, function(a) {
                return !x.contains(b, a) }) }, x.zip = function() {
            for (var a = h.call(arguments), b = x.max(x.pluck(a, "length")), c = Array(b), d = 0; b > d; d++) c[d] = x.pluck(a, "" + d);
            return c }, x.object = function(a, b) {
            if (null == a) return {};
            for (var c = {}, d = 0, e = a.length; e > d; d++) b ? c[a[d]] = b[d] : c[a[d][0]] = a[d][1];
            return c }, x.indexOf = function(a, b, c) {
            if (null == a) return -1;
            var d = 0,
                e = a.length;
            if (c) {
                if ("number" != typeof c) return d = x.sortedIndex(a, b), a[d] === b ? d : -1;
                d = 0 > c ? Math.max(0, e + c) : c }
            if (s && a.indexOf === s) return a.indexOf(b, c);
            for (; e > d; d++)
                if (a[d] === b) return d;
            return -1 }, x.lastIndexOf = function(a, b, c) {
            if (null == a) return -1;
            var d = null != c;
            if (t && a.lastIndexOf === t) return d ? a.lastIndexOf(b, c) : a.lastIndexOf(b);
            for (var e = d ? c : a.length; e--;)
                if (a[e] === b) return e;
            return -1 }, x.range = function(a, b, c) { 1 >= arguments.length && (b = a || 0, a = 0), c = arguments[2] || 1;
            for (var d = Math.max(Math.ceil((b - a) / c), 0), e = 0, f = Array(d); d > e;) f[e++] = a, a += c;
            return f }, x.bind = function(a, b) {
            if (a.bind === w && w) return w.apply(a, h.call(arguments, 1));
            var c = h.call(arguments, 2);
            return function() {
                return a.apply(b, c.concat(h.call(arguments))) } }, x.partial = function(a) {
            var b = h.call(arguments, 1);
            return function() {
                return a.apply(this, b.concat(h.call(arguments))) } }, x.bindAll = function(a) {
            var b = h.call(arguments, 1);
            return 0 === b.length && (b = x.functions(a)), y(b, function(b) { a[b] = x.bind(a[b], a) }), a }, x.memoize = function(a, b) {
            var c = {};
            return b || (b = x.identity),
                function() {
                    var d = b.apply(this, arguments);
                    return x.has(c, d) ? c[d] : c[d] = a.apply(this, arguments) } }, x.delay = function(a, b) {
            var c = h.call(arguments, 2);
            return setTimeout(function() {
                return a.apply(null, c) }, b) }, x.defer = function(a) {
            return x.delay.apply(x, [a, 1].concat(h.call(arguments, 1))) }, x.throttle = function(a, b) {
            var c, d, e, f, g = 0,
                h = function() { g = new Date, e = null, f = a.apply(c, d) };
            return function() {
                var i = new Date,
                    j = b - (i - g);
                return c = this, d = arguments, 0 >= j ? (clearTimeout(e), e = null, g = i, f = a.apply(c, d)) : e || (e = setTimeout(h, j)), f } }, x.debounce = function(a, b, c) {
            var d, e;
            return function() {
                var f = this,
                    g = arguments,
                    h = function() { d = null, c || (e = a.apply(f, g)) },
                    i = c && !d;
                return clearTimeout(d), d = setTimeout(h, b), i && (e = a.apply(f, g)), e } }, x.once = function(a) {
            var b, c = !1;
            return function() {
                return c ? b : (c = !0, b = a.apply(this, arguments), a = null, b) } }, x.wrap = function(a, b) {
            return function() {
                var c = [a];
                return g.apply(c, arguments), b.apply(this, c) } }, x.compose = function() {
            var a = arguments;
            return function() {
                for (var b = arguments, c = a.length - 1; c >= 0; c--) b = [a[c].apply(this, b)];
                return b[0] } }, x.after = function(a, b) {
            return 0 >= a ? b() : function() {
                return 1 > --a ? b.apply(this, arguments) : void 0 } }, x.keys = v || function(a) {
            if (a !== Object(a)) throw new TypeError("Invalid object");
            var b = [];
            for (var c in a) x.has(a, c) && (b[b.length] = c);
            return b }, x.values = function(a) {
            var b = [];
            for (var c in a) x.has(a, c) && b.push(a[c]);
            return b }, x.pairs = function(a) {
            var b = [];
            for (var c in a) x.has(a, c) && b.push([c, a[c]]);
            return b }, x.invert = function(a) {
            var b = {};
            for (var c in a) x.has(a, c) && (b[a[c]] = c);
            return b }, x.functions = x.methods = function(a) {
            var b = [];
            for (var c in a) x.isFunction(a[c]) && b.push(c);
            return b.sort() }, x.extend = function(a) {
            return y(h.call(arguments, 1), function(b) {
                if (b)
                    for (var c in b) a[c] = b[c] }), a }, x.pick = function(a) {
            var b = {},
                c = i.apply(d, h.call(arguments, 1));
            return y(c, function(c) { c in a && (b[c] = a[c]) }), b }, x.omit = function(a) {
            var b = {},
                c = i.apply(d, h.call(arguments, 1));
            for (var e in a) x.contains(c, e) || (b[e] = a[e]);
            return b }, x.defaults = function(a) {
            return y(h.call(arguments, 1), function(b) {
                if (b)
                    for (var c in b) null == a[c] && (a[c] = b[c]) }), a }, x.clone = function(a) {
            return x.isObject(a) ? x.isArray(a) ? a.slice() : x.extend({}, a) : a }, x.tap = function(a, b) {
            return b(a), a };
        var E = function(a, b, c, d) {
            if (a === b) return 0 !== a || 1 / a == 1 / b;
            if (null == a || null == b) return a === b;
            a instanceof x && (a = a._wrapped), b instanceof x && (b = b._wrapped);
            var e = j.call(a);
            if (e != j.call(b)) return !1;
            switch (e) {
                case "[object String]":
                    return a == b + "";
                case "[object Number]":
                    return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
                case "[object Date]":
                case "[object Boolean]":
                    return +a == +b;
                case "[object RegExp]":
                    return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase }
            if ("object" != typeof a || "object" != typeof b) return !1;
            for (var f = c.length; f--;)
                if (c[f] == a) return d[f] == b;
            c.push(a), d.push(b);
            var g = 0,
                h = !0;
            if ("[object Array]" == e) {
                if (g = a.length, h = g == b.length)
                    for (; g-- && (h = E(a[g], b[g], c, d));); } else {
                var i = a.constructor,
                    k = b.constructor;
                if (i !== k && !(x.isFunction(i) && i instanceof i && x.isFunction(k) && k instanceof k)) return !1;
                for (var l in a)
                    if (x.has(a, l) && (g++, !(h = x.has(b, l) && E(a[l], b[l], c, d)))) break;
                if (h) {
                    for (l in b)
                        if (x.has(b, l) && !g--) break;
                    h = !g } }
            return c.pop(), d.pop(), h };
        x.isEqual = function(a, b) {
            return E(a, b, [], []) }, x.isEmpty = function(a) {
            if (null == a) return !0;
            if (x.isArray(a) || x.isString(a)) return 0 === a.length;
            for (var b in a)
                if (x.has(a, b)) return !1;
            return !0 }, x.isElement = function(a) {
            return !(!a || 1 !== a.nodeType) }, x.isArray = u || function(a) {
            return "[object Array]" == j.call(a) }, x.isObject = function(a) {
            return a === Object(a) }, y(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(a) { x["is" + a] = function(b) {
                return j.call(b) == "[object " + a + "]" } }), x.isArguments(arguments) || (x.isArguments = function(a) {
            return !(!a || !x.has(a, "callee")) }), "function" != typeof /./ && (x.isFunction = function(a) {
            return "function" == typeof a }), x.isFinite = function(a) {
            return isFinite(a) && !isNaN(parseFloat(a)) }, x.isNaN = function(a) {
            return x.isNumber(a) && a != +a }, x.isBoolean = function(a) {
            return a === !0 || a === !1 || "[object Boolean]" == j.call(a) }, x.isNull = function(a) {
            return null === a }, x.isUndefined = function(a) {
            return void 0 === a }, x.has = function(a, b) {
            return k.call(a, b) }, x.noConflict = function() {
            return a._ = b, this }, x.identity = function(a) {
            return a }, x.times = function(a, b, c) {
            for (var d = Array(a), e = 0; a > e; e++) d[e] = b.call(c, e);
            return d }, x.random = function(a, b) {
            return null == b && (b = a, a = 0), a + Math.floor(Math.random() * (b - a + 1)) };
        var F = { escape: { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "/": "&#x2F;" } };
        F.unescape = x.invert(F.escape);
        var G = { escape: RegExp("[" + x.keys(F.escape).join("") + "]", "g"), unescape: RegExp("(" + x.keys(F.unescape).join("|") + ")", "g") };
        x.each(["escape", "unescape"], function(a) { x[a] = function(b) {
                return null == b ? "" : ("" + b).replace(G[a], function(b) {
                    return F[a][b] }) } }), x.result = function(a, b) {
            if (null == a) return null;
            var c = a[b];
            return x.isFunction(c) ? c.call(a) : c }, x.mixin = function(a) { y(x.functions(a), function(b) {
                var c = x[b] = a[b];
                x.prototype[b] = function() {
                    var a = [this._wrapped];
                    return g.apply(a, arguments), L.call(this, c.apply(x, a)) } }) };
        var H = 0;
        x.uniqueId = function(a) {
            var b = ++H + "";
            return a ? a + b : b }, x.templateSettings = { evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g };
        var I = /(.)^/,
            J = { "'": "'", "\\": "\\", "\r": "r", "\n": "n", " ": "t", "\u2028": "u2028", "\u2029": "u2029" },
            K = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        x.template = function(a, b, c) {
            var d;
            c = x.defaults({}, c, x.templateSettings);
            var e = RegExp([(c.escape || I).source, (c.interpolate || I).source, (c.evaluate || I).source].join("|") + "|$", "g"),
                f = 0,
                g = "__p+='";
            a.replace(e, function(b, c, d, e, h) {
                return g += a.slice(f, h).replace(K, function(a) {
                    return "\\" + J[a] }), c && (g += "'+\n((__t=(" + c + "))==null?'':_.escape(__t))+\n'"), d && (g += "'+\n((__t=(" + d + "))==null?'':__t)+\n'"), e && (g += "';\n" + e + "\n__p+='"), f = h + b.length, b }), g += "';\n", c.variable || (g = "with(obj||{}){\n" + g + "}\n"), g = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + g + "return __p;\n";
            try { d = Function(c.variable || "obj", "_", g) } catch (h) {
                throw h.source = g, h }
            if (b) return d(b, x);
            var i = function(a) {
                return d.call(this, a, x) };
            return i.source = "function(" + (c.variable || "obj") + "){\n" + g + "}", i }, x.chain = function(a) {
            return x(a).chain() };
        var L = function(a) {
            return this._chain ? x(a).chain() : a };
        x.mixin(x), y(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(a) {
            var b = d[a];
            x.prototype[a] = function() {
                var c = this._wrapped;
                return b.apply(c, arguments), "shift" != a && "splice" != a || 0 !== c.length || delete c[0], L.call(this, c) } }), y(["concat", "join", "slice"], function(a) {
            var b = d[a];
            x.prototype[a] = function() {
                return L.call(this, b.apply(this._wrapped, arguments)) } }), x.extend(x.prototype, { chain: function() {
                return this._chain = !0, this }, value: function() {
                return this._wrapped } }) }).call(this);
    var _ = this._;
    _.noConflict(),
        function(a, b) { "object" == typeof exports && exports ? b(exports) : "function" == typeof define && define.amd ? define(["exports"], b) : b(a.Mustache = {}) }(this, function(a) {
            function b(a) {
                return "function" == typeof a }

            function c(a) {
                return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&") }

            function d(a, b) {
                return o.call(a, b) }

            function e(a) {
                return !d(p, a) }

            function f(a) {
                return String(a).replace(/[&<>"'\/]/g, function(a) {
                    return q[a] }) }

            function g(b, d) {
                function f() {
                    if (w && !x)
                        for (; q.length;) delete p[q.pop()];
                    else q = [];
                    w = !1, x = !1 }

                function g(a) {
                    if ("string" == typeof a && (a = a.split(s, 2)), !n(a) || 2 !== a.length) throw new Error("Invalid tags: " + a);
                    k = new RegExp(c(a[0]) + "\\s*"), l = new RegExp("\\s*" + c(a[1])), m = new RegExp("\\s*" + c("}" + a[1])) }
                if (!b) return [];
                var k, l, m, o = [],
                    p = [],
                    q = [],
                    w = !1,
                    x = !1;
                g(d || a.tags);
                for (var y, z, A, B, C, D, E = new j(b); !E.eos();) {
                    if (y = E.pos, A = E.scanUntil(k))
                        for (var F = 0, G = A.length; G > F; ++F) B = A.charAt(F), e(B) ? q.push(p.length) : x = !0, p.push(["text", B, y, y + 1]), y += 1, "\n" === B && f();
                    if (!E.scan(k)) break;
                    if (w = !0, z = E.scan(v) || "name", E.scan(r), "=" === z ? (A = E.scanUntil(t), E.scan(t), E.scanUntil(l)) : "{" === z ? (A = E.scanUntil(m), E.scan(u), E.scanUntil(l), z = "&") : A = E.scanUntil(l), !E.scan(l)) throw new Error("Unclosed tag at " + E.pos);
                    if (C = [z, A, y, E.pos], p.push(C), "#" === z || "^" === z) o.push(C);
                    else if ("/" === z) {
                        if (D = o.pop(), !D) throw new Error('Unopened section "' + A + '" at ' + y);
                        if (D[1] !== A) throw new Error('Unclosed section "' + D[1] + '" at ' + y) } else "name" === z || "{" === z || "&" === z ? x = !0 : "=" === z && g(A) }
                if (D = o.pop()) throw new Error('Unclosed section "' + D[1] + '" at ' + E.pos);
                return i(h(p)) }

            function h(a) {
                for (var b, c, d = [], e = 0, f = a.length; f > e; ++e) b = a[e], b && ("text" === b[0] && c && "text" === c[0] ? (c[1] += b[1], c[3] = b[3]) : (d.push(b), c = b));
                return d }

            function i(a) {
                for (var b, c, d = [], e = d, f = [], g = 0, h = a.length; h > g; ++g) switch (b = a[g], b[0]) {
                    case "#":
                    case "^":
                        e.push(b), f.push(b), e = b[4] = [];
                        break;
                    case "/":
                        c = f.pop(), c[5] = b[2], e = f.length > 0 ? f[f.length - 1][4] : d;
                        break;
                    default:
                        e.push(b) }
                return d }

            function j(a) { this.string = a, this.tail = a, this.pos = 0 }

            function k(a, b) { this.view = null == a ? {} : a, this.cache = { ".": this.view }, this.parent = b }

            function l() { this.cache = {} }
            var m = Object.prototype.toString,
                n = Array.isArray || function(a) {
                    return "[object Array]" === m.call(a) },
                o = RegExp.prototype.test,
                p = /\S/,
                q = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;" },
                r = /\s*/,
                s = /\s+/,
                t = /\s*=/,
                u = /\s*\}/,
                v = /#|\^|\/|>|\{|&|=|!/;
            j.prototype.eos = function() {
                return "" === this.tail }, j.prototype.scan = function(a) {
                var b = this.tail.match(a);
                if (!b || 0 !== b.index) return "";
                var c = b[0];
                return this.tail = this.tail.substring(c.length), this.pos += c.length, c }, j.prototype.scanUntil = function(a) {
                var b, c = this.tail.search(a);
                switch (c) {
                    case -1:
                        b = this.tail, this.tail = "";
                        break;
                    case 0:
                        b = "";
                        break;
                    default:
                        b = this.tail.substring(0, c), this.tail = this.tail.substring(c) }
                return this.pos += b.length, b }, k.prototype.push = function(a) {
                return new k(a, this) }, k.prototype.lookup = function(a) {
                var c, d = this.cache;
                if (a in d) c = d[a];
                else {
                    for (var e, f, g = this; g;) {
                        if (a.indexOf(".") > 0)
                            for (c = g.view, e = a.split("."), f = 0; null != c && f < e.length;) c = c[e[f++]];
                        else "object" == typeof g.view && (c = g.view[a]);
                        if (null != c) break;
                        g = g.parent }
                    d[a] = c }
                return b(c) && (c = c.call(this.view)), c }, l.prototype.clearCache = function() { this.cache = {} }, l.prototype.parse = function(a, b) {
                var c = this.cache,
                    d = c[a];
                return null == d && (d = c[a] = g(a, b)), d }, l.prototype.render = function(a, b, c) {
                var d = this.parse(a),
                    e = b instanceof k ? b : new k(b);
                return this.renderTokens(d, e, c, a) }, l.prototype.renderTokens = function(a, b, c, d) {
                for (var e, f, g, h = "", i = 0, j = a.length; j > i; ++i) g = void 0, e = a[i], f = e[0], "#" === f ? g = this._renderSection(e, b, c, d) : "^" === f ? g = this._renderInverted(e, b, c, d) : ">" === f ? g = this._renderPartial(e, b, c, d) : "&" === f ? g = this._unescapedValue(e, b) : "name" === f ? g = this._escapedValue(e, b) : "text" === f && (g = this._rawValue(e)), void 0 !== g && (h += g);
                return h }, l.prototype._renderSection = function(a, c, d, e) {
                function f(a) {
                    return g.render(a, c, d) }
                var g = this,
                    h = "",
                    i = c.lookup(a[1]);
                if (i) {
                    if (n(i))
                        for (var j = 0, k = i.length; k > j; ++j) h += this.renderTokens(a[4], c.push(i[j]), d, e);
                    else if ("object" == typeof i || "string" == typeof i) h += this.renderTokens(a[4], c.push(i), d, e);
                    else if (b(i)) {
                        if ("string" != typeof e) throw new Error("Cannot use higher-order sections without the original template");
                        i = i.call(c.view, e.slice(a[3], a[5]), f), null != i && (h += i) } else h += this.renderTokens(a[4], c, d, e);
                    return h } }, l.prototype._renderInverted = function(a, b, c, d) {
                var e = b.lookup(a[1]);
                return !e || n(e) && 0 === e.length ? this.renderTokens(a[4], b, c, d) : void 0 }, l.prototype._renderPartial = function(a, c, d) {
                if (d) {
                    var e = b(d) ? d(a[1]) : d[a[1]];
                    return null != e ? this.renderTokens(this.parse(e), c, d, e) : void 0 } }, l.prototype._unescapedValue = function(a, b) {
                var c = b.lookup(a[1]);
                return null != c ? c : void 0 }, l.prototype._escapedValue = function(b, c) {
                var d = c.lookup(b[1]);
                return null != d ? a.escape(d) : void 0 }, l.prototype._rawValue = function(a) {
                return a[1] }, a.name = "mustache.js", a.version = "1.1.0", a.tags = ["{{", "}}"];
            var w = new l;
            a.clearCache = function() {
                return w.clearCache() }, a.parse = function(a, b) {
                return w.parse(a, b) }, a.render = function(a, b, c) {
                return w.render(a, b, c) }, a.to_html = function(c, d, e, f) {
                var g = a.render(c, d, e);
                return b(f) ? void f(g) : g }, a.escape = f, a.Scanner = j, a.Context = k, a.Writer = l }),
        function(a, b, c) { "undefined" != typeof module && module.exports ? module.exports = c() : "function" == typeof define && define.amd ? define(c) : b[a] = c() }("reqwest", this, function() {
            function handleReadyState(a, b, c) {
                return function() {
                    return a._aborted ? c(a.request) : void(a.request && 4 == a.request[readyState] && (a.request.onreadystatechange = noop, twoHundo.test(a.request.status) ? b(a.request) : c(a.request))) } }

            function setHeaders(a, b) {
                var c, d = b.headers || {};
                d.Accept = d.Accept || defaultHeaders.accept[b.type] || defaultHeaders.accept["*"], b.crossOrigin || d[requestedWith] || (d[requestedWith] = defaultHeaders.requestedWith), d[contentType] || (d[contentType] = b.contentType || defaultHeaders.contentType);
                for (c in d) d.hasOwnProperty(c) && a.setRequestHeader(c, d[c]) }

            function setCredentials(a, b) { "undefined" != typeof b.withCredentials && "undefined" != typeof a.withCredentials && (a.withCredentials = !!b.withCredentials) }

            function generalCallback(a) { lastValue = a }

            function urlappend(a, b) {
                return a + (/\?/.test(a) ? "&" : "?") + b }

            function handleJsonp(a, b, c, d) {
                var e = uniqid++,
                    f = a.jsonpCallback || "callback",
                    g = a.jsonpCallbackName || reqwest.getcallbackPrefix(e),
                    h = new RegExp("((^|\\?|&)" + f + ")=([^&]+)"),
                    i = d.match(h),
                    j = doc.createElement("script"),
                    k = 0,
                    l = -1 !== navigator.userAgent.indexOf("MSIE 10.0"),
                    m = -1 !== navigator.userAgent.indexOf("MSIE 9.0");
                return i ? "?" === i[3] ? d = d.replace(h, "$1=" + g) : g = i[3] : d = urlappend(d, f + "=" + g), win[g] = generalCallback, j.type = "text/javascript", j.src = d, j.async = !0, "undefined" == typeof j.onreadystatechange || l || m || (j.event = "onclick", j.htmlFor = j.id = "_reqwest_" + e), j.onload = j.onreadystatechange = function() {
                    return j[readyState] && "complete" !== j[readyState] && "loaded" !== j[readyState] || k ? !1 : (j.onload = j.onreadystatechange = null, j.onclick && j.onclick(), a.success && a.success(lastValue), lastValue = void 0, head.removeChild(j), void(k = 1)) }, head.appendChild(j), { abort: function() { j.onload = j.onreadystatechange = null, a.error && a.error({}, "Request is aborted: timeout", {}), lastValue = void 0, head.removeChild(j), k = 1 } } }

            function getRequest(a, b) {
                var c, d = this.o,
                    e = (d.method || "GET").toUpperCase(),
                    f = "string" == typeof d ? d : d.url,
                    g = d.processData !== !1 && d.data && "string" != typeof d.data ? reqwest.toQueryString(d.data) : d.data || null;
                return "jsonp" != d.type && "GET" != e || !g || (f = urlappend(f, g), g = null), "jsonp" == d.type ? handleJsonp(d, a, b, f) : (c = xhr(), c.open(e, f, !0), setHeaders(c, d), setCredentials(c, d), c.onreadystatechange = handleReadyState(this, a, b), d.before && d.before(c), c.send(g), c) }

            function Reqwest(a, b) { this.o = a, this.fn = b, init.apply(this, arguments) }

            function setType(a) {
                var b = a.match(/\.(json|jsonp|html|xml)(\?|$)/);
                return b ? b[1] : "js" }

            function init(o, fn) {
                function complete(a) {
                    for (o.timeout && clearTimeout(self.timeout), self.timeout = null; self._completeHandlers.length > 0;) self._completeHandlers.shift()(a) }

                function success(resp) {
                    var r = resp.responseText;
                    if (r) switch (type) {
                        case "json":
                            try { resp = win.JSON ? win.JSON.parse(r) : eval("(" + r + ")") } catch (err) {
                                return error(resp, "Could not parse JSON in response", err) }
                            break;
                        case "js":
                            resp = eval(r);
                            break;
                        case "html":
                            resp = r;
                            break;
                        case "xml":
                            resp = resp.responseXML && resp.responseXML.parseError && resp.responseXML.parseError.errorCode && resp.responseXML.parseError.reason ? null : resp.responseXML }
                    for (self._responseArgs.resp = resp, self._fulfilled = !0, fn(resp); self._fulfillmentHandlers.length > 0;) self._fulfillmentHandlers.shift()(resp);
                    complete(resp) }

                function error(a, b, c) {
                    for (self._responseArgs.resp = a, self._responseArgs.msg = b, self._responseArgs.t = c, self._erred = !0; self._errorHandlers.length > 0;) self._errorHandlers.shift()(a, b, c);
                    complete(a) }
                this.url = "string" == typeof o ? o : o.url, this.timeout = null, this._fulfilled = !1, this._fulfillmentHandlers = [], this._errorHandlers = [], this._completeHandlers = [], this._erred = !1, this._responseArgs = {};
                var self = this,
                    type = o.type || setType(this.url);
                fn = fn || function() {}, o.timeout && (this.timeout = setTimeout(function() { self.abort() }, o.timeout)), o.success && this._fulfillmentHandlers.push(function() { o.success.apply(o, arguments) }), o.error && this._errorHandlers.push(function() { o.error.apply(o, arguments) }), o.complete && this._completeHandlers.push(function() { o.complete.apply(o, arguments) }), this.request = getRequest.call(this, success, error) }

            function reqwest(a, b) {
                return new Reqwest(a, b) }

            function normalize(a) {
                return a ? a.replace(/\r?\n/g, "\r\n") : "" }

            function serial(a, b) {
                var c, d, e, f, g = a.name,
                    h = a.tagName.toLowerCase(),
                    i = function(a) { a && !a.disabled && b(g, normalize(a.attributes.value && a.attributes.value.specified ? a.value : a.text)) };
                if (!a.disabled && g) switch (h) {
                    case "input":
                        /reset|button|image|file/i.test(a.type) || (c = /checkbox/i.test(a.type), d = /radio/i.test(a.type), e = a.value, (!(c || d) || a.checked) && b(g, normalize(c && "" === e ? "on" : e)));
                        break;
                    case "textarea":
                        b(g, normalize(a.value));
                        break;
                    case "select":
                        if ("select-one" === a.type.toLowerCase()) i(a.selectedIndex >= 0 ? a.options[a.selectedIndex] : null);
                        else
                            for (f = 0; a.length && f < a.length; f++) a.options[f].selected && i(a.options[f]) } }

            function eachFormElement() {
                var a, b, c = this,
                    d = function(a, b) {
                        var d, e, f;
                        for (d = 0; d < b.length; d++)
                            for (f = a[byTag](b[d]), e = 0; e < f.length; e++) serial(f[e], c) };
                for (b = 0; b < arguments.length; b++) a = arguments[b], /input|select|textarea/i.test(a.tagName) && serial(a, c), d(a, ["input", "select", "textarea"]) }

            function serializeQueryString() {
                return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments)) }

            function serializeHash() {
                var a = {};
                return eachFormElement.apply(function(b, c) { b in a ? (a[b] && !isArray(a[b]) && (a[b] = [a[b]]), a[b].push(c)) : a[b] = c }, arguments), a }

            function getValue(a) {
                return "function" == typeof a ? a() : a }
            var win = window,
                doc = document,
                twoHundo = /^20\d$/,
                byTag = "getElementsByTagName",
                readyState = "readyState",
                contentType = "Content-Type",
                requestedWith = "X-Requested-With",
                head = doc[byTag]("head")[0],
                uniqid = 0,
                callbackPrefix = "reqwest_" + +new Date,
                lastValue, xmlHttpRequest = "XMLHttpRequest",
                noop = function() {},
                isArray = "function" == typeof Array.isArray ? Array.isArray : function(a) {
                    return a instanceof Array },
                defaultHeaders = { contentType: "application/x-www-form-urlencoded", requestedWith: xmlHttpRequest, accept: { "*": "text/javascript, text/html, application/xml, text/xml, */*", xml: "application/xml, text/xml", html: "text/html", text: "text/plain", json: "application/json, text/javascript", js: "application/javascript, text/javascript" } },
                xhr = win[xmlHttpRequest] ? function() {
                    return new XMLHttpRequest } : function() {
                    return new ActiveXObject("Microsoft.XMLHTTP") };
            return Reqwest.prototype = { abort: function() { this._aborted = !0, this.request.abort() }, retry: function() { init.call(this, this.o, this.fn) }, then: function(a, b) {
                    return this._fulfilled ? a(this._responseArgs.resp) : this._erred ? b(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t) : (this._fulfillmentHandlers.push(a), this._errorHandlers.push(b)), this }, always: function(a) {
                    return this._fulfilled || this._erred ? a(this._responseArgs.resp) : this._completeHandlers.push(a), this }, fail: function(a) {
                    return this._erred ? a(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t) : this._errorHandlers.push(a), this } }, reqwest.serializeArray = function() {
                var a = [];
                return eachFormElement.apply(function(b, c) { a.push({ name: b, value: c }) }, arguments), a }, reqwest.serialize = function() {
                if (0 === arguments.length) return "";
                var a, b, c = Array.prototype.slice.call(arguments, 0);
                return a = c.pop(), a && a.nodeType && c.push(a) && (a = null), a && (a = a.type), b = "map" == a ? serializeHash : "array" == a ? reqwest.serializeArray : serializeQueryString, b.apply(null, c) }, reqwest.toQueryString = function(a) {
                var b, c, d, e = "",
                    f = encodeURIComponent,
                    g = function(a, b) { e += f(a) + "=" + f(b) + "&" };
                if (isArray(a))
                    for (b = 0; a && b < a.length; b++) g(a[b].name, a[b].value);
                else
                    for (c in a)
                        if (Object.hasOwnProperty.call(a, c))
                            if (d = a[c], isArray(d))
                                for (b = 0; b < d.length; b++) g(c, d[b]);
                            else g(c, a[c]); return e.replace(/&$/, "").replace(/%20/g, "+") }, reqwest.getcallbackPrefix = function() {
                return callbackPrefix }, reqwest.compat = function(a, b) {
                return a && (a.type && (a.method = a.type) && delete a.type, a.dataType && (a.type = a.dataType), a.jsonpCallback && (a.jsonpCallbackName = getValue(a.jsonpCallback)) && delete a.jsonpCallback, a.jsonp && (a.jsonpCallback = a.jsonp)), new Reqwest(a, b) }, reqwest }),
        function() {
            var a = this,
                b = a.cdb = {};
            b.VERSION = "3.15.10", b.DEBUG = !1, b.CARTOCSS_VERSIONS = { "2.0.0": "", "2.1.0": "" }, b.CARTOCSS_DEFAULT_VERSION = "2.1.1", a.cdb.config = {}, a.cdb.core = {}, a.cdb.image = {}, a.cdb.geo = {}, a.cdb.geo.ui = {}, a.cdb.geo.geocoder = {}, a.cdb.ui = {}, a.cdb.ui.common = {}, a.cdb.vis = {}, a.cdb.decorators = {}, a.JST = a.JST || {}, a.cartodb = b, b.files = ["../vendor/jquery.min.js", "../vendor/underscore-min.js", "../vendor/json2.js", "../vendor/backbone.js", "../vendor/mustache.js", "../vendor/leaflet.js", "../vendor/wax.cartodb.js", "../vendor/GeoJSON.js", "../vendor/jscrollpane.js", "../vendor/mousewheel.js", "../vendor/mwheelIntent.js", "../vendor/spin.js", "../vendor/lzma.js", "../vendor/html-css-sanitizer-bundle.js", "core/sanitize.js", "core/decorator.js", "core/config.js", "core/log.js", "core/profiler.js", "core/template.js", "core/model.js", "core/view.js", "core/loader.js", "core/util.js", "geo/geocoder.js", "geo/geometry.js", "geo/map.js", "geo/ui/text.js", "geo/ui/annotation.js", "geo/ui/image.js", "geo/ui/share.js", "geo/ui/zoom.js", "geo/ui/zoom_info.js", "geo/ui/legend.js", "geo/ui/switcher.js", "geo/ui/infowindow.js", "geo/ui/header.js", "geo/ui/search.js", "geo/ui/layer_selector.js", "geo/ui/slides_controller.js", "geo/ui/mobile.js", "geo/ui/tiles_loader.js", "geo/ui/infobox.js", "geo/ui/tooltip.js", "geo/ui/fullscreen.js", "geo/sublayer.js", "geo/layer_definition.js", "geo/common.js", "geo/leaflet/leaflet_base.js", "geo/leaflet/leaflet_plainlayer.js", "geo/leaflet/leaflet_tiledlayer.js", "geo/leaflet/leaflet_gmaps_tiledlayer.js", "geo/leaflet/leaflet_wmslayer.js", "geo/leaflet/leaflet_cartodb_layergroup.js", "geo/leaflet/leaflet_cartodb_layer.js", "geo/leaflet/leaflet.geometry.js", "geo/leaflet/leaflet.js", "geo/gmaps/gmaps_base.js", "geo/gmaps/gmaps_baselayer.js", "geo/gmaps/gmaps_plainlayer.js", "geo/gmaps/gmaps_tiledlayer.js", "geo/gmaps/gmaps_cartodb_layergroup.js", "geo/gmaps/gmaps_cartodb_layer.js", "geo/gmaps/gmaps.geometry.js", "geo/gmaps/gmaps.js", "ui/common/dialog.js", "ui/common/share.js", "ui/common/notification.js", "ui/common/table.js", "ui/common/dropdown.js", "vis/vis.js", "vis/image.js", "vis/overlays.js", "vis/layers.js", "api/layers.js", "api/sql.js", "api/vis.js"], b.init = function(c) {
                var d = b.Class = function() {};
                _.extend(d.prototype, Backbone.Events), b._loadJST(), a.cdb.god = new Backbone.Model, c && c() }, b.load = function(a, c) {
                var d = 0,
                    e = function() {
                        var f = document.createElement("script");
                        f.src = a + b.files[d], document.body.appendChild(f), ++d, d == b.files.length ? c && (f.onload = c) : f.onload = e };
                e() } }(),
        function() {
            function a() {}
            var b = Array.prototype.slice,
                c = (Array.prototype.splice, /\s+/),
                d = Backbone.Events = { on: function(a, b, d) {
                        var e, f, g, h, i;
                        if (!b) return this;
                        for (a = a.split(c), e = this._callbacks || (this._callbacks = {}); f = a.shift();) i = e[f], g = i ? i.tail : {}, g.next = h = {}, g.context = d, g.callback = b, e[f] = { tail: h, next: i ? i.next : g };
                        return this }, off: function(a, b, d) {
                        var f, g, h, i, j, k;
                        if (g = this._callbacks) {
                            if (!(a || b || d)) return delete this._callbacks, this;
                            for (a = a ? a.split(c) : e.keys(g); f = a.shift();)
                                if (h = g[f], delete g[f], h && (b || d))
                                    for (i = h.tail;
                                        (h = h.next) !== i;) j = h.callback, k = h.context, (b && j !== b || d && k !== d) && this.on(f, j, k);
                            return this } }, trigger: function(a) {
                        var d, e, f, g, h, i, j;
                        if (!(f = this._callbacks)) return this;
                        for (i = f.all, a = a.split(c), j = b.call(arguments, 1); d = a.shift();) {
                            if (e = f[d])
                                for (g = e.tail;
                                    (e = e.next) !== g;) e.callback.apply(e.context || this, j);
                            if (e = i)
                                for (g = e.tail, h = [d].concat(j);
                                    (e = e.next) !== g;) e.callback.apply(e.context || this, h) }
                        return this } };
            if (d.bind = d.on, d.unbind = d.off, void 0 === cartodb._Promise && (a.prototype = d, a.prototype.done = function(a) {
                    return this.on("done", a) }, a.prototype.error = function(a) {
                    return this.on("error", a) }, cartodb._Promise = a), "undefined" == typeof e) var e = { extend: function(a, b) {
                    for (var c in b) a[c] = b[c];
                    return a }, defaults: function(a, b) {
                    for (var c in b) void 0 == a[c] && (a[c] = b[c]);
                    return a }, isFunction: function(a) {
                    return "function" == typeof a } } }(),
        function(a) {
            function b() {}

            function c(a) { this.t0 = null, this.name = a, this.count = 0 }
            var d = 1024;
            b.metrics = {}, b._backend = null, b.get = function(a) {
                return b.metrics[a] || {
                    max: 0,
                    min: Number.MAX_VALUE,
                    avg: 0,
                    total: 0,
                    count: 0,
                    last: 0,
                    history: "undefined" != typeof Float32Array ? new Float32Array(d) : []
                }
            }, b.backend = function(a) { b._backend = a }, b.new_value = function(a, c, e, f) { e = e || "i";
                var g = b.metrics[a] = b.get(a);
                if (g.max = Math.max(g.max, c), g.min = Math.min(g.min, c), g.total += c, ++g.count, g.avg = g.total / g.count, g.history[g.count % d] = c, f) {
                    var h = (new Date).getTime();
                    h - g.last > 1e3 && (b._backend && b._backend([e, a, g.avg]), g.last = h) } else b._backend && b._backend([e, a, c]) }, b.print_stats = function() {
                for (k in b.metrics) {
                    var a = b.metrics[k];
                    console.log(" === " + k + " === "), console.log(" max: " + a.max), console.log(" min: " + a.min), console.log(" avg: " + a.avg), console.log(" count: " + a.count), console.log(" total: " + a.total) } }, c.prototype = { start: function() {
                    return this.t0 = +new Date, this }, _elapsed: function() {
                    return +new Date - this.t0 }, end: function(a) { null !== this.t0 && (b.new_value(this.name, this._elapsed(), "t", a), this.t0 = null) }, inc: function(a) { a = void 0 === a ? 1 : a, b.new_value(this.name, a, "i") }, dec: function(a) { a = void 0 === a ? 1 : a, b.new_value(this.name, a, "d") }, mark: function() {
                    if (++this.count, null === this.t0) return void this.start();
                    var a = this._elapsed();
                    a > 1 && (b.new_value(this.name, this.count), this.count = 0, this.start()) } }, b.metric = function(a) {
                return new c(a) }, a.Profiler = b
        }(cdb.core), cdb.core.util = {}, cdb.core.util.isCORSSupported = function() {
            return "withCredentials" in new XMLHttpRequest }, cdb.core.util.array2hex = function(a) {
            for (var b = [], c = 0; c < a.length; ++c) b.push(String.fromCharCode(a[c] + 128));
            return cdb.core.util.btoa(b.join("")) }, cdb.core.util.btoa = function(a) {
            return "function" == typeof window.btoa ? cdb.core.util.encodeBase64Native(a) : cdb.core.util.encodeBase64(a) }, cdb.core.util.encodeBase64Native = function(a) {
            return btoa(a) }, cdb.core.util.encodeBase64 = function(a) {
            var b, c, d, e, f, g, h, i, j = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                k = 0,
                l = 0,
                m = "",
                n = [];
            if (!a) return a;
            do b = a.charCodeAt(k++), c = a.charCodeAt(k++), d = a.charCodeAt(k++), i = b << 16 | c << 8 | d, e = i >> 18 & 63, f = i >> 12 & 63, g = i >> 6 & 63, h = 63 & i, n[l++] = j.charAt(e) + j.charAt(f) + j.charAt(g) + j.charAt(h); while (k < a.length);
            m = n.join("");
            var o = a.length % 3;
            return (o ? m.slice(0, o - 3) : m) + "===".slice(o || 3) }, cdb.core.util.uniqueCallbackName = function(a) {
            return cdb.core.util._callback_c = cdb.core.util._callback_c || 0, ++cdb.core.util._callback_c, cdb.core.util.crc32(a) + "_" + cdb.core.util._callback_c }, cdb.core.util.crc32 = function(a) {
            for (var b = cdb.core.util._crcTable || (cdb.core.util._crcTable = cdb.core.util._makeCRCTable()), c = -1, d = 0, e = a.length; e > d; ++d) c = c >>> 8 ^ b[255 & (c ^ a.charCodeAt(d))];
            return (-1 ^ c) >>> 0 }, cdb.core.util._makeCRCTable = function() {
            for (var a, b = [], c = 0; 256 > c; ++c) { a = c;
                for (var d = 0; 8 > d; ++d) a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
                b[c] = a }
            return b }, cdb.core.util._inferBrowser = function(a) {
            function b() {
                var b = a.indexOf("MSIE "),
                    c = a.indexOf("Trident/");
                return b > -1 || c > -1 ? !0 : !1 }

            function c() {
                return document.compatMode ? window.XMLHttpRequest ? document.querySelector ? document.addEventListener ? window.atob ? document.all ? 10 : 11 : 9 : 8 : 7 : 6 : 5 }
            var d = {};
            return a = a || window.navigator.userAgent, b() ? d.ie = { version: c() } : a.indexOf("Edge/") > -1 ? d.edge = a : a.indexOf("Chrome") > -1 ? d.chrome = a : a.indexOf("Firefox") > -1 ? d.firefox = a : a.indexOf("Opera") > -1 ? d.opera = a : a.indexOf("Safari") > -1 && (d.safari = a), d }, cdb.core.util.browser = cdb.core.util._inferBrowser(),
        function() {
            function a(b) {
                if (cartodb === this || window === this) return new a(b);
                if (!b.user) throw new Error("user should be provided");
                var c = new String(window.location.protocol);
                if (c = c.slice(0, c.length - 1), "file" == c && (c = "https"), this.ajax = b.ajax || ("undefined" != typeof jQuery ? jQuery.ajax : reqwest), !this.ajax) throw new Error("jQuery or reqwest should be loaded");
                if (this.options = _.defaults(b, { version: "v2", protocol: c, jsonp: "undefined" != typeof jQuery ? !jQuery.support.cors : !1 }), !this.options.sql_api_template) {
                    var d = this.options,
                        e = null;
                    if (d && d.completeDomain) e = d.completeDomain;
                    else {
                        var f = d.host || "carto.com",
                            g = d.protocol || "https";
                        e = g + "://{user}." + f }
                    this.options.sql_api_template = e } }

            function b(a) {
                return JSON.parse(a.replace(/^{/, "[").replace(/}$/, "]")) }
            var c = this;
            c.cartodb = c.cartodb || {}, a.prototype._host = function() {
                var a = this.options;
                return a.sql_api_template.replace("{user}", a.user) + "/api/" + a.version + "/sql" }, a.prototype.execute = function(a, b, c, d) {
                var e = 1024,
                    f = new cartodb._Promise;
                if (!a) throw new TypeError("sql should not be null");
                var g = arguments,
                    h = g[g.length - 1];
                _.isFunction(h) && (d = h), c = _.defaults(c || {}, this.options);
                var i = { type: "get", dataType: "json", crossDomain: !0 };
                void 0 !== c.cache && (i.cache = c.cache), c.jsonp && (delete i.crossDomain, c.jsonpCallback && (i.jsonpCallback = c.jsonpCallback), i.dataType = "jsonp");
                var j = "156543.03515625",
                    k = "ST_MakeEnvelope(-20037508.5,-20037508.5,20037508.5,20037508.5,3857)";
                a = a.replace("!bbox!", k).replace("!pixel_width!", j).replace("!pixel_height!", j);
                var l = Mustache.render(a, b),
                    m = l.length < e,
                    n = ["format", "dp", "api_key"];
                if (c.extra_params && (n = n.concat(c.extra_params)), i.url = this._host(), m) {
                    var o = "q=" + encodeURIComponent(l);
                    for (var p in n) {
                        var q = n[p],
                            r = c[q];
                        r && (o += "&" + q + "=" + r) }
                    i.url += "?" + o } else {
                    var s = { q: l };
                    for (var p in n) {
                        var q = n[p],
                            r = c[q];
                        r && (s[q] = r) }
                    i.data = s, "undefined" != typeof jQuery ? i.type = "post" : i.method = "post" }
                var t = c.success,
                    u = c.error;
                return t && delete c.success, u && delete u.success, i.error = function(a) {
                    var b = a.responseText || a.response,
                        c = b && JSON.parse(b);
                    f.trigger("error", c && c.error, a), u && u(a) }, i.success = function(a, b, c) { void 0 == b && (b = a.status, c = a, a = JSON.parse(a.response)), setTimeout(function() { f.trigger("done", a, b, c), t && t(a, b, c), d && d(a) }, 0) }, delete c.jsonp, this.ajax(_.extend(i, c)), f }, a.prototype.getBounds = function(a, b, c, d) {
                var e = new cartodb._Promise,
                    f = arguments,
                    g = f[f.length - 1];
                _.isFunction(g) && (d = g);
                var h = "SELECT ST_XMin(ST_Extent(the_geom)) as minx,       ST_YMin(ST_Extent(the_geom)) as miny,       ST_XMax(ST_Extent(the_geom)) as maxx,       ST_YMax(ST_Extent(the_geom)) as maxy from ({{{ sql }}}) as subq";
                return a = Mustache.render(a, b), this.execute(h, { sql: a }, c).done(function(a) {
                    if (a.rows && a.rows.length > 0 && null != a.rows[0].maxx) {
                        var b = a.rows[0],
                            c = -85.0511,
                            f = 85.0511,
                            g = -179,
                            h = 179,
                            i = function(a, b, c) {
                                return b > a ? b : a > c ? c : a },
                            j = i(b.maxx, g, h),
                            k = i(b.minx, g, h),
                            l = i(b.maxy, c, f),
                            m = i(b.miny, c, f),
                            n = [
                                [l, j],
                                [m, k]
                            ];
                        e.trigger("done", n), d && d(n) } }).error(function(a) { e.trigger("error", a) }), e }, a.prototype.table = function(a) {
                function b() { b.fetch.apply(b, arguments) }
                var c, d, e, f, g = a,
                    h = [],
                    i = this;
                return b.fetch = function(a) { a = a || {};
                    var c = arguments,
                        d = c[c.length - 1];
                    _.isFunction(d) && (callback = d, 1 === c.length && (a = {})), i.execute(b.sql(), a, callback) }, b.sql = function() {
                    var a = "select";
                    return a += h.length ? " " + h.join(",") + " " : " * ", a += "from " + g, c && (a += " where " + c), d && (a += " limit " + d), e && (a += " order by " + e), f && (a += " " + f), a }, b.filter = function(a) {
                    return c = a, b }, b.order_by = function(a) {
                    return e = a, b }, b.asc = function() {
                    return f = "asc", b }, b.desc = function() {
                    return f = "desc", b }, b.columns = function(a) {
                    return h = a, b }, b.limit = function(a) {
                    return d = a, b }, b }, a.prototype.describeString = function(a, c, d) {
                var e = ["WITH t as (", "        SELECT count(*) as total,", "               count(DISTINCT {{column}}) as ndist", "        FROM ({{sql}}) _wrap", "      ), a as (", "        SELECT ", "          count(*) cnt, ", "          {{column}}", "        FROM ", "          ({{sql}}) _wrap ", "        GROUP BY ", "          {{column}} ", "        ORDER BY ", "          cnt DESC", "        ), b As (", "         SELECT", "          row_number() OVER (ORDER BY cnt DESC) rn,", "          cnt", "         FROM a", "        ), c As (", "        SELECT ", "          sum(cnt) OVER (ORDER BY rn ASC) / t.total cumperc,", "          rn,", "          cnt ", "         FROM b, t", "         LIMIT 10", "         ),", "stats as (", "select count(distinct({{column}})) as uniq, ", "       count(*) as cnt, ", "       sum(case when COALESCE(NULLIF({{column}},'')) is null then 1 else 0 end)::numeric as null_count, ", "       sum(case when COALESCE(NULLIF({{column}},'')) is null then 1 else 0 end)::numeric / count(*)::numeric as null_ratio, ", "       (SELECT max(cumperc) weight FROM c) As skew ", "from ({{sql}}) __wrap", "),", "hist as (", "select array_agg(row(d, c)) array_agg from (select distinct({{column}}) d, count(*) as c from ({{sql}}) __wrap, stats group by 1 limit 100) _a", ")", "select * from stats, hist"],
                    f = Mustache.render(e.join("\n"), { column: c, sql: a }),
                    g = function(a) {
                        var b = a.replace(/^"(.+(?="$))?"$/, "$1");
                        return b.replace(/""/g, '"') };
                this.execute(f, function(a) {
                    var c = a.rows[0],
                        e = 0,
                        f = [];
                    try {
                        var h = b(c.array_agg),
                            f = _(h).map(function(a) {
                                var b = a.match(/\((.*),(\d+)/),
                                    c = g(b[1]);
                                return [c, +b[2]] });
                        e = c.skew * (1 - c.null_ratio) * (1 - c.uniq / c.cnt) * (c.uniq > 1 ? 1 : 0) } catch (i) {}
                    d({ type: "string", hist: f, distinct: c.uniq, count: c.cnt, null_count: c.null_count, null_ratio: c.null_ratio, skew: c.skew, weight: e }) }) }, a.prototype.describeDate = function(a, b, c) {
                var d = ["with minimum as (", "SELECT min({{column}}) as start_time FROM ({{sql}}) _wrap), ", "maximum as (SELECT max({{column}}) as end_time FROM ({{sql}}) _wrap), ", "null_ratio as (SELECT sum(case when {{column}} is null then 1 else 0 end)::numeric / count(*)::numeric as null_ratio FROM ({{sql}}) _wrap), ", "moments as (SELECT count(DISTINCT {{column}}) as moments FROM ({{sql}}) _wrap)", "SELECT * FROM minimum, maximum, moments, null_ratio"],
                    e = Mustache.render(d.join("\n"), { column: b, sql: a });
                this.execute(e, function(a) {
                    var b = a.rows[0],
                        d = new Date(b.end_time),
                        e = new Date(b.start_time),
                        f = (b.moments, Math.min(b.moments, 1024));
                    c({ type: "date", start_time: e, end_time: d, range: d - e, steps: f, null_ratio: b.null_ratio }) }) }, a.prototype.describeBoolean = function(a, b, c) {
                var d = ["with stats as (", "select count(distinct({{column}})) as uniq,", "count(*) as cnt", "from ({{sql}}) _wrap ", "),", "null_ratio as (", "SELECT sum(case when {{column}} is null then 1 else 0 end)::numeric / count(*)::numeric as null_ratio FROM ({{sql}}) _wrap), ", "true_ratio as (", "SELECT sum(case when {{column}} is true then 1 else 0 end)::numeric / count(*)::numeric as true_ratio FROM ({{sql}}) _wrap) ", "SELECT * FROM true_ratio, null_ratio, stats"],
                    e = Mustache.render(d.join("\n"), { column: b, sql: a });
                this.execute(e, function(a) {
                    var b = a.rows[0];
                    c({ type: "boolean", null_ratio: b.null_ratio, true_ratio: b.true_ratio, distinct: b.uniq, count: b.cnt }) }) }, a.prototype.describeGeom = function(a, b, c) {
                function d(a) {
                    return { st_multipolygon: "polygon", st_polygon: "polygon", st_multilinestring: "line", st_linestring: "line", st_multipoint: "point", st_point: "point" }[a.toLowerCase()] }
                var e = ["with stats as (", "select st_asgeojson(st_extent({{column}})) as bbox", "from ({{sql}}) _wrap", "),", "geotype as (", "select st_geometrytype({{column}}) as geometry_type from ({{sql}}) _w where {{column}} is not null limit 1", "),", "clusters as (", "with clus as (", "SELECT distinct(ST_snaptogrid(the_geom, 10)) as cluster, count(*) as clustercount FROM ({{sql}}) _wrap group by 1 order by 2 desc limit 3),", "total as (", "SELECT count(*) FROM ({{sql}}) _wrap)", "SELECT sum(clus.clustercount)/sum(total.count) AS clusterrate FROM clus, total", "),", "density as (", "SELECT count(*) / st_area(st_extent(the_geom)) as density FROM ({{sql}}) _wrap", ")", "select * from stats, geotype, clusters, density"],
                    f = Mustache.render(e.join("\n"), { column: b, sql: a });
                this.execute(f, function(a) {
                    var b = a.rows[0],
                        e = JSON.parse(b.bbox).coordinates[0];
                    c({ type: "geom", bbox: [
                            [e[0][0], e[0][1]],
                            [e[2][0], e[2][1]]
                        ], geometry_type: b.geometry_type, simplified_geometry_type: d(b.geometry_type), cluster_rate: b.clusterrate, density: b.density }) }) }, a.prototype.columns = function(a, b, c) {
                var d = arguments,
                    e = d[d.length - 1];
                _.isFunction(e) && (c = e);
                var f = "select * from (" + a + ") __wrap limit 0",
                    g = ["cartodb_id", "latitude", "longitude", "created_at", "updated_at", "lat", "lon", "the_geom_webmercator"];
                this.execute(f, function(a) {
                    var b = {};
                    for (var d in a.fields) - 1 === g.indexOf(d) && (b[d] = a.fields[d].type);
                    c(b) }) }, a.prototype.describeFloat = function(a, c, d) {
                var e = ["with stats as (", "select min({{column}}) as min,", "max({{column}}) as max,", "avg({{column}}) as avg,", "count(DISTINCT {{column}}) as cnt,", "count(distinct({{column}})) as uniq,", "count(*) as cnt,", "sum(case when {{column}} is null then 1 else 0 end)::numeric / count(*)::numeric as null_ratio,", "stddev_pop({{column}}) / count({{column}}) as stddev,", "CASE WHEN abs(avg({{column}})) > 1e-7 THEN stddev({{column}}) / abs(avg({{column}})) ELSE 1e12 END as stddevmean,", 'CDB_DistType(array_agg("{{column}}"::numeric)) as dist_type ', "from ({{sql}}) _wrap ", "),", "params as (select min(a) as min, (max(a) - min(a)) / 7 as diff from ( select {{column}} as a from ({{sql}}) _table_sql where {{column}} is not null ) as foo ),", "histogram as (", "select array_agg(row(bucket, range, freq)) as hist from (", "select CASE WHEN uniq > 1 then width_bucket({{column}}, min-0.01*abs(min), max+0.01*abs(max), 100) ELSE 1 END as bucket,", "numrange(min({{column}})::numeric, max({{column}})::numeric) as range,", "count(*) as freq", "from ({{sql}}) _w, stats", "group by 1", "order by 1", ") __wrap", "),", "hist as (", "select array_agg(row(d, c)) cat_hist from (select distinct({{column}}) d, count(*) as c from ({{sql}}) __wrap, stats group by 1 limit 100) _a", "),", "buckets as (", "select CDB_QuantileBins(array_agg(distinct({{column}}::numeric)), 7) as quantiles, ", "       (select array_agg(x::numeric) FROM (SELECT (min + n * diff)::numeric as x FROM generate_series(1,7) n, params) p) as equalint,", "       CDB_JenksBins(array_agg(distinct({{column}}::numeric)), 7) as jenks, ", "       CDB_HeadsTailsBins(array_agg(distinct({{column}}::numeric)), 7) as headtails ", "from ({{sql}}) _table_sql where {{column}} is not null", ")", "select * from histogram, stats, buckets, hist"],
                    f = Mustache.render(e.join("\n"), { column: c, sql: a });
                this.execute(f, function(a) {
                    var c = a.rows[0],
                        e = b(c.hist),
                        f = b(c.cat_hist);
                    d({ type: "number", cat_hist: _(f).map(function(a) {
                            var b = a.match(/\((.*),(\d+)/);
                            return [+b[1], +b[2]] }), hist: _(e).map(function(a) {
                            if (!(a.indexOf("empty") > -1)) {
                                var b = a.split('"');
                                return { index: b[0].replace(/\D/g, ""), range: b[1].split(",").map(function(a) {
                                        return a.replace(/\D/g, "") }), freq: b[2].replace(/\D/g, "") } } }), stddev: c.stddev, null_ratio: c.null_ratio, count: c.cnt, distinct: c.uniq, avg: c.avg, max: c.max, min: c.min, stddevmean: c.stddevmean, weight: (c.uniq > 1 ? 1 : 0) * (1 - c.null_ratio) * (c.stddev < -1 ? 1 : c.stddev < 1 ? .5 : c.stddev < 3 ? .25 : .1), quantiles: c.quantiles, equalint: c.equalint, jenks: c.jenks, headtails: c.headtails, dist_type: c.dist_type }) }) }, a.prototype.describe = function(a, b, c) {
                var d = this,
                    e = arguments,
                    f = e[e.length - 1];
                if (_.isFunction(f)) var g = f;
                var h = function(a) { a.column = b, g(a) },
                    i = "select * from (" + a + ") __wrap limit 0";
                this.execute(i, function(e) {
                    var f = c && c.type ? c.type : e.fields[b].type;
                    return f ? void("string" === f ? d.describeString(a, b, h) : "number" === f ? d.describeFloat(a, b, h) : "geometry" === f ? d.describeGeom(a, b, h) : "date" === f ? d.describeDate(a, b, h) : "boolean" === f ? d.describeBoolean(a, b, h) : h(new Error("column type is not supported"))) : void h(new Error("column does not exist")) }) }, c.cartodb.SQL = a }(), MapProperties.prototype.getMapId = function() {
            return this.mapProperties.layergroupid }, MapProperties.prototype.getLayerIndexByType = function(a, b) {
            var c = this.mapProperties.metadata && this.mapProperties.metadata.layers;
            if (!c) return a;
            for (var d = {}, e = 0, f = 0; f < c.length; f++) c[f].type == b && (d[e] = f, e++);
            return void 0 == d[a] ? -1 : d[a] }, MapProperties.prototype.getLayerIndexesByType = function(a) {
            var b = this.mapProperties.metadata && this.mapProperties.metadata.layers;
            if (b) {
                for (var c = [], d = 0; d < b.length; d++) {
                    var e = b[d],
                        f = "torque" !== e.type;
                    a && a.length > 0 && (f = f && -1 != a.indexOf(e.type)), f && c.push(d) }
                return c } }, MapBase.BASE_URL = "/api/v1/map", MapBase.EMPTY_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", MapBase.prototype = { _buildMapsApiTemplate: function(a) {
                var b = a.tiler_protocol,
                    c = a.tiler_domain,
                    d = "" != a.tiler_port ? ":" + a.tiler_port : "",
                    e = a.user_name ? "{user}." : "";
                a.maps_api_template = [b, "://", e, c, d].join("") }, createMap: function(a) {
                function b(a, b) {
                    for (var d; d = c._createMapCallbacks.pop();) d(a, b) }
                var c = this;
                clearTimeout(this._timeout), this._createMapCallsStack.push(b), this._createMapCallbacks.push(a), this._timeout = setTimeout(function() { c._createMap(b) }, 4) }, _createMap: function(a) {
                if (a = a || function() {}, this._waiting) return this;
                if (this._createMapCallsStack = [], !this.named_map && 0 === this.visibleLayers().length) return void a(null);
                this._waiting = !0;
                var b = null;
                b = this._usePOST() ? this._requestPOST : this._requestGET;
                var c = this._getParamsFromOptions(this.options);
                return b.call(this, c, a), this }, _getParamsFromOptions: function(a) {
                var b = [],
                    c = a.extra_params || {},
                    d = a.map_key || a.api_key || c.map_key || c.api_key;
                if (d && b.push("map_key=" + d), c.auth_token)
                    if (_.isArray(c.auth_token))
                        for (var e = 0, f = c.auth_token.length; f > e; e++) b.push("auth_token[]=" + c.auth_token[e]);
                    else b.push("auth_token=" + c.auth_token);
                return this.stat_tag && b.push("stat_tag=" + this.stat_tag), b }, _usePOST: function() {
                if (this.options.cors) {
                    if (this.options.force_cors) return !0;
                    var a = JSON.stringify(this.toJSON());
                    if (a.length > this.options.MAX_GET_SIZE) return !0 }
                return !1 }, _requestPOST: function(a, b) {
                var c = this,
                    d = this.options.ajax,
                    e = cartodb.core.Profiler.metric("cartodb-js.layergroup.post.time").start();
                d({ crossOrigin: !0, type: "POST", method: "POST", dataType: "json", contentType: "application/json", url: this._tilerHost() + this.endPoint + (a.length ? "?" + a.join("&") : ""), data: JSON.stringify(this.toJSON()), success: function(a) { e.end(), 0 === c._createMapCallsStack.length && (a.errors ? (cartodb.core.Profiler.metric("cartodb-js.layergroup.post.error").inc(), b(null, a)) : b(a)), c._requestFinished() }, error: function(a) { e.end(), cartodb.core.Profiler.metric("cartodb-js.layergroup.post.error").inc();
                        var d = { errors: ["unknow error"] };
                        0 === a.status && (d = { errors: ["connection error"] });
                        try { d = JSON.parse(a.responseText) } catch (f) {}
                        0 === c._createMapCallsStack.length && b(null, d), c._requestFinished() } }) }, _requestGET: function(a, b) {
                var c = this,
                    d = this.options.ajax,
                    e = JSON.stringify(this.toJSON()),
                    f = this._getCompressor(e),
                    g = c.JSONPendPoint || c.endPoint;
                f(e, 3, function(e) { a.push(e);
                    var f = cartodb.core.Profiler.metric("cartodb-js.layergroup.get.time").start(),
                        h = c.options.dynamic_cdn ? c._host() : c._tilerHost();
                    d({ dataType: "jsonp", url: h + g + "?" + a.join("&"), jsonpCallback: c.options.instanciateCallback, cache: !!c.options.instanciateCallback, success: function(a) { f.end(), 0 === c._createMapCallsStack.length && (a.errors ? (cartodb.core.Profiler.metric("cartodb-js.layergroup.get.error").inc(), b(null, a)) : b(a)), c._requestFinished() }, error: function(a) { f.end(), cartodb.core.Profiler.metric("cartodb-js.layergroup.get.error").inc();
                            var d = { errors: ["unknow error"] };
                            try { d = JSON.parse(xhr.responseText) } catch (e) {}
                            0 === c._createMapCallsStack.length && b(null, d), c._requestFinished() } }) }) }, _getCompressor: function(a) {
                return this.options.compressor ? this.options.compressor : (a = a || JSON.stringify(this.toJSON()), !this.options.force_compress && a.length < this.options.MAX_GET_SIZE ? function(a, b, c) { c("config=" + encodeURIComponent(a)) } : function(a, b, c) { a = JSON.stringify({ config: a }), LZMA.compress(a, b, function(a) { c("lzma=" + encodeURIComponent(cdb.core.util.array2hex(a))) }) }) }, _requestFinished: function() {
                var a = this;
                if (this._waiting = !1, this.lastTimeUpdated = (new Date).getTime(), clearTimeout(this._refreshTimer), this._refreshTimer = setTimeout(function() { a.invalidate() }, this.options.refreshTime || 72e5), this._createMapCallsStack.length) {
                    var b = this._createMapCallsStack.pop();
                    this._createMap(b) } }, fetchAttributes: function(a, b, c, d) { this._attrCallbackName = this._attrCallbackName || this._callbackName();
                var e = this.options.ajax,
                    f = cartodb.core.Profiler.metric("cartodb-js.named_map.attributes.time").start();
                e({ dataType: "jsonp", url: this._attributesUrl(a, b), jsonpCallback: "_cdbi_layer_attributes_" + this._attrCallbackName, cache: !0, success: function(a) { f.end(), d(a) }, error: function(a) { f.end(), cartodb.core.Profiler.metric("cartodb-js.named_map.attributes.error").inc(), d(null) } }) }, _callbackName: function() {
                return cdb.core.util.uniqueCallbackName(JSON.stringify(this.toJSON())) }, _attributesUrl: function(a, b) {
                var c = this._host(),
                    d = [c, MapBase.BASE_URL.slice(1), this.mapProperties.getMapId(), this.mapProperties.getLayerIndexByType(this.getLayerIndexByNumber(a), "mapnik"), "attributes", b].join("/"),
                    e = this.options.extra_params || {},
                    f = e.auth_token;
                if (f)
                    if (_.isArray(f)) {
                        for (var g = [], h = 0, i = f.length; i > h; h++) g.push("auth_token[]=" + f[h]);
                        d += "?" + g.join("&") } else d += "?auth_token=" + f;
                return d }, invalidate: function() { this.mapProperties = null, this.urls = null, this.onLayerDefinitionUpdated() }, getTiles: function(a) {
                var b = this;
                return b.mapProperties ? (a && a(b._layerGroupTiles(b.mapProperties, b.options.extra_params)), this) : (this.createMap(function(c, d) {
                    if (c) b.mapProperties = new MapProperties(c), c.cdn_url && (b.options.cdn_url = b.options.cdn_url || {}, b.options.cdn_url = { http: c.cdn_url.http || b.options.cdn_url.http, https: c.cdn_url.https || b.options.cdn_url.https }), b.urls = b._layerGroupTiles(b.mapProperties, b.options.extra_params), a && a(b.urls);
                    else if (null !== b.named_map && d) a && a(null, d);
                    else if (0 === b.visibleLayers().length) return void(a && a({ tiles: [MapBase.EMPTY_GIF], grids: [] })) }), this) }, isHttps: function() {
                return 0 === this.options.maps_api_template.indexOf("https") }, _layerGroupTiles: function(a, b) {
                var c = [],
                    d = [],
                    e = this._encodeParams(b, this.options.pngParams),
                    f = this._encodeParams(b, this.options.gridParams),
                    g = this.options.subdomains || ["0", "1", "2", "3"];
                this.isHttps() && (g = [null]);
                var h = a.getLayerIndexesByType(this.options.filter);
                if (h.length)
                    for (var i = "/" + h.join(",") + "/{z}/{x}/{y}", j = "/{z}/{x}/{y}", k = 0; k < g.length; ++k) {
                        var l = g[k],
                            m = this._host(l) + MapBase.BASE_URL + "/" + a.getMapId();
                        d.push(m + i + ".png" + (e ? "?" + e : ""));
                        for (var n = 0; n < this.layers.length; ++n) {
                            var o = a.getLayerIndexByType(n, "mapnik");
                            c[n] = c[n] || [], c[n].push(m + "/" + o + j + ".grid.json" + (f ? "?" + f : "")) } } else d = [MapBase.EMPTY_GIF];
                return { tiles: d, grids: c } }, _encodeParams: function(a, b) {
                if (!a) return "";
                var c = [];
                b = b || _.keys(a);
                for (var d in b) {
                    var e = b[d],
                        f = a[e];
                    if (f)
                        if (_.isArray(f))
                            for (var g = 0, h = f.length; h > g; g++) c.push(e + "[]=" + encodeURIComponent(f[g]));
                        else {
                            var i = encodeURIComponent(f);
                            i = i.replace(/%7Bx%7D/g, "{x}").replace(/%7By%7D/g, "{y}").replace(/%7Bz%7D/g, "{z}"), c.push(e + "=" + i) } }
                return c.join("&") }, onLayerDefinitionUpdated: function() {}, setSilent: function(a) { this.silent = a }, _definitionUpdated: function() { this.silent || this.invalidate() }, getTileJSON: function(a, b) { a = void 0 == a ? 0 : a;
                var c = this;
                this.getTiles(function(d) {
                    return d ? void(b && b(c._tileJSONfromTiles(a, d))) : void b(null) }) }, _tileJSONfromTiles: function(a, b, c) {
                function d(a) {
                    for (var b = [], c = 0; c < a.length; ++c) b.push(a[c].replace("{s}", e[c % e.length]));
                    return b }
                c = c || {};
                var e = c.subdomains || ["0", "1", "2", "3"];
                return { tilejson: "2.0.0", scheme: "xyz", grids: d(b.grids[a]), tiles: d(b.tiles), formatter: function(a, b) {
                        return b } } }, _tilerHost: function() {
                var a = this.options;
                return a.maps_api_template.replace("{user}", a.user_name) }, _host: function(a) {
                var b = this.options,
                    c = b.cdn_url,
                    d = !c || c && !c.http && !c.https;
                if (b.no_cdn || d) return this._tilerHost();
                var e = this.isHttps() ? "https" : "http",
                    f = e + "://";
                a && (f += a + ".");
                var g = c[e];
                return this._isUserTemplateUrl(g) || (g += "/{user}"), f += g.replace("{user}", b.user_name) }, _isUserTemplateUrl: function(a) {
                return a && -1 !== a.indexOf("{user}") }, getLayer: function(a) {
                return _.clone(this.layers[a]) }, getLayerCount: function() {
                return this.layers ? this.layers.length : 0 }, getLayerIndexByNumber: function(a) {
                for (var b = {}, c = 0, d = 0; d < this.layers.length; ++d) {
                    var e = this.layers[d];
                    b[d] = c, e.options && !e.options.hidden && ++c }
                return b[a] }, getLayerNumberByIndex: function(a) {
                for (var b = [], c = 0; c < this.layers.length; ++c) {
                    var d = this.layers[c];
                    this._isLayerVisible(d) && b.push(c) }
                return a >= b.length ? -1 : +b[a] }, visibleLayers: function() {
                for (var a = [], b = 0; b < this.layers.length; ++b) {
                    var c = this.layers[b];
                    this._isLayerVisible(c) && a.push(c) }
                return a }, _isLayerVisible: function(a) {
                return a.options && "hidden" in a.options ? !a.options.hidden : a.visible !== !1 }, setLayer: function(a, b) {
                if (a < this.getLayerCount() && a >= 0) {
                    if (b.options.hidden) {
                        var c = this.interactionEnabled[a];
                        c && (b.interaction = !0, this.setInteraction(a, !1)) } else this.layers[a].interaction && (this.setInteraction(a, !0), delete this.layers[a].interaction);
                    this.layers[a] = _.clone(b) }
                return this.invalidate(), this }, getTooltipData: function(a) {
                var b = this.layers[a].tooltip;
                return b && b.fields && b.fields.length ? b : null }, getInfowindowData: function(a) {
                var b, c = this.layers[a].infowindow;
                return !c && this.options.layer_definition && (b = this.options.layer_definition.layers[a]) && (c = b.infowindow), c && c.fields && c.fields.length > 0 ? c : null }, containInfowindow: function() {
                for (var a = this.options.layer_definition.layers, b = 0; b < a.length; ++b) {
                    var c = a[b].infowindow;
                    if (c && c.fields && c.fields.length > 0) return !0 }
                return !1 }, containTooltip: function() {
                for (var a = this.options.layer_definition.layers, b = 0; b < a.length; ++b) {
                    var c = a[b].tooltip;
                    if (c && c.fields && c.fields.length) return !0 }
                return !1 }, getSubLayer: function(a) {
                var b = this.layers[a];
                return b.sub = b.sub || SubLayerFactory.createSublayer(b.type, this, a), b.sub }, getSubLayerCount: function() {
                return this.getLayerCount() }, getSubLayers: function() {
                for (var a = [], b = 0; b < this.getSubLayerCount(); ++b) a.push(this.getSubLayer(b));
                return a } }, LayerDefinition.layerDefFromSubLayers = function(a) {
            if (!a || void 0 === a.length) throw new Error("sublayers should be an array");
            a = _.map(a, function(a) {
                var b = a.type;
                return delete a.type, { type: b, options: a } });
            var b = { version: "1.3.0", stat_tag: "API", layers: a };
            return new LayerDefinition(b, {}).toJSON() }, LayerDefinition.prototype = _.extend({}, MapBase.prototype, { setLayerDefinition: function(a, b) { b = b || {}, this.version = a.version || "1.0.0", this.stat_tag = a.stat_tag, this.layers = _.clone(a.layers), b.silent || this._definitionUpdated() }, toJSON: function() {
                var a = {};
                a.version = this.version, this.stat_tag && (a.stat_tag = this.stat_tag), a.layers = [];
                for (var b = this.visibleLayers(), c = 0; c < b.length; ++c) {
                    var d = this.getSubLayer(this.getLayerNumberByIndex(c));
                    a.layers.push(d.toJSON()) }
                return a }, removeLayer: function(a) {
                return a < this.getLayerCount() && a >= 0 && (this.layers.splice(a, 1), this.interactionEnabled.splice(a, 1), this._reorderSubLayers(), this.invalidate()), this }, _reorderSubLayers: function() {
                for (var a = 0; a < this.layers.length; ++a) {
                    var b = this.layers[a];
                    b.sub && b.sub._setPosition(a) } }, addLayer: function(a, b) {
                if (b = void 0 === b ? this.getLayerCount() : b, b <= this.getLayerCount() && b >= 0) {
                    var c = a.type || "cartodb";
                    delete a.type, this.layers.splice(b, 0, { type: c, options: a });
                    var d = this.getSubLayer(b);
                    if (!d.isValid()) throw d.remove(), "Layer definition should contain all the required attributes";
                    this._definitionUpdated() }
                return this }, setInteractivity: function(a, b) {
                if (void 0 === b && (b = a, a = 0), a >= this.getLayerCount() && 0 > a) throw new Error("layer does not exist"); "string" == typeof b && (b = b.split(","));
                for (var c = 0; c < b.length; ++c) b[c] = b[c].replace(/ /g, "");
                return this.layers[a].options.interactivity = b, this._definitionUpdated(), this }, setQuery: function(a, b) { void 0 === b && (b = a, a = 0), this.layers[a].options.sql = b, this._definitionUpdated() }, getQuery: function(a) {
                return a = a || 0, this.layers[a].options.sql }, setCartoCSS: function(a, b, c) { void 0 === c && (c = b, b = a, a = 0), c = c || cartodb.CARTOCSS_DEFAULT_VERSION, this.layers[a].options.cartocss = b, this.layers[a].options.cartocss_version = c, this._definitionUpdated() }, createSubLayer: function(a, b) {
                return this.addLayer(a), this.getSubLayer(this.getLayerCount() - 1) } }), NamedMap.prototype = _.extend({}, MapBase.prototype, { getSubLayer: function(a) {
                var b = this.layers[a];
                return b || (b = this.layers[a] = { options: {} }), b.sub = b.sub || SubLayerFactory.createSublayer(b.type, this, a), b.sub }, setLayerDefinition: function(a, b) { b = b || {}, this.endPoint = MapBase.BASE_URL + "/named/" + a.name, this.JSONPendPoint = MapBase.BASE_URL + "/named/" + a.name + "/jsonp", this.layers = _.clone(a.layers) || [];
                for (var c = 0; c < this.layers.length; ++c) {
                    var d = this.layers[c];
                    d.options = d.options || { hidden: d.visible === !1 }, d.options.layer_name = d.layer_name }
                this.named_map = a;
                var e = a.auth_token || b.auth_token;
                e && this.setAuthToken(e), b.silent || this.invalidate() }, setAuthToken: function(a) {
                if (!this.isHttps()) throw new Error("https must be used when map has token authentication");
                return this.options.extra_params = this.options.extra_params || {}, this.options.extra_params.auth_token = a, this.invalidate(), this }, setParams: function(a, b) {
                var c;
                2 === arguments.length ? (c = {}, c[a] = b) : c = a, this.named_map.params || (this.named_map.params = {});
                for (var d in c) void 0 === c[d] || null === c[d] ? delete this.named_map.params[d] : this.named_map.params[d] = c[d];
                return this.invalidate(), this }, toJSON: function() {
                for (var a = this.named_map.params || {}, b = 0; b < this.layers.length; ++b) {
                    var c = this.layers[b];
                    a["layer" + b] = this._isLayerVisible(c) ? 1 : 0 }
                return a }, containInfowindow: function() {
                for (var a = this.layers || [], b = 0; b < a.length; ++b) {
                    var c = a[b].infowindow;
                    if (c && c.fields && c.fields.length > 0) return !0 }
                return !1 }, containTooltip: function() {
                for (var a = this.layers || [], b = 0; b < a.length; ++b) {
                    var c = a[b].tooltip;
                    if (c) return !0 }
                return !1 }, setSQL: function(a) {
                throw new Error("SQL is read-only in NamedMaps") }, setCartoCSS: function(a) {
                throw new Error("cartocss is read-only in NamedMaps") }, getCartoCSS: function() {
                throw new Error("cartocss can't be accessed in NamedMaps") }, getSQL: function() {
                throw new Error("SQL can't be accessed in NamedMaps") }, setLayer: function(a, b) {
                var c = { sql: 1, cartocss: 1, interactivity: 1 };
                for (var d in b.options)
                    if (d in c) throw delete b.options[d], new Error(d + " is read-only in NamedMaps");
                return MapBase.prototype.setLayer.call(this, a, b) }, removeLayer: function(a) {
                throw new Error("sublayers are read-only in Named Maps") }, createSubLayer: function(a, b) {
                throw new Error("sublayers are read-only in Named Maps") }, addLayer: function(a, b) {
                throw new Error("sublayers are read-only in Named Maps") }, getLayerIndexByNumber: function(a) {
                return +a } }), SubLayerFactory.createSublayer = function(a, b, c) {
            if (a = a && a.toLowerCase(), a && "mapnik" !== a && "cartodb" !== a) {
                if ("http" === a) return new HttpSubLayer(b, c);
                throw "Sublayer type not supported" }
            return new CartoDBSubLayer(b, c) }, SubLayerBase.prototype = { toJSON: function() {
                throw "toJSON must be implemented" }, isValid: function() {
                throw "isValid must be implemented" }, remove: function() { this._check(), this._parent.removeLayer(this._position), this._added = !1, this.trigger("remove", this), this._onRemove() }, _onRemove: function() {}, toggle: function() {
                return this.get("hidden") ? this.show() : this.hide(), !this.get("hidden") }, show: function() { this.get("hidden") && this.set({ hidden: !1 }) }, hide: function() { this.get("hidden") || this.set({ hidden: !0 }) }, set: function(a) { this._check();
                var b = this._parent.getLayer(this._position),
                    c = b.options;
                for (var d in a) c[d] = a[d];
                return this._parent.setLayer(this._position, b), void 0 !== a.hidden && this.trigger("change:visibility", this, a.hidden), this }, unset: function(a) {
                var b = this._parent.getLayer(this._position);
                delete b.options[a], this._parent.setLayer(this._position, b) }, get: function(a) { this._check();
                var b = this._parent.getLayer(this._position);
                return b.options[a] }, isVisible: function() {
                return !this.get("hidden") }, _check: function() {
                if (!this._added) throw "sublayer was removed" }, _unbindInteraction: function() { this._parent.off && this._parent.off(null, null, this) }, _bindInteraction: function() {
                if (this._parent.on) {
                    var a = this,
                        b = function(b, c) { c = c || b, a._parent.on(b, function() {
                                var b = Array.prototype.slice.call(arguments);
                                parseInt(b[b.length - 1], 10) == a._position && a.trigger.apply(a, [c].concat(b)) }, a) };
                    b("featureOver"), b("featureOut"), b("featureClick"), b("layermouseover", "mouseover"), b("layermouseout", "mouseout") } }, _setPosition: function(a) { this._position = a } }, _.extend(SubLayerBase.prototype, Backbone.Events), CartoDBSubLayer.prototype = _.extend({}, SubLayerBase.prototype, {
            toJSON: function() {
                var a = { type: "cartodb", options: { sql: this.getSQL(), cartocss: this.getCartoCSS(), cartocss_version: this.get("cartocss_version") || "2.1.0" } },
                    b = this.getInteractivity();
                if (b && b.length > 0) { a.options.interactivity = b;
                    var c = this.getAttributes();
                    c.length > 0 && (a.options.attributes = { id: "cartodb_id", columns: c }) }
                return this.get("raster") && (a.options.raster = !0, a.options.geom_column = "the_raster_webmercator", a.options.geom_type = "raster", a.options.raster_band = this.get("raster_band") || 0, a.options.cartocss_version = this.get("cartocss_version") || "2.3.0"), a },
            isValid: function() {
                return this.get("sql") && this.get("cartocss") },
            _onRemove: function() { this._unbindInteraction() },
            setSQL: function(a) {
                return this.set({ sql: a }) },
            setCartoCSS: function(a) {
                return this.set({ cartocss: a }) },
            setInteractivity: function(a) {
                return this.set({ interactivity: a }) },
            setInteraction: function(a) { this._parent.setInteraction(this._position, a) },
            getSQL: function() {
                return this.get("sql") },
            getCartoCSS: function() {
                return this.get("cartocss") },
            getInteractivity: function() {
                var a = this.get("interactivity");
                return a ? ("string" == typeof a && (a = a.split(",")), this._trimArrayItems(a)) : void 0
            },
            getAttributes: function() {
                var columns = [];
                if (this.get('attributes')) {
                  columns = this.get('attributes');
                } else if(this.infowindow) {
                  columns = _.map(this.infowindow.get('fields'), function(field){
                    return field.name;
                  });
                }
                return this._trimArrayItems(columns);
                // var a = [];
                // return a = this.get("attributes") ? this.get("attributes") : _.map(this.infowindow.get("fields"), function(a) {
                //     return a.name }), this._trimArrayItems(a) 
            },
            _trimArrayItems: function(a) {
                return _.map(a, function(a) {
                    return a.trim() }) }
        }), HttpSubLayer.prototype = _.extend({}, SubLayerBase.prototype, { toJSON: function() {
                var a = { type: "http", options: { urlTemplate: this.getURLTemplate() } },
                    b = this.get("subdomains");
                b && (a.options.subdomains = b);
                var c = this.get("tms");
                return void 0 !== c && (a.options.tms = c), a }, isValid: function() {
                return this.get("urlTemplate") }, setURLTemplate: function(a) {
                return this.set({ urlTemplate: a }) }, setSubdomains: function(a) {
                return this.set({ subdomains: a }) }, setTms: function(a) {
                return this.set({ tms: a }) }, getURLTemplate: function(a) {
                return this.get("urlTemplate") }, getSubdomains: function(a) {
                return this.get("subdomains") }, getTms: function(a) {
                return this.get("tms") } });
    var Loader = cdb.vis.Loader = cdb.core.Loader = { queue: [], current: void 0, _script: null, head: null, loadScript: function(a) {
            var b = document.createElement("script");
            return b.type = "text/javascript", b.src = a, b.async = !0, Loader.head || (Loader.head = document.getElementsByTagName("head")[0]), setTimeout(function() { Loader.head.appendChild(b) }, 0), b }, get: function(a, b) { Loader._script ? Loader.queue.push([a, b]) : (Loader.current = b, Loader._script = Loader.loadScript(a + (~a.indexOf("?") ? "&" : "?") + "callback=vizjson")) }, getPath: function(a) {
            var b = document.getElementsByTagName("script"),
                c = /\/?cartodb[\-\._]?([\w\-\._]*)\.js\??/;
            for (i = 0, len = b.length; i < len; i++)
                if (src = b[i].src, matches = src.match(c), matches) {
                    var d = src.split("/");
                    return delete d[d.length - 1], d.join("/") + a }
            return null }, loadModule: function(a) {
            var b = "cartodb.mod." + a + (cartodb.DEBUG ? ".uncompressed.js" : ".js"),
                c = this.getPath(b);
            c || cartodb.log.error("can't find cartodb.js file"), Loader.loadScript(c) } };
    window.vizjson = function(a) { Loader.current && Loader.current(a), Loader.head.removeChild(Loader._script), Loader._script = null;
            var b = Loader.queue.shift();
            b && Loader.get(b[0], b[1]) },
        function() { Queue = function() { this._methods = [], this._response = null, this._flushed = !1 }, Queue.prototype = { add: function(a) { this._flushed ? a(this._response) : this._methods.push(a) }, flush: function(a) {
                    if (!this._flushed)
                        for (this._response = a, this._flushed = !0; this._methods[0];) this._methods.shift()(a) } }, StaticImage = function() { MapBase.call(this, this), this.imageOptions = {}, this.error = null, this.supported_formats = ["png", "jpg"], this.defaults = { basemap_url_template: "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", basemap_subdomains: ["a", "b", "c"], format: "png", zoom: 10, center: [0, 0], size: [320, 240], tiler_port: 80, tiler_domain: "carto.com" } }, StaticImage.prototype = _.extend({}, MapBase.prototype, { load: function(a, b) {
                    return _.bindAll(this, "_onVisLoaded"), this.queue = new Queue, this.no_cdn = b.no_cdn, this.userOptions = b, b = _.defaults({ vizjson: a, temp_id: "s" + this._getUUID() }, this.defaults), this.imageOptions = b, cdb.core.Loader.get(a, this._onVisLoaded), this }, loadLayerDefinition: function(a, b) {
                    return this.queue = new Queue, a.user_name ? (this.userOptions = b, this.options.api_key = a.api_key, this.options.user_name = a.user_name, this.options.tiler_protocol = a.tiler_protocol, this.options.tiler_domain = a.tiler_domain, this.options.tiler_port = a.tiler_port, this.options.maps_api_template = a.maps_api_template, this.endPoint = "/api/v1/map", this.options.maps_api_template || this._buildMapsApiTemplate(this.options), this.options.layers = a, void this._requestLayerGroupID()) : void cartodb.log.error("Please, specify the username") }, _onVisLoaded: function(a) {
                    if (a) {
                        var b = a.layers[0],
                            c = this._getDataLayer(a.layers);
                        c.options && (this.options.user_name = c.options.user_name), c.options.maps_api_template ? this.options.maps_api_template = c.options.maps_api_template : this._setupTilerConfiguration(c.options.tiler_protocol, c.options.tiler_domain, c.options.tiler_port), this.auth_tokens = a.auth_tokens, this.endPoint = "/api/v1/map";
                        var d = [],
                            e = a.bounds;
                        e && (d.push([e[0][1], e[0][0]]), d.push([e[1][1], e[1][0]])), this.imageOptions.zoom = a.zoom, this.imageOptions.center = JSON.parse(a.center), this.imageOptions.bbox = d, this.imageOptions.bounds = a.bounds, b && b.options && (this.imageOptions.basemap = b);
                        var f = !1,
                            g = this._getLayerByType(a.layers, "namedmap");
                        if (g) {
                            var h = this._getLayerByType(a.layers, "torque");
                            h && h.options && h.options.named_map && h.options.named_map.name === g.options.named_map.name && (f = !0) }
                        var i = [],
                            j = this._getBasemapLayer();
                        j && i.push(j);
                        for (var k, l = 1; l < a.layers.length; l++) {
                            var m = a.layers[l];
                            if ("torque" !== m.type || f) {
                                if ("namedmap" === m.type) i.push(this._getNamedmapLayerDefinition(m));
                                else if ("tiled" === m.type) k = this._getHTTPLayer(m);
                                else if ("torque" !== m.type && "namedmap" !== m.type)
                                    for (var n = this._getLayergroupLayerDefinition(m), o = 0; o < n.length; o++) i.push(n[o]) } else i.push(this._getTorqueLayerDefinition(m)) }
                        k && i.push(k), this.options.layers = { layers: i }, this._requestLayerGroupID() } }, _getDataLayer: function(a) {
                    return this._getLayerByType(a, "namedmap") || this._getLayerByType(a, "layergroup") || this._getLayerByType(a, "torque") }, visibleLayers: function() {
                    return this.options.layers.layers }, _getLayerByType: function(a, b) {
                    return _.find(a, function(a) {
                        return a.type === b }) }, _setupTilerConfiguration: function(a, b, c) { this.options.tiler_domain = b, this.options.tiler_protocol = a, this.options.tiler_port = c, this._buildMapsApiTemplate(this.options) }, toJSON: function() {
                    return this.options.layers }, _requestLayerGroupID: function() {
                    var a = this;
                    this.createMap(function(b, c) { c && (a.error = c), b && (a.imageOptions.layergroupid = b.layergroupid, a.cdn_url = b.cdn_url), a.queue.flush(this) }) }, _getDefaultBasemapLayer: function() {
                    return { type: "http", options: { urlTemplate: this.defaults.basemap_url_template, subdomains: this.defaults.basemap_subdomains } } }, _getHTTPLayer: function(a) {
                    var b = a.options.urlTemplate;
                    return b ? { type: "http", options: { urlTemplate: b, subdomains: a.options.subdomains || this.defaults.basemap_subdomains } } : null }, _getPlainBasemapLayer: function(a) {
                    return { type: "plain", options: { color: a } } }, _getBasemapLayer: function() {
                    var a = this.userOptions.basemap || this.imageOptions.basemap;
                    if (a) {
                        var b = a.type.toLowerCase();
                        return a.options && a.options.type && (b = a.options.type.toLowerCase()), "plain" === b ? this._getPlainBasemapLayer(a.options.color) : this._getHTTPLayer(a) }
                    return this._getDefaultBasemapLayer() }, _getTorqueLayerDefinition: function(a) {
                    if (a.options.named_map) return this._getNamedmapLayerDefinition(a);
                    var b = new LayerDefinition(a, a.options),
                        c = b.options.query || "SELECT * FROM " + b.options.table_name,
                        d = a.options.tile_style;
                    return { type: "torque", options: { step: this.userOptions.step || 0, sql: c, cartocss: d } } }, _getLayergroupLayerDefinition: function(a) {
                    var b = a.options;
                    b.layer_definition.layers = this._getVisibleLayers(b.layer_definition.layers);
                    var c = new LayerDefinition(b.layer_definition, b);
                    return c.toJSON().layers }, _getNamedmapLayerDefinition: function(a) {
                    var b = a.options,
                        c = new NamedMap(b.named_map, b),
                        b = { name: c.named_map.name };
                    return this.auth_tokens && this.auth_tokens.length > 0 && (b.auth_tokens = this.auth_tokens), { type: "named", options: b } }, _getVisibleLayers: function(a) {
                    return _.filter(a, function(a) {
                        return a.visible }) }, _getUrl: function() {
                    var a = (this.options.user_name, this.imageOptions.bbox),
                        b = this.imageOptions.layergroupid,
                        c = this.imageOptions.zoom || this.defaults.zoom,
                        d = this.imageOptions.center || this.defaults.center,
                        e = this.imageOptions.size || this.defaults.size,
                        f = this.imageOptions.format || this.defaults.format,
                        g = d[0],
                        h = d[1],
                        i = e[0],
                        j = e[1],
                        k = this.isHttps() ? null : "a",
                        l = this._host(k) + this.endPoint;
                    return a && a.length && !this.userOptions.override_bbox ? [l, "static/bbox", b, a.join(","), i, j + "." + f].join("/") : [l, "static/center", b, c, g, h, i, j + "." + f].join("/") }, _getUUID: function() {
                    var a = function() {
                        return (65536 * (1 + Math.random()) | 0).toString(16).substring(1) };
                    return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a() }, _set: function(a, b) {
                    var c = this;
                    return this.queue.add(function() { c.imageOptions[a] = b }), this }, zoom: function(a) {
                    return this._set("zoom", a) }, bbox: function(a) {
                    return this._set("bbox", a) }, center: function(a) {
                    return this._set("bbox", null), this._set("center", a) }, format: function(a) {
                    return this._set("format", _.include(this.supported_formats, a) ? a : this.defaults.format) }, size: function(a, b) {
                    return this._set("size", [a, void 0 === b ? a : b]) }, into: function(a) {
                    var b = this;
                    return a instanceof HTMLImageElement ? (this.imageOptions.size = [a.width, a.height], void this.queue.add(function(c) { a.src = b._getUrl() })) : void cartodb.log.error("img should be an image") }, getUrl: function(a) {
                    var b = this;
                    this.queue.add(function() { a && a(b.error, b._getUrl()) }) }, write: function(a) {
                    var b = this;
                    return this.imageOptions.attributes = a, a && a.src ? document.write('<img id="' + this.imageOptions.temp_id + '" src="' + a.src + '" />') : document.write('<img id="' + this.imageOptions.temp_id + '" />'), this.queue.add(function() {
                        var a = document.getElementById(b.imageOptions.temp_id);
                        a.src = b._getUrl(), a.removeAttribute("temp_id");
                        var c = b.imageOptions.attributes;
                        c && c["class"] && a.setAttribute("class", c["class"]), c && c.id && a.setAttribute("id", c.id) }), this } }), cdb.Image = function(a, b) { b || (b = {});
                var c = new StaticImage;
                return "string" == typeof a ? c.load(a, b) : c.loadLayerDefinition(a, b), c } }(),
        function() {
            var a = this;
            a.cartodb = a.cartodb || {};
            var b = { tiler_domain: "carto.com", tiler_port: "80", tiler_protocol: "http", subdomains: ["{s}"], extra_params: { cache_policy: "persist" } },
                c = function(a) {
                    if (_.defaults(a, b), !a.sublayers) throw new Error("sublayers should be passed");
                    if (!a.user_name) throw new Error("username should be passed");
                    a.layer_definition = LayerDefinition.layerDefFromSubLayers(a.sublayers), a.ajax = reqwest.compat, LayerDefinition.call(this, a.layer_definition, a) };
            _.extend(c.prototype, LayerDefinition.prototype), a.cartodb.Tiles = c, c.getTiles = function(a, b) {
                var d = new c(a);
                return d.getTiles(b), d } }()
}();
