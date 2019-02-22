"use strict";

require("mocha");

var assert = _interopRequireWildcard(require("assert"));

var _SearchApi = require("./SearchApi");

var _AppProviderTypes = require("../utils/AppProviderTypes");

var _TestFirebase = require("../test/TestFirebase");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('../test/testConfig.json'),
    orgId = _require.orgId;

describe('Search Api', function () {
  this.timeout(5000);
  describe('Groups', function () {
    var searchApi = new _SearchApi.SearchApi(_TestFirebase.firestore, orgId); // this.beforeAll(async () => {
    // });

    it('searches for a place, an returns the expected response',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var baseUrl, placeName, searchParams, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // Arrange
              baseUrl = "https://nominatim.openstreetmap.org/search";
              placeName = "Adelaide";
              searchParams = {
                limit: 10
              }; //Act

              _context.t0 = _AppProviderTypes.unsafeUnwrap;
              _context.next = 6;
              return searchApi.searchForPlaceName(baseUrl, placeName, searchParams);

            case 6:
              _context.t1 = _context.sent;
              result = (0, _context.t0)(_context.t1);
              //Assert
              //This is a little naive, but it's ok for now.
              assert.equal(result.results.length, 10);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }))); // this.afterAll(async () => {
    // });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvU2VhcmNoQXBpLnNlcnZpY2UudHMiXSwibmFtZXMiOlsicmVxdWlyZSIsIm9yZ0lkIiwiZGVzY3JpYmUiLCJ0aW1lb3V0Iiwic2VhcmNoQXBpIiwiU2VhcmNoQXBpIiwiZmlyZXN0b3JlIiwiaXQiLCJiYXNlVXJsIiwicGxhY2VOYW1lIiwic2VhcmNoUGFyYW1zIiwibGltaXQiLCJ1bnNhZmVVbndyYXAiLCJzZWFyY2hGb3JQbGFjZU5hbWUiLCJyZXN1bHQiLCJhc3NlcnQiLCJlcXVhbCIsInJlc3VsdHMiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBR0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O2VBSUlBLE9BQU8sQ0FBQyx5QkFBRCxDO0lBRFRDLEssWUFBQUEsSzs7QUFJRkMsUUFBUSxDQUFDLFlBQUQsRUFBZSxZQUFZO0FBQ2pDLE9BQUtDLE9BQUwsQ0FBYSxJQUFiO0FBR0FELEVBQUFBLFFBQVEsQ0FBQyxRQUFELEVBQVcsWUFBWTtBQUU3QixRQUFNRSxTQUFTLEdBQUcsSUFBSUMsb0JBQUosQ0FBY0MsdUJBQWQsRUFBeUJMLEtBQXpCLENBQWxCLENBRjZCLENBSTdCO0FBRUE7O0FBRUFNLElBQUFBLEVBQUUsQ0FBQyx3REFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLDRCQUEyRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDM0Q7QUFDTUMsY0FBQUEsT0FGcUQsR0FFM0MsNENBRjJDO0FBR3JEQyxjQUFBQSxTQUhxRCxHQUd6QyxVQUh5QztBQUlyREMsY0FBQUEsWUFKcUQsR0FJcEI7QUFBQ0MsZ0JBQUFBLEtBQUssRUFBRTtBQUFSLGVBSm9CLEVBTTNEOztBQU4yRCw0QkFPNUNDLDhCQVA0QztBQUFBO0FBQUEscUJBT3pCUixTQUFTLENBQUNTLGtCQUFWLENBQTZCTCxPQUE3QixFQUFzQ0MsU0FBdEMsRUFBaURDLFlBQWpELENBUHlCOztBQUFBO0FBQUE7QUFPckRJLGNBQUFBLE1BUHFEO0FBUzNEO0FBQ0E7QUFDQUMsY0FBQUEsTUFBTSxDQUFDQyxLQUFQLENBQWFGLE1BQU0sQ0FBQ0csT0FBUCxDQUFlQyxNQUE1QixFQUFvQyxFQUFwQzs7QUFYMkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBM0QsR0FBRixDQVI2QixDQXNCN0I7QUFFQTtBQUVELEdBMUJPLENBQVI7QUEyQkQsQ0EvQk8sQ0FBUiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnbW9jaGEnO1xuaW1wb3J0ICogYXMgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG4vL0B0cy1pZ25vcmVcbmltcG9ydCBNb2NrRmlyZXN0b3JlIGZyb20gJ21vY2stY2xvdWQtZmlyZXN0b3JlJztcbmltcG9ydCB7IFNlYXJjaEFwaSwgU2VhcmNoUGFnZVBhcmFtcyB9IGZyb20gJy4vU2VhcmNoQXBpJztcbmltcG9ydCB7IHVuc2FmZVVud3JhcCB9IGZyb20gJy4uL3V0aWxzL0FwcFByb3ZpZGVyVHlwZXMnO1xuaW1wb3J0IHsgZmlyZXN0b3JlIH0gZnJvbSAnLi4vdGVzdC9UZXN0RmlyZWJhc2UnO1xuXG5jb25zdCB7XG4gIG9yZ0lkLFxufSA9IHJlcXVpcmUoJy4uL3Rlc3QvdGVzdENvbmZpZy5qc29uJyk7XG5cblxuZGVzY3JpYmUoJ1NlYXJjaCBBcGknLCBmdW5jdGlvbiAoKSB7XG4gIHRoaXMudGltZW91dCg1MDAwKTtcblxuXG4gIGRlc2NyaWJlKCdHcm91cHMnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zdCBzZWFyY2hBcGkgPSBuZXcgU2VhcmNoQXBpKGZpcmVzdG9yZSwgb3JnSWQpO1xuXG4gICAgLy8gdGhpcy5iZWZvcmVBbGwoYXN5bmMgKCkgPT4ge1xuICAgIFxuICAgIC8vIH0pO1xuXG4gICAgaXQoJ3NlYXJjaGVzIGZvciBhIHBsYWNlLCBhbiByZXR1cm5zIHRoZSBleHBlY3RlZCByZXNwb25zZScsIGFzeW5jICgpID0+IHtcbiAgICAgIC8vIEFycmFuZ2VcbiAgICAgIGNvbnN0IGJhc2VVcmwgPSBcImh0dHBzOi8vbm9taW5hdGltLm9wZW5zdHJlZXRtYXAub3JnL3NlYXJjaFwiO1xuICAgICAgY29uc3QgcGxhY2VOYW1lID0gXCJBZGVsYWlkZVwiO1xuICAgICAgY29uc3Qgc2VhcmNoUGFyYW1zOiBTZWFyY2hQYWdlUGFyYW1zID0ge2xpbWl0OiAxMH07XG5cbiAgICAgIC8vQWN0XG4gICAgICBjb25zdCByZXN1bHQgPSB1bnNhZmVVbndyYXAoYXdhaXQgc2VhcmNoQXBpLnNlYXJjaEZvclBsYWNlTmFtZShiYXNlVXJsLCBwbGFjZU5hbWUsIHNlYXJjaFBhcmFtcykpO1xuXG4gICAgICAvL0Fzc2VydFxuICAgICAgLy9UaGlzIGlzIGEgbGl0dGxlIG5haXZlLCBidXQgaXQncyBvayBmb3Igbm93LlxuICAgICAgYXNzZXJ0LmVxdWFsKHJlc3VsdC5yZXN1bHRzLmxlbmd0aCwgMTApO1xuICAgIH0pO1xuXG4gICAgLy8gdGhpcy5hZnRlckFsbChhc3luYyAoKSA9PiB7XG4gICAgICBcbiAgICAvLyB9KTtcblxuICB9KTtcbn0pOyJdfQ==