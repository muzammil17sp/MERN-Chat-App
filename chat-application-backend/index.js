import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connection } from "./db/connection.js"
import errorHandler from "./middleware/ErrorHandler.js"
import routes from "./routes/routes.js"
const app = express()
app.use(cors())
dotenv.config()

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
connection()


app.use(routes)
app.use(errorHandler)




const PORT = process.env.PORT || 7000
app.listen(PORT, () => {
    console.log(`localhost hi running on port ${PORT}`)
})