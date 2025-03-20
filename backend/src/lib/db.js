import mongoose from 'mongoose';

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1);
    }
}

export default connectToDb;