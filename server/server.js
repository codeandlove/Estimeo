const bodyParser = require('body-parser');
const express = require('express');
const compression = require('compression');
const fs = require('fs');
const historyApiFallback = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../config/config');
const webpackConfig = require('../webpack.config');

const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 8080;
const data_setup = require('./boot/data_setup.js');
const passport = require('passport');
const Raven = require('raven');

// Configuration
// ================================================================================================

// Set up Mongoose
mongoose.connect(config.db, { useMongoClient: true });
mongoose.Promise = global.Promise;

const app = express();

// Gzip
app.use(compression());

//Setup Sentry
// Must configure Raven before doing anything else with it
Raven.config(config.sentry_dsn).install();
// The request handler must be the first middleware on the app
app.use(Raven.requestHandler());
// The error handler must be before any other error middleware
app.use(Raven.errorHandler());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API routes
require('./routes')(app);

// Use the passport (authentication middleware) package
app.use(passport.initialize());

if (isDev) {
  const compiler = webpack(webpackConfig);

  app.use(
    historyApiFallback({
      verbose: false
    })
  );

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      contentBase: path.resolve(__dirname, '../client/public'),
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    })
  );

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '..', 'dist')));
} else {
  app.use(express.static(path.resolve(__dirname, '..', 'dist')));
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
  });
}

data_setup.setup();

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + '\n');
});

app.listen(port, err => {
  if (err) {
    console.log(err);
  }

  console.info('The magic is happening on port', port);
});

module.exports = app;
