var express=require('express');
var bodyParser=require('body-parser');

var {mongoose}=require('./connection/dbConnection');
var {sendOTP}=require('./otp/sendOTP');
var {verifyOTP}=require('./otp/verifyOTP');

var app=express();

app.use(bodyParser.json());

app.post('/sendOTP',(req,res)=>{
  sendOTP(req,res);
});

app.post('/verifyOTP',(req,res)=>{
  verifyOTP(req,res);
});

app.listen('3000',()=>{
  console.log(`server is running now on port ${port}`);
});
