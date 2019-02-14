var express = require('express');
var router = express.Router();
var boardA = require('../models/board1');
var boardB = require('../models/board2');
var boardC = require('../models/board3');
var boardD = require('../models/board4');
var boardAs = require('../models/boardas');

router.get('/sub04_01_01', function(req,res){
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
        res.render('sub04_01_01', {title: "계약여부 문의", contents: pageContents, pagination: pageNum, searchWord: ''}); 
        // board.ejs의 title변수엔 “Board”를, contents변수엔 db 검색 결과 json 데이터를 저장해줌.
    });
    });

});

router.post('/sub04_01_01', function(req, res){
    var mode = req.param('mode');

    var addNewTitle = req.body.title;
    var addNewWriter = req.body.writer;
    var addNewPassword = req.body.password;
    var addNewContent = req.body.content;

    var modTitle = req.body.modContentSubject;
    var modContent = req.body.modContents;
    var modId = req.body.modId;

    if(mode == 'add') {
        addBoard(addNewTitle, addNewWriter, addNewContent, addNewPassword);
        res.redirect('/sub04/sub04_01_01');
    } else {
        modBoard(modId, modTitle, modContent);
        res.redirect('/sub04/sub04_01_01');
    }
});


router.get('/sub04_01_01_new', function(req, res, next) {
    res.render('sub04_01_01_new', { title: '계약여부 문의' });
});

 
router.get('/sub04_01_01/view', function(req, res){
    // 글 보는 부분. 글 내용을 출력하고 조회수를 늘려줘야함
     var contentId = req.param('id');

     boardA.findOne({_id:contentId}, function(err, rawContent){
         if(err) throw err;
         rawContent.count += 1; // 조회수를 늘려줍니다.
         var reply_pg = Math.ceil(rawContent.comments.length/5);

         rawContent.save(function(err){ // 변화된 조횟수 저장
             if(err) throw err;
             res.render('sub04_01_01_detail',{title: "계약여부 문의", content:rawContent, replyPage: reply_pg}); // db에서 가져온 내용을 뷰로 렌더링
         });
     })
 });


router.get('/sub04_01_01/delete', function(req, res) {
    var contentId = req.param('id');
    boardA.update({_id:contentId}, {$set:{deleted:true}}, function(err){
        if(err) throw err;
        res.redirect('/sub04/sub04_01_01');
    });
});


router.get('/sub04_01_02/search', function(req, res){
    var search_word = req.param('searchWord');
    var searchCondition = {$regex:search_word};
 
    var page = req.param('page');
     if(page == null) {page = 1;}
     var skipSize = (page-1)*10;
     var limitSize = 10;
     var pageNum = 1;
     
    boardA.find({deleted:false, $or:[{title:searchCondition},{contents:searchCondition},{writer:searchCondition}]}).sort({date:-1}).exec(function(err, searchContents){
        if(err) throw err;
        pageNum = Math.ceil(searchCount/limitSize);
        res.render('sub04_01_02', {title: "Board", contents: searchContents, pagination: pageNum, searchWord: search_word});
    });
 });
 
 


 router.post('/sub04_01_01/reply', function(req, res){
    // 댓글 다는 부분
    var reply_writer = req.body.replyWriter;
    var reply_comment = req.body.replyComment;
    var reply_id = req.body.replyId;

    addComment(reply_id, reply_writer, reply_comment);

    res.redirect('/sub04/sub04_01_01/view?id='+reply_id);
});

router.get('/sub04_01_01/reply', function(req, res) {
    // 댓글 ajax로 페이징 하는 부분
    var id = req.param('id');
    var page = req.param('page');
    var max = req.param('max'); // 댓글 총 갯수 확인
    var skipSize = (page-1)*5;
    var limitSize = skipSize + 5;

    if(max < skipSize+5) {limitSize = max*1;} // 댓글 갯수 보다 넘어가는 경우는 댓글 수로 맞춰줌 (몽고디비 쿼리에서 limit은 양의 정수여야함)

    boardA.findOne({_id: id}, {comments: {$slice: [skipSize, limitSize]}} , function(err, pageReply){
        if(err) throw err;
        res.send(pageReply.comments);
    });
});

