const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')
  console.log(token);
  if (!token) return res.status(401).json({message:`Unauthorized HTTP, Token not provided`})

  
const jwtToken = token.replace('Bearer',"").trim()
try {
    const decode = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)
    const userData = await User.findById(decode.userId).select({Password:0})
  req.user = userData
  req.token = token
  req.userId = userData._id
    next()
} catch (error) {
    console.log(error);
    return res.status(500).json({message:`Unauthorized, Invalid Token`})
}


}

const authorize = async function (rolaName) {
  return function (req, res ,next) {
    if (req.user.Role === rolaName) {
      return next()
    }
    return res.status(401).json({ message: "user is not authorized" });
  }
}
module.exports = {authenticate, authorize}