var express = require('express');
var router = express.Router();

/* GET sub01 page */
router.get('/sub05_01_01', function(req, res, next) {
    res.render('sub05/sub05_01_01', { title: '거리계산 운송요금' });
});

router.get('/sub05_01_02', function(req, res, next) {
    res.render('sub05/sub05_01_02', { title: '서울강남 출발요금' });
});

router.get('/sub05_01_03', function(req, res, next) {
    res.render('sub05/sub05_01_03', { title: '경기안산 출발요금' });
});

router.get('/sub05_01_04', function(req, res, next) {
    res.render('sub05/sub05_01_04', { title: '충북청주 출발요금' });
});

router.get('/sub05_01_05', function(req, res, next) {
    res.render('sub05/sub05_01_05', { title: '충남대전 출발요금' });
});

router.get('/sub05_01_06', function(req, res, next) {
    res.render('sub05/sub05_01_06', { title: '전북전주 출발요금' });
});

router.get('/sub05_01_07', function(req, res, next) {
    res.render('sub05/sub05_01_07', { title: '전남광주 출발요금' });
});

router.get('/sub05_01_08', function(req, res, next) {
    res.render('sub05/sub05_01_08', { title: '경북대구 출발요금' });
});

router.get('/sub05_01_09', function(req, res, next) {
    res.render('sub05/sub05_01_09', { title: '경남부산 출발요금' });
});

router.get('/sub05_01_10', function(req, res, next) {
    res.render('sub05/sub05_01_10', { title: '강원강릉 출발요금' });
});

router.get('/sub05_01_11', function(req, res, next) {
    res.render('sub05/sub05_01_11', { title: '제주화물 운송요금' });
});

router.get('/sub05_01_12', function(req, res, next) {
    res.render('sub05/sub05_01_12', { title: '화물택배 혼적요금' });
});

router.get('/sub05_01_13', function(req, res, next) {
    res.render('sub05/sub05_01_13', { title: '퀵다마스 라보요금' });
});

router.get('/sub05_01_14', function(req, res, next) {
    res.render('sub05/sub05_01_14', { title: '사다리차 카크레인' });
});

router.get('/sub05_01_15', function(req, res, next) {
    res.render('sub05/sub05_01_15', { title: '기타차량 일대요금' });
});

module.exports = router;