router.get('/sub04_01_01/password', function(req, res){
    // 글 비밀번호 찾아오기
    var id = req.param('id');
    boardA.findOne({_id: id}, function(err, rawContents){
       res.send(rawContents.password);
    });
});


/* sub04_01_02 부분 */



router.get('/sub04_01_02', function(req,res){
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
       res.render('sub04_01_02', {title: "방문견적 변경/취소", contents: pageContents, pagination: pageNum, searchWord: ''}); 
       // board.ejs의 title변수엔 “Board”를, contents변수엔 db 검색 결과 json 데이터를 저장해줌.
   });
   });

});

router.post('/sub04_01_02', function(req, res){
   var mode = req.param('mode');

   var addNewTitle = req.body.title;
   var addNewWriter = req.body.writer;
   var addNewPassword = req.body.password;
   var addNewContent = req.body.content;

   var modTitle = req.body.modContentSubject;
   var modContent = req.body.modContents;
   var modId = req.body.modId;

   if(mode == 'add') {
       addBoardB(addNewTitle, addNewWriter, addNewContent, addNewPassword);
       res.redirect('/sub04/sub04_01_02');
   } else {
       modBoardB(modId, modTitle, modContent);
       res.redirect('/sub04/sub04_01_02');
   }
});




router.get('/sub04_01_02_new', function(req, res, next) {
   res.render('sub04_01_02_new', { title: '방문견적 변경/취소' });
});


router.get('/sub04_01_02/view', function(req, res){
   // 글 보는 부분. 글 내용을 출력하고 조회수를 늘려줘야함
    var contentId = req.param('id');

    boardB.findOne({_id:contentId}, function(err, rawContent){
        if(err) throw err;
        rawContent.count += 1; // 조회수를 늘려줍니다.
        var reply_pg = Math.ceil(rawContent.comments.length/5);

        rawContent.save(function(err){ // 변화된 조횟수 저장
            if(err) throw err;
            res.render('sub04_01_02_detail',{title: "방문견적 변경/취소", content:rawContent, replyPage: reply_pg}); // db에서 가져온 내용을 뷰로 렌더링
        });
    })
});


router.get('/sub04_01_02/delete', function(req, res) {
   var contentId = req.param('id');
   boardB.update({_id:contentId}, {$set:{deleted:true}}, function(err){
       if(err) throw err;
       res.redirect('/sub04/sub04_01_02');
   });
});


router.get('/sub04_01_02/search', function(req, res){
   var search_word = req.param('searchWord');
   var searchCondition = {$regex:search_word};

   var page = req.param('page');
    if(page == null) {page = 1;}
    var skipSize = (page-1)*10;
    var limitSize = 10;
    var pageNum = 1;

   boardB.find({deleted:false, $or:[{title:searchCondition},{contents:searchCondition},{writer:searchCondition}]}).sort({date:-1}).exec(function(err, searchContents){
       if(err) throw err;
       pageNum = Math.ceil(searchCount/limitSize);
       res.render('sub04_01_02', {title: "Board", contents: searchContents, pagination: pageNum, searchWord: search_word});
   });
});



router.post('/sub04_01_02/reply', function(req, res){
   // 댓글 다는 부분
   var reply_writer = req.body.replyWriter;
   var reply_comment = req.body.replyComment;
   var reply_id = req.body.replyId;

   addCommentB(reply_id, reply_writer, reply_comment);

   res.redirect('/sub04/sub04_01_02/view?id='+reply_id);
});

