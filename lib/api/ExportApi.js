"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExportApi = exports.ExportFormat = void 0;

var _util = require("util");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ExportFormat;
/**
 * Saftely get a ket from the resource
 */

exports.ExportFormat = ExportFormat;

(function (ExportFormat) {
  ExportFormat["TSV"] = "TSV";
  ExportFormat["CSV"] = "CSV";
})(ExportFormat || (exports.ExportFormat = ExportFormat = {}));

function safeGet(key, reading) {
  // TODO: handle nested values
  var value = reading[key];

  if ((0, _util.isNullOrUndefined)(value)) {
    return "";
  }

  return "".concat(value);
}

var ExportApi =
/*#__PURE__*/
function () {
  function ExportApi() {
    _classCallCheck(this, ExportApi);
  }

  _createClass(ExportApi, null, [{
    key: "readingsToExport",
    value: function readingsToExport(readings, format) {
      var _this = this;

      return readings.reduce(function (acc, curr) {
        return acc + _this.formatReading(curr, format) + '\n';
      }, '');
    }
  }, {
    key: "formatReading",
    value: function formatReading(reading, format) {
      var separator = ",";

      if (format === ExportFormat.TSV) {
        separator = '\t';
      }

      var eligibleKeys = ['id', 'datetime', 'resourceId', 'resourceType', 'timeseriesId', 'value', //Mywell fields:
      'image', 'location'];
      var formatted = eligibleKeys.reduce(function (acc, curr) {
        return acc + safeGet(curr, reading) + separator;
      }, '');
      return formatted;
    }
  }]);

  return ExportApi;
}();

