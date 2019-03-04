"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReadingApi = void 0;

var _model = require("../model");

var _utils = require("../utils");

var _btoa = _interopRequireDefault(require("btoa"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    /**
     * bulkSaveReadings
     * 
     * Save readings in bulk
     */

  }, {
    key: "bulkUploadReadings",
    value: function () {
      var _bulkUploadReadings = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(readings, batchSize) {
        var _this2 = this;

        var readingBatches, writeResults, batchSaveResult;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                readingBatches = (0, _utils.chunkArray)(readings, batchSize);
                writeResults = [];
                _context4.next = 4;
                return readingBatches.reduce(
                /*#__PURE__*/
                function () {
                  var _ref = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee3(acc, curr, idx) {
                    var lastResult, batch;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return acc;

                          case 2:
                            lastResult = _context3.sent;

                            if (!(lastResult.type === _utils.ResultType.ERROR)) {
                              _context3.next = 5;
                              break;
                            }

                            return _context3.abrupt("return", Promise.resolve(lastResult));

                          case 5:
                            batch = _this2.firestore.batch();
                            curr.forEach(function (reading) {
                              var id = ReadingApi.hashReadingId(reading.resourceId, reading.timeseriesId, new Date(reading.datetime));

                              var ref = _this2.readingCol().doc(id);

                              batch.set(ref, _objectSpread({}, _model.DefaultReading, reading));
                            });
                            _context3.next = 9;
                            return ReadingApi.commitBatch(batch).then(function (result) {
                              if (result.type === _utils.ResultType.SUCCESS) {
                                writeResults = writeResults.concat(result.result);
                              }

                              return result;
                            });

                          case 9:
                            return _context3.abrupt("return", _context3.sent);

                          case 10:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3, this);
                  }));

                  return function (_x7, _x8, _x9) {
                    return _ref.apply(this, arguments);
                  };
                }(), Promise.resolve((0, _utils.makeSuccess)(undefined)));

              case 4:
                batchSaveResult = _context4.sent;

                if (!(batchSaveResult.type === _utils.ResultType.ERROR)) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", batchSaveResult);

              case 7:
                return _context4.abrupt("return", (0, _utils.makeSuccess)(writeResults));

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function bulkUploadReadings(_x5, _x6) {
        return _bulkUploadReadings.apply(this, arguments);
      }

      return bulkUploadReadings;
    }()
  }, {
    key: "readingCol",
    value: function readingCol() {
      return this.firestore.collection('org').doc(this.orgId).collection('reading');
    }
    /**
     * The Id for a reading is generated as a hash of the
     * reading's dateTime + ResourceId + timeseriesId.
     * 
     * For now, we can just encode it as a base64 string
     */

  }], [{
    key: "hashReadingId",
    value: function hashReadingId(resourceId, timeseriesId, dateTime) {
      var input = "".concat(resourceId, "_").concat(timeseriesId, "_").concat(dateTime.valueOf());
      return (0, _btoa.default)(input);
    }
  }, {
    key: "commitBatch",
    value: function commitBatch(batch) {
      return batch.commit().then(function (res) {
        return (0, _utils.makeSuccess)(res);
      }).catch(function (err) {
        return (0, _utils.makeError)(err.message);
      });
    }
  }]);

  return ReadingApi;
}();

