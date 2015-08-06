var fs = require('fs');

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var lessCSS = require('less-middleware');

var app = express();

app.use(lessCSS('public'));
app.use(bodyParser.urlencoded({extended: true}));

var logStream = fs.createWriteStream('access.log', {flags: 'a'});
app.use(morgan('combined', {stream: logStream}));
app.use(morgan('dev'));

app.use(function (req, res, next) {
  var client = require('./lib/loggly.js')('incoming');
  client.log({
    ip: req.ip,
    date: new Date(),
    url: req.url,
    method: req.method,
    status: res.statusCode
  });
  next();
});

require('./lib/secrets');

app.set('view engine', 'ejs');
app.set('case sensitive routing', true);

app.locals.title = 'Wonders';

//Routes
var main = require('./routes/main');
var about = require('./routes/about');
var contact = require('./routes/contact');

app.use('/', main);
app.use('/about', about);
// app.use('/contact', contact);

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
