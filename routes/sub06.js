var express = require('express');
var router = express.Router();

/* GET sub01 page */
router.get('/sub06_01_01', function(req, res, next) {
    res.render('sub06/sub06_01_01', { title: '화물차제원' });
});

router.get('/sub06_01_02', function(req, res, next) {
    res.render('sub06/sub06_01_02', { title: '적재함규격표' });
});

router.get('/sub06_01_03', function(req, res, next) {
    res.render('sub06/sub06_01_03', { title: '트럭종류사진' });
});


module.exports = router;
