'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createHashHistory = require('history/lib/createHashHistory');

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _useBasename = require('history/lib/useBasename');

var _useBasename2 = _interopRequireDefault(_useBasename);

var _useQueries = require('history/lib/useQueries');

var _useQueries2 = _interopRequireDefault(_useQueries);

var _storeEnhancer = require('./store-enhancer');

var _storeEnhancer2 = _interopRequireDefault(_storeEnhancer);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next: unstubbable! */
var realLocation = function realLocation() {
  return window.location;
};

exports.default = function (_ref) {
  var routes = _ref.routes;
  var basename = _ref.basename;
  var _ref$hashType = _ref.hashType;
  var hashType = _ref$hashType === undefined ? 'slash' : _ref$hashType;
  var _ref$getLocation = _ref.getLocation;
  var getLocation = _ref$getLocation === undefined ? realLocation : _ref$getLocation;
  var _ref$passRouterStateT = _ref.passRouterStateToReducer;
  var passRouterStateToReducer = _ref$passRouterStateT === undefined ? false : _ref$passRouterStateT;

  var history = (0, _useBasename2.default)((0, _useQueries2.default)(_createHashHistory2.default))({
    basename: basename,
    hashType: hashType
  });

  var _getLocation = getLocation();

  var pathname = _getLocation.pathname;
  var search = _getLocation.search;

  var location = history.createLocation({ pathname: pathname, search: search });

  return {
    routerEnhancer: (0, _storeEnhancer2.default)({
      routes: routes,
      history: history,
      location: location,
      passRouterStateToReducer: passRouterStateToReducer
    }),
    routerMiddleware: (0, _middleware2.default)({ history: history })
  };
};