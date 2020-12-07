'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  permit: function permit() {
    for (var _len = arguments.length, permittedRoles = Array(_len), _key = 0; _key < _len; _key++) {
      permittedRoles[_key] = arguments[_key];
    }

    return function (request, response, next) {
      var user = request.user;


      if (user && permittedRoles.includes(user.role)) {
        next();
      } else {
        response.status(403).json({
          error: {
            status: 403,
            code: 'AUT_03',
            message: 'Permission denied'
          }
        });
      }
    };
  }
};