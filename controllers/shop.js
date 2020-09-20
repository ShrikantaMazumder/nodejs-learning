const Product = require('../models/product');  

exports.getProducts = (req,res,next) => {
    const products = Product.fetchAll()
    res.render('shop/product-list', 
    { 
        prods: products, 
        title: 'My Shop', 
        path: '/',
        hasProduct: products.length > 0
    });
}

exports.getIndex = (req, res, next) => {
    const products = Product.fetchAll()
    res.render('shop/index', 
    { 
        prods: products, 
        title: 'My Shop', 
        path: '/',
        hasProduct: products.length > 0
    });
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart',
    {
        title: 'Cart',
        path: '/cart'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout',
    {
        title: 'Checkout',
        path: '/checkout'
    });
}