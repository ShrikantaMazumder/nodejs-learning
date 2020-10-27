const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {mongoConnect} = require("./utils/database");
const User = require("./models/user");


// Routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Controllers
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

// Make public folder readable anywhere
app.use(express.static(path.join(__dirname, 'public')));

// User route
app.use((req, res, next) => {
    User.findUserById("5f86fa7ee4dfacb76613ca95")
        .then(user => {
            // console.log(user);
            req.user = new User(user.name, user.email, user.cart, user._id);
            next()
        })
        .catch(err => {
            console.log(err);
        });
});
/**
 * Routes filtering
 * all url with /admin will go to this routes.
 * Though /admin is not needed in admin.js file
 */
app.use('/admin',adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404);

app.use((req, res, next) => {
    // console.log('I am middleware');
    next(); // This allows request to continue to the next middleware.
})


// const server = http.createServer(app);


mongoConnect(() => {
    app.listen(5000)
})
