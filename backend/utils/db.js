import mongoose from 'mongoose';

const databaseConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Database is connected');
    } catch (error) {
        console.error('Database connection error:', error.message);
        throw error; // Optional: re-throw the error if you want to handle it elsewhere
    }
};

export default databaseConnection;
