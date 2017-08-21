
/**
 * Returns the check character in a DDEX GRid.
 */
function checkChar(string) {
  if (string.length != 17 && string.length != 18) {
    throw Error(`Expected 17 or 18 length string, received ${string}.`);
  }
  const pValue = p(string, 18);
  const pMod37 = pValue % 37;
  // The Check Character a1 must be computed so that S18||36 = 1.
  // solve for x
  // (pMod37 + x - 1) % 36 = 0
  // or
  // (pMod37 + x) % 36 = 1
  const sValue = 36 - pMod37 + 1;
  if (((sValue + pMod37) % 36) !== 1) {
    throw Error('Something unexpected happend.');
  }
  return toChar(sValue);
}

/**
 * Converts A-Z as 10-35. 0-10 is as is.
 *
 * @return {Integer}
 */
function toNumber(c) {
  if (!validChar(c)) {
    throw Error(`Invalid character ${c}.`);
  }
  c = ('' + c).toUpperCase();
  if (c >= '0' && c <= '9') {
    return c - '0';
  }
  return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
}

/**
 * Converts 0-35 to '0'-'9' or 'A'-'Z'
 *
 * @return {Integer}
 */
function toChar(n) {
  if (n < 0 || n > 35) {
    throw Error(`Number ${n} out of range.`);
  }
  if (n < 10) {
    return String.fromCharCode('0'.charCodeAt(0) + n);
  }
  return String.fromCharCode('A'.charCodeAt(0) + n - 10);
}

/**
 *
 * @param {String} string - input GRid.
 * @param {Int} index - [1, 18]
 */
function p(string, index) {
  if (string.length != 17 && string.length != 18) {
    throw Error(`Expected 17 or 18 length string, received ${string}.`);
  }
  if (index < 1 || index > 18) {
    throw Error(`Index ${index} out of range.`);
  }
  if (index == 1) {
    return 36;
  }
  // the "|| 36" is done since according to the standard,
  // when x % 36 == 0, we return 36.
  return (s(string, index - 1) % 36 || 36) * 2;
}

function s(string, index) {
  if (string.length != 17 && string.length != 18) {
    throw Error(`Expected 17 or 18 length string, received ${string}.`);
  }
  if (index < 1 || index > 18) {
    throw Error(`Index ${index} out of range.`);
  }
  return (p(string, index) % 37) + toNumber(string[index-1]);
}

function validChar(c) {
  if (typeof c == 'undefined') {
    return false;
  }
  if (c == null) {
    return false;
  }
  if (typeof c == 'number') {
    return c >= 0 && c < 10;
  }
  if (typeof c != 'string' || c.length != 1) {
    return false;
  }
  c = c.toUpperCase();
  return (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9');
}

function breakIdentifier (str) {
  str = (str || '').replace(/[^0-9A-Z]/gi, '').toUpperCase();
  return {
    identifierScheme: str.substr(0, 2),
    issuerCode: str.substr(2, 5),
    releaseNumber: str.substr(7, 10),
    checkCharacter: str.substr(17, 1)
  };
}

module.exports = {
  validChar,
  toChar,
  toNumber,
  checkChar,
  breakIdentifier
}
