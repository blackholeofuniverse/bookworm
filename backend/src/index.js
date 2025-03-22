import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import bookRoutes from './routes/book.route.js';
import connectToDb from './lib/db.js';
import cors from "cors"
import job from "./lib/cron.js"
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

job.start()
app.use(express.json())
app.use(cors())

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.get("/", (_req, res) => {
    res.json({message: "Server is running"})
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectToDb();
});