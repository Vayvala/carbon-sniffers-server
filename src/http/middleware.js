
/* Services */
const wrap = require('http/error-handle').wrap;

module.exports = {
  parseQueryBooleansApi: (req, res, next) => wrap({req, res, next}, parseQueryBooleansApi, 'middleware'),
  handleUnknownUrlApi: (req, res, next) => wrap({req, res, next}, handleUnknownUrlApi, 'middleware'),
};

function handleUnknownUrlApi() {
  throw new Error('There is no API endpoint matching this URL');
}

function parseQueryBooleansApi({req, next}) {
  for (const key of Object.keys(req.query)) {
    if (req.query[key] === 'false') req.query[key] = false;
    if (req.query[key] === 'true') req.query[key] = true;
  }
  return next();
}
