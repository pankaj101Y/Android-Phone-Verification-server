var mongoose=require('mongoose');

var UnverifiedUser=mongoose.model('UnverifiedUser',{
  phoneNumber:{
    type:Number,
    require:true,
    minlength:11
  },
  otp:{
    type:Number,
    minlength:6,
    maxlength:6,
    require:true
  },
  timestamp:{
    type:Number,
    require:true,
    minlength:13
  }
});

module.exports={UnverifiedUser};
