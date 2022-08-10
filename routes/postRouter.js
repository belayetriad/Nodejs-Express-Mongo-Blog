const express = require('express');
const postRouter = express.Router();
const auth = require('../middleware/auth');
const postController = require('../controllers/postController');
 

// This is Protected Route
postRouter.get('/', auth, (req, res) => { postController.getAll(req, res)})
postRouter.post('/', auth, (req, res)=> { postController.create(req, res)})
postRouter.get('/:id', auth, (req, res)=> { postController.show(req, res)})
postRouter.put('/:id', auth, (req, res)=> { postController.update(req, res)})
postRouter.delete('/:id', auth, (req, res) => { postController.delete(req, res) } )




module.exports = postRouter;
