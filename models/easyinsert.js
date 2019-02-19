/* 에어컨설치서비스신청 */
var mongoose = require('mongoose');
var boardSchema = mongoose.Schema({
    move1: String,
    move2: String,
    move3: String,
    custname: String,
    hp1: String,
    hp2: String,
    hp3: String,
    amount: String,
    movedate: String,
    saddr: String,
    eaddr: String,
    date: {type: Date, default: Date.now},
    updated: [{contents: String, date:{type: Date, default: Date.now}}],
    deleted: {type: Boolean, default: false} // true면 삭제 된 경우임
});


// virtuals
boardSchema.virtual("createdDate")
.get(function(){
  return util.getDate(this.createdAt);
});



module.exports =  mongoose.model('easyinsert', boardSchema);