

var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose');

var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
     env = process.env.NODE_ENV || 'development';
/*var mongodbUri = 'mongodb://heroku_941xhfzx:3dptdg0233sh90n58mtjd01haj@ds015928.mlab.com:15928/heroku_941xhfzx';

mongoose.connect(mongodbUri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
*/

mongoose.connect('mongodb://meghna:123@ds011883.mlab.com:11883/heroku_d15nfxnz');
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

//require('./models/article');

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
var app = express();

require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' +config.port);
});

