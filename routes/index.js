var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '직거래이사서비스' });
});

/* GET home page. */
router.get('/include/policy', function(req, res, next) {
  res.render('include/policy');
});







module.exports = router;
