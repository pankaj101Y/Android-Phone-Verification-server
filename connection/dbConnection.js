var mongoose =require('mongoose');
mongoose.Promise=global.Promise;

const dbURI="";

//'mongodb://localhost:27017/OpenApp'
mongoose.connect(dbURI);

module.exports={mongoose};
