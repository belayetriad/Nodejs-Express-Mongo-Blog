const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController')

userRouter.get('/', (req, res) => { userController.getAll(req, res)})
userRouter.post('/',(req, res)=> { userController.create(req, res)})
userRouter.get('/:id',(req, res)=> { userController.show(req, res)})
userRouter.put('/:id',(req, res)=> { userController.update(req, res)})
userRouter.delete('/:id', (req, res) => { userController.delete(req, res) } )

module.exports = userRouter;
