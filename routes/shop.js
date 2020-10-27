const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

// router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get('/cart', shopController.getCart);

router.post('/delete-cart-item', shopController.deleteCartItem);

router.get('/order', shopController.getOrders);

router.post('/create-order', shopController.postOrder);

router.get('/products', shopController.getIndex);

router.get('/products/:productId', shopController.productDetails);

router.get('/checkout', shopController.getCheckout);


module.exports = router;