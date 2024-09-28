
/* API services */
const middleware = require('http/middleware');
const userApi = require('http/rest/user.api');
// const complaintsApi = require('http/rest/complaint.api');

module.exports = ({app}) => {
  /* Pre API middleware */
  app.use(middleware.parseQueryBooleansApi);
  /* Endpoints */
  app.post('/users', userApi.createUserEndpoint);
  // app.post('/complaints', complaintsApi.createComplaintEndpoint);
  /* Reject */
  app.use(middleware.handleUnknownUrlApi);
};
