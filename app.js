import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import path from 'path'
import config from 'config'

/**
 * get all models
 */
let model = require('app/model');

/**
 * Load fixtures
 */
require('app/fixtures')(model);

let app = module.exports = express();
app.set('port', config.port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes
 */
require('app/routes.js')(app, model);

/**
 * webpack dev server
 */

console.log(config);

if ( config.env === 'development' ) {
  require('./devServer')(app);
} else {
  // Redirect all non api requests to the index
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

// Starting express server
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});