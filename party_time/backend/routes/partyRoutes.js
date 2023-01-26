const router = require("express").Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");

const Party = require("../models/party");
const User = require("../models/user");

//define file storage 
const diskStorage = require("../helpers/file-storage");
const upload = multer({ storage: diskStorage });
// middlewares
const verifyToken = require("../helpers/check-token");

// helpers
const getUserByToken = require("../helpers/get-user-by-token");

// create new party
router.post("/", verifyToken, upload.fields([{name: "photos"}]), async (req, res) => {

  // req data
  const title = req.body.title;
  const description = req.body.description;
  const partyDate = req.body.party_date;

  let files = [];

  if(req.files) {
    files = req.files.photos;
  }

  // validations
  if(title == "null" || description == "null" || partyDate == "null") {
    return res.status(400).json({ error: "Preencha pelo menos nome, descrição e data." });
  }

  // verify user 
  const token = req.header("auth-token");

  const userByToken = await getUserByToken(token);
  
  const userId = userByToken._id.toString(); 

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(400).json({ error: "O usuário não existe!" });
  }

  // create photos array with path
  let photos = [];

  if(files && files.length > 0) {    

    files.forEach((photo, i) => {
      photos[i] = photo.path;
    });

  }

  const party = new Party({
    title: title,
    description: description,
    partyDate: partyDate,
    photos: photos,
    privacy: req.body.privacy,
    userId: userId
  });

  try {      

      const newParty = await party.save();
      res.json({ error: null, msg: "Evento criado com sucesso!", data: newParty });

  } catch (error) {

      res.status(400).json({ error })
      
  }
});

//get all public parties
router.get("/all", async (req, res) => {
  try {
    const parties = await Party.findOne({ privacy: false }).sort([['_id', -1]]); 
    res.json({ error: null, parties: parties }); 
  } catch (err) {
    res.status(400),json({error});
  }
})

module.exports = router;