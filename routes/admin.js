var express = require('express');
var router = express.Router();
var easyInsert = require('../models/easyinsert');
var boardA = require('../models/board1');
var boardB = require('../models/board2');
var boardC = require('../models/board3');
var boardD = require('../models/board4');
var requestA = require('../models/request1');
var requestB = require('../models/request2');
var requestC = require('../models/request3');
var requestD = require('../models/request4');
var services1 = require('../models/services1');
var services2 = require('../models/services2');
var boardAs = require('../models/boardas');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/index', {  });
});


/* easy page */

router.get('/easy', function(req,res){
  // 처음 index로 접속 했을시 나오는 부분
 // db에서 게시글 리스트 가져와서 출력
 // page는 1-5까지 보여줌 -> db에서 총 갯수 잡아와서 10으로 나눠서 올림해야함
 // 한페이지에 10개의 게시글: limit: 10, skip: (page-1)*10 이면 될 듯
 // page number는 param으로 받아오기 가장 처음엔 param 없으니까 그땐 자동 1로 설정
 var page = req.param('page');
 if(page == null) {page = 1;}
 var skipSize = (page-1)*10;
 var limitSize = 10;
 var pageNum = 1;
 
 easyInsert.count({deleted:false},function(err, totalCount){
     // db에서 날짜 순으로 데이터들을 가져옴
      if(err) throw err;
      pageNum = Math.ceil(totalCount/limitSize);

      easyInsert.find({deleted:false}).sort({date:-1}).skip(skipSize).limit(limitSize).exec(function(err, pageContents) {
     // db에서 날짜 순으로 데이터들을 가져옴
     if(err) throw err;
     res.render('admin/easy', {contents: pageContents, pagination: pageNum}); 
     // board.ejs의 title변수엔 “Board”를, contents변수엔 db 검색 결과 json 데이터를 저장해줌.
 });
 });

});




/* easy show */

router.get('/easy:id', function(req, res) {

  easyInsert.findById({_id:req.params.id})
  .exec(function (err, contents) {
    if(err) return res.json(err);

    res.render("admin/easy_detail", { contents: contents, title: '간편문의' });

  });

});



/* request1 page */

router.get('/request1', function(req,res){
  // 처음 index로 접속 했을시 나오는 부분
 // db에서 게시글 리스트 가져와서 출력
 // page는 1-5까지 보여줌 -> db에서 총 갯수 잡아와서 10으로 나눠서 올림해야함
 // 한페이지에 10개의 게시글: limit: 10, skip: (page-1)*10 이면 될 듯
 // page number는 param으로 받아오기 가장 처음엔 param 없으니까 그땐 자동 1로 설정
 var page = req.param('page');
 if(page == null) {page = 1;}
 var skipSize = (page-1)*10;
 var limitSize = 10;
 var pageNum = 1;
 
 requestA.count({deleted:false},function(err, totalCount){
     // db에서 날짜 순으로 데이터들을 가져옴
      if(err) throw err;
      pageNum = Math.ceil(totalCount/limitSize);

      requestA.find({deleted:false}).sort({date:-1}).skip(skipSize).limit(limitSize).exec(function(err, pageContents) {
     // db에서 날짜 순으로 데이터들을 가져옴
     if(err) throw err;
     res.render('admin/request1', {contents: pageContents, pagination: pageNum}); 
     // board.ejs의 title변수엔 “Board”를, contents변수엔 db 검색 결과 json 데이터를 저장해줌.
 });
 });

});




/* request1 show */

router.get('/request1:id', function(req, res) {

  requestA.findById({_id:req.params.id})
  .exec(function (err, contents) {
    if(err) return res.json(err);

    res.render("admin/request1_detail", { contents: contents, title: '포장이사 견적' });

  });

});





/* request2 page */

router.get('/request2', function(req,res){
  // 처음 index로 접속 했을시 나오는 부분
 // db에서 게시글 리스트 가져와서 출력
 // page는 1-5까지 보여줌 -> db에서 총 갯수 잡아와서 10으로 나눠서 올림해야함
 // 한페이지에 10개의 게시글: limit: 10, skip: (page-1)*10 이면 될 듯
 // page number는 param으로 받아오기 가장 처음엔 param 없으니까 그땐 자동 1로 설정
 var page = req.param('page');
 if(page == null) {page = 1;}
 var skipSize = (page-1)*10;
 var limitSize = 10;
 var pageNum = 1;
 
 requestB.count({deleted:false},function(err, totalCount){
     // db에서 날짜 순으로 데이터들을 가져옴
      if(err) throw err;
      pageNum = Math.ceil(totalCount/limitSize);

      requestB.find({deleted:false}).sort({date:-1}).skip(skipSize).limit(limitSize).exec(function(err, pageContents) {
     // db에서 날짜 순으로 데이터들을 가져옴
     if(err) throw err;
     res.render('admin/request2', {contents: pageContents, pagination: pageNum}); 
     // board.ejs의 title변수엔 “Board”를, contents변수엔 db 검색 결과 json 데이터를 저장해줌.
 });
 });

});


