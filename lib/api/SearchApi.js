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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvU2VhcmNoQXBpLnRzIl0sIm5hbWVzIjpbIlNlYXJjaFJlc3VsdFR5cGUiLCJTZWFyY2hBcGkiLCJmaXJlc3RvcmUiLCJvcmdJZCIsImJhc2VVcmwiLCJwbGFjZU5hbWUiLCJzZWFyY2hQYXJhbXMiLCJyZXF1ZXN0QXBpIiwibGltaXQiLCJ1cmkiLCJvcHRpb25zIiwibWV0aG9kIiwianNvbiIsInRoZW4iLCJyZXNwb25zZSIsInBsYWNlcyIsIm1hcCIsInIiLCJuYW1lIiwiZGlzcGxheV9uYW1lIiwiY29vcmRzIiwibGF0aXR1ZGUiLCJwYXJzZUZsb2F0IiwibGF0IiwibG9uZ2l0dWRlIiwibG9uIiwiYm91bmRpbmdCb3giLCJib3VuZGluZ2JveCIsInBvaW50IiwiZmlsdGVyIiwicCIsInBhcmFtcyIsInJlc3VsdHMiLCJ0eXBlIiwiUGxhY2VSZXN1bHQiLCJjYXRjaCIsImVyciIsIm1lc3NhZ2UiLCJncm91cFF1ZXJ5IiwiZ3JvdXBUb1NlYXJjaCIsInF1ZXJ5IiwicmVzb3VyY2VDb2wiLCJ3aGVyZSIsIm9yZGVyQnkiLCJsYXN0VmlzaWJsZSIsInN0YXJ0QWZ0ZXIiLCJnZXQiLCJzbiIsInF1ZXJ5UmVzdWx0cyIsImRvY3MiLCJsZW5ndGgiLCJmb3JFYWNoIiwiZG9jIiwiZGF0YSIsIl9pZCIsInJlc3VsdCIsImlkIiwic2hvcnRJZCIsInVuZGVmaW5lZCIsImdyb3VwcyIsInB1c2giLCJzZWFyY2hSZXN1bHQiLCJQYXJ0aWFsUmVzb3VyY2VSZXN1bHQiLCJzaG9ydElkUXVlcnkiLCJzZWFyY2hSYW5nZVJlc3VsdCIsInJhbmdlRnJvbVNob3J0SWRTdHJpbmciLCJSZXN1bHRUeXBlIiwiRVJST1IiLCJQcm9taXNlIiwicmVzb2x2ZSIsImxvd2VyUmFuZ2UiLCJ1cHBlclJhbmdlIiwic2hvcnRJZENvbCIsImxvbmdJZCIsImNvbGxlY3Rpb24iLCJiYXNlIiwicmVwbGFjZSIsIlJlZ0V4cCIsImxvd2VyTnVtYmVyIiwidXBwZXJO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QixFQUF1QjtBQUNyQixlQUFPLG1DQUE4QixDQUFDeUIsSUFBRCxFQUFPQSxJQUFQLENBQTlCLENBQVA7QUFDRCxPQXJCaUYsQ0F1QmxGO0FBQ0E7QUFDQTs7O0FBQ0FMLE1BQUFBLFVBQVUsR0FBR0ssSUFBYjtBQUNBLFVBQUlHLFdBQUo7QUFDQSxVQUFJQyxXQUFKOztBQUNBLFVBQUk7QUFDRkQsUUFBQUEsV0FBVyxHQUFHRSxRQUFRLENBQUNWLFVBQUQsQ0FBdEI7O0FBQ0EsWUFBSVEsV0FBVyxLQUFLRyxHQUFwQixFQUF5QjtBQUN2QixnQkFBTSxJQUFJQyxLQUFKLDhDQUFnREosV0FBaEQsRUFBTjtBQUNEOztBQUNEQyxRQUFBQSxXQUFXLEdBQUdELFdBQVcsR0FBRyxDQUE1QjtBQUNBUCxRQUFBQSxVQUFVLEdBQUdRLFdBQVcsQ0FBQ0ksUUFBWixFQUFiO0FBQ0QsT0FQRCxDQU9FLE9BQU8vQyxHQUFQLEVBQVk7QUFDWixlQUFPLGlDQUE0QkEsR0FBRyxDQUFDQyxPQUFoQyxDQUFQO0FBQ0Q7O0FBRUQsVUFBSSxDQUFDMEMsV0FBTCxFQUFrQjtBQUNoQixlQUFPLDJGQUErRUQsV0FBL0UsRUFBUDtBQUNELE9BMUNpRixDQTRDbEY7OztBQUNBUCxNQUFBQSxVQUFVLEdBQUcsMEJBQVFBLFVBQVIsRUFBb0IsR0FBcEIsRUFBeUJELFVBQVUsQ0FBQ3BCLE1BQXBDLENBQWIsQ0E3Q2tGLENBK0NsRjs7QUFDQW9CLE1BQUFBLFVBQVUsR0FBRywyQkFBU0EsVUFBVCxFQUFxQixHQUFyQixFQUEwQixDQUExQixDQUFiO0FBQ0FDLE1BQUFBLFVBQVUsR0FBRywyQkFBU0EsVUFBVCxFQUFxQixHQUFyQixFQUEwQixDQUExQixDQUFiO0FBR0EsYUFBTyxtQ0FBOEIsQ0FBQ0QsVUFBRCxFQUFhQyxVQUFiLENBQTlCLENBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNvbWVSZXN1bHQsIG1ha2VFcnJvciwgbWFrZVN1Y2Nlc3MsIFJlc3VsdFR5cGUgfSBmcm9tIFwiLi4vdXRpbHMvQXBwUHJvdmlkZXJUeXBlc1wiO1xuaW1wb3J0IHsgbGVmdFBhZCwgcmlnaHRQYWQgfSAgZnJvbSAnLi4vdXRpbHMvU3RyaW5nVXRpbHMnO1xuaW1wb3J0ICogYXMgYWRtaW4gZnJvbSBcImZpcmViYXNlLWFkbWluXCI7XG5pbXBvcnQgeyBDb2xsZWN0aW9uUmVmZXJlbmNlLCBEb2N1bWVudFNuYXBzaG90LCBRdWVyeVNuYXBzaG90LCBRdWVyeURvY3VtZW50U25hcHNob3QgfSBmcm9tIFwiQGdvb2dsZS1jbG91ZC9maXJlc3RvcmVcIjtcbmltcG9ydCB7IHNhZmVMb3dlciB9IGZyb20gXCIuLi91dGlscy9VdGlsc1wiO1xuaW1wb3J0IERpY3RUeXBlIGZyb20gXCIuLi91dGlscy9EaWN0VHlwZVwiO1xuaW1wb3J0IHsgTWF5YmUgfSBmcm9tIFwiLi4vdXRpbHMvTWF5YmVcIjtcblxudHlwZSBGaXJlc3RvcmUgPSBhZG1pbi5maXJlc3RvcmUuRmlyZXN0b3JlO1xuXG5cbmV4cG9ydCB0eXBlIFNlYXJjaFBhZ2VQYXJhbXMgPSB7XG4gIGxhc3RWaXNpYmxlPzogRG9jdW1lbnRTbmFwc2hvdCxcbiAgbGltaXQ6IG51bWJlcixcbn1cblxuZXhwb3J0IGVudW0gU2VhcmNoUmVzdWx0VHlwZSB7XG4gIFBhcnRpYWxSZXNvdXJjZVJlc3VsdCA9IFwiUGFydGlhbFJlc291cmNlUmVzdWx0XCIsXG4gIFBsYWNlUmVzdWx0ID0gXCJQbGFjZVJlc3VsdFwiLFxufVxuXG5leHBvcnQgdHlwZSBTZWFyY2hSZXN1bHQ8VD4gPSB7XG4gIHJlc3VsdHM6IFQsXG4gIHBhcmFtczogU2VhcmNoUGFnZVBhcmFtcyxcbiAgdHlwZTogU2VhcmNoUmVzdWx0VHlwZVxufTtcblxuZXhwb3J0IHR5cGUgUGFydGlhbFJlc291cmNlUmVzdWx0ID0ge1xuICBpZDogc3RyaW5nLFxuICBzaG9ydElkOiBNYXliZTxzdHJpbmc+LFxuICBncm91cHM6IE1heWJlPERpY3RUeXBlPHN0cmluZz4+LFxufVxuXG5leHBvcnQgdHlwZSBQbGFjZVJlc3VsdCA9IHtcbiAgbmFtZTogc3RyaW5nLFxuICBjb29yZHM6IHsgbGF0aXR1ZGU6IG51bWJlciwgbG9uZ2l0dWRlOiBudW1iZXJ9LFxuICBib3VuZGluZ0JveDogbnVtYmVyW10sXG5cbn1cblxuXG5leHBvcnQgY2xhc3MgU2VhcmNoQXBpIHsgXG4gIHByaXZhdGUgZmlyZXN0b3JlOiBGaXJlc3RvcmU7XG4gIHByaXZhdGUgb3JnSWQ6IHN0cmluZztcblxuXG4gIGNvbnN0cnVjdG9yKGZpcmVzdG9yZTogRmlyZXN0b3JlLCBvcmdJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5maXJlc3RvcmUgPSBmaXJlc3RvcmU7XG4gICAgdGhpcy5vcmdJZCA9IG9yZ0lkO1xuICB9XG5cblxuICAvKipcbiAgICogc2VhcmNoRm9yUGxhY2VOYW1lXG4gICAqXG4gICAqIExvb2t1cCBhIHBsYWNlIGJhc2VkIG9uIGEgcGxhY2UgbmFtZS4gVXNlcyB0aGUgZnJlZSBub21pbmF0aW0gYXBpLlxuICAgKiBJbiB0aGUgZnV0dXJlLCB3ZSBjb3VsZCBleHRlbmQgdGhpcyBieSBhZGRpbmcgb3VyIG93biBwbGFjZXMsIHN1Y2ggYXMgdmlsbGFnZXNcbiAgICogXG4gICAqIGVnOiBodHRwczovL25vbWluYXRpbS5vcGVuc3RyZWV0bWFwLm9yZy9zZWFyY2gvYWRlbGFpZGU/Zm9ybWF0PWpzb25cbiAgICpcbiAgICogQHBhcmFtIGJhc2VVcmw6IHN0cmluZ1xuICAgKiBAcGFyYW0gcGxhY2VOYW1lOiBzdHJpbmcgLSB0aGUgcGxhY2Ugd2UgYXJlIHNlYXJjaGluZyBmb3JcbiAgICogQHBhcmFtIHNlYXJjaFBhcmFtczogU2VhcmNoUGFnZVBhcmFtcyAtIHBhcmFtcyBmb3IgcGFnaW5hdGlvbiBhbmQgbGltaXRpbmcgZXRjLiBEZWZhdWx0IGxpbWl0IGlzIDIwXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2VhcmNoRm9yUGxhY2VOYW1lKGJhc2VVcmw6IHN0cmluZywgcGxhY2VOYW1lOiBzdHJpbmcsIHNlYXJjaFBhcmFtczogU2VhcmNoUGFnZVBhcmFtcywgcmVxdWVzdEFwaTogYW55KTpcbiAgUHJvbWlzZTxTb21lUmVzdWx0PFNlYXJjaFJlc3VsdDxBcnJheTxQbGFjZVJlc3VsdD4+Pj4ge1xuXG4gICAgY29uc3QgbGltaXQgPSBzYWZlTG93ZXIoc2VhcmNoUGFyYW1zLmxpbWl0LCAyMCk7XG5cbiAgICAvLyBodHRwczovL25vbWluYXRpbS5vcGVuc3RyZWV0bWFwLm9yZy9zZWFyY2gvYWRlbGFpZGU/Zm9ybWF0PWpzb25cbiAgICAvL1RPRE86IHByb3BlciBwYXJhbSBwYXJzaW5nIGV0Yy5cbiAgICBjb25zdCB1cmkgPSBgJHtiYXNlVXJsfS8ke3BsYWNlTmFtZX0/Zm9ybWF0PWpzb24mZW1haWw9YWRtaW5AdmVzc2Vsc3RlY2guY29tJmxpbWl0PSR7bGltaXR9YDtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgdXJpLFxuICAgICAganNvbjogdHJ1ZSxcbiAgICB9O1xuICAgIC8vVE9ETzogbWFrZSBnZW5lcmljIGVub3VnaCBmb3IgYm90aCByZXF1ZXN0IGFuZCBmZXRjaFxuICAgIHJldHVybiByZXF1ZXN0QXBpKG9wdGlvbnMpXG4gICAgLnRoZW4oKHJlc3BvbnNlOiBhbnkpID0+IHtcblxuICAgICAgLypcbiAgICAgICAgZXhhbXBsZSByZXNwb25zZToge1xuICAgICAgICAgIHBsYWNlX2lkOiAnNjg3ODE3OScsXG4gICAgICAgICAgbGljZW5jZTogJ0RhdGEgwqkgT3BlblN0cmVldE1hcCBjb250cmlidXRvcnMsIE9EYkwgMS4wLiBodHRwczovL29zbS5vcmcvY29weXJpZ2h0JyxcbiAgICAgICAgICBvc21fdHlwZTogJ25vZGUnLFxuICAgICAgICAgIG9zbV9pZDogJzcwMzIyMTg3OCcsXG4gICAgICAgICAgYm91bmRpbmdib3g6IFsgJzMuOTEyNjAyNCcsICczLjkzMjYwMjQnLCAnLTc1LjE1MzM0NDEnLCAnLTc1LjEzMzM0NDEnIF0sXG4gICAgICAgICAgbGF0OiAnMy45MjI2MDI0JyxcbiAgICAgICAgICBsb246ICctNzUuMTQzMzQ0MScsXG4gICAgICAgICAgZGlzcGxheV9uYW1lOiAnQWRlbGFpZGUsIE9ydGVnYSwgVG9saW1hLCBDb2xvbWJpYScsXG4gICAgICAgIH1cbiAgICAgICovXG5cbiAgICAgIGNvbnN0IHBsYWNlczogUGxhY2VSZXN1bHRbXSA9IHJlc3BvbnNlLm1hcCgocjogYW55KSA9PiAoe1xuICAgICAgICBuYW1lOiByLmRpc3BsYXlfbmFtZSxcbiAgICAgICAgY29vcmRzOiB7IGxhdGl0dWRlOiBwYXJzZUZsb2F0KHIubGF0KSwgbG9uZ2l0dWRlOiBwYXJzZUZsb2F0KHIubG9uKSB9LFxuICAgICAgICBib3VuZGluZ0JveDogci5ib3VuZGluZ2JveC5tYXAoKHBvaW50OiBzdHJpbmcpID0+IHBhcnNlRmxvYXQocG9pbnQpICksXG4gICAgICB9KSlcbiAgICAgIC5maWx0ZXIoKHA6IFBsYWNlUmVzdWx0KSA9PiBwLm5hbWUgIT09IG51bGwpO1xuXG4gICAgICByZXR1cm4gbWFrZVN1Y2Nlc3M8U2VhcmNoUmVzdWx0PEFycmF5PFBsYWNlUmVzdWx0Pj4+KHtcbiAgICAgICAgcGFyYW1zOiBzZWFyY2hQYXJhbXMsXG4gICAgICAgIHJlc3VsdHM6IHBsYWNlcyxcbiAgICAgICAgdHlwZTogU2VhcmNoUmVzdWx0VHlwZS5QbGFjZVJlc3VsdCxcbiAgICAgIH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnI6IEVycm9yKSA9PiBtYWtlRXJyb3I8U2VhcmNoUmVzdWx0PEFycmF5PFBsYWNlUmVzdWx0Pj4+KGVyci5tZXNzYWdlKSk7XG4gICB9XG5cbiAgLyoqXG4gICAqIHNlYXJjaEZvclJlc291cmNlSW5Hcm91cFxuICAgKiBcbiAgICogU2VhcmNoIGZvciByZXNvdXJjZSBnaXZlbiBiYXNlZCBvbiBncm91cCBtZW1iZXJzaGlwLiBTb3J0cyB1c2luZyB3aGVyZSBmaWx0ZXJzIG9uXG4gICAqIHRoZSBmaWVsZCwgdGFraW5nIGFkdmFudGFnZSBvZiBsZXhpY29ncmFwaGljIHNvcnRpbmcuIFdlIG5lZWQgYSBiZXR0ZXIgYXBwcm9hY2gsIFxuICAgKiBidXQgZmlyZWJhc2UgZG9lc24ndCBhbGxvdyBpdCBhdG0uXG4gICAqIFxuICAgKiBAcGFyYW0gZ3JvdXBRdWVyeTogc3RyaW5nXG4gICAqIEBwYXJhbSBncm91cFRvU2VhcmNoOiBzdHJpbmcgLSB0aGUgZ3JvdXAgd2UgYXJlIHNlYXJjaGluZyBmb3JcbiAgICogQHBhcmFtIHNlYXJjaFBhcmFtczogU2VhcmNoUGFnZVBhcmFtcyAtIHBhcmFtcyBmb3IgcGFnaW5hdGlvbiBhbmQgbGltaXRpbmcgZXRjLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlYXJjaEZvclJlc291cmNlSW5Hcm91cChncm91cFF1ZXJ5OiBzdHJpbmcsIGdyb3VwVG9TZWFyY2g6IHN0cmluZywgc2VhcmNoUGFyYW1zOiBTZWFyY2hQYWdlUGFyYW1zKTpcbiAgUHJvbWlzZTxTb21lUmVzdWx0PFNlYXJjaFJlc3VsdDxBcnJheTxQYXJ0aWFsUmVzb3VyY2VSZXN1bHQ+Pj4+IHtcblxuICAgIC8vQnVpbGQgYmFzZSBxdWVyeVxuICAgIC8vRm9yIHNvbWUgcmVhc29uIGhhcyB0byBiZSBhbnlcbiAgICBsZXQgcXVlcnk6IGFueSA9IFNlYXJjaEFwaS5yZXNvdXJjZUNvbCh0aGlzLmZpcmVzdG9yZSwgdGhpcy5vcmdJZClcbiAgICAud2hlcmUoYGdyb3Vwcy4ke2dyb3VwVG9TZWFyY2h9YCwgJz49JywgZ3JvdXBRdWVyeSlcbiAgICAud2hlcmUoYGdyb3Vwcy4ke2dyb3VwVG9TZWFyY2h9YCwgJzw9JywgYCR7Z3JvdXBRdWVyeX16YCkgLy9hcHBlbmQgYSB6IHRvIHRha2UgYWR2YW50YWdlIG9mIHN0cmluZyBzb3J0XG4gICAgLm9yZGVyQnkoJ2lkJylcblxuICAgIGlmIChzZWFyY2hQYXJhbXMubGFzdFZpc2libGUpIHtcbiAgICAgIHF1ZXJ5ID0gcXVlcnkuc3RhcnRBZnRlcihzZWFyY2hQYXJhbXMubGFzdFZpc2libGUpO1xuICAgIH1cbiAgICBxdWVyeSA9IHF1ZXJ5LmxpbWl0KHNhZmVMb3dlcihzZWFyY2hQYXJhbXMubGltaXQsIDEwMCkpO1xuXG4gICAgLy9SdW4gdGhlIHF1ZXJ5XG4gICAgbGV0IGxhc3RWaXNpYmxlOiBRdWVyeURvY3VtZW50U25hcHNob3Q7XG4gICAgcmV0dXJuIGF3YWl0IHF1ZXJ5LmdldCgpXG4gICAgLnRoZW4oKHNuOiBRdWVyeVNuYXBzaG90KSA9PiB7XG4gICAgICBjb25zdCBxdWVyeVJlc3VsdHM6IFBhcnRpYWxSZXNvdXJjZVJlc3VsdFtdID0gW107XG4gICAgICBsYXN0VmlzaWJsZSA9IHNuLmRvY3Nbc24uZG9jcy5sZW5ndGggLSAxXTtcblxuICAgICAgc24uZm9yRWFjaChkb2MgPT4ge1xuICAgICAgICBjb25zdCBkYXRhID0gZG9jLmRhdGEoKTtcbiAgICAgICAgaWYgKGRhdGEuX2lkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdDogUGFydGlhbFJlc291cmNlUmVzdWx0ID0ge1xuICAgICAgICAgIGlkOiBkYXRhLmlkLFxuICAgICAgICAgIHNob3J0SWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICBncm91cHM6IGRhdGEuZ3JvdXBzLFxuICAgICAgICB9O1xuICAgICAgICBxdWVyeVJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBxdWVyeVJlc3VsdHM7XG4gICAgfSlcbiAgICAudGhlbigocmVzdWx0czogYW55KSA9PiB7XG4gICAgICBjb25zdCBzZWFyY2hSZXN1bHQ6IFNlYXJjaFJlc3VsdDxBcnJheTxQYXJ0aWFsUmVzb3VyY2VSZXN1bHQ+PiA9IHtcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgLi4uc2VhcmNoUGFyYW1zLFxuICAgICAgICAgIGxhc3RWaXNpYmxlLFxuICAgICAgICB9LFxuICAgICAgICByZXN1bHRzLFxuICAgICAgICB0eXBlOiBTZWFyY2hSZXN1bHRUeXBlLlBhcnRpYWxSZXNvdXJjZVJlc3VsdCxcbiAgICAgIH07XG4gICAgICByZXR1cm4gbWFrZVN1Y2Nlc3M8U2VhcmNoUmVzdWx0PEFycmF5PFBhcnRpYWxSZXNvdXJjZVJlc3VsdD4+PihzZWFyY2hSZXN1bHQpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnI6IEVycm9yKSA9PiBtYWtlRXJyb3I8U2VhcmNoUmVzdWx0PEFycmF5PFBhcnRpYWxSZXNvdXJjZVJlc3VsdD4+PihlcnIubWVzc2FnZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIHNlYXJjaEJ5U2hvcnRJZFxuICAgKiBcbiAgICogU2VhcmNoIGZvciBhIHJlc291cmNlIGdpdmVuIGEgc2hvcnRJZCBvciBzaG9ydElkIGZyYWdtZW50XG4gICAqIFxuICAgKiBAcGFyYW0gc2hvcnRJZFF1ZXJ5OiBzdHJpbmcgLSBhIDYgZGlnaXQgb3IgOSBkaWdpdCBzaG9ydElkLCBvciBzaG9ydElkIGZyYWdtZW50XG4gICAqIEBwYXJhbSBzZWFyY2hQYXJhbXM6IFNlYXJjaFBhZ2VQYXJhbXMgLSBwYXJhbXMgZm9yIHBhZ2luYXRpb24gYW5kIGxpbWl0aW5nIGV0Yy5cbiAgICogQHJldHVybnMgUHJvbWlzZTxTb21lUmVzdWx0PFNlYXJjaFJlc3VsdD4+IC0gUGFydGlhbFJlc291cmNlUmVzdWx0XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2VhcmNoQnlTaG9ydElkKHNob3J0SWRRdWVyeTogc3RyaW5nLCBzZWFyY2hQYXJhbXM6IFNlYXJjaFBhZ2VQYXJhbXMpOiBcbiAgUHJvbWlzZTxTb21lUmVzdWx0PFNlYXJjaFJlc3VsdDxBcnJheTxQYXJ0aWFsUmVzb3VyY2VSZXN1bHQ+Pj4+IHtcblxuICAgIGNvbnN0IHNlYXJjaFJhbmdlUmVzdWx0ID0gU2VhcmNoQXBpLnJhbmdlRnJvbVNob3J0SWRTdHJpbmcoc2hvcnRJZFF1ZXJ5KTtcbiAgICBpZiAoc2VhcmNoUmFuZ2VSZXN1bHQudHlwZSA9PT0gUmVzdWx0VHlwZS5FUlJPUikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzZWFyY2hSYW5nZVJlc3VsdCk7XG4gICAgfVxuICAgIGNvbnN0IFtsb3dlclJhbmdlLCB1cHBlclJhbmdlXSA9IHNlYXJjaFJhbmdlUmVzdWx0LnJlc3VsdDtcblxuICAgIC8vQnVpbGQgYmFzZSBxdWVyeVxuICAgIC8vRm9yIHNvbWUgcmVhc29uIGhhcyB0byBiZSBhbnlcbiAgICBsZXQgcXVlcnk6IGFueSA9IFNlYXJjaEFwaS5zaG9ydElkQ29sKHRoaXMuZmlyZXN0b3JlLCB0aGlzLm9yZ0lkKTtcbiAgICBcbiAgICBpZiAobG93ZXJSYW5nZSAhPT0gdXBwZXJSYW5nZSkge1xuICAgICAgcXVlcnkgPSBxdWVyeS53aGVyZSgnaWQnLCAnPj0nLCBsb3dlclJhbmdlKS53aGVyZSgnaWQnLCAnPCcsIHVwcGVyUmFuZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBxdWVyeSA9IHF1ZXJ5LndoZXJlKCdpZCcsICc9PScsIGxvd2VyUmFuZ2UpO1xuICAgIH1cblxuICAgIHF1ZXJ5ID0gcXVlcnkub3JkZXJCeSgnaWQnKTtcbiAgICBpZiAoc2VhcmNoUGFyYW1zLmxhc3RWaXNpYmxlKSB7XG4gICAgICBxdWVyeSA9IHF1ZXJ5LnN0YXJ0QWZ0ZXIoc2VhcmNoUGFyYW1zLmxhc3RWaXNpYmxlKTtcbiAgICB9XG5cbiAgICAvL01heCBsaW1pdCBpcyAxMDBcbiAgICBxdWVyeSA9IHF1ZXJ5LmxpbWl0KHNhZmVMb3dlcihzZWFyY2hQYXJhbXMubGltaXQsIDEwMCkpO1xuXG4gICAgLy9SdW4gdGhlIHF1ZXJ5XG4gICAgbGV0IGxhc3RWaXNpYmxlOiBRdWVyeURvY3VtZW50U25hcHNob3Q7XG4gICAgcmV0dXJuIGF3YWl0IHF1ZXJ5LmdldCgpXG4gICAgLnRoZW4oKHNuOiBRdWVyeVNuYXBzaG90KSA9PiB7ICBcbiAgICAgIGNvbnN0IHF1ZXJ5UmVzdWx0czogUGFydGlhbFJlc291cmNlUmVzdWx0W10gPSBbXTtcbiAgICAgIGxhc3RWaXNpYmxlID0gc24uZG9jc1tzbi5kb2NzLmxlbmd0aCAtIDFdO1xuXG4gICAgICBzbi5mb3JFYWNoKGRvYyA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBkb2MuZGF0YSgpO1xuICAgICAgICBpZiAoZGF0YS5faWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0OiBQYXJ0aWFsUmVzb3VyY2VSZXN1bHQgPSB7XG4gICAgICAgICAgaWQ6IGRhdGEubG9uZ0lkLFxuICAgICAgICAgIHNob3J0SWQ6IGRhdGEuc2hvcnRJZCxcbiAgICAgICAgICBncm91cHM6IHVuZGVmaW5lZCxcbiAgICAgICAgfTtcbiAgICAgICAgcXVlcnlSZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcXVlcnlSZXN1bHRzO1xuICAgIH0pXG4gICAgLnRoZW4oKHJlc3VsdHM6IGFueSkgPT4ge1xuICAgICAgY29uc3Qgc2VhcmNoUmVzdWx0OiBTZWFyY2hSZXN1bHQ8QXJyYXk8UGFydGlhbFJlc291cmNlUmVzdWx0Pj4gPSB7XG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIC4uLnNlYXJjaFBhcmFtcyxcbiAgICAgICAgICBsYXN0VmlzaWJsZSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVzdWx0cyxcbiAgICAgICAgdHlwZTogU2VhcmNoUmVzdWx0VHlwZS5QYXJ0aWFsUmVzb3VyY2VSZXN1bHQsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIG1ha2VTdWNjZXNzPFNlYXJjaFJlc3VsdDxBcnJheTxQYXJ0aWFsUmVzb3VyY2VSZXN1bHQ+Pj4oc2VhcmNoUmVzdWx0KTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyOiBFcnJvcikgPT4gbWFrZUVycm9yPFNlYXJjaFJlc3VsdDxBcnJheTxQYXJ0aWFsUmVzb3VyY2VSZXN1bHQ+Pj4oZXJyLm1lc3NhZ2UpKTtcbiAgfVxuXG5cbiAgLy9cbiAgLy8gSGVscGVyc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICBwdWJsaWMgc3RhdGljIHNob3J0SWRDb2woZmlyZXN0b3JlOiBGaXJlc3RvcmUsIG9yZ0lkOiBzdHJpbmcpOiBDb2xsZWN0aW9uUmVmZXJlbmNlIHtcbiAgICByZXR1cm4gZmlyZXN0b3JlLmNvbGxlY3Rpb24oJ29yZycpLmRvYyhvcmdJZCkuY29sbGVjdGlvbignc2hvcnRJZCcpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyByZXNvdXJjZUNvbChmaXJlc3RvcmU6IEZpcmVzdG9yZSwgb3JnSWQ6IHN0cmluZyk6IENvbGxlY3Rpb25SZWZlcmVuY2Uge1xuICAgIHJldHVybiBmaXJlc3RvcmUuY29sbGVjdGlvbignb3JnJykuZG9jKG9yZ0lkKS5jb2xsZWN0aW9uKCdyZXNvdXJjZScpO1xuICB9XG5cblxuICAvKipcbiAgICogcmFuZ2VGcm9tU2hvcnRJZFN0cmluZ1xuICAgKiBcbiAgICogXG4gICAqIFRyYW5zZm9ybSB0aGUgc2hvcnRJZCBvciBzaG9ydElkIHBhcnRpYWwgaW50byBhIHNlYXJjaGFibGUgc3RyaW5nLiBGb3IgZXhhbXBsZTpcbiAgICogXG4gICAqICAgMTAwLTAwMCAgLT4gMDAwMTAwMDAwLCAwMDAxMDAwMDAgfCBleGFjdGx5IGlkIDAwMC0xMDAtMDAwXG4gICAqICAgMTAwICAgICAgLT4gMDAwMTAwMDAwLCAwMDAxMDEwMDAgfCBhbnkgc2hvcnRJZCBzdGFydGluZyB3aXRoIDAwMC0xMDBcbiAgICogICAxMDAxICAgICAtPiAwMDAxMDAxMDAsIDAwMDEwMDIwMCB8IEFueSBzaG9ydCBpZCBiZXR3ZWVuIDAwMC0xMDAtMTAwIGFuZCAwMDAtMTAwLTIwMFxuICAgKiAgIDAwMDEwMDAxIC0+IDAwMDEwMDAxMCwgMDAwMTAwMDIwIHwgQW55IHNob3J0IGlkIGJldHdlZW4gMDAwLTEwMC0wMTAgYW5kIDAwMC0xMDAtMDIwXG4gICAqIFxuICAgKiBcbiAgICogQHBhcmFtIHNob3J0SWQ6IHNob3J0SWQgc3RyaW5nIG9yIHBhcnRpYWwgc3RyaW5nXG4gICAqIEByZXR1cm5zIFNvbWVSZXN1bHQ8W3N0cmluZywgc3RyaW5nXT46IHRoZSByYW5nZSBvZiBzdHJpbmdzIHRvIHNlYXJjaCBmb3IuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHJhbmdlRnJvbVNob3J0SWRTdHJpbmcoc2hvcnRJZDogc3RyaW5nKTogU29tZVJlc3VsdDxbc3RyaW5nLCBzdHJpbmddPiB7XG4gICAgbGV0IGxvd2VyUmFuZ2U6IHN0cmluZyA9IFwiXCI7XG4gICAgbGV0IHVwcGVyUmFuZ2U6IHN0cmluZyA9IFwiXCI7XG5cbiAgICAvL1N0cmlwIG91dCBhbGwgc3BhY2VzLCBkYXNoZXMsIGV0Y1xuICAgIGxldCBiYXNlID0gc2hvcnRJZC5yZXBsYWNlKG5ldyBSZWdFeHAoL1teXFxkXSsvLCAnZycpLCAnJyk7XG5cbiAgICAvL01ha2Ugc3VyZSBpdCdzIHdpdGhpbiB0aGUgcmFuZ2VcbiAgICBpZiAoYmFzZS5sZW5ndGggPT09IDAgfHwgYmFzZS5sZW5ndGggPiA5KSB7XG4gICAgICByZXR1cm4gbWFrZUVycm9yPFtzdHJpbmcsIHN0cmluZ10+KFwic2VhcmNoIHNob3J0IGlkIGlzIHRvbyBsb25nIG9yIHNob3J0XCIpO1xuICAgIH1cblxuICAgIC8vSWYgaXQncyBzaG9ydGVyIHRoYW4gNiBkaWdpdHMsIGxvbmcsIGFzc3VtZSB3ZSBoYXZlIGFuIGV4dHJhIHRocmVlIDAwMHMgYXRcbiAgICAvL3RoZSBzdGFydC4gVGhpcyBtYXkgYnJlYWsgdGhpbmdzIGxhdGVyIG9uLCBidXQgb25seSB3aGVuIHdlIGhhdmUgNTMwLDAwMCsgaWRzXG4gICAgaWYgKGJhc2UubGVuZ3RoIDw9IDYpIHtcbiAgICAgIGJhc2UgPSBcIjAwMFwiICsgYmFzZTtcbiAgICB9XG5cbiAgICAvL0lmIHdlIGFyZSB1c2luZyBhIGZ1bGxJZCwgdGhlbiBqdXN0IHJldHVybiB0aGF0IGlkIHR3aWNlXG4gICAgaWYgKGJhc2UubGVuZ3RoID09PSA5KSB7XG4gICAgICByZXR1cm4gbWFrZVN1Y2Nlc3M8W3N0cmluZywgc3RyaW5nXT4oW2Jhc2UsIGJhc2VdKTtcbiAgICB9XG5cbiAgICAvL1dlIGhhdmUgYSBwYXJ0aWFsIHNob3J0IGlkLlxuICAgIC8vVGhpcyBtZWFucyB3ZSBuZWVkIHRvIGNvbnZlcnQgaXQgaW50byBhIG51bWJlciBhbmQgYWRkIG9uZSwgdGhlbiBjb252ZXJ0XG4gICAgLy9iYWNrIGFuZCBhZGQgYW55IGxlZnQgemVyb3Mgd2UgbWF5IGhhdmUgcmVtb3ZlZC5cbiAgICBsb3dlclJhbmdlID0gYmFzZTtcbiAgICBsZXQgbG93ZXJOdW1iZXJcbiAgICBsZXQgdXBwZXJOdW1iZXI7XG4gICAgdHJ5IHtcbiAgICAgIGxvd2VyTnVtYmVyID0gcGFyc2VJbnQobG93ZXJSYW5nZSk7XG4gICAgICBpZiAobG93ZXJOdW1iZXIgPT09IE5hTikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIHBhcnNpbmcgc2hvcnRJZCBiYXNlIHN0cmluZzogJHtsb3dlck51bWJlcn1gKTtcbiAgICAgIH1cbiAgICAgIHVwcGVyTnVtYmVyID0gbG93ZXJOdW1iZXIgKyAxO1xuICAgICAgdXBwZXJSYW5nZSA9IHVwcGVyTnVtYmVyLnRvU3RyaW5nKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gbWFrZUVycm9yPFtzdHJpbmcsIHN0cmluZ10+KGVyci5tZXNzYWdlKTtcbiAgICB9XG5cbiAgICBpZiAoIXVwcGVyTnVtYmVyKSB7XG4gICAgICByZXR1cm4gbWFrZUVycm9yPFtzdHJpbmcsIHN0cmluZ10+KGBFcnJvciBwYXJzaW5nIHNob3J0SWQgYmFzZSBzdHJpbmcgYW5kIGFkZGluZyAxOiAke2xvd2VyTnVtYmVyfWApO1xuICAgIH1cblxuICAgIC8vUGFkIHRoZSBsZWZ0IHNpZGUgb2YgdGhlIHN0cmluZyB0byBnZXQgdGhlIGxlYWRpbmcgMDAncyBiYWNrXG4gICAgdXBwZXJSYW5nZSA9IGxlZnRQYWQodXBwZXJSYW5nZSwgJzAnLCBsb3dlclJhbmdlLmxlbmd0aCk7XG5cbiAgICAvL1BhZCB0aGUgcmlnaHQgaGFuZCBzaWRlIHRvIG1ha2UgYSA5IGRpZ2l0IG51bWJlclxuICAgIGxvd2VyUmFuZ2UgPSByaWdodFBhZChsb3dlclJhbmdlLCAnMCcsIDkpO1xuICAgIHVwcGVyUmFuZ2UgPSByaWdodFBhZCh1cHBlclJhbmdlLCAnMCcsIDkpO1xuXG5cbiAgICByZXR1cm4gbWFrZVN1Y2Nlc3M8W3N0cmluZywgc3RyaW5nXT4oW2xvd2VyUmFuZ2UsIHVwcGVyUmFuZ2VdKTtcbiAgfVxufSJdfQ==