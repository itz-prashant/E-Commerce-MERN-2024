const User = require("../../models/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const JWT_SECRET_KEY = "psycho-key"

const registerUser = async (req,res)=>{
    const {userName, email, password} = req.body;

    try {
        const checkUser = await User.findOne({email})
        if(checkUser)
            return res.json({
                success: false,
                message: 'Email already exist'
            })
        
        const hashPassword = await bcrypt.hash(password, 12)
        const newUser = new User({
            userName,
            email,
            password: hashPassword
         }) 
         await newUser.save()
         res.status(200).json({
            success: true,
            message: 'Registration Successfull'
        })    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occured'
        })
    }
}

const loginUser = async (req,res)=>{
    const {email, password} = req.body;
    try {
        const checkUser = await User.findOne({email})
        if(!checkUser) return res.json({
            success: false,
            message: 'Email is not register! Check your email'
        })

        const checkPassword = await bcrypt.compare(password, checkUser.password)
        if(!checkPassword)return res.json({
            success: false,
            message: 'Incorrect Password ! Please try again'
        })

        const token = jwt.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email
        }, JWT_SECRET_KEY, {expiresIn: '1h'})

        res.cookie('token', token,{
            path: '/',
            httpOnly: true,
            secure: false
        }).json({
            success: true,
            message: 'Login Successfully',
            user: {
                id: checkUser._id,
                role: checkUser.role,
                email: checkUser.email
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occured'
        })
    }
}

// Logout 

const logoutUser = (req, res) =>{
    res.clearCookie('token').json({
        success: true,
        message: 'Logout successfully'
    })
}

// Auth middleware

const authMiddleware = async (req, res, next)=>{
    const token = req.cookies.token;

    if(!token) return res.status(401).json({
        success: false,
        message: 'Unautherised user'
    })

    try {
        const decode = jwt.verify(token, JWT_SECRET_KEY)
        req.user = decode;
        next()
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Unautherised user'
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    authMiddleware
}