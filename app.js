var fs = require('fs');
var express = require('express');
var lessCSS = require('less-middleware');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var routes = require('./routes/main');
var about = require('./routes/about');
var contact = require('./routes/contact');

var app = express();
