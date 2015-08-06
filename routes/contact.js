var express = require('express');
var nodemailer = require('nodemailer');

var router = express.Router();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kyleturco@gmail.com',
        pass: 'process.env.PASS'
    }
});

router.get('/', function (req, res) {
  res.render('templates/contact');
})

router.post('/send', function(req, res){
  console.log(req.body);
  transporter.sendMail({
    from: req.body.email,
    to: 'kyleturco@gmail.com',
    subject: req.body.name,
    text: req.body.message
  }, function(err, info){
    if(err){
      console.log(err);
    }else{
      console.log(info);
    }
  });
  res.redirect('/');
})

module.exports = router;
