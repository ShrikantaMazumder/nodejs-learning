const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', 
    { 
        title: 'Add Product', 
        path: '/admin/add-product' 
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const image = req.body.image;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(title,image,price,description);
    product.save();    
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll()
    res.render('admin/products', 
    { 
        prods: products, 
        title: 'Admin Products', 
        path: '/admin/products',
        hasProduct: products.length > 0
    });
}