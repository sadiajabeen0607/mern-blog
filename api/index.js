import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB)
.then(() => {
    console.log('MongoDB is connected')
}).catch((err) => {
    console.log(err);
});

const app = express();
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    
})