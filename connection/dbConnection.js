var mongoose =require('mongoose');
mongoose.Promise=global.Promise;

const dbURI="mongodb://one:wqe@Aw5q3qdsf@ds161426.mlab.com:61426/mobile_verify";

//'mongodb://localhost:27017/OpenApp'
mongoose.connectUri(dbURI);

module.exports={mongoose};
