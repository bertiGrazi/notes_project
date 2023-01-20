//Conexão MongoDB

//Importando o pacote
const mongoose = require('mongoose');

//conectando passando meu servidor e o nome do banco + configurações do mongoose para não ter nenhum alerta ou reclamação no terminal.
 mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true})

//pegar essa conexão 

const db = mongoose.connection;

//se der algum erro
db.on('error', console.error.bind(console, 'connection error: ')); 

//tentar abrir a conexão e se estiver conectado vai mandar a mensagem
db.once('open', function() {
  console.log("Estamos conectados ao MongoDB!")
});