const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()


// @creating the function for creating an account
 const createUser = async(req, res, next)=>{
    try {
        const salt =  await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user = new User({...req.body, password: hashedPassword})
        await user.save()
        res.send(user)
    } catch (error) {
        next(error)
    }
}

// @creating the function for signing in a user 
const signinUser = async(req, res, next)=>{
    try {
    // @checking if there  is a user and checking if the password matches
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(404).send('user not found')
    }
    const bcryptCompare = await bcrypt.compare(req.body.password, user.password)
    if(!bcryptCompare){
        return res.status(404).send('password is not correct')
    }

    // @if the user is verified, we run this to send jwt and also to set it in his browser cookies
    
      const token = jwt.sign({id:user._id, email:user.email,password:user.password}, process.env.JWT__TOKEN,)
      res.cookie('access_Token', token, {httpOnly: true})
      .status(200).json(user)
    } catch (error) {
        next(error)
    }
}

// @creating a user using a google account
 const googleSignup = async(req, res, next)=>{
    
    try {
        const user = await User.findOne({email: req.body.email})
        if(user){
            const token = jwt.sign({id:user._id, email:user.email}, process.env.JWT__TOKEN )
            res.cookie("access_Token", token, {
              httpOnly: true, maxAge: 555555555555
            }).status(200).json(user)
        }else{
            const newUser = new User({...req.body, fromGoogle: true})
            const savedUser = await newUser.save()
    
            const token = jwt.sign({id:savedUser._id,  email:savedUser.email}, process.env.JWT__TOKEN )
            res.cookie("access_Token", token, {
              httpOnly: true
            }).status(200).json(user)
        }
    } catch (error) {
        next(error)
    }
  
}

module.exports = {googleSignup, signinUser, createUser}

