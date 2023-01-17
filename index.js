//configs
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express()
const port = 8000;

//Routers
app.get('/', function(req, res) {
  res.send('O aplicativo está funcionando')
})

app.listen(port, () => {
  console.log(`project running on the door: ${port}`);
})