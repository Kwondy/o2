var express = require('express');
var router = express.Router();

/* GET sub01 page */
router.get('/sub01_01_01', function(req, res, next) {
    res.render('sub01_01_01', { title: '직거래이사서비스' });
});

router.get('/sub01_01_02', function(req, res, next) {
    res.render('sub01_01_02', { title: '이사품질관리' });
});

router.get('/sub01_01_03', function(req, res, next) {
    res.render('sub01_01_03', { title: '차량소개' });
});

router.get('/sub01_01_04', function(req, res, next) {
    res.render('sub01_01_04', { title: '포장박스안내' });
});

router.get('/sub01_01_05', function(req, res, next) {
    res.render('sub01_01_05', { title: '고객평가제도안내' });
});

router.get('/sub01_01_06', function(req, res, next) {
    res.render('sub01_01_06', { title: '이사흐름도' });
});

router.get('/sub01_02_01', function(req, res, next) {
    res.render('sub01_02_01', { title: '포장이사' });
});

router.get('/sub01_02_02', function(req, res, next) {
    res.render('sub01_02_02', { title: '보관이사' });
});

router.get('/sub01_02_03', function(req, res, next) {
    res.render('sub01_02_03', { title: '사무실이사' });
});

router.get('/sub01_02_04', function(req, res, next) {
    res.render('sub01_02_04', { title: '해외이사' });
});

router.get('/sub01_03_01', function(req, res, next) {
    res.render('sub01_03_01', { title: '청소서비스안내' });
});

router.get('/sub01_03_02', function(req, res, next) {
    res.render('sub01_03_02', { title: '에어컨서비스안내' });
});

module.exports = router;
