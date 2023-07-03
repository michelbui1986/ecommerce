const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = process.env.KEY;

// console.log("secretKey", secretKey);

const userSchema = new mongoose.Schema({
  fname: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not valid email adress");
      }
    },
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
    maxlength: 10,
  },
  password: { type: String, required: true, minlength: 6 },
  cpassword: { type: String, required: true, minlength: 6 },
  tokens: [{ token: { type: String, required: true } }],
  carts: Array,
});
// password hasing
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 12);
    this.cpassword = await bcryptjs.hash(this.cpassword, 12);
  }
  next();
});

// Token generate
userSchema.methods.generateAuthToken = async function () {
  try {
    if (!secretKey) {
      throw new Error("Secret key is missing");
    }
    let token = jwt.sign({ _id: this._id }, secretKey);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    // console.log(this.tokens)
    return token;
  } catch (error) {
    console.log(error);
  }
};
// add to cart data
userSchema.methods.addCartData = async function (cart) {
  try {
    this.carts = this.carts.concat(cart);
    await this.save();
    return this.carts;
  } catch (error) {
    console.log(error);
  }
};

const USER = new mongoose.model("USER", userSchema);

module.exports = USER;