/* request2 show */

router.get('/request2:id', function(req, res) {

  requestB.findById({_id:req.params.id})
  .exec(function (err, contents) {
    if(err) return res.json(err);

    res.render("admin/request2_detail", { contents: contents, title: '보관이사 견적' });

  });

});


/* request3 page */

router.get('/request3', function(req,res){
  // 처음 index로 접속 했을시 나오는 부분
 // db에서 게시글 리스트 가져와서 출력
 // page는 1-5까지 보여줌 -> db에서 총 갯수 잡아와서 10으로 나눠서 올림해야함
 // 한페이지에 10개의 게시글: limit: 10, skip: (page-1)*10 이면 될 듯
 // page number는 param으로 받아오기 가장 처음엔 param 없으니까 그땐 자동 1로 설정
 var page = req.param('page');
 if(page == null) {page = 1;}
 var skipSize = (page-1)*10;
 var limitSize = 10;
 var pageNum = 1;
 
 requestC.count({deleted:false},function(err, totalCount){
     // db에서 날짜 순으로 데이터들을 가져옴
      if(err) throw err;
      pageNum = Math.ceil(totalCount/limitSize);

      requestC.find({deleted:false}).sort({date:-1}).skip(skipSize).limit(limitSize).exec(function(err, pageContents) {
     // db에서 날짜 순으로 데이터들을 가져옴
     if(err) throw err;
     res.render('admin/request3', {contents: pageContents, pagination: pageNum}); 
     // board.ejs의 title변수엔 “Board”를, contents변수엔 db 검색 결과 json 데이터를 저장해줌.
 });
 });

});

/* request3 show */

router.get('/request3:id', function(req, res) {

  requestC.findById({_id:req.params.id})
  .exec(function (err, contents) {
    if(err) return res.json(err);

    res.render("admin/request3_detail", { contents: contents, title: '사무실이전 견적' });

  });

});


/* request4 page */

router.get('/request4', function(req,res){
  // 처음 index로 접속 했을시 나오는 부분
 // db에서 게시글 리스트 가져와서 출력
 // page는 1-5까지 보여줌 -> db에서 총 갯수 잡아와서 10으로 나눠서 올림해야함
 // 한페이지에 10개의 게시글: limit: 10, skip: (page-1)*10 이면 될 듯
 // page number는 param으로 받아오기 가장 처음엔 param 없으니까 그땐 자동 1로 설정
 var page = req.param('page');
 if(page == null) {page = 1;}
 var skipSize = (page-1)*10;
 var limitSize = 10;
 var pageNum = 1;
 
 requestD.count({deleted:false},function(err, totalCount){
     // db에서 날짜 순으로 데이터들을 가져옴
      if(err) throw err;
      pageNum = Math.ceil(totalCount/limitSize);

      requestD.find({deleted:false}).sort({date:-1}).skip(skipSize).limit(limitSize).exec(function(err, pageContents) {
     // db에서 날짜 순으로 데이터들을 가져옴
     if(err) throw err;
     res.render('admin/request4', {contents: pageContents, pagination: pageNum}); 
     // board.ejs의 title변수엔 “Board”를, contents변수엔 db 검색 결과 json 데이터를 저장해줌.
 });
 });

});

/* request4 show */

router.get('/request4:id', function(req, res) {

  requestD.findById({_id:req.params.id})
  .exec(function (err, contents) {
    if(err) return res.json(err);

    res.render("admin/request4_detail", { contents: contents, title: '간편전화 상담' });

  });

});



/* services1 page */

router.get('/services1', function(req,res){
  // 처음 index로 접속 했을시 나오는 부분
 // db에서 게시글 리스트 가져와서 출력
 // page는 1-5까지 보여줌 -> db에서 총 갯수 잡아와서 10으로 나눠서 올림해야함
 // 한페이지에 10개의 게시글: limit: 10, skip: (page-1)*10 이면 될 듯
 // page number는 param으로 받아오기 가장 처음엔 param 없으니까 그땐 자동 1로 설정
 var page = req.param('page');
 if(page == null) {page = 1;}
 var skipSize = (page-1)*10;
 var limitSize = 10;
 var pageNum = 1;
 
 services1.count({deleted:false},function(err, totalCount){
     // db에서 날짜 순으로 데이터들을 가져옴
      if(err) throw err;
      pageNum = Math.ceil(totalCount/limitSize);

      services1.find({deleted:false}).sort({date:-1}).skip(skipSize).limit(limitSize).exec(function(err, pageContents) {
     // db에서 날짜 순으로 데이터들을 가져옴
     if(err) throw err;
     res.render('admin/services1', {contents: pageContents, pagination: pageNum}); 
     // board.ejs의 title변수엔 “Board”를, contents변수엔 db 검색 결과 json 데이터를 저장해줌.
 });
 });

});

