//configs
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express()
const port = 8000;

//DB
const db = require('./db/connection')

// Template engine
const { engine } = require('express-handlebars');
app.engine('handlebars', engine())
app.set('view engine', 'handlebars');
app.use(express.static('public'));
//responsavel por utilizar o corpo da requisição e utiliza-lo como dado. 
app.use(express.urlencoded({ extended: true }))

//Routers Import
const notesRoutes = require('./routes/notes');

//Routers
app.get('/', function(req, res) {
  res.render('home');
})

app.use('/notes', notesRoutes)


db.initDb((err, db) => {
  if(err) {
    console.log(err);
  } else {
    console.log("O banco conectou com sucesso!");
    app.listen(port, () => {
      console.log(`Projeto rodando na porta: ${port}`);
    })
  }
})

