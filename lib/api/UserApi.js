"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserApi = void 0;

var _AppProviderTypes = require("../utils/AppProviderTypes");

var _User = require("../model/User");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UserApi =
/*#__PURE__*/
function () {
  function UserApi(firestore, orgId) {
    _classCallCheck(this, UserApi);

    _defineProperty(this, "firestore", void 0);

    _defineProperty(this, "orgId", void 0);

    this.firestore = firestore;
    this.orgId = orgId;
  }

  _createClass(UserApi, [{
    key: "addFavouriteResource",
    value: function () {
      var _addFavouriteResource = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(userId, resource) {
        var favouritesResult, favourites;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getFavouriteResources(userId);

              case 2:
                favouritesResult = _context.sent;

                if (!(favouritesResult.type === _AppProviderTypes.ResultType.ERROR)) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", favouritesResult);

              case 5:
                favourites = favouritesResult.result;
                favourites[resource.id] = resource;
                return _context.abrupt("return", this.updateFavouriteResources(userId, favourites));

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function addFavouriteResource(_x, _x2) {
        return _addFavouriteResource.apply(this, arguments);
      };
    }()
  }, {
    key: "removeFavouriteResource",
    value: function () {
      var _removeFavouriteResource = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(userId, resourceId) {
        var favouritesResult, favourites;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getFavouriteResources(userId);

              case 2:
                favouritesResult = _context2.sent;

                if (!(favouritesResult.type === _AppProviderTypes.ResultType.ERROR)) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", favouritesResult);

              case 5:
                favourites = favouritesResult.result;
                delete favourites[resourceId];
                return _context2.abrupt("return", this.updateFavouriteResources(userId, favourites));

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function removeFavouriteResource(_x3, _x4) {
        return _removeFavouriteResource.apply(this, arguments);
      };
    }()
  }, {
    key: "updateFavouriteResources",
    value: function () {
      var _updateFavouriteResources = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(userId, favouriteResources) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.userRef(this.orgId, userId).set({
                  favouriteResources: favouriteResources
                }, {
                  merge: true
                }).then(function () {
                  return (0, _AppProviderTypes.makeSuccess)(undefined);
                }).catch(function (err) {
                  return (0, _AppProviderTypes.makeError)(err.message);
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function updateFavouriteResources(_x5, _x6) {
        return _updateFavouriteResources.apply(this, arguments);
      };
    }()
  }, {
    key: "getFavouriteResources",
    value: function () {
      var _getFavouriteResources = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(userId) {
        var userResult, user;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.getUser(this.userRef(this.orgId, userId));

              case 2:
                userResult = _context4.sent;

                if (!(userResult.type === _AppProviderTypes.ResultType.ERROR)) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt("return", userResult);

              case 5:
                user = userResult.result;
                return _context4.abrupt("return", (0, _AppProviderTypes.makeSuccess)(user.favouriteResources));

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function getFavouriteResources(_x7) {
        return _getFavouriteResources.apply(this, arguments);
      };
    }()
  }, {
    key: "getRecentResources",
    value: function () {
      var _getRecentResources = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(userId) {
        var userResult, user;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.getUser(this.userRef(this.orgId, userId));

              case 2:
                userResult = _context5.sent;

                if (!(userResult.type === _AppProviderTypes.ResultType.ERROR)) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt("return", userResult);

              case 5:
                user = userResult.result;
                return _context5.abrupt("return", (0, _AppProviderTypes.makeSuccess)(user.recentResources));

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function getRecentResources(_x8) {
        return _getRecentResources.apply(this, arguments);
      };
    }()
    /**
     * Change the user's status
     */

  }, {
    key: "changeUserStatus",
    value: function () {
      var _changeUserStatus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(userId, status) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", this.userRef(this.orgId, userId).set({
                  status: status
                }, {
                  merge: true
                }).then(function () {
                  return (0, _AppProviderTypes.makeSuccess)(undefined);
                }).catch(function (err) {
                  return (0, _AppProviderTypes.makeError)(err.message);
                }));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function changeUserStatus(_x9, _x10) {
        return _changeUserStatus.apply(this, arguments);
      };
    }()
  }, {
    key: "changeUserType",
    value: function () {
      var _changeUserType = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(userId, type) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", this.userRef(this.orgId, userId).set({
                  type: type
                }, {
                  merge: true
                }).then(function () {
                  return (0, _AppProviderTypes.makeSuccess)(undefined);
                }));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function changeUserType(_x11, _x12) {
        return _changeUserType.apply(this, arguments);
      };
    }() //
    // Helpers
    // ------------------------------------

  }, {
    key: "userRef",
    value: function userRef(orgId, userId) {
      return this.firestore.collection('org').doc(orgId).collection('user').doc(userId);
    }
  }, {
    key: "getUser",
    value: function () {
      var _getUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(userRef) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt("return", userRef.get().then(function (sn) {
                  var data = sn.data();

                  if (!data) {
                    return (0, _AppProviderTypes.makeError)("No data found for userRef:".concat(userRef));
                  } //Set the default user data here.


                  return (0, _AppProviderTypes.makeSuccess)(_objectSpread({}, _User.DefaultUser, data));
                }).catch(function (err) {
                  return (0, _AppProviderTypes.makeError)(err.message);
                }));

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function getUser(_x13) {
        return _getUser.apply(this, arguments);
      };
    }()
  }]);

  return UserApi;
}();

