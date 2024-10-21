import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return mongoose.connection.asPromise();
        }
        const conn = await mongoose.connect("mongodb+srv://moidandsuhaib:moidandsuhaib@first.by3v6yd.mongodb.net/?retryWrites=true&w=majority&appName=First");
        console.log('MongoDB Connected:', conn.connection.host);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); 
    }
};

export default connectDB;