const multer = require('multer');


// Configuração do multer para armazenar os arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/files'); // Pasta onde os arquivos serão armazenados
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;