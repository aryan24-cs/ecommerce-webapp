const express = require('express');
const router = express.Router();

const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const upload = require('../utils/multer');

router.get('/products', getProducts);
router.get('/product/:id', getSingleProduct);

router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles('admin'), upload.array('images', 5), newProduct);
router.put('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin'), upload.array('images', 5), updateProduct);
router.delete('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

module.exports = router;
