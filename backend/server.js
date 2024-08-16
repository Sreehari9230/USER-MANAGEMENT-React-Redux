import express from 'express';
import cors from 'cors';
import router from './route/userRoute.js'; // Adjust the path as needed
import mongoose from 'mongoose';
import databaseConnection from './utils/db.js';
import dotenv from 'dotenv';
import adminrouter from './route/adminRoute.js';
dotenv.config();




databaseConnection();
const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);    
app.use('/admin',adminrouter)
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
