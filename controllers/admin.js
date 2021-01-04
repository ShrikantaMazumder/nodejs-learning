// Mongoose Code
const Product = require('../models/product');

// Add new product
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const image = req.body.image;
    const description = req.body.description;
    const price = req.body.price;

    const product = new Product({
        title: title,
        image: image,
        description: description,
        price: price,
        userId: req.user // This will only take userId except taking whole object
    });

    //Here save method provided by mongoose not defined by us
    product.save()
        .then(() => {
            console.log('Product Created')
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err));
}
// Add product form
exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product',
        {
            title: 'Add Product',
            path: '/admin/add-product',
            isAuthenticated: req.session.isLoggedIn,
            editing: false,
        });
};

// Get all products
exports.getProducts = (req, res, next) => {
    Product.find()
        // .populate('userId') Get all user data by userId
        .then(products => {
            console.log(products);
            res.render('admin/products',
                {
                    prods: products,
                    title: 'Admin Products',
                    path: '/admin/products',
                    hasProduct: products.length > 0,
                    isAuthenticated: req.session.isLoggedIn,
                });
        })
        .catch(err => console.log('Failed to fetch data.'))
}
// Edit product form
exports.getEditProduct = (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product',
                {
                    title: 'Edit Product',
                    path: '/admin/edit-product',
                    isAuthenticated: req.session.isLoggedIn,
                    product: product
                });
        })
        .catch(err => console.log(err) );
};
// Update product
exports.postEditProduct = (req, res, next) => {
    const id = req.params.id;
    const title = req.body.title;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;

    Product.findById(id)
        .then(product => {
            product.title = title;
            product.image = image;
            product.price = price;
            product.description = description;
            return product.save();
        })
        .then(() => {
            console.log('Product Updated')
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err));

}
// Product Delete
exports.postDeleteProduct = (req, res, next) => {
    Product.findOneAndDelete(req.body.productId)
        .then(success => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log('Error from controller', err);
        })
}

// MongoDB Code
/*
const Product = require('../models/product');
const ObjectId = require('mongodb').ObjectId;

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product',
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
    const product = new Product(title,image,price,description, null, req.user._id);

    product.save()
        .then(() => {
            console.log('Product Created')
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))

};


exports.getEditProduct = (req, res, next) => {
    const id = req.params.id;
    Product.getById(id)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product',
                {
                    title: 'Edit Product',
                    path: '/admin/edit-product',
                    product: product
                });
        })
        .catch(err => console.log(err) );
    
};

// Update product
exports.postEditProduct = (req, res, next) => {
    const id = req.params.id;
    const title = req.body.title;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(title,image,price,description, id);
    product.save()
        .then(() => {
            console.log('Product Updated')
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err));
}
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
    Product.deleteById(req.body.productId)
        .then(success => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log('Error from controller', err);
        })
}

 */