var express = require('express');
var router = express.Router();
/* 간편이사 */
var easy = require('../models/easyinsert');

/* GET home page. */
router.get('/', function(req, res) {
  // var limitSize = 20;
  // limit(limitSize).
  easy.find({deleted:false}).sort({date:-1}).exec(function(err, contents) {
      // db에서 날짜 순으로 데이터들을 가져옴
      if(err) throw err;
      res.render('index', {  contents: contents });
    });
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
