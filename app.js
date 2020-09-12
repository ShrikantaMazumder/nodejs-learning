const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const clientRoutes = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(adminRoutes);
app.use(clientRoutes);

// app.use((req, res, next) => {
//     console.log('I am middleware');
//     next(); // This allows request to continue to the next middleware.
// })


// const server = http.createServer(app);

app.listen(3000, () => console.log('Server running in 3000'));

