import express from "express"
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors"
import { connectDB } from "./config/db.js"
import userRouter  from "./routes/userRoutes.js"
import employeeRouter from "./routes/empoyeeRoutes.js"

const app = express()
const PORT = process.env.PORT || 5000
app.use(cors("*"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
connectDB()

app.get("/", (req, res) => {
  res.send("Welcome to Tech Culture API")
})

app.use("/api/users", userRouter)
app.use("/api/employees", employeeRouter)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

