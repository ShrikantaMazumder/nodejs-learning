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

exports.productDetails = (req, res, next) => {
    const productId = req.params.productId;
    Product.getById(productId, prod => {
        res.render('shop/product-details', {prod: prod});
    });
    
}

exports.getIndex = (req, res, next) => {
    const products = Product.fetchAll()
    res.render('shop/index', 
    { 
        prods: products, 
        title: 'All Products', 
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

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    console.log(productId);
    res.redirect('/');
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout',
    {
        title: 'Checkout',
        path: '/checkout'
    });
}