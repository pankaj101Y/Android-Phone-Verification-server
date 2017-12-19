var express=require('express');
var bodyParser=require('body-parser');

var {mongoose}=require('./connection/dbConnection');
var {sendOTP}=require('./otp/sendOTP');
var {verifyOTP}=require('./otp/verifyOTP');

var app=express();
const port=process.env.PORT||3000;

app.use(bodyParser.json());

app.post('/sendOTP',(req,res)=>{
  sendOTP(req,res);
});

app.post('/verifyOTP',(req,res)=>{
  verifyOTP(req,res);
});

app.listen(port,()=>{
  console.log(`server is running now on port ${port}`);
});
