const jwt = require('jsonwebtoken');
const config = process.env;


const verifyToken = (req, res, next) => { 
    
    // Get Authorization Token
    const authorization = req.headers.authorization
     
    // Check Token Here
    if(!authorization){
        return res.status(403).json({
            message: "You are not logedin!"
        })
    }

    try{
        // Verify Token Here
        const token = authorization.split(' ')[1]; 
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    }catch(err) {
        return res.status(401).json({
            message: 'Invalid Token!'
        })
    }

    // Process for Next
    return next();
}

module.exports = verifyToken;