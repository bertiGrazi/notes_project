//configs
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');


const app = express()
const port = 8000;

// Template engine
const { engine } = require('express-handlebars');
app.engine('handlebars', engine())
app.set('view engine', 'handlebars');
app.use(express.static('public'));

//Routers
app.get('/', function(req, res) {
  res.render('home');
})


app.listen(port, () => {
  console.log(`project running on the door: ${port}`);
})