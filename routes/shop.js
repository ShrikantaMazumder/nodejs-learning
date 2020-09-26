const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get('/products', shopController.getIndex);

router.get('/products/:productId', shopController.productDetails);

router.get('/checkout', shopController.getCheckout);


module.exports = router;