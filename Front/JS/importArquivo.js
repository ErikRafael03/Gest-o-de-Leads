const express = require('express');
const path = require('path');
const multer = require('multer');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

// Configuração do multer para armazenar os arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload'); // Pasta onde os arquivos serão armazenados
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Servir a página HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para lidar com o upload do arquivo
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('Arquivo enviado com sucesso!');
});

// Rota para acessar os arquivos carregados
app.use('/uploaded', express.static('upload'));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
