import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000

connectDB().catch(err => console.error("MongoDB init error:", err))
connectCloudinary().catch(err => console.error("Cloudinary init error:", err))

// middlewares
app.use(express.json())
app.use(cors())

app.use(async (req, res, next) => {
    try {
        await connectDB()
    } catch (e) {
        console.error("Middleware DB error:", e)
    }
    next()
})

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});

if (!process.env.VERCEL) {
  app.listen(port, () => console.log(`Server started on PORT:${port}`))
}

export default app;