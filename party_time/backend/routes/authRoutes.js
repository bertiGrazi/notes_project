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
  if (password != confirmpassword) {
    return res.status(400).json({ error: "As senhas não conferem!"});
  }

    //check if user exists
    const emailExits = await User.findOne({email: email});
    if(emailExits) {
      return res.status(400).json({ error: "O e-mail informado já está em uso!"});
    }

    // create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    //console.log(passwordHash)

    const user = new User({
      name: name, 
      email: email, 
      password, passwordHash
    });

    try {
      const newUser = await user.save();

      //create token
      const token = jwt.sign(
        // payload 
        {
          name: newUser.name,
          id: newUser._id
        }, 
        "nossoscret"
      );

      //return token 
      res.json({
        error: null,
        msg: "Você realizou o cadastro com sucesso", 
        token: token,
        userId: newUser._id 
      })
    } catch(error) {
      res.status(400).json({ error });
    }

});

//login an user
router.post("/login", async(req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //check if user exist
  const user = await User.findOne({ email: email});

  if (!user) {
    return res.status(400).json({ error: "Não há um usuário cadastrado com esse e-mail!"});
  }
});

module.exports = router;