const http = require('http');

const express = require('express');

const app = express();

// app.use((req, res, next) => {
//     console.log('I am middleware');
//     next(); // This allows request to continue to the next middleware.
// })

app.use('/about',(req, res, next) => {
    res.send('<h1>Hello From about page</h1>')

    //....
});

app.use('/', (req,res,next) => {
    res.send('<h1>This is home page</h1>')
});

// const server = http.createServer(app);

app.listen(3000, () => console.log('Server running in 3000'));

