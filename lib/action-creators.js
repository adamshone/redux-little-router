'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeCurrentLocation = exports.locationDidChange = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actionTypes = require('./action-types');

var locationDidChange = exports.locationDidChange = function locationDidChange(_ref) {
  var location = _ref.location,
      matchRoute = _ref.matchRoute;

  // Extract the pathname so that we don't match against the basename.
  // This avoids requiring basename-hardcoded routes.
  var hash = location.hash;
  var pathname = location.pathname;

  // TM Hack to support the back button when the basename is set to #

  if (pathname === '/' && hash.indexOf('#') === 0) {
    pathname = hash.substring(1);
    location.pathname = pathname;
    location.basename = '#';
    location.hash = '';
  }

  return {
    type: _actionTypes.LOCATION_CHANGED,
    payload: _extends({}, location, matchRoute(pathname))
  };
};

var initializeCurrentLocation = exports.initializeCurrentLocation = function initializeCurrentLocation(location) {
  return {
    type: _actionTypes.LOCATION_CHANGED,
    payload: location
  };
};