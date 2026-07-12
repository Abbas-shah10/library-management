import sequelize from "../db/connectDb.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  role: { type: DataTypes.ENUM("Admin", "Librarian", "Member"), defaultValue: "Member", allowNull: false },
  member_id: { type: DataTypes.INTEGER },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
  last_login: { type: DataTypes.DATE },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { timestamps: false });

export default User;