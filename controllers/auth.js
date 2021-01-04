const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false,
    });
}

exports.postLogin = (req, res, next) => {
    User.findById('5f9aef5989fdc7653926c61e')
        .then(user => {
            req.session.user = user;
            req.session.isLoggedIn = true;
            req.session.save(err => {
                console.log(err);
                res.redirect("/");
            });
            
        })
        .catch(err => console.log(err));
    
}
exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    })
}