import express from "express"
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors"
import { connectDB } from "./config/db.js"
import userRouter  from "./routes/userRoutes.js"
import employeeRouter from "./routes/empoyeeRoutes.js"
import siteSettingRouter from "./routes/siteSetting.js"
import galleryRouter from "./routes/galleryRoutes.js"
import testimonialRouter from "./routes/testimonialRoutes.js";
import contactRouter from "./routes/contactRoutes.js"

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
app.use("/api/site-settings", siteSettingRouter)
app.use("/api/gallery", galleryRouter)
app.use("/api/testimonials", testimonialRouter)
app.use("/api/contacts", contactRouter)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

