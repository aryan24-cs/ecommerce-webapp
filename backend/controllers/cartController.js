const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add item to cart   =>   /api/v1/cart/add
exports.addItemToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = await Cart.create({
                user: req.user.id,
                cartItems: [{ product: productId, quantity, price: product.price }]
            });
        } else {
            const itemIndex = cart.cartItems.findIndex(p => p.product.toString() === productId);

            if (itemIndex > -1) {
                cart.cartItems[itemIndex].quantity += quantity;
            } else {
                cart.cartItems.push({ product: productId, quantity, price: product.price });
            }
            await cart.save();
        }

        cart = await Cart.findOne({ user: req.user.id }).populate('cartItems.product');
        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get user cart   =>   /api/v1/cart
exports.getCart = async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.user.id }).populate('cartItems.product');
    res.status(200).json({ success: true, cart });
};

// Remove item from cart   =>   /api/v1/cart/remove/:productId
exports.removeItemFromCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (cart) {
            cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== req.params.productId);
            await cart.save();
            cart = await Cart.findOne({ user: req.user.id }).populate('cartItems.product');
        }

        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
