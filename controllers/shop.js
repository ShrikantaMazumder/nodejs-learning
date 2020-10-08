const Product = require('../models/product');
const Cart = require('../models/cart');

// exports.getProducts = (req,res,next) => {
//     const products = Product.fetchAll()
//
//     res.render('shop/product-list',
//     {
//         prods: products,
//         title: 'My Shop',
//         path: '/',
//         hasProduct: products.length > 0
//     });
// }

exports.productDetails = (req, res, next) => {
    const productId = req.params.productId;
    Product.getById(productId, prod => {
        res.render('shop/product-details', {prod: prod});
    });
    
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/index',
                {
                    prods: products,
                    title: 'All Products',
                    path: '/',
                    hasProduct: products.length > 0
                });
        })
        .catch(err => console.log("Failed to fetch Data"))


};

exports.getCart = (req, res, next) => {
    res.render('shop/cart',
    {
        title: 'Cart',
        path: '/cart'
    });
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.getById(productId, product => {
        Cart.addProduct(productId, product.price);
    });
    res.redirect('/');
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout',
    {
        title: 'Checkout',
        path: '/checkout'
    });
}