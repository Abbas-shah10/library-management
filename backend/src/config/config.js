import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  db: process.env.DB_NAME || 'library',
  dialect: process.env.DB_DIALECT || 'mysql',
};

export default dbConfig;