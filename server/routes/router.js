const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");
// const products = require("../constant/productsdata");
// const USER = require("../models/usersSchema");
// const bcrypt = require("bcryptjs");
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