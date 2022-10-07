import { config } from "dotenv"
import mongoose from "mongoose"

config()

const url = process.env.ATLAS_URI

// perform a database connection
mongoose.connect(url)

const database = mongoose.connection

database.on("error", (error) => {
  console.log(error)
})

database.once("connected", () => {
  console.log("Database connection stablished")
})
