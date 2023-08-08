var mongoose  = require('mongoose'),
Schema  = mongoose.Schema; // re to store the datastructu

var userSchema = new Schema({
   fullName:{
    type:String,
    required:[true,"fullname not provided"]

   },
   email:{
    type: String,
    unique:[true,"email already exists in db"],
    lowercase:true,
    trim: true,
    required:[true,"email not provided"],
   },
   role:{
    type: String,
    enum: ["normal","admin"],
    required:[true,"role not provided"],
   },
   password:{
    type: String,
    required:[true,"password not provided"],
   },
   created:{
    type: Date,
    default: Date.now
   }
});

module.exports = mongoose.model('User',userSchema);