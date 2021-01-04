const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
//Mongoose
const mongoose = require('mongoose');

// const {mongoConnect} = require("./utils/database");
const User = require("./models/user");

// Routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

// Controllers
const errorController = require('./controllers/error');

const app = express();
//MongoDB Uri
const MONGODB_URI = 'mongodb+srv://mongo-auth:T1s5L63J1XnsIiZG@cluster0.gbyyk.mongodb.net/basic-node?retryWrites=true&w=majority';

// Working with session.
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: "sessions"
});
// Session
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));
app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

// Make public folder readable anywhere
app.use(express.static(path.join(__dirname, 'public')));

// User route

// Mongoose Code
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));

});
// Mongodb
/*
app.use((req, res, next) => {
    User.findUserById("5f9a3e3a2c24c11199946abb")
        .then(user => {
            // console.log(user);
            req.user = new User(user.name, user.email, user.cart, user._id);
            next()
        })
        .catch(err => {
            console.log(err);
        });
});

 */
/**
 * Routes filtering
 * all url with /admin will go to this routes.
 * Though /admin is not needed in admin.js file
 */
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);


app.use(errorController.get404);

app.use((req, res, next) => {
    // console.log('I am middleware');
    next(); // This allows request to continue to the next middleware.
})


// const server = http.createServer(app);


// MongoDB
/*
mongoConnect(() => {
    app.listen(5000)
})
 */

// Mongoose
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        User.findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        name: 'Shrikanta',
                        email: 'shrikanta@test.com',
                        cart: {
                            items: []
                        }
                    });
                    user.save();
                }
            })
        app.listen(5000);
        console.log('DB Connected');
    })
    .catch(err => console.log(err));
