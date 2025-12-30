const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    getUserProfile,
    logout
} = require('../controllers/authController');

const { isAuthenticatedUser } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.get('/me', isAuthenticatedUser, getUserProfile);

module.exports = router;
