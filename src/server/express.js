
/* NPM modules */
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
// const https = require('https');
const nocache = require('nocache');

/* Constants */
const {
  ENV,
  SERVER_PORT,
  WEBAPP_URLS,
  PRODUCTION,
} = require('configs');
const methods = ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'];

module.exports = function() {
  const app = express();

  app.enable('trust proxy');
  app.disable('x-powered-by');

  const corsOptions = {origin: WEBAPP_URLS, methods};
  app.use(cors(ENV === PRODUCTION ? corsOptions : {}));

  app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });
  app.use(bodyParser.json({
    verify: (req, res, buffer) => req.rawBody = buffer
  }));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(compression({level: 9}));

  app.use(helmet());
  app.use(nocache());

  require('http/routes')({app});

  console.log(`Mode: ${ENV}`);

  const server = http.createServer(app).listen(SERVER_PORT, serverCallback);

  function serverCallback(err) {
    if (err) return console.log(err);
    const {address, port} = server.address();
    const protocol = ENV === PRODUCTION ? 'https' : 'http';
    const hostname = address === '::' ? 'localhost' : address;
    console.log(`Server listening on ${protocol}://${hostname}:${port}`);
  }

  return server;
};
