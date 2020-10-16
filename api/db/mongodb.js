const mongoose = require("mongoose");

module.exports = class ConnectDB {
    
    static conectarMongo() {
        const DB_KEY = "mongodb+srv://admin:2sitcYSUmIHF8MEJ@cluster-fabrica.cnc8s.mongodb.net/todo-list?retryWrites=true&w=majority";
        mongoose.connect(DB_KEY, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "ERRO DE CONEXÂO: "));
        db.once("open", () => {
            console.log("CONECTADO COM MONGO");
        });
    }
}