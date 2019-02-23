"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchApi = exports.SearchResultType = void 0;

var _AppProviderTypes = require("../utils/AppProviderTypes");

var _StringUtils = require("../utils/StringUtils");

var _Utils = require("../utils/Utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SearchResultType;
exports.SearchResultType = SearchResultType;

(function (SearchResultType) {
  SearchResultType["PartialResourceResult"] = "PartialResourceResult";
  SearchResultType["PlaceResult"] = "PlaceResult";
})(SearchResultType || (exports.SearchResultType = SearchResultType = {}));

var SearchApi =
/*#__PURE__*/
function () {
  function SearchApi(firestore, orgId) {
    _classCallCheck(this, SearchApi);

    _defineProperty(this, "firestore", void 0);

    _defineProperty(this, "orgId", void 0);

    this.firestore = firestore;
    this.orgId = orgId;
  }
  /**
   * searchForPlaceName
   *
   * Lookup a place based on a place name. Uses the free nominatim api.
   * In the future, we could extend this by adding our own places, such as villages
   * 
   * eg: https://nominatim.openstreetmap.org/search/adelaide?format=json
   *
   * @param baseUrl: string
   * @param placeName: string - the place we are searching for
   * @param searchParams: SearchPageParams - params for pagination and limiting etc. Default limit is 20
   */


  _createClass(SearchApi, [{
    key: "searchForPlaceName",
    value: function () {
      var _searchForPlaceName = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(baseUrl, placeName, searchParams, requestApi) {
        var limit, uri, options;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                limit = (0, _Utils.safeLower)(searchParams.limit, 20); // https://nominatim.openstreetmap.org/search/adelaide?format=json
                //TODO: proper param parsing etc.

                uri = "".concat(baseUrl, "/").concat(placeName, "?format=json&email=admin@vesselstech.com&limit=").concat(limit);
                options = {
                  method: "GET",
                  uri: uri,
                  json: true
                }; //TODO: make generic enough for both request and fetch

                return _context.abrupt("return", requestApi(options).then(function (response) {
                  /*
                    example response: {
                      place_id: '6878179',
                      licence: 'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
                      osm_type: 'node',
                      osm_id: '703221878',
                      boundingbox: [ '3.9126024', '3.9326024', '-75.1533441', '-75.1333441' ],
                      lat: '3.9226024',
                      lon: '-75.1433441',
                      display_name: 'Adelaide, Ortega, Tolima, Colombia',
                    }
                  */
                  var places = response.map(function (r) {
                    return {
                      type: SearchResultType.PlaceResult,
                      name: r.display_name,
                      coords: {
                        latitude: parseFloat(r.lat),
                        longitude: parseFloat(r.lon)
                      },
                      boundingBox: r.boundingbox.map(function (point) {
                        return parseFloat(point);
                      })
                    };
                  }).filter(function (p) {
                    return p.name !== null;
                  });
                  return (0, _AppProviderTypes.makeSuccess)({
                    params: searchParams,
                    results: places,
                    type: SearchResultType.PlaceResult
                  });
                }).catch(function (err) {
                  return (0, _AppProviderTypes.makeError)(err.message);
                }));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function searchForPlaceName(_x, _x2, _x3, _x4) {
        return _searchForPlaceName.apply(this, arguments);
      }

      return searchForPlaceName;
    }()
    /**
     * searchForResourceInGroup
     * 
     * Search for resource given based on group membership. Sorts using where filters on
     * the field, taking advantage of lexicographic sorting. We need a better approach, 
     * but firebase doesn't allow it atm.
     * 
     * @param groupQuery: string
     * @param groupToSearch: string - the group we are searching for
     * @param searchParams: SearchPageParams - params for pagination and limiting etc.
     */

  }, {
    key: "searchForResourceInGroup",
    value: function () {
      var _searchForResourceInGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(groupQuery, groupToSearch, searchParams) {
        var query, lastVisible;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                //Build base query
                query = SearchApi.resourceCol(this.firestore, this.orgId).where("groups.".concat(groupToSearch), '>=', groupQuery).where("groups.".concat(groupToSearch), '<=', "".concat(groupQuery, "z")) //append a z to take advantage of string sort
                .orderBy('id');

                if (searchParams.lastVisible) {
                  query = query.startAfter(searchParams.lastVisible);
                }

                query = query.limit((0, _Utils.safeLower)(searchParams.limit, 100)); //Run the query

                _context2.next = 5;
                return query.get().then(function (sn) {
                  var queryResults = [];
                  lastVisible = sn.docs[sn.docs.length - 1];
                  sn.forEach(function (doc) {
                    var data = doc.data();

                    if (data._id) {
                      return;
                    }

                    var result = {
                      type: SearchResultType.PartialResourceResult,
                      id: data.id,
                      shortId: undefined,
                      groups: data.groups
                    };
                    queryResults.push(result);
                  });
                  return queryResults;
                }).then(function (results) {
                  var searchResult = {
                    params: _objectSpread({}, searchParams, {
                      lastVisible: lastVisible
                    }),
                    results: results,
                    type: SearchResultType.PartialResourceResult
                  };
                  return (0, _AppProviderTypes.makeSuccess)(searchResult);
                }).catch(function (err) {
                  return (0, _AppProviderTypes.makeError)(err.message);
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

      function searchForResourceInGroup(_x5, _x6, _x7) {
        return _searchForResourceInGroup.apply(this, arguments);
      }

      return searchForResourceInGroup;
    }()
    /**
     * searchByShortId
     * 
     * Search for a resource given a shortId or shortId fragment
     * 
     * @param shortIdQuery: string - a 6 digit or 9 digit shortId, or shortId fragment
     * @param searchParams: SearchPageParams - params for pagination and limiting etc.
     * @returns Promise<SomeResult<SearchResult>> - PartialResourceResult
     */

  }, {
    key: "searchByShortId",
    value: function () {
      var _searchByShortId = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(shortIdQuery, searchParams) {
        var searchRangeResult, _searchRangeResult$re, lowerRange, upperRange, query, lastVisible;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                searchRangeResult = SearchApi.rangeFromShortIdString(shortIdQuery);

                if (!(searchRangeResult.type === _AppProviderTypes.ResultType.ERROR)) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return", Promise.resolve(searchRangeResult));

              case 3:
                _searchRangeResult$re = _slicedToArray(searchRangeResult.result, 2), lowerRange = _searchRangeResult$re[0], upperRange = _searchRangeResult$re[1]; //Build base query
                //For some reason has to be any

                query = SearchApi.shortIdCol(this.firestore, this.orgId);

                if (lowerRange !== upperRange) {
                  query = query.where('id', '>=', lowerRange).where('id', '<', upperRange);
                } else {
                  query = query.where('id', '==', lowerRange);
                }

                query = query.orderBy('id');

                if (searchParams.lastVisible) {
                  query = query.startAfter(searchParams.lastVisible);
                } //Max limit is 100


                query = query.limit((0, _Utils.safeLower)(searchParams.limit, 100)); //Run the query

                _context3.next = 11;
                return query.get().then(function (sn) {
                  var queryResults = [];
                  lastVisible = sn.docs[sn.docs.length - 1];
                  sn.forEach(function (doc) {
                    var data = doc.data();

                    if (data._id) {
                      return;
                    }

                    var result = {
                      type: SearchResultType.PartialResourceResult,
                      id: data.longId,
                      shortId: data.shortId,
                      groups: undefined
                    };
                    queryResults.push(result);
                  });
                  return queryResults;
                }).then(function (results) {
                  var searchResult = {
                    params: _objectSpread({}, searchParams, {
                      lastVisible: lastVisible
                    }),
                    results: results,
                    type: SearchResultType.PartialResourceResult
                  };
                  return (0, _AppProviderTypes.makeSuccess)(searchResult);
                }).catch(function (err) {
                  return (0, _AppProviderTypes.makeError)(err.message);
                });

              case 11:
                return _context3.abrupt("return", _context3.sent);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function searchByShortId(_x8, _x9) {
        return _searchByShortId.apply(this, arguments);
      }

      return searchByShortId;
    }() //
    // Helpers
    // ------------------------------------

  }], [{
    key: "shortIdCol",
    value: function shortIdCol(firestore, orgId) {
      return firestore.collection('org').doc(orgId).collection('shortId');
    }
  }, {
    key: "resourceCol",
    value: function resourceCol(firestore, orgId) {
      return firestore.collection('org').doc(orgId).collection('resource');
    }
    /**
     * rangeFromShortIdString
     * 
     * 
     * Transform the shortId or shortId partial into a searchable string. For example:
     * 
     *   100-000  -> 000100000, 000100000 | exactly id 000-100-000
     *   100      -> 000100000, 000101000 | any shortId starting with 000-100
     *   1001     -> 000100100, 000100200 | Any short id between 000-100-100 and 000-100-200
     *   00010001 -> 000100010, 000100020 | Any short id between 000-100-010 and 000-100-020
     * 
     * 
     * @param shortId: shortId string or partial string
     * @returns SomeResult<[string, string]>: the range of strings to search for.
     */

  }, {
    key: "rangeFromShortIdString",
    value: function rangeFromShortIdString(shortId) {
      var lowerRange = "";
      var upperRange = ""; //Strip out all spaces, dashes, etc

      var base = shortId.replace(new RegExp(/[^\d]+/, 'g'), ''); //Make sure it's within the range

      if (base.length === 0 || base.length > 9) {
        return (0, _AppProviderTypes.makeError)("search short id is too long or short");
      } //If it's shorter than 6 digits, long, assume we have an extra three 000s at
      //the start. This may break things later on, but only when we have 530,000+ ids


      if (base.length <= 6) {
        base = "000" + base;
      } //If we are using a fullId, then just return that id twice


      if (base.length === 9) {
        return (0, _AppProviderTypes.makeSuccess)([base, base]);
      } //We have a partial short id.
      //This means we need to convert it into a number and add one, then convert
      //back and add any left zeros we may have removed.


      lowerRange = base;
      var lowerNumber;
      var upperNumber;

      try {
        lowerNumber = parseInt(lowerRange);

        if (lowerNumber === NaN) {
          throw new Error("Error parsing shortId base string: ".concat(lowerNumber));
        }

        upperNumber = lowerNumber + 1;
        upperRange = upperNumber.toString();
      } catch (err) {
        return (0, _AppProviderTypes.makeError)(err.message);
      }

      if (!upperNumber) {
        return (0, _AppProviderTypes.makeError)("Error parsing shortId base string and adding 1: ".concat(lowerNumber));
      } //Pad the left side of the string to get the leading 00's back


      upperRange = (0, _StringUtils.leftPad)(upperRange, '0', lowerRange.length); //Pad the right hand side to make a 9 digit number

      lowerRange = (0, _StringUtils.rightPad)(lowerRange, '0', 9);
      upperRange = (0, _StringUtils.rightPad)(upperRange, '0', 9);
      return (0, _AppProviderTypes.makeSuccess)([lowerRange, upperRange]);
    }
  }]);

  return SearchApi;
}();

exports.SearchApi = SearchApi;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvU2VhcmNoQXBpLnRzIl0sIm5hbWVzIjpbIlNlYXJjaFJlc3VsdFR5cGUiLCJTZWFyY2hBcGkiLCJmaXJlc3RvcmUiLCJvcmdJZCIsImJhc2VVcmwiLCJwbGFjZU5hbWUiLCJzZWFyY2hQYXJhbXMiLCJyZXF1ZXN0QXBpIiwibGltaXQiLCJ1cmkiLCJvcHRpb25zIiwibWV0aG9kIiwianNvbiIsInRoZW4iLCJyZXNwb25zZSIsInBsYWNlcyIsIm1hcCIsInIiLCJ0eXBlIiwiUGxhY2VSZXN1bHQiLCJuYW1lIiwiZGlzcGxheV9uYW1lIiwiY29vcmRzIiwibGF0aXR1ZGUiLCJwYXJzZUZsb2F0IiwibGF0IiwibG9uZ2l0dWRlIiwibG9uIiwiYm91bmRpbmdCb3giLCJib3VuZGluZ2JveCIsInBvaW50IiwiZmlsdGVyIiwicCIsInBhcmFtcyIsInJlc3VsdHMiLCJjYXRjaCIsImVyciIsIm1lc3NhZ2UiLCJncm91cFF1ZXJ5IiwiZ3JvdXBUb1NlYXJjaCIsInF1ZXJ5IiwicmVzb3VyY2VDb2wiLCJ3aGVyZSIsIm9yZGVyQnkiLCJsYXN0VmlzaWJsZSIsInN0YXJ0QWZ0ZXIiLCJnZXQiLCJzbiIsInF1ZXJ5UmVzdWx0cyIsImRvY3MiLCJsZW5ndGgiLCJmb3JFYWNoIiwiZG9jIiwiZGF0YSIsIl9pZCIsInJlc3VsdCIsIlBhcnRpYWxSZXNvdXJjZVJlc3VsdCIsImlkIiwic2hvcnRJZCIsInVuZGVmaW5lZCIsImdyb3VwcyIsInB1c2giLCJzZWFyY2hSZXN1bHQiLCJzaG9ydElkUXVlcnkiLCJzZWFyY2hSYW5nZVJlc3VsdCIsInJhbmdlRnJvbVNob3J0SWRTdHJpbmciLCJSZXN1bHRUeXBlIiwiRVJST1IiLCJQcm9taXNlIiwicmVzb2x2ZSIsImxvd2VyUmFuZ2UiLCJ1cHBlclJhbmdlIiwic2hvcnRJZENvbCIsImxvbmdJZCIsImNvbGxlY3Rpb24iLCJiYXNlIiwicmVwbGFjZSIsIlJlZ0V4cCIsImxvd2VyTnVtYmVyIiwidXBwZXJO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Q0FBOEIsQ0FBQ0QsVUFBRCxFQUFhQyxVQUFiLENBQTlCLENBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNvbWVSZXN1bHQsIG1ha2VFcnJvciwgbWFrZVN1Y2Nlc3MsIFJlc3VsdFR5cGUgfSBmcm9tIFwiLi4vdXRpbHMvQXBwUHJvdmlkZXJUeXBlc1wiO1xuaW1wb3J0IHsgbGVmdFBhZCwgcmlnaHRQYWQgfSAgZnJvbSAnLi4vdXRpbHMvU3RyaW5nVXRpbHMnO1xuaW1wb3J0ICogYXMgYWRtaW4gZnJvbSBcImZpcmViYXNlLWFkbWluXCI7XG5pbXBvcnQgeyBDb2xsZWN0aW9uUmVmZXJlbmNlLCBEb2N1bWVudFNuYXBzaG90LCBRdWVyeVNuYXBzaG90LCBRdWVyeURvY3VtZW50U25hcHNob3QgfSBmcm9tIFwiQGdvb2dsZS1jbG91ZC9maXJlc3RvcmVcIjtcbmltcG9ydCB7IHNhZmVMb3dlciB9IGZyb20gXCIuLi91dGlscy9VdGlsc1wiO1xuaW1wb3J0IHsgRGljdFR5cGUgfSBmcm9tIFwiLi4vdXRpbHMvRGljdFR5cGVcIjtcbmltcG9ydCB7IE1heWJlIH0gZnJvbSBcIi4uL3V0aWxzL01heWJlXCI7XG5cbnR5cGUgRmlyZXN0b3JlID0gYWRtaW4uZmlyZXN0b3JlLkZpcmVzdG9yZTtcblxuXG5leHBvcnQgdHlwZSBTZWFyY2hQYWdlUGFyYW1zID0ge1xuICBsYXN0VmlzaWJsZT86IERvY3VtZW50U25hcHNob3QsXG4gIGxpbWl0OiBudW1iZXIsXG59XG5cbmV4cG9ydCBlbnVtIFNlYXJjaFJlc3VsdFR5cGUge1xuICBQYXJ0aWFsUmVzb3VyY2VSZXN1bHQgPSBcIlBhcnRpYWxSZXNvdXJjZVJlc3VsdFwiLFxuICBQbGFjZVJlc3VsdCA9IFwiUGxhY2VSZXN1bHRcIixcbn1cblxuZXhwb3J0IHR5cGUgU2VhcmNoUmVzdWx0PFQ+ID0ge1xuICByZXN1bHRzOiBULFxuICBwYXJhbXM6IFNlYXJjaFBhZ2VQYXJhbXMsXG4gIHR5cGU6IFNlYXJjaFJlc3VsdFR5cGVcbn07XG5cbmV4cG9ydCB0eXBlIFBhcnRpYWxSZXNvdXJjZVJlc3VsdCA9IHtcbiAgdHlwZTogU2VhcmNoUmVzdWx0VHlwZS5QYXJ0aWFsUmVzb3VyY2VSZXN1bHQsXG4gIGlkOiBzdHJpbmcsXG4gIHNob3J0SWQ6IE1heWJlPHN0cmluZz4sXG4gIGdyb3VwczogTWF5YmU8RGljdFR5cGU8c3RyaW5nPj4sXG59XG5cbmV4cG9ydCB0eXBlIFBsYWNlUmVzdWx0ID0ge1xuICB0eXBlOiBTZWFyY2hSZXN1bHRUeXBlLlBsYWNlUmVzdWx0LFxuICBuYW1lOiBzdHJpbmcsXG4gIGNvb3JkczogeyBsYXRpdHVkZTogbnVtYmVyLCBsb25naXR1ZGU6IG51bWJlcn0sXG4gIGJvdW5kaW5nQm94OiBudW1iZXJbXSxcbn1cblxuZXhwb3J0IGNsYXNzIFNlYXJjaEFwaSB7IFxuICBwcml2YXRlIGZpcmVzdG9yZTogRmlyZXN0b3JlO1xuICBwcml2YXRlIG9yZ0lkOiBzdHJpbmc7XG5cblxuICBjb25zdHJ1Y3RvcihmaXJlc3RvcmU6IEZpcmVzdG9yZSwgb3JnSWQ6IHN0cmluZykge1xuICAgIHRoaXMuZmlyZXN0b3JlID0gZmlyZXN0b3JlO1xuICAgIHRoaXMub3JnSWQgPSBvcmdJZDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIHNlYXJjaEZvclBsYWNlTmFtZVxuICAgKlxuICAgKiBMb29rdXAgYSBwbGFjZSBiYXNlZCBvbiBhIHBsYWNlIG5hbWUuIFVzZXMgdGhlIGZyZWUgbm9taW5hdGltIGFwaS5cbiAgICogSW4gdGhlIGZ1dHVyZSwgd2UgY291bGQgZXh0ZW5kIHRoaXMgYnkgYWRkaW5nIG91ciBvd24gcGxhY2VzLCBzdWNoIGFzIHZpbGxhZ2VzXG4gICAqIFxuICAgKiBlZzogaHR0cHM6Ly9ub21pbmF0aW0ub3BlbnN0cmVldG1hcC5vcmcvc2VhcmNoL2FkZWxhaWRlP2Zvcm1hdD1qc29uXG4gICAqXG4gICAqIEBwYXJhbSBiYXNlVXJsOiBzdHJpbmdcbiAgICogQHBhcmFtIHBsYWNlTmFtZTogc3RyaW5nIC0gdGhlIHBsYWNlIHdlIGFyZSBzZWFyY2hpbmcgZm9yXG4gICAqIEBwYXJhbSBzZWFyY2hQYXJhbXM6IFNlYXJjaFBhZ2VQYXJhbXMgLSBwYXJhbXMgZm9yIHBhZ2luYXRpb24gYW5kIGxpbWl0aW5nIGV0Yy4gRGVmYXVsdCBsaW1pdCBpcyAyMFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlYXJjaEZvclBsYWNlTmFtZShiYXNlVXJsOiBzdHJpbmcsIHBsYWNlTmFtZTogc3RyaW5nLCBzZWFyY2hQYXJhbXM6IFNlYXJjaFBhZ2VQYXJhbXMsIHJlcXVlc3RBcGk6IGFueSk6XG4gIFByb21pc2U8U29tZVJlc3VsdDxTZWFyY2hSZXN1bHQ8QXJyYXk8UGxhY2VSZXN1bHQ+Pj4+IHtcblxuICAgIGNvbnN0IGxpbWl0ID0gc2FmZUxvd2VyKHNlYXJjaFBhcmFtcy5saW1pdCwgMjApO1xuXG4gICAgLy8gaHR0cHM6Ly9ub21pbmF0aW0ub3BlbnN0cmVldG1hcC5vcmcvc2VhcmNoL2FkZWxhaWRlP2Zvcm1hdD1qc29uXG4gICAgLy9UT0RPOiBwcm9wZXIgcGFyYW0gcGFyc2luZyBldGMuXG4gICAgY29uc3QgdXJpID0gYCR7YmFzZVVybH0vJHtwbGFjZU5hbWV9P2Zvcm1hdD1qc29uJmVtYWlsPWFkbWluQHZlc3NlbHN0ZWNoLmNvbSZsaW1pdD0ke2xpbWl0fWA7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIHVyaSxcbiAgICAgIGpzb246IHRydWUsXG4gICAgfTtcbiAgICAvL1RPRE86IG1ha2UgZ2VuZXJpYyBlbm91Z2ggZm9yIGJvdGggcmVxdWVzdCBhbmQgZmV0Y2hcbiAgICByZXR1cm4gcmVxdWVzdEFwaShvcHRpb25zKVxuICAgIC50aGVuKChyZXNwb25zZTogYW55KSA9PiB7XG5cbiAgICAgIC8qXG4gICAgICAgIGV4YW1wbGUgcmVzcG9uc2U6IHtcbiAgICAgICAgICBwbGFjZV9pZDogJzY4NzgxNzknLFxuICAgICAgICAgIGxpY2VuY2U6ICdEYXRhIMKpIE9wZW5TdHJlZXRNYXAgY29udHJpYnV0b3JzLCBPRGJMIDEuMC4gaHR0cHM6Ly9vc20ub3JnL2NvcHlyaWdodCcsXG4gICAgICAgICAgb3NtX3R5cGU6ICdub2RlJyxcbiAgICAgICAgICBvc21faWQ6ICc3MDMyMjE4NzgnLFxuICAgICAgICAgIGJvdW5kaW5nYm94OiBbICczLjkxMjYwMjQnLCAnMy45MzI2MDI0JywgJy03NS4xNTMzNDQxJywgJy03NS4xMzMzNDQxJyBdLFxuICAgICAgICAgIGxhdDogJzMuOTIyNjAyNCcsXG4gICAgICAgICAgbG9uOiAnLTc1LjE0MzM0NDEnLFxuICAgICAgICAgIGRpc3BsYXlfbmFtZTogJ0FkZWxhaWRlLCBPcnRlZ2EsIFRvbGltYSwgQ29sb21iaWEnLFxuICAgICAgICB9XG4gICAgICAqL1xuXG4gICAgICBjb25zdCBwbGFjZXM6IFBsYWNlUmVzdWx0W10gPSByZXNwb25zZS5tYXAoKHI6IGFueSkgPT4gKHtcbiAgICAgICAgdHlwZTogU2VhcmNoUmVzdWx0VHlwZS5QbGFjZVJlc3VsdCxcbiAgICAgICAgbmFtZTogci5kaXNwbGF5X25hbWUsXG4gICAgICAgIGNvb3JkczogeyBsYXRpdHVkZTogcGFyc2VGbG9hdChyLmxhdCksIGxvbmdpdHVkZTogcGFyc2VGbG9hdChyLmxvbikgfSxcbiAgICAgICAgYm91bmRpbmdCb3g6IHIuYm91bmRpbmdib3gubWFwKChwb2ludDogc3RyaW5nKSA9PiBwYXJzZUZsb2F0KHBvaW50KSApLFxuICAgICAgfSkpXG4gICAgICAuZmlsdGVyKChwOiBQbGFjZVJlc3VsdCkgPT4gcC5uYW1lICE9PSBudWxsKTtcblxuICAgICAgcmV0dXJuIG1ha2VTdWNjZXNzPFNlYXJjaFJlc3VsdDxBcnJheTxQbGFjZVJlc3VsdD4+Pih7XG4gICAgICAgIHBhcmFtczogc2VhcmNoUGFyYW1zLFxuICAgICAgICByZXN1bHRzOiBwbGFjZXMsXG4gICAgICAgIHR5cGU6IFNlYXJjaFJlc3VsdFR5cGUuUGxhY2VSZXN1bHQsXG4gICAgICB9KTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyOiBFcnJvcikgPT4gbWFrZUVycm9yPFNlYXJjaFJlc3VsdDxBcnJheTxQbGFjZVJlc3VsdD4+PihlcnIubWVzc2FnZSkpO1xuICAgfVxuXG4gIC8qKlxuICAgKiBzZWFyY2hGb3JSZXNvdXJjZUluR3JvdXBcbiAgICogXG4gICAqIFNlYXJjaCBmb3IgcmVzb3VyY2UgZ2l2ZW4gYmFzZWQgb24gZ3JvdXAgbWVtYmVyc2hpcC4gU29ydHMgdXNpbmcgd2hlcmUgZmlsdGVycyBvblxuICAgKiB0aGUgZmllbGQsIHRha2luZyBhZHZhbnRhZ2Ugb2YgbGV4aWNvZ3JhcGhpYyBzb3J0aW5nLiBXZSBuZWVkIGEgYmV0dGVyIGFwcHJvYWNoLCBcbiAgICogYnV0IGZpcmViYXNlIGRvZXNuJ3QgYWxsb3cgaXQgYXRtLlxuICAgKiBcbiAgICogQHBhcmFtIGdyb3VwUXVlcnk6IHN0cmluZ1xuICAgKiBAcGFyYW0gZ3JvdXBUb1NlYXJjaDogc3RyaW5nIC0gdGhlIGdyb3VwIHdlIGFyZSBzZWFyY2hpbmcgZm9yXG4gICAqIEBwYXJhbSBzZWFyY2hQYXJhbXM6IFNlYXJjaFBhZ2VQYXJhbXMgLSBwYXJhbXMgZm9yIHBhZ2luYXRpb24gYW5kIGxpbWl0aW5nIGV0Yy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZWFyY2hGb3JSZXNvdXJjZUluR3JvdXAoZ3JvdXBRdWVyeTogc3RyaW5nLCBncm91cFRvU2VhcmNoOiBzdHJpbmcsIHNlYXJjaFBhcmFtczogU2VhcmNoUGFnZVBhcmFtcyk6XG4gIFByb21pc2U8U29tZVJlc3VsdDxTZWFyY2hSZXN1bHQ8QXJyYXk8UGFydGlhbFJlc291cmNlUmVzdWx0Pj4+PiB7XG5cbiAgICAvL0J1aWxkIGJhc2UgcXVlcnlcbiAgICAvL0ZvciBzb21lIHJlYXNvbiBoYXMgdG8gYmUgYW55XG4gICAgbGV0IHF1ZXJ5OiBhbnkgPSBTZWFyY2hBcGkucmVzb3VyY2VDb2wodGhpcy5maXJlc3RvcmUsIHRoaXMub3JnSWQpXG4gICAgLndoZXJlKGBncm91cHMuJHtncm91cFRvU2VhcmNofWAsICc+PScsIGdyb3VwUXVlcnkpXG4gICAgLndoZXJlKGBncm91cHMuJHtncm91cFRvU2VhcmNofWAsICc8PScsIGAke2dyb3VwUXVlcnl9emApIC8vYXBwZW5kIGEgeiB0byB0YWtlIGFkdmFudGFnZSBvZiBzdHJpbmcgc29ydFxuICAgIC5vcmRlckJ5KCdpZCcpXG5cbiAgICBpZiAoc2VhcmNoUGFyYW1zLmxhc3RWaXNpYmxlKSB7XG4gICAgICBxdWVyeSA9IHF1ZXJ5LnN0YXJ0QWZ0ZXIoc2VhcmNoUGFyYW1zLmxhc3RWaXNpYmxlKTtcbiAgICB9XG4gICAgcXVlcnkgPSBxdWVyeS5saW1pdChzYWZlTG93ZXIoc2VhcmNoUGFyYW1zLmxpbWl0LCAxMDApKTtcblxuICAgIC8vUnVuIHRoZSBxdWVyeVxuICAgIGxldCBsYXN0VmlzaWJsZTogUXVlcnlEb2N1bWVudFNuYXBzaG90O1xuICAgIHJldHVybiBhd2FpdCBxdWVyeS5nZXQoKVxuICAgIC50aGVuKChzbjogUXVlcnlTbmFwc2hvdCkgPT4ge1xuICAgICAgY29uc3QgcXVlcnlSZXN1bHRzOiBQYXJ0aWFsUmVzb3VyY2VSZXN1bHRbXSA9IFtdO1xuICAgICAgbGFzdFZpc2libGUgPSBzbi5kb2NzW3NuLmRvY3MubGVuZ3RoIC0gMV07XG5cbiAgICAgIHNuLmZvckVhY2goZG9jID0+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGRvYy5kYXRhKCk7XG4gICAgICAgIGlmIChkYXRhLl9pZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHQ6IFBhcnRpYWxSZXNvdXJjZVJlc3VsdCA9IHtcbiAgICAgICAgICB0eXBlOiBTZWFyY2hSZXN1bHRUeXBlLlBhcnRpYWxSZXNvdXJjZVJlc3VsdCxcbiAgICAgICAgICBpZDogZGF0YS5pZCxcbiAgICAgICAgICBzaG9ydElkOiB1bmRlZmluZWQsXG4gICAgICAgICAgZ3JvdXBzOiBkYXRhLmdyb3VwcyxcbiAgICAgICAgfTtcbiAgICAgICAgcXVlcnlSZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcXVlcnlSZXN1bHRzO1xuICAgIH0pXG4gICAgLnRoZW4oKHJlc3VsdHM6IGFueSkgPT4ge1xuICAgICAgY29uc3Qgc2VhcmNoUmVzdWx0OiBTZWFyY2hSZXN1bHQ8QXJyYXk8UGFydGlhbFJlc291cmNlUmVzdWx0Pj4gPSB7XG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIC4uLnNlYXJjaFBhcmFtcyxcbiAgICAgICAgICBsYXN0VmlzaWJsZSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVzdWx0cyxcbiAgICAgICAgdHlwZTogU2VhcmNoUmVzdWx0VHlwZS5QYXJ0aWFsUmVzb3VyY2VSZXN1bHQsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIG1ha2VTdWNjZXNzPFNlYXJjaFJlc3VsdDxBcnJheTxQYXJ0aWFsUmVzb3VyY2VSZXN1bHQ+Pj4oc2VhcmNoUmVzdWx0KTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyOiBFcnJvcikgPT4gbWFrZUVycm9yPFNlYXJjaFJlc3VsdDxBcnJheTxQYXJ0aWFsUmVzb3VyY2VSZXN1bHQ+Pj4oZXJyLm1lc3NhZ2UpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZWFyY2hCeVNob3J0SWRcbiAgICogXG4gICAqIFNlYXJjaCBmb3IgYSByZXNvdXJjZSBnaXZlbiBhIHNob3J0SWQgb3Igc2hvcnRJZCBmcmFnbWVudFxuICAgKiBcbiAgICogQHBhcmFtIHNob3J0SWRRdWVyeTogc3RyaW5nIC0gYSA2IGRpZ2l0IG9yIDkgZGlnaXQgc2hvcnRJZCwgb3Igc2hvcnRJZCBmcmFnbWVudFxuICAgKiBAcGFyYW0gc2VhcmNoUGFyYW1zOiBTZWFyY2hQYWdlUGFyYW1zIC0gcGFyYW1zIGZvciBwYWdpbmF0aW9uIGFuZCBsaW1pdGluZyBldGMuXG4gICAqIEByZXR1cm5zIFByb21pc2U8U29tZVJlc3VsdDxTZWFyY2hSZXN1bHQ+PiAtIFBhcnRpYWxSZXNvdXJjZVJlc3VsdFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlYXJjaEJ5U2hvcnRJZChzaG9ydElkUXVlcnk6IHN0cmluZywgc2VhcmNoUGFyYW1zOiBTZWFyY2hQYWdlUGFyYW1zKTogXG4gIFByb21pc2U8U29tZVJlc3VsdDxTZWFyY2hSZXN1bHQ8QXJyYXk8UGFydGlhbFJlc291cmNlUmVzdWx0Pj4+PiB7XG5cbiAgICBjb25zdCBzZWFyY2hSYW5nZVJlc3VsdCA9IFNlYXJjaEFwaS5yYW5nZUZyb21TaG9ydElkU3RyaW5nKHNob3J0SWRRdWVyeSk7XG4gICAgaWYgKHNlYXJjaFJhbmdlUmVzdWx0LnR5cGUgPT09IFJlc3VsdFR5cGUuRVJST1IpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc2VhcmNoUmFuZ2VSZXN1bHQpO1xuICAgIH1cbiAgICBjb25zdCBbbG93ZXJSYW5nZSwgdXBwZXJSYW5nZV0gPSBzZWFyY2hSYW5nZVJlc3VsdC5yZXN1bHQ7XG5cbiAgICAvL0J1aWxkIGJhc2UgcXVlcnlcbiAgICAvL0ZvciBzb21lIHJlYXNvbiBoYXMgdG8gYmUgYW55XG4gICAgbGV0IHF1ZXJ5OiBhbnkgPSBTZWFyY2hBcGkuc2hvcnRJZENvbCh0aGlzLmZpcmVzdG9yZSwgdGhpcy5vcmdJZCk7XG4gICAgXG4gICAgaWYgKGxvd2VyUmFuZ2UgIT09IHVwcGVyUmFuZ2UpIHtcbiAgICAgIHF1ZXJ5ID0gcXVlcnkud2hlcmUoJ2lkJywgJz49JywgbG93ZXJSYW5nZSkud2hlcmUoJ2lkJywgJzwnLCB1cHBlclJhbmdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcXVlcnkgPSBxdWVyeS53aGVyZSgnaWQnLCAnPT0nLCBsb3dlclJhbmdlKTtcbiAgICB9XG5cbiAgICBxdWVyeSA9IHF1ZXJ5Lm9yZGVyQnkoJ2lkJyk7XG4gICAgaWYgKHNlYXJjaFBhcmFtcy5sYXN0VmlzaWJsZSkge1xuICAgICAgcXVlcnkgPSBxdWVyeS5zdGFydEFmdGVyKHNlYXJjaFBhcmFtcy5sYXN0VmlzaWJsZSk7XG4gICAgfVxuXG4gICAgLy9NYXggbGltaXQgaXMgMTAwXG4gICAgcXVlcnkgPSBxdWVyeS5saW1pdChzYWZlTG93ZXIoc2VhcmNoUGFyYW1zLmxpbWl0LCAxMDApKTtcblxuICAgIC8vUnVuIHRoZSBxdWVyeVxuICAgIGxldCBsYXN0VmlzaWJsZTogUXVlcnlEb2N1bWVudFNuYXBzaG90O1xuICAgIHJldHVybiBhd2FpdCBxdWVyeS5nZXQoKVxuICAgIC50aGVuKChzbjogUXVlcnlTbmFwc2hvdCkgPT4geyAgXG4gICAgICBjb25zdCBxdWVyeVJlc3VsdHM6IFBhcnRpYWxSZXNvdXJjZVJlc3VsdFtdID0gW107XG4gICAgICBsYXN0VmlzaWJsZSA9IHNuLmRvY3Nbc24uZG9jcy5sZW5ndGggLSAxXTtcblxuICAgICAgc24uZm9yRWFjaChkb2MgPT4ge1xuICAgICAgICBjb25zdCBkYXRhID0gZG9jLmRhdGEoKTtcbiAgICAgICAgaWYgKGRhdGEuX2lkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdDogUGFydGlhbFJlc291cmNlUmVzdWx0ID0ge1xuICAgICAgICAgIHR5cGU6IFNlYXJjaFJlc3VsdFR5cGUuUGFydGlhbFJlc291cmNlUmVzdWx0LFxuICAgICAgICAgIGlkOiBkYXRhLmxvbmdJZCxcbiAgICAgICAgICBzaG9ydElkOiBkYXRhLnNob3J0SWQsXG4gICAgICAgICAgZ3JvdXBzOiB1bmRlZmluZWQsXG4gICAgICAgIH07XG4gICAgICAgIHF1ZXJ5UmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHF1ZXJ5UmVzdWx0cztcbiAgICB9KVxuICAgIC50aGVuKChyZXN1bHRzOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IHNlYXJjaFJlc3VsdDogU2VhcmNoUmVzdWx0PEFycmF5PFBhcnRpYWxSZXNvdXJjZVJlc3VsdD4+ID0ge1xuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAuLi5zZWFyY2hQYXJhbXMsXG4gICAgICAgICAgbGFzdFZpc2libGUsXG4gICAgICAgIH0sXG4gICAgICAgIHJlc3VsdHMsXG4gICAgICAgIHR5cGU6IFNlYXJjaFJlc3VsdFR5cGUuUGFydGlhbFJlc291cmNlUmVzdWx0LFxuICAgICAgfTtcbiAgICAgIHJldHVybiBtYWtlU3VjY2VzczxTZWFyY2hSZXN1bHQ8QXJyYXk8UGFydGlhbFJlc291cmNlUmVzdWx0Pj4+KHNlYXJjaFJlc3VsdCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycjogRXJyb3IpID0+IG1ha2VFcnJvcjxTZWFyY2hSZXN1bHQ8QXJyYXk8UGFydGlhbFJlc291cmNlUmVzdWx0Pj4+KGVyci5tZXNzYWdlKSk7XG4gIH1cblxuXG4gIC8vXG4gIC8vIEhlbHBlcnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgcHVibGljIHN0YXRpYyBzaG9ydElkQ29sKGZpcmVzdG9yZTogRmlyZXN0b3JlLCBvcmdJZDogc3RyaW5nKTogQ29sbGVjdGlvblJlZmVyZW5jZSB7XG4gICAgcmV0dXJuIGZpcmVzdG9yZS5jb2xsZWN0aW9uKCdvcmcnKS5kb2Mob3JnSWQpLmNvbGxlY3Rpb24oJ3Nob3J0SWQnKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgcmVzb3VyY2VDb2woZmlyZXN0b3JlOiBGaXJlc3RvcmUsIG9yZ0lkOiBzdHJpbmcpOiBDb2xsZWN0aW9uUmVmZXJlbmNlIHtcbiAgICByZXR1cm4gZmlyZXN0b3JlLmNvbGxlY3Rpb24oJ29yZycpLmRvYyhvcmdJZCkuY29sbGVjdGlvbigncmVzb3VyY2UnKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIHJhbmdlRnJvbVNob3J0SWRTdHJpbmdcbiAgICogXG4gICAqIFxuICAgKiBUcmFuc2Zvcm0gdGhlIHNob3J0SWQgb3Igc2hvcnRJZCBwYXJ0aWFsIGludG8gYSBzZWFyY2hhYmxlIHN0cmluZy4gRm9yIGV4YW1wbGU6XG4gICAqIFxuICAgKiAgIDEwMC0wMDAgIC0+IDAwMDEwMDAwMCwgMDAwMTAwMDAwIHwgZXhhY3RseSBpZCAwMDAtMTAwLTAwMFxuICAgKiAgIDEwMCAgICAgIC0+IDAwMDEwMDAwMCwgMDAwMTAxMDAwIHwgYW55IHNob3J0SWQgc3RhcnRpbmcgd2l0aCAwMDAtMTAwXG4gICAqICAgMTAwMSAgICAgLT4gMDAwMTAwMTAwLCAwMDAxMDAyMDAgfCBBbnkgc2hvcnQgaWQgYmV0d2VlbiAwMDAtMTAwLTEwMCBhbmQgMDAwLTEwMC0yMDBcbiAgICogICAwMDAxMDAwMSAtPiAwMDAxMDAwMTAsIDAwMDEwMDAyMCB8IEFueSBzaG9ydCBpZCBiZXR3ZWVuIDAwMC0xMDAtMDEwIGFuZCAwMDAtMTAwLTAyMFxuICAgKiBcbiAgICogXG4gICAqIEBwYXJhbSBzaG9ydElkOiBzaG9ydElkIHN0cmluZyBvciBwYXJ0aWFsIHN0cmluZ1xuICAgKiBAcmV0dXJucyBTb21lUmVzdWx0PFtzdHJpbmcsIHN0cmluZ10+OiB0aGUgcmFuZ2Ugb2Ygc3RyaW5ncyB0byBzZWFyY2ggZm9yLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyByYW5nZUZyb21TaG9ydElkU3RyaW5nKHNob3J0SWQ6IHN0cmluZyk6IFNvbWVSZXN1bHQ8W3N0cmluZywgc3RyaW5nXT4ge1xuICAgIGxldCBsb3dlclJhbmdlOiBzdHJpbmcgPSBcIlwiO1xuICAgIGxldCB1cHBlclJhbmdlOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgLy9TdHJpcCBvdXQgYWxsIHNwYWNlcywgZGFzaGVzLCBldGNcbiAgICBsZXQgYmFzZSA9IHNob3J0SWQucmVwbGFjZShuZXcgUmVnRXhwKC9bXlxcZF0rLywgJ2cnKSwgJycpO1xuXG4gICAgLy9NYWtlIHN1cmUgaXQncyB3aXRoaW4gdGhlIHJhbmdlXG4gICAgaWYgKGJhc2UubGVuZ3RoID09PSAwIHx8IGJhc2UubGVuZ3RoID4gOSkge1xuICAgICAgcmV0dXJuIG1ha2VFcnJvcjxbc3RyaW5nLCBzdHJpbmddPihcInNlYXJjaCBzaG9ydCBpZCBpcyB0b28gbG9uZyBvciBzaG9ydFwiKTtcbiAgICB9XG5cbiAgICAvL0lmIGl0J3Mgc2hvcnRlciB0aGFuIDYgZGlnaXRzLCBsb25nLCBhc3N1bWUgd2UgaGF2ZSBhbiBleHRyYSB0aHJlZSAwMDBzIGF0XG4gICAgLy90aGUgc3RhcnQuIFRoaXMgbWF5IGJyZWFrIHRoaW5ncyBsYXRlciBvbiwgYnV0IG9ubHkgd2hlbiB3ZSBoYXZlIDUzMCwwMDArIGlkc1xuICAgIGlmIChiYXNlLmxlbmd0aCA8PSA2KSB7XG4gICAgICBiYXNlID0gXCIwMDBcIiArIGJhc2U7XG4gICAgfVxuXG4gICAgLy9JZiB3ZSBhcmUgdXNpbmcgYSBmdWxsSWQsIHRoZW4ganVzdCByZXR1cm4gdGhhdCBpZCB0d2ljZVxuICAgIGlmIChiYXNlLmxlbmd0aCA9PT0gOSkge1xuICAgICAgcmV0dXJuIG1ha2VTdWNjZXNzPFtzdHJpbmcsIHN0cmluZ10+KFtiYXNlLCBiYXNlXSk7XG4gICAgfVxuXG4gICAgLy9XZSBoYXZlIGEgcGFydGlhbCBzaG9ydCBpZC5cbiAgICAvL1RoaXMgbWVhbnMgd2UgbmVlZCB0byBjb252ZXJ0IGl0IGludG8gYSBudW1iZXIgYW5kIGFkZCBvbmUsIHRoZW4gY29udmVydFxuICAgIC8vYmFjayBhbmQgYWRkIGFueSBsZWZ0IHplcm9zIHdlIG1heSBoYXZlIHJlbW92ZWQuXG4gICAgbG93ZXJSYW5nZSA9IGJhc2U7XG4gICAgbGV0IGxvd2VyTnVtYmVyXG4gICAgbGV0IHVwcGVyTnVtYmVyO1xuICAgIHRyeSB7XG4gICAgICBsb3dlck51bWJlciA9IHBhcnNlSW50KGxvd2VyUmFuZ2UpO1xuICAgICAgaWYgKGxvd2VyTnVtYmVyID09PSBOYU4pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciBwYXJzaW5nIHNob3J0SWQgYmFzZSBzdHJpbmc6ICR7bG93ZXJOdW1iZXJ9YCk7XG4gICAgICB9XG4gICAgICB1cHBlck51bWJlciA9IGxvd2VyTnVtYmVyICsgMTtcbiAgICAgIHVwcGVyUmFuZ2UgPSB1cHBlck51bWJlci50b1N0cmluZygpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIG1ha2VFcnJvcjxbc3RyaW5nLCBzdHJpbmddPihlcnIubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgaWYgKCF1cHBlck51bWJlcikge1xuICAgICAgcmV0dXJuIG1ha2VFcnJvcjxbc3RyaW5nLCBzdHJpbmddPihgRXJyb3IgcGFyc2luZyBzaG9ydElkIGJhc2Ugc3RyaW5nIGFuZCBhZGRpbmcgMTogJHtsb3dlck51bWJlcn1gKTtcbiAgICB9XG5cbiAgICAvL1BhZCB0aGUgbGVmdCBzaWRlIG9mIHRoZSBzdHJpbmcgdG8gZ2V0IHRoZSBsZWFkaW5nIDAwJ3MgYmFja1xuICAgIHVwcGVyUmFuZ2UgPSBsZWZ0UGFkKHVwcGVyUmFuZ2UsICcwJywgbG93ZXJSYW5nZS5sZW5ndGgpO1xuXG4gICAgLy9QYWQgdGhlIHJpZ2h0IGhhbmQgc2lkZSB0byBtYWtlIGEgOSBkaWdpdCBudW1iZXJcbiAgICBsb3dlclJhbmdlID0gcmlnaHRQYWQobG93ZXJSYW5nZSwgJzAnLCA5KTtcbiAgICB1cHBlclJhbmdlID0gcmlnaHRQYWQodXBwZXJSYW5nZSwgJzAnLCA5KTtcblxuXG4gICAgcmV0dXJuIG1ha2VTdWNjZXNzPFtzdHJpbmcsIHN0cmluZ10+KFtsb3dlclJhbmdlLCB1cHBlclJhbmdlXSk7XG4gIH1cbn0iXX0=