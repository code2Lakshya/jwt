const express=require('express');
const router=express.Router();

const {signup,login}=require('../controllers/Auth');
const {auth,isAdmin,isStudent}=require('../middlewares/auth');

router.post('/signup',signup);
router.post('/login',login);

//Protected Route
router.post('/student',auth,isStudent,(req,res)=>{
    res.send('Welcome to Students Page');
})
router.post('/admin',auth,isAdmin,(req,res)=>{
    res.send('Welcome to Admin Page');
})

module.exports=router;