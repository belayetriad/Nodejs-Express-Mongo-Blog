const mongoose = require('mongoose');
const UserSchema = require('../schemas/userSchema');
const bcrtpt = require('bcrypt');
const Util = require('../utils/util')
const userController = {};
const User = mongoose.model('User', UserSchema);


userController.getAll = (req, res) => {
    User.find({}, (err, data)=> {
        Util.apiResponse(res, err, Util.apiSuccessMessage.USERS_INSIRTED,  null, data)
    })
}

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

userController.update = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        user = user.toObject();
        delete user.password;
        Util.apiResponse(res, err, Util.apiSuccessMessage.USER_UPDATED,  null, user)
    })
}


userController.delete = (req, res) => { 
    console.log(req.params.id)
    User.findByIdAndDelete(req.params.id, (err)=> {
        Util.apiResponse(res, err, Util.apiSuccessMessage.USER_DELETED,  null)
    })
}

module.exports = userController;