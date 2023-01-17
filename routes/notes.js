const Router = require('express').Router;
const db = require('../db/connection');
const { ObjectId } = require('mongodb');

const router = Router();

//router create form 
router.get('/', function(req, res) {
  res.render('notes/create')
})

// sending the note for insertion in the bank
router.post('/', function(req, res){
  //constituindo os dados que adicionarei no sistema
  const data = req.body;
  const title = data.title;
  const description = data.description;

  //conseguir inserir o dado no sistema. 
  db.getDb()
  .db()
  .collection('notes')
  .insertOne({title: title, description: description})

  //mandando o usuário de volta, 301 = status ok 
  res.redirect(301, '/');
})
module.exports = router;