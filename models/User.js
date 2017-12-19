var mongoose=require('mongoose');

var sexEnum=['M','F','O','N'];

var User=mongoose.model('User',{
  phoneNumber:{
    type:Number,
    require:true,
    minlength:11
  },
  firstName:{
    type:String,
    require:true,
    default:null,
    minlength:2,
    trim:true
  },
  lastName:{
    type:String,
    minlength:2,
    trim:true
  },
  age:{
    type:Number,
    maxlength:3,
    require:true,
    default:0
  },
  sex:{
    type:String,
    enum:sexEnum,
    require:true,
    default:"N"
  },
  about:{
    type:String,
    maxlength:140,
    default:null
  },
  photo:{
    type:String,
    default:null
  },
  address:{
    type:String,
    default:null,
    maxlength:512
  }
});

module.exports={User};
