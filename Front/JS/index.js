const readExcel = require('read-excel-file/node');//usado para trabalhar com qualquer arquivo excel
const express = require('express')// usado para trabalhar com api
const app = express()
const cors = require('cors');
app.use(cors());
const path = require('path')// usado para interagir com arquivos
const fs = require('fs')// usado para interagir com arquivos
const port = 2000
const db = require('./db/Connection')//Conexão com o banco
const model = require('./db/models/LeadModel');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI);
const { error } = require('console');
app.use(express.json()); //enviar dados no corpo da requisição

async function getContent(files) {
    const result = []
    for await (const file of files) {
        await readExcel(fs.createReadStream(file)).then((table) => {
            result.push(table)
        })
    }
    return result
}

app.post('/',/* upload.single("arquivo"),*/ async (req, res) => {
    const files = [path.join(__dirname, /*getFile()*/'./arquivo.xlsx')]
    const result = await getContent(files);
    var lista_dados = [];
    for (var i = 1; i < result[0].length; i++) {
        var registro = {
            "Inscricao": result[0][i][0],
            "Dt_Inscricao": result[0][i][1],
            "Nome": result[0][i][2],
            "Email": result[0][i][3],
            "Num_Telefone": result[0][i][4],
            "Classificacao": result[0][i][5],
            "Dt_Classificacao": result[0][i][6],
            "Curso": result[0][i][7],
            "Duracao": result[0][i][8],
            "CODCurso": result[0][i][9],
            "Turno": result[0][i][10],
            "Filial": result[0][i][11],
            "Modalidade": result[0][i][12],
            "Polo": result[0][i][13],
            "Semestre": result[0][i][14],
            "Valor_Matricula": result[0][i][15],
            "ContratoAceito": result[0][i][16],
            "Tipo_de_Aceite": result[0][i][17],
            "IP_do_Aceite": result[0][i][18]
        };
        lista_dados[i - 1] = registro;
        db.connect(model).then((erro, banco) => {
            if (erro) throw erro
            var dbo = banco.db("test")
            var obj = { registro }
            var Colecao = "leads"
            console.log(dbo);
        })
            .catch((erro, obj, banco, Colecao, dbo) => {
                dbo.collection(Colecao).insertOne(obj, (erro, result) => {
                    if (erro) throw erro
                    console.log("Inserido com sucesso!!")

                    banco.close()
                })

            })

    }

    res.json(registro);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

require("./db/Connection")