router.get('/sub04_01_02/reply', function(req, res) {
   // 댓글 ajax로 페이징 하는 부분
   var id = req.param('id');
   var page = req.param('page');
   var max = req.param('max'); // 댓글 총 갯수 확인
   var skipSize = (page-1)*5;
   var limitSize = skipSize + 5;

   if(max < skipSize+5) {limitSize = max*1;} // 댓글 갯수 보다 넘어가는 경우는 댓글 수로 맞춰줌 (몽고디비 쿼리에서 limit은 양의 정수여야함)

   boardB.findOne({_id: id}, {comments: {$slice: [skipSize, limitSize]}} , function(err, pageReply){
       if(err) throw err;
       res.send(pageReply.comments);
   });
});

router.get('/sub04_01_02/password', function(req, res){
   // 글 비밀번호 찾아오기
   var id = req.param('id');
   boardB.findOne({_id: id}, function(err, rawContents){
      res.send(rawContents.password);
   });
});


/* sub04_01_03 부분 */

router.get('/sub04_01_03', function(req,res){
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
       res.render('sub04_01_03', {title: "현금영수증 문의", contents: pageContents, pagination: pageNum, searchWord: ''}); 
       // board.ejs의 title변수엔 “Board”를, contents변수엔 db 검색 결과 json 데이터를 저장해줌.
   });
   });

});

router.post('/sub04_01_03', function(req, res){
   var mode = req.param('mode');

   var addNewTitle = req.body.title;
   var addNewWriter = req.body.writer;
   var addNewPassword = req.body.password;
   var addNewContent = req.body.content;

   var modTitle = req.body.modContentSubject;
   var modContent = req.body.modContents;
   var modId = req.body.modId;

   if(mode == 'add') {
       addBoardC(addNewTitle, addNewWriter, addNewContent, addNewPassword);
       res.redirect('/sub04/sub04_01_03');
   } else {
       modBoardC(modId, modTitle, modContent);
       res.redirect('/sub04/sub04_01_03');
   }
});




router.get('/sub04_01_03_new', function(req, res, next) {
   res.render('sub04_01_03_new', { title: '현금영수증 문의' });
});


router.get('/sub04_01_03/view', function(req, res){
   // 글 보는 부분. 글 내용을 출력하고 조회수를 늘려줘야함
    var contentId = req.param('id');

    boardC.findOne({_id:contentId}, function(err, rawContent){
        if(err) throw err;
        rawContent.count += 1; // 조회수를 늘려줍니다.
        var reply_pg = Math.ceil(rawContent.comments.length/5);

        rawContent.save(function(err){ // 변화된 조횟수 저장
            if(err) throw err;
            res.render('sub04_01_03_detail',{title: "현금영수증 문의", content:rawContent, replyPage: reply_pg}); // db에서 가져온 내용을 뷰로 렌더링
        });
    })
});


router.get('/sub04_01_03/delete', function(req, res) {
   var contentId = req.param('id');
   boardC.update({_id:contentId}, {$set:{deleted:true}}, function(err){
       if(err) throw err;
       res.redirect('/sub04/sub04_01_03');
   });
});


router.get('/sub04_01_03/search', function(req, res){
   var search_word = req.param('searchWord');
   var searchCondition = {$regex:search_word};
   boardC.find({deleted:false, $or:[{title:searchCondition},{contents:searchCondition},{writer:searchCondition}]}).sort({date:-1}).exec(function(err, searchContents){
       if(err) throw err;
       res.render('sub04_01_03', {title: "Board", contents: searchContents});
   });
});



router.post('/sub04_01_03/reply', function(req, res){
   // 댓글 다는 부분
   var reply_writer = req.body.replyWriter;
   var reply_comment = req.body.replyComment;
   var reply_id = req.body.replyId;

   addCommentC(reply_id, reply_writer, reply_comment);

   res.redirect('/sub04/sub04_01_03/view?id='+reply_id);
});

