/**
 * resposibility: sends the otp to user machine
 * through a sms.
 * note:otp is same as in unverifiedUser's document.
 */

const {authKey,sms}=require('./sms');

const SendOtp = require('sendotp');
const sendOtp = new SendOtp(authKey,sms);

 function sendOTPSms(phoneNumber,otp,res) {
   sendOtp.send(phoneNumber, 'openApp', otp, (err,data,response)=>{
     console.log(data);
     if(data.type=='success')
        res.send({State:'send'});
     else res.send({State:'failed'});
   });
 }
 module.exports={sendOTPSms};
