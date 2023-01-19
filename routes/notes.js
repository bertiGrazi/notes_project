const Router = require('express').Router;
const db = require('../db/connection');
const { ObjectId } = require('mongodb');

const router = Router();

//router create form 
router.get('/', function(req, res) {
  res.render('notes/create')
})

// router details view
router.get('/:id', async function(req, res) {
  // :id - dinãmico para saber qual id o mongoDB está pegando
  const id = new ObjectId(req.params.id);

  const note = await db.getDb().db().collection('notes').findOne({_id: id});

  res.render('notes/detail', { note });
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

// edit notes
router.get('/edit/:id', async function(req, res){
  const id = new ObjectId(req.params.id);

  const note = await db.getDb().db().collection('notes').findOne({_id: id});

  res.render('notes/edit', {note});
})

// remove notes
router.post('/delete', function(req, res){
  const data = req.body
  //Colocando o ObjectId para ficar compatível com o MongoDB
  // uma vez que,  id vem um texto e o MongoDB aceita um ObjectId
  const id = new ObjectId(data.id);

  db.getDb()
  .db()
  .collection('notes')
  .deleteOne({_id: id});

  res.redirect(301, '/');
})
module.exports = router;