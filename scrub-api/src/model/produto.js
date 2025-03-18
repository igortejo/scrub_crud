import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

// Definição do modelo
const Produto = sequelize.define(
  "Produto",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cor: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tamanho: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: false, //olhar isso (indices)
    },
  },
  {
    tableName: "produtos",
    timestamps: false
  }
);

export default Produto;