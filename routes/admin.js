const express = require('express');
const productController = require('../controllers/product');
const router = express.Router();


 // This is Get request
router.get('/add-product', productController.getAddProduct);

// This is Post request
router.post('/add-product', productController.postAddProduct);


module.exports = router;