exports.ExportApi = ExportApi;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvRXhwb3J0QXBpLnRzIl0sIm5hbWVzIjpbIkV4cG9ydEZvcm1hdCIsInNhZmVHZXQiLCJrZXkiLCJyZWFkaW5nIiwidmFsdWUiLCJFeHBvcnRBcGkiLCJyZWFkaW5ncyIsImZvcm1hdCIsInJlZHVjZSIsImFjYyIsImN1cnIiLCJmb3JtYXRSZWFkaW5nIiwic2VwYXJhdG9yIiwiVFNWIiwiZWxpZ2libGVLZXlzIiwiZm9ybWF0dGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7O0lBR1lBLFk7QUFNWjs7Ozs7O1dBTllBLFk7QUFBQUEsRUFBQUEsWTtBQUFBQSxFQUFBQSxZO0dBQUFBLFksNEJBQUFBLFk7O0FBU1osU0FBU0MsT0FBVCxDQUFpQkMsR0FBakIsRUFBOEJDLE9BQTlCLEVBQXdEO0FBRXREO0FBRUEsTUFBSUMsS0FBVSxHQUFHRCxPQUFPLENBQUNELEdBQUQsQ0FBeEI7O0FBQ0EsTUFBSSw2QkFBa0JFLEtBQWxCLENBQUosRUFBOEI7QUFDNUIsV0FBTyxFQUFQO0FBQ0Q7O0FBRUQsbUJBQVVBLEtBQVY7QUFDRDs7SUFFWUMsUzs7Ozs7Ozs7O3FDQUVvQkMsUSxFQUFxQkMsTSxFQUE4QjtBQUFBOztBQUVoRixhQUFPRCxRQUFRLENBQUNFLE1BQVQsQ0FBZ0IsVUFBQ0MsR0FBRCxFQUFNQyxJQUFOLEVBQWU7QUFDcEMsZUFBT0QsR0FBRyxHQUFHLEtBQUksQ0FBQ0UsYUFBTCxDQUFtQkQsSUFBbkIsRUFBeUJILE1BQXpCLENBQU4sR0FBeUMsSUFBaEQ7QUFDRCxPQUZNLEVBRUwsRUFGSyxDQUFQO0FBR0Q7OztrQ0FFMkJKLE8sRUFBa0JJLE0sRUFBOEI7QUFDMUUsVUFBSUssU0FBUyxHQUFHLEdBQWhCOztBQUNBLFVBQUlMLE1BQU0sS0FBS1AsWUFBWSxDQUFDYSxHQUE1QixFQUFpQztBQUMvQkQsUUFBQUEsU0FBUyxHQUFHLElBQVo7QUFDRDs7QUFFRCxVQUFNRSxZQUFZLEdBQUcsQ0FDbkIsSUFEbUIsRUFFbkIsVUFGbUIsRUFHbkIsWUFIbUIsRUFJbkIsY0FKbUIsRUFLbkIsY0FMbUIsRUFNbkIsT0FObUIsRUFRbkI7QUFDQSxhQVRtQixFQVVuQixVQVZtQixDQUFyQjtBQWFBLFVBQU1DLFNBQVMsR0FBR0QsWUFBWSxDQUFDTixNQUFiLENBQW9CLFVBQUNDLEdBQUQsRUFBTUMsSUFBTixFQUFlO0FBQ25ELGVBQU9ELEdBQUcsR0FBR1IsT0FBTyxDQUFDUyxJQUFELEVBQU9QLE9BQVAsQ0FBYixHQUErQlMsU0FBdEM7QUFDRCxPQUZpQixFQUVmLEVBRmUsQ0FBbEI7QUFJQSxhQUFPRyxTQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWFkaW5nIH0gZnJvbSBcIi4uL21vZGVsXCI7XG5pbXBvcnQgeyBpc051bGxPclVuZGVmaW5lZCB9IGZyb20gXCJ1dGlsXCI7XG5cblxuZXhwb3J0IGVudW0gRXhwb3J0Rm9ybWF0IHtcbiAgVFNWPSdUU1YnLFxuICBDU1Y9J0NTVicsXG59XG5cblxuLyoqXG4gKiBTYWZ0ZWx5IGdldCBhIGtldCBmcm9tIHRoZSByZXNvdXJjZVxuICovXG5mdW5jdGlvbiBzYWZlR2V0KGtleTogc3RyaW5nLCByZWFkaW5nOiBSZWFkaW5nKTogc3RyaW5nIHtcblxuICAvLyBUT0RPOiBoYW5kbGUgbmVzdGVkIHZhbHVlc1xuICAvL0B0cy1pZ25vcmVcbiAgbGV0IHZhbHVlOiBhbnkgPSByZWFkaW5nW2tleV07XG4gIGlmIChpc051bGxPclVuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIHJldHVybiBgJHt2YWx1ZX1gO1xufVxuXG5leHBvcnQgY2xhc3MgRXhwb3J0QXBpIHtcblxuICBwdWJsaWMgc3RhdGljIHJlYWRpbmdzVG9FeHBvcnQocmVhZGluZ3M6IFJlYWRpbmdbXSwgZm9ybWF0OiBFeHBvcnRGb3JtYXQpOiBzdHJpbmcge1xuICAgIFxuICAgIHJldHVybiByZWFkaW5ncy5yZWR1Y2UoKGFjYywgY3VycikgPT4ge1xuICAgICAgcmV0dXJuIGFjYyArIHRoaXMuZm9ybWF0UmVhZGluZyhjdXJyLCBmb3JtYXQpICsgJ1xcbidcbiAgICB9LCcnKVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmb3JtYXRSZWFkaW5nKHJlYWRpbmc6IFJlYWRpbmcsIGZvcm1hdDogRXhwb3J0Rm9ybWF0KTogc3RyaW5nIHtcbiAgICBsZXQgc2VwYXJhdG9yID0gXCIsXCI7XG4gICAgaWYgKGZvcm1hdCA9PT0gRXhwb3J0Rm9ybWF0LlRTVikge1xuICAgICAgc2VwYXJhdG9yID0gJ1xcdCc7XG4gICAgfVxuXG4gICAgY29uc3QgZWxpZ2libGVLZXlzID0gW1xuICAgICAgJ2lkJyxcbiAgICAgICdkYXRldGltZScsXG4gICAgICAncmVzb3VyY2VJZCcsXG4gICAgICAncmVzb3VyY2VUeXBlJyxcbiAgICAgICd0aW1lc2VyaWVzSWQnLFxuICAgICAgJ3ZhbHVlJyxcblxuICAgICAgLy9NeXdlbGwgZmllbGRzOlxuICAgICAgJ2ltYWdlJyxcbiAgICAgICdsb2NhdGlvbicsXG4gICAgXTtcblxuICAgIGNvbnN0IGZvcm1hdHRlZCA9IGVsaWdpYmxlS2V5cy5yZWR1Y2UoKGFjYywgY3VycikgPT4ge1xuICAgICAgcmV0dXJuIGFjYyArIHNhZmVHZXQoY3VyciwgcmVhZGluZykgKyBzZXBhcmF0b3I7XG4gICAgfSwgJycpO1xuXG4gICAgcmV0dXJuIGZvcm1hdHRlZDtcbiAgfVxuXG5cblxufSJdfQ==