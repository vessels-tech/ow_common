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

      var eligibleKeys = [{
        id: 'id',
        accessor: function accessor(id) {
          return safeGet(id, reading);
        }
      }, //Handle legacy timestamps from Firestore
      {
        id: 'datetime',
        accessor: function accessor(id) {
          //@ts-ignore
          var dateRaw = reading[id];

          if ((0, _util.isNullOrUndefined)(dateRaw)) {
            return "";
          } // @ts-ignore


          if (dateRaw.toDate) {
            // @ts-ignore
            var jsDate = dateRaw.toDate();
            return jsDate.toISOString();
          }

          return dateRaw;
        }
      }, {
        id: 'resourceId',
        accessor: function accessor(id) {
          return safeGet(id, reading);
        }
      }, {
        id: 'resourceType',
        accessor: function accessor(id) {
          return safeGet(id, reading);
        }
      }, {
        id: 'timeseriesId',
        accessor: function accessor(id) {
          return safeGet(id, reading);
        }
      }, {
        id: 'value',
        accessor: function accessor(id) {
          return safeGet(id, reading);
        }
      }, //Mywell fields:
      {
        id: 'image',
        accessor: function accessor(id) {
          return safeGet(id, reading);
        }
      }, {
        id: 'location',
        accessor: function accessor(id) {
          return safeGet(id, reading);
        }
      }];
      var formatted = eligibleKeys.reduce(function (acc, curr) {
        return acc + curr.accessor(curr.id) + separator;
      }, '');
      return formatted;
    }
  }]);

  return ExportApi;
}();