/* services1 show */

router.get('/services1:id', function(req, res) {

  services1.findById({_id:req.params.id})
  .exec(function (err, contents) {
    if(err) return res.json(err);

    res.render("admin/services1_detail", { contents: contents, title: '에어컨설치서비스신청' });

  });

});


/* services2 page */

router.get('/services2', function(req,res){
  // 처음 index로 접속 했을시 나오는 부분
 // db에서 게시글 리스트 가져와서 출력
 // page는 1-5까지 보여줌 -> db에서 총 갯수 잡아와서 10으로 나눠서 올림해야함
 // 한페이지에 10개의 게시글: limit: 10, skip: (page-1)*10 이면 될 듯
 // page number는 param으로 받아오기 가장 처음엔 param 없으니까 그땐 자동 1로 설정
 var page = req.param('page');
 if(page == null) {page = 1;}
 var skipSize = (page-1)*10;
 var limitSize = 10;
 var pageNum = 1;
 
 services2.count({deleted:false},function(err, totalCount){
     // db에서 날짜 순으로 데이터들을 가져옴
      if(err) throw err;
      pageNum = Math.ceil(totalCount/limitSize);

      services2.find({deleted:false}).sort({date:-1}).skip(skipSize).limit(limitSize).exec(function(err, pageContents) {
     // db에서 날짜 순으로 데이터들을 가져옴
     if(err) throw err;
     res.render('admin/services2', {contents: pageContents, pagination: pageNum}); 
     // board.ejs의 title변수엔 “Board”를, contents변수엔 db 검색 결과 json 데이터를 저장해줌.
 });
 });

});

/* services2 show */

router.get('/services2:id', function(req, res) {

  services2.findById({_id:req.params.id})
  .exec(function (err, contents) {
    if(err) return res.json(err);

    res.render("admin/services2_detail", { contents: contents, title: '청소서비스신청' });

  });

});


/* board1 page */

router.get('/board1', function(req,res){
  // 처음 index로 접속 했을시 나오는 부분
 // db에서 게시글 리스트 가져와서 출력
 // page는 1-5까지 보여줌 -> db에서 총 갯수 잡아와서 10으로 나눠서 올림해야함
 // 한페이지에 10개의 게시글: limit: 10, skip: (page-1)*10 이면 될 듯
 // page number는 param으로 받아오기 가장 처음엔 param 없으니까 그땐 자동 1로 설정
 var page = req.param('page');
 if(page == null) {page = 1;}
 var skipSize = (page-1)*10;
 var limitSize = 10;
 var pageNum = 1;
 
 boardA.count({deleted:false},function(err, totalCount){
     // db에서 날짜 순으로 데이터들을 가져옴
      if(err) throw err;
      pageNum = Math.ceil(totalCount/limitSize);

     boardA.find({deleted:false}).sort({date:-1}).skip(skipSize).limit(limitSize).exec(function(err, pageContents) {
     // db에서 날짜 순으로 데이터들을 가져옴
     if(err) throw err;
     res.render('admin/board1', {contents: pageContents, pagination: pageNum}); 
     // board.ejs의 title변수엔 “Board”를, contents변수엔 db 검색 결과 json 데이터를 저장해줌.
 });
 });

});

/* board2 page */

router.get('/board2', function(req,res){
  // 처음 index로 접속 했을시 나오는 부분
 // db에서 게시글 리스트 가져와서 출력
 // page는 1-5까지 보여줌 -> db에서 총 갯수 잡아와서 10으로 나눠서 올림해야함
 // 한페이지에 10개의 게시글: limit: 10, skip: (page-1)*10 이면 될 듯
 // page number는 param으로 받아오기 가장 처음엔 param 없으니까 그땐 자동 1로 설정
 var page = req.param('page');
 if(page == null) {page = 1;}
 var skipSize = (page-1)*10;
 var limitSize = 10;
 var pageNum = 1;
 
 boardB.count({deleted:false},function(err, totalCount){
     // db에서 날짜 순으로 데이터들을 가져옴
      if(err) throw err;
      pageNum = Math.ceil(totalCount/limitSize);

     boardB.find({deleted:false}).sort({date:-1}).skip(skipSize).limit(limitSize).exec(function(err, pageContents) {
     // db에서 날짜 순으로 데이터들을 가져옴
     if(err) throw err;
     res.render('admin/board2', {contents: pageContents, pagination: pageNum}); 
     // board.ejs의 title변수엔 “Board”를, contents변수엔 db 검색 결과 json 데이터를 저장해줌.
 });
 });

});


