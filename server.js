/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const express = require('express');
const serverPort = process.env.PORT || 3001;
const environment = process.env.NODE_ENV || 'development';

// construct a mini server
const app = express();

// we force a redirect to "https://" only during production
if (environment === 'production') {
  app.use(function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.hostname}${req.url}`);
    }
    next();
  });
}

// allow static assets to be served from the /build folder. Only HTML will be served from there,
// the rest will be served from the CDN
app.use(express.static(path.join(path.resolve(), 'build')));

// resolve all requests to the index.html file
// eslint-disable-next-line
app.get('*', function (req, res) {
  res.sendFile(path.join(path.resolve(), 'build/index.html'));
});

// initialize server
app.listen(serverPort, function () {
  console.log(`Listening on port ${serverPort}`);
});
