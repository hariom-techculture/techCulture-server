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
import projectRouter from "./routes/projectRoutes.js"
import serviceRouter from "./routes/serviceRoutes.js"
import jobPostRouter from "./routes/jobPostRoutes.js"
import jobApplicationRouter from "./routes/jobApplication.js"
import enquiryRouter from "./routes/enquiryRoutes.js"

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
app.use("/api/projects", projectRouter)
app.use("/api/services", serviceRouter)
app.use("/api/job-posts", jobPostRouter);
app.use("/api/job-applications", jobApplicationRouter)
app.use("/api/enquiries", enquiryRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

