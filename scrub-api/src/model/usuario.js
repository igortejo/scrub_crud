const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

// Definição do modelo
const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false, //olhar isso (indices)
    },
    idade: {
      type: DataTypes.INTEGER,
    },
    senha: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "usuarios",
    timestamps: false
  }
);
module.exports = Usuario;