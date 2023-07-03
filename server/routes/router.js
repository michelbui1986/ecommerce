const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");
// const products = require("../constant/productsdata");
const USER = require("../models/usersSchema");
const bcrypt = require("bcryptjs");
// const authenticate = require("../middleware/authenticate");

// get the products data
router.get("/getproducts", async (req, res) => {
  try {
    const productsdata = await Products.find();
    // console.log(productsdata)
    res.status(201).json(productsdata);
  } catch (error) {
    console.log(error.message);
  }
});

// register data
router.post("/register", async (req, res) => {
  const { fname, email, mobile, password, cpassword } = req.body;

  if (!fname || !email || !mobile || !password || !cpassword) {
    return res.status(422).json({ error: "Fill in all data" });
  }

  try {
    const premail = await USER.findOne({ email: email });
    const preuser = await USER.findOne({ fname: fname });
    const preumobile = await USER.findOne({ mobile: mobile });

    if (preuser) {
      return res.status(422).json({ error: "This user is already present" });
    } else if (premail) {
      return res.status(422).json({ error: "This email is already present" });
    } else if (preumobile) {
      return res.status(422).json({ error: "This phone is already present" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Passwords do not match" });
    }

    const finalUser = new USER({
      fname,
      email,
      mobile,
      password,
      cpassword,
    });

    const storeData = await finalUser.save();
    return res.status(201).json(storeData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// login user api
router.post("/login", async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "fill the details" });
  }

  try {
    const userLogin = await USER.findOne({ email: email });
    console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      console.log(isMatch);

      if (!isMatch) {
        res.status(400).json({ error: "invalid crediential pass" });
      } else {
        const token = await userLogin.generateAuthToken();
        console.log(token);

        res.cookie("eccomerce", token, {
          expires: new Date(Date.now() + 2589000),
          httpOnly: true,
        });
        res.status(201).json(userLogin);
      }
    } else {
      res.status(400).json({ error: "user not exist" });
    }
  } catch (error) {
    res.status(400).json({ error: "invalid crediential pass" });
    console.log("error the bhai catch ma for login time" + error.message);
  }
});

// get individual data
router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const individual = await Products.findOne({ id: id });
    console.log(individual + "ind mila hai");

    res.status(201).json(individual);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
