const express = require("express");
var cors = require("cors");
const ConnectDB = require("./db/mongodb");

const task = require("./routes/task");

ConnectDB.conectarMongo();

const app = express();
app.use(express.json()); // middleware
app.use(cors()); // middleware

app.use("/task", task);

console.log("SERVIDOR INICIALIZADO");
app.listen(3000);