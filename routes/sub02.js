var express = require('express');
var router = express.Router();

/* GET sub02 page */
router.get('/sub02_01_01', function(req, res, next) {
    res.render('sub02_01_01', { title: '포장이사기본요금' });
});

router.get('/sub02_01_02', function(req, res, next) {
    res.render('sub02_01_02', { title: '보관요금' });
});

router.get('/sub02_01_03', function(req, res, next) {
    res.render('sub02_01_03', { title: '부가서비스요금' });
});

router.get('/sub02_02_01', function(req, res, next) {
    res.render('sub02_02_01', { title: '포장이사견적/신청' });
});

router.get('/sub02_02_02', function(req, res, next) {
    res.render('sub02_02_02', { title: '보관이사견적/신청' });
});

router.get('/sub02_02_03', function(req, res, next) {
    res.render('sub02_02_03', { title: '사무실이전 견적상담' });
});

router.get('/sub02_02_04', function(req, res, next) {
    res.render('sub02_02_04', { title: '해외이사 견적상담' });
});

router.get('/sub02_02_05', function(req, res, next) {
    res.render('sub02_02_05', { title: '간편전화 상담신청' });
});

router.get('/sub02_03_01', function(req, res, next) {
    res.render('sub02_03_01', { title: '에어컨설치서비스신청' });
});

router.get('/sub02_03_02', function(req, res, next) {
    res.render('sub02_03_02', { title: '청소서비스신청' });
});

module.exports = router;
