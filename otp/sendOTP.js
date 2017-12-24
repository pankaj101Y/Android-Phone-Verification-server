/**
 * req:REQUEST OBJECT
 * res:RESPOSE OBJECT
 * saves the phoneNumber of req in as new UnconfirmedUser if already not present
 * with a otp else changes the otp of already present UnconfirmedUser in both
 * case latest otp is send to user mobile phoneNumber
 *
 * body expected:
 *{
 * phoneNumber:<phoneNumber>
  * }
 */
var {UnverifiedUser}=require('../models/UnverifiedUser');
var {sendOTPSms}=require('./sendOTPSms')

function sendOTP(req,res) {
  UnverifiedUser.findOneAndUpdate({
    phoneNumber:req.body.phoneNumber
  },{
    $set:{
          timestamp:Math.floor((new Date().getTime())),
          otp:getOTP()
      }
   },{
     new:true
   }
 ).then((doc)=>{
      if (doc==null)sendFirstTime(req,res);
      else sendUtil(doc,res);
    },(err)=>{
      res.status({State:'failed'});
    });
  }

function sendFirstTime(req,res) {
  var unverifiedUser=new UnverifiedUser({
    timestamp:Math.floor((new Date().getTime())),
    phoneNumber:req.body.phoneNumber,
    otp:getOTP()
  });

  unverifiedUser.save().then((doc)=>{
    sendUtil(doc,res);
  },(err)=>{
    res.status({State:'failed'});
  });
}

function sendUtil(doc,res) {
  sendOTPSms(doc.phoneNumber,doc.otp,res);
}

function getOTP(){
	var len=1000000;
	var num=Math.round(Math.random()*len);
	while((num%10)==0)
		num=Math.round(Math.random()*len);
	return num;
}

module.exports={sendOTP};
