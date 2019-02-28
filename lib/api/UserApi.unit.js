"use strict";

require("mocha");

var assert = _interopRequireWildcard(require("assert"));

var _UserApi = require("./UserApi");

var _mockCloudFirestore = _interopRequireDefault(require("mock-cloud-firestore"));

var _User = require("../model/User");

var _Resource = require("../model/Resource");

var _AppProviderTypes = require("../utils/AppProviderTypes");

var _UserStatus = _interopRequireDefault(require("../enums/UserStatus"));

var _UserType = _interopRequireDefault(require("../enums/UserType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('../test/testConfig.json'),
    orgId = _require.orgId;

var defaultResource = {
  type: _Resource.ResourceType.Any,
  id: 'resource_1',
  coords: {
    latitude: 12,
    longitude: 13
  },
  timeseries: {}
};
describe('User Api', function () {
  describe('favourites',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var firestore, userApi, userId;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            firestore = new _mockCloudFirestore.default({}).firestore();
            userApi = new _UserApi.UserApi(firestore, orgId);
            userId = 'user_id_1';
            this.beforeEach(
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return userApi.userRef(orgId, userId).set(_User.DefaultUser);

                    case 2:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            })));
            it('addFavouriteResource adds a favourite resource',
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee2() {
              var addFavResult, favouriteResources;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return userApi.addFavouriteResource(userId, defaultResource);

                    case 2:
                      addFavResult = _context2.sent;
                      (0, _AppProviderTypes.unsafeUnwrap)(addFavResult);
                      _context2.t0 = _AppProviderTypes.unsafeUnwrap;
                      _context2.next = 7;
                      return userApi.getFavouriteResources(userId);

                    case 7:
                      _context2.t1 = _context2.sent;
                      favouriteResources = (0, _context2.t0)(_context2.t1);
                      //Assert
                      assert.deepEqual({
                        resource_1: defaultResource
                      }, favouriteResources);

                    case 10:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            })));
            it('removeFavouriteResource removes a favourite resource',
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee3() {
              var addFavResult, removeFavResult, favouriteResources;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return userApi.addFavouriteResource(userId, defaultResource);

                    case 2:
                      addFavResult = _context3.sent;
                      (0, _AppProviderTypes.unsafeUnwrap)(addFavResult); //Act

                      _context3.next = 6;
                      return userApi.removeFavouriteResource(userId, defaultResource.id);

                    case 6:
                      removeFavResult = _context3.sent;
                      (0, _AppProviderTypes.unsafeUnwrap)(removeFavResult);
                      _context3.t0 = _AppProviderTypes.unsafeUnwrap;
                      _context3.next = 11;
                      return userApi.getFavouriteResources(userId);

                    case 11:
                      _context3.t1 = _context3.sent;
                      favouriteResources = (0, _context3.t0)(_context3.t1);
                      //Assert
                      assert.deepEqual(favouriteResources, {});

                    case 14:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            })));
            this.afterEach(
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee4() {
              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return userApi.userRef(orgId, userId).delete();

                    case 2:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4, this);
            })));

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  })));
  describe('recents', function () {
    var firestore = new _mockCloudFirestore.default({}).firestore();
    var userApi = new _UserApi.UserApi(firestore, orgId);
    var userId = 'user_id_1';
    var expectedResources = [_objectSpread({}, defaultResource, {
      id: '1'
    }), _objectSpread({}, defaultResource, {
      id: '2'
    }), _objectSpread({}, defaultResource, {
      id: '3'
    })];
    this.beforeEach(
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var defaultUser;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              defaultUser = _objectSpread({}, _User.DefaultUser, {
                recentResources: expectedResources
              });
              _context6.next = 3;
              return userApi.userRef(orgId, userId).set(defaultUser);

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    })));
    it('getRecentResources gets the most recent resources',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var actual;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.t0 = _AppProviderTypes.unsafeUnwrap;
              _context7.next = 3;
              return userApi.getRecentResources(userId);

            case 3:
              _context7.t1 = _context7.sent;
              actual = (0, _context7.t0)(_context7.t1);
              //Assert
              assert.deepEqual(actual, expectedResources);

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    })));
    this.afterEach(
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return userApi.userRef(orgId, userId).delete();

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    })));
  });
  describe('changeUserStatus', function () {
    var firestore = new _mockCloudFirestore.default({}).firestore();
    var userApi = new _UserApi.UserApi(firestore, orgId);
    var userId = 'user_id_1';
    this.beforeEach(
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9() {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return userApi.userRef(orgId, userId).set(_User.DefaultUser);

            case 2:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    })));
    it('approves a user',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10() {
      var expected, user, actual;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              //Arrange
              expected = _UserStatus.default.Approved; //Act

              _context10.t0 = _AppProviderTypes.unsafeUnwrap;
              _context10.next = 4;
              return userApi.changeUserStatus(userId, _UserStatus.default.Approved);

            case 4:
              _context10.t1 = _context10.sent;
              (0, _context10.t0)(_context10.t1);
              _context10.t2 = _AppProviderTypes.unsafeUnwrap;
              _context10.next = 9;
              return userApi.getUser(userApi.userRef(orgId, userId));

            case 9:
              _context10.t3 = _context10.sent;
              user = (0, _context10.t2)(_context10.t3);
              actual = user.status; //Assert

              assert.equal(actual, expected);

            case 13:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    })));
    it('rejects a user',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11() {
      var expected, user, actual;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              //Arrange
              expected = _UserStatus.default.Rejected; //Act

              _context11.t0 = _AppProviderTypes.unsafeUnwrap;
              _context11.next = 4;
              return userApi.changeUserStatus(userId, _UserStatus.default.Rejected);

            case 4:
              _context11.t1 = _context11.sent;
              (0, _context11.t0)(_context11.t1);
              _context11.t2 = _AppProviderTypes.unsafeUnwrap;
              _context11.next = 9;
              return userApi.getUser(userApi.userRef(orgId, userId));

            case 9:
              _context11.t3 = _context11.sent;
              user = (0, _context11.t2)(_context11.t3);
              actual = user.status; //Assert

              assert.equal(actual, expected);

            case 13:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    })));
    this.afterEach(
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12() {
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return userApi.userRef(orgId, userId).delete();

            case 2:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    })));
  });
  describe('change user type', function () {
    var firestore = new _mockCloudFirestore.default({}).firestore();
    var userApi = new _UserApi.UserApi(firestore, orgId);
    var userId = 'user_id_1';
    this.beforeEach(
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13() {
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return userApi.userRef(orgId, userId).set(_User.DefaultUser);

            case 2:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    })));
    it('elevates a user to Admin',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee14() {
      var expected, user, actual;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              //Arrange
              expected = _UserType.default.Admin; //Act

              _context14.t0 = _AppProviderTypes.unsafeUnwrap;
              _context14.next = 4;
              return userApi.changeUserType(userId, expected);

            case 4:
              _context14.t1 = _context14.sent;
              (0, _context14.t0)(_context14.t1);
              _context14.t2 = _AppProviderTypes.unsafeUnwrap;
              _context14.next = 9;
              return userApi.getUser(userApi.userRef(orgId, userId));

            case 9:
              _context14.t3 = _context14.sent;
              user = (0, _context14.t2)(_context14.t3);
              actual = user.type; //Assert

              assert.equal(actual, expected);

            case 13:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this);
    })));
    it('demotes a user to User',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee15() {
      var expected, user, actual;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              //Arrange
              expected = _UserType.default.User;
              _context15.t0 = _AppProviderTypes.unsafeUnwrap;
              _context15.next = 4;
              return userApi.changeUserType(userId, _UserType.default.Admin);

            case 4:
              _context15.t1 = _context15.sent;
              (0, _context15.t0)(_context15.t1);
              _context15.t2 = _AppProviderTypes.unsafeUnwrap;
              _context15.next = 9;
              return userApi.changeUserType(userId, _UserType.default.User);

            case 9:
              _context15.t3 = _context15.sent;
              (0, _context15.t2)(_context15.t3);
              _context15.t4 = _AppProviderTypes.unsafeUnwrap;
              _context15.next = 14;
              return userApi.getUser(userApi.userRef(orgId, userId));

            case 14:
              _context15.t5 = _context15.sent;
              user = (0, _context15.t4)(_context15.t5);
              actual = user.type;
              assert.equal(actual, expected);

            case 18:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, this);
    })));
    this.afterEach(
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee16() {
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return userApi.userRef(orgId, userId).delete();

            case 2:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, this);
    })));
  });
  describe('new resource add/delete', function () {
    var firestore = new _mockCloudFirestore.default({}).firestore();
    var userApi = new _UserApi.UserApi(firestore, orgId);
    var userId = 'user_id_1';
    this.beforeEach(
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee17() {
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return userApi.userRef(orgId, userId).set(_User.DefaultUser);

            case 2:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, this);
    })));
    it('adds new resource ids to the user',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee18() {
      var resourceIds, newResources;
      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              //Arrange
              resourceIds = ["00001", "00002", "00003", "00004", "00005"]; //Act

              _context18.t0 = _AppProviderTypes.unsafeUnwrap;
              _context18.next = 4;
              return userApi.markAsNewResources(userId, resourceIds);

            case 4:
              _context18.t1 = _context18.sent;
              (0, _context18.t0)(_context18.t1);
              _context18.t2 = _AppProviderTypes.unsafeUnwrap;
              _context18.next = 9;
              return userApi.getNewResources(userId);

            case 9:
              _context18.t3 = _context18.sent;
              newResources = (0, _context18.t2)(_context18.t3);
              assert.equal(Object.keys(newResources).length, resourceIds.length);

            case 12:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18, this);
    })));
    it('delete a resource id from the user',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee19() {
      var resourceIds, newResources;
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              //Arrange
              resourceIds = ["00001", "00002", "00003", "00004", "00005"]; //Act

              _context19.t0 = _AppProviderTypes.unsafeUnwrap;
              _context19.next = 4;
              return userApi.markAsNewResources(userId, resourceIds);

            case 4:
              _context19.t1 = _context19.sent;
              (0, _context19.t0)(_context19.t1);
              _context19.t2 = _AppProviderTypes.unsafeUnwrap;
              _context19.next = 9;
              return userApi.removeNewResource(userId, "00004");

            case 9:
              _context19.t3 = _context19.sent;
              (0, _context19.t2)(_context19.t3);
              _context19.t4 = _AppProviderTypes.unsafeUnwrap;
              _context19.next = 14;
              return userApi.getNewResources(userId);

            case 14:
              _context19.t5 = _context19.sent;
              newResources = (0, _context19.t4)(_context19.t5);
              assert.equal(Object.keys(newResources).length, resourceIds.length - 1);

            case 17:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19, this);
    })));
    this.afterEach(
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee20() {
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return userApi.userRef(orgId, userId).delete();

            case 2:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20, this);
    })));
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvVXNlckFwaS51bml0LnRzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJvcmdJZCIsImRlZmF1bHRSZXNvdXJjZSIsInR5cGUiLCJSZXNvdXJjZVR5cGUiLCJBbnkiLCJpZCIsImNvb3JkcyIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwidGltZXNlcmllcyIsImRlc2NyaWJlIiwiZmlyZXN0b3JlIiwiTW9ja0ZpcmVzdG9yZSIsInVzZXJBcGkiLCJVc2VyQXBpIiwidXNlcklkIiwiYmVmb3JlRWFjaCIsInVzZXJSZWYiLCJzZXQiLCJEZWZhdWx0VXNlciIsIml0IiwiYWRkRmF2b3VyaXRlUmVzb3VyY2UiLCJhZGRGYXZSZXN1bHQiLCJ1bnNhZmVVbndyYXAiLCJnZXRGYXZvdXJpdGVSZXNvdXJjZXMiLCJmYXZvdXJpdGVSZXNvdXJjZXMiLCJhc3NlcnQiLCJkZWVwRXF1YWwiLCJyZXNvdXJjZV8xIiwicmVtb3ZlRmF2b3VyaXRlUmVzb3VyY2UiLCJyZW1vdmVGYXZSZXN1bHQiLCJhZnRlckVhY2giLCJkZWxldGUiLCJleHBlY3RlZFJlc291cmNlcyIsImRlZmF1bHRVc2VyIiwicmVjZW50UmVzb3VyY2VzIiwiZ2V0UmVjZW50UmVzb3VyY2VzIiwiYWN0dWFsIiwiZXhwZWN0ZWQiLCJVc2VyU3RhdHVzIiwiQXBwcm92ZWQiLCJjaGFuZ2VVc2VyU3RhdHVzIiwiZ2V0VXNlciIsInVzZXIiLCJzdGF0dXMiLCJlcXVhbCIsIlJlamVjdGVkIiwiVXNlclR5cGUiLCJBZG1pbiIsImNoYW5nZVVzZXJUeXBlIiwiVXNlciIsInJlc291cmNlSWRzIiwibWFya0FzTmV3UmVzb3VyY2VzIiwiZ2V0TmV3UmVzb3VyY2VzIiwibmV3UmVzb3VyY2VzIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsInJlbW92ZU5ld1Jlc291cmNlIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7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QUFlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUNQbEIsT0FBTyxDQUFDSSxPQUFSLENBQWdCakIsS0FBaEIsRUFBdUJlLE1BQXZCLEVBQStCaUIsTUFBL0IsRUFETzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFmO0FBSUQsR0F0Q08sQ0FBUjtBQXdDRCxDQXRNTyxDQUFSIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdtb2NoYSc7XG5pbXBvcnQgKiBhcyBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCB7IFVzZXJBcGkgfSBmcm9tICcuL1VzZXJBcGknO1xuLy9AdHMtaWdub3JlXG5pbXBvcnQgTW9ja0ZpcmVzdG9yZSBmcm9tICdtb2NrLWNsb3VkLWZpcmVzdG9yZSc7XG5pbXBvcnQgeyBEZWZhdWx0VXNlciwgVXNlciB9IGZyb20gJy4uL21vZGVsL1VzZXInO1xuaW1wb3J0IHsgUmVzb3VyY2UsIFJlc291cmNlVHlwZSB9IGZyb20gJy4uL21vZGVsL1Jlc291cmNlJztcbmltcG9ydCB7IHVuc2FmZVVud3JhcCB9IGZyb20gJy4uL3V0aWxzL0FwcFByb3ZpZGVyVHlwZXMnO1xuaW1wb3J0IFVzZXJTdGF0dXMgZnJvbSAnLi4vZW51bXMvVXNlclN0YXR1cyc7XG5pbXBvcnQgVXNlclR5cGUgZnJvbSAnLi4vZW51bXMvVXNlclR5cGUnO1xuaW1wb3J0IHsgYWRtaW4gfSBmcm9tICcuLi90ZXN0L1Rlc3RGaXJlYmFzZSc7XG50eXBlIEZpcmVzdG9yZSA9IGFkbWluLmZpcmVzdG9yZS5GaXJlc3RvcmU7XG5cbmNvbnN0IHsgXG4gIG9yZ0lkLFxufSA9IHJlcXVpcmUoJy4uL3Rlc3QvdGVzdENvbmZpZy5qc29uJyk7XG5cbmNvbnN0IGRlZmF1bHRSZXNvdXJjZTogUmVzb3VyY2UgPSB7XG4gIHR5cGU6IFJlc291cmNlVHlwZS5BbnksXG4gIGlkOiAncmVzb3VyY2VfMScsXG4gIGNvb3JkczogeyBsYXRpdHVkZTogMTIsIGxvbmdpdHVkZTogMTMgfSxcbiAgdGltZXNlcmllczoge30sXG59XG5cbmRlc2NyaWJlKCdVc2VyIEFwaScsIGZ1bmN0aW9uKCkge1xuXG4gIGRlc2NyaWJlKCdmYXZvdXJpdGVzJywgYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgZmlyZXN0b3JlOiBGaXJlc3RvcmUgPSBuZXcgTW9ja0ZpcmVzdG9yZSh7fSkuZmlyZXN0b3JlKCk7XG4gICAgY29uc3QgdXNlckFwaSA9IG5ldyBVc2VyQXBpKGZpcmVzdG9yZSwgb3JnSWQpO1xuICAgIGNvbnN0IHVzZXJJZCA9ICd1c2VyX2lkXzEnO1xuICAgIFxuICAgIHRoaXMuYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB1c2VyQXBpLnVzZXJSZWYob3JnSWQsIHVzZXJJZCkuc2V0KERlZmF1bHRVc2VyKTtcbiAgICB9KTtcblxuICAgIGl0KCdhZGRGYXZvdXJpdGVSZXNvdXJjZSBhZGRzIGEgZmF2b3VyaXRlIHJlc291cmNlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgLy9BcnJhbmdlXG4gICAgICAvL0FjdCBcbiAgICAgIGNvbnN0IGFkZEZhdlJlc3VsdCA9IGF3YWl0IHVzZXJBcGkuYWRkRmF2b3VyaXRlUmVzb3VyY2UodXNlcklkLCBkZWZhdWx0UmVzb3VyY2UpO1xuICAgICAgdW5zYWZlVW53cmFwKGFkZEZhdlJlc3VsdCk7XG4gICAgICBjb25zdCBmYXZvdXJpdGVSZXNvdXJjZXMgPSB1bnNhZmVVbndyYXAoYXdhaXQgdXNlckFwaS5nZXRGYXZvdXJpdGVSZXNvdXJjZXModXNlcklkKSk7XG5cbiAgICAgIC8vQXNzZXJ0XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKHtyZXNvdXJjZV8xOiBkZWZhdWx0UmVzb3VyY2V9LCBmYXZvdXJpdGVSZXNvdXJjZXMpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZUZhdm91cml0ZVJlc291cmNlIHJlbW92ZXMgYSBmYXZvdXJpdGUgcmVzb3VyY2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICAvL0FycmFuZ2VcbiAgICAgIGNvbnN0IGFkZEZhdlJlc3VsdCA9IGF3YWl0IHVzZXJBcGkuYWRkRmF2b3VyaXRlUmVzb3VyY2UodXNlcklkLCBkZWZhdWx0UmVzb3VyY2UpO1xuICAgICAgdW5zYWZlVW53cmFwKGFkZEZhdlJlc3VsdCk7XG5cbiAgICAgIC8vQWN0XG4gICAgICBjb25zdCByZW1vdmVGYXZSZXN1bHQgPSBhd2FpdCB1c2VyQXBpLnJlbW92ZUZhdm91cml0ZVJlc291cmNlKHVzZXJJZCwgZGVmYXVsdFJlc291cmNlLmlkKTtcbiAgICAgIHVuc2FmZVVud3JhcChyZW1vdmVGYXZSZXN1bHQpO1xuICAgICAgY29uc3QgZmF2b3VyaXRlUmVzb3VyY2VzID0gdW5zYWZlVW53cmFwKGF3YWl0IHVzZXJBcGkuZ2V0RmF2b3VyaXRlUmVzb3VyY2VzKHVzZXJJZCkpO1xuXG4gICAgICAvL0Fzc2VydFxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChmYXZvdXJpdGVSZXNvdXJjZXMsIHt9KTtcblxuICAgIH0pO1xuXG4gICAgdGhpcy5hZnRlckVhY2goYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgdXNlckFwaS51c2VyUmVmKG9yZ0lkLCB1c2VySWQpLmRlbGV0ZSgpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgncmVjZW50cycsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGZpcmVzdG9yZTogRmlyZXN0b3JlID0gbmV3IE1vY2tGaXJlc3RvcmUoe30pLmZpcmVzdG9yZSgpO1xuICAgIGNvbnN0IHVzZXJBcGkgPSBuZXcgVXNlckFwaShmaXJlc3RvcmUsIG9yZ0lkKTtcbiAgICBjb25zdCB1c2VySWQgPSAndXNlcl9pZF8xJztcbiAgICBjb25zdCBleHBlY3RlZFJlc291cmNlcyA9IFtcbiAgICAgIHsgLi4uZGVmYXVsdFJlc291cmNlLCBpZDogJzEnIH0sXG4gICAgICB7IC4uLmRlZmF1bHRSZXNvdXJjZSwgaWQ6ICcyJyB9LFxuICAgICAgeyAuLi5kZWZhdWx0UmVzb3VyY2UsIGlkOiAnMycgfSxcbiAgICBdO1xuXG4gICAgdGhpcy5iZWZvcmVFYWNoKGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGRlZmF1bHRVc2VyOiBVc2VyID0ge1xuICAgICAgICAuLi5EZWZhdWx0VXNlcixcbiAgICAgICAgcmVjZW50UmVzb3VyY2VzOiBleHBlY3RlZFJlc291cmNlcyxcbiAgICAgIH07XG4gICAgICBhd2FpdCB1c2VyQXBpLnVzZXJSZWYob3JnSWQsIHVzZXJJZCkuc2V0KGRlZmF1bHRVc2VyKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ2dldFJlY2VudFJlc291cmNlcyBnZXRzIHRoZSBtb3N0IHJlY2VudCByZXNvdXJjZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICAvL0FycmFuZ2VcbiAgICAgIC8vQWN0XG4gICAgICBjb25zdCBhY3R1YWwgPSB1bnNhZmVVbndyYXAoYXdhaXQgdXNlckFwaS5nZXRSZWNlbnRSZXNvdXJjZXModXNlcklkKSk7XG5cbiAgICAgIC8vQXNzZXJ0XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWRSZXNvdXJjZXMpXG4gICAgfSk7XG5cbiAgICB0aGlzLmFmdGVyRWFjaChhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB1c2VyQXBpLnVzZXJSZWYob3JnSWQsIHVzZXJJZCkuZGVsZXRlKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdjaGFuZ2VVc2VyU3RhdHVzJywgZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgZmlyZXN0b3JlOiBGaXJlc3RvcmUgPSBuZXcgTW9ja0ZpcmVzdG9yZSh7fSkuZmlyZXN0b3JlKCk7XG4gICAgY29uc3QgdXNlckFwaSA9IG5ldyBVc2VyQXBpKGZpcmVzdG9yZSwgb3JnSWQpO1xuICAgIGNvbnN0IHVzZXJJZCA9ICd1c2VyX2lkXzEnO1xuXG4gICAgdGhpcy5iZWZvcmVFYWNoKGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHVzZXJBcGkudXNlclJlZihvcmdJZCwgdXNlcklkKS5zZXQoRGVmYXVsdFVzZXIpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FwcHJvdmVzIGEgdXNlcicsIGFzeW5jICgpID0+IHtcbiAgICAgIC8vQXJyYW5nZVxuICAgICAgY29uc3QgZXhwZWN0ZWQ6IFVzZXJTdGF0dXMgPSBVc2VyU3RhdHVzLkFwcHJvdmVkO1xuXG4gICAgICAvL0FjdFxuICAgICAgdW5zYWZlVW53cmFwKGF3YWl0IHVzZXJBcGkuY2hhbmdlVXNlclN0YXR1cyh1c2VySWQsIFVzZXJTdGF0dXMuQXBwcm92ZWQpKTtcbiAgICAgIGNvbnN0IHVzZXIgPSB1bnNhZmVVbndyYXAoYXdhaXQgdXNlckFwaS5nZXRVc2VyKHVzZXJBcGkudXNlclJlZihvcmdJZCwgdXNlcklkKSkpO1xuICAgICAgY29uc3QgYWN0dWFsID0gdXNlci5zdGF0dXM7XG5cbiAgICAgIC8vQXNzZXJ0XG4gICAgICBhc3NlcnQuZXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVqZWN0cyBhIHVzZXInLCBhc3luYyAoKSA9PiB7XG4gICAgICAvL0FycmFuZ2VcbiAgICAgIGNvbnN0IGV4cGVjdGVkOiBVc2VyU3RhdHVzID0gVXNlclN0YXR1cy5SZWplY3RlZDtcblxuICAgICAgLy9BY3RcbiAgICAgIHVuc2FmZVVud3JhcChhd2FpdCB1c2VyQXBpLmNoYW5nZVVzZXJTdGF0dXModXNlcklkLCBVc2VyU3RhdHVzLlJlamVjdGVkKSk7XG4gICAgICBjb25zdCB1c2VyID0gdW5zYWZlVW53cmFwKGF3YWl0IHVzZXJBcGkuZ2V0VXNlcih1c2VyQXBpLnVzZXJSZWYob3JnSWQsIHVzZXJJZCkpKTtcbiAgICAgIGNvbnN0IGFjdHVhbCA9IHVzZXIuc3RhdHVzO1xuXG4gICAgICAvL0Fzc2VydFxuICAgICAgYXNzZXJ0LmVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hZnRlckVhY2goYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgdXNlckFwaS51c2VyUmVmKG9yZ0lkLCB1c2VySWQpLmRlbGV0ZSgpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnY2hhbmdlIHVzZXIgdHlwZScsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGZpcmVzdG9yZTogRmlyZXN0b3JlID0gbmV3IE1vY2tGaXJlc3RvcmUoe30pLmZpcmVzdG9yZSgpO1xuICAgIGNvbnN0IHVzZXJBcGkgPSBuZXcgVXNlckFwaShmaXJlc3RvcmUsIG9yZ0lkKTtcbiAgICBjb25zdCB1c2VySWQgPSAndXNlcl9pZF8xJztcblxuICAgIHRoaXMuYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB1c2VyQXBpLnVzZXJSZWYob3JnSWQsIHVzZXJJZCkuc2V0KERlZmF1bHRVc2VyKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ2VsZXZhdGVzIGEgdXNlciB0byBBZG1pbicsIGFzeW5jICgpID0+IHtcbiAgICAgIC8vQXJyYW5nZVxuICAgICAgY29uc3QgZXhwZWN0ZWQ6IFVzZXJUeXBlID0gVXNlclR5cGUuQWRtaW47XG5cbiAgICAgIC8vQWN0XG4gICAgICB1bnNhZmVVbndyYXAoYXdhaXQgdXNlckFwaS5jaGFuZ2VVc2VyVHlwZSh1c2VySWQsIGV4cGVjdGVkKSk7XG4gICAgICBjb25zdCB1c2VyID0gdW5zYWZlVW53cmFwKGF3YWl0IHVzZXJBcGkuZ2V0VXNlcih1c2VyQXBpLnVzZXJSZWYob3JnSWQsIHVzZXJJZCkpKTtcbiAgICAgIGNvbnN0IGFjdHVhbCA9IHVzZXIudHlwZTtcblxuICAgICAgLy9Bc3NlcnRcbiAgICAgIGFzc2VydC5lcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGl0KCdkZW1vdGVzIGEgdXNlciB0byBVc2VyJywgYXN5bmMgKCkgPT4ge1xuICAgICAgLy9BcnJhbmdlXG4gICAgICBjb25zdCBleHBlY3RlZDogVXNlclR5cGUgPSBVc2VyVHlwZS5Vc2VyO1xuICAgICAgdW5zYWZlVW53cmFwKGF3YWl0IHVzZXJBcGkuY2hhbmdlVXNlclR5cGUodXNlcklkLCBVc2VyVHlwZS5BZG1pbikpO1xuXG4gICAgICAvL0FjdFxuICAgICAgdW5zYWZlVW53cmFwKGF3YWl0IHVzZXJBcGkuY2hhbmdlVXNlclR5cGUodXNlcklkLCBVc2VyVHlwZS5Vc2VyKSk7XG5cbiAgICAgIC8vQXNzZXJ0XG4gICAgICBjb25zdCB1c2VyID0gdW5zYWZlVW53cmFwKGF3YWl0IHVzZXJBcGkuZ2V0VXNlcih1c2VyQXBpLnVzZXJSZWYob3JnSWQsIHVzZXJJZCkpKTtcbiAgICAgIGNvbnN0IGFjdHVhbCA9IHVzZXIudHlwZTtcbiAgICAgIGFzc2VydC5lcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYWZ0ZXJFYWNoKGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHVzZXJBcGkudXNlclJlZihvcmdJZCwgdXNlcklkKS5kZWxldGUoKTtcbiAgICB9KTtcbiAgfSk7XG5cblxuICBkZXNjcmliZSgnbmV3IHJlc291cmNlIGFkZC9kZWxldGUnLCBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBmaXJlc3RvcmU6IEZpcmVzdG9yZSA9IG5ldyBNb2NrRmlyZXN0b3JlKHt9KS5maXJlc3RvcmUoKTtcbiAgICBjb25zdCB1c2VyQXBpID0gbmV3IFVzZXJBcGkoZmlyZXN0b3JlLCBvcmdJZCk7XG4gICAgY29uc3QgdXNlcklkID0gJ3VzZXJfaWRfMSc7XG5cbiAgICB0aGlzLmJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgdXNlckFwaS51c2VyUmVmKG9yZ0lkLCB1c2VySWQpLnNldChEZWZhdWx0VXNlcik7XG4gICAgfSk7XG5cbiAgICBpdCgnYWRkcyBuZXcgcmVzb3VyY2UgaWRzIHRvIHRoZSB1c2VyJywgYXN5bmMgKCkgPT4ge1xuICAgICAgLy9BcnJhbmdlXG4gICAgICBjb25zdCByZXNvdXJjZUlkcyA9IFtcIjAwMDAxXCIsIFwiMDAwMDJcIiwgXCIwMDAwM1wiLCBcIjAwMDA0XCIsIFwiMDAwMDVcIl07XG5cbiAgICAgIC8vQWN0XG4gICAgICB1bnNhZmVVbndyYXAoYXdhaXQgdXNlckFwaS5tYXJrQXNOZXdSZXNvdXJjZXModXNlcklkLCByZXNvdXJjZUlkcykpO1xuXG4gICAgICAvL0Fzc2VydFxuICAgICAgY29uc3QgbmV3UmVzb3VyY2VzID0gdW5zYWZlVW53cmFwKGF3YWl0IHVzZXJBcGkuZ2V0TmV3UmVzb3VyY2VzKHVzZXJJZCkpO1xuICAgICAgYXNzZXJ0LmVxdWFsKE9iamVjdC5rZXlzKG5ld1Jlc291cmNlcykubGVuZ3RoLCByZXNvdXJjZUlkcy5sZW5ndGgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2RlbGV0ZSBhIHJlc291cmNlIGlkIGZyb20gdGhlIHVzZXInLCBhc3luYyAoKSA9PiB7XG4gICAgICAvL0FycmFuZ2VcbiAgICAgIGNvbnN0IHJlc291cmNlSWRzID0gW1wiMDAwMDFcIiwgXCIwMDAwMlwiLCBcIjAwMDAzXCIsIFwiMDAwMDRcIiwgXCIwMDAwNVwiXTtcblxuICAgICAgLy9BY3RcbiAgICAgIHVuc2FmZVVud3JhcChhd2FpdCB1c2VyQXBpLm1hcmtBc05ld1Jlc291cmNlcyh1c2VySWQsIHJlc291cmNlSWRzKSk7XG4gICAgICB1bnNhZmVVbndyYXAoYXdhaXQgdXNlckFwaS5yZW1vdmVOZXdSZXNvdXJjZSh1c2VySWQsIFwiMDAwMDRcIikpO1xuXG4gICAgICAvL0Fzc2VydFxuICAgICAgY29uc3QgbmV3UmVzb3VyY2VzID0gdW5zYWZlVW53cmFwKGF3YWl0IHVzZXJBcGkuZ2V0TmV3UmVzb3VyY2VzKHVzZXJJZCkpO1xuICAgICAgYXNzZXJ0LmVxdWFsKE9iamVjdC5rZXlzKG5ld1Jlc291cmNlcykubGVuZ3RoLCByZXNvdXJjZUlkcy5sZW5ndGggLSAxKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYWZ0ZXJFYWNoKGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHVzZXJBcGkudXNlclJlZihvcmdJZCwgdXNlcklkKS5kZWxldGUoKTtcbiAgICB9KTtcblxuICB9KTtcblxufSk7Il19