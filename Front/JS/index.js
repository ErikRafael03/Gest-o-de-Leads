const readExcel = require("read-excel-file/node");
const express = require("express")
const app = express()
const arquivo = require("./getArquivo"); 
const cors = require("cors")
const path = require("path")
const fs = require("fs")
const port = 2000
const multer = require('./services/UploadServices');
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

//const files = [arquivo]; //[path.join(__dirname, "./arquivo.xlsx")]

async function getContent(files) {
  const result = []
  for await (const file of files) {
    await readExcel(fs.createReadStream(file)).then((table) => {
      result.push(table)
    })
  }
  return result
}

app.post("/", multer.single('file'), async (req, res) => {
  try {
    const file = req.files[0];
    const files = [path.join(__dirname, './uploaded', file.filename)]

    
    const result = await getContent(files)
    const collection = db.collection("leads")

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

      // Verificar se o registro já existe no banco de dados
      const existingRecord = await collection.findOne({
        Inscricao: registro.Inscricao,
      })

      if (existingRecord) {
        // Se o registro já existe, atualize-o
        console.log("Registro ja existe, substituindo...")
        await collection.findOneAndUpdate(
          { Inscricao: registro.Inscricao },
          { $set: registro }
        )
        console.log(`Registro existente atualizado: ${registro.Inscricao}`)
      } else {
        // Se o registro não existe, insira-o no banco de dados
        await collection.insertOne(registro)
        console.log(`Novo registro inserido: ${registro.Inscricao}`)
      }
    }

    console.log("Processo de verificação e inserção concluído.")
    res.json({ message: "Registros verificados e inseridos com sucesso" })
  } catch (error) {
    console.error("Erro ao verificar e inserir registros:", error)
    res.status(500).json({ error: "Erro ao verificar e inserir registros" })
  }
})

// Configuração do mecanismo de modelo EJS
app.set('view engine', 'ejs');
app.set('Views', path.join(__dirname, './Views/listarTabela'));
app.use(express.static('Views'));

// Rota para renderizar a página com dados do banco
app.get('/listarTabela', async(req, res) => {
  const result = await getContent(files);
  const dadosDoBanco = obterDadosDoBanco(result);

  function obterDadosDoBanco(result) {
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
    return [registro];
  }}
  res.render('listarTabela', { dados: dadosDoBanco });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
