var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('recruiter', { title: 'Recruteur Pannel' });
});

module.exports = router;