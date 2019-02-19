var express = require('express');
var router = express.Router();

/* 포장이사견적/신청 */
var request1 = require('../models/request1');
/* 보관이사견적/신청 */
var request2 = require('../models/request2');
/* 사무실이전 견적상담 */
var request3 = require('../models/request3');
/* 간편전화 상담신청 */
var request4 = require('../models/request4');
/* 에어컨설치서비스신청 */
var services1 = require('../models/services1');
/* 청소서비스신청 */
var services2 = require('../models/services2');

/* GET sub02 page */
router.get('/sub02_01_01', function(req, res, next) {
    res.render('sub02/sub02_01_01', { title: '포장이사기본요금' });
});

router.get('/sub02_01_02', function(req, res, next) {
    res.render('sub02/sub02_01_02', { title: '보관요금' });
});

router.get('/sub02_01_03', function(req, res, next) {
    res.render('sub02/sub02_01_03', { title: '부가서비스요금' });
});

router.get('/sub02_02_01', function(req, res, next) {
    res.render('sub02/sub02_02_01', { title: '포장이사견적/신청' });
});

/* sub02_02_01 게시글 저장부분  */

router.post('/sub02_02_01', function(req, res, next) {

    request1.create(req.body, function (err, post) {
        if(err) return res.json(err);
        return res.redirect("/sub02/sub02_02_01");
    });
    // res.render('sub02_02_01', { title: '포장이사견적/신청' });
});



router.get('/sub02_02_02', function(req, res, next) {
    res.render('sub02/sub02_02_02', { title: '보관이사견적/신청' });
});


/* sub02_02_02 게시글 저장부분  */

router.post('/sub02_02_02', function(req, res, next) {

    request2.create(req.body, function (err, post) {
        if(err) return res.json(err);
        return res.redirect("/sub02/sub02_02_02");
    });
    // res.render('sub02_02_01', { title: '포장이사견적/신청' });
});


router.get('/sub02_02_03', function(req, res, next) {
    res.render('sub02/sub02_02_03', { title: '사무실이전 견적상담' });
});

/* sub02_02_03 게시글 저장부분  */

router.post('/sub02_02_03', function(req, res, next) {

    request3.create(req.body, function (err, post) {
        if(err) return res.json(err);
        return res.redirect("/sub02/sub02_02_03");
    });
    // res.render('sub02_02_01', { title: '포장이사견적/신청' });
});



router.get('/sub02_02_04', function(req, res, next) {
    res.render('sub02/sub02_02_04', { title: '해외이사 견적상담' });
});

router.get('/sub02_02_05', function(req, res, next) {
    res.render('sub02/sub02_02_05', { title: '간편전화 상담신청' });
});

/* sub02_02_05 게시글 저장부분  */

router.post('/sub02_02_05', function(req, res, next) {

    request4.create(req.body, function (err, post) {
        if(err) return res.json(err);
        return res.redirect("/sub02/sub02_02_05");
    });
    // res.render('sub02_02_01', { title: '포장이사견적/신청' });
});

router.get('/sub02_03_01', function(req, res, next) {
    res.render('sub02/sub02_03_01', { title: '에어컨설치서비스신청' });
});

router.post('/sub02_03_01', function(req, res, next) {

    services1.create(req.body, function (err, post) {
        if(err) return res.json(err);
        return res.redirect("/sub02/sub02_03_01");
    });
    // res.render('sub02_02_01', { title: '포장이사견적/신청' });
});

router.get('/sub02_03_02', function(req, res, next) {
    res.render('sub02/sub02_03_02', { title: '청소서비스신청' });
});

router.post('/sub02_03_02', function(req, res, next) {

    services2.create(req.body, function (err, post) {
        if(err) return res.json(err);
        return res.redirect("/sub02/sub02_03_02");
    });
    // res.render('sub02_02_01', { title: '포장이사견적/신청' });
});

module.exports = router;
