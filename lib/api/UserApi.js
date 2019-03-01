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
    /**
     * Add a list of favourite resources to the user's favourites
     */

  }, {
    key: "addFavouriteResources",
    value: function () {
      var _addFavouriteResources = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(userId, resources) {
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
                resources.forEach(function (r) {
                  favourites[r.id] = r;
                });
                return _context2.abrupt("return", this.updateFavouriteResources(userId, favourites));

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addFavouriteResources(_x3, _x4) {
        return _addFavouriteResources.apply(this, arguments);
      }

      return addFavouriteResources;
    }()
    /**
     * Add new resources to the User's object.
     */

  }, {
    key: "markAsNewResources",
    value: function () {
      var _markAsNewResources = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(userId, resourceIds) {
        var newResourcesResult, newResources;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.getNewResources(userId);

              case 2:
                newResourcesResult = _context3.sent;

                if (!(newResourcesResult.type === _AppProviderTypes.ResultType.ERROR)) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", newResourcesResult);

              case 5:
                newResources = newResourcesResult.result;
                resourceIds.forEach(function (id) {
                  return newResources[id] = id;
                });
                return _context3.abrupt("return", this.updateNewResources(userId, newResources));

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function markAsNewResources(_x5, _x6) {
        return _markAsNewResources.apply(this, arguments);
      }

      return markAsNewResources;
    }()
  }, {
    key: "removeNewResource",
    value: function () {
      var _removeNewResource = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(userId, resourceId) {
        var newResourcesResult, newResources;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.getNewResources(userId);

              case 2:
                newResourcesResult = _context4.sent;

                if (!(newResourcesResult.type === _AppProviderTypes.ResultType.ERROR)) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt("return", newResourcesResult);

              case 5:
                newResources = newResourcesResult.result;
                delete newResources[resourceId];
                return _context4.abrupt("return", this.updateNewResources(userId, newResources));

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function removeNewResource(_x7, _x8) {
        return _removeNewResource.apply(this, arguments);
      }

      return removeNewResource;
    }()
  }, {
    key: "getNewResources",
    value: function () {
      var _getNewResources = _asyncToGenerator(
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
                return _context5.abrupt("return", (0, _AppProviderTypes.makeSuccess)(user.newResources));

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getNewResources(_x9) {
        return _getNewResources.apply(this, arguments);
      }

      return getNewResources;
    }()
  }, {
    key: "updateNewResources",
    value: function () {
      var _updateNewResources = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(userId, newResources) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", this.userRef(this.orgId, userId).update({
                  newResources: newResources
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

      function updateNewResources(_x10, _x11) {
        return _updateNewResources.apply(this, arguments);
      }

      return updateNewResources;
    }()
  }, {
    key: "removeFavouriteResource",
    value: function () {
      var _removeFavouriteResource = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(userId, resourceId) {
        var favouritesResult, favourites;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.getFavouriteResources(userId);

              case 2:
                favouritesResult = _context7.sent;

                if (!(favouritesResult.type === _AppProviderTypes.ResultType.ERROR)) {
                  _context7.next = 5;
                  break;
                }

                return _context7.abrupt("return", favouritesResult);

              case 5:
                favourites = favouritesResult.result;
                delete favourites[resourceId];
                return _context7.abrupt("return", this.updateFavouriteResources(userId, favourites));

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function removeFavouriteResource(_x12, _x13) {
        return _removeFavouriteResource.apply(this, arguments);
      }

      return removeFavouriteResource;
    }()
  }, {
    key: "updateFavouriteResources",
    value: function () {
      var _updateFavouriteResources = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(userId, favouriteResources) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt("return", this.userRef(this.orgId, userId).set({
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
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function updateFavouriteResources(_x14, _x15) {
        return _updateFavouriteResources.apply(this, arguments);
      }

      return updateFavouriteResources;
    }()
  }, {
    key: "getFavouriteResources",
    value: function () {
      var _getFavouriteResources = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(userId) {
        var userResult, user;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.getUser(this.userRef(this.orgId, userId));

              case 2:
                userResult = _context9.sent;

                if (!(userResult.type === _AppProviderTypes.ResultType.ERROR)) {
                  _context9.next = 5;
                  break;
                }

                return _context9.abrupt("return", userResult);

              case 5:
                user = userResult.result;
                return _context9.abrupt("return", (0, _AppProviderTypes.makeSuccess)(user.favouriteResources));

              case 7:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getFavouriteResources(_x16) {
        return _getFavouriteResources.apply(this, arguments);
      }

      return getFavouriteResources;
    }()
  }, {
    key: "getRecentResources",
    value: function () {
      var _getRecentResources = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(userId) {
        var userResult, user;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this.getUser(this.userRef(this.orgId, userId));

              case 2:
                userResult = _context10.sent;

                if (!(userResult.type === _AppProviderTypes.ResultType.ERROR)) {
                  _context10.next = 5;
                  break;
                }

                return _context10.abrupt("return", userResult);

              case 5:
                user = userResult.result;
                return _context10.abrupt("return", (0, _AppProviderTypes.makeSuccess)(user.recentResources));

              case 7:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function getRecentResources(_x17) {
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
      regeneratorRuntime.mark(function _callee11(userId, status) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt("return", this.userRef(this.orgId, userId).set({
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
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function changeUserStatus(_x18, _x19) {
        return _changeUserStatus.apply(this, arguments);
      }

      return changeUserStatus;
    }()
  }, {
    key: "changeUserType",
    value: function () {
      var _changeUserType = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee12(userId, type) {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                return _context12.abrupt("return", this.userRef(this.orgId, userId).set({
                  type: type
                }, {
                  merge: true
                }).then(function () {
                  return (0, _AppProviderTypes.makeSuccess)(undefined);
                }));

              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function changeUserType(_x20, _x21) {
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
      regeneratorRuntime.mark(function _callee13(userRef) {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                return _context13.abrupt("return", userRef.get().then(function (sn) {
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
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function getUser(_x22) {
        return _getUser.apply(this, arguments);
      }

      return getUser;
    }()
  }]);

  return UserApi;
}();

exports.UserApi = UserApi;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvVXNlckFwaS50cyJdLCJuYW1lcyI6WyJVc2VyQXBpIiwiZmlyZXN0b3JlIiwib3JnSWQiLCJ1c2VySWQiLCJyZXNvdXJjZSIsImdldEZhdm91cml0ZVJlc291cmNlcyIsImZhdm91cml0ZXNSZXN1bHQiLCJ0eXBlIiwiUmVzdWx0VHlwZSIsIkVSUk9SIiwiZmF2b3VyaXRlcyIsInJlc3VsdCIsImlkIiwidXBkYXRlRmF2b3VyaXRlUmVzb3VyY2VzIiwicmVzb3VyY2VzIiwiZm9yRWFjaCIsInIiLCJyZXNvdXJjZUlkcyIsImdldE5ld1Jlc291cmNlcyIsIm5ld1Jlc291cmNlc1Jlc3VsdCIsIm5ld1Jlc291cmNlcyIsInVwZGF0ZU5ld1Jlc291cmNlcyIsInJlc291cmNlSWQiLCJnZXRVc2VyIiwidXNlclJlZiIsInVzZXJSZXN1bHQiLCJ1c2VyIiwidXBkYXRlIiwidGhlbiIsInVuZGVmaW5lZCIsImNhdGNoIiwiZXJyIiwibWVzc2FnZSIsImZhdm91cml0ZVJlc291cmNlcyIsInNldCIsIm1lcmdlIiwicmVjZW50UmVzb3VyY2VzIiwic3RhdHVzIiwiY29sbGVjdGlvbiIsImRvYyIsImdldCIsInNuIiwiZGF0YSIsIkRlZmF1bHRVc2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRYUEsTzs7O0FBSVgsbUJBQVlDLFNBQVosRUFBa0NDLEtBQWxDLEVBQWlEO0FBQUE7O0FBQUE7O0FBQUE7O0FBQy9DLFNBQUtELFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0Q7Ozs7Ozs7K0NBRWlDQyxNLEVBQWdCQyxROzs7Ozs7O3VCQUNqQixLQUFLQyxxQkFBTCxDQUEyQkYsTUFBM0IsQzs7O0FBQXpCRyxnQkFBQUEsZ0I7O3NCQUNGQSxnQkFBZ0IsQ0FBQ0MsSUFBakIsS0FBMEJDLDZCQUFXQyxLOzs7OztpREFDaENILGdCOzs7QUFFSEksZ0JBQUFBLFUs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QVIsR0FDTlosSUFETSxDQUNELFVBQUFhLEVBQUUsRUFBSTtBQUNWLHNCQUFNQyxJQUFJLEdBQUdELEVBQUUsQ0FBQ0MsSUFBSCxFQUFiOztBQUNBLHNCQUFJLENBQUNBLElBQUwsRUFBVztBQUNULDJCQUFPLHFFQUE2Q2xCLE9BQTdDLEVBQVA7QUFDRCxtQkFKUyxDQU1WOzs7QUFDQSx5QkFBTyxxREFDRm1CLGlCQURFLEVBRUZELElBRkUsRUFBUDtBQUlELGlCQVpNLEVBYU5aLEtBYk0sQ0FhQSxVQUFDQyxHQUFEO0FBQUEseUJBQWdCLGlDQUFnQkEsR0FBRyxDQUFDQyxPQUFwQixDQUFoQjtBQUFBLGlCQWJBLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXNvdXJjZSB9IGZyb20gXCIuLi9tb2RlbC9SZXNvdXJjZVwiO1xuaW1wb3J0IHsgU29tZVJlc3VsdCwgUmVzdWx0VHlwZSwgbWFrZVN1Y2Nlc3MsIG1ha2VFcnJvciB9IGZyb20gXCIuLi91dGlscy9BcHBQcm92aWRlclR5cGVzXCI7XG5pbXBvcnQgeyBEaWN0VHlwZSB9IGZyb20gXCIuLi91dGlscy9EaWN0VHlwZVwiO1xuaW1wb3J0IHsgVXNlciwgRGVmYXVsdFVzZXIgfSBmcm9tIFwiLi4vbW9kZWwvVXNlclwiO1xuaW1wb3J0IFVzZXJTdGF0dXMgZnJvbSBcIi4uL2VudW1zL1VzZXJTdGF0dXNcIjtcbmltcG9ydCBVc2VyVHlwZSBmcm9tIFwiLi4vZW51bXMvVXNlclR5cGVcIjtcbmltcG9ydCAqIGFzIGFkbWluICBmcm9tIFwiZmlyZWJhc2UtYWRtaW5cIjtcbmltcG9ydCB7IERvY3VtZW50UmVmZXJlbmNlIH0gZnJvbSBcIkBnb29nbGUtY2xvdWQvZmlyZXN0b3JlXCI7XG5cbnR5cGUgRmlyZXN0b3JlID0gYWRtaW4uZmlyZXN0b3JlLkZpcmVzdG9yZTtcblxuZXhwb3J0IGNsYXNzIFVzZXJBcGkge1xuICBmaXJlc3RvcmU6IEZpcmVzdG9yZTtcbiAgb3JnSWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihmaXJlc3RvcmU6IEZpcmVzdG9yZSwgb3JnSWQ6IHN0cmluZykge1xuICAgIHRoaXMuZmlyZXN0b3JlID0gZmlyZXN0b3JlO1xuICAgIHRoaXMub3JnSWQgPSBvcmdJZDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZGRGYXZvdXJpdGVSZXNvdXJjZSh1c2VySWQ6IHN0cmluZywgcmVzb3VyY2U6IFJlc291cmNlKTogUHJvbWlzZTxTb21lUmVzdWx0PHZvaWQ+PiB7XG4gICAgY29uc3QgZmF2b3VyaXRlc1Jlc3VsdCA9IGF3YWl0IHRoaXMuZ2V0RmF2b3VyaXRlUmVzb3VyY2VzKHVzZXJJZCk7XG4gICAgaWYgKGZhdm91cml0ZXNSZXN1bHQudHlwZSA9PT0gUmVzdWx0VHlwZS5FUlJPUikge1xuICAgICAgcmV0dXJuIGZhdm91cml0ZXNSZXN1bHQ7XG4gICAgfVxuICAgIGNvbnN0IGZhdm91cml0ZXMgPSBmYXZvdXJpdGVzUmVzdWx0LnJlc3VsdDtcbiAgICBmYXZvdXJpdGVzW3Jlc291cmNlLmlkXSA9IHJlc291cmNlO1xuXG4gICAgcmV0dXJuIHRoaXMudXBkYXRlRmF2b3VyaXRlUmVzb3VyY2VzKHVzZXJJZCwgZmF2b3VyaXRlcyk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbGlzdCBvZiBmYXZvdXJpdGUgcmVzb3VyY2VzIHRvIHRoZSB1c2VyJ3MgZmF2b3VyaXRlc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIGFkZEZhdm91cml0ZVJlc291cmNlcyh1c2VySWQ6IHN0cmluZywgcmVzb3VyY2VzOiBSZXNvdXJjZVtdKTogUHJvbWlzZTxTb21lUmVzdWx0PHZvaWQ+PiB7XG4gICAgY29uc3QgZmF2b3VyaXRlc1Jlc3VsdCA9IGF3YWl0IHRoaXMuZ2V0RmF2b3VyaXRlUmVzb3VyY2VzKHVzZXJJZCk7XG4gICAgaWYgKGZhdm91cml0ZXNSZXN1bHQudHlwZSA9PT0gUmVzdWx0VHlwZS5FUlJPUikge1xuICAgICAgcmV0dXJuIGZhdm91cml0ZXNSZXN1bHQ7XG4gICAgfVxuICAgIGNvbnN0IGZhdm91cml0ZXMgPSBmYXZvdXJpdGVzUmVzdWx0LnJlc3VsdDtcbiAgICByZXNvdXJjZXMuZm9yRWFjaChyID0+IHtcbiAgICAgIGZhdm91cml0ZXNbci5pZF0gPSByO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMudXBkYXRlRmF2b3VyaXRlUmVzb3VyY2VzKHVzZXJJZCwgZmF2b3VyaXRlcyk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIG5ldyByZXNvdXJjZXMgdG8gdGhlIFVzZXIncyBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgbWFya0FzTmV3UmVzb3VyY2VzKHVzZXJJZDogc3RyaW5nLCByZXNvdXJjZUlkczogc3RyaW5nW10pOiBQcm9taXNlPFNvbWVSZXN1bHQ8dm9pZD4+IHtcbiAgICBjb25zdCBuZXdSZXNvdXJjZXNSZXN1bHQgPSBhd2FpdCB0aGlzLmdldE5ld1Jlc291cmNlcyh1c2VySWQpO1xuICAgIGlmIChuZXdSZXNvdXJjZXNSZXN1bHQudHlwZSA9PT0gUmVzdWx0VHlwZS5FUlJPUikge1xuICAgICAgcmV0dXJuIG5ld1Jlc291cmNlc1Jlc3VsdDtcbiAgICB9XG4gICAgY29uc3QgbmV3UmVzb3VyY2VzID0gbmV3UmVzb3VyY2VzUmVzdWx0LnJlc3VsdDtcbiAgICByZXNvdXJjZUlkcy5mb3JFYWNoKGlkID0+IG5ld1Jlc291cmNlc1tpZF0gPSBpZCk7XG5cbiAgICByZXR1cm4gdGhpcy51cGRhdGVOZXdSZXNvdXJjZXModXNlcklkLCBuZXdSZXNvdXJjZXMpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlbW92ZU5ld1Jlc291cmNlKHVzZXJJZDogc3RyaW5nLCByZXNvdXJjZUlkOiBzdHJpbmcpOiBQcm9taXNlPFNvbWVSZXN1bHQ8dm9pZD4+IHtcbiAgICBjb25zdCBuZXdSZXNvdXJjZXNSZXN1bHQgPSBhd2FpdCB0aGlzLmdldE5ld1Jlc291cmNlcyh1c2VySWQpO1xuICAgIGlmIChuZXdSZXNvdXJjZXNSZXN1bHQudHlwZSA9PT0gUmVzdWx0VHlwZS5FUlJPUikge1xuICAgICAgcmV0dXJuIG5ld1Jlc291cmNlc1Jlc3VsdDtcbiAgICB9XG4gICAgY29uc3QgbmV3UmVzb3VyY2VzID0gbmV3UmVzb3VyY2VzUmVzdWx0LnJlc3VsdDtcbiAgICBkZWxldGUgbmV3UmVzb3VyY2VzW3Jlc291cmNlSWRdO1xuXG4gICAgcmV0dXJuIHRoaXMudXBkYXRlTmV3UmVzb3VyY2VzKHVzZXJJZCwgbmV3UmVzb3VyY2VzKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXROZXdSZXNvdXJjZXModXNlcklkOiBzdHJpbmcpOiBQcm9taXNlPFNvbWVSZXN1bHQ8RGljdFR5cGU8c3RyaW5nPj4+IHtcbiAgICBjb25zdCB1c2VyUmVzdWx0ID0gYXdhaXQgdGhpcy5nZXRVc2VyKHRoaXMudXNlclJlZih0aGlzLm9yZ0lkLCB1c2VySWQpKTtcbiAgICBpZiAodXNlclJlc3VsdC50eXBlID09PSBSZXN1bHRUeXBlLkVSUk9SKSB7XG4gICAgICByZXR1cm4gdXNlclJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VyID0gdXNlclJlc3VsdC5yZXN1bHQ7XG4gICAgcmV0dXJuIG1ha2VTdWNjZXNzKHVzZXIubmV3UmVzb3VyY2VzKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgdXBkYXRlTmV3UmVzb3VyY2VzKHVzZXJJZDogc3RyaW5nLCBuZXdSZXNvdXJjZXM6IERpY3RUeXBlPHN0cmluZz4pOiBQcm9taXNlPFNvbWVSZXN1bHQ8dm9pZD4+IHtcbiAgICByZXR1cm4gdGhpcy51c2VyUmVmKHRoaXMub3JnSWQsIHVzZXJJZCkudXBkYXRlKHsgbmV3UmVzb3VyY2VzIH0pXG4gICAgICAudGhlbigoKSA9PiBtYWtlU3VjY2Vzcyh1bmRlZmluZWQpKVxuICAgICAgLmNhdGNoKChlcnI6IEVycm9yKSA9PiBtYWtlRXJyb3IoZXJyLm1lc3NhZ2UpKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlbW92ZUZhdm91cml0ZVJlc291cmNlKHVzZXJJZDogc3RyaW5nLCByZXNvdXJjZUlkOiBzdHJpbmcpOiBQcm9taXNlPFNvbWVSZXN1bHQ8dm9pZD4+IHtcbiAgICBjb25zdCBmYXZvdXJpdGVzUmVzdWx0ID0gYXdhaXQgdGhpcy5nZXRGYXZvdXJpdGVSZXNvdXJjZXModXNlcklkKTtcbiAgICBpZiAoZmF2b3VyaXRlc1Jlc3VsdC50eXBlID09PSBSZXN1bHRUeXBlLkVSUk9SKSB7XG4gICAgICByZXR1cm4gZmF2b3VyaXRlc1Jlc3VsdDtcbiAgICB9XG4gICAgY29uc3QgZmF2b3VyaXRlcyA9IGZhdm91cml0ZXNSZXN1bHQucmVzdWx0O1xuICAgIGRlbGV0ZSBmYXZvdXJpdGVzW3Jlc291cmNlSWRdO1xuXG4gICAgcmV0dXJuIHRoaXMudXBkYXRlRmF2b3VyaXRlUmVzb3VyY2VzKHVzZXJJZCwgZmF2b3VyaXRlcyk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHVwZGF0ZUZhdm91cml0ZVJlc291cmNlcyh1c2VySWQ6IHN0cmluZywgZmF2b3VyaXRlUmVzb3VyY2VzOiBEaWN0VHlwZTxSZXNvdXJjZT4pOiBQcm9taXNlPFNvbWVSZXN1bHQ8YW55Pj4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJSZWYodGhpcy5vcmdJZCwgdXNlcklkKS5zZXQoeyBmYXZvdXJpdGVSZXNvdXJjZXMgfSwgeyBtZXJnZTogdHJ1ZSB9KVxuICAgICAgLnRoZW4oKCkgPT4gbWFrZVN1Y2Nlc3ModW5kZWZpbmVkKSlcbiAgICAgIC5jYXRjaCgoZXJyOiBFcnJvcikgPT4gbWFrZUVycm9yKGVyci5tZXNzYWdlKSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRGYXZvdXJpdGVSZXNvdXJjZXModXNlcklkOiBzdHJpbmcpOiBQcm9taXNlPFNvbWVSZXN1bHQ8RGljdFR5cGU8UmVzb3VyY2U+Pj4ge1xuICAgIGNvbnN0IHVzZXJSZXN1bHQgPSBhd2FpdCB0aGlzLmdldFVzZXIodGhpcy51c2VyUmVmKHRoaXMub3JnSWQsIHVzZXJJZCkpO1xuICAgIGlmICh1c2VyUmVzdWx0LnR5cGUgPT09IFJlc3VsdFR5cGUuRVJST1IpIHtcbiAgICAgIHJldHVybiB1c2VyUmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXIgPSB1c2VyUmVzdWx0LnJlc3VsdDtcbiAgICByZXR1cm4gbWFrZVN1Y2Nlc3ModXNlci5mYXZvdXJpdGVSZXNvdXJjZXMpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFJlY2VudFJlc291cmNlcyh1c2VySWQ6IHN0cmluZyk6IFByb21pc2U8U29tZVJlc3VsdDxSZXNvdXJjZVtdPj4ge1xuICAgIGNvbnN0IHVzZXJSZXN1bHQgPSBhd2FpdCB0aGlzLmdldFVzZXIodGhpcy51c2VyUmVmKHRoaXMub3JnSWQsIHVzZXJJZCkpO1xuICAgIGlmICh1c2VyUmVzdWx0LnR5cGUgPT09IFJlc3VsdFR5cGUuRVJST1IpIHtcbiAgICAgIHJldHVybiB1c2VyUmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXIgPSB1c2VyUmVzdWx0LnJlc3VsdDtcbiAgICByZXR1cm4gbWFrZVN1Y2Nlc3ModXNlci5yZWNlbnRSZXNvdXJjZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZSB0aGUgdXNlcidzIHN0YXR1c1xuICAgKi9cbiAgcHVibGljIGFzeW5jIGNoYW5nZVVzZXJTdGF0dXModXNlcklkOiBzdHJpbmcsIHN0YXR1czogVXNlclN0YXR1cy5BcHByb3ZlZCB8IFVzZXJTdGF0dXMuUmVqZWN0ZWQpOiBQcm9taXNlPFNvbWVSZXN1bHQ8dm9pZD4+IHtcbiAgICByZXR1cm4gdGhpcy51c2VyUmVmKHRoaXMub3JnSWQsIHVzZXJJZCkuc2V0KHsgc3RhdHVzIH0sIHsgbWVyZ2U6IHRydWUgfSlcbiAgICAgIC50aGVuKCgpID0+IG1ha2VTdWNjZXNzKHVuZGVmaW5lZCkpXG4gICAgICAuY2F0Y2goKGVycjogRXJyb3IpID0+IG1ha2VFcnJvcihlcnIubWVzc2FnZSkpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY2hhbmdlVXNlclR5cGUodXNlcklkOiBzdHJpbmcsIHR5cGU6IFVzZXJUeXBlKTogUHJvbWlzZTxTb21lUmVzdWx0PHZvaWQ+PiB7XG4gICAgcmV0dXJuIHRoaXMudXNlclJlZih0aGlzLm9yZ0lkLCB1c2VySWQpLnNldCh7dHlwZX0sIHsgbWVyZ2U6IHRydWV9KVxuICAgIC50aGVuKCgpID0+IG1ha2VTdWNjZXNzKHVuZGVmaW5lZCkpXG4gIH1cblxuXG4gIC8vXG4gIC8vIEhlbHBlcnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgcHVibGljIHVzZXJSZWYob3JnSWQ6IHN0cmluZywgdXNlcklkOiBzdHJpbmcpOiBEb2N1bWVudFJlZmVyZW5jZSB7XG4gICAgcmV0dXJuIHRoaXMuZmlyZXN0b3JlLmNvbGxlY3Rpb24oJ29yZycpLmRvYyhvcmdJZCkuY29sbGVjdGlvbigndXNlcicpLmRvYyh1c2VySWQpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFVzZXIodXNlclJlZjogRG9jdW1lbnRSZWZlcmVuY2UpOiBQcm9taXNlPFNvbWVSZXN1bHQ8VXNlcj4+IHtcbiAgICByZXR1cm4gdXNlclJlZi5nZXQoKVxuICAgIC50aGVuKHNuID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBzbi5kYXRhKCk7XG4gICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG1ha2VFcnJvcjxVc2VyPihgTm8gZGF0YSBmb3VuZCBmb3IgdXNlclJlZjoke3VzZXJSZWZ9YCk7XG4gICAgICB9XG5cbiAgICAgIC8vU2V0IHRoZSBkZWZhdWx0IHVzZXIgZGF0YSBoZXJlLlxuICAgICAgcmV0dXJuIG1ha2VTdWNjZXNzKHtcbiAgICAgICAgLi4uRGVmYXVsdFVzZXIsXG4gICAgICAgIC4uLmRhdGFcbiAgICAgIH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnI6IEVycm9yKSA9PiBtYWtlRXJyb3I8VXNlcj4oZXJyLm1lc3NhZ2UpKVxuICB9XG5cbn0iXX0=