exports.ExportApi = ExportApi;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvRXhwb3J0QXBpLnRzIl0sIm5hbWVzIjpbIkV4cG9ydEZvcm1hdCIsInNhZmVHZXQiLCJrZXkiLCJyZWFkaW5nIiwidmFsdWUiLCJFeHBvcnRBcGkiLCJyZWFkaW5ncyIsImZvcm1hdCIsInJlZHVjZSIsImFjYyIsImN1cnIiLCJmb3JtYXRSZWFkaW5nIiwic2VwYXJhdG9yIiwiVFNWIiwiZWxpZ2libGVLZXlzIiwiaWQiLCJhY2Nlc3NvciIsImRhdGVSYXciLCJ0b0RhdGUiLCJqc0RhdGUiLCJ0b0lTT1N0cmluZyIsImZvcm1hdHRlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7OztJQUdZQSxZO0FBTVo7Ozs7OztXQU5ZQSxZO0FBQUFBLEVBQUFBLFk7QUFBQUEsRUFBQUEsWTtHQUFBQSxZLDRCQUFBQSxZOztBQVNaLFNBQVNDLE9BQVQsQ0FBaUJDLEdBQWpCLEVBQThCQyxPQUE5QixFQUF3RDtBQUV0RDtBQUVBLE1BQUlDLEtBQVUsR0FBR0QsT0FBTyxDQUFDRCxHQUFELENBQXhCOztBQUNBLE1BQUksNkJBQWtCRSxLQUFsQixDQUFKLEVBQThCO0FBQzVCLFdBQU8sRUFBUDtBQUNEOztBQUVELG1CQUFVQSxLQUFWO0FBQ0Q7O0lBRVlDLFM7Ozs7Ozs7OztxQ0FFb0JDLFEsRUFBcUJDLE0sRUFBOEI7QUFBQTs7QUFDaEYsYUFBT0QsUUFBUSxDQUFDRSxNQUFULENBQWdCLFVBQUNDLEdBQUQsRUFBTUMsSUFBTjtBQUFBLGVBQWVELEdBQUcsR0FBRyxLQUFJLENBQUNFLGFBQUwsQ0FBbUJELElBQW5CLEVBQXlCSCxNQUF6QixDQUFOLEdBQXlDLElBQXhEO0FBQUEsT0FBaEIsRUFBNkUsRUFBN0UsQ0FBUDtBQUNEOzs7a0NBRTJCSixPLEVBQWtCSSxNLEVBQThCO0FBQzFFLFVBQUlLLFNBQVMsR0FBRyxHQUFoQjs7QUFDQSxVQUFJTCxNQUFNLEtBQUtQLFlBQVksQ0FBQ2EsR0FBNUIsRUFBaUM7QUFDL0JELFFBQUFBLFNBQVMsR0FBRyxJQUFaO0FBQ0Q7O0FBRUQsVUFBTUUsWUFBbUUsR0FBRyxDQUMxRTtBQUFDQyxRQUFBQSxFQUFFLEVBQUUsSUFBTDtBQUFXQyxRQUFBQSxRQUFRLEVBQUUsa0JBQUNELEVBQUQ7QUFBQSxpQkFBZ0JkLE9BQU8sQ0FBQ2MsRUFBRCxFQUFLWixPQUFMLENBQXZCO0FBQUE7QUFBckIsT0FEMEUsRUFHMUU7QUFDQTtBQUFDWSxRQUFBQSxFQUFFLEVBQUUsVUFBTDtBQUFpQkMsUUFBQUEsUUFBUSxFQUFFLGtCQUFDRCxFQUFELEVBQWdCO0FBQ3pDO0FBQ0EsY0FBSUUsT0FBWSxHQUFHZCxPQUFPLENBQUNZLEVBQUQsQ0FBMUI7O0FBQ0EsY0FBSSw2QkFBa0JFLE9BQWxCLENBQUosRUFBZ0M7QUFDOUIsbUJBQU8sRUFBUDtBQUNELFdBTHdDLENBT3pDOzs7QUFDQSxjQUFJQSxPQUFPLENBQUNDLE1BQVosRUFBb0I7QUFDbEI7QUFDQSxnQkFBTUMsTUFBWSxHQUFHRixPQUFPLENBQUNDLE1BQVIsRUFBckI7QUFDQSxtQkFBT0MsTUFBTSxDQUFDQyxXQUFQLEVBQVA7QUFDRDs7QUFFRCxpQkFBT0gsT0FBUDtBQUNEO0FBZkQsT0FKMEUsRUFvQjFFO0FBQUNGLFFBQUFBLEVBQUUsRUFBRSxZQUFMO0FBQW1CQyxRQUFBQSxRQUFRLEVBQUUsa0JBQUNELEVBQUQ7QUFBQSxpQkFBZ0JkLE9BQU8sQ0FBQ2MsRUFBRCxFQUFLWixPQUFMLENBQXZCO0FBQUE7QUFBN0IsT0FwQjBFLEVBcUIxRTtBQUFDWSxRQUFBQSxFQUFFLEVBQUUsY0FBTDtBQUFxQkMsUUFBQUEsUUFBUSxFQUFFLGtCQUFDRCxFQUFEO0FBQUEsaUJBQWdCZCxPQUFPLENBQUNjLEVBQUQsRUFBS1osT0FBTCxDQUF2QjtBQUFBO0FBQS9CLE9BckIwRSxFQXNCMUU7QUFBQ1ksUUFBQUEsRUFBRSxFQUFFLGNBQUw7QUFBcUJDLFFBQUFBLFFBQVEsRUFBRSxrQkFBQ0QsRUFBRDtBQUFBLGlCQUFnQmQsT0FBTyxDQUFDYyxFQUFELEVBQUtaLE9BQUwsQ0FBdkI7QUFBQTtBQUEvQixPQXRCMEUsRUF1QjFFO0FBQUNZLFFBQUFBLEVBQUUsRUFBRSxPQUFMO0FBQWNDLFFBQUFBLFFBQVEsRUFBRSxrQkFBQ0QsRUFBRDtBQUFBLGlCQUFnQmQsT0FBTyxDQUFDYyxFQUFELEVBQUtaLE9BQUwsQ0FBdkI7QUFBQTtBQUF4QixPQXZCMEUsRUF5QjFFO0FBQ0E7QUFBRVksUUFBQUEsRUFBRSxFQUFFLE9BQU47QUFBZUMsUUFBQUEsUUFBUSxFQUFFLGtCQUFDRCxFQUFEO0FBQUEsaUJBQWdCZCxPQUFPLENBQUNjLEVBQUQsRUFBS1osT0FBTCxDQUF2QjtBQUFBO0FBQXpCLE9BMUIwRSxFQTJCMUU7QUFBRVksUUFBQUEsRUFBRSxFQUFFLFVBQU47QUFBa0JDLFFBQUFBLFFBQVEsRUFBRSxrQkFBQ0QsRUFBRDtBQUFBLGlCQUFnQmQsT0FBTyxDQUFDYyxFQUFELEVBQUtaLE9BQUwsQ0FBdkI7QUFBQTtBQUE1QixPQTNCMEUsQ0FBNUU7QUE4QkEsVUFBTWtCLFNBQVMsR0FBR1AsWUFBWSxDQUFDTixNQUFiLENBQW9CLFVBQUNDLEdBQUQsRUFBTUMsSUFBTixFQUFlO0FBQ25ELGVBQU9ELEdBQUcsR0FBR0MsSUFBSSxDQUFDTSxRQUFMLENBQWNOLElBQUksQ0FBQ0ssRUFBbkIsQ0FBTixHQUErQkgsU0FBdEM7QUFDRCxPQUZpQixFQUVmLEVBRmUsQ0FBbEI7QUFJQSxhQUFPUyxTQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWFkaW5nIH0gZnJvbSBcIi4uL21vZGVsXCI7XG5pbXBvcnQgeyBpc051bGxPclVuZGVmaW5lZCB9IGZyb20gXCJ1dGlsXCI7XG5cblxuZXhwb3J0IGVudW0gRXhwb3J0Rm9ybWF0IHtcbiAgVFNWPSdUU1YnLFxuICBDU1Y9J0NTVicsXG59XG5cblxuLyoqXG4gKiBTYWZ0ZWx5IGdldCBhIGtldCBmcm9tIHRoZSByZXNvdXJjZVxuICovXG5mdW5jdGlvbiBzYWZlR2V0KGtleTogc3RyaW5nLCByZWFkaW5nOiBSZWFkaW5nKTogc3RyaW5nIHtcblxuICAvLyBUT0RPOiBoYW5kbGUgbmVzdGVkIHZhbHVlc1xuICAvL0B0cy1pZ25vcmVcbiAgbGV0IHZhbHVlOiBhbnkgPSByZWFkaW5nW2tleV07XG4gIGlmIChpc051bGxPclVuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIHJldHVybiBgJHt2YWx1ZX1gO1xufVxuXG5leHBvcnQgY2xhc3MgRXhwb3J0QXBpIHtcblxuICBwdWJsaWMgc3RhdGljIHJlYWRpbmdzVG9FeHBvcnQocmVhZGluZ3M6IFJlYWRpbmdbXSwgZm9ybWF0OiBFeHBvcnRGb3JtYXQpOiBzdHJpbmcge1xuICAgIHJldHVybiByZWFkaW5ncy5yZWR1Y2UoKGFjYywgY3VycikgPT4gYWNjICsgdGhpcy5mb3JtYXRSZWFkaW5nKGN1cnIsIGZvcm1hdCkgKyAnXFxuJywnJylcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZm9ybWF0UmVhZGluZyhyZWFkaW5nOiBSZWFkaW5nLCBmb3JtYXQ6IEV4cG9ydEZvcm1hdCk6IHN0cmluZyB7XG4gICAgbGV0IHNlcGFyYXRvciA9IFwiLFwiO1xuICAgIGlmIChmb3JtYXQgPT09IEV4cG9ydEZvcm1hdC5UU1YpIHtcbiAgICAgIHNlcGFyYXRvciA9ICdcXHQnO1xuICAgIH1cblxuICAgIGNvbnN0IGVsaWdpYmxlS2V5czogQXJyYXk8e2lkOiBzdHJpbmcsIGFjY2Vzc29yOiAoaWQ6IHN0cmluZykgPT4gc3RyaW5nfT4gPSBbXG4gICAgICB7aWQ6ICdpZCcsIGFjY2Vzc29yOiAoaWQ6IHN0cmluZykgPT4gc2FmZUdldChpZCwgcmVhZGluZykgfSwgXG5cbiAgICAgIC8vSGFuZGxlIGxlZ2FjeSB0aW1lc3RhbXBzIGZyb20gRmlyZXN0b3JlXG4gICAgICB7aWQ6ICdkYXRldGltZScsIGFjY2Vzc29yOiAoaWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgbGV0IGRhdGVSYXc6IGFueSA9IHJlYWRpbmdbaWRdO1xuICAgICAgICBpZiAoaXNOdWxsT3JVbmRlZmluZWQoZGF0ZVJhdykpIHtcbiAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaWYgKGRhdGVSYXcudG9EYXRlKSB7XG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIGNvbnN0IGpzRGF0ZTogRGF0ZSA9IGRhdGVSYXcudG9EYXRlKCk7XG4gICAgICAgICAgcmV0dXJuIGpzRGF0ZS50b0lTT1N0cmluZygpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0ZVJhdztcbiAgICAgIH19LCBcbiAgICAgIHtpZDogJ3Jlc291cmNlSWQnLCBhY2Nlc3NvcjogKGlkOiBzdHJpbmcpID0+IHNhZmVHZXQoaWQsIHJlYWRpbmcpIH0sIFxuICAgICAge2lkOiAncmVzb3VyY2VUeXBlJywgYWNjZXNzb3I6IChpZDogc3RyaW5nKSA9PiBzYWZlR2V0KGlkLCByZWFkaW5nKSB9LCBcbiAgICAgIHtpZDogJ3RpbWVzZXJpZXNJZCcsIGFjY2Vzc29yOiAoaWQ6IHN0cmluZykgPT4gc2FmZUdldChpZCwgcmVhZGluZykgfSwgXG4gICAgICB7aWQ6ICd2YWx1ZScsIGFjY2Vzc29yOiAoaWQ6IHN0cmluZykgPT4gc2FmZUdldChpZCwgcmVhZGluZykgfSwgXG5cbiAgICAgIC8vTXl3ZWxsIGZpZWxkczpcbiAgICAgIHsgaWQ6ICdpbWFnZScsIGFjY2Vzc29yOiAoaWQ6IHN0cmluZykgPT4gc2FmZUdldChpZCwgcmVhZGluZykgfSwgXG4gICAgICB7IGlkOiAnbG9jYXRpb24nLCBhY2Nlc3NvcjogKGlkOiBzdHJpbmcpID0+IHNhZmVHZXQoaWQsIHJlYWRpbmcpIH0sIFxuICAgIF07XG5cbiAgICBjb25zdCBmb3JtYXR0ZWQgPSBlbGlnaWJsZUtleXMucmVkdWNlKChhY2MsIGN1cnIpID0+IHtcbiAgICAgIHJldHVybiBhY2MgKyBjdXJyLmFjY2Vzc29yKGN1cnIuaWQpICsgc2VwYXJhdG9yO1xuICAgIH0sICcnKTtcblxuICAgIHJldHVybiBmb3JtYXR0ZWQ7XG4gIH1cblxuXG5cbn0iXX0=