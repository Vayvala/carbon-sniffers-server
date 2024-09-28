
/* API services */
const middleware = require('http/middleware');
const userApi = require('http/rest/user.api');

module.exports = ({app}) => {
  /* Pre API middleware */
  app.use(middleware.parseQueryBooleansApi);
  /* Endpoints */
  app.post('/users', userApi.createUserEndpoint);
  /* Reject */
  app.use(middleware.handleUnknownUrlApi);
};
