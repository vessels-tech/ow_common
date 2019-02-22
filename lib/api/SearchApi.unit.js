"use strict";

require("mocha");

var assert = _interopRequireWildcard(require("assert"));

var _mockCloudFirestore = _interopRequireDefault(require("mock-cloud-firestore"));

var _SearchApi = require("./SearchApi");

var _AppProviderTypes = require("../utils/AppProviderTypes");

var _model = require("../model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('../test/testConfig.json'),
    orgId = _require.orgId;

describe('Search Api', function () {
  this.timeout(5000);
  describe('Groups', function () {
    var firestore = new _mockCloudFirestore.default({}).firestore();
    var searchApi = new _SearchApi.SearchApi(firestore, orgId);
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
              return _SearchApi.SearchApi.resourceCol(firestore, orgId).doc("00001").set(_objectSpread({}, _model.DefaultMyWellResource, {
                id: "00001",
                groups: {
                  country: "IN",
                  pincode: "313603"
                }
              }));

            case 2:
              _context.next = 4;
              return _SearchApi.SearchApi.resourceCol(firestore, orgId).doc("00002").set(_objectSpread({}, _model.DefaultMyWellResource, {
                id: "00002",
                groups: {
                  country: "IN",
                  pincode: "313603"
                }
              }));

            case 4:
              _context.next = 6;
              return _SearchApi.SearchApi.resourceCol(firestore, orgId).doc("00003").set(_objectSpread({}, _model.DefaultMyWellResource, {
                id: "00003",
                groups: {
                  country: "AU",
                  pincode: "5016"
                }
              }));

            case 6:
              _context.next = 8;
              return _SearchApi.SearchApi.resourceCol(firestore, orgId).doc("00004").set(_objectSpread({}, _model.DefaultMyWellResource, {
                id: "00004",
                groups: {
                  country: "AU",
                  pincode: "5063"
                }
              }));

            case 8:
              _context.next = 10;
              return _SearchApi.SearchApi.resourceCol(firestore, orgId).doc("00005").set(_objectSpread({}, _model.DefaultMyWellResource, {
                id: "00005",
                groups: {
                  country: "IL",
                  pincode: "5555"
                }
              }));

            case 10:
              _context.next = 12;
              return _SearchApi.SearchApi.resourceCol(firestore, orgId).doc("00006").set(_objectSpread({}, _model.DefaultMyWellResource, {
                id: "00006",
                groups: {
                  country: "IL",
                  pincode: "313604"
                }
              }));

            case 12:
              _context.next = 14;
              return _SearchApi.SearchApi.resourceCol(firestore, orgId).doc("00007").set(_objectSpread({}, _model.DefaultMyWellResource, {
                id: "00007",
                groups: {
                  country: "IL",
                  pincode: "313605"
                }
              }));

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
    it('searches for resources within the pincode group',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var searchQuery, result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // Arrange
              searchQuery = "313"; //Act

              _context2.t0 = _AppProviderTypes.unsafeUnwrap;
              _context2.next = 4;
              return searchApi.searchForResourceInGroup(searchQuery, 'pincode', {
                limit: 10
              });

            case 4:
              _context2.t1 = _context2.sent;
              result = (0, _context2.t0)(_context2.t1);
              //Assert
              assert.equal(result.results.length, 4);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));
    it('searches for resources with a full pincode',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var searchQuery, result;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // Arrange
              searchQuery = "313603"; //Act

              _context3.t0 = _AppProviderTypes.unsafeUnwrap;
              _context3.next = 4;
              return searchApi.searchForResourceInGroup(searchQuery, 'pincode', {
                limit: 10
              });

            case 4:
              _context3.t1 = _context3.sent;
              result = (0, _context3.t0)(_context3.t1);
              //Assert
              assert.equal(result.results.length, 2);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })));
    it('searches for resources within the country group',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var searchQuery, result;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              // Arrange
              searchQuery = "I"; //Act

              _context4.t0 = _AppProviderTypes.unsafeUnwrap;
              _context4.next = 4;
              return searchApi.searchForResourceInGroup(searchQuery, 'country', {
                limit: 10
              });

            case 4:
              _context4.t1 = _context4.sent;
              result = (0, _context4.t0)(_context4.t1);
              //Assert
              assert.equal(result.results.length, 5);

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })));
    it('searches for resources within the country group with an exact match',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var searchQuery, result;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              // Arrange
              searchQuery = "IL"; //Act

              _context5.t0 = _AppProviderTypes.unsafeUnwrap;
              _context5.next = 4;
              return searchApi.searchForResourceInGroup(searchQuery, 'country', {
                limit: 10
              });

            case 4:
              _context5.t1 = _context5.sent;
              result = (0, _context5.t0)(_context5.t1);
              //Assert
              assert.equal(result.results.length, 3);

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }))); //Pagination doesn't work correctly for mock-cloud-firestore
    //This test passes against live firebase

    it.skip('paginates correctly',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var searchQuery, searchParams, searchResultA, searchResultB;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              // Arrange
              searchQuery = "I";
              searchParams = {
                limit: 2
              }; //Act

              _context6.t0 = _AppProviderTypes.unsafeUnwrap;
              _context6.next = 5;
              return searchApi.searchForResourceInGroup(searchQuery, 'country', searchParams);

            case 5:
              _context6.t1 = _context6.sent;
              searchResultA = (0, _context6.t0)(_context6.t1);
              searchParams = searchResultA.params;
              _context6.t2 = _AppProviderTypes.unsafeUnwrap;
              _context6.next = 11;
              return searchApi.searchForResourceInGroup(searchQuery, 'country', searchParams);

            case 11:
              _context6.t3 = _context6.sent;
              searchResultB = (0, _context6.t2)(_context6.t3);
              //Assert
              assert.equal(searchResultA.results.length, 2);
              assert.equal(searchResultB.results.length, 2);

            case 15:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    })));
    this.afterAll(
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _SearchApi.SearchApi.resourceCol(firestore, orgId).doc("00001").delete();

            case 2:
              _context7.next = 4;
              return _SearchApi.SearchApi.resourceCol(firestore, orgId).doc("00002").delete();

            case 4:
              _context7.next = 6;
              return _SearchApi.SearchApi.resourceCol(firestore, orgId).doc("00003").delete();

            case 6:
              _context7.next = 8;
              return _SearchApi.SearchApi.resourceCol(firestore, orgId).doc("00004").delete();

            case 8:
              _context7.next = 10;
              return _SearchApi.SearchApi.resourceCol(firestore, orgId).doc("00005").delete();

            case 10:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    })));
  });
  describe('ShortId', function () {
    var firestore = new _mockCloudFirestore.default({}).firestore();
    var searchApi = new _SearchApi.SearchApi(firestore, orgId);
    this.beforeAll(
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return _SearchApi.SearchApi.shortIdCol(firestore, orgId).doc("000100001").set(_objectSpread({}, _model.DefaultShortId, {
                id: '000100001',
                shortId: '000100001'
              }));

            case 2:
              _context8.next = 4;
              return _SearchApi.SearchApi.shortIdCol(firestore, orgId).doc("000100002").set(_objectSpread({}, _model.DefaultShortId, {
                id: '000100002',
                shortId: '000100002'
              }));

            case 4:
              _context8.next = 6;
              return _SearchApi.SearchApi.shortIdCol(firestore, orgId).doc("000100003").set(_objectSpread({}, _model.DefaultShortId, {
                id: '000100003',
                shortId: '000100003'
              }));

            case 6:
              _context8.next = 8;
              return _SearchApi.SearchApi.shortIdCol(firestore, orgId).doc("000100004").set(_objectSpread({}, _model.DefaultShortId, {
                id: '000100004',
                shortId: '000100004'
              }));

            case 8:
              _context8.next = 10;
              return _SearchApi.SearchApi.shortIdCol(firestore, orgId).get().then(function (qs) {
                console.log("We have ".concat(qs.docs.length, " docs."));
              });

            case 10:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    })));
    it('transforms shortId strings into valid shortId lookup ranges', function () {
      var inputs = ["100-000", "100--000", "100 100 000 ", "100", "1001", "00010001"];
      var expected = [["000100000", "000100000"], ["000100000", "000100000"], ["100100000", "100100000"], ["000100000", "000101000"], ["000100100", "000100200"], ["000100010", "000100020"]];
      inputs.forEach(function (input, idx) {
        return assert.deepEqual((0, _AppProviderTypes.unsafeUnwrap)(_SearchApi.SearchApi.rangeFromShortIdString(input)), expected[idx]);
      });
    });
    it('performs a basic search',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9() {
      var shortId, result;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              //Arrange
              shortId = "100-001"; //Act

              _context9.t0 = _AppProviderTypes.unsafeUnwrap;
              _context9.next = 4;
              return searchApi.searchByShortId(shortId, {
                limit: 10
              });

            case 4:
              _context9.t1 = _context9.sent;
              result = (0, _context9.t0)(_context9.t1);
              //Assert
              assert.equal(result.results.length, 1);

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }))); //Pagination doesn't work correctly for mock-cloud-firestore
    //This test passes against live firebase

    it.skip('performs a paginated search',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10() {
      var query, searchParams, searchResultA, searchResultB;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              //Arrange
              //This test assumes onlt 4 shortIds
              query = "100";
              searchParams = {
                limit: 3
              }; //Act

              _context10.t0 = _AppProviderTypes.unsafeUnwrap;
              _context10.next = 5;
              return searchApi.searchByShortId(query, searchParams);

            case 5:
              _context10.t1 = _context10.sent;
              searchResultA = (0, _context10.t0)(_context10.t1);
              searchParams = searchResultA.params;
              _context10.t2 = _AppProviderTypes.unsafeUnwrap;
              _context10.next = 11;
              return searchApi.searchByShortId(query, searchParams);

            case 11:
              _context10.t3 = _context10.sent;
              searchResultB = (0, _context10.t2)(_context10.t3);
              //Assert
              assert.equal(searchResultA.results.length, 3);
              assert.equal(searchResultB.results.length, 1);

            case 15:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    })));
    this.afterAll(
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11() {
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return _SearchApi.SearchApi.shortIdCol(firestore, orgId).doc("000100001").delete();

            case 2:
              _context11.next = 4;
              return _SearchApi.SearchApi.shortIdCol(firestore, orgId).doc("000100002").delete();

            case 4:
              _context11.next = 6;
              return _SearchApi.SearchApi.shortIdCol(firestore, orgId).doc("000100003").delete();

            case 6:
              _context11.next = 8;
              return _SearchApi.SearchApi.shortIdCol(firestore, orgId).doc("000100004").delete();

            case 8:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    })));
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvU2VhcmNoQXBpLnVuaXQudHMiXSwibmFtZXMiOlsicmVxdWlyZSIsIm9yZ0lkIiwiZGVzY3JpYmUiLCJ0aW1lb3V0IiwiZmlyZXN0b3JlIiwiTW9ja0ZpcmVzdG9yZSIsInNlYXJjaEFwaSIsIlNlYXJjaEFwaSIsImJlZm9yZUFsbCIsInJlc291cmNlQ29sIiwiZG9jIiwic2V0IiwiRGVmYXVsdE15V2VsbFJlc291cmNlIiwiaWQiLCJncm91cHMiLCJjb3VudHJ5IiwicGluY29kZSIsIml0Iiwic2VhcmNoUXVlcnkiLCJ1bnNhZmVVbndyYXAiLCJzZWFyY2hGb3JSZXNvdXJjZUluR3JvdXAiLCJsaW1pdCIsInJlc3VsdCIsImFzc2VydCIsImVxdWFsIiwicmVzdWx0cyIsImxlbmd0aCIsInNraXAiLCJzZWFyY2hQYXJhbXMiLCJzZWFyY2hSZXN1bHRBIiwicGFyYW1zIiwic2VhcmNoUmVzdWx0QiIsImFmdGVyQWxsIiwiZGVsZXRlIiwic2hvcnRJZENvbCIsIkRlZmF1bHRTaG9ydElkIiwic2hvcnRJZCIsImdldCIsInRoZW4iLCJxcyIsImNvbnNvbGUiLCJsb2ciLCJkb2NzIiwiaW5wdXRzIiwiZXhwZWN0ZWQiLCJmb3JFYWNoIiwiaW5wdXQiLCJpZHgiLCJkZWVwRXF1YWwiLCJyYW5nZUZyb21TaG9ydElkU3RyaW5nIiwic2VhcmNoQnlTaG9ydElkIiwicXVlcnkiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O2VBS0lBLE9BQU8sQ0FBQyx5QkFBRCxDO0lBRFRDLEssWUFBQUEsSzs7QUFJRkMsUUFBUSxDQUFDLFlBQUQsRUFBZSxZQUFZO0FBQ2pDLE9BQUtDLE9BQUwsQ0FBYSxJQUFiO0FBR0FELEVBQUFBLFFBQVEsQ0FBQyxRQUFELEVBQVcsWUFBWTtBQUM3QixRQUFNRSxTQUFvQixHQUFHLElBQUlDLDJCQUFKLENBQWtCLEVBQWxCLEVBQXNCRCxTQUF0QixF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LE1BQXhELEVBSk07O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBZDtBQU1ELEdBN0VPLENBQVI7QUE4RUQsQ0F4S08sQ0FBUiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnbW9jaGEnO1xuaW1wb3J0ICogYXMgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG4vL0B0cy1pZ25vcmVcbmltcG9ydCBNb2NrRmlyZXN0b3JlIGZyb20gJ21vY2stY2xvdWQtZmlyZXN0b3JlJztcbmltcG9ydCB7IFNlYXJjaEFwaSwgU2VhcmNoUGFnZVBhcmFtcyB9IGZyb20gJy4vU2VhcmNoQXBpJztcbmltcG9ydCB7IHVuc2FmZVVud3JhcCB9IGZyb20gJy4uL3V0aWxzL0FwcFByb3ZpZGVyVHlwZXMnO1xuaW1wb3J0IHsgYWRtaW4gfSBmcm9tICcuLi90ZXN0L1Rlc3RGaXJlYmFzZSc7XG5pbXBvcnQgeyBEZWZhdWx0U2hvcnRJZCwgRGVmYXVsdE15V2VsbFJlc291cmNlIH0gZnJvbSAnLi4vbW9kZWwnO1xudHlwZSBGaXJlc3RvcmUgPSBhZG1pbi5maXJlc3RvcmUuRmlyZXN0b3JlO1xuXG5jb25zdCB7XG4gIG9yZ0lkLFxufSA9IHJlcXVpcmUoJy4uL3Rlc3QvdGVzdENvbmZpZy5qc29uJyk7XG5cblxuZGVzY3JpYmUoJ1NlYXJjaCBBcGknLCBmdW5jdGlvbiAoKSB7XG4gIHRoaXMudGltZW91dCg1MDAwKTtcblxuXG4gIGRlc2NyaWJlKCdHcm91cHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgZmlyZXN0b3JlOiBGaXJlc3RvcmUgPSBuZXcgTW9ja0ZpcmVzdG9yZSh7fSkuZmlyZXN0b3JlKCk7XG4gICAgY29uc3Qgc2VhcmNoQXBpID0gbmV3IFNlYXJjaEFwaShmaXJlc3RvcmUsIG9yZ0lkKTtcblxuICAgIHRoaXMuYmVmb3JlQWxsKGFzeW5jICgpID0+IHtcbiAgICAgIC8vVE9ETzogQWRkIGEgYnVuY2ggb2Ygc2hvcnRJZHNcbiAgICAgIGF3YWl0IFNlYXJjaEFwaS5yZXNvdXJjZUNvbChmaXJlc3RvcmUsIG9yZ0lkKS5kb2MoXCIwMDAwMVwiKS5zZXQoey4uLkRlZmF1bHRNeVdlbGxSZXNvdXJjZSwgaWQ6IFwiMDAwMDFcIiwgZ3JvdXBzOiB7IGNvdW50cnk6IFwiSU5cIiwgcGluY29kZTogXCIzMTM2MDNcIn19KTtcbiAgICAgIGF3YWl0IFNlYXJjaEFwaS5yZXNvdXJjZUNvbChmaXJlc3RvcmUsIG9yZ0lkKS5kb2MoXCIwMDAwMlwiKS5zZXQoey4uLkRlZmF1bHRNeVdlbGxSZXNvdXJjZSwgaWQ6IFwiMDAwMDJcIiwgZ3JvdXBzOiB7IGNvdW50cnk6IFwiSU5cIiwgcGluY29kZTogXCIzMTM2MDNcIn19KTtcbiAgICAgIGF3YWl0IFNlYXJjaEFwaS5yZXNvdXJjZUNvbChmaXJlc3RvcmUsIG9yZ0lkKS5kb2MoXCIwMDAwM1wiKS5zZXQoey4uLkRlZmF1bHRNeVdlbGxSZXNvdXJjZSwgaWQ6IFwiMDAwMDNcIiwgZ3JvdXBzOiB7IGNvdW50cnk6IFwiQVVcIiwgcGluY29kZTogXCI1MDE2XCJ9fSk7XG4gICAgICBhd2FpdCBTZWFyY2hBcGkucmVzb3VyY2VDb2woZmlyZXN0b3JlLCBvcmdJZCkuZG9jKFwiMDAwMDRcIikuc2V0KHsuLi5EZWZhdWx0TXlXZWxsUmVzb3VyY2UsIGlkOiBcIjAwMDA0XCIsIGdyb3VwczogeyBjb3VudHJ5OiBcIkFVXCIsIHBpbmNvZGU6IFwiNTA2M1wifX0pO1xuICAgICAgYXdhaXQgU2VhcmNoQXBpLnJlc291cmNlQ29sKGZpcmVzdG9yZSwgb3JnSWQpLmRvYyhcIjAwMDA1XCIpLnNldCh7Li4uRGVmYXVsdE15V2VsbFJlc291cmNlLCBpZDogXCIwMDAwNVwiLCBncm91cHM6IHsgY291bnRyeTogXCJJTFwiLCBwaW5jb2RlOiBcIjU1NTVcIn19KTtcbiAgICAgIGF3YWl0IFNlYXJjaEFwaS5yZXNvdXJjZUNvbChmaXJlc3RvcmUsIG9yZ0lkKS5kb2MoXCIwMDAwNlwiKS5zZXQoey4uLkRlZmF1bHRNeVdlbGxSZXNvdXJjZSwgaWQ6IFwiMDAwMDZcIiwgZ3JvdXBzOiB7IGNvdW50cnk6IFwiSUxcIiwgcGluY29kZTogXCIzMTM2MDRcIn19KTtcbiAgICAgIGF3YWl0IFNlYXJjaEFwaS5yZXNvdXJjZUNvbChmaXJlc3RvcmUsIG9yZ0lkKS5kb2MoXCIwMDAwN1wiKS5zZXQoey4uLkRlZmF1bHRNeVdlbGxSZXNvdXJjZSwgaWQ6IFwiMDAwMDdcIiwgZ3JvdXBzOiB7IGNvdW50cnk6IFwiSUxcIiwgcGluY29kZTogXCIzMTM2MDVcIn19KTtcbiAgICB9KTtcblxuICAgIGl0KCdzZWFyY2hlcyBmb3IgcmVzb3VyY2VzIHdpdGhpbiB0aGUgcGluY29kZSBncm91cCcsIGFzeW5jICgpID0+IHtcbiAgICAgIC8vIEFycmFuZ2VcbiAgICAgIGNvbnN0IHNlYXJjaFF1ZXJ5ID0gXCIzMTNcIjtcblxuICAgICAgLy9BY3RcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHVuc2FmZVVud3JhcChhd2FpdCBzZWFyY2hBcGkuc2VhcmNoRm9yUmVzb3VyY2VJbkdyb3VwKHNlYXJjaFF1ZXJ5LCAncGluY29kZScsIHsgbGltaXQ6IDEwIH0pKTtcblxuICAgICAgLy9Bc3NlcnRcbiAgICAgIGFzc2VydC5lcXVhbChyZXN1bHQucmVzdWx0cy5sZW5ndGgsIDQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NlYXJjaGVzIGZvciByZXNvdXJjZXMgd2l0aCBhIGZ1bGwgcGluY29kZScsIGFzeW5jICgpID0+IHtcbiAgICAgIC8vIEFycmFuZ2VcbiAgICAgIGNvbnN0IHNlYXJjaFF1ZXJ5ID0gXCIzMTM2MDNcIjtcblxuICAgICAgLy9BY3RcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHVuc2FmZVVud3JhcChhd2FpdCBzZWFyY2hBcGkuc2VhcmNoRm9yUmVzb3VyY2VJbkdyb3VwKHNlYXJjaFF1ZXJ5LCAncGluY29kZScsIHsgbGltaXQ6IDEwIH0pKTtcblxuICAgICAgLy9Bc3NlcnRcbiAgICAgIGFzc2VydC5lcXVhbChyZXN1bHQucmVzdWx0cy5sZW5ndGgsIDIpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NlYXJjaGVzIGZvciByZXNvdXJjZXMgd2l0aGluIHRoZSBjb3VudHJ5IGdyb3VwJywgYXN5bmMgKCkgPT4ge1xuICAgICAgLy8gQXJyYW5nZVxuICAgICAgY29uc3Qgc2VhcmNoUXVlcnkgPSBcIklcIjtcblxuICAgICAgLy9BY3RcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHVuc2FmZVVud3JhcChhd2FpdCBzZWFyY2hBcGkuc2VhcmNoRm9yUmVzb3VyY2VJbkdyb3VwKHNlYXJjaFF1ZXJ5LCAnY291bnRyeScsIHsgbGltaXQ6IDEwIH0pKTtcblxuICAgICAgLy9Bc3NlcnRcbiAgICAgIGFzc2VydC5lcXVhbChyZXN1bHQucmVzdWx0cy5sZW5ndGgsIDUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NlYXJjaGVzIGZvciByZXNvdXJjZXMgd2l0aGluIHRoZSBjb3VudHJ5IGdyb3VwIHdpdGggYW4gZXhhY3QgbWF0Y2gnLCBhc3luYyAoKSA9PiB7XG4gICAgICAvLyBBcnJhbmdlXG4gICAgICBjb25zdCBzZWFyY2hRdWVyeSA9IFwiSUxcIjtcblxuICAgICAgLy9BY3RcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHVuc2FmZVVud3JhcChhd2FpdCBzZWFyY2hBcGkuc2VhcmNoRm9yUmVzb3VyY2VJbkdyb3VwKHNlYXJjaFF1ZXJ5LCAnY291bnRyeScsIHsgbGltaXQ6IDEwIH0pKTtcblxuICAgICAgLy9Bc3NlcnRcbiAgICAgIGFzc2VydC5lcXVhbChyZXN1bHQucmVzdWx0cy5sZW5ndGgsIDMpO1xuICAgIH0pO1xuXG4gICAgLy9QYWdpbmF0aW9uIGRvZXNuJ3Qgd29yayBjb3JyZWN0bHkgZm9yIG1vY2stY2xvdWQtZmlyZXN0b3JlXG4gICAgLy9UaGlzIHRlc3QgcGFzc2VzIGFnYWluc3QgbGl2ZSBmaXJlYmFzZVxuICAgIGl0LnNraXAoJ3BhZ2luYXRlcyBjb3JyZWN0bHknLCBhc3luYyAoKSA9PiB7XG4gICAgICAvLyBBcnJhbmdlXG4gICAgICBjb25zdCBzZWFyY2hRdWVyeSA9IFwiSVwiO1xuICAgICAgbGV0IHNlYXJjaFBhcmFtczogU2VhcmNoUGFnZVBhcmFtcyA9IHsgbGltaXQ6IDIgfTtcblxuXG4gICAgICAvL0FjdFxuICAgICAgY29uc3Qgc2VhcmNoUmVzdWx0QSA9IHVuc2FmZVVud3JhcChhd2FpdCBzZWFyY2hBcGkuc2VhcmNoRm9yUmVzb3VyY2VJbkdyb3VwKHNlYXJjaFF1ZXJ5LCAnY291bnRyeScsIHNlYXJjaFBhcmFtcykpO1xuICAgICAgc2VhcmNoUGFyYW1zID0gc2VhcmNoUmVzdWx0QS5wYXJhbXM7XG4gICAgICBjb25zdCBzZWFyY2hSZXN1bHRCID0gdW5zYWZlVW53cmFwKGF3YWl0IHNlYXJjaEFwaS5zZWFyY2hGb3JSZXNvdXJjZUluR3JvdXAoc2VhcmNoUXVlcnksICdjb3VudHJ5Jywgc2VhcmNoUGFyYW1zKSk7XG5cbiAgICAgIC8vQXNzZXJ0XG4gICAgICBhc3NlcnQuZXF1YWwoc2VhcmNoUmVzdWx0QS5yZXN1bHRzLmxlbmd0aCwgMik7XG4gICAgICBhc3NlcnQuZXF1YWwoc2VhcmNoUmVzdWx0Qi5yZXN1bHRzLmxlbmd0aCwgMik7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFmdGVyQWxsKGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IFNlYXJjaEFwaS5yZXNvdXJjZUNvbChmaXJlc3RvcmUsIG9yZ0lkKS5kb2MoXCIwMDAwMVwiKS5kZWxldGUoKTtcbiAgICAgIGF3YWl0IFNlYXJjaEFwaS5yZXNvdXJjZUNvbChmaXJlc3RvcmUsIG9yZ0lkKS5kb2MoXCIwMDAwMlwiKS5kZWxldGUoKTtcbiAgICAgIGF3YWl0IFNlYXJjaEFwaS5yZXNvdXJjZUNvbChmaXJlc3RvcmUsIG9yZ0lkKS5kb2MoXCIwMDAwM1wiKS5kZWxldGUoKTtcbiAgICAgIGF3YWl0IFNlYXJjaEFwaS5yZXNvdXJjZUNvbChmaXJlc3RvcmUsIG9yZ0lkKS5kb2MoXCIwMDAwNFwiKS5kZWxldGUoKTtcbiAgICAgIGF3YWl0IFNlYXJjaEFwaS5yZXNvdXJjZUNvbChmaXJlc3RvcmUsIG9yZ0lkKS5kb2MoXCIwMDAwNVwiKS5kZWxldGUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ1Nob3J0SWQnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zdCBmaXJlc3RvcmU6IEZpcmVzdG9yZSA9IG5ldyBNb2NrRmlyZXN0b3JlKHt9KS5maXJlc3RvcmUoKTtcbiAgICBjb25zdCBzZWFyY2hBcGkgPSBuZXcgU2VhcmNoQXBpKGZpcmVzdG9yZSwgb3JnSWQpO1xuXG4gICAgdGhpcy5iZWZvcmVBbGwoYXN5bmMgKCkgPT4ge1xuICAgICAgLy9UT0RPOiBBZGQgYSBidW5jaCBvZiBzaG9ydElkc1xuICAgICAgYXdhaXQgU2VhcmNoQXBpLnNob3J0SWRDb2woZmlyZXN0b3JlLCBvcmdJZCkuZG9jKFwiMDAwMTAwMDAxXCIpLnNldCh7IC4uLkRlZmF1bHRTaG9ydElkLCBpZDogJzAwMDEwMDAwMScsIHNob3J0SWQ6ICcwMDAxMDAwMDEnfSk7XG4gICAgICBhd2FpdCBTZWFyY2hBcGkuc2hvcnRJZENvbChmaXJlc3RvcmUsIG9yZ0lkKS5kb2MoXCIwMDAxMDAwMDJcIikuc2V0KHsgLi4uRGVmYXVsdFNob3J0SWQsIGlkOiAnMDAwMTAwMDAyJywgc2hvcnRJZDogJzAwMDEwMDAwMid9KTtcbiAgICAgIGF3YWl0IFNlYXJjaEFwaS5zaG9ydElkQ29sKGZpcmVzdG9yZSwgb3JnSWQpLmRvYyhcIjAwMDEwMDAwM1wiKS5zZXQoeyAuLi5EZWZhdWx0U2hvcnRJZCwgaWQ6ICcwMDAxMDAwMDMnLCBzaG9ydElkOiAnMDAwMTAwMDAzJ30pO1xuICAgICAgYXdhaXQgU2VhcmNoQXBpLnNob3J0SWRDb2woZmlyZXN0b3JlLCBvcmdJZCkuZG9jKFwiMDAwMTAwMDA0XCIpLnNldCh7IC4uLkRlZmF1bHRTaG9ydElkLCBpZDogJzAwMDEwMDAwNCcsIHNob3J0SWQ6ICcwMDAxMDAwMDQnfSk7XG5cbiAgICAgIGF3YWl0IFNlYXJjaEFwaS5zaG9ydElkQ29sKGZpcmVzdG9yZSwgb3JnSWQpLmdldCgpLnRoZW4oKHFzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBXZSBoYXZlICR7cXMuZG9jcy5sZW5ndGh9IGRvY3MuYCk7XG4gICAgICB9KVxuICAgIH0pO1xuXG4gICAgaXQoJ3RyYW5zZm9ybXMgc2hvcnRJZCBzdHJpbmdzIGludG8gdmFsaWQgc2hvcnRJZCBsb29rdXAgcmFuZ2VzJywgKCkgPT4ge1xuICAgICAgY29uc3QgaW5wdXRzID0gW1xuICAgICAgICBcIjEwMC0wMDBcIixcbiAgICAgICAgXCIxMDAtLTAwMFwiLFxuICAgICAgICBcIjEwMCAxMDAgMDAwIFwiLFxuICAgICAgICBcIjEwMFwiLFxuICAgICAgICBcIjEwMDFcIixcbiAgICAgICAgXCIwMDAxMDAwMVwiLFxuICAgICAgXTtcblxuICAgICAgY29uc3QgZXhwZWN0ZWQgPSBbXG4gICAgICAgIFtcIjAwMDEwMDAwMFwiLCBcIjAwMDEwMDAwMFwiXSxcbiAgICAgICAgW1wiMDAwMTAwMDAwXCIsIFwiMDAwMTAwMDAwXCJdLFxuICAgICAgICBbXCIxMDAxMDAwMDBcIiwgXCIxMDAxMDAwMDBcIl0sXG4gICAgICAgIFtcIjAwMDEwMDAwMFwiLCBcIjAwMDEwMTAwMFwiXSxcbiAgICAgICAgW1wiMDAwMTAwMTAwXCIsIFwiMDAwMTAwMjAwXCJdLFxuICAgICAgICBbXCIwMDAxMDAwMTBcIiwgXCIwMDAxMDAwMjBcIl0sXG4gICAgICBdO1xuXG4gICAgICBpbnB1dHMuZm9yRWFjaCgoaW5wdXQsIGlkeCkgPT4gYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgdW5zYWZlVW53cmFwKFNlYXJjaEFwaS5yYW5nZUZyb21TaG9ydElkU3RyaW5nKGlucHV0KSksIFxuICAgICAgICBleHBlY3RlZFtpZHhdXG4gICAgICApKTtcbiAgICB9KTtcblxuICAgIGl0KCdwZXJmb3JtcyBhIGJhc2ljIHNlYXJjaCcsIGFzeW5jICgpID0+IHtcbiAgICAgIC8vQXJyYW5nZVxuICAgICAgY29uc3Qgc2hvcnRJZCA9IFwiMTAwLTAwMVwiO1xuXG4gICAgICAvL0FjdFxuICAgICAgY29uc3QgcmVzdWx0ID0gdW5zYWZlVW53cmFwKGF3YWl0IHNlYXJjaEFwaS5zZWFyY2hCeVNob3J0SWQoc2hvcnRJZCwge2xpbWl0OiAxMH0pKTtcblxuICAgICAgLy9Bc3NlcnRcbiAgICAgIGFzc2VydC5lcXVhbChyZXN1bHQucmVzdWx0cy5sZW5ndGgsIDEpO1xuICAgIH0pO1xuXG4gICAgLy9QYWdpbmF0aW9uIGRvZXNuJ3Qgd29yayBjb3JyZWN0bHkgZm9yIG1vY2stY2xvdWQtZmlyZXN0b3JlXG4gICAgLy9UaGlzIHRlc3QgcGFzc2VzIGFnYWluc3QgbGl2ZSBmaXJlYmFzZVxuICAgIGl0LnNraXAoJ3BlcmZvcm1zIGEgcGFnaW5hdGVkIHNlYXJjaCcsIGFzeW5jICgpID0+IHtcbiAgICAgIC8vQXJyYW5nZVxuICAgICAgLy9UaGlzIHRlc3QgYXNzdW1lcyBvbmx0IDQgc2hvcnRJZHNcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gXCIxMDBcIjtcbiAgICAgIGxldCBzZWFyY2hQYXJhbXM6IFNlYXJjaFBhZ2VQYXJhbXMgPSB7IGxpbWl0OiAzIH07XG5cbiAgICAgIC8vQWN0XG4gICAgICBjb25zdCBzZWFyY2hSZXN1bHRBID0gdW5zYWZlVW53cmFwKGF3YWl0IHNlYXJjaEFwaS5zZWFyY2hCeVNob3J0SWQocXVlcnksIHNlYXJjaFBhcmFtcykpO1xuICAgICAgc2VhcmNoUGFyYW1zID0gc2VhcmNoUmVzdWx0QS5wYXJhbXM7XG4gICAgICBjb25zdCBzZWFyY2hSZXN1bHRCID0gdW5zYWZlVW53cmFwKGF3YWl0IHNlYXJjaEFwaS5zZWFyY2hCeVNob3J0SWQocXVlcnksIHNlYXJjaFBhcmFtcykpO1xuXG4gICAgICAvL0Fzc2VydFxuICAgICAgYXNzZXJ0LmVxdWFsKHNlYXJjaFJlc3VsdEEucmVzdWx0cy5sZW5ndGgsIDMpO1xuICAgICAgYXNzZXJ0LmVxdWFsKHNlYXJjaFJlc3VsdEIucmVzdWx0cy5sZW5ndGgsIDEpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hZnRlckFsbChhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBTZWFyY2hBcGkuc2hvcnRJZENvbChmaXJlc3RvcmUsIG9yZ0lkKS5kb2MoXCIwMDAxMDAwMDFcIikuZGVsZXRlKCk7XG4gICAgICBhd2FpdCBTZWFyY2hBcGkuc2hvcnRJZENvbChmaXJlc3RvcmUsIG9yZ0lkKS5kb2MoXCIwMDAxMDAwMDJcIikuZGVsZXRlKCk7XG4gICAgICBhd2FpdCBTZWFyY2hBcGkuc2hvcnRJZENvbChmaXJlc3RvcmUsIG9yZ0lkKS5kb2MoXCIwMDAxMDAwMDNcIikuZGVsZXRlKCk7XG4gICAgICBhd2FpdCBTZWFyY2hBcGkuc2hvcnRJZENvbChmaXJlc3RvcmUsIG9yZ0lkKS5kb2MoXCIwMDAxMDAwMDRcIikuZGVsZXRlKCk7XG4gICAgfSk7XG4gIH0pO1xufSk7Il19