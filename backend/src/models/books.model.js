import Sequelize from "sequelize";
import sequelize from "../db/connectDb.js";
import { DataTypes, UUID } from "sequelize";

const Book = sequelize.define("Book", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  isbn: { type: DataTypes.STRING(13), allowNull: false, unique: true },
  publisher: { type: DataTypes.STRING(255) },
  publication_year: { type: DataTypes.INTEGER },
  total_copies: { type: DataTypes.INTEGER, defaultValue: 1, allowNull: false },
  available_copies: { type: DataTypes.INTEGER, defaultValue: 1, allowNull: false },
  shelf_location: { type: DataTypes.STRING(50) },
  category_id: { type: DataTypes.INTEGER },
  active: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
}, { timestamps: true });

export default Book;