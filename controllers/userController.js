const mongoose = require('mongoose');
const bcrtpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Util = require('../utils/util')
const config = process.env;
const UserSchema = require('../schemas/userSchema');
const userController = {};
const User = mongoose.model('User', UserSchema);


// User Login Controller
userController.login = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!(email || password)){
            res.status(400).send({
                message: "Email and Password is required"
            })
        } 

        const user = await User.findOne({email});
         
        if(user && (await bcrtpt.compare(password, user.password))){
            const token = jwt.sign(
                {
                    user_id: user._id, 
                    email
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            )

            user.token = token;
            user.save((err, user)=> {
                if(err){
                    res.status(500).send(err)
                }else{
                    res.status(200).json({
                        message: "You are successfully Logged In",
                        token: token
                    });
                }
            }) 
            return;
        }

        res.status(400).json({
            message: "Invalid Credentials"
        })

    }catch(err) {
        res.status(500).json(err)
    }
}


userController.logout = (req, res) => { 

    const user = req.user;
    user.token = '';
    user.save((err, user)=> {
            if(err) return res.status(500).json(err)
            else{
                res.status(200).json({
                    message: "Your have been Logged Out"
                })
            }
        })

    // req.user.deleteToken(req.token, (err, user)=> {
    //     if(err) return res.status(500).json(err)
    //     else{
    //         res.status(200).json({
    //             message: "Your have been Logged Out"
    //         })
    //     }
    // })
     
}


// Get All User Controller
userController.getAll = (req, res) => { 
    User.find({}, (err, data)=> {
        Util.apiResponse(res, err, Util.apiSuccessMessage.USERS_INSIRTED,  null, data)
    })
}

// Create User Controller
userController.create = async (req, res) => {
    const newUser = User(req.body)
    newUser.password = bcrtpt.hashSync(req.body.password, 10) ;
    await newUser.save((err, user)=>{
        if(user){
            user = user.toObject();
            delete user.password;
        } 
        Util.apiResponse(res, err, Util.apiSuccessMessage.USER_CREATED,  null, user)
    })
}

// Get Single User Controller
userController.show = (req, res) => { 
    User.findById(req.params.id, (err, user)=> {
        let message = null;
        if(user){
            user = user.toObject();
            delete user.password;
            message = Util.apiErrorMessage.USER_INSIRTED
        }else{
            message = Util.apiErrorMessage.USER_NOT_FOUND
        }
        Util.apiResponse(res, err, Util.apiSuccessMessage.USER_INSIRTED,  Util.apiErrorMessage.USER_NOT_FOUND, user)
    })
}

// Update Single User Controller
userController.update = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        user = user.toObject();
        delete user.password;
        Util.apiResponse(res, err, Util.apiSuccessMessage.USER_UPDATED,  null, user)
    })
}

// Delete User Controller
userController.delete = (req, res) => { 
    console.log(req.params.id)
    User.findByIdAndDelete(req.params.id, (err)=> {
        Util.apiResponse(res, err, Util.apiSuccessMessage.USER_DELETED,  null)
    })
}

module.exports = userController;