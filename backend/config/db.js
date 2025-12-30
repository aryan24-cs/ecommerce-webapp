const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to primary URI: ${error.message}`);
        console.log('Attempting to connect to local MongoDB...');
        try {
            const conn = await mongoose.connect('mongodb://127.0.0.1:27017/shopnest');
            console.log(`MongoDB Connected (Local Fallback): ${conn.connection.host}`);
        } catch (localError) {
            console.error(`Local Fallback Error: ${localError.message}`);
            process.exit(1);
        }
    }
};

module.exports = connectDB;
