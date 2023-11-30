const jwt = require('jsonwebtoken');

require('dotenv').config();


exports.auth=(req,res,next)=>{
    const {token}=req.body;
    if(!token){
        res
        .status(400)
        .json({
            success: false,
            message: 'Please Enter Your Token'
        })
    }
    try{
    const decryptToken=jwt.verify(token,process.env.SECRET_KEY);
    req.user=decryptToken;
    next();
    }
    catch(error){
        res
        .status(400)
        .json({
            success: false,
            message: 'Invalid Token'
        })
    }
}


exports.isStudent = (req, res, next) => {
    try {
        const { user } = req;
        if (user.role !== 'Student') {
            res
                .status(400)
                .json({
                    success: false,
                    message: 'You are not allowed to enter the route'
                })
        }
        next();
    }
    catch (error) {
        res
            .status(500)
            .json({
                success: false,
                message: 'Internal Server Error'
            })
    }
}
exports.isAdmin = (req, res, next) => {
    try {
        const { user } = req;
        if (user.role !== 'Admin') {
            res
                .status(400)
                .json({
                    success: false,
                    message: 'You are not allowed to enter the route'
                })
        }
        next();
    }
    catch (error) {
        res
            .status(500)
            .json({
                success: false,
                message: 'Internal Server Error'
            })
    }
}