const express = require('express');
const router = express.Router();

//ייבוא הספרים והמשתמשים
const bookRoutes = require('./book.route');
const userRoutes = require('./user.route');

// הגדרת הקידומות לכל נתיב
router.use('/books', bookRoutes);
router.use('/users', userRoutes);

module.exports = router;