const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");
// const products = require("../constant/productsdata");
const USER = require("../models/usersSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

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
   return res.status(400).json({ error: "fill the details" });
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
          httpOnly: true,
        });
        res.status(201).json(userLogin);
      }
    } else {
      res.status(400).json({ error: "user not exist" });
    }
  } catch (error) {
    res.status(400).json({ error: "invalid crediential pass" });
    console.log("error login time" + error.message);
  }
});

// adding the data into cart

router.post("/addcart/:id", authenticate, async (req, res) => {
  try {
    // console.log("perfect 6");
    const { id } = req.params;
    const cart = await Products.findOne({ id: id });
    // console.log(cart + "cart value");
    const UserContact = await USER.findOne({ _id: req.userID });
    // console.log(UserContact);

    if (UserContact) {
      const cartData = await UserContact.addCartData(cart);
      await UserContact.save();
      // console.log(cartData);
      res.status(201).json(UserContact);
      console.log("Success");
    } else {
      res.status(401).json({ error: "invalid user" });
    }
  } catch (error) {
    res.status(401).json({ error: "invalid user" });
  }
});

// get cart details

router.get("/cartdetails", authenticate, async (req, res) => {
  try {
    const buyUser = await USER.findOne({ _id: req.userID });
    res.status(201).json(buyUser);
  } catch (error) {
    console.log("error: ", error);
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

// remove item from the cart

router.get("/remove/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    req.rootUser.carts = req.rootUser.carts.filter((cruval) => {
      return cruval.id != id;
    });

    req.rootUser.save();
    res.status(201).json(req.rootUser);
    console.log("item remove");
  } catch (error) {
    console.log(error + "jwt provide then remove");
    res.status(400).json(error);
  }
});

// for user log out
router.get("/logout", authenticate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token !== req.token;
    });

    res.clearCookie("eccomerce", { path: "/" });
    req.rootUser.save();
    res.status(201).json(req.rootUser.tokens);
    console.log("user log out");
  } catch (error) {
    console.log(error + "jwt provide then logout");
  }
});

module.exports = router;
