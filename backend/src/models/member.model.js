import Sequelize from "sequelize";
import sequelize from "../db/connectDb.js";
import { DataTypes, UUID } from "sequelize";

const Member = sequelize.define("Member", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  phone: { type: DataTypes.STRING(20) },
  address: { type: DataTypes.TEXT },
  membership_date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW, allowNull: false },
  membership_type: { type: DataTypes.ENUM("Student", "Faculty", "Public"), allowNull: false },
  max_books_allowed: { type: DataTypes.INTEGER, defaultValue: 3, allowNull: false },
}, { timestamps: true });

export default Member;