exports.UserApi = UserApi;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvVXNlckFwaS50cyJdLCJuYW1lcyI6WyJVc2VyQXBpIiwiZmlyZXN0b3JlIiwib3JnSWQiLCJ1c2VySWQiLCJyZXNvdXJjZSIsImdldEZhdm91cml0ZVJlc291cmNlcyIsImZhdm91cml0ZXNSZXN1bHQiLCJ0eXBlIiwiUmVzdWx0VHlwZSIsIkVSUk9SIiwiZmF2b3VyaXRlcyIsInJlc3VsdCIsImlkIiwidXBkYXRlRmF2b3VyaXRlUmVzb3VyY2VzIiwicmVzb3VyY2VJZCIsImZhdm91cml0ZVJlc291cmNlcyIsInVzZXJSZWYiLCJzZXQiLCJtZXJnZSIsInRoZW4iLCJ1bmRlZmluZWQiLCJjYXRjaCIsImVyciIsIm1lc3NhZ2UiLCJnZXRVc2VyIiwidXNlclJlc3VsdCIsInVzZXIiLCJyZWNlbnRSZXNvdXJjZXMiLCJzdGF0dXMiLCJjb2xsZWN0aW9uIiwiZG9jIiwiZ2V0Iiwic24iLCJkYXRhIiwiRGVmYXVsdFVzZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztJQVFhQSxPOzs7QUFJWCxtQkFBWUMsU0FBWixFQUFrQ0MsS0FBbEMsRUFBaUQ7QUFBQTs7QUFBQTs7QUFBQTs7QUFDL0MsU0FBS0QsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDRDs7Ozs7OzsrQ0FFaUNDLE0sRUFBZ0JDLFE7Ozs7Ozs7dUJBQ2pCLEtBQUtDLHFCQUFMLENBQTJCRixNQUEzQixDOzs7QUFBekJHLGdCQUFBQSxnQjs7c0JBQ0ZBLGdCQUFnQixDQUFDQyxJQUFqQixLQUEwQkMsNkJBQVdDLEs7Ozs7O2lEQUNoQ0gsZ0I7OztBQUVISSxnQkFBQUEsVSxHQUFhSixnQkFBZ0IsQ0FBQ0ssTTtBQUNwQ0QsZ0JBQUFBLFVBQVUsQ0FBQ04sUUFBUSxDQUFDUSxFQUFWLENBQVYsR0FBMEJSLFFBQTFCO2lEQUVPLEtBQUtTLHdCQUFMLENBQThCVixNQUE5QixFQUFzQ08sVUFBdEMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnREFHNEJQLE0sRUFBZ0JXLFU7Ozs7Ozs7dUJBQ3BCLEtBQUtULHFCQUFMLENBQTJCRixNQUEzQixDOzs7QUFBekJHLGdCQUFBQSxnQjs7c0JBQ0ZBLGdCQUFnQixDQUFDQyxJQUFqQixLQUEwQkMsNkJBQVdDLEs7Ozs7O2tEQUNoQ0gsZ0I7OztBQUVISSxnQkFBQUEsVSxHQUFhSixnQkFBZ0IsQ0FBQ0ssTTtBQUNwQyx1QkFBT0QsVUFBVSxDQUFDSSxVQUFELENBQWpCO2tEQUVPLEtBQUtELHdCQUFMLENBQThCVixNQUE5QixFQUFzQ08sVUFBdEMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnREFHOEJQLE0sRUFBZ0JZLGtCOzs7OztrREFDOUMsS0FBS0MsT0FBTCxDQUFhLEtBQUtkLEtBQWxCLEVBQXlCQyxNQUF6QixFQUFpQ2MsR0FBakMsQ0FBcUM7QUFBRUYsa0JBQUFBLGtCQUFrQixFQUFsQkE7QUFBRixpQkFBckMsRUFBNkQ7QUFBRUcsa0JBQUFBLEtBQUssRUFBRTtBQUFULGlCQUE3RCxFQUNKQyxJQURJLENBQ0M7QUFBQSx5QkFBTSxtQ0FBWUMsU0FBWixDQUFOO0FBQUEsaUJBREQsRUFFSkMsS0FGSSxDQUVFLFVBQUNDLEdBQUQ7QUFBQSx5QkFBZ0IsaUNBQVVBLEdBQUcsQ0FBQ0MsT0FBZCxDQUFoQjtBQUFBLGlCQUZGLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0RBSzBCcEIsTTs7Ozs7Ozt1QkFDUixLQUFLcUIsT0FBTCxDQUFhLEtBQUtSLE9BQUwsQ0FBYSxLQUFLZCxLQUFsQixFQUF5QkMsTUFBekIsQ0FBYixDOzs7QUFBbkJzQixnQkFBQUEsVTs7c0JBQ0ZBLFVBQVUsQ0FBQ2xCLElBQVgsS0FBb0JDLDZCQUFXQyxLOzs7OztrREFDMUJnQixVOzs7QUFHSEMsZ0JBQUFBLEksR0FBT0QsVUFBVSxDQUFDZCxNO2tEQUNqQixtQ0FBWWUsSUFBSSxDQUFDWCxrQkFBakIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnREFHdUJaLE07Ozs7Ozs7dUJBQ0wsS0FBS3FCLE9BQUwsQ0FBYSxLQUFLUixPQUFMLENBQWEsS0FBS2QsS0FBbEIsRUFBeUJDLE1BQXpCLENBQWIsQzs7O0FBQW5Cc0IsZ0JBQUFBLFU7O3NCQUNGQSxVQUFVLENBQUNsQixJQUFYLEtBQW9CQyw2QkFBV0MsSzs7Ozs7a0RBQzFCZ0IsVTs7O0FBR0hDLGdCQUFBQSxJLEdBQU9ELFVBQVUsQ0FBQ2QsTTtrREFDakIsbUNBQVllLElBQUksQ0FBQ0MsZUFBakIsQzs7Ozs7Ozs7Ozs7Ozs7QUFHVDs7Ozs7Ozs7O2dEQUc4QnhCLE0sRUFBZ0J5QixNOzs7OztrREFDckMsS0FBS1osT0FBTCxDQUFhLEtBQUtkLEtBQWxCLEVBQXlCQyxNQUF6QixFQUFpQ2MsR0FBakMsQ0FBcUM7QUFBRVcsa0JBQUFBLE1BQU0sRUFBTkE7QUFBRixpQkFBckMsRUFBaUQ7QUFBRVYsa0JBQUFBLEtBQUssRUFBRTtBQUFULGlCQUFqRCxFQUNKQyxJQURJLENBQ0M7QUFBQSx5QkFBTSxtQ0FBWUMsU0FBWixDQUFOO0FBQUEsaUJBREQsRUFFSkMsS0FGSSxDQUVFLFVBQUNDLEdBQUQ7QUFBQSx5QkFBZ0IsaUNBQVVBLEdBQUcsQ0FBQ0MsT0FBZCxDQUFoQjtBQUFBLGlCQUZGLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0RBS21CcEIsTSxFQUFnQkksSTs7Ozs7a0RBQ25DLEtBQUtTLE9BQUwsQ0FBYSxLQUFLZCxLQUFsQixFQUF5QkMsTUFBekIsRUFBaUNjLEdBQWpDLENBQXFDO0FBQUNWLGtCQUFBQSxJQUFJLEVBQUpBO0FBQUQsaUJBQXJDLEVBQTZDO0FBQUVXLGtCQUFBQSxLQUFLLEVBQUU7QUFBVCxpQkFBN0MsRUFDTkMsSUFETSxDQUNEO0FBQUEseUJBQU0sbUNBQVlDLFNBQVosQ0FBTjtBQUFBLGlCQURDLEM7Ozs7Ozs7Ozs7Ozs7UUFLVDtBQUNBO0FBQ0E7Ozs7NEJBRWVsQixLLEVBQWVDLE0sRUFBbUM7QUFDL0QsYUFBTyxLQUFLRixTQUFMLENBQWU0QixVQUFmLENBQTBCLEtBQTFCLEVBQWlDQyxHQUFqQyxDQUFxQzVCLEtBQXJDLEVBQTRDMkIsVUFBNUMsQ0FBdUQsTUFBdkQsRUFBK0RDLEdBQS9ELENBQW1FM0IsTUFBbkUsQ0FBUDtBQUNEOzs7Ozs7Z0RBRW9CYSxPOzs7OztrREFDWkEsT0FBTyxDQUFDZSxHQUFSLEdBQ05aLElBRE0sQ0FDRCxVQUFBYSxFQUFFLEVBQUk7QUFDVixzQkFBTUMsSUFBSSxHQUFHRCxFQUFFLENBQUNDLElBQUgsRUFBYjs7QUFDQSxzQkFBSSxDQUFDQSxJQUFMLEVBQVc7QUFDVCwyQkFBTyxxRUFBNkNqQixPQUE3QyxFQUFQO0FBQ0QsbUJBSlMsQ0FNVjs7O0FBQ0EseUJBQU8scURBQ0ZrQixpQkFERSxFQUVGRCxJQUZFLEVBQVA7QUFJRCxpQkFaTSxFQWFOWixLQWJNLENBYUEsVUFBQ0MsR0FBRDtBQUFBLHlCQUFnQixpQ0FBZ0JBLEdBQUcsQ0FBQ0MsT0FBcEIsQ0FBaEI7QUFBQSxpQkFiQSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgYWRtaW4gZnJvbSBcImZpcmViYXNlLWFkbWluXCI7XG5pbXBvcnQgeyBSZXNvdXJjZSB9IGZyb20gXCIuLi9tb2RlbC9SZXNvdXJjZVwiO1xuaW1wb3J0IHsgU29tZVJlc3VsdCwgUmVzdWx0VHlwZSwgbWFrZVN1Y2Nlc3MsIG1ha2VFcnJvciB9IGZyb20gXCIuLi91dGlscy9BcHBQcm92aWRlclR5cGVzXCI7XG5pbXBvcnQgRGljdFR5cGUgZnJvbSBcIi4uL3V0aWxzL0RpY3RUeXBlXCI7XG5pbXBvcnQgeyBVc2VyLCBEZWZhdWx0VXNlciB9IGZyb20gXCIuLi9tb2RlbC9Vc2VyXCI7XG5pbXBvcnQgVXNlclN0YXR1cyBmcm9tIFwiLi4vZW51bXMvVXNlclN0YXR1c1wiO1xuaW1wb3J0IFVzZXJUeXBlIGZyb20gXCIuLi9lbnVtcy9Vc2VyVHlwZVwiO1xuaW1wb3J0IHsgRG9jdW1lbnRSZWZlcmVuY2UgfSBmcm9tIFwiQGdvb2dsZS1jbG91ZC9maXJlc3RvcmVcIjtcblxudHlwZSBGaXJlc3RvcmUgPSBhZG1pbi5maXJlc3RvcmUuRmlyZXN0b3JlO1xuXG5cbmV4cG9ydCBjbGFzcyBVc2VyQXBpIHtcbiAgZmlyZXN0b3JlOiBGaXJlc3RvcmU7XG4gIG9yZ0lkOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoZmlyZXN0b3JlOiBGaXJlc3RvcmUsIG9yZ0lkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmZpcmVzdG9yZSA9IGZpcmVzdG9yZTtcbiAgICB0aGlzLm9yZ0lkID0gb3JnSWQ7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWRkRmF2b3VyaXRlUmVzb3VyY2UodXNlcklkOiBzdHJpbmcsIHJlc291cmNlOiBSZXNvdXJjZSk6IFByb21pc2U8U29tZVJlc3VsdDx2b2lkPj4ge1xuICAgIGNvbnN0IGZhdm91cml0ZXNSZXN1bHQgPSBhd2FpdCB0aGlzLmdldEZhdm91cml0ZVJlc291cmNlcyh1c2VySWQpO1xuICAgIGlmIChmYXZvdXJpdGVzUmVzdWx0LnR5cGUgPT09IFJlc3VsdFR5cGUuRVJST1IpIHtcbiAgICAgIHJldHVybiBmYXZvdXJpdGVzUmVzdWx0O1xuICAgIH1cbiAgICBjb25zdCBmYXZvdXJpdGVzID0gZmF2b3VyaXRlc1Jlc3VsdC5yZXN1bHQ7XG4gICAgZmF2b3VyaXRlc1tyZXNvdXJjZS5pZF0gPSByZXNvdXJjZTtcblxuICAgIHJldHVybiB0aGlzLnVwZGF0ZUZhdm91cml0ZVJlc291cmNlcyh1c2VySWQsIGZhdm91cml0ZXMpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlbW92ZUZhdm91cml0ZVJlc291cmNlKHVzZXJJZDogc3RyaW5nLCByZXNvdXJjZUlkOiBzdHJpbmcpOiBQcm9taXNlPFNvbWVSZXN1bHQ8dm9pZD4+IHtcbiAgICBjb25zdCBmYXZvdXJpdGVzUmVzdWx0ID0gYXdhaXQgdGhpcy5nZXRGYXZvdXJpdGVSZXNvdXJjZXModXNlcklkKTtcbiAgICBpZiAoZmF2b3VyaXRlc1Jlc3VsdC50eXBlID09PSBSZXN1bHRUeXBlLkVSUk9SKSB7XG4gICAgICByZXR1cm4gZmF2b3VyaXRlc1Jlc3VsdDtcbiAgICB9XG4gICAgY29uc3QgZmF2b3VyaXRlcyA9IGZhdm91cml0ZXNSZXN1bHQucmVzdWx0O1xuICAgIGRlbGV0ZSBmYXZvdXJpdGVzW3Jlc291cmNlSWRdO1xuXG4gICAgcmV0dXJuIHRoaXMudXBkYXRlRmF2b3VyaXRlUmVzb3VyY2VzKHVzZXJJZCwgZmF2b3VyaXRlcyk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHVwZGF0ZUZhdm91cml0ZVJlc291cmNlcyh1c2VySWQ6IHN0cmluZywgZmF2b3VyaXRlUmVzb3VyY2VzOiBEaWN0VHlwZTxSZXNvdXJjZT4pOiBQcm9taXNlPFNvbWVSZXN1bHQ8YW55Pj4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJSZWYodGhpcy5vcmdJZCwgdXNlcklkKS5zZXQoeyBmYXZvdXJpdGVSZXNvdXJjZXMgfSwgeyBtZXJnZTogdHJ1ZSB9KVxuICAgICAgLnRoZW4oKCkgPT4gbWFrZVN1Y2Nlc3ModW5kZWZpbmVkKSlcbiAgICAgIC5jYXRjaCgoZXJyOiBFcnJvcikgPT4gbWFrZUVycm9yKGVyci5tZXNzYWdlKSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRGYXZvdXJpdGVSZXNvdXJjZXModXNlcklkOiBzdHJpbmcpOiBQcm9taXNlPFNvbWVSZXN1bHQ8RGljdFR5cGU8UmVzb3VyY2U+Pj4ge1xuICAgIGNvbnN0IHVzZXJSZXN1bHQgPSBhd2FpdCB0aGlzLmdldFVzZXIodGhpcy51c2VyUmVmKHRoaXMub3JnSWQsIHVzZXJJZCkpO1xuICAgIGlmICh1c2VyUmVzdWx0LnR5cGUgPT09IFJlc3VsdFR5cGUuRVJST1IpIHtcbiAgICAgIHJldHVybiB1c2VyUmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXIgPSB1c2VyUmVzdWx0LnJlc3VsdDtcbiAgICByZXR1cm4gbWFrZVN1Y2Nlc3ModXNlci5mYXZvdXJpdGVSZXNvdXJjZXMpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFJlY2VudFJlc291cmNlcyh1c2VySWQ6IHN0cmluZyk6IFByb21pc2U8U29tZVJlc3VsdDxSZXNvdXJjZVtdPj4ge1xuICAgIGNvbnN0IHVzZXJSZXN1bHQgPSBhd2FpdCB0aGlzLmdldFVzZXIodGhpcy51c2VyUmVmKHRoaXMub3JnSWQsIHVzZXJJZCkpO1xuICAgIGlmICh1c2VyUmVzdWx0LnR5cGUgPT09IFJlc3VsdFR5cGUuRVJST1IpIHtcbiAgICAgIHJldHVybiB1c2VyUmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXIgPSB1c2VyUmVzdWx0LnJlc3VsdDtcbiAgICByZXR1cm4gbWFrZVN1Y2Nlc3ModXNlci5yZWNlbnRSZXNvdXJjZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZSB0aGUgdXNlcidzIHN0YXR1c1xuICAgKi9cbiAgcHVibGljIGFzeW5jIGNoYW5nZVVzZXJTdGF0dXModXNlcklkOiBzdHJpbmcsIHN0YXR1czogVXNlclN0YXR1cy5BcHByb3ZlZCB8IFVzZXJTdGF0dXMuUmVqZWN0ZWQpOiBQcm9taXNlPFNvbWVSZXN1bHQ8dm9pZD4+IHtcbiAgICByZXR1cm4gdGhpcy51c2VyUmVmKHRoaXMub3JnSWQsIHVzZXJJZCkuc2V0KHsgc3RhdHVzIH0sIHsgbWVyZ2U6IHRydWUgfSlcbiAgICAgIC50aGVuKCgpID0+IG1ha2VTdWNjZXNzKHVuZGVmaW5lZCkpXG4gICAgICAuY2F0Y2goKGVycjogRXJyb3IpID0+IG1ha2VFcnJvcihlcnIubWVzc2FnZSkpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY2hhbmdlVXNlclR5cGUodXNlcklkOiBzdHJpbmcsIHR5cGU6IFVzZXJUeXBlKTogUHJvbWlzZTxTb21lUmVzdWx0PHZvaWQ+PiB7XG4gICAgcmV0dXJuIHRoaXMudXNlclJlZih0aGlzLm9yZ0lkLCB1c2VySWQpLnNldCh7dHlwZX0sIHsgbWVyZ2U6IHRydWV9KVxuICAgIC50aGVuKCgpID0+IG1ha2VTdWNjZXNzKHVuZGVmaW5lZCkpXG4gIH1cblxuXG4gIC8vXG4gIC8vIEhlbHBlcnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgcHVibGljIHVzZXJSZWYob3JnSWQ6IHN0cmluZywgdXNlcklkOiBzdHJpbmcpOiBEb2N1bWVudFJlZmVyZW5jZSB7XG4gICAgcmV0dXJuIHRoaXMuZmlyZXN0b3JlLmNvbGxlY3Rpb24oJ29yZycpLmRvYyhvcmdJZCkuY29sbGVjdGlvbigndXNlcicpLmRvYyh1c2VySWQpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFVzZXIodXNlclJlZjogRG9jdW1lbnRSZWZlcmVuY2UpOiBQcm9taXNlPFNvbWVSZXN1bHQ8VXNlcj4+IHtcbiAgICByZXR1cm4gdXNlclJlZi5nZXQoKVxuICAgIC50aGVuKHNuID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBzbi5kYXRhKCk7XG4gICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG1ha2VFcnJvcjxVc2VyPihgTm8gZGF0YSBmb3VuZCBmb3IgdXNlclJlZjoke3VzZXJSZWZ9YCk7XG4gICAgICB9XG5cbiAgICAgIC8vU2V0IHRoZSBkZWZhdWx0IHVzZXIgZGF0YSBoZXJlLlxuICAgICAgcmV0dXJuIG1ha2VTdWNjZXNzKHtcbiAgICAgICAgLi4uRGVmYXVsdFVzZXIsXG4gICAgICAgIC4uLmRhdGFcbiAgICAgIH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnI6IEVycm9yKSA9PiBtYWtlRXJyb3I8VXNlcj4oZXJyLm1lc3NhZ2UpKVxuICB9XG5cbn0iXX0=