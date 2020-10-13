const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();


 // This is Get request
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

// This is Post request
router.post('/add-product', adminController.postAddProduct);

//Edit product
router.get('/edit-product/:id', adminController.getEditProduct);

// Update Product
router.post('/edit-product/:id', adminController.postEditProduct);

// Delete product
router.post('/delete-product', adminController.postDeleteProduct);


module.exports = router;
