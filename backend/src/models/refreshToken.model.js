import sequelize from "../db/connectDb.js";
import { DataTypes } from "sequelize";

const RefreshToken = sequelize.define("RefreshToken", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  token_hash: { type: DataTypes.STRING(255), allowNull: false },
  expires_at: { type: DataTypes.DATE, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  revoked_at: { type: DataTypes.DATE, defaultValue: null }
}, { timestamps: false });

export default RefreshToken;