const mongoose = require("mongoose")

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

// Estabelecer conexão com o banco de dados
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const connection = mongoose.connection

connection.on("error", console.error.bind(console, "connection error:"))
connection.once("open", () => {
  console.log("Conexão bem-sucedida com o banco de dados!")
})

connect()

module.exports = mongoose
