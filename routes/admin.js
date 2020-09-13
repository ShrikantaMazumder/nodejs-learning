const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../utils/path');


 // This is Get request
router.get('/add-product',(req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

    //....
});

// This is Post request
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
    // const method = req.method;
    // if (method === 'POST') {
    //     res.send('<h1>Product added</h1>')
    // }
});


module.exports = router;