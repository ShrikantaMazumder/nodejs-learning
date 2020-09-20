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
    const price = req.body.price;
    const product = new Product(title, price);
    product.save();    
    res.redirect('/');
}