"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.safeLower = safeLower;

/**
 * Get the lower of two values.
 * if maybe is undefined, return the lowervalue
 * 
 * @param maybe 
 * @param lowerValue 
 */
function safeLower(maybe, lowerValue) {
  if (!maybe) {
    return lowerValue;
  }

  if (maybe > lowerValue) {
    return lowerValue;
  }

  return maybe;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9VdGlscy50cyJdLCJuYW1lcyI6WyJzYWZlTG93ZXIiLCJtYXliZSIsImxvd2VyVmFsdWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7Ozs7OztBQU9PLFNBQVNBLFNBQVQsQ0FBbUJDLEtBQW5CLEVBQXFEQyxVQUFyRCxFQUFpRjtBQUN0RixNQUFJLENBQUNELEtBQUwsRUFBWTtBQUNWLFdBQU9DLFVBQVA7QUFDRDs7QUFFRCxNQUFJRCxLQUFLLEdBQUdDLFVBQVosRUFBd0I7QUFDdEIsV0FBT0EsVUFBUDtBQUNEOztBQUVELFNBQU9ELEtBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIlxuXG4vKipcbiAqIEdldCB0aGUgbG93ZXIgb2YgdHdvIHZhbHVlcy5cbiAqIGlmIG1heWJlIGlzIHVuZGVmaW5lZCwgcmV0dXJuIHRoZSBsb3dlcnZhbHVlXG4gKiBcbiAqIEBwYXJhbSBtYXliZSBcbiAqIEBwYXJhbSBsb3dlclZhbHVlIFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FmZUxvd2VyKG1heWJlOiBudW1iZXIgfCB1bmRlZmluZWQgfCBudWxsLCBsb3dlclZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICBpZiAoIW1heWJlKSB7XG4gICAgcmV0dXJuIGxvd2VyVmFsdWU7XG4gIH1cblxuICBpZiAobWF5YmUgPiBsb3dlclZhbHVlKSB7XG4gICAgcmV0dXJuIGxvd2VyVmFsdWU7XG4gIH1cblxuICByZXR1cm4gbWF5YmU7XG59Il19