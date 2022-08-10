const Util = {};

// API Response Master Method
Util.apiResponse = (
    res,
    err, 
    sucessMsg, 
    errMsg, 
    data = {}, 
    succesStatus = 200, 
    errorStatus = 500,
    type = ''
) => {
    if(err) res.status(errorStatus).json(errMsg? errMsg : err)
    else res.status(succesStatus).json({
        message: sucessMsg,
        result: data,
        type: type
    })
}

// API Response Success Message
Util.apiSuccessMessage = {
    USER_CREATED: "User Successfully Created!",
    USERS_INSIRTED: "Users Succesfully Inserted!",
    USER_INSIRTED: "User Succesfully Inserted!",
    USER_UPDATED: "User Succesfully Updated!",
    USER_DELETED: "User Succesfully Deleted!",

    CATEGORY_CREATED: "Category Successfully Created!",
    CATEGORIES_INSIRTED: "Categories Succesfully Inserted!",
    CATEGORY_INSIRTED: "Category Succesfully Inserted!",
    CATEGORY_UPDATED: "Category Succesfully Updated!",
    CATEGORY_DELETED: "Category Succesfully Deleted!",


    POST_CREATED: "Post Successfully Created!",
    POSTS_INSIRTED: "Posts Succesfully Inserted!",
    POST_INSIRTED: "Post Succesfully Inserted!",
    POST_UPDATED: "Post Succesfully Updated!",
    POST_DELETED: "Post Succesfully Deleted!",
}

// API Response Error Message
Util.apiErrorMessage = {
    USER_NOT_FOUND: "User Not Found!",
    CATEGORY_NOT_FOUND: "Post Category Not Found!",
    POST_NOT_FOUND: "Post Not Found!"
}




module.exports = Util;