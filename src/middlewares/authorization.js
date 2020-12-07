export default {
  permit(...permittedRoles) {
    return (request, response, next) => {
      const { user } = request;

      if (user && permittedRoles.includes(user.role)) {
        next();
      } else {
        response.status(403).json({
          error: {
            status: 403,
            code: 'AUT_03',
            message: 'Permission denied',
          }
        });
      }
    };
  }
};
