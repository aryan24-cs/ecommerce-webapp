const Product = require('../models/Product');

// Create new product   =>   /api/v1/admin/product/new
exports.newProduct = async (req, res, next) => {
    try {
        req.body.user = req.user.id;

        // Note: Image handling would typically happen in a middleware before this
        // and add info to req.body. For now, assuming images[0].url is provided or handled.

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all products   =>   /api/v1/products
exports.getProducts = async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        count: products.length,
        products
    });
};

// Get single product details   =>   /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
        success: true,
        product
    });
};

// Update Product   =>   /api/v1/admin/product/:id
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        product
    });
};

// Delete Product   =>   /api/v1/admin/product/:id
exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Product deleted'
    });
};
