const express = require('express');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

 // This is Get request
router.get('/add-product', isAuth, adminController.getAddProduct);
// This is Post request
router.post('/add-product', isAuth, adminController.postAddProduct);
// all products
router.get('/products', isAuth, adminController.getProducts);
//Edit product
router.get('/edit-product/:id', isAuth, adminController.getEditProduct);
// Update Product
router.post('/edit-product/:id', isAuth, adminController.postEditProduct);
// // Delete product
router.post('/delete-product', isAuth, adminController.postDeleteProduct);


module.exports = router;
