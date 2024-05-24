const express = require('express')
const userRouter = express.Router()
const {authenticate, authorize}= require('../middlewares/authenticate.middleware')
const {getAllUsers, getUser, addUser, updateUser, deleteUser, loginUser, user } = require('../dal/user.dal')


userRouter.route('/')
    .get(getAllUsers)
    .post(addUser)

 // User login route
userRouter.route('/login').post(loginUser);  
userRouter.route('/user').get(authenticate,user);   

userRouter.route('/logout').post((req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'Strict' // CSRF protection
  });
  res.json({ message: 'Logout successful' });
});

userRouter.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(authenticate,deleteUser);

module.exports =userRouter