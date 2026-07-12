import Sequelize from "sequelize";
import sequelize from "../db/connectDb.js";
import { DataTypes, UUID } from "sequelize";




const BookAuthor = sequelize.define("BookAuthor", {
  book_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
  author_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
}, { timestamps: false });

export default BookAuthor;