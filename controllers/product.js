const products = [];

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', 
    { 
        title: 'Add Product', 
        path: '/admin/add-product' 
    });
};

exports.postAddProduct = (req, res, next) => {
    const data = {
        title: req.body.title,
        price: req.body.price
    };
    products.push(data);
    res.redirect('/');
}

exports.getProducts = (req,res,next) => {
    res.render('shop', 
    { 
        prods: products, 
        title: 'My Shop', 
        path: '/',
        hasProduct: products.length > 0
    });
}

exports.products = products;