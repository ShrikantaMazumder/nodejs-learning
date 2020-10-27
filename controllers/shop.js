const Product = require('../models/product');


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
    Product.getById(productId)
        .then(product => {

            res.render('shop/product-details', {prod: product});
        })
        .catch(err => console.log("Product Not Found"))

    
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
    req.user.getCart()
        .then(products => {
            res.render('shop/cart',
                {
                    title: 'Cart',
                    path: '/cart',
                    products: products
                });
        })
        .catch(err => console.log(err));

};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.getById(productId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            console.log("Cart added");
            res.redirect('/cart');
        })

}

exports.deleteCartItem = ( req, res, next ) => {
    const productId = req.body.productId;
    req.user.deleteItemFromCart(productId)
        .then(result => {
            console.log('Product removed from cart!');
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}

// Order
exports.postOrder = (req, res, next) => {
    req.user
        .addOrder()
        .then(result => {
            res.redirect('/order')
        })
        .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
    req.user.getOrder()
        .then(orders => {
            res.render('shop/order', {
                path: 'order',
                title: 'Orders',
                orders: orders
            });
        })
        .catch(err => console.log(err));

}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout',
    {
        title: 'Checkout',
        path: '/checkout'
    });
}