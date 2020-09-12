const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Routes filtering
 * all url with /admin will go to this routes.
 * Though /admin is not needed in admin.js file
 */
app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found.</h1>');
});

// app.use((req, res, next) => {
//     console.log('I am middleware');
//     next(); // This allows request to continue to the next middleware.
// })


// const server = http.createServer(app);

app.listen(3000, () => console.log('Server running in 3000'));

