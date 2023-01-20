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

//Criar Schema
  //nomeDaCollectionNoSigular = nesse caso é pessoa
const pessoaSchema = new mongoose.Schema({
  nome: String, 
  idade: Number,
  profissao: String, 
  empregado: Boolean
})

//Criar Model
const Pessoa = mongoose.model("Pessoa", pessoaSchema);

const matheus = new Pessoa({
  nome: "Matheus",
  idade: 30,
  profissao: "Programador",
  empregado: true
})

console.log(matheus.nome)
console.log(matheus.idade)
console.log(matheus.profissao)
console.log(matheus.empregado)

// Inserir dados
matheus.save(function(err) {
  if(err) {
    console.log(err)
  }
}); 

//Encontrando dados
Pessoa.findOne({ nome: "Matheus"} , function (err, pessoa) {
  console.log("Encontrou: "+ pessoa);
})

// Inserindo diversos dados
// Pessoa.insertMany([
//   {nome: "Pedro", idade: 40, empregado: false},
//   {nome: "Maria", idade: 32, profissao: "Enfermeira", empregado: true},
//   {nome: "Rodrigo", profissao: "Médico", empregado: true}
// ]); 

//Deletando registro 

  //Função para encontrar o nome de uma pessoa
async function getPessoa(nome) {
  const pessoa = await Pessoa.find({nome: nome}).exec();
  if( pessoa.length === 0 ) {
    console.log("Esta pessoa não existe!")
  } else {
    console.log(pessoa)
  }
}


// Pessoa.deleteOne({nome: "Maria"}).exec(); 

// getPessoa("Maria"); 

// // Atualização de dados
//  Pessoa.updateOne({nome: "Rodrigo"}, {idade: 42}).exec();

//  getPessoa("Rodrigo"); 

//Utilizando where

async function getPessoaNomeIdade(nome, idade) {
  const p = await Pessoa
                       .where('idade').gte(idade)
                       .where('nome', nome)
                       .exec()
  if(p.length === 0) {
    console.log("Esta pessoa não existe!");
  } else {
    console.log(p);
  }
}

getPessoaNomeIdade('Rodrigo', 42);