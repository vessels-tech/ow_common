"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.possibleTranslationsForOrg = possibleTranslationsForOrg;
exports.translationsForTranslationOrg = translationsForTranslationOrg;
exports.getTranslationForLanguage = getTranslationForLanguage;
exports.translationFromJSON = translationFromJSON;
Object.defineProperty(exports, "TranslationOrg", {
  enumerable: true,
  get: function get() {
    return _Types.TranslationOrg;
  }
});
Object.defineProperty(exports, "TranslationFiles", {
  enumerable: true,
  get: function get() {
    return _Types.TranslationFiles;
  }
});
Object.defineProperty(exports, "TranslationEnum", {
  enumerable: true,
  get: function get() {
    return _Types.TranslationEnum;
  }
});
Object.defineProperty(exports, "TranslationFile", {
  enumerable: true,
  get: function get() {
    return _Types.TranslationFile;
  }
});
Object.defineProperty(exports, "TranslationOverrideFile", {
  enumerable: true,
  get: function get() {
    return _Types.TranslationOverrideFile;
  }
});
exports.functionReviver = exports.functionReplacer = void 0;

var _Types = require("./Types");

var _en_AU = require("./common/en_AU");

var _en_US = require("./common/en_US");

var _guj_IN = require("./common/guj_IN");

var _hi_IN = require("./common/hi_IN");

var _test_UPPER = require("./common/test_UPPER");

var _fr_FR = require("./common/fr_FR");

var _es_ES = require("./common/es_ES");

var _en_AU2 = require("./ggmn/en_AU");

var _fr_FR2 = require("./ggmn/fr_FR");

var _es_ES2 = require("./ggmn/es_ES");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Get a list of the possible Translations for a given org
 */
function possibleTranslationsForOrg(orgId) {
  switch (orgId) {
    case _Types.TranslationOrg.mywell:
      {
        return [_Types.TranslationEnum.en_AU, _Types.TranslationEnum.en_US, _Types.TranslationEnum.guj_IN, _Types.TranslationEnum.hi_IN];
      }

    case _Types.TranslationOrg.ggmn:
      {
        return [_Types.TranslationEnum.en_AU, // TranslationEnum.test_UPPER,
        _Types.TranslationEnum.fr_FR, _Types.TranslationEnum.es_ES];
      }
  }
}
/**
 * This is the root translations file. 
 * 
 * Include this to get the magical translations working.
 * 
 * In this class, we pull in the common translations, and override any
 * values for the given orgId if they exist.
 */


function translationsForTranslationOrg(orgId) {
  switch (orgId) {
    case _Types.TranslationOrg.mywell:
      {
        return {
          type: _Types.TranslationOrg.mywell,
          en_AU: _en_AU.en_AU,
          en_US: _en_US.en_US,
          guj_IN: _guj_IN.guj_IN,
          hi_IN: _hi_IN.hi_IN,
          test_UPPER: _test_UPPER.test_UPPER
        };
      }

    case _Types.TranslationOrg.ggmn:
      {
        return {
          type: _Types.TranslationOrg.ggmn,
          en_AU: mergeFiles(_en_AU.en_AU, _en_AU2.ggmn_en_AU),
          fr_FR: mergeFiles(_fr_FR.fr_FR, _fr_FR2.ggmn_fr_FR),
          es_ES: mergeFiles(_es_ES.es_ES, _es_ES2.ggmn_es_ES),
          test_UPPER: _test_UPPER.test_UPPER
        };
      }
  }
}

function mergeFiles(original, overrideFile) {
  if (overrideFile === null) {
    return original;
  }

  var newTemplates = Object.assign(original.templates, null, _objectSpread({}, overrideFile.overrides));
  original.templates = newTemplates;
  return original;
}
/**
 * Get the translations for the given user language setting
 * 
 * I'm thinking of a better way to do this with less typing, but at least
 * this method is fully type safe
 */


