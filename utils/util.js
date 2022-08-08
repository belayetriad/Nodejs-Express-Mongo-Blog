const Util = {};


Util.apiResponse = (
    res,
    err, 
    sucessMsg, 
    errMsg, 
    data = {}, 
    succesStatus = 200, 
    errorStatus = 500
) => {
    if(err) res.status(errorStatus).json(errMsg? errMsg : err)
    else res.status(succesStatus).json({
        message: sucessMsg,
        result: data,
        type: "User"
    })
}

Util.apiSuccessMessage = {
    USER_CREATED: "User Successfully Created!",
    USERS_INSIRTED: "Users Succesfully Inserted!",
    USER_INSIRTED: "User Succesfully Inserted!",
    USER_UPDATED: "User Succesfully Updated!",
    USER_DELETED: "User Succesfully Deleted!",
}

Util.apiErrorMessage = {
    USER_NOT_FOUND: "User Not Found!"
}

module.exports = Util;