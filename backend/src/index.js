import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import bookRoutes from './routes/book.route.js';
import connectToDb from './lib/db.js';
dotenv.config();

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectToDb();
});