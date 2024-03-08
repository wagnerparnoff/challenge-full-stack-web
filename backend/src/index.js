import express from "express";
import bodyParser from "body-parser";
import studentRoutes from "./routes/studentRoutes.js";
import cors from 'cors';

const app = express();

// Importando o Sequelize e sincronizando o banco de dados
import database from './config/sequelize.js';
import students from './models/studentModel.js';
(async () => {
  await database.sync();
})();

// Middleware para analisar o corpo das solicitações em JSON
app.use(bodyParser.json());

// Permitir todas as origens
app.use(cors());

// Rotas relacionadas aos students
app.use("/api", studentRoutes);

// Middleware para tratamento de erros
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Erro interno do servidor" });
});

// Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
