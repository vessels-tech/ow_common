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

      function addFavouriteResource(_x, _x2) {
        return _addFavouriteResource.apply(this, arguments);
      }

      return addFavouriteResource;
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

      function removeFavouriteResource(_x3, _x4) {
        return _removeFavouriteResource.apply(this, arguments);
      }

      return removeFavouriteResource;
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

      function updateFavouriteResources(_x5, _x6) {
        return _updateFavouriteResources.apply(this, arguments);
      }

      return updateFavouriteResources;
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

      function getFavouriteResources(_x7) {
        return _getFavouriteResources.apply(this, arguments);
      }

      return getFavouriteResources;
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

      function getRecentResources(_x8) {
        return _getRecentResources.apply(this, arguments);
      }

      return getRecentResources;
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

      function changeUserStatus(_x9, _x10) {
        return _changeUserStatus.apply(this, arguments);
      }

      return changeUserStatus;
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

      function changeUserType(_x11, _x12) {
        return _changeUserType.apply(this, arguments);
      }

      return changeUserType;
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

      function getUser(_x13) {
        return _getUser.apply(this, arguments);
      }

      return getUser;
    }()
  }]);

  return UserApi;
}();

exports.UserApi = UserApi;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvVXNlckFwaS50cyJdLCJuYW1lcyI6WyJVc2VyQXBpIiwiZmlyZXN0b3JlIiwib3JnSWQiLCJ1c2VySWQiLCJyZXNvdXJjZSIsImdldEZhdm91cml0ZVJlc291cmNlcyIsImZhdm91cml0ZXNSZXN1bHQiLCJ0eXBlIiwiUmVzdWx0VHlwZSIsIkVSUk9SIiwiZmF2b3VyaXRlcyIsInJlc3VsdCIsImlkIiwidXBkYXRlRmF2b3VyaXRlUmVzb3VyY2VzIiwicmVzb3VyY2VJZCIsImZhdm91cml0ZVJlc291cmNlcyIsInVzZXJSZWYiLCJzZXQiLCJtZXJnZSIsInRoZW4iLCJ1bmRlZmluZWQiLCJjYXRjaCIsImVyciIsIm1lc3NhZ2UiLCJnZXRVc2VyIiwidXNlclJlc3VsdCIsInVzZXIiLCJyZWNlbnRSZXNvdXJjZXMiLCJzdGF0dXMiLCJjb2xsZWN0aW9uIiwiZG9jIiwiZ2V0Iiwic24iLCJkYXRhIiwiRGVmYXVsdFVzZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztJQVFhQSxPOzs7QUFJWCxtQkFBWUMsU0FBWixFQUFrQ0MsS0FBbEMsRUFBaUQ7QUFBQTs7QUFBQTs7QUFBQTs7QUFDL0MsU0FBS0QsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDRDs7Ozs7OzsrQ0FFaUNDLE0sRUFBZ0JDLFE7Ozs7Ozs7dUJBQ2pCLEtBQUtDLHFCQUFMLENBQTJCRixNQUEzQixDOzs7QUFBekJHLGdCQUFBQSxnQjs7c0JBQ0ZBLGdCQUFnQixDQUFDQyxJQUFqQixLQUEwQkMsNkJBQVdDLEs7Ozs7O2lEQUNoQ0gsZ0I7OztBQUVISSxnQkFBQUEsVSxHQUFhSixnQkFBZ0IsQ0FBQ0ssTTtBQUNwQ0QsZ0JBQUFBLFVBQVUsQ0FBQ04sUUFBUSxDQUFDUSxFQUFWLENBQVYsR0FBMEJSLFFBQTFCO2lEQUVPLEtBQUtTLHdCQUFMLENBQThCVixNQUE5QixFQUFzQ08sVUFBdEMs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LENBQXFDNUIsS0FBckMsRUFBNEMyQixVQUE1QyxDQUF1RCxNQUF2RCxFQUErREMsR0FBL0QsQ0FBbUUzQixNQUFuRSxDQUFQO0FBQ0Q7Ozs7OztnREFFb0JhLE87Ozs7O2tEQUNaQSxPQUFPLENBQUNlLEdBQVIsR0FDTlosSUFETSxDQUNELFVBQUFhLEVBQUUsRUFBSTtBQUNWLHNCQUFNQyxJQUFJLEdBQUdELEVBQUUsQ0FBQ0MsSUFBSCxFQUFiOztBQUNBLHNCQUFJLENBQUNBLElBQUwsRUFBVztBQUNULDJCQUFPLHFFQUE2Q2pCLE9BQTdDLEVBQVA7QUFDRCxtQkFKUyxDQU1WOzs7QUFDQSx5QkFBTyxxREFDRmtCLGlCQURFLEVBRUZELElBRkUsRUFBUDtBQUlELGlCQVpNLEVBYU5aLEtBYk0sQ0FhQSxVQUFDQyxHQUFEO0FBQUEseUJBQWdCLGlDQUFnQkEsR0FBRyxDQUFDQyxPQUFwQixDQUFoQjtBQUFBLGlCQWJBLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXNvdXJjZSB9IGZyb20gXCIuLi9tb2RlbC9SZXNvdXJjZVwiO1xuaW1wb3J0IHsgU29tZVJlc3VsdCwgUmVzdWx0VHlwZSwgbWFrZVN1Y2Nlc3MsIG1ha2VFcnJvciB9IGZyb20gXCIuLi91dGlscy9BcHBQcm92aWRlclR5cGVzXCI7XG5pbXBvcnQgeyBEaWN0VHlwZSB9IGZyb20gXCIuLi91dGlscy9EaWN0VHlwZVwiO1xuaW1wb3J0IHsgVXNlciwgRGVmYXVsdFVzZXIgfSBmcm9tIFwiLi4vbW9kZWwvVXNlclwiO1xuaW1wb3J0IFVzZXJTdGF0dXMgZnJvbSBcIi4uL2VudW1zL1VzZXJTdGF0dXNcIjtcbmltcG9ydCBVc2VyVHlwZSBmcm9tIFwiLi4vZW51bXMvVXNlclR5cGVcIjtcbmltcG9ydCAqIGFzIGFkbWluICBmcm9tIFwiZmlyZWJhc2UtYWRtaW5cIjtcbmltcG9ydCB7IERvY3VtZW50UmVmZXJlbmNlIH0gZnJvbSBcIkBnb29nbGUtY2xvdWQvZmlyZXN0b3JlXCI7XG5cbnR5cGUgRmlyZXN0b3JlID0gYWRtaW4uZmlyZXN0b3JlLkZpcmVzdG9yZTtcblxuZXhwb3J0IGNsYXNzIFVzZXJBcGkge1xuICBmaXJlc3RvcmU6IEZpcmVzdG9yZTtcbiAgb3JnSWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihmaXJlc3RvcmU6IEZpcmVzdG9yZSwgb3JnSWQ6IHN0cmluZykge1xuICAgIHRoaXMuZmlyZXN0b3JlID0gZmlyZXN0b3JlO1xuICAgIHRoaXMub3JnSWQgPSBvcmdJZDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZGRGYXZvdXJpdGVSZXNvdXJjZSh1c2VySWQ6IHN0cmluZywgcmVzb3VyY2U6IFJlc291cmNlKTogUHJvbWlzZTxTb21lUmVzdWx0PHZvaWQ+PiB7XG4gICAgY29uc3QgZmF2b3VyaXRlc1Jlc3VsdCA9IGF3YWl0IHRoaXMuZ2V0RmF2b3VyaXRlUmVzb3VyY2VzKHVzZXJJZCk7XG4gICAgaWYgKGZhdm91cml0ZXNSZXN1bHQudHlwZSA9PT0gUmVzdWx0VHlwZS5FUlJPUikge1xuICAgICAgcmV0dXJuIGZhdm91cml0ZXNSZXN1bHQ7XG4gICAgfVxuICAgIGNvbnN0IGZhdm91cml0ZXMgPSBmYXZvdXJpdGVzUmVzdWx0LnJlc3VsdDtcbiAgICBmYXZvdXJpdGVzW3Jlc291cmNlLmlkXSA9IHJlc291cmNlO1xuXG4gICAgcmV0dXJuIHRoaXMudXBkYXRlRmF2b3VyaXRlUmVzb3VyY2VzKHVzZXJJZCwgZmF2b3VyaXRlcyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVtb3ZlRmF2b3VyaXRlUmVzb3VyY2UodXNlcklkOiBzdHJpbmcsIHJlc291cmNlSWQ6IHN0cmluZyk6IFByb21pc2U8U29tZVJlc3VsdDx2b2lkPj4ge1xuICAgIGNvbnN0IGZhdm91cml0ZXNSZXN1bHQgPSBhd2FpdCB0aGlzLmdldEZhdm91cml0ZVJlc291cmNlcyh1c2VySWQpO1xuICAgIGlmIChmYXZvdXJpdGVzUmVzdWx0LnR5cGUgPT09IFJlc3VsdFR5cGUuRVJST1IpIHtcbiAgICAgIHJldHVybiBmYXZvdXJpdGVzUmVzdWx0O1xuICAgIH1cbiAgICBjb25zdCBmYXZvdXJpdGVzID0gZmF2b3VyaXRlc1Jlc3VsdC5yZXN1bHQ7XG4gICAgZGVsZXRlIGZhdm91cml0ZXNbcmVzb3VyY2VJZF07XG5cbiAgICByZXR1cm4gdGhpcy51cGRhdGVGYXZvdXJpdGVSZXNvdXJjZXModXNlcklkLCBmYXZvdXJpdGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgdXBkYXRlRmF2b3VyaXRlUmVzb3VyY2VzKHVzZXJJZDogc3RyaW5nLCBmYXZvdXJpdGVSZXNvdXJjZXM6IERpY3RUeXBlPFJlc291cmNlPik6IFByb21pc2U8U29tZVJlc3VsdDxhbnk+PiB7XG4gICAgcmV0dXJuIHRoaXMudXNlclJlZih0aGlzLm9yZ0lkLCB1c2VySWQpLnNldCh7IGZhdm91cml0ZVJlc291cmNlcyB9LCB7IG1lcmdlOiB0cnVlIH0pXG4gICAgICAudGhlbigoKSA9PiBtYWtlU3VjY2Vzcyh1bmRlZmluZWQpKVxuICAgICAgLmNhdGNoKChlcnI6IEVycm9yKSA9PiBtYWtlRXJyb3IoZXJyLm1lc3NhZ2UpKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldEZhdm91cml0ZVJlc291cmNlcyh1c2VySWQ6IHN0cmluZyk6IFByb21pc2U8U29tZVJlc3VsdDxEaWN0VHlwZTxSZXNvdXJjZT4+PiB7XG4gICAgY29uc3QgdXNlclJlc3VsdCA9IGF3YWl0IHRoaXMuZ2V0VXNlcih0aGlzLnVzZXJSZWYodGhpcy5vcmdJZCwgdXNlcklkKSk7XG4gICAgaWYgKHVzZXJSZXN1bHQudHlwZSA9PT0gUmVzdWx0VHlwZS5FUlJPUikge1xuICAgICAgcmV0dXJuIHVzZXJSZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdXNlciA9IHVzZXJSZXN1bHQucmVzdWx0O1xuICAgIHJldHVybiBtYWtlU3VjY2Vzcyh1c2VyLmZhdm91cml0ZVJlc291cmNlcyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0UmVjZW50UmVzb3VyY2VzKHVzZXJJZDogc3RyaW5nKTogUHJvbWlzZTxTb21lUmVzdWx0PFJlc291cmNlW10+PiB7XG4gICAgY29uc3QgdXNlclJlc3VsdCA9IGF3YWl0IHRoaXMuZ2V0VXNlcih0aGlzLnVzZXJSZWYodGhpcy5vcmdJZCwgdXNlcklkKSk7XG4gICAgaWYgKHVzZXJSZXN1bHQudHlwZSA9PT0gUmVzdWx0VHlwZS5FUlJPUikge1xuICAgICAgcmV0dXJuIHVzZXJSZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdXNlciA9IHVzZXJSZXN1bHQucmVzdWx0O1xuICAgIHJldHVybiBtYWtlU3VjY2Vzcyh1c2VyLnJlY2VudFJlc291cmNlcyk7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlIHRoZSB1c2VyJ3Mgc3RhdHVzXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2hhbmdlVXNlclN0YXR1cyh1c2VySWQ6IHN0cmluZywgc3RhdHVzOiBVc2VyU3RhdHVzLkFwcHJvdmVkIHwgVXNlclN0YXR1cy5SZWplY3RlZCk6IFByb21pc2U8U29tZVJlc3VsdDx2b2lkPj4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJSZWYodGhpcy5vcmdJZCwgdXNlcklkKS5zZXQoeyBzdGF0dXMgfSwgeyBtZXJnZTogdHJ1ZSB9KVxuICAgICAgLnRoZW4oKCkgPT4gbWFrZVN1Y2Nlc3ModW5kZWZpbmVkKSlcbiAgICAgIC5jYXRjaCgoZXJyOiBFcnJvcikgPT4gbWFrZUVycm9yKGVyci5tZXNzYWdlKSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjaGFuZ2VVc2VyVHlwZSh1c2VySWQ6IHN0cmluZywgdHlwZTogVXNlclR5cGUpOiBQcm9taXNlPFNvbWVSZXN1bHQ8dm9pZD4+IHtcbiAgICByZXR1cm4gdGhpcy51c2VyUmVmKHRoaXMub3JnSWQsIHVzZXJJZCkuc2V0KHt0eXBlfSwgeyBtZXJnZTogdHJ1ZX0pXG4gICAgLnRoZW4oKCkgPT4gbWFrZVN1Y2Nlc3ModW5kZWZpbmVkKSlcbiAgfVxuXG5cbiAgLy9cbiAgLy8gSGVscGVyc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICBwdWJsaWMgdXNlclJlZihvcmdJZDogc3RyaW5nLCB1c2VySWQ6IHN0cmluZyk6IERvY3VtZW50UmVmZXJlbmNlIHtcbiAgICByZXR1cm4gdGhpcy5maXJlc3RvcmUuY29sbGVjdGlvbignb3JnJykuZG9jKG9yZ0lkKS5jb2xsZWN0aW9uKCd1c2VyJykuZG9jKHVzZXJJZCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0VXNlcih1c2VyUmVmOiBEb2N1bWVudFJlZmVyZW5jZSk6IFByb21pc2U8U29tZVJlc3VsdDxVc2VyPj4ge1xuICAgIHJldHVybiB1c2VyUmVmLmdldCgpXG4gICAgLnRoZW4oc24gPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IHNuLmRhdGEoKTtcbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICByZXR1cm4gbWFrZUVycm9yPFVzZXI+KGBObyBkYXRhIGZvdW5kIGZvciB1c2VyUmVmOiR7dXNlclJlZn1gKTtcbiAgICAgIH1cblxuICAgICAgLy9TZXQgdGhlIGRlZmF1bHQgdXNlciBkYXRhIGhlcmUuXG4gICAgICByZXR1cm4gbWFrZVN1Y2Nlc3Moe1xuICAgICAgICAuLi5EZWZhdWx0VXNlcixcbiAgICAgICAgLi4uZGF0YVxuICAgICAgfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycjogRXJyb3IpID0+IG1ha2VFcnJvcjxVc2VyPihlcnIubWVzc2FnZSkpXG4gIH1cblxufSJdfQ==