const Product = require('../models/product');  

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', 
    { 
        title: 'Add Product', 
        path: '/admin/add-product' 
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const product = new Product(title, price);
    product.save();    
    res.redirect('/');
}

exports.getProducts = (req,res,next) => {
    const products = Product.fetchAll()
    res.render('shop', 
    { 
        prods: products, 
        title: 'My Shop', 
        path: '/',
        hasProduct: products.length > 0
    });
}