// Mongoose Code
const Product = require('../models/product');
const Order = require('../models/order');

exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/index',
                {
                    prods: products,
                    title: 'Your Shop',
                    path: '/products',
                    isAuthenticated: req.session.isLoggedIn,
                    hasProduct: products.length > 0
                });
        })
        .catch(err => console.log(err))
}
exports.productDetails = (req, res, next) => {
    const productId = req.params.productId;
    // This findById is a mongoose method
    Product.findById(productId)
        .then(product => {
            res.render('shop/product-details', {prod: product});
        })
        .catch(err => console.log("Product Not Found"))
}
exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId)
        .then(product => {
            req.user.addToCart(product);
        })
        .then(result => {
            console.log("Cart added");
            res.redirect('/cart');
        })
        .catch(err => console.log(err));

}
exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items;
            res.render('shop/cart',
                {
                    title: 'Cart',
                    path: '/cart',
                    isAuthenticated: req.session.isLoggedIn,
                    products: products
                });
        })
        .catch(err => console.log(err));
};
// Remove From Cart
exports.deleteCartItem = ( req, res, next ) => {
    const productId = req.body.productId;
    req.user.removeFromCart(productId)
        .then(result => {
            console.log('Product removed from cart!');
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}
// Order
exports.postOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(i => {
                return { product: {...i.productId._doc}, quantity: i.quantity }
            });
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user // This will take userId automatically
                },
                products: products,
            });
            order.save()
                .then(result => {
                    return req.user.clearCart();
                })
                .then(() => {
                    res.redirect('/order')
                })
                .catch(err => console.log(err));
        })
}
exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
        .then(orders => {
            res.render('shop/order', {
                path: 'order',
                title: 'Orders',
                isAuthenticated: req.session.isLoggedIn,
                orders: orders
            });
        })
        .catch(err => console.log(err));

}


// MongoDB Code
/*
const Product = require('../models/product');

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

 */