router.get('/sub04_01_03/reply', function(req, res) {
   // 댓글 ajax로 페이징 하는 부분
   var id = req.param('id');
   var page = req.param('page');
   var max = req.param('max'); // 댓글 총 갯수 확인
   var skipSize = (page-1)*5;
   var limitSize = skipSize + 5;

   if(max < skipSize+5) {limitSize = max*1;} // 댓글 갯수 보다 넘어가는 경우는 댓글 수로 맞춰줌 (몽고디비 쿼리에서 limit은 양의 정수여야함)

   boardC.findOne({_id: id}, {comments: {$slice: [skipSize, limitSize]}} , function(err, pageReply){
       if(err) throw err;
       res.send(pageReply.comments);
   });
});

router.get('/sub04_01_03/password', function(req, res){
   // 글 비밀번호 찾아오기
   var id = req.param('id');
   boardC.findOne({_id: id}, function(err, rawContents){
      res.send(rawContents.password);
   });
});


/* sub04_01_04 부분 */

router.get('/sub04_01_04', function(req,res){
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
       res.render('sub04_01_04', {title: "기타 고객문의", contents: pageContents, pagination: pageNum, searchWord: ''}); 
       // board.ejs의 title변수엔 “Board”를, contents변수엔 db 검색 결과 json 데이터를 저장해줌.
   });
   });

});

router.post('/sub04_01_04', function(req, res){
   var mode = req.param('mode');

   var addNewTitle = req.body.title;
   var addNewWriter = req.body.writer;
   var addNewPassword = req.body.password;
   var addNewContent = req.body.content;

   var modTitle = req.body.modContentSubject;
   var modContent = req.body.modContents;
   var modId = req.body.modId;

   if(mode == 'add') {
       addBoardD(addNewTitle, addNewWriter, addNewContent, addNewPassword);
       res.redirect('/sub04/sub04_01_04');
   } else {
       modBoardD(modId, modTitle, modContent);
       res.redirect('/sub04/sub04_01_04');
   }
});




router.get('/sub04_01_04_new', function(req, res, next) {
   res.render('sub04_01_04_new', { title: '기타 고객문의' });
});


router.get('/sub04_01_04/view', function(req, res){
   // 글 보는 부분. 글 내용을 출력하고 조회수를 늘려줘야함
    var contentId = req.param('id');

    boardD.findOne({_id:contentId}, function(err, rawContent){
        if(err) throw err;
        rawContent.count += 1; // 조회수를 늘려줍니다.
        var reply_pg = Math.ceil(rawContent.comments.length/5);

        rawContent.save(function(err){ // 변화된 조횟수 저장
            if(err) throw err;
            res.render('sub04_01_04_detail',{title: "기타 고객문의", content:rawContent, replyPage: reply_pg}); // db에서 가져온 내용을 뷰로 렌더링
        });
    })
});


router.get('/sub04_01_04/delete', function(req, res) {
   var contentId = req.param('id');
   boardD.update({_id:contentId}, {$set:{deleted:true}}, function(err){
       if(err) throw err;
       res.redirect('/sub04/sub04_01_04');
   });
});


router.get('/sub04_01_04/search', function(req, res){
   var search_word = req.param('searchWord');
   var searchCondition = {$regex:search_word};
   boardD.find({deleted:false, $or:[{title:searchCondition},{contents:searchCondition},{writer:searchCondition}]}).sort({date:-1}).exec(function(err, searchContents){
       if(err) throw err;
       res.render('sub04_01_04', {title: "Board", contents: searchContents});
   });
});



router.post('/sub04_01_04/reply', function(req, res){
   // 댓글 다는 부분
   var reply_writer = req.body.replyWriter;
   var reply_comment = req.body.replyComment;
   var reply_id = req.body.replyId;

   addCommentD(reply_id, reply_writer, reply_comment);

   res.redirect('/sub04/sub04_01_04/view?id='+reply_id);
});

router.get('/sub04_01_04/reply', function(req, res) {
   // 댓글 ajax로 페이징 하는 부분
   var id = req.param('id');
   var page = req.param('page');
   var max = req.param('max'); // 댓글 총 갯수 확인
   var skipSize = (page-1)*5;
   var limitSize = skipSize + 5;

   if(max < skipSize+5) {limitSize = max*1;} // 댓글 갯수 보다 넘어가는 경우는 댓글 수로 맞춰줌 (몽고디비 쿼리에서 limit은 양의 정수여야함)

   boardD.findOne({_id: id}, {comments: {$slice: [skipSize, limitSize]}} , function(err, pageReply){
       if(err) throw err;
       res.send(pageReply.comments);
   });
});

