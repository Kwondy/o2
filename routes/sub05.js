var express = require('express');
var router = express.Router();

/* GET sub01 page */
router.get('/sub05_01_01', function(req, res, next) {
    res.render('sub05/sub05_01_01', { title: '직거래이사서비스' });
});

router.get('/sub05_01_02', function(req, res, next) {
    res.render('sub05/sub05_01_02', { title: '이사·화물품질정책' });
});

router.get('/sub05_01_03', function(req, res, next) {
    res.render('sub05/sub05_01_03', { title: '차량구비 시스템' });
});

router.get('/sub05_01_04', function(req, res, next) {
    res.render('sub05/sub05_01_04', { title: '포장박스안내' });
});

router.get('/sub05_01_05', function(req, res, next) {
    res.render('sub05/sub05_01_05', { title: '서비스리콜 센터운영' });
});

router.get('/sub05_01_06', function(req, res, next) {
    res.render('sub05/sub05_01_06', { title: '이사·화물 진행절차' });
});

router.get('/sub05_01_07', function(req, res, next) {
    res.render('sub05/sub05_01_07', { title: '포장이사' });
});

router.get('/sub05_01_08', function(req, res, next) {
    res.render('sub05/sub05_01_08', { title: '보관이사' });
});

router.get('/sub05_01_09', function(req, res, next) {
    res.render('sub05/sub05_01_09', { title: '사무실이사' });
});

router.get('/sub05_01_10', function(req, res, next) {
    res.render('sub05/sub05_01_10', { title: '해외이사' });
});

router.get('/sub05_01_11', function(req, res, next) {
    res.render('sub05/sub05_01_11', { title: '청소서비스안내' });
});

router.get('/sub05_01_12', function(req, res, next) {
    res.render('sub05/sub05_01_12', { title: '에어컨서비스안내' });
});

router.get('/sub05_01_13', function(req, res, next) {
    res.render('sub05/sub05_01_13', { title: '에어컨서비스안내' });
});

router.get('/sub05_01_14', function(req, res, next) {
    res.render('sub05/sub05_01_14', { title: '에어컨서비스안내' });
});

router.get('/sub05_01_15', function(req, res, next) {
    res.render('sub05/sub05_01_15', { title: '에어컨서비스안내' });
});

module.exports = router;
