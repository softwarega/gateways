import { getDb } from "./db/conn.js";
import { ObjectId } from "mongodb";
import { config } from "dotenv";

config();

const getAllRecords = () => {
  const db_connect = getDb(process.env.DB_NAME);
  return db_connect.collection("gateway").find({});
};

export { getAllRecords };
