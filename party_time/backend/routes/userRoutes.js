const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

//middlewares 
const verifyToken = require("../helpers/check-token");

//helpers
const getUserByToken = require("../helpers/get-user-by-token"); 

//get an user
router.get("/:id", verifyToken, async(req, res) => {
  //api/user/DH#4*HRDH#4*HRDH#4*HR
  const id = req.params.id;

  //verify user
  try {
      // password: 0 = tirando o dado que não precisamos que nos retorne
    const user = await User.findOne({ _id: id }, { password: 0 });
    res.json({
      error: null, 
      user
    });

  } catch(err) {
    return res.status(400).json({ error: "O usuário não existe!"}); 
  }
});

//update an user
router.put("/",  verifyToken, async (req, res) => {
  const token = req.header("auth-token");
  const user = await getUserByToken(token); 

  const userReqId = req.body.id;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;

  const userId = user._id.toString();

  //ckeck if user id is equal token user id
  if(userId != userReqId) {
    res.status(401).json({error: "Acesso negado! "});
  }

}); 
module.exports = router;