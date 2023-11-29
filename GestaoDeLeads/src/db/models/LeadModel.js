const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeadSchema = new mongoose.Schema({
  Inscricao: {
    type: String
  },
  Dt_Inscricao: {
    type: String
  },
  Nome: {
    type: String
  },
  Email: {
    type: String
  },
  Num_Telefone: {
    type: String
  },
  Classificacao: {
    type: String
  },
  Dt_Classificacao: {
    type: String
  },
  Curso: {
    type: String
  },
  Duracao: {
    type: String
  },
  CODCurso: {
    type: String
  },
  Turno: {
    type: String
  },
  Filial: {
    type: String
  },
  Modalidade: {
    type: String
  },
  Polo: {
    type: String
  },
  Semestre: {
    type: String
  },
  Valor_Matricula: {
    type: String
  },
  ContratoAceito: {
    type: String
  },
  Tipo_de_Aceite: {
    type: String
  },
  IP_do_Aceite: {
    type: String
  }
});

const LeadData = mongoose.model("Lead", LeadSchema);
module.exports = LeadData;