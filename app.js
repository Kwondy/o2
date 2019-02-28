var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require("express-session");
var index = require('./routes/index');
var users = require('./routes/users');
var sub01 = require('./routes/sub01');
var sub02 = require('./routes/sub02');
var sub03 = require('./routes/sub03');
var sub04 = require('./routes/sub04');
var sub05 = require('./routes/sub05');
var sub06 = require('./routes/sub06');
var admin = require('./routes/admin');
var owner = require('./routes/owner');

var app = express();


/* Db connect */
var config = require('./config/config.js');
mongoose.connect(config.url); // 1
mongoose.Promise = global.Promise; 

var db = mongoose.connection;
db.once("open", function(){
 console.log("DB connected");
});
db.on("error", function(err){
 console.log("DB ERROR : ", err);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash()); 
app.use(session({secret:"o2cv146345fv", resave:true, saveUninitialized:true})); 


app.use(flash());


app.use('/', index);
app.use('/users', users);
app.use('/sub01', sub01);
app.use('/sub02', sub02);
app.use('/sub03', sub03);
app.use('/sub04', sub04);
app.use('/sub05', sub05);
app.use('/sub06', sub06);
app.use('/admin', admin);
app.use('/owner', owner);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
