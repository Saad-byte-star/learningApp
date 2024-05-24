const User = require("../models/user.model");

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failed to get all users " });
  }
}

async function getUser(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ message: `user not found for id:${userId}` });
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failed to get user" });
  }
}

async function addUser(req, res) {
  try {
    const { Name, Email, Password, Role } = req.body;
    console.log(req.body);
    const userExist = await User.findOne({ Email: Email });

    if (userExist) {
      return res
        .status(400)
        .json({ msg: `User with this Email already exists` });
    }

    const created = await User.create({ Name, Email, Password, Role });
    res.header("location", `${req.originalUrl}/${created._id}`);
    res.status(201).json({
      msg: `Registration Successfull`,
      name: created.Name,
      token: await created.generateToken(),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failed to add user" });
  }
}

async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const { Name, Email, Password, Role } = req.body;
    
    const updated = await User.findByIdAndUpdate(
      userId,
      { Name, Email, Password, Role },
      { new: true }
    );
    if (!updated)
      return res
        .status(404)
        .json({ message: `failed to update because it is not found` });
    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failed to update user" });
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted)
      return res
        .status(404)
        .json({ message: `failed to delete because it is not found` });
    return res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Failed to delete user` });
  }
}

async function loginUser(req, res) {
  try {
    const { Email, Password } = req.body;
    const userExists = await User.findOne({ Email });

    if (!userExists) {
      return res.status(400).json({ message: `User not found` });
    }

    const isPasswordValid = await userExists.comparePassword(Password);

    if (!isPasswordValid)
      return res.status(400).json({ message: `Invalid password` });

    const token = await userExists.generateToken();
    console.log(token)
    try{
      res.cookie("token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production", // Ensure secure flag is set in production
        sameSite: "Strict", // CSRF protection
      });
      return res.status(200).json({
        message: 'login succesful'
      });  
    }catch(error){
      console.error(error);
      console.log('unable to set cookie');
      return res.status(500).json({
        message: 'unable to generate cookie'
      });  
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Failed to login`,
    });
  }
}

async function user(req, res) {
  try {
    const user = req.user;
    if (!user) return res.status(400).json({ message: `user not found` });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `error from the user route` });
  }
}

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  user,
};
