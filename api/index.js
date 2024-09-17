import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js'

dotenv.config();

mongoose.connect(process.env.MONGODB)
.then(() => {
    console.log('MongoDB is connected')
}).catch((err) => {
    console.log(err);
});

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);   
});

app.use('/api/auth', authRoutes)