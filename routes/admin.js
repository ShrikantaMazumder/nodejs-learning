const express = require('express');
const router = express.Router();

router.use('/add-product',(req, res, next) => {
    res.send('<form method="POST" action="/product"><input type="text" name="title" /><button type="submit">Submit</button></form>')

    //....
});

router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
    // const method = req.method;
    // if (method === 'POST') {
    //     res.send('<h1>Product added</h1>')
    // }
});


module.exports = router;