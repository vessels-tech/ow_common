"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResourceApi = void 0;

var _AppProviderTypes = require("../utils/AppProviderTypes");

var _model = require("../model");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ResourceApi =
/*#__PURE__*/
function () {
  function ResourceApi(firestore, orgId) {
    _classCallCheck(this, ResourceApi);

    _defineProperty(this, "firestore", void 0);

    _defineProperty(this, "orgId", void 0);

    this.firestore = firestore;
    this.orgId = orgId;
  }

  _createClass(ResourceApi, [{
    key: "getResourceForId",
    value: function () {
      var _getResourceForId = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(resourceId) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.getResource(this.resourceRef(resourceId)));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getResourceForId(_x) {
        return _getResourceForId.apply(this, arguments);
      }

      return getResourceForId;
    }()
  }, {
    key: "getResourcesForIds",
    value: function () {
      var _getResourcesForIds = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(resourceIds) {
        var _this = this;

        var results, errors, resources;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Promise.all(resourceIds.map(function (id) {
                  return _this.getResourceForId(id);
                }));

              case 2:
                results = _context2.sent;
                errors = [];
                resources = [];
                results.forEach(function (r) {
                  if (r.type === _AppProviderTypes.ResultType.ERROR) {
                    errors.push(r);
                    return;
                  }

                  resources.push(r.result);
                });

                if (!(errors.length > 0)) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", (0, _AppProviderTypes.makeError)("Error getting resources: ".concat(errors)));

              case 8:
                return _context2.abrupt("return", (0, _AppProviderTypes.makeSuccess)(resources));

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getResourcesForIds(_x2) {
        return _getResourcesForIds.apply(this, arguments);
      }

      return getResourcesForIds;
    }() //
    // Helpers
    // ------------------------------------

  }, {
    key: "resourceRef",
    value: function resourceRef(resourceId) {
      return this.firestore.collection('org').doc(this.orgId).collection('resource').doc(resourceId);
    }
  }, {
    key: "getResource",
    value: function () {
      var _getResource = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(resourceRef) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", resourceRef.get().then(function (sn) {
                  var data = sn.data();

                  if (!data) {
                    return (0, _AppProviderTypes.makeError)("No data found for resourceRef: ".concat(resourceRef));
                  }

                  return (0, _AppProviderTypes.makeSuccess)(_objectSpread({}, _model.DefaultResource, data));
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

      function getResource(_x3) {
        return _getResource.apply(this, arguments);
      }

      return getResource;
    }()
  }]);

  return ResourceApi;
}();

