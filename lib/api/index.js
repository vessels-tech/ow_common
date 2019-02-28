"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("@babel/polyfill");

var _UserApi = require("./UserApi");

Object.keys(_UserApi).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _UserApi[key];
    }
  });
});

var _ResourceApi = require("./ResourceApi");

Object.keys(_ResourceApi).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ResourceApi[key];
    }
  });
});

var _SearchApi = require("./SearchApi");

Object.keys(_SearchApi).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SearchApi[key];
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBRUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJAYmFiZWwvcG9seWZpbGxcIjtcblxuZXhwb3J0ICogZnJvbSAnLi9Vc2VyQXBpJztcbmV4cG9ydCAqIGZyb20gJy4vUmVzb3VyY2VBcGknO1xuZXhwb3J0ICogZnJvbSAnLi9TZWFyY2hBcGknOyJdfQ==