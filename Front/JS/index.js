const readExcel = require("read-excel-file/node")
const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")
const fs = require("fs")
const port = 2000
const mongoose = require("mongoose")
const model = require("./db/models/LeadModel")
require("dotenv").config()
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection

db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
  console.log("Conexão bem-sucedida com o banco de dados!")
})

app.use(cors())
app.use(express.json())

async function getContent(files) {
  const result = []
  for await (const file of files) {
    await readExcel(fs.createReadStream(file)).then((table) => {
      result.push(table)
    })
  }
  return result
}

app.post("/", async (req, res) => {
  const files = [path.join(__dirname, "./arquivo.xlsx")]
  const result = await getContent(files)
  const lista_dados = []
  for (let i = 1; i < result[0].length; i++) {
    const registro = {
      Inscricao: result[0][i][0],
      Dt_Inscricao: result[0][i][1],
      Nome: result[0][i][2],
      Email: result[0][i][3],
      Num_Telefone: result[0][i][4],
      Classificacao: result[0][i][5],
      Dt_Classificacao: result[0][i][6],
      Curso: result[0][i][7],
      Duracao: result[0][i][8],
      CODCurso: result[0][i][9],
      Turno: result[0][i][10],
      Filial: result[0][i][11],
      Modalidade: result[0][i][12],
      Polo: result[0][i][13],
      Semestre: result[0][i][14],
      Valor_Matricula: result[0][i][15],
      ContratoAceito: result[0][i][16],
      Tipo_de_Aceite: result[0][i][17],
      IP_do_Aceite: result[0][i][18],
    }
    lista_dados.push(registro)
  }

  // Inserir os registros no banco de dados
  const collection = db.collection("leads")
  collection.insertMany(lista_dados, (err, result) => {
    if (err) {
      console.error("Erro ao inserir registros:", err)
      res.status(500).json({ error: "Erro ao inserir registros" })
    } else {
      console.log("Registros inseridos com sucesso!!")
      res.json({ message: "Registros inseridos com sucesso" })
    }
  })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
