import Sequelize from "sequelize";
import sequelize from "../db/connectDb.js";
import { DataTypes, UUID } from "sequelize";


const Loan = sequelize.define("Loan", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  book_id: { type: DataTypes.INTEGER, allowNull: false },
  member_id: { type: DataTypes.INTEGER, allowNull: false },
  loan_date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW, allowNull: false },
  due_date: { type: DataTypes.DATEONLY, allowNull: false },
  return_date: { type: DataTypes.DATEONLY },
  status: { type: DataTypes.ENUM("active", "returned", "overdue"), defaultValue: "active", allowNull: false },
}, { timestamps: false });

export default Loan;