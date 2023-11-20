const mongoose = require("mongoose")

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const connect = () => {
    mongoose.connect('mongodb+srv://Erik:erik01042003@erik.ett1yrz.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: false,
        useUnifiedTopology: false,
    })
    const connection = mongoose.connection;

    connection.on("error", () => {
        console.error("Erro ao conectar com o banco")
    })

    connection.on("open", () => {
        console.log("Conectado com sucesso!")
    })
}

connect();

module.exports = mongoose;