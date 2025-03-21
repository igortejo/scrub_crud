const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

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
module.exports = Produto;