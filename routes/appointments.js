const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// POST - Adicionar uma nova consulta
router.post("/", async (req, res) => {
  try {
    const { nomePaciente, nomeDoutor, data, descricao } = req.body; // Corrigido para "data"
    
    // Validação simples (pode ser expandida conforme necessário)
    if (!nomePaciente || !nomeDoutor || !data) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    // Criação de um novo documento
    const newAppointment = new Appointment({
      nomePaciente,
      nomeDoutor,
      data, // Corrigido para "data"
      descricao,
    });

    // Salva o documento no MongoDB
    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment); // Resposta com o documento salvo
  } catch (err) {
    res.status(400).json({ message: "Erro ao criar consulta", error: err.message });
  }
});

// GET - Buscar consultas por nome do paciente
router.get("/search", async (req, res) => {
  const { nomePaciente } = req.query; // Obtém o nome do paciente da query string
  try {
    const appointments = await Appointment.find({ nomePaciente: nomePaciente });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar consultas", error: err.message });
  }
});

// UPDATE - Atualizar consulta por ID
router.put("/:id", async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Consulta não encontrada" });
    }

    res.status(200).json(updatedAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Deletar consulta por ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Consulta não encontrada" });
    }

    res.status(200).json({ message: "Consulta deletada com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;