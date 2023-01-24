const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

//middlewares
const verifyToken = require("../helpers/check-token");

//helpers
const getUserByToken = require("../helpers/get-user-by-token");

//get an user
router.get("/:id", verifyToken, async (req, res) => {
  //api/user/DH#4*HRDH#4*HRDH#4*HR
  const id = req.params.id;

  //verify user
  try {
    // password: 0 = tirando o dado que não precisamos que nos retorne
    const user = await User.findOne({ _id: id }, { password: 0 });
    res.json({
      error: null,
      user,
    });
  } catch (err) {
    return res.status(400).json({ error: "O usuário não existe!" });
  }
});

//update an user
router.put("/", verifyToken, async (req, res) => {
  const token = req.header("auth-token");
  const user = await getUserByToken(token);

  const userReqId = req.body.id;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;

  const userId = user._id.toString();

  //ckeck if user id is equal token user id
  if (userId != userReqId) {
    res.status(401).json({ error: "Acesso negado! " });
  }

  //create an user object
  const updateData = {
    name: req.body.name,
    email: req.body.email,
  };

  //check if passwords math
  if (password !== confirmpassword) {
    res.status(401).json({ error: "As senhas não conferem! " });
    //change password
  } else if (password == confirmpassword && password != null) {
    //creating password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // add password to data
    updateData.password = passwordHash;
  }

  try {
    const updateUser = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $set: updateData,
      },
      {
        //atualizando apenas o necessário
        new: true,
      }
    );
    res.json({error: null, msg: "Usuário atualizado com sucesso!", data: updateData }); 
  } catch (error)
  {
    res.status(400).json({ error });
  }
});
module.exports = router;
