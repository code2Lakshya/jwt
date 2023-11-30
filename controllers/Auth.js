const user = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.signup = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;
        if (!username || !email || !role) {
            res
                .status(401)
                .json({
                    success: false,
                    message: 'All Fields Are Compulsory'
                })
        }
        const existingUser = await user.findOne({ username });
        if (existingUser) {
            res
                .status(400)
                .json({
                    success: false,
                    message: 'User Already Exists'
                })
        }
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (error) {
            res
                .status(500)
                .json({
                    success: false,
                    message: 'Error Hashing Data'
                })
        }
        const createdUser = await user.create({ username, password: hashedPassword, email, role });
        res
            .status(200)
            .json({
                success: true,
                response: createdUser,
                message: 'User Successfully Signed Up'
            })
    }
    catch (error) {
        res
            .status(500)
            .json({
                success: false,
                message: 'Internal Server Error',
                response: error.message
            })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email.includes('@')) {
            res
                .status(400)
                .json({
                    success: false,
                    message: 'Enter Valid Email'
                })
        }
        let checkUser = await user.findOne({ email });
        if (!checkUser) {
            res
                .status(400)
                .json({
                    success: false,
                    message: 'Not a Registered User'
                })
        }
        let checkPassword = await bcrypt.compare(password, checkUser.password);
        if (!checkPassword) {
            res
                .status(400)
                .json({
                    success: false,
                    message: 'Wrong Password'
                })
        }
        checkUser=checkUser.toObject();
        checkUser.password = undefined;
        const token = jwt.sign(checkUser, process.env.SECRET_KEY, { expiresIn: '2h' });
        checkUser.token = token;
        res
            .cookie('token', token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
            .status(200)
            .json({
                success: true,
                response: checkUser,
                message: 'User Successfully Logged In'
            })
    }
    catch (error) {
        res
            .status(500)
            .json({
                success: false,
                message: 'Internal Server Error',
                response: error.message
            })
    }
}
