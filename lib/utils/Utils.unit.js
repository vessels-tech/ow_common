"use strict";

require("mocha");

var assert = _interopRequireWildcard(require("assert"));

var _Utils = require("./Utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

describe('Search Api', function () {
  this.timeout(5000);
  it('safeLower gets the lower number when undefined', function () {
    //Arrange
    var expected = 100; //Act

    var result = (0, _Utils.safeLower)(undefined, 100); //Assert

    assert.equal(result, expected);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9VdGlscy51bml0LnRzIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwidGltZW91dCIsIml0IiwiZXhwZWN0ZWQiLCJyZXN1bHQiLCJ1bmRlZmluZWQiLCJhc3NlcnQiLCJlcXVhbCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFHQTs7OztBQUtBQSxRQUFRLENBQUMsWUFBRCxFQUFlLFlBQVk7QUFDakMsT0FBS0MsT0FBTCxDQUFhLElBQWI7QUFFQUMsRUFBQUEsRUFBRSxDQUFDLGdEQUFELEVBQW1ELFlBQU07QUFDekQ7QUFDQSxRQUFNQyxRQUFRLEdBQUcsR0FBakIsQ0FGeUQsQ0FJekQ7O0FBQ0EsUUFBTUMsTUFBTSxHQUFHLHNCQUFVQyxTQUFWLEVBQXFCLEdBQXJCLENBQWYsQ0FMeUQsQ0FPekQ7O0FBQ0FDLElBQUFBLE1BQU0sQ0FBQ0MsS0FBUCxDQUFhSCxNQUFiLEVBQXFCRCxRQUFyQjtBQUNELEdBVEMsQ0FBRjtBQVVELENBYk8sQ0FBUiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnbW9jaGEnO1xuaW1wb3J0ICogYXMgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG4vL0B0cy1pZ25vcmVcbmltcG9ydCBNb2NrRmlyZXN0b3JlIGZyb20gJ21vY2stY2xvdWQtZmlyZXN0b3JlJztcbmltcG9ydCB7IHNhZmVMb3dlciB9IGZyb20gJy4vVXRpbHMnO1xuXG5cblxuXG5kZXNjcmliZSgnU2VhcmNoIEFwaScsIGZ1bmN0aW9uICgpIHtcbiAgdGhpcy50aW1lb3V0KDUwMDApO1xuXG4gIGl0KCdzYWZlTG93ZXIgZ2V0cyB0aGUgbG93ZXIgbnVtYmVyIHdoZW4gdW5kZWZpbmVkJywgKCkgPT4ge1xuICAgIC8vQXJyYW5nZVxuICAgIGNvbnN0IGV4cGVjdGVkID0gMTAwO1xuXG4gICAgLy9BY3RcbiAgICBjb25zdCByZXN1bHQgPSBzYWZlTG93ZXIodW5kZWZpbmVkLCAxMDApO1xuXG4gICAgLy9Bc3NlcnRcbiAgICBhc3NlcnQuZXF1YWwocmVzdWx0LCBleHBlY3RlZClcbiAgfSk7XG59KTsiXX0=