const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

//middlewares 
const verifyToken = require("../helpers/check-token");

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

}); 
module.exports = router;