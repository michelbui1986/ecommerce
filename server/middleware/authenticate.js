const jwt = require("jsonwebtoken");
const USER = require("../models/usersSchema");
const secretKey = process.env.KEY;
const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.eccomerce;
    // console.log("xxx",token)
    const verifyToken = jwt.verify(token, secretKey);
    // console.log(verifyToken);
    const rootUser = await USER.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("user not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();
  } catch (error) {
    res.status(401).send("Unauthorized:No token found");
    console.log(error);
  }
};

module.exports = authenticate;
