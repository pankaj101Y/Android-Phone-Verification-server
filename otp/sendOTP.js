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
          otp:Math.round(Math.random()*1000000)
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
    otp:Math.round(Math.random()*1000000)
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

module.exports={sendOTP};
