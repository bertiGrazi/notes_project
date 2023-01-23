const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.js");

// register an user
router.post("/register", async (req, res) => {
  //extracting data
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;

  //check for required fields
  if(name == null || email == null || password == null || confirmpassword == null) {
    return res.status(400).json({ error: "Por favor, preencha todos os campos!"});
  }

  //check if password match
  // if (password != confirmpassword) {
  //   return res.status(400).json({ error: "As senhas não conferem!"});
  // }

    //check if user exists
    // const emailExits = await User.findOne({email: email});

    // if(emailExits) {
    //   return res.status(400).json({ error: "O e-mail informado já está em uso!"});
    // }
});

module.exports = router;