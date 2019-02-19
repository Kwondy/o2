var express = require('express');
var router = express.Router();
/* 청소서비스신청 */
var easy = require('../models/easyinsert');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '직거래이사서비스' });
});

/* GET home page. */
router.get('/include/policy', function(req, res, next) {
  res.render('include/policy');
});


router.post('/easy_insert', function(req, res, next) {

  easy.create(req.body, function (err, post) {
      if(err) return res.json(err);
      return res.redirect("/");
  });
  // res.render('sub02_02_01', { title: '포장이사견적/신청' });
});





module.exports = router;
