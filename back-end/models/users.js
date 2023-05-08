// a mongoose model of a user
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtStrategy = require("../config/jwt-config.js") // import setup options for using JWT in passport

// this is our mongoose model for a user
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  savedRecipes: [{
    type: Schema.Types.ObjectId,
    ref: 'Recipe',
  }],
})

// hash the password before the user is saved
// mongoose provides hooks that allow us to run code before or after specific events
UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.validPassword = async function (password) {
  try {
    //console.log(`input password: ${password}, stored password: ${this.password}\n`)
    const result = await bcrypt.compare(password, this.password);
    //console.log(`result of compare: ${result}\n`);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

// return a JWT token for the user
UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    username: this.username,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
};

// return the user information without sensitive data
UserSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
  }
}

// create a model from this schema
const User = mongoose.model("User", UserSchema)

// export the model
module.exports = User