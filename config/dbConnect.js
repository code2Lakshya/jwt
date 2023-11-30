const mongoose=require('mongoose');

require('dotenv').config();

exports.dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>console.log('Db Connection : SUCCESSFULL'))
    .catch((error)=>{
        console.log('Db Connection : FAILURE');
        console.log(error.message);
        process.exit(1);
    })
}