/* board3 page */

router.get('/board3', function(req,res){
  // 처음 index로 접속 했을시 나오는 부분
 // db에서 게시글 리스트 가져와서 출력
 // page는 1-5까지 보여줌 -> db에서 총 갯수 잡아와서 10으로 나눠서 올림해야함
 // 한페이지에 10개의 게시글: limit: 10, skip: (page-1)*10 이면 될 듯
 // page number는 param으로 받아오기 가장 처음엔 param 없으니까 그땐 자동 1로 설정
 var page = req.param('page');
 if(page == null) {page = 1;}
 var skipSize = (page-1)*10;
 var limitSize = 10;
 var pageNum = 1;
 
 boardC.count({deleted:false},function(err, totalCount){
     // db에서 날짜 순으로 데이터들을 가져옴
      if(err) throw err;
      pageNum = Math.ceil(totalCount/limitSize);

     boardC.find({deleted:false}).sort({date:-1}).skip(skipSize).limit(limitSize).exec(function(err, pageContents) {
     // db에서 날짜 순으로 데이터들을 가져옴
     if(err) throw err;
     res.render('admin/board3', {contents: pageContents, pagination: pageNum}); 
     // board.ejs의 title변수엔 “Board”를, contents변수엔 db 검색 결과 json 데이터를 저장해줌.
 });
 });

});


/* board4 page */

router.get('/board4', function(req,res){
  // 처음 index로 접속 했을시 나오는 부분
 // db에서 게시글 리스트 가져와서 출력
 // page는 1-5까지 보여줌 -> db에서 총 갯수 잡아와서 10으로 나눠서 올림해야함
 // 한페이지에 10개의 게시글: limit: 10, skip: (page-1)*10 이면 될 듯
 // page number는 param으로 받아오기 가장 처음엔 param 없으니까 그땐 자동 1로 설정
 var page = req.param('page');
 if(page == null) {page = 1;}
 var skipSize = (page-1)*10;
 var limitSize = 10;
 var pageNum = 1;
 
 boardD.count({deleted:false},function(err, totalCount){
     // db에서 날짜 순으로 데이터들을 가져옴
      if(err) throw err;
      pageNum = Math.ceil(totalCount/limitSize);

     boardD.find({deleted:false}).sort({date:-1}).skip(skipSize).limit(limitSize).exec(function(err, pageContents) {
     // db에서 날짜 순으로 데이터들을 가져옴
     if(err) throw err;
     res.render('admin/board4', {contents: pageContents, pagination: pageNum}); 
     // board.ejs의 title변수엔 “Board”를, contents변수엔 db 검색 결과 json 데이터를 저장해줌.
 });
 });

});



/* boardas page */

router.get('/boardas', function(req,res){
  // 처음 index로 접속 했을시 나오는 부분
 // db에서 게시글 리스트 가져와서 출력
 // page는 1-5까지 보여줌 -> db에서 총 갯수 잡아와서 10으로 나눠서 올림해야함
 // 한페이지에 10개의 게시글: limit: 10, skip: (page-1)*10 이면 될 듯
 // page number는 param으로 받아오기 가장 처음엔 param 없으니까 그땐 자동 1로 설정
 var page = req.param('page');
 if(page == null) {page = 1;}
 var skipSize = (page-1)*10;
 var limitSize = 10;
 var pageNum = 1;
 
 boardAs.count({deleted:false},function(err, totalCount){
     // db에서 날짜 순으로 데이터들을 가져옴
      if(err) throw err;
      pageNum = Math.ceil(totalCount/limitSize);

      boardAs.find({deleted:false}).sort({date:-1}).skip(skipSize).limit(limitSize).exec(function(err, pageContents) {
     // db에서 날짜 순으로 데이터들을 가져옴
     if(err) throw err;
     res.render('admin/boardas', {contents: pageContents, pagination: pageNum}); 
     // board.ejs의 title변수엔 “Board”를, contents변수엔 db 검색 결과 json 데이터를 저장해줌.
 });
 });

});

/* boardas show */

router.get('/boardas:id', function(req, res) {

  boardAs.findById({_id:req.params.id})
  .exec(function (err, contents) {
    if(err) return res.json(err);

    res.render("admin/boardas_detail", { contents: contents, title: '오투이사에 바란다' });

  });

});



module.exports = router;
