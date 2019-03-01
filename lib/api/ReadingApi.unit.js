"use strict";

require("mocha");

var assert = _interopRequireWildcard(require("assert"));

var _mockCloudFirestore = _interopRequireDefault(require("mock-cloud-firestore"));

var _model = require("../model");

var _utils = require("../utils");

var _ReadingApi = require("./ReadingApi");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('../test/testConfig.json'),
    orgId = _require.orgId;

describe('Reading Api', function () {
  this.timeout(5000);
  var firestore = new _mockCloudFirestore.default({}).firestore();
  var readingApi = new _ReadingApi.ReadingApi(firestore, orgId);
  this.beforeAll(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return readingApi.readingCol().doc("reading_001").set(_objectSpread({}, _model.DefaultReading, {
              resourceId: "00001",
              timeseriesId: 'default'
            }));

          case 2:
            _context.next = 4;
            return readingApi.readingCol().doc("reading_002").set(_objectSpread({}, _model.DefaultReading, {
              resourceId: "00001",
              timeseriesId: 'default'
            }));

          case 4:
            _context.next = 6;
            return readingApi.readingCol().doc("reading_003").set(_objectSpread({}, _model.DefaultReading, {
              resourceId: "00002",
              timeseriesId: 'default'
            }));

          case 6:
            _context.next = 8;
            return readingApi.readingCol().doc("reading_004").set(_objectSpread({}, _model.DefaultReading, {
              resourceId: "00002",
              timeseriesId: 'default'
            }));

          case 8:
            _context.next = 10;
            return readingApi.readingCol().doc("reading_005").set(_objectSpread({}, _model.DefaultReading, {
              resourceId: "00003",
              timeseriesId: 'default'
            }));

          case 10:
            _context.next = 12;
            return readingApi.readingCol().doc("reading_006").set(_objectSpread({}, _model.DefaultReading, {
              resourceId: "00003",
              timeseriesId: 'default'
            }));

          case 12:
            _context.next = 14;
            return readingApi.readingCol().doc("reading_007").set(_objectSpread({}, _model.DefaultReading, {
              datetime: '2017-01-01T01:11:01Z',
              value: 1,
              resourceId: "00004",
              timeseriesId: 'default'
            }));

          case 14:
            _context.next = 16;
            return readingApi.readingCol().doc("reading_008").set(_objectSpread({}, _model.DefaultReading, {
              datetime: '2017-01-02T01:11:01Z',
              value: 2,
              resourceId: "00004",
              timeseriesId: 'default'
            }));

          case 16:
            _context.next = 18;
            return readingApi.readingCol().doc("reading_009").set(_objectSpread({}, _model.DefaultReading, {
              datetime: '2017-01-03T01:11:01Z',
              value: 3,
              resourceId: "00004",
              timeseriesId: 'default'
            }));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })));
  it('gets a list of readings for a resourceId',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var resourceId, params, readings;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            //Arrange
            resourceId = "00001";
            params = {
              limit: 10 //Act

            };
            _context2.t0 = _utils.unsafeUnwrap;
            _context2.next = 5;
            return readingApi.getReadingsForResourceId(resourceId, params);

          case 5:
            _context2.t1 = _context2.sent;
            readings = (0, _context2.t0)(_context2.t1);
            //Assert
            assert.equal(readings.readings.length, 2);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  })));
  it('gets a list of readings for multiple resourceIds',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var resourceIds, params, readings;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            //Arrange
            resourceIds = ["00001", "00003"];
            params = {
              limit: 10 //Act

            };
            _context3.t0 = _utils.unsafeUnwrap;
            _context3.next = 5;
            return readingApi.getReadingsForResources(resourceIds, params);

          case 5:
            _context3.t1 = _context3.sent;
            readings = (0, _context3.t0)(_context3.t1);
            //Assert
            assert.equal(readings.readings.length, 4);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  })));
  it('obeys the limit for individual resourceIds',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var resourceId, params, readings;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            //Arrange
            resourceId = "00001";
            params = {
              limit: 1 //Act

            };
            _context4.t0 = _utils.unsafeUnwrap;
            _context4.next = 5;
            return readingApi.getReadingsForResourceId(resourceId, params);

          case 5:
            _context4.t1 = _context4.sent;
            readings = (0, _context4.t0)(_context4.t1);
            //Assert
            assert.equal(readings.readings.length, 1);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  })));
  it('orders the individual query with the newest readings first',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var resourceId, params, readings;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            //Arrange
            resourceId = "00004";
            params = {
              limit: 100 //Act

            };
            _context5.t0 = _utils.unsafeUnwrap;
            _context5.next = 5;
            return readingApi.getReadingsForResourceId(resourceId, params);

          case 5:
            _context5.t1 = _context5.sent;
            readings = (0, _context5.t0)(_context5.t1);
            //Assert
            assert.equal(readings.readings[0].value, 3);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  })));
  this.afterAll(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return readingApi.readingCol().doc("reading_001").delete();

          case 2:
            _context6.next = 4;
            return readingApi.readingCol().doc("reading_002").delete();

          case 4:
            _context6.next = 6;
            return readingApi.readingCol().doc("reading_003").delete();

          case 6:
            _context6.next = 8;
            return readingApi.readingCol().doc("reading_004").delete();

          case 8:
            _context6.next = 10;
            return readingApi.readingCol().doc("reading_005").delete();

          case 10:
            _context6.next = 12;
            return readingApi.readingCol().doc("reading_006").delete();

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  })));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvUmVhZGluZ0FwaS51bml0LnRzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJvcmdJZCIsImRlc2NyaWJlIiwidGltZW91dCIsImZpcmVzdG9yZSIsIk1vY2tGaXJlc3RvcmUiLCJyZWFkaW5nQXBpIiwiUmVhZGluZ0FwaSIsImJlZm9yZUFsbCIsInJlYWRpbmdDb2wiLCJkb2MiLCJzZXQiLCJEZWZhdWx0UmVhZGluZyIsInJlc291cmNlSWQiLCJ0aW1lc2VyaWVzSWQiLCJkYXRldGltZSIsInZhbHVlIiwiaXQiLCJwYXJhbXMiLCJsaW1pdCIsInVuc2FmZVVud3JhcCIsImdldFJlYWRpbmdzRm9yUmVzb3VyY2VJZCIsInJlYWRpbmdzIiwiYXNzZXJ0IiwiZXF1YWwiLCJsZW5ndGgiLCJyZXNvdXJjZUlkcyIsImdldFJlYWRpbmdzRm9yUmVzb3VyY2VzIiwiYWZ0ZXJBbGwiLCJkZWxldGUiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O2VBS0lBLE9BQU8sQ0FBQyx5QkFBRCxDO0lBRFRDLEssWUFBQUEsSzs7QUFJRkMsUUFBUSxDQUFDLGFBQUQsRUFBZ0IsWUFBWTtBQUNsQyxPQUFLQyxPQUFMLENBQWEsSUFBYjtBQUNBLE1BQU1DLFNBQW9CLEdBQUcsSUFBSUMsMkJBQUosQ0FBa0IsRUFBbEIsRUFBc0JELFNBQXRCLEVBQTdCO0FBQ0EsTUFBTUUsVUFBVSxHQUFHLElBQUlDLHNCQUFKLENBQWVILFNBQWYsRUFBMEJILEtBQTFCLENBQW5CO0FBR0EsT0FBS08sU0FBTDtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNQRixVQUFVLENBQUNHLFVBQVgsR0FBd0JDLEdBQXhCLENBQTRCLGFBQTVCLEVBQTJDQyxHQUEzQyxtQkFBbURDLHFCQUFuRDtBQUFtRUMsY0FBQUEsVUFBVSxFQUFFLE9BQS9FO0FBQXdGQyxj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QUE0QixhQUE1QixFQUEyQ21CLE1BQTNDLEVBSk07O0FBQUE7QUFBQTtBQUFBLG1CQUtOdkIsVUFBVSxDQUFDRyxVQUFYLEdBQXdCQyxHQUF4QixDQUE0QixhQUE1QixFQUEyQ21CLE1BQTNDLEVBTE07O0FBQUE7QUFBQTtBQUFBLG1CQU1OdkIsVUFBVSxDQUFDRyxVQUFYLEdBQXdCQyxHQUF4QixDQUE0QixhQUE1QixFQUEyQ21CLE1BQTNDLEVBTk07O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBZDtBQVFELENBdkZPLENBQVIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ21vY2hhJztcbmltcG9ydCAqIGFzIGFzc2VydCBmcm9tICdhc3NlcnQnO1xuLy9AdHMtaWdub3JlXG5pbXBvcnQgTW9ja0ZpcmVzdG9yZSBmcm9tICdtb2NrLWNsb3VkLWZpcmVzdG9yZSc7XG5pbXBvcnQgeyBhZG1pbiB9IGZyb20gJy4uL3Rlc3QvVGVzdEZpcmViYXNlJztcbmltcG9ydCB7IERlZmF1bHRSZWFkaW5nIH0gZnJvbSAnLi4vbW9kZWwnO1xuaW1wb3J0IHsgdW5zYWZlVW53cmFwIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgUmVhZGluZ0FwaSB9IGZyb20gJy4vUmVhZGluZ0FwaSc7XG50eXBlIEZpcmVzdG9yZSA9IGFkbWluLmZpcmVzdG9yZS5GaXJlc3RvcmU7XG5cbmNvbnN0IHtcbiAgb3JnSWQsXG59ID0gcmVxdWlyZSgnLi4vdGVzdC90ZXN0Q29uZmlnLmpzb24nKTtcblxuXG5kZXNjcmliZSgnUmVhZGluZyBBcGknLCBmdW5jdGlvbiAoKSB7XG4gIHRoaXMudGltZW91dCg1MDAwKTtcbiAgY29uc3QgZmlyZXN0b3JlOiBGaXJlc3RvcmUgPSBuZXcgTW9ja0ZpcmVzdG9yZSh7fSkuZmlyZXN0b3JlKCk7XG4gIGNvbnN0IHJlYWRpbmdBcGkgPSBuZXcgUmVhZGluZ0FwaShmaXJlc3RvcmUsIG9yZ0lkKTtcblxuXG4gIHRoaXMuYmVmb3JlQWxsKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCByZWFkaW5nQXBpLnJlYWRpbmdDb2woKS5kb2MoXCJyZWFkaW5nXzAwMVwiKS5zZXQoey4uLkRlZmF1bHRSZWFkaW5nLCByZXNvdXJjZUlkOiBcIjAwMDAxXCIsIHRpbWVzZXJpZXNJZDogJ2RlZmF1bHQnfSlcbiAgICBhd2FpdCByZWFkaW5nQXBpLnJlYWRpbmdDb2woKS5kb2MoXCJyZWFkaW5nXzAwMlwiKS5zZXQoey4uLkRlZmF1bHRSZWFkaW5nLCByZXNvdXJjZUlkOiBcIjAwMDAxXCIsIHRpbWVzZXJpZXNJZDogJ2RlZmF1bHQnfSlcbiAgICBhd2FpdCByZWFkaW5nQXBpLnJlYWRpbmdDb2woKS5kb2MoXCJyZWFkaW5nXzAwM1wiKS5zZXQoey4uLkRlZmF1bHRSZWFkaW5nLCByZXNvdXJjZUlkOiBcIjAwMDAyXCIsIHRpbWVzZXJpZXNJZDogJ2RlZmF1bHQnfSlcbiAgICBhd2FpdCByZWFkaW5nQXBpLnJlYWRpbmdDb2woKS5kb2MoXCJyZWFkaW5nXzAwNFwiKS5zZXQoey4uLkRlZmF1bHRSZWFkaW5nLCByZXNvdXJjZUlkOiBcIjAwMDAyXCIsIHRpbWVzZXJpZXNJZDogJ2RlZmF1bHQnfSlcbiAgICBhd2FpdCByZWFkaW5nQXBpLnJlYWRpbmdDb2woKS5kb2MoXCJyZWFkaW5nXzAwNVwiKS5zZXQoey4uLkRlZmF1bHRSZWFkaW5nLCByZXNvdXJjZUlkOiBcIjAwMDAzXCIsIHRpbWVzZXJpZXNJZDogJ2RlZmF1bHQnfSlcbiAgICBhd2FpdCByZWFkaW5nQXBpLnJlYWRpbmdDb2woKS5kb2MoXCJyZWFkaW5nXzAwNlwiKS5zZXQoey4uLkRlZmF1bHRSZWFkaW5nLCByZXNvdXJjZUlkOiBcIjAwMDAzXCIsIHRpbWVzZXJpZXNJZDogJ2RlZmF1bHQnfSlcbiAgICBhd2FpdCByZWFkaW5nQXBpLnJlYWRpbmdDb2woKS5kb2MoXCJyZWFkaW5nXzAwN1wiKS5zZXQoey4uLkRlZmF1bHRSZWFkaW5nLCBkYXRldGltZTogJzIwMTctMDEtMDFUMDE6MTE6MDFaJywgdmFsdWU6IDEsIHJlc291cmNlSWQ6IFwiMDAwMDRcIiwgdGltZXNlcmllc0lkOiAnZGVmYXVsdCd9KVxuICAgIGF3YWl0IHJlYWRpbmdBcGkucmVhZGluZ0NvbCgpLmRvYyhcInJlYWRpbmdfMDA4XCIpLnNldCh7Li4uRGVmYXVsdFJlYWRpbmcsIGRhdGV0aW1lOiAnMjAxNy0wMS0wMlQwMToxMTowMVonLCB2YWx1ZTogMiwgcmVzb3VyY2VJZDogXCIwMDAwNFwiLCB0aW1lc2VyaWVzSWQ6ICdkZWZhdWx0J30pXG4gICAgYXdhaXQgcmVhZGluZ0FwaS5yZWFkaW5nQ29sKCkuZG9jKFwicmVhZGluZ18wMDlcIikuc2V0KHsuLi5EZWZhdWx0UmVhZGluZywgZGF0ZXRpbWU6ICcyMDE3LTAxLTAzVDAxOjExOjAxWicsIHZhbHVlOiAzLCByZXNvdXJjZUlkOiBcIjAwMDA0XCIsIHRpbWVzZXJpZXNJZDogJ2RlZmF1bHQnfSlcbiAgfSk7XG5cblxuICBpdCgnZ2V0cyBhIGxpc3Qgb2YgcmVhZGluZ3MgZm9yIGEgcmVzb3VyY2VJZCcsIGFzeW5jICgpID0+IHtcbiAgICAvL0FycmFuZ2VcbiAgICBjb25zdCByZXNvdXJjZUlkID0gXCIwMDAwMVwiO1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIGxpbWl0OiAxMCxcbiAgICB9XG5cbiAgICAvL0FjdFxuICAgIGNvbnN0IHJlYWRpbmdzID0gdW5zYWZlVW53cmFwKGF3YWl0IHJlYWRpbmdBcGkuZ2V0UmVhZGluZ3NGb3JSZXNvdXJjZUlkKHJlc291cmNlSWQsIHBhcmFtcykpO1xuXG4gICAgLy9Bc3NlcnRcbiAgICBhc3NlcnQuZXF1YWwocmVhZGluZ3MucmVhZGluZ3MubGVuZ3RoLCAyKTtcbiAgfSk7XG5cblxuICBpdCgnZ2V0cyBhIGxpc3Qgb2YgcmVhZGluZ3MgZm9yIG11bHRpcGxlIHJlc291cmNlSWRzJywgIGFzeW5jICgpID0+IHtcbiAgICAvL0FycmFuZ2VcbiAgICBjb25zdCByZXNvdXJjZUlkcyA9IFtcIjAwMDAxXCIsIFwiMDAwMDNcIl07XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgbGltaXQ6IDEwLFxuICAgIH1cblxuICAgIC8vQWN0XG4gICAgY29uc3QgcmVhZGluZ3MgPSB1bnNhZmVVbndyYXAoYXdhaXQgcmVhZGluZ0FwaS5nZXRSZWFkaW5nc0ZvclJlc291cmNlcyhyZXNvdXJjZUlkcywgcGFyYW1zKSk7XG5cbiAgICAvL0Fzc2VydFxuICAgIGFzc2VydC5lcXVhbChyZWFkaW5ncy5yZWFkaW5ncy5sZW5ndGgsIDQpO1xuICB9KTtcblxuXG4gIGl0KCdvYmV5cyB0aGUgbGltaXQgZm9yIGluZGl2aWR1YWwgcmVzb3VyY2VJZHMnLCBhc3luYyAoKSA9PiB7XG4gICAgLy9BcnJhbmdlXG4gICAgY29uc3QgcmVzb3VyY2VJZCA9IFwiMDAwMDFcIjtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBsaW1pdDogMVxuICAgIH1cblxuICAgIC8vQWN0XG4gICAgY29uc3QgcmVhZGluZ3MgPSB1bnNhZmVVbndyYXAoYXdhaXQgcmVhZGluZ0FwaS5nZXRSZWFkaW5nc0ZvclJlc291cmNlSWQocmVzb3VyY2VJZCwgcGFyYW1zKSk7XG5cbiAgICAvL0Fzc2VydFxuICAgIGFzc2VydC5lcXVhbChyZWFkaW5ncy5yZWFkaW5ncy5sZW5ndGgsIDEpO1xuICB9KTtcblxuICBpdCgnb3JkZXJzIHRoZSBpbmRpdmlkdWFsIHF1ZXJ5IHdpdGggdGhlIG5ld2VzdCByZWFkaW5ncyBmaXJzdCcsIGFzeW5jICgpID0+IHtcbiAgICAvL0FycmFuZ2VcbiAgICBjb25zdCByZXNvdXJjZUlkID0gXCIwMDAwNFwiO1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIGxpbWl0OiAxMDBcbiAgICB9XG5cbiAgICAvL0FjdFxuICAgIGNvbnN0IHJlYWRpbmdzID0gdW5zYWZlVW53cmFwKGF3YWl0IHJlYWRpbmdBcGkuZ2V0UmVhZGluZ3NGb3JSZXNvdXJjZUlkKHJlc291cmNlSWQsIHBhcmFtcykpO1xuXG4gICAgLy9Bc3NlcnRcbiAgICBhc3NlcnQuZXF1YWwocmVhZGluZ3MucmVhZGluZ3NbMF0udmFsdWUsIDMpO1xuICB9KTtcblxuXG5cbiAgdGhpcy5hZnRlckFsbChhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgcmVhZGluZ0FwaS5yZWFkaW5nQ29sKCkuZG9jKFwicmVhZGluZ18wMDFcIikuZGVsZXRlKCk7XG4gICAgYXdhaXQgcmVhZGluZ0FwaS5yZWFkaW5nQ29sKCkuZG9jKFwicmVhZGluZ18wMDJcIikuZGVsZXRlKCk7XG4gICAgYXdhaXQgcmVhZGluZ0FwaS5yZWFkaW5nQ29sKCkuZG9jKFwicmVhZGluZ18wMDNcIikuZGVsZXRlKCk7XG4gICAgYXdhaXQgcmVhZGluZ0FwaS5yZWFkaW5nQ29sKCkuZG9jKFwicmVhZGluZ18wMDRcIikuZGVsZXRlKCk7XG4gICAgYXdhaXQgcmVhZGluZ0FwaS5yZWFkaW5nQ29sKCkuZG9jKFwicmVhZGluZ18wMDVcIikuZGVsZXRlKCk7XG4gICAgYXdhaXQgcmVhZGluZ0FwaS5yZWFkaW5nQ29sKCkuZG9jKFwicmVhZGluZ18wMDZcIikuZGVsZXRlKCk7XG4gIH0pO1xufSk7Il19