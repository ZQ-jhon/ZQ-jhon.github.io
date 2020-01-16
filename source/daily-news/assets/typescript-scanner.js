function createScanner(languageVersion, skipTrivia, languageVariant, textInitial, onError, start, length) {
  if (languageVariant === void 0) { languageVariant = 0; }
  var text = textInitial;
  var pos;
  var end;
  var startPos;
  var tokenPos;
  var token;
  var tokenValue;
  var tokenFlags;
  var inJSDocType = 0;
  setText(text, start, length);
  var scanner = {
    getStartPos: function () { return startPos; },
    getTextPos: function () { return pos; },
    getToken: function () { return token; },
    getTokenPos: function () { return tokenPos; },
    getTokenText: function () { return text.substring(tokenPos, pos); },
    getTokenValue: function () { return tokenValue; },
    hasUnicodeEscape: function () { return (tokenFlags & 1024) !== 0; },
    hasExtendedUnicodeEscape: function () { return (tokenFlags & 8) !== 0; },
    hasPrecedingLineBreak: function () { return (tokenFlags & 1) !== 0; },
    isIdentifier: function () { return token === 75 || token > 111; },
    isReservedWord: function () { return token >= 76 && token <= 111; },
    isUnterminated: function () { return (tokenFlags & 4) !== 0; },
    getTokenFlags: function () { return tokenFlags; },
    reScanGreaterToken: reScanGreaterToken,
    reScanSlashToken: reScanSlashToken,
    reScanTemplateToken: reScanTemplateToken,
    scanJsxIdentifier: scanJsxIdentifier,
    scanJsxAttributeValue: scanJsxAttributeValue,
    reScanJsxToken: reScanJsxToken,
    reScanLessThanToken: reScanLessThanToken,
    reScanQuestionToken: reScanQuestionToken,
    scanJsxToken: scanJsxToken,
    scanJsDocToken: scanJsDocToken,
    scan: scan,
    getText: getText,
    setText: setText,
    setScriptTarget: setScriptTarget,
    setLanguageVariant: setLanguageVariant,
    setOnError: setOnError,
    setTextPos: setTextPos,
    setInJSDocType: setInJSDocType,
    tryScan: tryScan,
    lookAhead: lookAhead,
    scanRange: scanRange,
  };
  if (ts.Debug.isDebugging) {
    Object.defineProperty(scanner, "__debugShowCurrentPositionInText", {
      get: function () {
        var text = scanner.getText();
        return text.slice(0, scanner.getStartPos()) + "║" + text.slice(scanner.getStartPos());
      },
    });
  }
  return scanner;
  function error(message, errPos, length) {
    if (errPos === void 0) { errPos = pos; }
    if (onError) {
      var oldPos = pos;
      pos = errPos;
      onError(message, length || 0);
      pos = oldPos;
    }
  }
  function scanNumberFragment() {
    var start = pos;
    var allowSeparator = false;
    var isPreviousTokenSeparator = false;
    var result = "";
    while (true) {
      var ch = text.charCodeAt(pos);
      if (ch === 95) {
        tokenFlags |= 512;
        if (allowSeparator) {
          allowSeparator = false;
          isPreviousTokenSeparator = true;
          result += text.substring(start, pos);
        }
        else if (isPreviousTokenSeparator) {
          error(ts.Diagnostics.Multiple_consecutive_numeric_separators_are_not_permitted, pos, 1);
        }
        else {
          error(ts.Diagnostics.Numeric_separators_are_not_allowed_here, pos, 1);
        }
        pos++;
        start = pos;
        continue;
      }
      if (isDigit(ch)) {
        allowSeparator = true;
        isPreviousTokenSeparator = false;
        pos++;
        continue;
      }
      break;
    }
    if (text.charCodeAt(pos - 1) === 95) {
      error(ts.Diagnostics.Numeric_separators_are_not_allowed_here, pos - 1, 1);
    }
    return result + text.substring(start, pos);
  }
  function scanNumber() {
    var start = pos;
    var mainFragment = scanNumberFragment();
    var decimalFragment;
    var scientificFragment;
    if (text.charCodeAt(pos) === 46) {
      pos++;
      decimalFragment = scanNumberFragment();
    }
    var end = pos;
    if (text.charCodeAt(pos) === 69 || text.charCodeAt(pos) === 101) {
      pos++;
      tokenFlags |= 16;
      if (text.charCodeAt(pos) === 43 || text.charCodeAt(pos) === 45)
        pos++;
      var preNumericPart = pos;
      var finalFragment = scanNumberFragment();
      if (!finalFragment) {
        error(ts.Diagnostics.Digit_expected);
      }
      else {
        scientificFragment = text.substring(end, preNumericPart) + finalFragment;
        end = pos;
      }
    }
    var result;
    if (tokenFlags & 512) {
      result = mainFragment;
      if (decimalFragment) {
        result += "." + decimalFragment;
      }
      if (scientificFragment) {
        result += scientificFragment;
      }
    }
    else {
      result = text.substring(start, end);
    }
    if (decimalFragment !== undefined || tokenFlags & 16) {
      checkForIdentifierStartAfterNumericLiteral(start, decimalFragment === undefined && !!(tokenFlags & 16));
      return {
        type: 8,
        value: "" + +result
      };
    }
    else {
      tokenValue = result;
      var type = checkBigIntSuffix();
      checkForIdentifierStartAfterNumericLiteral(start);
      return { type: type, value: tokenValue };
    }
  }
  function checkForIdentifierStartAfterNumericLiteral(numericStart, isScientific) {
    if (!isIdentifierStart(codePointAt(text, pos), languageVersion)) {
      return;
    }
    var identifierStart = pos;
    var length = scanIdentifierParts().length;
    if (length === 1 && text[identifierStart] === "n") {
      if (isScientific) {
        error(ts.Diagnostics.A_bigint_literal_cannot_use_exponential_notation, numericStart, identifierStart - numericStart + 1);
      }
      else {
        error(ts.Diagnostics.A_bigint_literal_must_be_an_integer, numericStart, identifierStart - numericStart + 1);
      }
    }
    else {
      error(ts.Diagnostics.An_identifier_or_keyword_cannot_immediately_follow_a_numeric_literal, identifierStart, length);
      pos = identifierStart;
    }
  }
  function scanOctalDigits() {
    var start = pos;
    while (isOctalDigit(text.charCodeAt(pos))) {
      pos++;
    }
    return +(text.substring(start, pos));
  }
  function scanExactNumberOfHexDigits(count, canHaveSeparators) {
    var valueString = scanHexDigits(count, false, canHaveSeparators);
    return valueString ? parseInt(valueString, 16) : -1;
  }
  function scanMinimumNumberOfHexDigits(count, canHaveSeparators) {
    return scanHexDigits(count, true, canHaveSeparators);
  }
  function scanHexDigits(minCount, scanAsManyAsPossible, canHaveSeparators) {
    var valueChars = [];
    var allowSeparator = false;
    var isPreviousTokenSeparator = false;
    while (valueChars.length < minCount || scanAsManyAsPossible) {
      var ch = text.charCodeAt(pos);
      if (canHaveSeparators && ch === 95) {
        tokenFlags |= 512;
        if (allowSeparator) {
          allowSeparator = false;
          isPreviousTokenSeparator = true;
        }
        else if (isPreviousTokenSeparator) {
          error(ts.Diagnostics.Multiple_consecutive_numeric_separators_are_not_permitted, pos, 1);
        }
        else {
          error(ts.Diagnostics.Numeric_separators_are_not_allowed_here, pos, 1);
        }
        pos++;
        continue;
      }
      allowSeparator = canHaveSeparators;
      if (ch >= 65 && ch <= 70) {
        ch += 97 - 65;
      }
      else if (!((ch >= 48 && ch <= 57) ||
        (ch >= 97 && ch <= 102))) {
        break;
      }
      valueChars.push(ch);
      pos++;
      isPreviousTokenSeparator = false;
    }
    if (valueChars.length < minCount) {
      valueChars = [];
    }
    if (text.charCodeAt(pos - 1) === 95) {
      error(ts.Diagnostics.Numeric_separators_are_not_allowed_here, pos - 1, 1);
    }
    return String.fromCharCode.apply(String, valueChars);
  }
  function scanString(jsxAttributeString) {
    if (jsxAttributeString === void 0) { jsxAttributeString = false; }
    var quote = text.charCodeAt(pos);
    pos++;
    var result = "";
    var start = pos;
    while (true) {
      if (pos >= end) {
        result += text.substring(start, pos);
        tokenFlags |= 4;
        error(ts.Diagnostics.Unterminated_string_literal);
        break;
      }
      var ch = text.charCodeAt(pos);
      if (ch === quote) {
        result += text.substring(start, pos);
        pos++;
        break;
      }
      if (ch === 92 && !jsxAttributeString) {
        result += text.substring(start, pos);
        result += scanEscapeSequence();
        start = pos;
        continue;
      }
      if (isLineBreak(ch) && !jsxAttributeString) {
        result += text.substring(start, pos);
        tokenFlags |= 4;
        error(ts.Diagnostics.Unterminated_string_literal);
        break;
      }
      pos++;
    }
    return result;
  }
  function scanTemplateAndSetTokenValue() {
    var startedWithBacktick = text.charCodeAt(pos) === 96;
    pos++;
    var start = pos;
    var contents = "";
    var resultingToken;
    while (true) {
      if (pos >= end) {
        contents += text.substring(start, pos);
        tokenFlags |= 4;
        error(ts.Diagnostics.Unterminated_template_literal);
        resultingToken = startedWithBacktick ? 14 : 17;
        break;
      }
      var currChar = text.charCodeAt(pos);
      if (currChar === 96) {
        contents += text.substring(start, pos);
        pos++;
        resultingToken = startedWithBacktick ? 14 : 17;
        break;
      }
      if (currChar === 36 && pos + 1 < end && text.charCodeAt(pos + 1) === 123) {
        contents += text.substring(start, pos);
        pos += 2;
        resultingToken = startedWithBacktick ? 15 : 16;
        break;
      }
      if (currChar === 92) {
        contents += text.substring(start, pos);
        contents += scanEscapeSequence();
        start = pos;
        continue;
      }
      if (currChar === 13) {
        contents += text.substring(start, pos);
        pos++;
        if (pos < end && text.charCodeAt(pos) === 10) {
          pos++;
        }
        contents += "\n";
        start = pos;
        continue;
      }
      pos++;
    }
    ts.Debug.assert(resultingToken !== undefined);
    tokenValue = contents;
    return resultingToken;
  }
  function scanEscapeSequence() {
    pos++;
    if (pos >= end) {
      error(ts.Diagnostics.Unexpected_end_of_text);
      return "";
    }
    var ch = text.charCodeAt(pos);
    pos++;
    switch (ch) {
      case 48:
        return "\0";
      case 98:
        return "\b";
      case 116:
        return "\t";
      case 110:
        return "\n";
      case 118:
        return "\v";
      case 102:
        return "\f";
      case 114:
        return "\r";
      case 39:
        return "\'";
      case 34:
        return "\"";
      case 117:
        if (pos < end && text.charCodeAt(pos) === 123) {
          tokenFlags |= 8;
          pos++;
          return scanExtendedUnicodeEscape();
        }
        tokenFlags |= 1024;
        return scanHexadecimalEscape(4);
      case 120:
        return scanHexadecimalEscape(2);
      case 13:
        if (pos < end && text.charCodeAt(pos) === 10) {
          pos++;
        }
      case 10:
      case 8232:
      case 8233:
        return "";
      default:
        return String.fromCharCode(ch);
    }
  }
  function scanHexadecimalEscape(numDigits) {
    var escapedValue = scanExactNumberOfHexDigits(numDigits, false);
    if (escapedValue >= 0) {
      return String.fromCharCode(escapedValue);
    }
    else {
      error(ts.Diagnostics.Hexadecimal_digit_expected);
      return "";
    }
  }
  function scanExtendedUnicodeEscape() {
    var escapedValueString = scanMinimumNumberOfHexDigits(1, false);
    var escapedValue = escapedValueString ? parseInt(escapedValueString, 16) : -1;
    var isInvalidExtendedEscape = false;
    if (escapedValue < 0) {
      error(ts.Diagnostics.Hexadecimal_digit_expected);
      isInvalidExtendedEscape = true;
    }
    else if (escapedValue > 0x10FFFF) {
      error(ts.Diagnostics.An_extended_Unicode_escape_value_must_be_between_0x0_and_0x10FFFF_inclusive);
      isInvalidExtendedEscape = true;
    }
    if (pos >= end) {
      error(ts.Diagnostics.Unexpected_end_of_text);
      isInvalidExtendedEscape = true;
    }
    else if (text.charCodeAt(pos) === 125) {
      pos++;
    }
    else {
      error(ts.Diagnostics.Unterminated_Unicode_escape_sequence);
      isInvalidExtendedEscape = true;
    }
    if (isInvalidExtendedEscape) {
      return "";
    }
    return utf16EncodeAsString(escapedValue);
  }
  function utf16EncodeAsString(codePoint) {
    ts.Debug.assert(0x0 <= codePoint && codePoint <= 0x10FFFF);
    if (codePoint <= 65535) {
      return String.fromCharCode(codePoint);
    }
    var codeUnit1 = Math.floor((codePoint - 65536) / 1024) + 0xD800;
    var codeUnit2 = ((codePoint - 65536) % 1024) + 0xDC00;
    return String.fromCharCode(codeUnit1, codeUnit2);
  }
  function peekUnicodeEscape() {
    if (pos + 5 < end && text.charCodeAt(pos + 1) === 117) {
      var start_1 = pos;
      pos += 2;
      var value = scanExactNumberOfHexDigits(4, false);
      pos = start_1;
      return value;
    }
    return -1;
  }
  function peekExtendedUnicodeEscape() {
    if (languageVersion >= 2 && codePointAt(text, pos + 1) === 117 && codePointAt(text, pos + 2) === 123) {
      var start_2 = pos;
      pos += 3;
      var escapedValueString = scanMinimumNumberOfHexDigits(1, false);
      var escapedValue = escapedValueString ? parseInt(escapedValueString, 16) : -1;
      pos = start_2;
      return escapedValue;
    }
    return -1;
  }
  function scanIdentifierParts() {
    var result = "";
    var start = pos;
    while (pos < end) {
      var ch = codePointAt(text, pos);
      if (isIdentifierPart(ch, languageVersion)) {
        pos += charSize(ch);
      }
      else if (ch === 92) {
        ch = peekExtendedUnicodeEscape();
        if (ch >= 0 && isIdentifierPart(ch, languageVersion)) {
          pos += 3;
          tokenFlags |= 8;
          result += scanExtendedUnicodeEscape();
          start = pos;
          continue;
        }
        ch = peekUnicodeEscape();
        if (!(ch >= 0 && isIdentifierPart(ch, languageVersion))) {
          break;
        }
        tokenFlags |= 1024;
        result += text.substring(start, pos);
        result += utf16EncodeAsString(ch);
        pos += 6;
        start = pos;
      }
      else {
        break;
      }
    }
    result += text.substring(start, pos);
    return result;
  }
  function getIdentifierToken() {
    var len = tokenValue.length;
    if (len >= 2 && len <= 11) {
      var ch = tokenValue.charCodeAt(0);
      if (ch >= 97 && ch <= 122) {
        var keyword = textToKeyword.get(tokenValue);
        if (keyword !== undefined) {
          return token = keyword;
        }
      }
    }
    return token = 75;
  }
  function scanBinaryOrOctalDigits(base) {
    var value = "";
    var separatorAllowed = false;
    var isPreviousTokenSeparator = false;
    while (true) {
      var ch = text.charCodeAt(pos);
      if (ch === 95) {
        tokenFlags |= 512;
        if (separatorAllowed) {
          separatorAllowed = false;
          isPreviousTokenSeparator = true;
        }
        else if (isPreviousTokenSeparator) {
          error(ts.Diagnostics.Multiple_consecutive_numeric_separators_are_not_permitted, pos, 1);
        }
        else {
          error(ts.Diagnostics.Numeric_separators_are_not_allowed_here, pos, 1);
        }
        pos++;
        continue;
      }
      separatorAllowed = true;
      if (!isDigit(ch) || ch - 48 >= base) {
        break;
      }
      value += text[pos];
      pos++;
      isPreviousTokenSeparator = false;
    }
    if (text.charCodeAt(pos - 1) === 95) {
      error(ts.Diagnostics.Numeric_separators_are_not_allowed_here, pos - 1, 1);
    }
    return value;
  }
  function checkBigIntSuffix() {
    if (text.charCodeAt(pos) === 110) {
      tokenValue += "n";
      if (tokenFlags & 384) {
        tokenValue = ts.parsePseudoBigInt(tokenValue) + "n";
      }
      pos++;
      return 9;
    }
    else {
      var numericValue = tokenFlags & 128
        ? parseInt(tokenValue.slice(2), 2)
        : tokenFlags & 256
          ? parseInt(tokenValue.slice(2), 8)
          : +tokenValue;
      tokenValue = "" + numericValue;
      return 8;
    }
  }
  function scan() {
    var _a;
    startPos = pos;
    tokenFlags = 0;
    var asteriskSeen = false;
    while (true) {
      tokenPos = pos;
      if (pos >= end) {
        return token = 1;
      }
      var ch = codePointAt(text, pos);
      if (ch === 35 && pos === 0 && isShebangTrivia(text, pos)) {
        pos = scanShebangTrivia(text, pos);
        if (skipTrivia) {
          continue;
        }
        else {
          return token = 6;
        }
      }
      switch (ch) {
        case 10:
        case 13:
          tokenFlags |= 1;
          if (skipTrivia) {
            pos++;
            continue;
          }
          else {
            if (ch === 13 && pos + 1 < end && text.charCodeAt(pos + 1) === 10) {
              pos += 2;
            }
            else {
              pos++;
            }
            return token = 4;
          }
        case 9:
        case 11:
        case 12:
        case 32:
        case 160:
        case 5760:
        case 8192:
        case 8193:
        case 8194:
        case 8195:
        case 8196:
        case 8197:
        case 8198:
        case 8199:
        case 8200:
        case 8201:
        case 8202:
        case 8203:
        case 8239:
        case 8287:
        case 12288:
        case 65279:
          if (skipTrivia) {
            pos++;
            continue;
          }
          else {
            while (pos < end && isWhiteSpaceSingleLine(text.charCodeAt(pos))) {
              pos++;
            }
            return token = 5;
          }
        case 33:
          if (text.charCodeAt(pos + 1) === 61) {
            if (text.charCodeAt(pos + 2) === 61) {
              return pos += 3, token = 37;
            }
            return pos += 2, token = 35;
          }
          pos++;
          return token = 53;
        case 34:
        case 39:
          tokenValue = scanString();
          return token = 10;
        case 96:
          return token = scanTemplateAndSetTokenValue();
        case 37:
          if (text.charCodeAt(pos + 1) === 61) {
            return pos += 2, token = 68;
          }
          pos++;
          return token = 44;
        case 38:
          if (text.charCodeAt(pos + 1) === 38) {
            return pos += 2, token = 55;
          }
          if (text.charCodeAt(pos + 1) === 61) {
            return pos += 2, token = 72;
          }
          pos++;
          return token = 50;
        case 40:
          pos++;
          return token = 20;
        case 41:
          pos++;
          return token = 21;
        case 42:
          if (text.charCodeAt(pos + 1) === 61) {
            return pos += 2, token = 65;
          }
          if (text.charCodeAt(pos + 1) === 42) {
            if (text.charCodeAt(pos + 2) === 61) {
              return pos += 3, token = 66;
            }
            return pos += 2, token = 42;
          }
          pos++;
          if (inJSDocType && !asteriskSeen && (tokenFlags & 1)) {
            asteriskSeen = true;
            continue;
          }
          return token = 41;
        case 43:
          if (text.charCodeAt(pos + 1) === 43) {
            return pos += 2, token = 45;
          }
          if (text.charCodeAt(pos + 1) === 61) {
            return pos += 2, token = 63;
          }
          pos++;
          return token = 39;
        case 44:
          pos++;
          return token = 27;
        case 45:
          if (text.charCodeAt(pos + 1) === 45) {
            return pos += 2, token = 46;
          }
          if (text.charCodeAt(pos + 1) === 61) {
            return pos += 2, token = 64;
          }
          pos++;
          return token = 40;
        case 46:
          if (isDigit(text.charCodeAt(pos + 1))) {
            tokenValue = scanNumber().value;
            return token = 8;
          }
          if (text.charCodeAt(pos + 1) === 46 && text.charCodeAt(pos + 2) === 46) {
            return pos += 3, token = 25;
          }
          pos++;
          return token = 24;
        case 47:
          if (text.charCodeAt(pos + 1) === 47) {
            pos += 2;
            while (pos < end) {
              if (isLineBreak(text.charCodeAt(pos))) {
                break;
              }
              pos++;
            }
            if (skipTrivia) {
              continue;
            }
            else {
              return token = 2;
            }
          }
          if (text.charCodeAt(pos + 1) === 42) {
            pos += 2;
            if (text.charCodeAt(pos) === 42 && text.charCodeAt(pos + 1) !== 47) {
              tokenFlags |= 2;
            }
            var commentClosed = false;
            while (pos < end) {
              var ch_1 = text.charCodeAt(pos);
              if (ch_1 === 42 && text.charCodeAt(pos + 1) === 47) {
                pos += 2;
                commentClosed = true;
                break;
              }
              if (isLineBreak(ch_1)) {
                tokenFlags |= 1;
              }
              pos++;
            }
            if (!commentClosed) {
              error(ts.Diagnostics.Asterisk_Slash_expected);
            }
            if (skipTrivia) {
              continue;
            }
            else {
              if (!commentClosed) {
                tokenFlags |= 4;
              }
              return token = 3;
            }
          }
          if (text.charCodeAt(pos + 1) === 61) {
            return pos += 2, token = 67;
          }
          pos++;
          return token = 43;
        case 48:
          if (pos + 2 < end && (text.charCodeAt(pos + 1) === 88 || text.charCodeAt(pos + 1) === 120)) {
            pos += 2;
            tokenValue = scanMinimumNumberOfHexDigits(1, true);
            if (!tokenValue) {
              error(ts.Diagnostics.Hexadecimal_digit_expected);
              tokenValue = "0";
            }
            tokenValue = "0x" + tokenValue;
            tokenFlags |= 64;
            return token = checkBigIntSuffix();
          }
          else if (pos + 2 < end && (text.charCodeAt(pos + 1) === 66 || text.charCodeAt(pos + 1) === 98)) {
            pos += 2;
            tokenValue = scanBinaryOrOctalDigits(2);
            if (!tokenValue) {
              error(ts.Diagnostics.Binary_digit_expected);
              tokenValue = "0";
            }
            tokenValue = "0b" + tokenValue;
            tokenFlags |= 128;
            return token = checkBigIntSuffix();
          }
          else if (pos + 2 < end && (text.charCodeAt(pos + 1) === 79 || text.charCodeAt(pos + 1) === 111)) {
            pos += 2;
            tokenValue = scanBinaryOrOctalDigits(8);
            if (!tokenValue) {
              error(ts.Diagnostics.Octal_digit_expected);
              tokenValue = "0";
            }
            tokenValue = "0o" + tokenValue;
            tokenFlags |= 256;
            return token = checkBigIntSuffix();
          }
          if (pos + 1 < end && isOctalDigit(text.charCodeAt(pos + 1))) {
            tokenValue = "" + scanOctalDigits();
            tokenFlags |= 32;
            return token = 8;
          }
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          (_a = scanNumber(), token = _a.type, tokenValue = _a.value);
          return token;
        case 58:
          pos++;
          return token = 58;
        case 59:
          pos++;
          return token = 26;
        case 60:
          if (isConflictMarkerTrivia(text, pos)) {
            pos = scanConflictMarkerTrivia(text, pos, error);
            if (skipTrivia) {
              continue;
            }
            else {
              return token = 7;
            }
          }
          if (text.charCodeAt(pos + 1) === 60) {
            if (text.charCodeAt(pos + 2) === 61) {
              return pos += 3, token = 69;
            }
            return pos += 2, token = 47;
          }
          if (text.charCodeAt(pos + 1) === 61) {
            return pos += 2, token = 32;
          }
          if (languageVariant === 1 &&
            text.charCodeAt(pos + 1) === 47 &&
            text.charCodeAt(pos + 2) !== 42) {
            return pos += 2, token = 30;
          }
          pos++;
          return token = 29;
        case 61:
          if (isConflictMarkerTrivia(text, pos)) {
            pos = scanConflictMarkerTrivia(text, pos, error);
            if (skipTrivia) {
              continue;
            }
            else {
              return token = 7;
            }
          }
          if (text.charCodeAt(pos + 1) === 61) {
            if (text.charCodeAt(pos + 2) === 61) {
              return pos += 3, token = 36;
            }
            return pos += 2, token = 34;
          }
          if (text.charCodeAt(pos + 1) === 62) {
            return pos += 2, token = 38;
          }
          pos++;
          return token = 62;
        case 62:
          if (isConflictMarkerTrivia(text, pos)) {
            pos = scanConflictMarkerTrivia(text, pos, error);
            if (skipTrivia) {
              continue;
            }
            else {
              return token = 7;
            }
          }
          pos++;
          return token = 31;
        case 63:
          pos++;
          if (text.charCodeAt(pos) === 46 && !isDigit(text.charCodeAt(pos + 1))) {
            pos++;
            return token = 28;
          }
          if (text.charCodeAt(pos) === 63) {
            pos++;
            return token = 60;
          }
          return token = 57;
        case 91:
          pos++;
          return token = 22;
        case 93:
          pos++;
          return token = 23;
        case 94:
          if (text.charCodeAt(pos + 1) === 61) {
            return pos += 2, token = 74;
          }
          pos++;
          return token = 52;
        case 123:
          pos++;
          return token = 18;
        case 124:
          if (isConflictMarkerTrivia(text, pos)) {
            pos = scanConflictMarkerTrivia(text, pos, error);
            if (skipTrivia) {
              continue;
            }
            else {
              return token = 7;
            }
          }
          if (text.charCodeAt(pos + 1) === 124) {
            return pos += 2, token = 56;
          }
          if (text.charCodeAt(pos + 1) === 61) {
            return pos += 2, token = 73;
          }
          pos++;
          return token = 51;
        case 125:
          pos++;
          return token = 19;
        case 126:
          pos++;
          return token = 54;
        case 64:
          pos++;
          return token = 59;
        case 92:
          var extendedCookedChar = peekExtendedUnicodeEscape();
          if (extendedCookedChar >= 0 && isIdentifierStart(extendedCookedChar, languageVersion)) {
            pos += 3;
            tokenFlags |= 8;
            tokenValue = scanExtendedUnicodeEscape() + scanIdentifierParts();
            return token = getIdentifierToken();
          }
          var cookedChar = peekUnicodeEscape();
          if (cookedChar >= 0 && isIdentifierStart(cookedChar, languageVersion)) {
            pos += 6;
            tokenFlags |= 1024;
            tokenValue = String.fromCharCode(cookedChar) + scanIdentifierParts();
            return token = getIdentifierToken();
          }
          error(ts.Diagnostics.Invalid_character);
          pos++;
          return token = 0;
        default:
          if (isIdentifierStart(ch, languageVersion)) {
            pos += charSize(ch);
            while (pos < end && isIdentifierPart(ch = codePointAt(text, pos), languageVersion))
              pos += charSize(ch);
            tokenValue = text.substring(tokenPos, pos);
            if (ch === 92) {
              tokenValue += scanIdentifierParts();
            }
            return token = getIdentifierToken();
          }
          else if (isWhiteSpaceSingleLine(ch)) {
            pos += charSize(ch);
            continue;
          }
          else if (isLineBreak(ch)) {
            tokenFlags |= 1;
            pos += charSize(ch);
            continue;
          }
          error(ts.Diagnostics.Invalid_character);
          pos += charSize(ch);
          return token = 0;
      }
    }
  }
  function reScanGreaterToken() {
    if (token === 31) {
      if (text.charCodeAt(pos) === 62) {
        if (text.charCodeAt(pos + 1) === 62) {
          if (text.charCodeAt(pos + 2) === 61) {
            return pos += 3, token = 71;
          }
          return pos += 2, token = 49;
        }
        if (text.charCodeAt(pos + 1) === 61) {
          return pos += 2, token = 70;
        }
        pos++;
        return token = 48;
      }
      if (text.charCodeAt(pos) === 61) {
        pos++;
        return token = 33;
      }
    }
    return token;
  }
  function reScanSlashToken() {
    if (token === 43 || token === 67) {
      var p = tokenPos + 1;
      var inEscape = false;
      var inCharacterClass = false;
      while (true) {
        if (p >= end) {
          tokenFlags |= 4;
          error(ts.Diagnostics.Unterminated_regular_expression_literal);
          break;
        }
        var ch = text.charCodeAt(p);
        if (isLineBreak(ch)) {
          tokenFlags |= 4;
          error(ts.Diagnostics.Unterminated_regular_expression_literal);
          break;
        }
        if (inEscape) {
          inEscape = false;
        }
        else if (ch === 47 && !inCharacterClass) {
          p++;
          break;
        }
        else if (ch === 91) {
          inCharacterClass = true;
        }
        else if (ch === 92) {
          inEscape = true;
        }
        else if (ch === 93) {
          inCharacterClass = false;
        }
        p++;
      }
      while (p < end && isIdentifierPart(text.charCodeAt(p), languageVersion)) {
        p++;
      }
      pos = p;
      tokenValue = text.substring(tokenPos, pos);
      token = 13;
    }
    return token;
  }
  function reScanTemplateToken() {
    ts.Debug.assert(token === 19, "'reScanTemplateToken' should only be called on a '}'");
    pos = tokenPos;
    return token = scanTemplateAndSetTokenValue();
  }
  function reScanJsxToken() {
    pos = tokenPos = startPos;
    return token = scanJsxToken();
  }
  function reScanLessThanToken() {
    if (token === 47) {
      pos = tokenPos + 1;
      return token = 29;
    }
    return token;
  }
  function reScanQuestionToken() {
    ts.Debug.assert(token === 60, "'reScanQuestionToken' should only be called on a '??'");
    pos = tokenPos + 1;
    return token = 57;
  }
  function scanJsxToken() {
    startPos = tokenPos = pos;
    if (pos >= end) {
      return token = 1;
    }
    var char = text.charCodeAt(pos);
    if (char === 60) {
      if (text.charCodeAt(pos + 1) === 47) {
        pos += 2;
        return token = 30;
      }
      pos++;
      return token = 29;
    }
    if (char === 123) {
      pos++;
      return token = 18;
    }
    var firstNonWhitespace = 0;
    while (pos < end) {
      char = text.charCodeAt(pos);
      if (char === 123) {
        break;
      }
      if (char === 60) {
        if (isConflictMarkerTrivia(text, pos)) {
          pos = scanConflictMarkerTrivia(text, pos, error);
          return token = 7;
        }
        break;
      }
      if (isLineBreak(char) && firstNonWhitespace === 0) {
        firstNonWhitespace = -1;
      }
      else if (!isWhiteSpaceLike(char)) {
        firstNonWhitespace = pos;
      }
      pos++;
    }
    tokenValue = text.substring(startPos, pos);
    return firstNonWhitespace === -1 ? 12 : 11;
  }
  function scanJsxIdentifier() {
    if (tokenIsIdentifierOrKeyword(token)) {
      while (pos < end) {
        var ch = text.charCodeAt(pos);
        if (ch === 45) {
          tokenValue += "-";
          pos++;
          continue;
        }
        var oldPos = pos;
        tokenValue += scanIdentifierParts();
        if (pos === oldPos) {
          break;
        }
      }
    }
    return token;
  }
  function scanJsxAttributeValue() {
    startPos = pos;
    switch (text.charCodeAt(pos)) {
      case 34:
      case 39:
        tokenValue = scanString(true);
        return token = 10;
      default:
        return scan();
    }
  }
  function scanJsDocToken() {
    startPos = tokenPos = pos;
    tokenFlags = 0;
    if (pos >= end) {
      return token = 1;
    }
    var ch = codePointAt(text, pos);
    pos += charSize(ch);
    switch (ch) {
      case 9:
      case 11:
      case 12:
      case 32:
        while (pos < end && isWhiteSpaceSingleLine(text.charCodeAt(pos))) {
          pos++;
        }
        return token = 5;
      case 64:
        return token = 59;
      case 10:
      case 13:
        tokenFlags |= 1;
        return token = 4;
      case 42:
        return token = 41;
      case 123:
        return token = 18;
      case 125:
        return token = 19;
      case 91:
        return token = 22;
      case 93:
        return token = 23;
      case 60:
        return token = 29;
      case 62:
        return token = 31;
      case 61:
        return token = 62;
      case 44:
        return token = 27;
      case 46:
        return token = 24;
      case 96:
        return token = 61;
      case 92:
        pos--;
        var extendedCookedChar = peekExtendedUnicodeEscape();
        if (extendedCookedChar >= 0 && isIdentifierStart(extendedCookedChar, languageVersion)) {
          pos += 3;
          tokenFlags |= 8;
          tokenValue = scanExtendedUnicodeEscape() + scanIdentifierParts();
          return token = getIdentifierToken();
        }
        var cookedChar = peekUnicodeEscape();
        if (cookedChar >= 0 && isIdentifierStart(cookedChar, languageVersion)) {
          pos += 6;
          tokenFlags |= 1024;
          tokenValue = String.fromCharCode(cookedChar) + scanIdentifierParts();
          return token = getIdentifierToken();
        }
        pos++;
        return token = 0;
    }
    if (isIdentifierStart(ch, languageVersion)) {
      var char = ch;
      while (pos < end && isIdentifierPart(char = codePointAt(text, pos), languageVersion) || text.charCodeAt(pos) === 45)
        pos += charSize(char);
      tokenValue = text.substring(tokenPos, pos);
      if (char === 92) {
        tokenValue += scanIdentifierParts();
      }
      return token = getIdentifierToken();
    }
    else {
      return token = 0;
    }
  }
  function speculationHelper(callback, isLookahead) {
    var savePos = pos;
    var saveStartPos = startPos;
    var saveTokenPos = tokenPos;
    var saveToken = token;
    var saveTokenValue = tokenValue;
    var saveTokenFlags = tokenFlags;
    var result = callback();
    if (!result || isLookahead) {
      pos = savePos;
      startPos = saveStartPos;
      tokenPos = saveTokenPos;
      token = saveToken;
      tokenValue = saveTokenValue;
      tokenFlags = saveTokenFlags;
    }
    return result;
  }
  function scanRange(start, length, callback) {
    var saveEnd = end;
    var savePos = pos;
    var saveStartPos = startPos;
    var saveTokenPos = tokenPos;
    var saveToken = token;
    var saveTokenValue = tokenValue;
    var saveTokenFlags = tokenFlags;
    setText(text, start, length);
    var result = callback();
    end = saveEnd;
    pos = savePos;
    startPos = saveStartPos;
    tokenPos = saveTokenPos;
    token = saveToken;
    tokenValue = saveTokenValue;
    tokenFlags = saveTokenFlags;
    return result;
  }
  function lookAhead(callback) {
    return speculationHelper(callback, true);
  }
  function tryScan(callback) {
    return speculationHelper(callback, false);
  }
  function getText() {
    return text;
  }
  function setText(newText, start, length) {
    text = newText || "";
    end = length === undefined ? text.length : start + length;
    setTextPos(start || 0);
  }
  function setOnError(errorCallback) {
    onError = errorCallback;
  }
  function setScriptTarget(scriptTarget) {
    languageVersion = scriptTarget;
  }
  function setLanguageVariant(variant) {
    languageVariant = variant;
  }
  function setTextPos(textPos) {
    ts.Debug.assert(textPos >= 0);
    pos = textPos;
    startPos = textPos;
    tokenPos = textPos;
    token = 0;
    tokenValue = undefined;
    tokenFlags = 0;
  }
  function setInJSDocType(inType) {
    inJSDocType += inType ? 1 : -1;
  }
}