exports.ResourceApi = ResourceApi;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvUmVzb3VyY2VBcGkudHMiXSwibmFtZXMiOlsiUmVzb3VyY2VBcGkiLCJmaXJlc3RvcmUiLCJvcmdJZCIsInJlc291cmNlSWQiLCJnZXRSZXNvdXJjZSIsInJlc291cmNlUmVmIiwicmVzb3VyY2VJZHMiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwiaWQiLCJnZXRSZXNvdXJjZUZvcklkIiwicmVzdWx0cyIsImVycm9ycyIsInJlc291cmNlcyIsImZvckVhY2giLCJyIiwidHlwZSIsIlJlc3VsdFR5cGUiLCJFUlJPUiIsInB1c2giLCJyZXN1bHQiLCJsZW5ndGgiLCJjb2xsZWN0aW9uIiwiZG9jIiwiZ2V0IiwidGhlbiIsInNuIiwiZGF0YSIsIkRlZmF1bHRSZXNvdXJjZSIsImNhdGNoIiwiZXJyIiwibWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0lBS2FBLFc7OztBQUtYLHVCQUFZQyxTQUFaLEVBQWtDQyxLQUFsQyxFQUFpRDtBQUFBOztBQUFBOztBQUFBOztBQUMvQyxTQUFLRCxTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLFNBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNEOzs7Ozs7OytDQUU2QkMsVTs7Ozs7aURBQ3JCLEtBQUtDLFdBQUwsQ0FBaUIsS0FBS0MsV0FBTCxDQUFpQkYsVUFBakIsQ0FBakIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dEQUd1QkcsVzs7Ozs7Ozs7O3VCQUNQQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsV0FBVyxDQUFDRyxHQUFaLENBQWdCLFVBQUFDLEVBQUU7QUFBQSx5QkFBSSxLQUFJLENBQUNDLGdCQUFMLENBQXNCRCxFQUF0QixDQUFKO0FBQUEsaUJBQWxCLENBQVosQzs7O0FBQWpCRSxnQkFBQUEsTztBQUVBQyxnQkFBQUEsTSxHQUF3QixFO0FBQ3hCQyxnQkFBQUEsUyxHQUF3QixFO0FBQzlCRixnQkFBQUEsT0FBTyxDQUFDRyxPQUFSLENBQWdCLFVBQUFDLENBQUMsRUFBSTtBQUNuQixzQkFBSUEsQ0FBQyxDQUFDQyxJQUFGLEtBQVdDLDZCQUFXQyxLQUExQixFQUFpQztBQUMvQk4sb0JBQUFBLE1BQU0sQ0FBQ08sSUFBUCxDQUFZSixDQUFaO0FBQ0E7QUFDRDs7QUFFREYsa0JBQUFBLFNBQVMsQ0FBQ00sSUFBVixDQUFlSixDQUFDLENBQUNLLE1BQWpCO0FBQ0QsaUJBUEQ7O3NCQVNJUixNQUFNLENBQUNTLE1BQVAsR0FBZ0IsQzs7Ozs7a0RBQ1gsb0VBQXVEVCxNQUF2RCxFOzs7a0RBR0YsbUNBQTZCQyxTQUE3QixDOzs7Ozs7Ozs7Ozs7Ozs7UUFHVDtBQUNBO0FBQ0E7Ozs7Z0NBRW1CWCxVLEVBQXVDO0FBQ3hELGFBQU8sS0FBS0YsU0FBTCxDQUFlc0IsVUFBZixDQUEwQixLQUExQixFQUFpQ0MsR0FBakMsQ0FBcUMsS0FBS3RCLEtBQTFDLEVBQWlEcUIsVUFBakQsQ0FBNEQsVUFBNUQsRUFBd0VDLEdBQXhFLENBQTRFckIsVUFBNUUsQ0FBUDtBQUNEOzs7Ozs7Z0RBRXdCRSxXOzs7OztrREFDaEJBLFdBQVcsQ0FBQ29CLEdBQVosR0FDTkMsSUFETSxDQUNELFVBQUFDLEVBQUUsRUFBSTtBQUNWLHNCQUFNQyxJQUFJLEdBQUdELEVBQUUsQ0FBQ0MsSUFBSCxFQUFiOztBQUNBLHNCQUFJLENBQUNBLElBQUwsRUFBVztBQUNULDJCQUFPLDBFQUFzRHZCLFdBQXRELEVBQVA7QUFDRDs7QUFFRCx5QkFBTyxxREFDRndCLHNCQURFLEVBRUZELElBRkUsRUFBUDtBQUlELGlCQVhNLEVBWU5FLEtBWk0sQ0FZQSxVQUFDQyxHQUFEO0FBQUEseUJBQWdCLGlDQUFvQkEsR0FBRyxDQUFDQyxPQUF4QixDQUFoQjtBQUFBLGlCQVpBLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb21lUmVzdWx0LCBtYWtlRXJyb3IsIG1ha2VTdWNjZXNzLCBSZXN1bHRUeXBlLCBFcnJvclJlc3VsdCB9IGZyb20gXCIuLi91dGlscy9BcHBQcm92aWRlclR5cGVzXCI7XG5pbXBvcnQgKiBhcyBhZG1pbiBmcm9tIFwiZmlyZWJhc2UtYWRtaW5cIjtcbmltcG9ydCB7IFJlc291cmNlLCBEZWZhdWx0UmVzb3VyY2UgfSBmcm9tIFwiLi4vbW9kZWxcIjtcbmltcG9ydCB7IERvY3VtZW50UmVmZXJlbmNlIH0gZnJvbSBcIkBnb29nbGUtY2xvdWQvZmlyZXN0b3JlXCI7XG5cbnR5cGUgRmlyZXN0b3JlID0gYWRtaW4uZmlyZXN0b3JlLkZpcmVzdG9yZTtcblxuZXhwb3J0IGNsYXNzIFJlc291cmNlQXBpIHtcbiAgcHJpdmF0ZSBmaXJlc3RvcmU6IEZpcmVzdG9yZTtcbiAgcHJpdmF0ZSBvcmdJZDogc3RyaW5nO1xuXG5cbiAgY29uc3RydWN0b3IoZmlyZXN0b3JlOiBGaXJlc3RvcmUsIG9yZ0lkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmZpcmVzdG9yZSA9IGZpcmVzdG9yZTtcbiAgICB0aGlzLm9yZ0lkID0gb3JnSWQ7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0UmVzb3VyY2VGb3JJZChyZXNvdXJjZUlkOiBzdHJpbmcpOiBQcm9taXNlPFNvbWVSZXN1bHQ8UmVzb3VyY2U+PntcbiAgICByZXR1cm4gdGhpcy5nZXRSZXNvdXJjZSh0aGlzLnJlc291cmNlUmVmKHJlc291cmNlSWQpKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRSZXNvdXJjZXNGb3JJZHMocmVzb3VyY2VJZHM6IHN0cmluZ1tdKTogUHJvbWlzZTxTb21lUmVzdWx0PEFycmF5PFJlc291cmNlPj4+IHtcbiAgICBjb25zdCByZXN1bHRzID0gIGF3YWl0IFByb21pc2UuYWxsKHJlc291cmNlSWRzLm1hcChpZCA9PiB0aGlzLmdldFJlc291cmNlRm9ySWQoaWQpKSk7XG5cbiAgICBjb25zdCBlcnJvcnM6IEVycm9yUmVzdWx0W10gPSBbXTtcbiAgICBjb25zdCByZXNvdXJjZXM6IFJlc291cmNlW10gPSBbXTtcbiAgICByZXN1bHRzLmZvckVhY2gociA9PiB7XG4gICAgICBpZiAoci50eXBlID09PSBSZXN1bHRUeXBlLkVSUk9SKSB7XG4gICAgICAgIGVycm9ycy5wdXNoKHIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlc291cmNlcy5wdXNoKHIucmVzdWx0KTtcbiAgICB9KTtcblxuICAgIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIG1ha2VFcnJvcjxBcnJheTxSZXNvdXJjZT4+KGBFcnJvciBnZXR0aW5nIHJlc291cmNlczogJHtlcnJvcnN9YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1ha2VTdWNjZXNzPEFycmF5PFJlc291cmNlPj4ocmVzb3VyY2VzKTtcbiAgfVxuXG4gIC8vXG4gIC8vIEhlbHBlcnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIFxuICBwdWJsaWMgcmVzb3VyY2VSZWYocmVzb3VyY2VJZDogc3RyaW5nKTogRG9jdW1lbnRSZWZlcmVuY2Uge1xuICAgIHJldHVybiB0aGlzLmZpcmVzdG9yZS5jb2xsZWN0aW9uKCdvcmcnKS5kb2ModGhpcy5vcmdJZCkuY29sbGVjdGlvbigncmVzb3VyY2UnKS5kb2MocmVzb3VyY2VJZCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0UmVzb3VyY2UocmVzb3VyY2VSZWY6IERvY3VtZW50UmVmZXJlbmNlKTogUHJvbWlzZTxTb21lUmVzdWx0PFJlc291cmNlPj4ge1xuICAgIHJldHVybiByZXNvdXJjZVJlZi5nZXQoKVxuICAgIC50aGVuKHNuID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBzbi5kYXRhKCk7XG4gICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG1ha2VFcnJvcjxSZXNvdXJjZT4oYE5vIGRhdGEgZm91bmQgZm9yIHJlc291cmNlUmVmOiAke3Jlc291cmNlUmVmfWApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWFrZVN1Y2Nlc3Moe1xuICAgICAgICAuLi5EZWZhdWx0UmVzb3VyY2UsXG4gICAgICAgIC4uLmRhdGEsXG4gICAgICB9KTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyOiBFcnJvcikgPT4gbWFrZUVycm9yPFJlc291cmNlPihlcnIubWVzc2FnZSkpXG4gIH1cblxuXG5cblxuXG5cbn0iXX0=