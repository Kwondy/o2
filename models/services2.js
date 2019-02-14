/* 청소서비스신청 */
var mongoose = require('mongoose');
var boardSchema = mongoose.Schema({
  custname: String,
  phone: String,
  s_postcode: String,
  saddr1: String,
  saddr2: String,
  saddr3: String,
  saddr4: String,
  saddrNew: String,
  hyear: String,
  hmonth: String,
  hday: String,
  content: String,
  date: {type: Date, default: Date.now},
  updated: [{contents: String, date:{type: Date, default: Date.now}}],
  deleted: {type: Boolean, default: false} // true면 삭제 된 경우임
});


// virtuals
boardSchema.virtual("createdDate")
.get(function(){
  return util.getDate(this.createdAt);
});



module.exports =  mongoose.model('services2', boardSchema);