const express=require('express');
const app=express();

require('dotenv').config();

app.use(express.json());

const router=require('./routes/authRoutes');
app.use('/api/v1',router);

const {dbConnect}=require('./config/dbConnect');
dbConnect();

app.listen(process.env.PORT,()=>{
    console.log('Server Started At Port:',process.env.PORT);
})
app.get('/',(req,res)=>{
    res.send('<h1>Authentication/Authorization</h1>');
})

