const express = require('express');
const userRouter = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

// This is Guest Route
userRouter.post('/login', (req, res) => { userController.login(req, res) } )
userRouter.post('/logout', auth, (req, res) => { userController.logout(req, res) })

// This is Protected Route
userRouter.get('/', auth, (req, res) => { userController.getAll(req, res)})
userRouter.post('/', (req, res)=> { userController.create(req, res)})
userRouter.get('/:id', auth, (req, res)=> { userController.show(req, res)})
userRouter.put('/:id', auth, (req, res)=> { userController.update(req, res)})
userRouter.delete('/:id', auth, (req, res) => { userController.delete(req, res) } )




module.exports = userRouter;
