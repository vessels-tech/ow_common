"use strict";

require("mocha");

var assert = _interopRequireWildcard(require("assert"));

var _model = require("../model");

var _ExportApi = require("./ExportApi");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// const {
//   orgId,
// } = require('../test/testConfig.json');
describe('Export Api', function () {
  this.timeout(5000); // const firestore: Firestore = new MockFirestore({}).firestore();

  this.beforeAll(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })));
  it('formats a reading with a tab',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var reading, format, expected, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            //Arrange
            reading = _objectSpread({}, _model.DefaultReading, {
              id: "00001"
            });
            format = _ExportApi.ExportFormat.TSV;
            expected = "00001\t2017-01-01T01:11:01Z\tno_resource_id\twell\tno_timeseries_id\t0\t\t\t"; //Act

            result = _ExportApi.ExportApi.formatReading(reading, format); //Assert

            assert.equal(result, expected);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  })));
  it('formats a reading with a comma',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var reading, format, expected, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            //Arrange
            reading = _objectSpread({}, _model.DefaultReading, {
              id: "00001"
            });
            format = _ExportApi.ExportFormat.CSV;
            expected = "00001,2017-01-01T01:11:01Z,no_resource_id,well,no_timeseries_id,0,,,"; //Act

            result = _ExportApi.ExportApi.formatReading(reading, format); //Assert

            assert.equal(result, expected);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  })));
  it('formats many readings',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var readings, format, expected, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            //Arrange
            readings = [_objectSpread({}, _model.DefaultReading, {
              id: "00001"
            }), _objectSpread({}, _model.DefaultReading, {
              id: "00002"
            }), _objectSpread({}, _model.DefaultReading, {
              id: "00003"
            }), _objectSpread({}, _model.DefaultReading, {
              id: "00004"
            })];
            format = _ExportApi.ExportFormat.CSV;
            expected = "00001,2017-01-01T01:11:01Z,no_resource_id,well,no_timeseries_id,0,,,\n00002,2017-01-01T01:11:01Z,no_resource_id,well,no_timeseries_id,0,,,\n00003,2017-01-01T01:11:01Z,no_resource_id,well,no_timeseries_id,0,,,\n00004,2017-01-01T01:11:01Z,no_resource_id,well,no_timeseries_id,0,,,\n"; //Act

            result = _ExportApi.ExportApi.readingsToExport(readings, format); //Assert

            assert.equal(result, expected);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  })));
  this.afterAll(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  })));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvRXhwb3J0QXBpLnVuaXQudHMiXSwibmFtZXMiOlsiZGVzY3JpYmUiLCJ0aW1lb3V0IiwiYmVmb3JlQWxsIiwiaXQiLCJyZWFkaW5nIiwiRGVmYXVsdFJlYWRpbmciLCJpZCIsImZvcm1hdCIsIkV4cG9ydEZvcm1hdCIsIlRTViIsImV4cGVjdGVkIiwicmVzdWx0IiwiRXhwb3J0QXBpIiwiZm9ybWF0UmVhZGluZyIsImFzc2VydCIsImVxdWFsIiwiQ1NWIiwicmVhZGluZ3MiLCJyZWFkaW5nc1RvRXhwb3J0IiwiYWZ0ZXJBbGwiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBSUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUdBQSxRQUFRLENBQUMsWUFBRCxFQUFlLFlBQVk7QUFDakMsT0FBS0MsT0FBTCxDQUFhLElBQWIsRUFEaUMsQ0FFakM7O0FBR0EsT0FBS0MsU0FBTDtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBZjtBQUtBQyxFQUFBQSxFQUFFLENBQUMsOEJBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBaUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2pDO0FBQ01DLFlBQUFBLE9BRjJCLHFCQUVaQyxxQkFGWTtBQUVJQyxjQUFBQSxFQUFFLEVBQUU7QUFGUjtBQUczQkMsWUFBQUEsTUFIMkIsR0FHbEJDLHdCQUFhQyxHQUhLO0FBSTNCQyxZQUFBQSxRQUoyQixtRkFNakM7O0FBQ01DLFlBQUFBLE1BUDJCLEdBT2xCQyxxQkFBVUMsYUFBVixDQUF3QlQsT0FBeEIsRUFBaUNHLE1BQWpDLENBUGtCLEVBU2pDOztBQUNBTyxZQUFBQSxNQUFNLENBQUNDLEtBQVAsQ0FBYUosTUFBYixFQUFxQkQsUUFBckI7O0FBVmlDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWpDLEdBQUY7QUFhQVAsRUFBQUEsRUFBRSxDQUFDLGdDQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQW1DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNuQztBQUNNQyxZQUFBQSxPQUY2QixxQkFFZEMscUJBRmM7QUFFRUMsY0FBQUEsRUFBRSxFQUFFO0FBRk47QUFHN0JDLFlBQUFBLE1BSDZCLEdBR3BCQyx3QkFBYVEsR0FITztBQUk3Qk4sWUFBQUEsUUFKNkIsMkVBTW5DOztBQUNNQyxZQUFBQSxNQVA2QixHQU9wQkMscUJBQVVDLGFBQVYsQ0FBd0JULE9BQXhCLEVBQWlDRyxNQUFqQyxDQVBvQixFQVNuQzs7QUFDQU8sWUFBQUEsTUFBTSxDQUFDQyxLQUFQLENBQWFKLE1BQWIsRUFBcUJELFFBQXJCOztBQVZtQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFuQyxHQUFGO0FBYUFQLEVBQUFBLEVBQUUsQ0FBQyx1QkFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUEwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDMUI7QUFDTWMsWUFBQUEsUUFGb0IsR0FFVCxtQkFDVloscUJBRFU7QUFDTUMsY0FBQUEsRUFBRSxFQUFFO0FBRFYsa0NBRVZELHFCQUZVO0FBRU1DLGNBQUFBLEVBQUUsRUFBRTtBQUZWLGtDQUdWRCxxQkFIVTtBQUdNQyxjQUFBQSxFQUFFLEVBQUU7QUFIVixrQ0FJVkQscUJBSlU7QUFJTUMsY0FBQUEsRUFBRSxFQUFFO0FBSlYsZUFGUztBQVFwQkMsWUFBQUEsTUFSb0IsR0FRWEMsd0JBQWFRLEdBUkY7QUFTdEJOLFlBQUFBLFFBVHNCLCtSQWUxQjs7QUFDTUMsWUFBQUEsTUFoQm9CLEdBZ0JYQyxxQkFBVU0sZ0JBQVYsQ0FBMkJELFFBQTNCLEVBQXFDVixNQUFyQyxDQWhCVyxFQWtCMUI7O0FBQ0FPLFlBQUFBLE1BQU0sQ0FBQ0MsS0FBUCxDQUFhSixNQUFiLEVBQXFCRCxRQUFyQjs7QUFuQjBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQTFCLEdBQUY7QUF5QkEsT0FBS1MsUUFBTDtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBZDtBQUdELENBaEVPLENBQVIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ21vY2hhJztcbmltcG9ydCAqIGFzIGFzc2VydCBmcm9tICdhc3NlcnQnO1xuLy9AdHMtaWdub3JlXG5pbXBvcnQgTW9ja0ZpcmVzdG9yZSBmcm9tICdtb2NrLWNsb3VkLWZpcmVzdG9yZSc7XG5cbmltcG9ydCB7IERlZmF1bHRSZWFkaW5nIH0gZnJvbSAnLi4vbW9kZWwnO1xuaW1wb3J0IHsgRXhwb3J0QXBpLCBFeHBvcnRGb3JtYXQgfSBmcm9tICcuL0V4cG9ydEFwaSc7XG5cbi8vIGNvbnN0IHtcbi8vICAgb3JnSWQsXG4vLyB9ID0gcmVxdWlyZSgnLi4vdGVzdC90ZXN0Q29uZmlnLmpzb24nKTtcblxuXG5kZXNjcmliZSgnRXhwb3J0IEFwaScsIGZ1bmN0aW9uICgpIHtcbiAgdGhpcy50aW1lb3V0KDUwMDApO1xuICAvLyBjb25zdCBmaXJlc3RvcmU6IEZpcmVzdG9yZSA9IG5ldyBNb2NrRmlyZXN0b3JlKHt9KS5maXJlc3RvcmUoKTtcblxuXG4gIHRoaXMuYmVmb3JlQWxsKGFzeW5jICgpID0+IHtcbiAgXG4gIH0pO1xuXG5cbiAgaXQoJ2Zvcm1hdHMgYSByZWFkaW5nIHdpdGggYSB0YWInLCBhc3luYyAoKSA9PiB7XG4gICAgLy9BcnJhbmdlXG4gICAgY29uc3QgcmVhZGluZyA9IHsgLi4uRGVmYXVsdFJlYWRpbmcsIGlkOiBcIjAwMDAxXCIgfTtcbiAgICBjb25zdCBmb3JtYXQgPSBFeHBvcnRGb3JtYXQuVFNWO1xuICAgIGNvbnN0IGV4cGVjdGVkID0gYDAwMDAxXFx0MjAxNy0wMS0wMVQwMToxMTowMVpcXHRub19yZXNvdXJjZV9pZFxcdHdlbGxcXHRub190aW1lc2VyaWVzX2lkXFx0MFxcdFxcdFxcdGA7XG5cbiAgICAvL0FjdFxuICAgIGNvbnN0IHJlc3VsdCA9IEV4cG9ydEFwaS5mb3JtYXRSZWFkaW5nKHJlYWRpbmcsIGZvcm1hdCk7XG4gICAgXG4gICAgLy9Bc3NlcnRcbiAgICBhc3NlcnQuZXF1YWwocmVzdWx0LCBleHBlY3RlZCk7XG4gIH0pO1xuXG4gIGl0KCdmb3JtYXRzIGEgcmVhZGluZyB3aXRoIGEgY29tbWEnLCBhc3luYyAoKSA9PiB7XG4gICAgLy9BcnJhbmdlXG4gICAgY29uc3QgcmVhZGluZyA9IHsgLi4uRGVmYXVsdFJlYWRpbmcsIGlkOiBcIjAwMDAxXCIgfTtcbiAgICBjb25zdCBmb3JtYXQgPSBFeHBvcnRGb3JtYXQuQ1NWO1xuICAgIGNvbnN0IGV4cGVjdGVkID0gYDAwMDAxLDIwMTctMDEtMDFUMDE6MTE6MDFaLG5vX3Jlc291cmNlX2lkLHdlbGwsbm9fdGltZXNlcmllc19pZCwwLCwsYDtcblxuICAgIC8vQWN0XG4gICAgY29uc3QgcmVzdWx0ID0gRXhwb3J0QXBpLmZvcm1hdFJlYWRpbmcocmVhZGluZywgZm9ybWF0KTtcbiAgICBcbiAgICAvL0Fzc2VydFxuICAgIGFzc2VydC5lcXVhbChyZXN1bHQsIGV4cGVjdGVkKTtcbiAgfSk7XG5cbiAgaXQoJ2Zvcm1hdHMgbWFueSByZWFkaW5ncycsIGFzeW5jICgpID0+IHtcbiAgICAvL0FycmFuZ2VcbiAgICBjb25zdCByZWFkaW5ncyA9IFtcbiAgICAgIHsgLi4uRGVmYXVsdFJlYWRpbmcsIGlkOiBcIjAwMDAxXCIgfSxcbiAgICAgIHsgLi4uRGVmYXVsdFJlYWRpbmcsIGlkOiBcIjAwMDAyXCIgfSxcbiAgICAgIHsgLi4uRGVmYXVsdFJlYWRpbmcsIGlkOiBcIjAwMDAzXCIgfSxcbiAgICAgIHsgLi4uRGVmYXVsdFJlYWRpbmcsIGlkOiBcIjAwMDA0XCIgfSxcbiAgICBdXG4gICAgY29uc3QgZm9ybWF0ID0gRXhwb3J0Rm9ybWF0LkNTVjtcbiAgY29uc3QgZXhwZWN0ZWQgPSBgMDAwMDEsMjAxNy0wMS0wMVQwMToxMTowMVosbm9fcmVzb3VyY2VfaWQsd2VsbCxub190aW1lc2VyaWVzX2lkLDAsLCxcbjAwMDAyLDIwMTctMDEtMDFUMDE6MTE6MDFaLG5vX3Jlc291cmNlX2lkLHdlbGwsbm9fdGltZXNlcmllc19pZCwwLCwsXG4wMDAwMywyMDE3LTAxLTAxVDAxOjExOjAxWixub19yZXNvdXJjZV9pZCx3ZWxsLG5vX3RpbWVzZXJpZXNfaWQsMCwsLFxuMDAwMDQsMjAxNy0wMS0wMVQwMToxMTowMVosbm9fcmVzb3VyY2VfaWQsd2VsbCxub190aW1lc2VyaWVzX2lkLDAsLCxcbmBcblxuICAgIC8vQWN0XG4gICAgY29uc3QgcmVzdWx0ID0gRXhwb3J0QXBpLnJlYWRpbmdzVG9FeHBvcnQocmVhZGluZ3MsIGZvcm1hdCk7XG4gICAgXG4gICAgLy9Bc3NlcnRcbiAgICBhc3NlcnQuZXF1YWwocmVzdWx0LCBleHBlY3RlZCk7XG4gIH0pO1xuXG5cblxuXG4gIHRoaXMuYWZ0ZXJBbGwoYXN5bmMgKCkgPT4ge1xuICAgXG4gIH0pO1xufSk7Il19