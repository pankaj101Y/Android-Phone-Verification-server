var {UnverifiedUser}=require('../models/UnverifiedUser');
var {User}=require('../models/User');

/**
 * req:REQUEST OBJECT
 * res:RESPOSE OBJECT
 *VERIFIES THE OTP AND RETURNS JSON OBJECT WITH KEY otp_status
 *i)key's value is verified if otp is not expired and validated
 *ii)key's value is expired if otp is 5 or more minutes old
 *iii)key's value is invalid if otp requested is not macthed
 */
function verifyOTP(req,res) {
  UnverifiedUser.findOne({phoneNumber:req.body.phoneNumber}).then((un_user)=>{
    if(un_user.otp==req.body.otp){
      if(!isValidOTP(un_user.timestamp)){
        res.send({State:'expired'});
        return;
      }

      User.findOne({phoneNumber:req.body.phoneNumber}).then((user)=>{
        if (user==null) {
          insertNewUser(req.body.phoneNumber,res);
        }else res.send({State:'verified'});
      },(err)=>{
        res.send('something went wrong');
      });
    }else
        res.send({State:'invalid'});
  });
}

/**
 * otpTimeStamp is in milliseconds
 */
function isValidOTP(otpTimeStamp) {
  //validity limit of otp in milliseconds
  const limit=300000;
  //current time in milliseconds
  var t=new Date().getTime();

  if(t-otpTimeStamp<=limit)
     return true;
  return false;
}

function insertNewUser(phonenumber,res) {
  var user=new User({
    phoneNumber:phonenumber
  });

  user.save().then((user)=>{
  //  UnverifiedUser.deleteOne({phoneNumber:user.phoneNumber}).then(()=>{},(err)=>{});
    res.send({State:'verified'});
  },(err)=>{
    res.send({State:'something went wrong'});
  });
}


module.exports={verifyOTP};
