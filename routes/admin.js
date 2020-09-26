const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();


 // This is Get request
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

// This is Post request
router.post('/add-product', adminController.postAddProduct);


module.exports = router;
