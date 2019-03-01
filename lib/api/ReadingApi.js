"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReadingApi = void 0;

var _model = require("../model");

var _utils = require("../utils");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ReadingApi =
/*#__PURE__*/
function () {
  function ReadingApi(firestore, orgId) {
    _classCallCheck(this, ReadingApi);

    _defineProperty(this, "firestore", void 0);

    _defineProperty(this, "orgId", void 0);

    this.firestore = firestore;
    this.orgId = orgId;
  }
  /**
   * getReadingsForResources
   * 
   * Given a list of resourceIds, get all of the readings for the resources up to 
   * a limit of n (params.limit). Implementing this limit will be tricky as Firestore
   * doesn't currently support OR queries, meaning that we will have to merge and keep
   * track of of cursors for each id.
   * 
   * For now gets the latest n readings for the given resources, but if needed we 
   * may add the ability to filter by date. Also ignores the lastVisible, as we 
   * can't really implement paginiation across multiple queries very easily atm.
   * 
   * This also wont respect date ordering from one resource to another, as the individual 
   * date queries are merged together.
   * 
   * @param resourceIds 
   * @param params 
   */


  _createClass(ReadingApi, [{
    key: "getReadingsForResources",
    value: function () {
      var _getReadingsForResources = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(resourceIds, params) {
        var _this = this;

        var readingsResults, readings, errors, message;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                //Hard rules because of firebase restrictions
                delete params.lastVisible;
                params.limit = 100;
                _context.next = 4;
                return Promise.all(resourceIds.map(function (id) {
                  return _this.getReadingsForResourceId(id, params);
                }));

              case 4:
                readingsResults = _context.sent;
                readings = [];
                errors = [];
                readingsResults.forEach(function (result) {
                  if (result.type === _utils.ResultType.ERROR) {
                    errors.push(result);
                    return;
                  }

                  readings = readings.concat(result.result.readings);
                });

                if (!(errors.length > 0)) {
                  _context.next = 11;
                  break;
                }

                message = errors.reduce(function (acc, curr) {
                  return acc + " " + curr.message;
                }, "Multiple Errors:");
                return _context.abrupt("return", (0, _utils.makeError)(message));

              case 11:
                return _context.abrupt("return", (0, _utils.makeSuccess)({
                  params: params,
                  readings: readings
                }));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getReadingsForResources(_x, _x2) {
        return _getReadingsForResources.apply(this, arguments);
      }

      return getReadingsForResources;
    }()
    /**
     * getReadingsForResourceId
     *
     * Given a resourceId, get all of the readings for the resources up to
     * a limit of n (params.limit)
     * 
     * For now gets the latest n readings for the given resources, but if needed we
     * may add the ability to filter by date
     *
     * @param resourceId
     * @param params
     */

  }, {
    key: "getReadingsForResourceId",
    value: function () {
      var _getReadingsForResourceId = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(resourceId, params) {
        var query, lastVisible;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = this.readingCol().where("resourceId", '==', resourceId) //I think these results will be ordered, since the readingIds are ordered inherently, but here:
                .orderBy('datetime', 'desc');

                if (params.lastVisible) {
                  query = query.startAfter(params.lastVisible);
                }

                query = query.limit((0, _utils.safeLower)(params.limit, 100)); //Run the query

                _context2.next = 5;
                return query.get().then(function (sn) {
                  var readingResults = [];
                  lastVisible = sn.docs[sn.docs.length - 1];
                  sn.forEach(function (doc) {
                    var data = doc.data();

                    if (!data) {
                      return;
                    }

                    var reading = _objectSpread({}, _model.DefaultReading, data);

                    readingResults.push(reading);
                  });
                  return readingResults;
                }).then(function (readings) {
                  var readingResult = {
                    params: _objectSpread({}, params, {
                      lastVisible: lastVisible
                    }),
                    readings: readings
                  };
                  return (0, _utils.makeSuccess)(readingResult);
                }).catch(function (err) {
                  return (0, _utils.makeError)(err.message);
                });

              case 5:
                return _context2.abrupt("return", _context2.sent);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getReadingsForResourceId(_x3, _x4) {
        return _getReadingsForResourceId.apply(this, arguments);
      }

      return getReadingsForResourceId;
    }()
  }, {
    key: "readingCol",
    value: function readingCol() {
      return this.firestore.collection('org').doc(this.orgId).collection('reading');
    }
  }]);

  return ReadingApi;
}();

exports.ReadingApi = ReadingApi;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvUmVhZGluZ0FwaS50cyJdLCJuYW1lcyI6WyJSZWFkaW5nQXBpIiwiZmlyZXN0b3JlIiwib3JnSWQiLCJyZXNvdXJjZUlkcyIsInBhcmFtcyIsImxhc3RWaXNpYmxlIiwibGltaXQiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwiaWQiLCJnZXRSZWFkaW5nc0ZvclJlc291cmNlSWQiLCJyZWFkaW5nc1Jlc3VsdHMiLCJyZWFkaW5ncyIsImVycm9ycyIsImZvckVhY2giLCJyZXN1bHQiLCJ0eXBlIiwiUmVzdWx0VHlwZSIsIkVSUk9SIiwicHVzaCIsImNvbmNhdCIsImxlbmd0aCIsIm1lc3NhZ2UiLCJyZWR1Y2UiLCJhY2MiLCJjdXJyIiwicmVzb3VyY2VJZCIsInF1ZXJ5IiwicmVhZGluZ0NvbCIsIndoZXJlIiwib3JkZXJCeSIsInN0YXJ0QWZ0ZXIiLCJnZXQiLCJ0aGVuIiwic24iLCJyZWFkaW5nUmVzdWx0cyIsImRvY3MiLCJkb2MiLCJkYXRhIiwicmVhZGluZyIsIkRlZmF1bHRSZWFkaW5nIiwicmVhZGluZ1Jlc3VsdCIsImNhdGNoIiwiZXJyIiwiY29sbGVjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0lBZWFBLFU7OztBQUtYLHNCQUFZQyxTQUFaLEVBQWtDQyxLQUFsQyxFQUFpRDtBQUFBOztBQUFBOztBQUFBOztBQUMvQyxTQUFLRCxTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLFNBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNEO0FBR0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7K0NBa0I4QkMsVyxFQUF1QkMsTTs7Ozs7Ozs7QUFFbkQ7QUFDQSx1QkFBT0EsTUFBTSxDQUFDQyxXQUFkO0FBQ0FELGdCQUFBQSxNQUFNLENBQUNFLEtBQVAsR0FBZSxHQUFmOzt1QkFFOEJDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZTCxXQUFXLENBQUNNLEdBQVosQ0FBZ0IsVUFBQUMsRUFBRTtBQUFBLHlC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aUJBaENNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQ0FvQzBCO0FBQ3ZDLGFBQU8sS0FBS3RCLFNBQUwsQ0FBZTRDLFVBQWYsQ0FBMEIsS0FBMUIsRUFBaUNQLEdBQWpDLENBQXFDLEtBQUtwQyxLQUExQyxFQUFpRDJDLFVBQWpELENBQTRELFNBQTVELENBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IFNvbWVSZXN1bHQsIG1ha2VFcnJvciwgbWFrZVN1Y2Nlc3MsIFJlc3VsdFR5cGUsIEVycm9yUmVzdWx0IH0gZnJvbSBcIi4uL3V0aWxzL0FwcFByb3ZpZGVyVHlwZXNcIjtcbmltcG9ydCAqIGFzIGFkbWluIGZyb20gXCJmaXJlYmFzZS1hZG1pblwiO1xuaW1wb3J0IHsgRG9jdW1lbnRTbmFwc2hvdCwgQ29sbGVjdGlvblJlZmVyZW5jZSwgUXVlcnlEb2N1bWVudFNuYXBzaG90LCBRdWVyeVNuYXBzaG90IH0gZnJvbSBcIkBnb29nbGUtY2xvdWQvZmlyZXN0b3JlXCI7XG5pbXBvcnQgeyBSZWFkaW5nLCBEZWZhdWx0UmVhZGluZyB9IGZyb20gXCIuLi9tb2RlbFwiO1xuaW1wb3J0IHsgU29tZVJlc3VsdCwgc2FmZUxvd2VyLCBtYWtlU3VjY2VzcywgbWFrZUVycm9yLCBFcnJvclJlc3VsdCwgUmVzdWx0VHlwZSB9IGZyb20gXCIuLi91dGlsc1wiO1xuXG50eXBlIEZpcmVzdG9yZSA9IGFkbWluLmZpcmVzdG9yZS5GaXJlc3RvcmU7XG5cblxuZXhwb3J0IHR5cGUgUmVhZGluZ1BhZ2VQYXJhbXMgPSB7XG4gIGxhc3RWaXNpYmxlPzogRG9jdW1lbnRTbmFwc2hvdCxcbiAgbGltaXQ6IG51bWJlcixcbn1cblxuZXhwb3J0IHR5cGUgUmVhZGluZ1Jlc3VsdCA9IHtcbiAgcmVhZGluZ3M6IFJlYWRpbmdbXSxcbiAgcGFyYW1zOiBSZWFkaW5nUGFnZVBhcmFtc1xufVxuXG5leHBvcnQgY2xhc3MgUmVhZGluZ0FwaSB7XG4gIHByaXZhdGUgZmlyZXN0b3JlOiBGaXJlc3RvcmU7XG4gIHByaXZhdGUgb3JnSWQ6IHN0cmluZztcblxuXG4gIGNvbnN0cnVjdG9yKGZpcmVzdG9yZTogRmlyZXN0b3JlLCBvcmdJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5maXJlc3RvcmUgPSBmaXJlc3RvcmU7XG4gICAgdGhpcy5vcmdJZCA9IG9yZ0lkO1xuICB9XG5cblxuICAvKipcbiAgICogZ2V0UmVhZGluZ3NGb3JSZXNvdXJjZXNcbiAgICogXG4gICAqIEdpdmVuIGEgbGlzdCBvZiByZXNvdXJjZUlkcywgZ2V0IGFsbCBvZiB0aGUgcmVhZGluZ3MgZm9yIHRoZSByZXNvdXJjZXMgdXAgdG8gXG4gICAqIGEgbGltaXQgb2YgbiAocGFyYW1zLmxpbWl0KS4gSW1wbGVtZW50aW5nIHRoaXMgbGltaXQgd2lsbCBiZSB0cmlja3kgYXMgRmlyZXN0b3JlXG4gICAqIGRvZXNuJ3QgY3VycmVudGx5IHN1cHBvcnQgT1IgcXVlcmllcywgbWVhbmluZyB0aGF0IHdlIHdpbGwgaGF2ZSB0byBtZXJnZSBhbmQga2VlcFxuICAgKiB0cmFjayBvZiBvZiBjdXJzb3JzIGZvciBlYWNoIGlkLlxuICAgKiBcbiAgICogRm9yIG5vdyBnZXRzIHRoZSBsYXRlc3QgbiByZWFkaW5ncyBmb3IgdGhlIGdpdmVuIHJlc291cmNlcywgYnV0IGlmIG5lZWRlZCB3ZSBcbiAgICogbWF5IGFkZCB0aGUgYWJpbGl0eSB0byBmaWx0ZXIgYnkgZGF0ZS4gQWxzbyBpZ25vcmVzIHRoZSBsYXN0VmlzaWJsZSwgYXMgd2UgXG4gICAqIGNhbid0IHJlYWxseSBpbXBsZW1lbnQgcGFnaW5pYXRpb24gYWNyb3NzIG11bHRpcGxlIHF1ZXJpZXMgdmVyeSBlYXNpbHkgYXRtLlxuICAgKiBcbiAgICogVGhpcyBhbHNvIHdvbnQgcmVzcGVjdCBkYXRlIG9yZGVyaW5nIGZyb20gb25lIHJlc291cmNlIHRvIGFub3RoZXIsIGFzIHRoZSBpbmRpdmlkdWFsIFxuICAgKiBkYXRlIHF1ZXJpZXMgYXJlIG1lcmdlZCB0b2dldGhlci5cbiAgICogXG4gICAqIEBwYXJhbSByZXNvdXJjZUlkcyBcbiAgICogQHBhcmFtIHBhcmFtcyBcbiAgICovXG4gIGFzeW5jIGdldFJlYWRpbmdzRm9yUmVzb3VyY2VzKHJlc291cmNlSWRzOiBzdHJpbmdbXSwgcGFyYW1zOiBSZWFkaW5nUGFnZVBhcmFtcyk6IFByb21pc2U8U29tZVJlc3VsdDxSZWFkaW5nUmVzdWx0Pj4ge1xuXG4gICAgLy9IYXJkIHJ1bGVzIGJlY2F1c2Ugb2YgZmlyZWJhc2UgcmVzdHJpY3Rpb25zXG4gICAgZGVsZXRlIHBhcmFtcy5sYXN0VmlzaWJsZTtcbiAgICBwYXJhbXMubGltaXQgPSAxMDA7XG5cbiAgICBjb25zdCByZWFkaW5nc1Jlc3VsdHMgPSBhd2FpdCBQcm9taXNlLmFsbChyZXNvdXJjZUlkcy5tYXAoaWQgPT4gdGhpcy5nZXRSZWFkaW5nc0ZvclJlc291cmNlSWQoaWQsIHBhcmFtcykpKTtcbiAgICBsZXQgcmVhZGluZ3M6IFJlYWRpbmdbXSA9IFtdO1xuICAgIGNvbnN0IGVycm9yczogRXJyb3JSZXN1bHRbXSA9IFtdO1xuICAgIHJlYWRpbmdzUmVzdWx0cy5mb3JFYWNoKHJlc3VsdCA9PiB7XG4gICAgICBpZiAocmVzdWx0LnR5cGUgPT09IFJlc3VsdFR5cGUuRVJST1IpIHtcbiAgICAgICAgZXJyb3JzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWFkaW5ncyA9IHJlYWRpbmdzLmNvbmNhdChyZXN1bHQucmVzdWx0LnJlYWRpbmdzKTtcbiAgICB9KTtcblxuICAgIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9ycy5yZWR1Y2UoKGFjYywgY3VycikgPT4gYWNjICsgXCIgXCIgKyBjdXJyLm1lc3NhZ2UsIFwiTXVsdGlwbGUgRXJyb3JzOlwiKTtcbiAgICAgIHJldHVybiBtYWtlRXJyb3IobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1ha2VTdWNjZXNzKHtcbiAgICAgIHBhcmFtcyxcbiAgICAgIHJlYWRpbmdzLFxuICAgIH0pO1xuICB9XG5cblxuICAvKipcbiAgICogZ2V0UmVhZGluZ3NGb3JSZXNvdXJjZUlkXG4gICAqXG4gICAqIEdpdmVuIGEgcmVzb3VyY2VJZCwgZ2V0IGFsbCBvZiB0aGUgcmVhZGluZ3MgZm9yIHRoZSByZXNvdXJjZXMgdXAgdG9cbiAgICogYSBsaW1pdCBvZiBuIChwYXJhbXMubGltaXQpXG4gICAqIFxuICAgKiBGb3Igbm93IGdldHMgdGhlIGxhdGVzdCBuIHJlYWRpbmdzIGZvciB0aGUgZ2l2ZW4gcmVzb3VyY2VzLCBidXQgaWYgbmVlZGVkIHdlXG4gICAqIG1heSBhZGQgdGhlIGFiaWxpdHkgdG8gZmlsdGVyIGJ5IGRhdGVcbiAgICpcbiAgICogQHBhcmFtIHJlc291cmNlSWRcbiAgICogQHBhcmFtIHBhcmFtc1xuICAgKi9cbiAgYXN5bmMgZ2V0UmVhZGluZ3NGb3JSZXNvdXJjZUlkKHJlc291cmNlSWQ6IHN0cmluZywgcGFyYW1zOiBSZWFkaW5nUGFnZVBhcmFtcyk6IFByb21pc2U8U29tZVJlc3VsdDxSZWFkaW5nUmVzdWx0Pj4ge1xuXG4gICAgbGV0IHF1ZXJ5OiBhbnkgPSB0aGlzLnJlYWRpbmdDb2woKVxuICAgIC53aGVyZShgcmVzb3VyY2VJZGAsICc9PScsIHJlc291cmNlSWQpXG5cbiAgICAvL0kgdGhpbmsgdGhlc2UgcmVzdWx0cyB3aWxsIGJlIG9yZGVyZWQsIHNpbmNlIHRoZSByZWFkaW5nSWRzIGFyZSBvcmRlcmVkIGluaGVyZW50bHksIGJ1dCBoZXJlOlxuICAgIC5vcmRlckJ5KCdkYXRldGltZScsICdkZXNjJyk7XG5cbiAgICBpZiAocGFyYW1zLmxhc3RWaXNpYmxlKSB7XG4gICAgICBxdWVyeSA9IHF1ZXJ5LnN0YXJ0QWZ0ZXIocGFyYW1zLmxhc3RWaXNpYmxlKTtcbiAgICB9XG4gICAgcXVlcnkgPSBxdWVyeS5saW1pdChzYWZlTG93ZXIocGFyYW1zLmxpbWl0LCAxMDApKTtcblxuICAgIC8vUnVuIHRoZSBxdWVyeVxuICAgIGxldCBsYXN0VmlzaWJsZTogUXVlcnlEb2N1bWVudFNuYXBzaG90O1xuICAgIHJldHVybiBhd2FpdCBxdWVyeS5nZXQoKVxuICAgIC50aGVuKChzbjogUXVlcnlTbmFwc2hvdCkgPT4ge1xuICAgICAgY29uc3QgcmVhZGluZ1Jlc3VsdHM6IFJlYWRpbmdbXSA9IFtdO1xuICAgICAgbGFzdFZpc2libGUgPSBzbi5kb2NzW3NuLmRvY3MubGVuZ3RoIC0gMV07XG5cbiAgICAgIHNuLmZvckVhY2goZG9jID0+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGRvYy5kYXRhKCk7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgcmVhZGluZzogUmVhZGluZyA9IHtcbiAgICAgICAgICAuLi5EZWZhdWx0UmVhZGluZyxcbiAgICAgICAgICAuLi5kYXRhLFxuICAgICAgICAgIC8vVE9ETzogZGVzZXJpYWxpemUgaGVyZS5cbiAgICAgICAgfTtcbiAgICAgICAgcmVhZGluZ1Jlc3VsdHMucHVzaChyZWFkaW5nKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmVhZGluZ1Jlc3VsdHM7XG4gICAgfSlcbiAgICAudGhlbigocmVhZGluZ3M6IFJlYWRpbmdbXSkgPT4ge1xuICAgICAgY29uc3QgcmVhZGluZ1Jlc3VsdDogUmVhZGluZ1Jlc3VsdCA9IHtcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgICAgIGxhc3RWaXNpYmxlLFxuICAgICAgICB9LFxuICAgICAgICByZWFkaW5ncyxcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBtYWtlU3VjY2VzcyhyZWFkaW5nUmVzdWx0KTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyOiBFcnJvcikgPT4gbWFrZUVycm9yKGVyci5tZXNzYWdlKSk7XG4gIH1cblxuXG4gIHB1YmxpYyByZWFkaW5nQ29sKCk6IENvbGxlY3Rpb25SZWZlcmVuY2Uge1xuICAgIHJldHVybiB0aGlzLmZpcmVzdG9yZS5jb2xsZWN0aW9uKCdvcmcnKS5kb2ModGhpcy5vcmdJZCkuY29sbGVjdGlvbigncmVhZGluZycpO1xuICB9XG5cbn0iXX0=