router.get('/sub04_01_04/password', function(req, res){
   // 글 비밀번호 찾아오기
   var id = req.param('id');
   boardA.findOne({_id: id}, function(err, rawContents){
      res.send(rawContents.password);
   });
});


/* sub04_02_01 부분 */

router.get('/sub04_02_01', function(req, res, next) {
    res.render('sub04_02_01', { title: 'A/S 보상규정' });
});

/* sub04_02_02 부분 */

router.get('/sub04_02_02', function(req, res, next) {
    res.render('sub04_02_02', { title: 'A/S 안내' });
});


/* sub04_02_03 부분 */

router.get('/sub04_02_03', function(req, res, next) {
    res.render('sub04_02_03', { title: 'A/S 신청' });
});

/* sub04_03_01 부분 */

router.get('/sub04_03_01', function(req, res, next) {
    res.render('sub04_03_01', { title: '오투이사에 바란다' });
});


// router.post('/sub04_03_01', function(req, res){
//     // 글 작성하고 submit하게 되면 저장이 되는 부분
//     var addNewTitle = req.body.addContentSubject;
//     var addNewWriter = req.body.addContentWriter;
//     var addNewContent = req.body.addContents;
//     var addNewPasword = req.body.addContentPassword;
//     var addNewTel1 = req.body.addContentTel1;
//     var addNewTel2 = req.body.addContentTel2;
//     var addNewTel3 = req.body.addContentTel3;

//     addBoardAs(addNewTitle, addNewWriter, addNewContent, addNewPasword, addNewTel1, addNewTel2, addNewTel3);
//     res.redirect('/sub04/sub04_03_01');
// });

/* sub04_03_01 게시글 저장부분  */

router.post('/sub04_03_01', function(req, res, next) {

    boardAs.create(req.body, function (err, post) {
        if(err) return res.json(err);
        return res.redirect('/sub04/sub04_03_01');
    });
    // res.render('sub02_02_01', { title: '포장이사견적/신청' });
});



module.exports = router;


function addBoard(title, writer, content, password){
    var newBoardContents = new boardA ;
    
    newBoardContents.writer = writer;
    newBoardContents.title = title;
    newBoardContents.contents = content;
    newBoardContents.password = password;
    newBoardContents.save(function (err) {
        if (err) throw err;
    });
}


function modBoard(id, title, content) {
    var modContent = content.replace(/\r\n/gi, "\\r\\n");

    boardA.findOne({_id:id}, function(err, originContent){
        if(err) throw err;
        originContent.updated.push({title: originContent.title, contents:originContent.contents});
        originContent.save(function(err){
            if(err) throw err;
        });
    });

    boardA.update({_id:id}, {$set: {title: title, contents: modContent, date: Date.now()}}, function(err) {
        if(err) throw err;
    });
}


function addComment(id, writer, comment) {
    boardA.findOne({_id: id}, function(err, rawContent){
        if(err) throw err;
        rawContent.comments.push({name:writer, memo: comment});
        rawContent.save(function(err){
            if(err) throw err;
        });
    });
}

/* sub04_01_02 */

function addBoardB(title, writer, content, password){
    var newBoardContents = new boardB ;
    
    newBoardContents.writer = writer;
    newBoardContents.title = title;
    newBoardContents.contents = content;
    newBoardContents.password = password;
    newBoardContents.save(function (err) {
        if (err) throw err;
    });
}


function modBoardB(id, title, content) {
    var modContent = content.replace(/\r\n/gi, "\\r\\n");

    boardB.findOne({_id:id}, function(err, originContent){
        if(err) throw err;
        originContent.updated.push({title: originContent.title, contents:originContent.contents});
        originContent.save(function(err){
            if(err) throw err;
        });
    });

    boardB.update({_id:id}, {$set: {title: title, contents: modContent, date: Date.now()}}, function(err) {
        if(err) throw err;
    });
}


