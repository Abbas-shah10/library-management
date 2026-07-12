import Sequelize from "sequelize";
import sequelize from "../db/connectDb.js";
import { DataTypes, UUID } from "sequelize";


const Reservation = sequelize.define("Reservation", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  book_id: { type: DataTypes.INTEGER, allowNull: false },
  member_id: { type: DataTypes.INTEGER, allowNull: false },
  reservation_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
  status: { type: DataTypes.ENUM("waiting", "fulfilled", "cancelled"), defaultValue: "waiting", allowNull: false },
}, { timestamps: false });

export default Reservation;