const express = require('express');
const router = express.Router();


 // This is Get request
router.get('/add-product',(req, res, next) => {
    res.send('<form method="POST" action="/admin/add-product"><input type="text" name="title" /><button type="submit">Submit</button></form>')

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