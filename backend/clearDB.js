const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

// Import models
const Product = require('./models/Product');
const Order = require('./models/Order');
const User = require('./models/User');
const Cart = require('./models/Cart');
const Invoice = require('./models/Invoice');

const clearDatabase = async () => {
    try {
        // Connect to MongoDB
        const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce';
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');

        // Clear all collections
        console.log('Clearing database...');

        await Product.deleteMany({});
        console.log('✓ Products cleared');

        await Order.deleteMany({});
        console.log('✓ Orders cleared');

        await Cart.deleteMany({});
        console.log('✓ Carts cleared');

        await Invoice.deleteMany({});
        console.log('✓ Invoices cleared');

        // Optionally clear users (uncomment if needed)
        // await User.deleteMany({});
        // console.log('✓ Users cleared');

        console.log('\n✅ Database cleared successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error clearing database:', error.message);
        process.exit(1);
    }
};

clearDatabase();
