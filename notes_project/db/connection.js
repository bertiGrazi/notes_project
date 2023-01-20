//classe de conecção
const { MongoClient } = require("mongodb");
//url de conexão
const url = "mongodb://localhost:27017/notesDb";

let _db;

//inicializar o banco
const initDb = (callback) => {
  MongoClient.connect(url, { useUnifiedTopology: true })
  .then((client) => {
    _db = client;
    callback(null, _db);
  }).catch((err) => {
    callback(err);
  });
};

const getDb = () => {
  return _db;
}

module.exports = {
  initDb,
  getDb
}