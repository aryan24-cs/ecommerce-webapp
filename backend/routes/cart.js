const express = require('express');
const router = express.Router();

const {
    addItemToCart,
    getCart,
    removeItemFromCart
} = require('../controllers/cartController');

const { isAuthenticatedUser } = require('../middleware/auth');

router.post('/cart/add', isAuthenticatedUser, addItemToCart);
router.get('/cart', isAuthenticatedUser, getCart);
router.delete('/cart/remove/:productId', isAuthenticatedUser, removeItemFromCart);

module.exports = router;
