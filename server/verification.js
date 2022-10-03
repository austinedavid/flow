const jwt = require("jsonwebtoken");

 const verification = (req, res, next)=>{
    const token = req.cookies.access_Token
    
    if(!token){
        return res.send('you are not logged in')
    }

    jwt.verify(token, process.env.JWT__TOKEN, (err, user)=>{
        if(err){
            return res.send('you are not verified, please signin')
        }
         req.user = user

         next()
    })
}

module.exports = {verification}