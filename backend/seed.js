const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

const products = [
    {
        name: 'Elite Over-Ear Headphones',
        description: 'Experience studio-quality sound with adaptive noise cancellation and 40-hour battery life. Crafted with premium memory foam for all-day comfort.',
        price: 349.99,
        category: 'Electronics',
        stock: 25,
        images: [{
            public_id: 'seed1',
            url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop'
        }]
    },
    {
        name: 'Minimalist Leather Sneakers',
        description: 'Handcrafted from Italian grain leather, these sneakers offer a sleek silhouette that goes with everything from denim to tailored suits.',
        price: 185.00,
        category: 'Footwear',
        stock: 12,
        images: [{
            public_id: 'seed2',
            url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop'
        }]
    },
    {
        name: 'Urban Tech Backpack',
        description: 'Water-resistant roll-top design with a dedicated 16" laptop compartment and magnetic fasteners. The ultimate bag for the modern commuter.',
        price: 120.00,
        category: 'Accessories',
        stock: 40,
        images: [{
            public_id: 'seed3',
            url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop'
        }]
    },
    {
        name: 'Ceramic Smart Watch',
        description: 'A perfect blend of luxury horology and cutting-edge tech. Health tracking, heart rate monitoring, and a sapphire crystal display.',
        price: 599.00,
        category: 'Electronics',
        stock: 8,
        images: [{
            public_id: 'seed4',
            url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'
        }]
    },
    {
        name: 'Wool Blend Minimalist Coat',
        description: 'Tailored for a sharp, modern silhouette. Sustainable wool blend provides warmth without the weight.',
        price: 299.99,
        category: 'Clothing',
        stock: 15,
        images: [{
            public_id: 'seed5',
            url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000&auto=format&fit=crop'
        }]
    },
    {
        name: 'Portable Bluetooth Speaker',
        description: 'Deep bass, 360-degree sound, and completely waterproof. Take the party anywhere with this rugged yet elegant device.',
        price: 79.00,
        category: 'Electronics',
        stock: 50,
        images: [{
            public_id: 'seed6',
            url: 'https://images.unsplash.com/photo-1608156639585-34a0a56ee6b9?q=80&w=1000&auto=format&fit=crop'
        }]
    },
    {
        name: '4K Ultra Slim Monitor',
        description: 'Immaculate color accuracy and borderless design. Perfect for creative professionals and immersive gaming setups.',
        price: 499.00,
        category: 'Electronics',
        stock: 15,
        images: [{
            public_id: 'seed7',
            url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop'
        }]
    },
    {
        name: 'Organic Cotton Relaxed Tee',
        description: 'Ultra-soft, sustainable cotton with a perfect relaxed fit. A timeless staple for every modern wardrobe.',
        price: 35.00,
        category: 'Clothing',
        stock: 100,
        images: [{
            public_id: 'seed8',
            url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop'
        }]
    },
    {
        name: 'Modern Matte Desk Lamp',
        description: 'Adjustable warmth and brightness settings with a sleek matte finish. Elevate your workspace aesthetic.',
        price: 65.00,
        category: 'Home & Garden',
        stock: 30,
        images: [{
            public_id: 'seed9',
            url: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1000&auto=format&fit=crop'
        }]
    },
    {
        name: 'Premium Leather Wallet',
        description: 'Full-grain leather with RFID protection. Slim profile that holds everything you need without the bulk.',
        price: 55.00,
        category: 'Accessories',
        stock: 60,
        images: [{
            public_id: 'seed10',
            url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop'
        }]
    }
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB Connected for seeding...');

        // Create an admin user if not exists to own the products
        let admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            admin = await User.create({
                name: 'System Admin',
                email: 'admin@shopnest.com',
                password: 'password123',
                role: 'admin'
            });
            console.log('Temporary Admin created: admin@shopnest.com / password123');
        }

        await Product.deleteMany();
        console.log('Products deleted');

        const productsWithAdmin = products.map(p => ({ ...p, user: admin._id }));

        await Product.insertMany(productsWithAdmin);
        console.log(`${products.length} Products added successfully!`);

        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error.message);
        process.exit(1);
    }
};

seedProducts();
