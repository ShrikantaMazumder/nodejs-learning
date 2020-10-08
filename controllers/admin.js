const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', 
    { 
        title: 'Add Product', 
        path: '/admin/add-product',
        editing: false,
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const image = req.body.image;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(title,image,price,description);
    product.save()
        .then(() => {
            console.log('Product Created')
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
    // res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.body.edit;
    console.log(editMode);
    if (!editMode) {
        return res.redirect('/');
    }
    const id = req.params.id;
    Product.getById(id, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', 
        { 
            title: 'Edit Product', 
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    })
    
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('admin/products',
                {
                    prods: products,
                    title: 'Admin Products',
                    path: '/admin/products',
                    hasProduct: products.length > 0
                });
        })
        .catch(err => console.log('Failed to fetch data.'))

}

exports.postDeleteProduct = (req, res, next) => {
    
}