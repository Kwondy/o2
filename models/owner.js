/* 계약여부 문의 */
var mongoose = require('mongoose');
var bcrypt = require("bcrypt-nodejs"); 


var userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"아이디가 필요합니다."],
        match:[/^.{4,12}$/,"4~12자로 구성되야합니다."],
        trim:true,
        unique:true
       },
       password:{
        type:String,
        required:[true,"비밀번호가 필요합니다."],
        select:false
       },
       name:{
        type:String,
        required:[true,"이름이 필요합니다."],
        match:[/^.{4,12}$/,"4~12자로 구성되야합니다."],
        trim:true
       }
    },{
        toObject:{virtuals:true}
       
});

// virtuals 
userSchema.virtual("passwordConfirmation")
.get(function(){ return this._passwordConfirmation; })
.set(function(value){ this._passwordConfirmation=value; });



var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
var passwordRegexErrorMessage = "최소 숫자와 알파벳 조합 8자리이상 필요합니다.";
userSchema.path("password").validate(function(v) {
    var user = this;
    
      // create user
    if(user.isNew){ 
        if(!user.passwordConfirmation){
         user.invalidate("passwordConfirmation", "비밀번호확인이 필요합니다.");
        }
        if(!passwordRegex.test(user.password)){
            user.invalidate("password", passwordRegexErrorMessage);
          } else if(user.password !== user.passwordConfirmation) {
            user.invalidate("passwordConfirmation", "비밀번호가 일치하지 않습니다.");
          }
        }
});



// hash password
userSchema.pre("save", function (next){
    var user = this;
    if(!user.isModified("password")){
     return next();
    } else {
     user.password = bcrypt.hashSync(user.password);
     return next();
    }
   });
   
   // model methods 
   userSchema.methods.authenticate = function (password) {
    var user = this;
    return bcrypt.compareSync(password,user.password);
   };

   

module.exports =  mongoose.model('owner', userSchema);
