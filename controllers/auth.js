const bycrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        path: '/login',
        errMsg: message,
        pageTitle: 'Login',
    });
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                req.flash('error', 'Invalid email or password');
                return res.redirect('/login');
            }
            bycrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.user = user;
                        req.session.isLoggedIn = true;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect("/");
                        });
                    }
                    req.flash('error', 'Password not matched');
                    return res.redirect('/login');
                })
                .catch(err => console.log(err));


        })
        .catch(err => console.log(err));

}
exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    })
}

// Signup controllers
exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup', {
        path: '/signup',
        errMsg: message,
        pageTitle: 'Sign up',
    });
}

exports.postSignup = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    // console.log(name, email, password);

    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                req.flash('error', 'E-mail exists already. Use another one.');
                return res.redirect('/signup');
            }
            return bycrypt.hash(password, 12)
                .then(hasedPass => {
                    const user = new User({
                        name: name,
                        email: email,
                        password: hasedPass,
                        cart: { items: [] }
                    });
                    return user.save();
                })
                .then(result => {
                    res.redirect("/login");
                });
        })
        .catch(err => console.log(err))
}