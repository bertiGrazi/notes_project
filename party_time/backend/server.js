//modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//routes 
const authRouter = require("./routes/authRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const partyRouter = require("./routes/partyRoutes.js");
// middlewares 
  //para usuários que já estão logados

//config
const dbName = "partytimeb"
const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// atrelar as rotas no express
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/party", partyRouter);

//mongodb connect
mongoose.set("strictQuery", true);
mongoose.connect(
  `mongodb://localhost/${dbName}`, {
    //mongodb configs default
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  }
);

app.get("/", (req, res) => {
  res.json({
    message: "Rota teste!"
  });
});

app.listen(port, () => {
  console.log(`O backend está rodando na porta ${port}`);
});