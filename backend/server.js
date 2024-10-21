import express, { json } from 'express';
import { config } from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/auth';
import petRoutes from './routes/pets';
import adoptionRoutes from './routes/adoption';

// Load environment variables
config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middleware
app.use(json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/adoption', adoptionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
