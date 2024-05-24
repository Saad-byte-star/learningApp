const { mongoose, SchemaTypes } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    Name: {
        type: SchemaTypes.String,
        required: true,
    },
    Email: {
    type: SchemaTypes.String,
    required: true,
    unique : true
    },
    Password: {
    type: SchemaTypes.String,
    required: true,
    },
    Role: {
    type: SchemaTypes.String,
    default :"Student",
    required: true,
    }
});

// Hashing the password using bcrypt
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified('Password')) {
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.Password, saltRound);
    user.Password = hashPassword;
  } catch (error) {
    console.log(`failed to hash password ${error}`);
  }
});

// Comparing the hash password
userSchema.methods.comparePassword = async function (password) {
  try {
   return await bcrypt.compare(password, this.Password);
  } catch (error) {
    console.log(`failed to compare password ${error}`);
  }
};

// Generating Tokens
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "20m",
      }
    );
  } catch (error) {
    console.log(`failed to generate token ${error}`);
  }
};
const User = mongoose.model("User", userSchema);

module.exports = User;
