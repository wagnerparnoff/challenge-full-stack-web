import { Sequelize } from "sequelize";

const sequelize = new Sequelize("grupoa", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexão bem sucedida!");
  } catch (error) {
    console.error("Erro ao conectar:", error);
  }
}

testConnection();

export default sequelize;
