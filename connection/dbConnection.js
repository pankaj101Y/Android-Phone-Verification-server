var mongoose =require('mongoose');
mongoose.Promise=global.Promise;

const dbURI="mongodb://second:21eesfdrfWsaQ34@ds161426.mlab.com:61426/mobile_verify";


//'mongodb://localhost:27017/OpenApp'
mongoose.connect(dbURI);

module.exports={mongoose};
