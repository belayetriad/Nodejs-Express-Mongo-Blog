const express = require('express');
const categoryRouter = express.Router();
const auth = require('../middleware/auth');
const categoryController = require('../controllers/categoryController');
 

// This is Protected Route
categoryRouter.get('/', auth, (req, res) => { categoryController.getAll(req, res)})
categoryRouter.post('/', auth, (req, res)=> { categoryController.create(req, res)})
categoryRouter.get('/:id', auth, (req, res)=> { categoryController.show(req, res)})
categoryRouter.put('/:id', auth, (req, res)=> { categoryController.update(req, res)})
categoryRouter.delete('/:id', auth, (req, res) => { categoryController.delete(req, res) } )




module.exports = categoryRouter;
