const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

// Definição do modelo
const Pedido = sequelize.define(
  "Pedido",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descricao: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    usuarioId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false, //olhar isso (indices)
    },
    valorTotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "pedidos",
    timestamps: false
  }
);

module.exports = Pedido;