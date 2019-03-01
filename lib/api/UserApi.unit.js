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
    this.timeout(5000);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvVXNlckFwaS51bml0LnRzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJvcmdJZCIsImRlZmF1bHRSZXNvdXJjZSIsInR5cGUiLCJSZXNvdXJjZVR5cGUiLCJBbnkiLCJpZCIsImNvb3JkcyIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwidGltZXNlcmllcyIsImRlc2NyaWJlIiwiZmlyZXN0b3JlIiwiTW9ja0ZpcmVzdG9yZSIsInVzZXJBcGkiLCJVc2VyQXBpIiwidXNlcklkIiwiYmVmb3JlRWFjaCIsInVzZXJSZWYiLCJzZXQiLCJEZWZhdWx0VXNlciIsIml0IiwiYWRkRmF2b3VyaXRlUmVzb3VyY2UiLCJhZGRGYXZSZXN1bHQiLCJ1bnNhZmVVbndyYXAiLCJnZXRGYXZvdXJpdGVSZXNvdXJjZXMiLCJmYXZvdXJpdGVSZXNvdXJjZXMiLCJhc3NlcnQiLCJkZWVwRXF1YWwiLCJyZXNvdXJjZV8xIiwicmVtb3ZlRmF2b3VyaXRlUmVzb3VyY2UiLCJyZW1vdmVGYXZSZXN1bHQiLCJhZnRlckVhY2giLCJkZWxldGUiLCJleHBlY3RlZFJlc291cmNlcyIsImRlZmF1bHRVc2VyIiwicmVjZW50UmVzb3VyY2VzIiwiZ2V0UmVjZW50UmVzb3VyY2VzIiwiYWN0dWFsIiwiZXhwZWN0ZWQiLCJVc2VyU3RhdHVzIiwiQXBwcm92ZWQiLCJjaGFuZ2VVc2VyU3RhdHVzIiwiZ2V0VXNlciIsInVzZXIiLCJzdGF0dXMiLCJlcXVhbCIsIlJlamVjdGVkIiwiVXNlclR5cGUiLCJBZG1pbiIsImNoYW5nZVVzZXJUeXBlIiwiVXNlciIsInRpbWVvdXQiLCJyZXNvdXJjZUlkcyIsIm1hcmtBc05ld1Jlc291cmNlcyIsImdldE5ld1Jlc291cmNlcyIsIm5ld1Jlc291cmNlcyIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJyZW1vdmVOZXdSZXNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFD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QWFBLFNBQUszQixTQUFMO0FBQUE7QUFBQTtBQUFBO0FBQUEsNEJBQWU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQ1BsQixPQUFPLENBQUNJLE9BQVIsQ0FBZ0JqQixLQUFoQixFQUF1QmUsTUFBdkIsRUFBK0JpQixNQUEvQixFQURPOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQWY7QUFJRCxHQXhDTyxDQUFSO0FBMENELENBeE1PLENBQVIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ21vY2hhJztcbmltcG9ydCAqIGFzIGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IHsgVXNlckFwaSB9IGZyb20gJy4vVXNlckFwaSc7XG4vL0B0cy1pZ25vcmVcbmltcG9ydCBNb2NrRmlyZXN0b3JlIGZyb20gJ21vY2stY2xvdWQtZmlyZXN0b3JlJztcbmltcG9ydCB7IERlZmF1bHRVc2VyLCBVc2VyIH0gZnJvbSAnLi4vbW9kZWwvVXNlcic7XG5pbXBvcnQgeyBSZXNvdXJjZSwgUmVzb3VyY2VUeXBlIH0gZnJvbSAnLi4vbW9kZWwvUmVzb3VyY2UnO1xuaW1wb3J0IHsgdW5zYWZlVW53cmFwIH0gZnJvbSAnLi4vdXRpbHMvQXBwUHJvdmlkZXJUeXBlcyc7XG5pbXBvcnQgVXNlclN0YXR1cyBmcm9tICcuLi9lbnVtcy9Vc2VyU3RhdHVzJztcbmltcG9ydCBVc2VyVHlwZSBmcm9tICcuLi9lbnVtcy9Vc2VyVHlwZSc7XG5pbXBvcnQgeyBhZG1pbiB9IGZyb20gJy4uL3Rlc3QvVGVzdEZpcmViYXNlJztcbnR5cGUgRmlyZXN0b3JlID0gYWRtaW4uZmlyZXN0b3JlLkZpcmVzdG9yZTtcblxuY29uc3QgeyBcbiAgb3JnSWQsXG59ID0gcmVxdWlyZSgnLi4vdGVzdC90ZXN0Q29uZmlnLmpzb24nKTtcblxuXG5jb25zdCBkZWZhdWx0UmVzb3VyY2U6IFJlc291cmNlID0ge1xuICB0eXBlOiBSZXNvdXJjZVR5cGUuQW55LFxuICBpZDogJ3Jlc291cmNlXzEnLFxuICBjb29yZHM6IHsgbGF0aXR1ZGU6IDEyLCBsb25naXR1ZGU6IDEzIH0sXG4gIHRpbWVzZXJpZXM6IHt9LFxufVxuXG5kZXNjcmliZSgnVXNlciBBcGknLCBmdW5jdGlvbigpIHtcblxuICBkZXNjcmliZSgnZmF2b3VyaXRlcycsIGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGZpcmVzdG9yZTogRmlyZXN0b3JlID0gbmV3IE1vY2tGaXJlc3RvcmUoe30pLmZpcmVzdG9yZSgpO1xuICAgIGNvbnN0IHVzZXJBcGkgPSBuZXcgVXNlckFwaShmaXJlc3RvcmUsIG9yZ0lkKTtcbiAgICBjb25zdCB1c2VySWQgPSAndXNlcl9pZF8xJztcbiAgICBcbiAgICB0aGlzLmJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgdXNlckFwaS51c2VyUmVmKG9yZ0lkLCB1c2VySWQpLnNldChEZWZhdWx0VXNlcik7XG4gICAgfSk7XG5cbiAgICBpdCgnYWRkRmF2b3VyaXRlUmVzb3VyY2UgYWRkcyBhIGZhdm91cml0ZSByZXNvdXJjZScsIGFzeW5jICgpID0+IHtcbiAgICAgIC8vQXJyYW5nZVxuICAgICAgLy9BY3QgXG4gICAgICBjb25zdCBhZGRGYXZSZXN1bHQgPSBhd2FpdCB1c2VyQXBpLmFkZEZhdm91cml0ZVJlc291cmNlKHVzZXJJZCwgZGVmYXVsdFJlc291cmNlKTtcbiAgICAgIHVuc2FmZVVud3JhcChhZGRGYXZSZXN1bHQpO1xuICAgICAgY29uc3QgZmF2b3VyaXRlUmVzb3VyY2VzID0gdW5zYWZlVW53cmFwKGF3YWl0IHVzZXJBcGkuZ2V0RmF2b3VyaXRlUmVzb3VyY2VzKHVzZXJJZCkpO1xuXG4gICAgICAvL0Fzc2VydFxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbCh7cmVzb3VyY2VfMTogZGVmYXVsdFJlc291cmNlfSwgZmF2b3VyaXRlUmVzb3VyY2VzKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVGYXZvdXJpdGVSZXNvdXJjZSByZW1vdmVzIGEgZmF2b3VyaXRlIHJlc291cmNlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgLy9BcnJhbmdlXG4gICAgICBjb25zdCBhZGRGYXZSZXN1bHQgPSBhd2FpdCB1c2VyQXBpLmFkZEZhdm91cml0ZVJlc291cmNlKHVzZXJJZCwgZGVmYXVsdFJlc291cmNlKTtcbiAgICAgIHVuc2FmZVVud3JhcChhZGRGYXZSZXN1bHQpO1xuXG4gICAgICAvL0FjdFxuICAgICAgY29uc3QgcmVtb3ZlRmF2UmVzdWx0ID0gYXdhaXQgdXNlckFwaS5yZW1vdmVGYXZvdXJpdGVSZXNvdXJjZSh1c2VySWQsIGRlZmF1bHRSZXNvdXJjZS5pZCk7XG4gICAgICB1bnNhZmVVbndyYXAocmVtb3ZlRmF2UmVzdWx0KTtcbiAgICAgIGNvbnN0IGZhdm91cml0ZVJlc291cmNlcyA9IHVuc2FmZVVud3JhcChhd2FpdCB1c2VyQXBpLmdldEZhdm91cml0ZVJlc291cmNlcyh1c2VySWQpKTtcblxuICAgICAgLy9Bc3NlcnRcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoZmF2b3VyaXRlUmVzb3VyY2VzLCB7fSk7XG5cbiAgICB9KTtcblxuICAgIHRoaXMuYWZ0ZXJFYWNoKGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHVzZXJBcGkudXNlclJlZihvcmdJZCwgdXNlcklkKS5kZWxldGUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3JlY2VudHMnLCBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBmaXJlc3RvcmU6IEZpcmVzdG9yZSA9IG5ldyBNb2NrRmlyZXN0b3JlKHt9KS5maXJlc3RvcmUoKTtcbiAgICBjb25zdCB1c2VyQXBpID0gbmV3IFVzZXJBcGkoZmlyZXN0b3JlLCBvcmdJZCk7XG4gICAgY29uc3QgdXNlcklkID0gJ3VzZXJfaWRfMSc7XG4gICAgY29uc3QgZXhwZWN0ZWRSZXNvdXJjZXMgPSBbXG4gICAgICB7IC4uLmRlZmF1bHRSZXNvdXJjZSwgaWQ6ICcxJyB9LFxuICAgICAgeyAuLi5kZWZhdWx0UmVzb3VyY2UsIGlkOiAnMicgfSxcbiAgICAgIHsgLi4uZGVmYXVsdFJlc291cmNlLCBpZDogJzMnIH0sXG4gICAgXTtcblxuICAgIHRoaXMuYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBkZWZhdWx0VXNlcjogVXNlciA9IHtcbiAgICAgICAgLi4uRGVmYXVsdFVzZXIsXG4gICAgICAgIHJlY2VudFJlc291cmNlczogZXhwZWN0ZWRSZXNvdXJjZXMsXG4gICAgICB9O1xuICAgICAgYXdhaXQgdXNlckFwaS51c2VyUmVmKG9yZ0lkLCB1c2VySWQpLnNldChkZWZhdWx0VXNlcik7XG4gICAgfSk7XG5cblxuICAgIGl0KCdnZXRSZWNlbnRSZXNvdXJjZXMgZ2V0cyB0aGUgbW9zdCByZWNlbnQgcmVzb3VyY2VzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgLy9BcnJhbmdlXG4gICAgICAvL0FjdFxuICAgICAgY29uc3QgYWN0dWFsID0gdW5zYWZlVW53cmFwKGF3YWl0IHVzZXJBcGkuZ2V0UmVjZW50UmVzb3VyY2VzKHVzZXJJZCkpO1xuXG4gICAgICAvL0Fzc2VydFxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkUmVzb3VyY2VzKVxuICAgIH0pO1xuXG4gICAgdGhpcy5hZnRlckVhY2goYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgdXNlckFwaS51c2VyUmVmKG9yZ0lkLCB1c2VySWQpLmRlbGV0ZSgpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnY2hhbmdlVXNlclN0YXR1cycsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGZpcmVzdG9yZTogRmlyZXN0b3JlID0gbmV3IE1vY2tGaXJlc3RvcmUoe30pLmZpcmVzdG9yZSgpO1xuICAgIGNvbnN0IHVzZXJBcGkgPSBuZXcgVXNlckFwaShmaXJlc3RvcmUsIG9yZ0lkKTtcbiAgICBjb25zdCB1c2VySWQgPSAndXNlcl9pZF8xJztcblxuICAgIHRoaXMuYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB1c2VyQXBpLnVzZXJSZWYob3JnSWQsIHVzZXJJZCkuc2V0KERlZmF1bHRVc2VyKTtcbiAgICB9KTtcblxuICAgIGl0KCdhcHByb3ZlcyBhIHVzZXInLCBhc3luYyAoKSA9PiB7XG4gICAgICAvL0FycmFuZ2VcbiAgICAgIGNvbnN0IGV4cGVjdGVkOiBVc2VyU3RhdHVzID0gVXNlclN0YXR1cy5BcHByb3ZlZDtcblxuICAgICAgLy9BY3RcbiAgICAgIHVuc2FmZVVud3JhcChhd2FpdCB1c2VyQXBpLmNoYW5nZVVzZXJTdGF0dXModXNlcklkLCBVc2VyU3RhdHVzLkFwcHJvdmVkKSk7XG4gICAgICBjb25zdCB1c2VyID0gdW5zYWZlVW53cmFwKGF3YWl0IHVzZXJBcGkuZ2V0VXNlcih1c2VyQXBpLnVzZXJSZWYob3JnSWQsIHVzZXJJZCkpKTtcbiAgICAgIGNvbnN0IGFjdHVhbCA9IHVzZXIuc3RhdHVzO1xuXG4gICAgICAvL0Fzc2VydFxuICAgICAgYXNzZXJ0LmVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlamVjdHMgYSB1c2VyJywgYXN5bmMgKCkgPT4ge1xuICAgICAgLy9BcnJhbmdlXG4gICAgICBjb25zdCBleHBlY3RlZDogVXNlclN0YXR1cyA9IFVzZXJTdGF0dXMuUmVqZWN0ZWQ7XG5cbiAgICAgIC8vQWN0XG4gICAgICB1bnNhZmVVbndyYXAoYXdhaXQgdXNlckFwaS5jaGFuZ2VVc2VyU3RhdHVzKHVzZXJJZCwgVXNlclN0YXR1cy5SZWplY3RlZCkpO1xuICAgICAgY29uc3QgdXNlciA9IHVuc2FmZVVud3JhcChhd2FpdCB1c2VyQXBpLmdldFVzZXIodXNlckFwaS51c2VyUmVmKG9yZ0lkLCB1c2VySWQpKSk7XG4gICAgICBjb25zdCBhY3R1YWwgPSB1c2VyLnN0YXR1cztcblxuICAgICAgLy9Bc3NlcnRcbiAgICAgIGFzc2VydC5lcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYWZ0ZXJFYWNoKGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHVzZXJBcGkudXNlclJlZihvcmdJZCwgdXNlcklkKS5kZWxldGUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2NoYW5nZSB1c2VyIHR5cGUnLCBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBmaXJlc3RvcmU6IEZpcmVzdG9yZSA9IG5ldyBNb2NrRmlyZXN0b3JlKHt9KS5maXJlc3RvcmUoKTtcbiAgICBjb25zdCB1c2VyQXBpID0gbmV3IFVzZXJBcGkoZmlyZXN0b3JlLCBvcmdJZCk7XG4gICAgY29uc3QgdXNlcklkID0gJ3VzZXJfaWRfMSc7XG5cbiAgICB0aGlzLmJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgdXNlckFwaS51c2VyUmVmKG9yZ0lkLCB1c2VySWQpLnNldChEZWZhdWx0VXNlcik7XG4gICAgfSk7XG5cblxuICAgIGl0KCdlbGV2YXRlcyBhIHVzZXIgdG8gQWRtaW4nLCBhc3luYyAoKSA9PiB7XG4gICAgICAvL0FycmFuZ2VcbiAgICAgIGNvbnN0IGV4cGVjdGVkOiBVc2VyVHlwZSA9IFVzZXJUeXBlLkFkbWluO1xuXG4gICAgICAvL0FjdFxuICAgICAgdW5zYWZlVW53cmFwKGF3YWl0IHVzZXJBcGkuY2hhbmdlVXNlclR5cGUodXNlcklkLCBleHBlY3RlZCkpO1xuICAgICAgY29uc3QgdXNlciA9IHVuc2FmZVVud3JhcChhd2FpdCB1c2VyQXBpLmdldFVzZXIodXNlckFwaS51c2VyUmVmKG9yZ0lkLCB1c2VySWQpKSk7XG4gICAgICBjb25zdCBhY3R1YWwgPSB1c2VyLnR5cGU7XG5cbiAgICAgIC8vQXNzZXJ0XG4gICAgICBhc3NlcnQuZXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZGVtb3RlcyBhIHVzZXIgdG8gVXNlcicsIGFzeW5jICgpID0+IHtcbiAgICAgIC8vQXJyYW5nZVxuICAgICAgY29uc3QgZXhwZWN0ZWQ6IFVzZXJUeXBlID0gVXNlclR5cGUuVXNlcjtcbiAgICAgIHVuc2FmZVVud3JhcChhd2FpdCB1c2VyQXBpLmNoYW5nZVVzZXJUeXBlKHVzZXJJZCwgVXNlclR5cGUuQWRtaW4pKTtcblxuICAgICAgLy9BY3RcbiAgICAgIHVuc2FmZVVud3JhcChhd2FpdCB1c2VyQXBpLmNoYW5nZVVzZXJUeXBlKHVzZXJJZCwgVXNlclR5cGUuVXNlcikpO1xuXG4gICAgICAvL0Fzc2VydFxuICAgICAgY29uc3QgdXNlciA9IHVuc2FmZVVud3JhcChhd2FpdCB1c2VyQXBpLmdldFVzZXIodXNlckFwaS51c2VyUmVmKG9yZ0lkLCB1c2VySWQpKSk7XG4gICAgICBjb25zdCBhY3R1YWwgPSB1c2VyLnR5cGU7XG4gICAgICBhc3NlcnQuZXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFmdGVyRWFjaChhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB1c2VyQXBpLnVzZXJSZWYob3JnSWQsIHVzZXJJZCkuZGVsZXRlKCk7XG4gICAgfSk7XG4gIH0pO1xuXG5cbiAgZGVzY3JpYmUoJ25ldyByZXNvdXJjZSBhZGQvZGVsZXRlJywgZnVuY3Rpb24oKSB7XG4gICAgdGhpcy50aW1lb3V0KDUwMDApO1xuICAgIGNvbnN0IGZpcmVzdG9yZTogRmlyZXN0b3JlID0gbmV3IE1vY2tGaXJlc3RvcmUoe30pLmZpcmVzdG9yZSgpO1xuXG4gICAgY29uc3QgdXNlckFwaSA9IG5ldyBVc2VyQXBpKGZpcmVzdG9yZSwgb3JnSWQpO1xuICAgIGNvbnN0IHVzZXJJZCA9ICd1c2VyX2lkXzEnO1xuXG4gICAgdGhpcy5iZWZvcmVFYWNoKGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHVzZXJBcGkudXNlclJlZihvcmdJZCwgdXNlcklkKS5zZXQoRGVmYXVsdFVzZXIpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FkZHMgbmV3IHJlc291cmNlIGlkcyB0byB0aGUgdXNlcicsIGFzeW5jICgpID0+IHtcbiAgICAgIC8vQXJyYW5nZVxuICAgICAgY29uc3QgcmVzb3VyY2VJZHMgPSBbXCIwMDAwMVwiLCBcIjAwMDAyXCIsIFwiMDAwMDNcIiwgXCIwMDAwNFwiLCBcIjAwMDA1XCJdO1xuXG4gICAgICAvL0FjdFxuICAgICAgdW5zYWZlVW53cmFwKGF3YWl0IHVzZXJBcGkubWFya0FzTmV3UmVzb3VyY2VzKHVzZXJJZCwgcmVzb3VyY2VJZHMpKTtcblxuICAgICAgLy9Bc3NlcnRcbiAgICAgIGNvbnN0IG5ld1Jlc291cmNlcyA9IHVuc2FmZVVud3JhcChhd2FpdCB1c2VyQXBpLmdldE5ld1Jlc291cmNlcyh1c2VySWQpKTtcbiAgICAgIGFzc2VydC5lcXVhbChPYmplY3Qua2V5cyhuZXdSZXNvdXJjZXMpLmxlbmd0aCwgcmVzb3VyY2VJZHMubGVuZ3RoKTtcbiAgICB9KTtcblxuICAgIGl0KCdkZWxldGUgYSByZXNvdXJjZSBpZCBmcm9tIHRoZSB1c2VyJywgYXN5bmMgKCkgPT4ge1xuICAgICAgLy9BcnJhbmdlXG4gICAgICBjb25zdCByZXNvdXJjZUlkcyA9IFtcIjAwMDAxXCIsIFwiMDAwMDJcIiwgXCIwMDAwM1wiLCBcIjAwMDA0XCIsIFwiMDAwMDVcIl07XG5cbiAgICAgIC8vQWN0XG4gICAgICB1bnNhZmVVbndyYXAoYXdhaXQgdXNlckFwaS5tYXJrQXNOZXdSZXNvdXJjZXModXNlcklkLCByZXNvdXJjZUlkcykpO1xuICAgICAgdW5zYWZlVW53cmFwKGF3YWl0IHVzZXJBcGkucmVtb3ZlTmV3UmVzb3VyY2UodXNlcklkLCBcIjAwMDA0XCIpKTtcblxuICAgICAgLy9Bc3NlcnRcbiAgICAgIGNvbnN0IG5ld1Jlc291cmNlcyA9IHVuc2FmZVVud3JhcChhd2FpdCB1c2VyQXBpLmdldE5ld1Jlc291cmNlcyh1c2VySWQpKTtcbiAgICAgIGFzc2VydC5lcXVhbChPYmplY3Qua2V5cyhuZXdSZXNvdXJjZXMpLmxlbmd0aCwgcmVzb3VyY2VJZHMubGVuZ3RoIC0gMSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFmdGVyRWFjaChhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB1c2VyQXBpLnVzZXJSZWYob3JnSWQsIHVzZXJJZCkuZGVsZXRlKCk7XG4gICAgfSk7XG5cbiAgfSk7XG5cbn0pOyJdfQ==