import express, { json, urlencoded } from "express";
import cors from "cors";
import { config } from "dotenv";
import { router } from "./routes/index.js";
import "./db/conn.js";

config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
