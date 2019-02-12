var mongoose = require('mongoose');
var boardSchema = mongoose.Schema({
    writer: String,
    password: String,
    title: String,
    contents: String,
    tel1: String,
    tel2: String,
    tel3: String,
    date: {type: Date, default: Date.now},
    updated: [{contents: String, date:{type: Date, default: Date.now}}],
    deleted: {type: Boolean, default: false} // true면 삭제 된 경우임
});


// virtuals
boardSchema.virtual("createdDate")
.get(function(){
  return util.getDate(this.createdAt);
});



module.exports =  mongoose.model('boardAs', boardSchema);