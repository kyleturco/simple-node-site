var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('templates/main',
  {
    welcome: 'Thanks for coming'
  })
});

module.exports = router;
