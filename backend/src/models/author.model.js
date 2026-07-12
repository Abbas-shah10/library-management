import Sequelize from "sequelize";
import sequelize from "../db/connectDb.js";
import { DataTypes } from "sequelize";

const Author = sequelize.define("Author", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  bio: { type: DataTypes.TEXT },
}, { timestamps: false });

export default Author;