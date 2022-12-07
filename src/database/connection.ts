import {Sequelize} from 'sequelize-typescript';
import * as dotenv from 'dotenv';

dotenv.config();
export const conn: Sequelize = new Sequelize({
  dialect: "postgres",
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
});