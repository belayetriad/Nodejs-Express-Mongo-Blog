const mongoose = require('mongoose');  
const UserSchema = require('../schemas/userSchema');
const User = mongoose.model('User', UserSchema);

const verifyToken = (req, res, next) => { 
    
    // Get Authorization Token
    const authHeader = req.headers['authorization'];

    const token = authHeader.split(' ')[1]; 
     
    // Check Token Here
    if(!token){
        return res.status(403).json({
            message: "You are not Logged In!"
        })
    }

    User.findByToken(token,  (err, user)=>{
        if(err) throw err;
        if(!user) return res.status(403).json({
            message: "Your Token is invalid!"
        })

        req.token = token;
        req.user = user;

        // Process for Next
        next();
    }) 
}

module.exports = verifyToken;