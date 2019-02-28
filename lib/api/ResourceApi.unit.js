"use strict";

require("mocha");

var assert = _interopRequireWildcard(require("assert"));

var _mockCloudFirestore = _interopRequireDefault(require("mock-cloud-firestore"));

var _ResourceApi = require("./ResourceApi");

var _model = require("../model");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('../test/testConfig.json'),
    orgId = _require.orgId;

describe('Resource Api', function () {
  this.timeout(5000);
  var firestore = new _mockCloudFirestore.default({}).firestore();
  var resourceApi = new _ResourceApi.ResourceApi(firestore, orgId);
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
            return resourceApi.resourceRef("00001").set(_objectSpread({}, _model.DefaultResource, {
              id: "00001",
              groups: {
                country: "IN",
                pincode: "313603"
              }
            }));

          case 2:
            _context.next = 4;
            return resourceApi.resourceRef("00002").set(_objectSpread({}, _model.DefaultResource, {
              id: "00002",
              groups: {
                country: "IN",
                pincode: "313603"
              }
            }));

          case 4:
            _context.next = 6;
            return resourceApi.resourceRef("00003").set(_objectSpread({}, _model.DefaultResource, {
              id: "00003",
              groups: {
                country: "IN",
                pincode: "313603"
              }
            }));

          case 6:
            _context.next = 8;
            return resourceApi.resourceRef("00004").set(_objectSpread({}, _model.DefaultResource, {
              id: "00004",
              groups: {
                country: "IN",
                pincode: "313603"
              }
            }));

          case 8:
            _context.next = 10;
            return resourceApi.resourceRef("00005").set(_objectSpread({}, _model.DefaultResource, {
              id: "00005",
              groups: {
                country: "IN",
                pincode: "313603"
              }
            }));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })));
  it('gets a resource for an id',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var resourceId, resource;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            //Arrange
            resourceId = "00001"; //Act

            _context2.t0 = _utils.unsafeUnwrap;
            _context2.next = 4;
            return resourceApi.getResourceForId(resourceId);

          case 4:
            _context2.t1 = _context2.sent;
            resource = (0, _context2.t0)(_context2.t1);
            //Assert
            assert.equal(resource.id, resourceId);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  })));
  it('gets a list of resources from a list of ids',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var resourceIds, resources;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            //Arrange
            resourceIds = ["00001", "00002", "00003", "00005"]; //Act

            _context3.t0 = _utils.unsafeUnwrap;
            _context3.next = 4;
            return resourceApi.getResourcesForIds(resourceIds);

          case 4:
            _context3.t1 = _context3.sent;
            resources = (0, _context3.t0)(_context3.t1);
            //Assert
            assert.equal(resources.length, resourceIds.length);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  })));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvUmVzb3VyY2VBcGkudW5pdC50cyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwib3JnSWQiLCJkZXNjcmliZSIsInRpbWVvdXQiLCJmaXJlc3RvcmUiLCJNb2NrRmlyZXN0b3JlIiwicmVzb3VyY2VBcGkiLCJSZXNvdXJjZUFwaSIsImJlZm9yZUFsbCIsInJlc291cmNlUmVmIiwic2V0IiwiRGVmYXVsdFJlc291cmNlIiwiaWQiLCJncm91cHMiLCJjb3VudHJ5IiwicGluY29kZSIsIml0IiwicmVzb3VyY2VJZCIsInVuc2FmZVVud3JhcCIsImdldFJlc291cmNlRm9ySWQiLCJyZXNvdXJjZSIsImFzc2VydCIsImVxdWFsIiwicmVzb3VyY2VJZHMiLCJnZXRSZXNvdXJjZXNGb3JJZHMiLCJyZXNvdXJjZXMiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBSUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O2VBTUlBLE9BQU8sQ0FBQyx5QkFBRCxDO0lBRFRDLEssWUFBQUEsSzs7QUFJRkMsUUFBUSxDQUFDLGNBQUQsRUFBaUIsWUFBWTtBQUNuQyxPQUFLQyxPQUFMLENBQWEsSUFBYjtBQUNBLE1BQU1DLFNBQW9CLEdBQUcsSUFBSUMsMkJBQUosQ0FBa0IsRUFBbEIsRUFBc0JELFNBQXRCLEVBQTdCO0FBQ0EsTUFBTUUsV0FBVyxHQUFHLElBQUlDLHdCQUFKLENBQWdCSCxTQUFoQixFQUEyQkgsS0FBM0IsQ0FBcEI7QUFHQSxPQUFLTyxTQUFMO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQWU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRVBGLFdBQVcsQ0FBQ0csV0FBWixDQUF3QixPQUF4QixFQUFpQ0MsR0FBakMsbUJBQTBDQyxzQkFBMUM7QUFBMkRDLGNBQUFBLEVBQUUsRUFBRSxPQUEvRDtBQUF3RUMsY0FBQUEsTUFBTSxFQUFFO0FBQUVDLGdCQUFBQSxPQUFPLEVBQUUsSUFBWDtBQUFpQkMsZ0JBQUFBLE9BQU8sRUFBRTtBQUExQjtBQUFoRixlQUZPOztBQUFBO0FBQUE7QUFBQSxtQkFHUFQsV0FBVyxDQUFDRyxXQUFaLENBQXdCLE9BQXhCLEVBQWlDQyxHQUFqQyxtQkFBMENDLHNCQUExQztBQUEyREMsY0FBQUEsRUFBRSxFQUFFLE9BQS9EO0FBQXdFQyxjQUFBQSxNQUFNLEVBQUU7QUFBRUMsZ0JBQUFBLE9BQU8sRUFBRSxJQUFYO0FBQWlCQyxnQkFBQUEsT0FBTyxFQUFFO0FBQTFCO0FBQWhGLGVBSE87O0FBQUE7QUFBQTtBQUFBLG1CQUlQVCxXQUFXLENBQUNHLFdBQVosQ0FBd0IsT0FBeEIsRUFBaUNDLEdBQWpDLG1CQUEwQ0Msc0JBQTFDO0FBQTJEQyxjQUFBQSxFQUFFLEVBQUUsT0FBL0Q7QUFBd0VDLGNBQUFBLE1BQU0sRUFBRTtBQUFFQyxnQkFBQUEsT0FBTyxFQUFFLElBQVg7QUFBaUJDLGdCQUFBQSxPQUFPLEVBQUU7QUFBMUI7QUFBaEYsZUFKTzs7QUFBQTtBQUFBO0FBQUEsbUJBS1BULFdBQVcsQ0FBQ0csV0FBWixDQUF3QixPQUF4QixFQUFpQ0MsR0FBakMsbUJBQTBDQyxzQkFBMUM7QUFBMkRDLGNBQUFBLEVBQUUsRUFBRSxPQUEvRDtBQUF3RUMsY0FBQUEsTUFBTSxFQUFFO0FBQUVDLGdCQUFBQSxPQUFPLEVBQUUsSUFBWDtBQUFpQkMsZ0JBQUFBLE9BQU8sRUFBRTtBQUExQjtBQUFoRixlQUxPOztBQUFBO0FBQUE7QUFBQSxtQkFNUFQsV0FBVyxDQUFDRyxXQUFaLENBQXdCLE9BQXhCLEVBQWlDQyxHQUFqQyxtQkFBMENDLHNCQUExQztBQUEyREMsY0FBQUEsRUFBRSxFQUFFLE9BQS9EO0FBQXdFQyxjQUFBQSxNQUFNLEVBQUU7QUFBRUMsZ0JBQUFBLE9BQU8sRUFBRSxJQUFYO0FBQWlCQyxnQkFBQUEsT0FBTyxFQUFFO0FBQTFCO0FBQWhGLGVBTk87O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBZjtBQVVBQyxFQUFBQSxFQUFFLENBQUMsMkJBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBOEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQzlCO0FBQ01DLFlBQUFBLFVBRndCLEdBRVgsT0FGVyxFQUk5Qjs7QUFKOEIsMkJBS2JDLG1CQUxhO0FBQUE7QUFBQSxtQkFLTVosV0FBVyxDQUFDYSxnQkFBWixDQUE2QkYsVUFBN0IsQ0FMTjs7QUFBQTtBQUFBO0FBS3hCRyxZQUFBQSxRQUx3QjtBQU85QjtBQUNBQyxZQUFBQSxNQUFNLENBQUNDLEtBQVAsQ0FBYUYsUUFBUSxDQUFDUixFQUF0QixFQUEwQkssVUFBMUI7O0FBUjhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQTlCLEdBQUY7QUFXQUQsRUFBQUEsRUFBRSxDQUFDLDZDQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQWdEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNoRDtBQUNNTyxZQUFBQSxXQUYwQyxHQUU1QixDQUNsQixPQURrQixFQUVsQixPQUZrQixFQUdsQixPQUhrQixFQUlsQixPQUprQixDQUY0QixFQVNoRDs7QUFUZ0QsMkJBVTlCTCxtQkFWOEI7QUFBQTtBQUFBLG1CQVVYWixXQUFXLENBQUNrQixrQkFBWixDQUErQkQsV0FBL0IsQ0FWVzs7QUFBQTtBQUFBO0FBVTFDRSxZQUFBQSxTQVYwQztBQVloRDtBQUNBSixZQUFBQSxNQUFNLENBQUNDLEtBQVAsQ0FBYUcsU0FBUyxDQUFDQyxNQUF2QixFQUErQkgsV0FBVyxDQUFDRyxNQUEzQzs7QUFiZ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBaEQsR0FBRjtBQWdCRCxDQTNDTyxDQUFSIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdtb2NoYSc7XG5pbXBvcnQgKiBhcyBhc3NlcnQgZnJvbSAnYXNzZXJ0Jztcbi8vQHRzLWlnbm9yZVxuaW1wb3J0IE1vY2tGaXJlc3RvcmUgZnJvbSAnbW9jay1jbG91ZC1maXJlc3RvcmUnO1xuaW1wb3J0IHsgUmVzb3VyY2VBcGkgfSBmcm9tICcuL1Jlc291cmNlQXBpJztcbi8vIGltcG9ydCB7IFNlYXJjaEFwaSwgU2VhcmNoUGFnZVBhcmFtcyB9IGZyb20gJy4vU2VhcmNoQXBpJztcbi8vIGltcG9ydCB7IHVuc2FmZVVud3JhcCB9IGZyb20gJy4uL3V0aWxzL0FwcFByb3ZpZGVyVHlwZXMnO1xuaW1wb3J0IHsgYWRtaW4gfSBmcm9tICcuLi90ZXN0L1Rlc3RGaXJlYmFzZSc7XG5pbXBvcnQgeyBEZWZhdWx0UmVzb3VyY2UgfSBmcm9tICcuLi9tb2RlbCc7XG5pbXBvcnQgeyB1bnNhZmVVbndyYXAgfSBmcm9tICcuLi91dGlscyc7XG4vLyBpbXBvcnQgeyBEZWZhdWx0U2hvcnRJZCwgRGVmYXVsdE15V2VsbFJlc291cmNlIH0gZnJvbSAnLi4vbW9kZWwnO1xudHlwZSBGaXJlc3RvcmUgPSBhZG1pbi5maXJlc3RvcmUuRmlyZXN0b3JlO1xuXG5jb25zdCB7XG4gIG9yZ0lkLFxufSA9IHJlcXVpcmUoJy4uL3Rlc3QvdGVzdENvbmZpZy5qc29uJyk7XG5cblxuZGVzY3JpYmUoJ1Jlc291cmNlIEFwaScsIGZ1bmN0aW9uICgpIHtcbiAgdGhpcy50aW1lb3V0KDUwMDApO1xuICBjb25zdCBmaXJlc3RvcmU6IEZpcmVzdG9yZSA9IG5ldyBNb2NrRmlyZXN0b3JlKHt9KS5maXJlc3RvcmUoKTtcbiAgY29uc3QgcmVzb3VyY2VBcGkgPSBuZXcgUmVzb3VyY2VBcGkoZmlyZXN0b3JlLCBvcmdJZCk7XG5cblxuICB0aGlzLmJlZm9yZUFsbChhc3luYyAoKSA9PiB7XG4gICAgLy9UT0RPOiBBZGQgYSBidW5jaCBvZiBzaG9ydElkc1xuICAgIGF3YWl0IHJlc291cmNlQXBpLnJlc291cmNlUmVmKFwiMDAwMDFcIikuc2V0KHsgLi4uRGVmYXVsdFJlc291cmNlLCBpZDogXCIwMDAwMVwiLCBncm91cHM6IHsgY291bnRyeTogXCJJTlwiLCBwaW5jb2RlOiBcIjMxMzYwM1wiIH0gfSk7XG4gICAgYXdhaXQgcmVzb3VyY2VBcGkucmVzb3VyY2VSZWYoXCIwMDAwMlwiKS5zZXQoeyAuLi5EZWZhdWx0UmVzb3VyY2UsIGlkOiBcIjAwMDAyXCIsIGdyb3VwczogeyBjb3VudHJ5OiBcIklOXCIsIHBpbmNvZGU6IFwiMzEzNjAzXCIgfSB9KTtcbiAgICBhd2FpdCByZXNvdXJjZUFwaS5yZXNvdXJjZVJlZihcIjAwMDAzXCIpLnNldCh7IC4uLkRlZmF1bHRSZXNvdXJjZSwgaWQ6IFwiMDAwMDNcIiwgZ3JvdXBzOiB7IGNvdW50cnk6IFwiSU5cIiwgcGluY29kZTogXCIzMTM2MDNcIiB9IH0pO1xuICAgIGF3YWl0IHJlc291cmNlQXBpLnJlc291cmNlUmVmKFwiMDAwMDRcIikuc2V0KHsgLi4uRGVmYXVsdFJlc291cmNlLCBpZDogXCIwMDAwNFwiLCBncm91cHM6IHsgY291bnRyeTogXCJJTlwiLCBwaW5jb2RlOiBcIjMxMzYwM1wiIH0gfSk7XG4gICAgYXdhaXQgcmVzb3VyY2VBcGkucmVzb3VyY2VSZWYoXCIwMDAwNVwiKS5zZXQoeyAuLi5EZWZhdWx0UmVzb3VyY2UsIGlkOiBcIjAwMDA1XCIsIGdyb3VwczogeyBjb3VudHJ5OiBcIklOXCIsIHBpbmNvZGU6IFwiMzEzNjAzXCIgfSB9KTtcbiAgfSk7XG5cblxuICBpdCgnZ2V0cyBhIHJlc291cmNlIGZvciBhbiBpZCcsIGFzeW5jICgpID0+IHtcbiAgICAvL0FycmFuZ2VcbiAgICBjb25zdCByZXNvdXJjZUlkID0gXCIwMDAwMVwiO1xuXG4gICAgLy9BY3RcbiAgICBjb25zdCByZXNvdXJjZSA9IHVuc2FmZVVud3JhcChhd2FpdCByZXNvdXJjZUFwaS5nZXRSZXNvdXJjZUZvcklkKHJlc291cmNlSWQpKTtcblxuICAgIC8vQXNzZXJ0XG4gICAgYXNzZXJ0LmVxdWFsKHJlc291cmNlLmlkLCByZXNvdXJjZUlkKTtcbiAgfSk7XG5cbiAgaXQoJ2dldHMgYSBsaXN0IG9mIHJlc291cmNlcyBmcm9tIGEgbGlzdCBvZiBpZHMnLCBhc3luYyAoKSA9PiB7XG4gICAgLy9BcnJhbmdlXG4gICAgY29uc3QgcmVzb3VyY2VJZHMgPSBbXG4gICAgICBcIjAwMDAxXCIsIFxuICAgICAgXCIwMDAwMlwiLCBcbiAgICAgIFwiMDAwMDNcIiwgXG4gICAgICBcIjAwMDA1XCIsIFxuICAgIF1cblxuICAgIC8vQWN0XG4gICAgY29uc3QgcmVzb3VyY2VzID0gdW5zYWZlVW53cmFwKGF3YWl0IHJlc291cmNlQXBpLmdldFJlc291cmNlc0ZvcklkcyhyZXNvdXJjZUlkcykpO1xuXG4gICAgLy9Bc3NlcnRcbiAgICBhc3NlcnQuZXF1YWwocmVzb3VyY2VzLmxlbmd0aCwgcmVzb3VyY2VJZHMubGVuZ3RoKTtcbiAgfSk7XG5cbn0pOyJdfQ==