function getTranslationForLanguage(files, language) {
  switch (files.type) {
    case _Types.TranslationOrg.mywell:
      {
        switch (language) {
          case 'en_AU':
            return files.en_AU;

          case 'en_US':
            return files.en_US;

          case 'guj_IN':
            return files.guj_IN;

          case 'hi_IN':
            return files.hi_IN;

          case 'test_UPPER':
            return files.test_UPPER;

          default:
            {
              throw new Error("Error with translations. Could not find translation: ".concat(language, " for Org: ").concat(files.type));
            }
        }
      }

    case _Types.TranslationOrg.ggmn:
      {
        switch (language) {
          case 'en_AU':
            return files.en_AU;

          case 'test_UPPER':
            return files.test_UPPER;

          case 'fr_FR':
            return files.fr_FR;

          case 'es_ES':
            return files.es_ES;

          default:
            {
              throw new Error("Error with translations. Could not find translation: ".concat(language, " for Org: ").concat(files.type));
            }
        }
      }
  }
}
/**
 * Tools for saving and parsing translations as json
 */


var functionReplacer = function functionReplacer(name, val) {
  if (typeof val === 'function') {
    var entire = val.toString();
    var arg = entire.slice(entire.indexOf("(") + 1, entire.indexOf(")"));
    var body = entire.slice(entire.indexOf("{") + 1, entire.lastIndexOf("}"));
    return {
      type: 'function',
      arguments: arg,
      body: body
    };
  }

  return val;
};

exports.functionReplacer = functionReplacer;

var functionReviver = function functionReviver(name, val) {
  if (_typeof(val) === 'object' && val.type === 'function') {
    return new Function(val.arguments, val.body);
  }

  return val;
};

exports.functionReviver = functionReviver;

