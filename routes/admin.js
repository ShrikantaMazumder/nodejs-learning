const express = require('express');
const productController = require('../controllers/admin');
const router = express.Router();


 // This is Get request
router.get('/add-product', productController.getAddProduct);

router.get('/products');

// This is Post request
router.post('/add-product', productController.postAddProduct);


module.exports = router;
