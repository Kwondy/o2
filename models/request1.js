/* 포장이사견적/신청 */
var mongoose = require('mongoose');
var boardSchema = mongoose.Schema({
    custname: String,
    email: String,
    stel1: String,
    stel2: String,
    stel3: String,
    hp1: String,
    hp2: String,
    hp3: String,
    ontime: String,
    motive: String,
    movetype: String,
    movedateyear: String,
    movedatemonth: String,
    movedateday: String,
    slength: String,
    family: String,
    s_postcode: String,
    saddr1: String,
    saddr2: String,
    saddr3: String,
    sfloor: String,
    saddr4: String,
    saddrNew: String,
    s_bcode: String,
    e_postcode: String,
    eaddr1: String,
    eaddr2: String,
    eaddr3: String,
    efloor: String,
    eaddr4: String,
    eaddrNew: String,
    e_bcode: String,
    date: {type: Date, default: Date.now},
    updated: [{contents: String, date:{type: Date, default: Date.now}}],
    deleted: {type: Boolean, default: false} // true면 삭제 된 경우임
});


// virtuals
boardSchema.virtual("createdDate")
.get(function(){
  return util.getDate(this.createdAt);
});



module.exports =  mongoose.model('request1', boardSchema);