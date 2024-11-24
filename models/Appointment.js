const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    nomePaciente: { type: String, required: true },
    nomeDoutor: { type: String, required: true },
    data: { type: Date, required: true }, // Corrigido para camelCase
    descricao: { type: String, default: "" }, // Adicionado valor padrão
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);