function translationFromJSON(jsonString) {
  var files = JSON.parse(jsonString, functionReviver);
  return files;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJwb3NzaWJsZVRyYW5zbGF0aW9uc0Zvck9yZyIsIm9yZ0lkIiwiVHJhbnNsYXRpb25PcmciLCJteXdlbGwiLCJUcmFuc2xhdGlvbkVudW0iLCJlbl9BVSIsImVuX1VTIiwiZ3VqX0lOIiwiaGlfSU4iLCJnZ21uIiwiZnJfRlIiLCJlc19FUyIsInRyYW5zbGF0aW9uc0ZvclRyYW5zbGF0aW9uT3JnIiwidHlwZSIsInRlc3RfVVBQRVIiLCJtZXJnZUZpbGVzIiwiZ2dtbl9lbl9BVSIsImdnbW5fZnJfRlIiLCJnZ21uX2VzX0VTIiwib3JpZ2luYWwiLCJvdmVycmlkZUZpbGUiLCJuZXdUZW1wbGF0ZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0ZW1wbGF0ZXMiLCJvdmVycmlkZXMiLCJnZXRUcmFuc2xhdGlvbkZvckxhbmd1YWdlIiwiZmlsZXMiLCJsYW5ndWFnZSIsIkVycm9yIiwiZnVuY3Rpb25SZXBsYWNlciIsIm5hbWUiLCJ2YWwiLCJlbnRpcmUiLCJ0b1N0cmluZyIsImFyZyIsInNsaWNlIiwiaW5kZXhPZiIsImJvZHkiLCJsYXN0SW5kZXhPZiIsImFyZ3VtZW50cyIsImZ1bmN0aW9uUmV2aXZlciIsIkZ1bmN0aW9uIiwidHJhbnNsYXRpb25Gcm9tSlNPTiIsImpzb25TdHJpbmciLCJKU09OIiwicGFyc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBV0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBSUE7OztBQUdPLFNBQVNBLDBCQUFULENBQW9DQyxLQUFwQyxFQUE4RTtBQUNuRixVQUFRQSxLQUFSO0FBQ0UsU0FBS0Msc0JBQWVDLE1BQXBCO0FBQTRCO0FBQzFCLGVBQU8sQ0FDTEMsdUJBQWdCQyxLQURYLEVBRUxELHVCQUFnQkUsS0FGWCxFQUdMRix1QkFBZ0JHLE1B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QXVCSCxlQUF2QixDQUFoQztBQUNBLFNBQU9kLEtBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zbGF0aW9uT3JnLCBUcmFuc2xhdGlvbkZpbGVzLCBUcmFuc2xhdGlvbkVudW0sIFRyYW5zbGF0aW9uRmlsZSwgVHJhbnNsYXRpb25PdmVycmlkZUZpbGUgfSBmcm9tIFwiLi9UeXBlc1wiO1xuXG5pbXBvcnQge2VuX0FVfSBmcm9tICcuL2NvbW1vbi9lbl9BVSc7XG5pbXBvcnQge2VuX1VTfSBmcm9tICcuL2NvbW1vbi9lbl9VUyc7XG5pbXBvcnQge2d1al9JTn0gZnJvbSAnLi9jb21tb24vZ3VqX0lOJztcbmltcG9ydCB7aGlfSU59IGZyb20gJy4vY29tbW9uL2hpX0lOJztcbmltcG9ydCB7dGVzdF9VUFBFUn0gZnJvbSAnLi9jb21tb24vdGVzdF9VUFBFUic7XG5pbXBvcnQge2ZyX0ZSfSBmcm9tICcuL2NvbW1vbi9mcl9GUic7XG5pbXBvcnQge2VzX0VTfSBmcm9tICcuL2NvbW1vbi9lc19FUyc7XG5cbi8vVGVtcCB0byBnZXQgYnVpbGRpbmdcbi8vIGNvbnN0IGVuX1VTID0gZW5fQVU7XG4vLyBjb25zdCBndWpfSU4gPSBlbl9BVTtcbi8vIGNvbnN0IGhpX0lOID0gZW5fQVU7XG4vLyBjb25zdCB0ZXN0X1VQUEVSID0gZW5fQVU7XG4vLyBjb25zdCBmcl9GUiA9IGVuX0FVO1xuLy8gY29uc3QgZXNfRVMgPSBlbl9BVTtcblxuXG5pbXBvcnQgeyBnZ21uX2VuX0FVIH0gZnJvbSAnLi9nZ21uL2VuX0FVJztcbmltcG9ydCB7IGdnbW5fZnJfRlIgfSBmcm9tICcuL2dnbW4vZnJfRlInO1xuaW1wb3J0IHsgZ2dtbl9lc19FUyB9IGZyb20gJy4vZ2dtbi9lc19FUyc7XG5cblxuXG4vKipcbiAqIEdldCBhIGxpc3Qgb2YgdGhlIHBvc3NpYmxlIFRyYW5zbGF0aW9ucyBmb3IgYSBnaXZlbiBvcmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBvc3NpYmxlVHJhbnNsYXRpb25zRm9yT3JnKG9yZ0lkOiBUcmFuc2xhdGlvbk9yZyk6IFRyYW5zbGF0aW9uRW51bVtdIHtcbiAgc3dpdGNoIChvcmdJZCkge1xuICAgIGNhc2UgVHJhbnNsYXRpb25PcmcubXl3ZWxsOiB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICBUcmFuc2xhdGlvbkVudW0uZW5fQVUsXG4gICAgICAgIFRyYW5zbGF0aW9uRW51bS5lbl9VUyxcbiAgICAgICAgVHJhbnNsYXRpb25FbnVtLmd1al9JTixcbiAgICAgICAgVHJhbnNsYXRpb25FbnVtLmhpX0lOLFxuICAgICAgICAvL1RPRE86IGhvdyB0byBrZWVwIG9ubHkgaW4gZGV2LCBidXQgbm90IHByb2R1Y3Rpb24/XG4gICAgICAgIC8vIFRyYW5zbGF0aW9uRW51bS50ZXN0X1VQUEVSLFxuICAgICAgXVxuICAgIH1cbiAgICBjYXNlIFRyYW5zbGF0aW9uT3JnLmdnbW46IHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIFRyYW5zbGF0aW9uRW51bS5lbl9BVSxcbiAgICAgICAgLy8gVHJhbnNsYXRpb25FbnVtLnRlc3RfVVBQRVIsXG4gICAgICAgIFRyYW5zbGF0aW9uRW51bS5mcl9GUixcbiAgICAgICAgVHJhbnNsYXRpb25FbnVtLmVzX0VTLFxuICAgICAgXVxuICAgIH1cbiAgfVxufVxuXG5cbi8qKlxuICogVGhpcyBpcyB0aGUgcm9vdCB0cmFuc2xhdGlvbnMgZmlsZS4gXG4gKiBcbiAqIEluY2x1ZGUgdGhpcyB0byBnZXQgdGhlIG1hZ2ljYWwgdHJhbnNsYXRpb25zIHdvcmtpbmcuXG4gKiBcbiAqIEluIHRoaXMgY2xhc3MsIHdlIHB1bGwgaW4gdGhlIGNvbW1vbiB0cmFuc2xhdGlvbnMsIGFuZCBvdmVycmlkZSBhbnlcbiAqIHZhbHVlcyBmb3IgdGhlIGdpdmVuIG9yZ0lkIGlmIHRoZXkgZXhpc3QuXG4gKi9cbiBleHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRpb25zRm9yVHJhbnNsYXRpb25Pcmcob3JnSWQ6IFRyYW5zbGF0aW9uT3JnKTogVHJhbnNsYXRpb25GaWxlcyB7XG4gIHN3aXRjaCAob3JnSWQpIHtcbiAgICBjYXNlIFRyYW5zbGF0aW9uT3JnLm15d2VsbDoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogVHJhbnNsYXRpb25PcmcubXl3ZWxsLFxuICAgICAgICBlbl9BVSxcbiAgICAgICAgZW5fVVMsXG4gICAgICAgIGd1al9JTixcbiAgICAgICAgaGlfSU4sXG4gICAgICAgIHRlc3RfVVBQRVIsXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FzZSBUcmFuc2xhdGlvbk9yZy5nZ21uOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBUcmFuc2xhdGlvbk9yZy5nZ21uLFxuICAgICAgICBlbl9BVTogbWVyZ2VGaWxlcyhlbl9BVSwgZ2dtbl9lbl9BVSksXG4gICAgICAgIGZyX0ZSOiBtZXJnZUZpbGVzKGZyX0ZSLCBnZ21uX2ZyX0ZSKSxcbiAgICAgICAgZXNfRVM6IG1lcmdlRmlsZXMoZXNfRVMsIGdnbW5fZXNfRVMpLFxuICAgICAgICB0ZXN0X1VQUEVSLFxuICAgICAgfVxuICAgIH1cbiAgfVxufSBcblxuXG5mdW5jdGlvbiBtZXJnZUZpbGVzKG9yaWdpbmFsOiBUcmFuc2xhdGlvbkZpbGUsIG92ZXJyaWRlRmlsZTogVHJhbnNsYXRpb25PdmVycmlkZUZpbGUgfCBudWxsKTogVHJhbnNsYXRpb25GaWxlIHtcbiAgaWYgKG92ZXJyaWRlRmlsZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBvcmlnaW5hbDtcbiAgfVxuXG4gIGNvbnN0IG5ld1RlbXBsYXRlcyA9IE9iamVjdC5hc3NpZ24ob3JpZ2luYWwudGVtcGxhdGVzLCBudWxsLCB7IC4uLm92ZXJyaWRlRmlsZS5vdmVycmlkZXMgfSk7XG4gIG9yaWdpbmFsLnRlbXBsYXRlcyA9IG5ld1RlbXBsYXRlcztcblxuICByZXR1cm4gb3JpZ2luYWw7XG59XG5cbi8qKlxuICogR2V0IHRoZSB0cmFuc2xhdGlvbnMgZm9yIHRoZSBnaXZlbiB1c2VyIGxhbmd1YWdlIHNldHRpbmdcbiAqIFxuICogSSdtIHRoaW5raW5nIG9mIGEgYmV0dGVyIHdheSB0byBkbyB0aGlzIHdpdGggbGVzcyB0eXBpbmcsIGJ1dCBhdCBsZWFzdFxuICogdGhpcyBtZXRob2QgaXMgZnVsbHkgdHlwZSBzYWZlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2xhdGlvbkZvckxhbmd1YWdlKGZpbGVzOiBUcmFuc2xhdGlvbkZpbGVzLCBsYW5ndWFnZTogVHJhbnNsYXRpb25FbnVtKSB7XG4gIHN3aXRjaCAoZmlsZXMudHlwZSkge1xuICAgIGNhc2UgKFRyYW5zbGF0aW9uT3JnLm15d2VsbCk6IHtcbiAgICAgIHN3aXRjaCAobGFuZ3VhZ2UpIHtcbiAgICAgICAgY2FzZSAnZW5fQVUnOiByZXR1cm4gZmlsZXMuZW5fQVU7XG4gICAgICAgIGNhc2UgJ2VuX1VTJzogcmV0dXJuIGZpbGVzLmVuX1VTO1xuICAgICAgICBjYXNlICdndWpfSU4nOiByZXR1cm4gZmlsZXMuZ3VqX0lOO1xuICAgICAgICBjYXNlICdoaV9JTic6IHJldHVybiBmaWxlcy5oaV9JTjtcbiAgICAgICAgY2FzZSAndGVzdF9VUFBFUic6IHJldHVybiBmaWxlcy50ZXN0X1VQUEVSO1xuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciB3aXRoIHRyYW5zbGF0aW9ucy4gQ291bGQgbm90IGZpbmQgdHJhbnNsYXRpb246ICR7bGFuZ3VhZ2V9IGZvciBPcmc6ICR7ZmlsZXMudHlwZX1gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjYXNlIChUcmFuc2xhdGlvbk9yZy5nZ21uKToge1xuICAgICAgc3dpdGNoIChsYW5ndWFnZSkge1xuICAgICAgICBjYXNlICdlbl9BVSc6IHJldHVybiBmaWxlcy5lbl9BVTtcbiAgICAgICAgY2FzZSAndGVzdF9VUFBFUic6IHJldHVybiBmaWxlcy50ZXN0X1VQUEVSO1xuICAgICAgICBjYXNlICdmcl9GUic6IHJldHVybiBmaWxlcy5mcl9GUjtcbiAgICAgICAgY2FzZSAnZXNfRVMnOiByZXR1cm4gZmlsZXMuZXNfRVM7XG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIHdpdGggdHJhbnNsYXRpb25zLiBDb3VsZCBub3QgZmluZCB0cmFuc2xhdGlvbjogJHtsYW5ndWFnZX0gZm9yIE9yZzogJHtmaWxlcy50eXBlfWApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogVG9vbHMgZm9yIHNhdmluZyBhbmQgcGFyc2luZyB0cmFuc2xhdGlvbnMgYXMganNvblxuICovXG5leHBvcnQgY29uc3QgZnVuY3Rpb25SZXBsYWNlciA9IChuYW1lOiBhbnksIHZhbDogYW55KSA9PiB7XG4gIGlmICh0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3QgZW50aXJlID0gdmFsLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgYXJnID0gZW50aXJlLnNsaWNlKGVudGlyZS5pbmRleE9mKFwiKFwiKSArIDEsIGVudGlyZS5pbmRleE9mKFwiKVwiKSk7XG4gICAgY29uc3QgYm9keSA9IGVudGlyZS5zbGljZShlbnRpcmUuaW5kZXhPZihcIntcIikgKyAxLCBlbnRpcmUubGFzdEluZGV4T2YoXCJ9XCIpKTtcblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnZnVuY3Rpb24nLFxuICAgICAgYXJndW1lbnRzOiBhcmcsXG4gICAgICBib2R5LFxuICAgIH07XG4gIH1cblxuICByZXR1cm4gdmFsO1xufVxuXG5cbmV4cG9ydCBjb25zdCBmdW5jdGlvblJldml2ZXIgPSAobmFtZTogYW55LCB2YWw6IGFueSkgPT4ge1xuXG4gIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwudHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBuZXcgRnVuY3Rpb24odmFsLmFyZ3VtZW50cywgdmFsLmJvZHkpO1xuICB9XG5cbiAgcmV0dXJuIHZhbDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRpb25Gcm9tSlNPTihqc29uU3RyaW5nOiBzdHJpbmcpOiBUcmFuc2xhdGlvbkZpbGVzIHtcbiAgY29uc3QgZmlsZXM6IFRyYW5zbGF0aW9uRmlsZXMgPSBKU09OLnBhcnNlKGpzb25TdHJpbmcsIGZ1bmN0aW9uUmV2aXZlcik7XG4gIHJldHVybiBmaWxlc1xufVxuXG5leHBvcnQge1xuICBUcmFuc2xhdGlvbk9yZyxcbiAgVHJhbnNsYXRpb25GaWxlcyxcbiAgVHJhbnNsYXRpb25FbnVtLFxuICBUcmFuc2xhdGlvbkZpbGUsXG4gIFRyYW5zbGF0aW9uT3ZlcnJpZGVGaWxlLFxufTsiXX0=