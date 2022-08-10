const mongoose = require('mongoose');
const PostSchema = require('../schemas/PostSchema');
const Util = require('../utils/util')
const postController = {};
const Post = mongoose.model('Post', PostSchema);

 
// Get All Post Controller
postController.getAll = (req, res) => { 
    Post.find({})
        .populate('category')
        .populate('author')
        .exec((err, data)=> {
            Util.apiResponse(res, err, Util.apiSuccessMessage.POSTS_INSIRTED,  null, data)
        });
}

// Create Post Controller
postController.create = async (req, res) => { 
    const newPost = Post(req.body) 
    await newPost.save((err, post)=>{
        Util.apiResponse(res, err, Util.apiSuccessMessage.POST_CREATED,  null, post)
    })
}

// Get Single Post Controller
postController.show = (req, res) => { 
    Post.findById(req.params.id, (err, post)=> {
        let message = null; 
        Util.apiResponse(res, err, Util.apiSuccessMessage.POST_INSIRTED,  Util.apiErrorMessage.POST_NOT_FOUND, post)
    })
}

// Update Single Post Controller
postController.update = (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, post) => { 
        Util.apiResponse(res, err, Util.apiSuccessMessage.POST_UPDATED,  null, post)
    })
}

// Delete Post Controller
postController.delete = (req, res) => {
    Post.findByIdAndDelete(req.params.id, (err)=> {
        Util.apiResponse(res, err, Util.apiSuccessMessage.POST_DELETED,  null)
    })
}

module.exports = postController;