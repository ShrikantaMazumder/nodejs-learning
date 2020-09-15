const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

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

/**
 * Routes filtering
 * all url with /admin will go to this routes.
 * Though /admin is not needed in admin.js file
 */
app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// app.use((req, res, next) => {
//     console.log('I am middleware');
//     next(); // This allows request to continue to the next middleware.
// })


// const server = http.createServer(app);

app.listen(3000, () => console.log('Server running in 3000'));

