var express = require('express');
var router = express.Router();

/* 소사장 회원부분 */
var owner = require('../models/owner');

router.get('/', function(req, res) {
    res.render('owner/index',{title:'지금'});
});

router.get('/register', function(req, res) {
    var user = req.flash("user")[0] || {};
    var errors = req.flash("errors")[0] || {};
    res.render('owner/register', { user:user, errors:errors });
});

router.post('/signup', function(req, res) {
    owner.create(req.body, function(err, user) {
        if(err){
            req.flash("user", req.body);
            req.flash("errors", parseError(err));
            return res.redirect("/owner/register");
        }
        res.redirect("/owner");
    });
});


module.exports = router;

// Functions
function parseError(errors){
    var parsed = {};
    if(errors.name == 'ValidationError'){
     for(var name in errors.errors){
      var validationError = errors.errors[name];
      parsed[name] = { message:validationError.message };
     }
    } else if(errors.code == "11000" && errors.errmsg.indexOf("username") > 0) {
     parsed.username = { message:"사용자 이름이 이미 존재합니다." };
    } else {
     parsed.unhandled = JSON.stringify(errors);
    }
    return parsed;
   }