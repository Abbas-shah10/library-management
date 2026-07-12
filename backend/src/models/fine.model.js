import Sequelize from "sequelize";
import sequelize from "../db/connectDb.js";
import { DataTypes, UUID } from "sequelize";

const Fine = sequelize.define("Fine", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  loan_id: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  paid: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  fine_date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW, allowNull: false },
}, { timestamps: false });

export default Fine;