var express = require('express');
var router = express.Router();

/* GET sub02 page */
router.get('/sub03_01_01', function(req, res, next) {
    res.render('sub03/sub03_01_01', { title: '이사계약' });
});

router.get('/sub03_01_02', function(req, res, next) {
    res.render('sub03/sub03_01_02', { title: '이사·화물 요금지불' });
});

router.get('/sub03_02_01', function(req, res, next) {
    res.render('sub03/sub03_02_01', { title: '짐내놓기' });
});

router.get('/sub03_02_02', function(req, res, next) {
    res.render('sub03/sub03_02_02', { title: '부동산계약서' });
});

router.get('/sub03_02_03', function(req, res, next) {
    res.render('sub03/sub03_02_03', { title: '부동산 중개수수료' });
});

router.get('/sub03_02_04', function(req, res, next) {
    res.render('sub03/sub03_02_04', { title: '이삿날/손없는날' });
});

router.get('/sub03_02_05', function(req, res, next) {
    res.render('sub03/sub03_02_05', { title: '이사업체선정' });
});

router.get('/sub03_02_06', function(req, res, next) {
    res.render('sub03/sub03_02_06', { title: '이사진행' });
});

router.get('/sub03_02_07', function(req, res, next) {
    res.render('sub03/sub03_02_07', { title: '일정별 체크리스트' });
});

router.get('/sub03_02_07_print', function(req, res, next) {
    res.render('sub03/sub03_02_07_print', { title: '일정별 체크리스트' });
});

module.exports = router;