exports.ReadingApi = ReadingApi;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvUmVhZGluZ0FwaS50cyJdLCJuYW1lcyI6WyJSZWFkaW5nQXBpIiwiZmlyZXN0b3JlIiwib3JnSWQiLCJyZXNvdXJjZUlkcyIsInBhcmFtcyIsImxhc3RWaXNpYmxlIiwibGltaXQiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwiaWQiLCJnZXRSZWFkaW5nc0ZvclJlc291cmNlSWQiLCJyZWFkaW5nc1Jlc3VsdHMiLCJyZWFkaW5ncyIsImVycm9ycyIsImZvckVhY2giLCJyZXN1bHQiLCJ0eXBlIiwiUmVzdWx0VHlwZSIsIkVSUk9SIiwicHVzaCIsImNvbmNhdCIsImxlbmd0aCIsIm1lc3NhZ2UiLCJyZWR1Y2UiLCJhY2MiLCJjdXJyIiwicmVzb3VyY2VJZCIsInF1ZXJ5IiwicmVhZGluZ0NvbCIsIndoZXJlIiwib3JkZXJCeSIsInN0YXJ0QWZ0ZXIiLCJnZXQiLCJ0aGVuIiwic24iLCJyZWFkaW5nUmVzdWx0cyIsImRvY3MiLCJkb2MiLCJkYXRhIiwicmVhZGluZyIsIkRlZmF1bHRSZWFkaW5nIiwicmVhZGluZ1Jlc3VsdCIsImNhdGNoIiwiZXJyIiwiYmF0Y2hTaXplIiwicmVhZGluZ0JhdGNoZXMiLCJ3cml0ZVJlc3VsdHMiLCJpZHgiLCJsYXN0UmVzdWx0IiwicmVzb2x2ZSIsImJhdGNoIiwiaGFzaFJlYWRpbmdJZCIsInRpbWVzZXJpZXNJZCIsIkRhdGUiLCJkYXRldGltZSIsInJlZiIsInNldCIsImNvbW1pdEJhdGNoIiwiU1VDQ0VTUyIsInVuZGVmaW5lZCIsImJhdGNoU2F2ZVJlc3VsdCIsImNvbGxlY3Rpb24iLCJkYXRlVGltZSIsImlucHV0IiwidmFsdWVPZiIsImNvbW1pdCIsInJlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlYUEsVTs7O0FBS1gsc0JBQVlDLFNBQVosRUFBa0NDLEtBQWxDLEVBQWlEO0FBQUE7O0FBQUE7O0FBQUE7O0FBQy9DLFNBQUtELFNB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MEIsWUFBcEIsY0FBb0NVLFFBQVEsQ0FBQ0UsT0FBVCxFQUFwQyxDQUFYO0FBQ0EsYUFBTyxtQkFBS0QsS0FBTCxDQUFQO0FBQ0Q7OztnQ0FFeUJiLEssRUFBZ0c7QUFDeEgsYUFBT0EsS0FBSyxDQUFDZSxNQUFOLEdBQ05oQyxJQURNLENBQ0QsVUFBQWlDLEdBQUc7QUFBQSxlQUFJLHdCQUFZQSxHQUFaLENBQUo7QUFBQSxPQURGLEVBRU54QixLQUZNLENBRUEsVUFBQ0MsR0FBRDtBQUFBLGVBQWdCLHNCQUFnREEsR0FBRyxDQUFDckIsT0FBcEQsQ0FBaEI7QUFBQSxPQUZBLENBQVA7QUFHRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IFNvbWVSZXN1bHQsIG1ha2VFcnJvciwgbWFrZVN1Y2Nlc3MsIFJlc3VsdFR5cGUsIEVycm9yUmVzdWx0IH0gZnJvbSBcIi4uL3V0aWxzL0FwcFByb3ZpZGVyVHlwZXNcIjtcbmltcG9ydCAqIGFzIGFkbWluIGZyb20gXCJmaXJlYmFzZS1hZG1pblwiO1xuaW1wb3J0IHsgRG9jdW1lbnRTbmFwc2hvdCwgQ29sbGVjdGlvblJlZmVyZW5jZSwgUXVlcnlEb2N1bWVudFNuYXBzaG90LCBRdWVyeVNuYXBzaG90IH0gZnJvbSBcIkBnb29nbGUtY2xvdWQvZmlyZXN0b3JlXCI7XG5pbXBvcnQgeyBSZWFkaW5nLCBEZWZhdWx0UmVhZGluZyB9IGZyb20gXCIuLi9tb2RlbFwiO1xuaW1wb3J0IHsgU29tZVJlc3VsdCwgc2FmZUxvd2VyLCBtYWtlU3VjY2VzcywgbWFrZUVycm9yLCBFcnJvclJlc3VsdCwgUmVzdWx0VHlwZSwgY2h1bmtBcnJheSB9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IGJ0b2EgZnJvbSAnYnRvYSc7XG5cbnR5cGUgRmlyZXN0b3JlID0gYWRtaW4uZmlyZXN0b3JlLkZpcmVzdG9yZTtcblxuXG5leHBvcnQgdHlwZSBSZWFkaW5nUGFnZVBhcmFtcyA9IHtcbiAgbGFzdFZpc2libGU/OiBEb2N1bWVudFNuYXBzaG90LFxuICBsaW1pdDogbnVtYmVyLFxufVxuXG5leHBvcnQgdHlwZSBSZWFkaW5nUmVzdWx0ID0ge1xuICByZWFkaW5nczogUmVhZGluZ1tdLFxuICBwYXJhbXM6IFJlYWRpbmdQYWdlUGFyYW1zXG59XG5cbmV4cG9ydCBjbGFzcyBSZWFkaW5nQXBpIHtcbiAgcHJpdmF0ZSBmaXJlc3RvcmU6IEZpcmVzdG9yZTtcbiAgcHJpdmF0ZSBvcmdJZDogc3RyaW5nO1xuXG5cbiAgY29uc3RydWN0b3IoZmlyZXN0b3JlOiBGaXJlc3RvcmUsIG9yZ0lkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmZpcmVzdG9yZSA9IGZpcmVzdG9yZTtcbiAgICB0aGlzLm9yZ0lkID0gb3JnSWQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBnZXRSZWFkaW5nc0ZvclJlc291cmNlc1xuICAgKiBcbiAgICogR2l2ZW4gYSBsaXN0IG9mIHJlc291cmNlSWRzLCBnZXQgYWxsIG9mIHRoZSByZWFkaW5ncyBmb3IgdGhlIHJlc291cmNlcyB1cCB0byBcbiAgICogYSBsaW1pdCBvZiBuIChwYXJhbXMubGltaXQpLiBJbXBsZW1lbnRpbmcgdGhpcyBsaW1pdCB3aWxsIGJlIHRyaWNreSBhcyBGaXJlc3RvcmVcbiAgICogZG9lc24ndCBjdXJyZW50bHkgc3VwcG9ydCBPUiBxdWVyaWVzLCBtZWFuaW5nIHRoYXQgd2Ugd2lsbCBoYXZlIHRvIG1lcmdlIGFuZCBrZWVwXG4gICAqIHRyYWNrIG9mIG9mIGN1cnNvcnMgZm9yIGVhY2ggaWQuXG4gICAqIFxuICAgKiBGb3Igbm93IGdldHMgdGhlIGxhdGVzdCBuIHJlYWRpbmdzIGZvciB0aGUgZ2l2ZW4gcmVzb3VyY2VzLCBidXQgaWYgbmVlZGVkIHdlIFxuICAgKiBtYXkgYWRkIHRoZSBhYmlsaXR5IHRvIGZpbHRlciBieSBkYXRlLiBBbHNvIGlnbm9yZXMgdGhlIGxhc3RWaXNpYmxlLCBhcyB3ZSBcbiAgICogY2FuJ3QgcmVhbGx5IGltcGxlbWVudCBwYWdpbmlhdGlvbiBhY3Jvc3MgbXVsdGlwbGUgcXVlcmllcyB2ZXJ5IGVhc2lseSBhdG0uXG4gICAqIFxuICAgKiBUaGlzIGFsc28gd29udCByZXNwZWN0IGRhdGUgb3JkZXJpbmcgZnJvbSBvbmUgcmVzb3VyY2UgdG8gYW5vdGhlciwgYXMgdGhlIGluZGl2aWR1YWwgXG4gICAqIGRhdGUgcXVlcmllcyBhcmUgbWVyZ2VkIHRvZ2V0aGVyLlxuICAgKiBcbiAgICogQHBhcmFtIHJlc291cmNlSWRzIFxuICAgKiBAcGFyYW0gcGFyYW1zIFxuICAgKi9cbiAgYXN5bmMgZ2V0UmVhZGluZ3NGb3JSZXNvdXJjZXMocmVzb3VyY2VJZHM6IHN0cmluZ1tdLCBwYXJhbXM6IFJlYWRpbmdQYWdlUGFyYW1zKTogUHJvbWlzZTxTb21lUmVzdWx0PFJlYWRpbmdSZXN1bHQ+PiB7XG5cbiAgICAvL0hhcmQgcnVsZXMgYmVjYXVzZSBvZiBmaXJlYmFzZSByZXN0cmljdGlvbnNcbiAgICBkZWxldGUgcGFyYW1zLmxhc3RWaXNpYmxlO1xuICAgIHBhcmFtcy5saW1pdCA9IDEwMDtcblxuICAgIGNvbnN0IHJlYWRpbmdzUmVzdWx0cyA9IGF3YWl0IFByb21pc2UuYWxsKHJlc291cmNlSWRzLm1hcChpZCA9PiB0aGlzLmdldFJlYWRpbmdzRm9yUmVzb3VyY2VJZChpZCwgcGFyYW1zKSkpO1xuICAgIGxldCByZWFkaW5nczogUmVhZGluZ1tdID0gW107XG4gICAgY29uc3QgZXJyb3JzOiBFcnJvclJlc3VsdFtdID0gW107XG4gICAgcmVhZGluZ3NSZXN1bHRzLmZvckVhY2gocmVzdWx0ID0+IHtcbiAgICAgIGlmIChyZXN1bHQudHlwZSA9PT0gUmVzdWx0VHlwZS5FUlJPUikge1xuICAgICAgICBlcnJvcnMucHVzaChyZXN1bHQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlYWRpbmdzID0gcmVhZGluZ3MuY29uY2F0KHJlc3VsdC5yZXN1bHQucmVhZGluZ3MpO1xuICAgIH0pO1xuXG4gICAgaWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3JzLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiBhY2MgKyBcIiBcIiArIGN1cnIubWVzc2FnZSwgXCJNdWx0aXBsZSBFcnJvcnM6XCIpO1xuICAgICAgcmV0dXJuIG1ha2VFcnJvcihtZXNzYWdlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFrZVN1Y2Nlc3Moe1xuICAgICAgcGFyYW1zLFxuICAgICAgcmVhZGluZ3MsXG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBnZXRSZWFkaW5nc0ZvclJlc291cmNlSWRcbiAgICpcbiAgICogR2l2ZW4gYSByZXNvdXJjZUlkLCBnZXQgYWxsIG9mIHRoZSByZWFkaW5ncyBmb3IgdGhlIHJlc291cmNlcyB1cCB0b1xuICAgKiBhIGxpbWl0IG9mIG4gKHBhcmFtcy5saW1pdClcbiAgICogXG4gICAqIEZvciBub3cgZ2V0cyB0aGUgbGF0ZXN0IG4gcmVhZGluZ3MgZm9yIHRoZSBnaXZlbiByZXNvdXJjZXMsIGJ1dCBpZiBuZWVkZWQgd2VcbiAgICogbWF5IGFkZCB0aGUgYWJpbGl0eSB0byBmaWx0ZXIgYnkgZGF0ZVxuICAgKlxuICAgKiBAcGFyYW0gcmVzb3VyY2VJZFxuICAgKiBAcGFyYW0gcGFyYW1zXG4gICAqL1xuICBhc3luYyBnZXRSZWFkaW5nc0ZvclJlc291cmNlSWQocmVzb3VyY2VJZDogc3RyaW5nLCBwYXJhbXM6IFJlYWRpbmdQYWdlUGFyYW1zKTogUHJvbWlzZTxTb21lUmVzdWx0PFJlYWRpbmdSZXN1bHQ+PiB7XG5cbiAgICBsZXQgcXVlcnk6IGFueSA9IHRoaXMucmVhZGluZ0NvbCgpXG4gICAgLndoZXJlKGByZXNvdXJjZUlkYCwgJz09JywgcmVzb3VyY2VJZClcblxuICAgIC8vSSB0aGluayB0aGVzZSByZXN1bHRzIHdpbGwgYmUgb3JkZXJlZCwgc2luY2UgdGhlIHJlYWRpbmdJZHMgYXJlIG9yZGVyZWQgaW5oZXJlbnRseSwgYnV0IGhlcmU6XG4gICAgLm9yZGVyQnkoJ2RhdGV0aW1lJywgJ2Rlc2MnKTtcblxuICAgIGlmIChwYXJhbXMubGFzdFZpc2libGUpIHtcbiAgICAgIHF1ZXJ5ID0gcXVlcnkuc3RhcnRBZnRlcihwYXJhbXMubGFzdFZpc2libGUpO1xuICAgIH1cbiAgICBxdWVyeSA9IHF1ZXJ5LmxpbWl0KHNhZmVMb3dlcihwYXJhbXMubGltaXQsIDEwMCkpO1xuXG4gICAgLy9SdW4gdGhlIHF1ZXJ5XG4gICAgbGV0IGxhc3RWaXNpYmxlOiBRdWVyeURvY3VtZW50U25hcHNob3Q7XG4gICAgcmV0dXJuIGF3YWl0IHF1ZXJ5LmdldCgpXG4gICAgLnRoZW4oKHNuOiBRdWVyeVNuYXBzaG90KSA9PiB7XG4gICAgICBjb25zdCByZWFkaW5nUmVzdWx0czogUmVhZGluZ1tdID0gW107XG4gICAgICBsYXN0VmlzaWJsZSA9IHNuLmRvY3Nbc24uZG9jcy5sZW5ndGggLSAxXTtcblxuICAgICAgc24uZm9yRWFjaChkb2MgPT4ge1xuICAgICAgICBjb25zdCBkYXRhID0gZG9jLmRhdGEoKTtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCByZWFkaW5nOiBSZWFkaW5nID0ge1xuICAgICAgICAgIC4uLkRlZmF1bHRSZWFkaW5nLFxuICAgICAgICAgIC4uLmRhdGEsXG4gICAgICAgICAgLy9UT0RPOiBkZXNlcmlhbGl6ZSBoZXJlLlxuICAgICAgICB9O1xuICAgICAgICByZWFkaW5nUmVzdWx0cy5wdXNoKHJlYWRpbmcpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZWFkaW5nUmVzdWx0cztcbiAgICB9KVxuICAgIC50aGVuKChyZWFkaW5nczogUmVhZGluZ1tdKSA9PiB7XG4gICAgICBjb25zdCByZWFkaW5nUmVzdWx0OiBSZWFkaW5nUmVzdWx0ID0ge1xuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAuLi5wYXJhbXMsXG4gICAgICAgICAgbGFzdFZpc2libGUsXG4gICAgICAgIH0sXG4gICAgICAgIHJlYWRpbmdzLFxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIG1ha2VTdWNjZXNzKHJlYWRpbmdSZXN1bHQpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnI6IEVycm9yKSA9PiBtYWtlRXJyb3IoZXJyLm1lc3NhZ2UpKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIGJ1bGtTYXZlUmVhZGluZ3NcbiAgICogXG4gICAqIFNhdmUgcmVhZGluZ3MgaW4gYnVsa1xuICAgKi9cbiAgYXN5bmMgYnVsa1VwbG9hZFJlYWRpbmdzKHJlYWRpbmdzOiBSZWFkaW5nW10sIGJhdGNoU2l6ZTogbnVtYmVyKTogUHJvbWlzZTxTb21lUmVzdWx0PGFueT4+IHtcbiAgICBjb25zdCByZWFkaW5nQmF0Y2hlcyA9IGNodW5rQXJyYXkocmVhZGluZ3MsIGJhdGNoU2l6ZSk7XG4gICAgbGV0IHdyaXRlUmVzdWx0czogYW55W10gPSBbXTtcblxuICAgIGNvbnN0IGJhdGNoU2F2ZVJlc3VsdCA9IGF3YWl0IHJlYWRpbmdCYXRjaGVzLnJlZHVjZShhc3luYyAoYWNjOiBQcm9taXNlPFNvbWVSZXN1bHQ8YW55Pj4sIGN1cnI6IFJlYWRpbmdbXSwgaWR4KSA9PiB7XG4gICAgICBjb25zdCBsYXN0UmVzdWx0ID0gYXdhaXQgYWNjO1xuICAgICAgaWYgKGxhc3RSZXN1bHQudHlwZSA9PT0gUmVzdWx0VHlwZS5FUlJPUikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGxhc3RSZXN1bHQpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBiYXRjaCA9IHRoaXMuZmlyZXN0b3JlLmJhdGNoKCk7XG4gICAgICBjdXJyLmZvckVhY2gocmVhZGluZyA9PiB7XG4gICAgICAgIGNvbnN0IGlkID0gUmVhZGluZ0FwaS5oYXNoUmVhZGluZ0lkKHJlYWRpbmcucmVzb3VyY2VJZCwgcmVhZGluZy50aW1lc2VyaWVzSWQsIG5ldyBEYXRlKHJlYWRpbmcuZGF0ZXRpbWUpKTtcbiAgICAgICAgY29uc3QgcmVmID0gdGhpcy5yZWFkaW5nQ29sKCkuZG9jKGlkKTtcbiAgICAgICAgYmF0Y2guc2V0KHJlZiwge1xuICAgICAgICAgIC4uLkRlZmF1bHRSZWFkaW5nLFxuICAgICAgICAgIC4uLnJlYWRpbmdcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGF3YWl0IFJlYWRpbmdBcGkuY29tbWl0QmF0Y2goYmF0Y2gpXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0LnR5cGUgPT09IFJlc3VsdFR5cGUuU1VDQ0VTUykge1xuICAgICAgICAgIHdyaXRlUmVzdWx0cyA9IHdyaXRlUmVzdWx0cy5jb25jYXQocmVzdWx0LnJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0pXG4gICAgfSwgUHJvbWlzZS5yZXNvbHZlKG1ha2VTdWNjZXNzPGFueT4odW5kZWZpbmVkKSkpO1xuXG4gICAgaWYgKGJhdGNoU2F2ZVJlc3VsdC50eXBlID09PSBSZXN1bHRUeXBlLkVSUk9SKSB7XG4gICAgICByZXR1cm4gYmF0Y2hTYXZlUmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBtYWtlU3VjY2Vzcyh3cml0ZVJlc3VsdHMpO1xuICB9XG5cbiAgcHVibGljIHJlYWRpbmdDb2woKTogQ29sbGVjdGlvblJlZmVyZW5jZSB7XG4gICAgcmV0dXJuIHRoaXMuZmlyZXN0b3JlLmNvbGxlY3Rpb24oJ29yZycpLmRvYyh0aGlzLm9yZ0lkKS5jb2xsZWN0aW9uKCdyZWFkaW5nJyk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBUaGUgSWQgZm9yIGEgcmVhZGluZyBpcyBnZW5lcmF0ZWQgYXMgYSBoYXNoIG9mIHRoZVxuICAgKiByZWFkaW5nJ3MgZGF0ZVRpbWUgKyBSZXNvdXJjZUlkICsgdGltZXNlcmllc0lkLlxuICAgKiBcbiAgICogRm9yIG5vdywgd2UgY2FuIGp1c3QgZW5jb2RlIGl0IGFzIGEgYmFzZTY0IHN0cmluZ1xuICAgKi9cbiAgcHVibGljIHN0YXRpYyBoYXNoUmVhZGluZ0lkKHJlc291cmNlSWQ6IHN0cmluZywgdGltZXNlcmllc0lkOiBzdHJpbmcsIGRhdGVUaW1lOiBEYXRlKTogc3RyaW5nIHtcbiAgICBjb25zdCBpbnB1dCA9IGAke3Jlc291cmNlSWR9XyR7dGltZXNlcmllc0lkfV8ke2RhdGVUaW1lLnZhbHVlT2YoKX1gO1xuICAgIHJldHVybiBidG9hKGlucHV0KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY29tbWl0QmF0Y2goYmF0Y2g6IEZpcmViYXNlRmlyZXN0b3JlLldyaXRlQmF0Y2gpOiBQcm9taXNlPFNvbWVSZXN1bHQ8QXJyYXk8RmlyZWJhc2VGaXJlc3RvcmUuV3JpdGVSZXN1bHQ+Pj4ge1xuICAgIHJldHVybiBiYXRjaC5jb21taXQoKVxuICAgIC50aGVuKHJlcyA9PiBtYWtlU3VjY2VzcyhyZXMpKVxuICAgIC5jYXRjaCgoZXJyOiBFcnJvcikgPT4gbWFrZUVycm9yPEFycmF5PEZpcmViYXNlRmlyZXN0b3JlLldyaXRlUmVzdWx0Pj4oZXJyLm1lc3NhZ2UpKTtcbiAgfVxufSJdfQ==