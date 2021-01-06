const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

router.get('/', shopController.getIndex);
router.get('/products', shopController.getIndex);
router.get('/products/:productId', shopController.productDetails);

router.get('/cart',isAuth, shopController.getCart);

router.post('/cart',isAuth, shopController.postCart);

//
router.post('/delete-cart-item',isAuth, shopController.deleteCartItem);
//
router.get('/order',isAuth, shopController.getOrders);

router.post('/create-order',isAuth, shopController.postOrder);

//
// router.get('/checkout', shopController.getCheckout);


module.exports = router;