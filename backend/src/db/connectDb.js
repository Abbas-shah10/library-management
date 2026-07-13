import { Sequelize } from "sequelize";
import dbConfig from '../config/config.js'
const sequelize = new Sequelize(
    dbConfig.db,
    dbConfig.user,
    dbConfig.password,
    {
        dialect: dbConfig.dialect,
        host: dbConfig.host,
        logging: false
    }
);

export default sequelize;
