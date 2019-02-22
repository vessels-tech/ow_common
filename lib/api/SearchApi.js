"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchApi = void 0;

var _AppProviderTypes = require("../utils/AppProviderTypes");

var _StringUtils = require("../utils/StringUtils");

var _Utils = require("../utils/Utils");

var _requestPromiseNative = _interopRequireDefault(require("request-promise-native"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      regeneratorRuntime.mark(function _callee(baseUrl, placeName, searchParams) {
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
                };
                return _context.abrupt("return", (0, _requestPromiseNative.default)(options).then(function (response) {
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
                    results: places
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

      function searchForPlaceName(_x, _x2, _x3) {
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
                    results: results
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

      function searchForResourceInGroup(_x4, _x5, _x6) {
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
                    results: results
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

      function searchByShortId(_x7, _x8) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvU2VhcmNoQXBpLnRzIl0sIm5hbWVzIjpbIlNlYXJjaEFwaSIsImZpcmVzdG9yZSIsIm9yZ0lkIiwiYmFzZVVybCIsInBsYWNlTmFtZSIsInNlYXJjaFBhcmFtcyIsImxpbWl0IiwidXJpIiwib3B0aW9ucyIsIm1ldGhvZCIsImpzb24iLCJ0aGVuIiwicmVzcG9uc2UiLCJwbGFjZXMiLCJtYXAiLCJyIiwibmFtZSIsImRpc3BsYXlfbmFtZSIsImNvb3JkcyIsImxhdGl0dWRlIiwicGFyc2VGbG9hdCIsImxhdCIsImxvbmdpdHVkZSIsImxvbiIsImJvdW5kaW5nQm94IiwiYm91bmRpbmdib3giLCJwb2ludCIsImZpbHRlciIsInAiLCJwYXJhbXMiLCJyZXN1bHRzIiwiY2F0Y2giLCJlcnIiLCJtZXNzYWdlIiwiZ3JvdXBRdWVyeSIsImdyb3VwVG9TZWFyY2giLCJxdWVyeSIsInJlc291cmNlQ29sIiwid2hlcmUiLCJvcmRlckJ5IiwibGFzdFZpc2libGUiLCJzdGFydEFmdGVyIiwiZ2V0Iiwic24iLCJxdWVyeVJlc3VsdHMiLCJkb2NzIiwibGVuZ3RoIiwiZm9yRWFjaCIsImRvYyIsImRhdGEiLCJfaWQiLCJyZXN1bHQiLCJpZCIsInNob3J0SWQiLCJ1bmRlZmluZWQiLCJncm91cHMiLCJwdXNoIiwic2VhcmNoUmVzdWx0Iiwic2hvcnRJZFF1ZXJ5Iiwic2VhcmNoUmFuZ2VSZXN1bHQiLCJyYW5nZUZyb21TaG9ydElkU3RyaW5nIiwidHlwZSIsIlJlc3VsdFR5cGUiLCJFUlJPUiIsIlByb21pc2UiLCJyZXNvbHZlIiwibG93ZXJSYW5nZSIsInVwcGVyUmFuZ2UiLCJzaG9ydElkQ29sIiwibG9uZ0lkIiwiY29sbGVjdGlvbiIsImJhc2UiLCJyZXBsYWNlIiwiUmVnRXhwIiwibG93ZXJOdW1iZXIiLCJ1cHBlck51bWJlciIsInBhcnNlSW50IiwiTmFOIiwiRXJyb3IiLCJ0b1N0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztB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UUFBQUEsV0FBVyxHQUFHRCxXQUFXLEdBQUcsQ0FBNUI7QUFDQVAsUUFBQUEsVUFBVSxHQUFHUSxXQUFXLENBQUNJLFFBQVosRUFBYjtBQUNELE9BUEQsQ0FPRSxPQUFPL0MsR0FBUCxFQUFZO0FBQ1osZUFBTyxpQ0FBNEJBLEdBQUcsQ0FBQ0MsT0FBaEMsQ0FBUDtBQUNEOztBQUVELFVBQUksQ0FBQzBDLFdBQUwsRUFBa0I7QUFDaEIsZUFBTywyRkFBK0VELFdBQS9FLEVBQVA7QUFDRCxPQTFDaUYsQ0E0Q2xGOzs7QUFDQVAsTUFBQUEsVUFBVSxHQUFHLDBCQUFRQSxVQUFSLEVBQW9CLEdBQXBCLEVBQXlCRCxVQUFVLENBQUNwQixNQUFwQyxDQUFiLENBN0NrRixDQStDbEY7O0FBQ0FvQixNQUFBQSxVQUFVLEdBQUcsMkJBQVNBLFVBQVQsRUFBcUIsR0FBckIsRUFBMEIsQ0FBMUIsQ0FBYjtBQUNBQyxNQUFBQSxVQUFVLEdBQUcsMkJBQVNBLFVBQVQsRUFBcUIsR0FBckIsRUFBMEIsQ0FBMUIsQ0FBYjtBQUdBLGFBQU8sbUNBQThCLENBQUNELFVBQUQsRUFBYUMsVUFBYixDQUE5QixDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IFNvbWVSZXN1bHQsIG1ha2VFcnJvciwgbWFrZVN1Y2Nlc3MsIFJlc3VsdFR5cGUgfSBmcm9tIFwiLi4vdXRpbHMvQXBwUHJvdmlkZXJUeXBlc1wiO1xuLy8gaW1wb3J0IERpY3RUeXBlIGZyb20gXCIuLi91dGlscy9EaWN0VHlwZVwiO1xuLy8gaW1wb3J0IHsgVXNlciwgRGVmYXVsdFVzZXIgfSBmcm9tIFwiLi4vbW9kZWwvVXNlclwiO1xuLy8gaW1wb3J0IFVzZXJTdGF0dXMgZnJvbSBcIi4uL2VudW1zL1VzZXJTdGF0dXNcIjtcbi8vIGltcG9ydCBVc2VyVHlwZSBmcm9tIFwiLi4vZW51bXMvVXNlclR5cGVcIjtcbmltcG9ydCB7IGxlZnRQYWQsIHJpZ2h0UGFkIH0gIGZyb20gJy4uL3V0aWxzL1N0cmluZ1V0aWxzJztcbmltcG9ydCAqIGFzIGFkbWluIGZyb20gXCJmaXJlYmFzZS1hZG1pblwiO1xuaW1wb3J0IHsgQ29sbGVjdGlvblJlZmVyZW5jZSwgRG9jdW1lbnRTbmFwc2hvdCwgUXVlcnlTbmFwc2hvdCwgUXVlcnlEb2N1bWVudFNuYXBzaG90IH0gZnJvbSBcIkBnb29nbGUtY2xvdWQvZmlyZXN0b3JlXCI7XG5pbXBvcnQgeyBzYWZlTG93ZXIgfSBmcm9tIFwiLi4vdXRpbHMvVXRpbHNcIjtcbmltcG9ydCBEaWN0VHlwZSBmcm9tIFwiLi4vdXRpbHMvRGljdFR5cGVcIjtcbmltcG9ydCB7IE1heWJlIH0gZnJvbSBcIi4uL3V0aWxzL01heWJlXCI7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0LXByb21pc2UtbmF0aXZlJztcblxudHlwZSBGaXJlc3RvcmUgPSBhZG1pbi5maXJlc3RvcmUuRmlyZXN0b3JlO1xuXG5cbmV4cG9ydCB0eXBlIFNlYXJjaFBhZ2VQYXJhbXMgPSB7XG4gIGxhc3RWaXNpYmxlPzogRG9jdW1lbnRTbmFwc2hvdCxcbiAgbGltaXQ6IG51bWJlcixcbn1cblxuZXhwb3J0IHR5cGUgU2VhcmNoUmVzdWx0PFQ+ID0ge1xuICByZXN1bHRzOiBULFxuICBwYXJhbXM6IFNlYXJjaFBhZ2VQYXJhbXMsXG59O1xuXG5leHBvcnQgdHlwZSBQYXJ0aWFsUmVzb3VyY2VSZXN1bHQgPSB7XG4gIGlkOiBzdHJpbmcsXG4gIHNob3J0SWQ6IE1heWJlPHN0cmluZz4sXG4gIGdyb3VwczogTWF5YmU8RGljdFR5cGU8c3RyaW5nPj4sXG59XG5cbmV4cG9ydCB0eXBlIFBsYWNlUmVzdWx0ID0ge1xuICBuYW1lOiBzdHJpbmcsXG4gIGNvb3JkczogeyBsYXRpdHVkZTogbnVtYmVyLCBsb25naXR1ZGU6IG51bWJlcn0sXG4gIGJvdW5kaW5nQm94OiBudW1iZXJbXSxcblxufVxuXG5cbmV4cG9ydCBjbGFzcyBTZWFyY2hBcGkgeyBcbiAgcHJpdmF0ZSBmaXJlc3RvcmU6IEZpcmVzdG9yZTtcbiAgcHJpdmF0ZSBvcmdJZDogc3RyaW5nO1xuXG5cbiAgY29uc3RydWN0b3IoZmlyZXN0b3JlOiBGaXJlc3RvcmUsIG9yZ0lkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmZpcmVzdG9yZSA9IGZpcmVzdG9yZTtcbiAgICB0aGlzLm9yZ0lkID0gb3JnSWQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBzZWFyY2hGb3JQbGFjZU5hbWVcbiAgICpcbiAgICogTG9va3VwIGEgcGxhY2UgYmFzZWQgb24gYSBwbGFjZSBuYW1lLiBVc2VzIHRoZSBmcmVlIG5vbWluYXRpbSBhcGkuXG4gICAqIEluIHRoZSBmdXR1cmUsIHdlIGNvdWxkIGV4dGVuZCB0aGlzIGJ5IGFkZGluZyBvdXIgb3duIHBsYWNlcywgc3VjaCBhcyB2aWxsYWdlc1xuICAgKiBcbiAgICogZWc6IGh0dHBzOi8vbm9taW5hdGltLm9wZW5zdHJlZXRtYXAub3JnL3NlYXJjaC9hZGVsYWlkZT9mb3JtYXQ9anNvblxuICAgKlxuICAgKiBAcGFyYW0gYmFzZVVybDogc3RyaW5nXG4gICAqIEBwYXJhbSBwbGFjZU5hbWU6IHN0cmluZyAtIHRoZSBwbGFjZSB3ZSBhcmUgc2VhcmNoaW5nIGZvclxuICAgKiBAcGFyYW0gc2VhcmNoUGFyYW1zOiBTZWFyY2hQYWdlUGFyYW1zIC0gcGFyYW1zIGZvciBwYWdpbmF0aW9uIGFuZCBsaW1pdGluZyBldGMuIERlZmF1bHQgbGltaXQgaXMgMjBcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZWFyY2hGb3JQbGFjZU5hbWUoYmFzZVVybDogc3RyaW5nLCBwbGFjZU5hbWU6IHN0cmluZywgc2VhcmNoUGFyYW1zOiBTZWFyY2hQYWdlUGFyYW1zKTpcbiAgUHJvbWlzZTxTb21lUmVzdWx0PFNlYXJjaFJlc3VsdDxBcnJheTxQbGFjZVJlc3VsdD4+Pj4ge1xuXG4gICAgY29uc3QgbGltaXQgPSBzYWZlTG93ZXIoc2VhcmNoUGFyYW1zLmxpbWl0LCAyMCk7XG5cbiAgICAvLyBodHRwczovL25vbWluYXRpbS5vcGVuc3RyZWV0bWFwLm9yZy9zZWFyY2gvYWRlbGFpZGU/Zm9ybWF0PWpzb25cbiAgICAvL1RPRE86IHByb3BlciBwYXJhbSBwYXJzaW5nIGV0Yy5cbiAgICBjb25zdCB1cmkgPSBgJHtiYXNlVXJsfS8ke3BsYWNlTmFtZX0/Zm9ybWF0PWpzb24mZW1haWw9YWRtaW5AdmVzc2Vsc3RlY2guY29tJmxpbWl0PSR7bGltaXR9YDtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgdXJpLFxuICAgICAganNvbjogdHJ1ZSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHJlcXVlc3Qob3B0aW9ucylcbiAgICAudGhlbigocmVzcG9uc2U6IGFueSkgPT4ge1xuXG4gICAgICAvKlxuICAgICAgICBleGFtcGxlIHJlc3BvbnNlOiB7XG4gICAgICAgICAgcGxhY2VfaWQ6ICc2ODc4MTc5JyxcbiAgICAgICAgICBsaWNlbmNlOiAnRGF0YSDCqSBPcGVuU3RyZWV0TWFwIGNvbnRyaWJ1dG9ycywgT0RiTCAxLjAuIGh0dHBzOi8vb3NtLm9yZy9jb3B5cmlnaHQnLFxuICAgICAgICAgIG9zbV90eXBlOiAnbm9kZScsXG4gICAgICAgICAgb3NtX2lkOiAnNzAzMjIxODc4JyxcbiAgICAgICAgICBib3VuZGluZ2JveDogWyAnMy45MTI2MDI0JywgJzMuOTMyNjAyNCcsICctNzUuMTUzMzQ0MScsICctNzUuMTMzMzQ0MScgXSxcbiAgICAgICAgICBsYXQ6ICczLjkyMjYwMjQnLFxuICAgICAgICAgIGxvbjogJy03NS4xNDMzNDQxJyxcbiAgICAgICAgICBkaXNwbGF5X25hbWU6ICdBZGVsYWlkZSwgT3J0ZWdhLCBUb2xpbWEsIENvbG9tYmlhJyxcbiAgICAgICAgfVxuICAgICAgKi9cblxuICAgICAgY29uc3QgcGxhY2VzOiBQbGFjZVJlc3VsdFtdID0gcmVzcG9uc2UubWFwKChyOiBhbnkpID0+ICh7XG4gICAgICAgIG5hbWU6IHIuZGlzcGxheV9uYW1lLFxuICAgICAgICBjb29yZHM6IHsgbGF0aXR1ZGU6IHBhcnNlRmxvYXQoci5sYXQpLCBsb25naXR1ZGU6IHBhcnNlRmxvYXQoci5sb24pIH0sXG4gICAgICAgIGJvdW5kaW5nQm94OiByLmJvdW5kaW5nYm94Lm1hcCgocG9pbnQ6IHN0cmluZykgPT4gcGFyc2VGbG9hdChwb2ludCkgKSxcbiAgICAgIH0pKVxuICAgICAgLmZpbHRlcigocDogUGxhY2VSZXN1bHQpID0+IHAubmFtZSAhPT0gbnVsbCk7XG5cbiAgICAgIHJldHVybiBtYWtlU3VjY2VzczxTZWFyY2hSZXN1bHQ8QXJyYXk8UGxhY2VSZXN1bHQ+Pj4oe1xuICAgICAgICBwYXJhbXM6IHNlYXJjaFBhcmFtcyxcbiAgICAgICAgcmVzdWx0czogcGxhY2VzLFxuICAgICAgfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycjogRXJyb3IpID0+IG1ha2VFcnJvcjxTZWFyY2hSZXN1bHQ8QXJyYXk8UGxhY2VSZXN1bHQ+Pj4oZXJyLm1lc3NhZ2UpKTtcbiAgIH1cblxuICAvKipcbiAgICogc2VhcmNoRm9yUmVzb3VyY2VJbkdyb3VwXG4gICAqIFxuICAgKiBTZWFyY2ggZm9yIHJlc291cmNlIGdpdmVuIGJhc2VkIG9uIGdyb3VwIG1lbWJlcnNoaXAuIFNvcnRzIHVzaW5nIHdoZXJlIGZpbHRlcnMgb25cbiAgICogdGhlIGZpZWxkLCB0YWtpbmcgYWR2YW50YWdlIG9mIGxleGljb2dyYXBoaWMgc29ydGluZy4gV2UgbmVlZCBhIGJldHRlciBhcHByb2FjaCwgXG4gICAqIGJ1dCBmaXJlYmFzZSBkb2Vzbid0IGFsbG93IGl0IGF0bS5cbiAgICogXG4gICAqIEBwYXJhbSBncm91cFF1ZXJ5OiBzdHJpbmdcbiAgICogQHBhcmFtIGdyb3VwVG9TZWFyY2g6IHN0cmluZyAtIHRoZSBncm91cCB3ZSBhcmUgc2VhcmNoaW5nIGZvclxuICAgKiBAcGFyYW0gc2VhcmNoUGFyYW1zOiBTZWFyY2hQYWdlUGFyYW1zIC0gcGFyYW1zIGZvciBwYWdpbmF0aW9uIGFuZCBsaW1pdGluZyBldGMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2VhcmNoRm9yUmVzb3VyY2VJbkdyb3VwKGdyb3VwUXVlcnk6IHN0cmluZywgZ3JvdXBUb1NlYXJjaDogc3RyaW5nLCBzZWFyY2hQYXJhbXM6IFNlYXJjaFBhZ2VQYXJhbXMpOlxuICBQcm9taXNlPFNvbWVSZXN1bHQ8U2VhcmNoUmVzdWx0PEFycmF5PFBhcnRpYWxSZXNvdXJjZVJlc3VsdD4+Pj4ge1xuXG4gICAgLy9CdWlsZCBiYXNlIHF1ZXJ5XG4gICAgLy9Gb3Igc29tZSByZWFzb24gaGFzIHRvIGJlIGFueVxuICAgIGxldCBxdWVyeTogYW55ID0gU2VhcmNoQXBpLnJlc291cmNlQ29sKHRoaXMuZmlyZXN0b3JlLCB0aGlzLm9yZ0lkKVxuICAgIC53aGVyZShgZ3JvdXBzLiR7Z3JvdXBUb1NlYXJjaH1gLCAnPj0nLCBncm91cFF1ZXJ5KVxuICAgIC53aGVyZShgZ3JvdXBzLiR7Z3JvdXBUb1NlYXJjaH1gLCAnPD0nLCBgJHtncm91cFF1ZXJ5fXpgKSAvL2FwcGVuZCBhIHogdG8gdGFrZSBhZHZhbnRhZ2Ugb2Ygc3RyaW5nIHNvcnRcbiAgICAub3JkZXJCeSgnaWQnKVxuXG4gICAgaWYgKHNlYXJjaFBhcmFtcy5sYXN0VmlzaWJsZSkge1xuICAgICAgcXVlcnkgPSBxdWVyeS5zdGFydEFmdGVyKHNlYXJjaFBhcmFtcy5sYXN0VmlzaWJsZSk7XG4gICAgfVxuICAgIHF1ZXJ5ID0gcXVlcnkubGltaXQoc2FmZUxvd2VyKHNlYXJjaFBhcmFtcy5saW1pdCwgMTAwKSk7XG5cbiAgICAvL1J1biB0aGUgcXVlcnlcbiAgICBsZXQgbGFzdFZpc2libGU6IFF1ZXJ5RG9jdW1lbnRTbmFwc2hvdDtcbiAgICByZXR1cm4gYXdhaXQgcXVlcnkuZ2V0KClcbiAgICAudGhlbigoc246IFF1ZXJ5U25hcHNob3QpID0+IHtcbiAgICAgIGNvbnN0IHF1ZXJ5UmVzdWx0czogUGFydGlhbFJlc291cmNlUmVzdWx0W10gPSBbXTtcbiAgICAgIGxhc3RWaXNpYmxlID0gc24uZG9jc1tzbi5kb2NzLmxlbmd0aCAtIDFdO1xuXG4gICAgICBzbi5mb3JFYWNoKGRvYyA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBkb2MuZGF0YSgpO1xuICAgICAgICBpZiAoZGF0YS5faWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0OiBQYXJ0aWFsUmVzb3VyY2VSZXN1bHQgPSB7XG4gICAgICAgICAgaWQ6IGRhdGEuaWQsXG4gICAgICAgICAgc2hvcnRJZDogdW5kZWZpbmVkLFxuICAgICAgICAgIGdyb3VwczogZGF0YS5ncm91cHMsXG4gICAgICAgIH07XG4gICAgICAgIHF1ZXJ5UmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHF1ZXJ5UmVzdWx0cztcbiAgICB9KVxuICAgIC50aGVuKChyZXN1bHRzOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IHNlYXJjaFJlc3VsdDogU2VhcmNoUmVzdWx0PEFycmF5PFBhcnRpYWxSZXNvdXJjZVJlc3VsdD4+ID0ge1xuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAuLi5zZWFyY2hQYXJhbXMsXG4gICAgICAgICAgbGFzdFZpc2libGUsXG4gICAgICAgIH0sXG4gICAgICAgIHJlc3VsdHMsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIG1ha2VTdWNjZXNzPFNlYXJjaFJlc3VsdDxBcnJheTxQYXJ0aWFsUmVzb3VyY2VSZXN1bHQ+Pj4oc2VhcmNoUmVzdWx0KTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyOiBFcnJvcikgPT4gbWFrZUVycm9yPFNlYXJjaFJlc3VsdDxBcnJheTxQYXJ0aWFsUmVzb3VyY2VSZXN1bHQ+Pj4oZXJyLm1lc3NhZ2UpKTtcbiAgfVxuXG5cblxuXG4gIC8qKlxuICAgKiBzZWFyY2hCeVNob3J0SWRcbiAgICogXG4gICAqIFNlYXJjaCBmb3IgYSByZXNvdXJjZSBnaXZlbiBhIHNob3J0SWQgb3Igc2hvcnRJZCBmcmFnbWVudFxuICAgKiBcbiAgICogQHBhcmFtIHNob3J0SWRRdWVyeTogc3RyaW5nIC0gYSA2IGRpZ2l0IG9yIDkgZGlnaXQgc2hvcnRJZCwgb3Igc2hvcnRJZCBmcmFnbWVudFxuICAgKiBAcGFyYW0gc2VhcmNoUGFyYW1zOiBTZWFyY2hQYWdlUGFyYW1zIC0gcGFyYW1zIGZvciBwYWdpbmF0aW9uIGFuZCBsaW1pdGluZyBldGMuXG4gICAqIEByZXR1cm5zIFByb21pc2U8U29tZVJlc3VsdDxTZWFyY2hSZXN1bHQ+PiAtIFBhcnRpYWxSZXNvdXJjZVJlc3VsdFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlYXJjaEJ5U2hvcnRJZChzaG9ydElkUXVlcnk6IHN0cmluZywgc2VhcmNoUGFyYW1zOiBTZWFyY2hQYWdlUGFyYW1zKTogXG4gIFByb21pc2U8U29tZVJlc3VsdDxTZWFyY2hSZXN1bHQ8QXJyYXk8UGFydGlhbFJlc291cmNlUmVzdWx0Pj4+PiB7XG5cbiAgICBjb25zdCBzZWFyY2hSYW5nZVJlc3VsdCA9IFNlYXJjaEFwaS5yYW5nZUZyb21TaG9ydElkU3RyaW5nKHNob3J0SWRRdWVyeSk7XG4gICAgaWYgKHNlYXJjaFJhbmdlUmVzdWx0LnR5cGUgPT09IFJlc3VsdFR5cGUuRVJST1IpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc2VhcmNoUmFuZ2VSZXN1bHQpO1xuICAgIH1cbiAgICBjb25zdCBbbG93ZXJSYW5nZSwgdXBwZXJSYW5nZV0gPSBzZWFyY2hSYW5nZVJlc3VsdC5yZXN1bHQ7XG5cbiAgICAvL0J1aWxkIGJhc2UgcXVlcnlcbiAgICAvL0ZvciBzb21lIHJlYXNvbiBoYXMgdG8gYmUgYW55XG4gICAgbGV0IHF1ZXJ5OiBhbnkgPSBTZWFyY2hBcGkuc2hvcnRJZENvbCh0aGlzLmZpcmVzdG9yZSwgdGhpcy5vcmdJZCk7XG4gICAgXG4gICAgaWYgKGxvd2VyUmFuZ2UgIT09IHVwcGVyUmFuZ2UpIHtcbiAgICAgIHF1ZXJ5ID0gcXVlcnkud2hlcmUoJ2lkJywgJz49JywgbG93ZXJSYW5nZSkud2hlcmUoJ2lkJywgJzwnLCB1cHBlclJhbmdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcXVlcnkgPSBxdWVyeS53aGVyZSgnaWQnLCAnPT0nLCBsb3dlclJhbmdlKTtcbiAgICB9XG5cbiAgICBxdWVyeSA9IHF1ZXJ5Lm9yZGVyQnkoJ2lkJyk7XG4gICAgaWYgKHNlYXJjaFBhcmFtcy5sYXN0VmlzaWJsZSkge1xuICAgICAgcXVlcnkgPSBxdWVyeS5zdGFydEFmdGVyKHNlYXJjaFBhcmFtcy5sYXN0VmlzaWJsZSk7XG4gICAgfVxuXG4gICAgLy9NYXggbGltaXQgaXMgMTAwXG4gICAgcXVlcnkgPSBxdWVyeS5saW1pdChzYWZlTG93ZXIoc2VhcmNoUGFyYW1zLmxpbWl0LCAxMDApKTtcblxuICAgIC8vUnVuIHRoZSBxdWVyeVxuICAgIGxldCBsYXN0VmlzaWJsZTogUXVlcnlEb2N1bWVudFNuYXBzaG90O1xuICAgIHJldHVybiBhd2FpdCBxdWVyeS5nZXQoKVxuICAgIC50aGVuKChzbjogUXVlcnlTbmFwc2hvdCkgPT4geyAgXG4gICAgICBjb25zdCBxdWVyeVJlc3VsdHM6IFBhcnRpYWxSZXNvdXJjZVJlc3VsdFtdID0gW107XG4gICAgICBsYXN0VmlzaWJsZSA9IHNuLmRvY3Nbc24uZG9jcy5sZW5ndGggLSAxXTtcblxuICAgICAgc24uZm9yRWFjaChkb2MgPT4ge1xuICAgICAgICBjb25zdCBkYXRhID0gZG9jLmRhdGEoKTtcbiAgICAgICAgaWYgKGRhdGEuX2lkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdDogUGFydGlhbFJlc291cmNlUmVzdWx0ID0ge1xuICAgICAgICAgIGlkOiBkYXRhLmxvbmdJZCxcbiAgICAgICAgICBzaG9ydElkOiBkYXRhLnNob3J0SWQsXG4gICAgICAgICAgZ3JvdXBzOiB1bmRlZmluZWQsXG4gICAgICAgIH07XG4gICAgICAgIHF1ZXJ5UmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHF1ZXJ5UmVzdWx0cztcbiAgICB9KVxuICAgIC50aGVuKChyZXN1bHRzOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IHNlYXJjaFJlc3VsdDogU2VhcmNoUmVzdWx0PEFycmF5PFBhcnRpYWxSZXNvdXJjZVJlc3VsdD4+ID0ge1xuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAuLi5zZWFyY2hQYXJhbXMsXG4gICAgICAgICAgbGFzdFZpc2libGUsXG4gICAgICAgIH0sXG4gICAgICAgIHJlc3VsdHMsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIG1ha2VTdWNjZXNzPFNlYXJjaFJlc3VsdDxBcnJheTxQYXJ0aWFsUmVzb3VyY2VSZXN1bHQ+Pj4oc2VhcmNoUmVzdWx0KTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyOiBFcnJvcikgPT4gbWFrZUVycm9yPFNlYXJjaFJlc3VsdDxBcnJheTxQYXJ0aWFsUmVzb3VyY2VSZXN1bHQ+Pj4oZXJyLm1lc3NhZ2UpKTtcbiAgfVxuXG5cbiAgLy9cbiAgLy8gSGVscGVyc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICBwdWJsaWMgc3RhdGljIHNob3J0SWRDb2woZmlyZXN0b3JlOiBGaXJlc3RvcmUsIG9yZ0lkOiBzdHJpbmcpOiBDb2xsZWN0aW9uUmVmZXJlbmNlIHtcbiAgICByZXR1cm4gZmlyZXN0b3JlLmNvbGxlY3Rpb24oJ29yZycpLmRvYyhvcmdJZCkuY29sbGVjdGlvbignc2hvcnRJZCcpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyByZXNvdXJjZUNvbChmaXJlc3RvcmU6IEZpcmVzdG9yZSwgb3JnSWQ6IHN0cmluZyk6IENvbGxlY3Rpb25SZWZlcmVuY2Uge1xuICAgIHJldHVybiBmaXJlc3RvcmUuY29sbGVjdGlvbignb3JnJykuZG9jKG9yZ0lkKS5jb2xsZWN0aW9uKCdyZXNvdXJjZScpO1xuICB9XG5cblxuICAvKipcbiAgICogcmFuZ2VGcm9tU2hvcnRJZFN0cmluZ1xuICAgKiBcbiAgICogXG4gICAqIFRyYW5zZm9ybSB0aGUgc2hvcnRJZCBvciBzaG9ydElkIHBhcnRpYWwgaW50byBhIHNlYXJjaGFibGUgc3RyaW5nLiBGb3IgZXhhbXBsZTpcbiAgICogXG4gICAqICAgMTAwLTAwMCAgLT4gMDAwMTAwMDAwLCAwMDAxMDAwMDAgfCBleGFjdGx5IGlkIDAwMC0xMDAtMDAwXG4gICAqICAgMTAwICAgICAgLT4gMDAwMTAwMDAwLCAwMDAxMDEwMDAgfCBhbnkgc2hvcnRJZCBzdGFydGluZyB3aXRoIDAwMC0xMDBcbiAgICogICAxMDAxICAgICAtPiAwMDAxMDAxMDAsIDAwMDEwMDIwMCB8IEFueSBzaG9ydCBpZCBiZXR3ZWVuIDAwMC0xMDAtMTAwIGFuZCAwMDAtMTAwLTIwMFxuICAgKiAgIDAwMDEwMDAxIC0+IDAwMDEwMDAxMCwgMDAwMTAwMDIwIHwgQW55IHNob3J0IGlkIGJldHdlZW4gMDAwLTEwMC0wMTAgYW5kIDAwMC0xMDAtMDIwXG4gICAqIFxuICAgKiBcbiAgICogQHBhcmFtIHNob3J0SWQ6IHNob3J0SWQgc3RyaW5nIG9yIHBhcnRpYWwgc3RyaW5nXG4gICAqIEByZXR1cm5zIFNvbWVSZXN1bHQ8W3N0cmluZywgc3RyaW5nXT46IHRoZSByYW5nZSBvZiBzdHJpbmdzIHRvIHNlYXJjaCBmb3IuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHJhbmdlRnJvbVNob3J0SWRTdHJpbmcoc2hvcnRJZDogc3RyaW5nKTogU29tZVJlc3VsdDxbc3RyaW5nLCBzdHJpbmddPiB7XG4gICAgbGV0IGxvd2VyUmFuZ2U6IHN0cmluZyA9IFwiXCI7XG4gICAgbGV0IHVwcGVyUmFuZ2U6IHN0cmluZyA9IFwiXCI7XG5cbiAgICAvL1N0cmlwIG91dCBhbGwgc3BhY2VzLCBkYXNoZXMsIGV0Y1xuICAgIGxldCBiYXNlID0gc2hvcnRJZC5yZXBsYWNlKG5ldyBSZWdFeHAoL1teXFxkXSsvLCAnZycpLCAnJyk7XG5cbiAgICAvL01ha2Ugc3VyZSBpdCdzIHdpdGhpbiB0aGUgcmFuZ2VcbiAgICBpZiAoYmFzZS5sZW5ndGggPT09IDAgfHwgYmFzZS5sZW5ndGggPiA5KSB7XG4gICAgICByZXR1cm4gbWFrZUVycm9yPFtzdHJpbmcsIHN0cmluZ10+KFwic2VhcmNoIHNob3J0IGlkIGlzIHRvbyBsb25nIG9yIHNob3J0XCIpO1xuICAgIH1cblxuICAgIC8vSWYgaXQncyBzaG9ydGVyIHRoYW4gNiBkaWdpdHMsIGxvbmcsIGFzc3VtZSB3ZSBoYXZlIGFuIGV4dHJhIHRocmVlIDAwMHMgYXRcbiAgICAvL3RoZSBzdGFydC4gVGhpcyBtYXkgYnJlYWsgdGhpbmdzIGxhdGVyIG9uLCBidXQgb25seSB3aGVuIHdlIGhhdmUgNTMwLDAwMCsgaWRzXG4gICAgaWYgKGJhc2UubGVuZ3RoIDw9IDYpIHtcbiAgICAgIGJhc2UgPSBcIjAwMFwiICsgYmFzZTtcbiAgICB9XG5cbiAgICAvL0lmIHdlIGFyZSB1c2luZyBhIGZ1bGxJZCwgdGhlbiBqdXN0IHJldHVybiB0aGF0IGlkIHR3aWNlXG4gICAgaWYgKGJhc2UubGVuZ3RoID09PSA5KSB7XG4gICAgICByZXR1cm4gbWFrZVN1Y2Nlc3M8W3N0cmluZywgc3RyaW5nXT4oW2Jhc2UsIGJhc2VdKTtcbiAgICB9XG5cbiAgICAvL1dlIGhhdmUgYSBwYXJ0aWFsIHNob3J0IGlkLlxuICAgIC8vVGhpcyBtZWFucyB3ZSBuZWVkIHRvIGNvbnZlcnQgaXQgaW50byBhIG51bWJlciBhbmQgYWRkIG9uZSwgdGhlbiBjb252ZXJ0XG4gICAgLy9iYWNrIGFuZCBhZGQgYW55IGxlZnQgemVyb3Mgd2UgbWF5IGhhdmUgcmVtb3ZlZC5cbiAgICBsb3dlclJhbmdlID0gYmFzZTtcbiAgICBsZXQgbG93ZXJOdW1iZXJcbiAgICBsZXQgdXBwZXJOdW1iZXI7XG4gICAgdHJ5IHtcbiAgICAgIGxvd2VyTnVtYmVyID0gcGFyc2VJbnQobG93ZXJSYW5nZSk7XG4gICAgICBpZiAobG93ZXJOdW1iZXIgPT09IE5hTikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIHBhcnNpbmcgc2hvcnRJZCBiYXNlIHN0cmluZzogJHtsb3dlck51bWJlcn1gKTtcbiAgICAgIH1cbiAgICAgIHVwcGVyTnVtYmVyID0gbG93ZXJOdW1iZXIgKyAxO1xuICAgICAgdXBwZXJSYW5nZSA9IHVwcGVyTnVtYmVyLnRvU3RyaW5nKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gbWFrZUVycm9yPFtzdHJpbmcsIHN0cmluZ10+KGVyci5tZXNzYWdlKTtcbiAgICB9XG5cbiAgICBpZiAoIXVwcGVyTnVtYmVyKSB7XG4gICAgICByZXR1cm4gbWFrZUVycm9yPFtzdHJpbmcsIHN0cmluZ10+KGBFcnJvciBwYXJzaW5nIHNob3J0SWQgYmFzZSBzdHJpbmcgYW5kIGFkZGluZyAxOiAke2xvd2VyTnVtYmVyfWApO1xuICAgIH1cblxuICAgIC8vUGFkIHRoZSBsZWZ0IHNpZGUgb2YgdGhlIHN0cmluZyB0byBnZXQgdGhlIGxlYWRpbmcgMDAncyBiYWNrXG4gICAgdXBwZXJSYW5nZSA9IGxlZnRQYWQodXBwZXJSYW5nZSwgJzAnLCBsb3dlclJhbmdlLmxlbmd0aCk7XG5cbiAgICAvL1BhZCB0aGUgcmlnaHQgaGFuZCBzaWRlIHRvIG1ha2UgYSA5IGRpZ2l0IG51bWJlclxuICAgIGxvd2VyUmFuZ2UgPSByaWdodFBhZChsb3dlclJhbmdlLCAnMCcsIDkpO1xuICAgIHVwcGVyUmFuZ2UgPSByaWdodFBhZCh1cHBlclJhbmdlLCAnMCcsIDkpO1xuXG5cbiAgICByZXR1cm4gbWFrZVN1Y2Nlc3M8W3N0cmluZywgc3RyaW5nXT4oW2xvd2VyUmFuZ2UsIHVwcGVyUmFuZ2VdKTtcbiAgfVxufSJdfQ==