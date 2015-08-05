var fs = require('fs');

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser')

var app = express();

// require('./lib/secrets');

app.set('view engine', 'ejs');
app.set('case sensitive routing', true);

app.locals.title = '| The Wonders';

//Routes
var main = require('./routes/main');
var about = require('./routes/about');
var contact = require('./routes/contact');

app.use('/', main);
app.use('/about', about);
app.use('/contact', contact);

app.use(function (req, res) {
  res.status(403).send('Unauthorized!');
});

app.use(function (err, req, res, next) {
  res.status(500).send('My Bad');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%d', host, port);
});

module.exports = app;
