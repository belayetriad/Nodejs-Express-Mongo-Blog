const mongoose = require('mongoose');
const CategorySchema = require('../schemas/CategorySchema');
const Util = require('../utils/util')
const categoryController = {};
const Category = mongoose.model('Category', CategorySchema);

 
// Get All Post Category Controller
categoryController.getAll = (req, res) => { 
    Category.find({}, (err, data)=> {
        Util.apiResponse(res, err, Util.apiSuccessMessage.CATEGORIES_INSIRTED,  null, data)
    })
}

// Create Post Category Controller
categoryController.create = async (req, res) => {
    const newCategory = Category(req.body) 
    await newCategory.save((err, Category)=>{
        Util.apiResponse(res, err, Util.apiSuccessMessage.CATEGORY_CREATED,  null, Category)
    })
}

// Get Single Post Category Controller
categoryController.show = (req, res) => { 
    Category.findById(req.params.id, (err, Category)=> {
        let message = null; 
        Util.apiResponse(res, err, Util.apiSuccessMessage.CATEGORY_INSIRTED,  Util.apiErrorMessage.CATEGORY_NOT_FOUND, Category)
    })
}

// Update Single Post Category Controller
categoryController.update = (req, res) => {
    Category.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, Category) => { 
        Util.apiResponse(res, err, Util.apiSuccessMessage.CATEGORY_UPDATED,  null, Category)
    })
}

// Delete Post Category Controller
categoryController.delete = (req, res) => {
    Category.findByIdAndDelete(req.params.id, (err)=> {
        Util.apiResponse(res, err, Util.apiSuccessMessage.CATEGORY_DELETED,  null)
    })
}

module.exports = categoryController;