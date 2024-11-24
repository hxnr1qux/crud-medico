const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const appointmentRoutes = require("./routes/appointments");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());  // Apenas uma vez
app.use(cors());

// Conexão com o MongoDB
mongoose.connect("mongodb+srv://Ian:crudmedicos@biblioteca.1hpqt.mongodb.net/appointments", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Conectado ao MongoDB"))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err.message));

// Rotas
app.use("/api/appointments", appointmentRoutes);

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