function addCommentB(id, writer, comment) {
    boardB.findOne({_id: id}, function(err, rawContent){
        if(err) throw err;
        rawContent.comments.push({name:writer, memo: comment});
        rawContent.save(function(err){
            if(err) throw err;
        });
    });
}

/* sub04_01_03 */

function addBoardC(title, writer, content, password){
    var newBoardContents = new boardC ;
    
    newBoardContents.writer = writer;
    newBoardContents.title = title;
    newBoardContents.contents = content;
    newBoardContents.password = password;
    newBoardContents.save(function (err) {
        if (err) throw err;
    });
}

function modBoardC(id, title, content) {
    var modContent = content.replace(/\r\n/gi, "\\r\\n");

    boardC.findOne({_id:id}, function(err, originContent){
        if(err) throw err;
        originContent.updated.push({title: originContent.title, contents:originContent.contents});
        originContent.save(function(err){
            if(err) throw err;
        });
    });

    boardC.update({_id:id}, {$set: {title: title, contents: modContent, date: Date.now()}}, function(err) {
        if(err) throw err;
    });
}


function addCommentC(id, writer, comment) {
    boardC.findOne({_id: id}, function(err, rawContent){
        if(err) throw err;
        rawContent.comments.push({name:writer, memo: comment});
        rawContent.save(function(err){
            if(err) throw err;
        });
    });
}

/* sub04_01_04 */

function addBoardD(title, writer, content, password){
    var newBoardContents = new boardD ;
    
    newBoardContents.writer = writer;
    newBoardContents.title = title;
    newBoardContents.contents = content;
    newBoardContents.password = password;
    newBoardContents.save(function (err) {
        if (err) throw err;
    });
}

function modBoardD(id, title, content) {
    var modContent = content.replace(/\r\n/gi, "\\r\\n");

    boardD.findOne({_id:id}, function(err, originContent){
        if(err) throw err;
        originContent.updated.push({title: originContent.title, contents:originContent.contents});
        originContent.save(function(err){
            if(err) throw err;
        });
    });

    boardD.update({_id:id}, {$set: {title: title, contents: modContent, date: Date.now()}}, function(err) {
        if(err) throw err;
    });
}


function addCommentD(id, writer, comment) {
    boardD.findOne({_id: id}, function(err, rawContent){
        if(err) throw err;
        rawContent.comments.push({name:writer, memo: comment});
        rawContent.save(function(err){
            if(err) throw err;
        });
    });
}



function addBoardAs(title, writer, content, password, tel1, tel2, tel3){
    var newBoardContents = new boardAs;
    
    newBoardContents.writer = writer;
    newBoardContents.title = title;
    newBoardContents.contents = content;
    newBoardContents.password = password;
    newBoardContents.tel1 = tel1;
    newBoardContents.tel2 = tel2;
    newBoardContents.tel3 = tel3;
    newBoardContents.save(function (err) {
        if (err) throw err;
    });
}




function isSaved(upFile) {
    // 파일 저장 여부 확인해서 제대로 저장되면 디비에 저장되는 방식

    var savedFile = upFile;
    var count = 0;

    if(savedFile != null) { // 파일 존재시 -> tmp폴더에 파일 저장여부 확인 -> 있으면 저장, 없으면 에러메시지
        for (var i = 0; i < savedFile.length; i++) {
            if(fs.statSync(getDirname(1) + savedFile[i].path).isFile()){ //fs 모듈을 사용해서 파일의 존재 여부를 확인한다.
                count ++; // true인 결과 갯수 세서
            };

        }
        if(count == savedFile.length){  //올린 파일 갯수랑 같으면 패스
            return true;
        }else{
            return false;
        }
    }else{ // 파일이 처음부터 없는 경우
        return true;
    }
}