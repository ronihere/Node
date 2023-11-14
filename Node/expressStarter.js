const express = require('express');
const app = express()
const path = require('path')
const errorHandler = require('./middleware/errorHandler')
const { loggerMiddleware } = require('./middleware/logger')
const cors = require('cors')

const PORT = process.env.PORT || 3500;


//custom middlewares
app.use(loggerMiddleware);

const whiteList = ['https://m.youtube.com', 'http://localhost:3500', 'https://www.google.com'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin)!==-1  || !origin) {
            callback(null, true);
        }else callback(new Error('Not allowed by CORS'))
    },
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname,'/public')))
app.get('/', (req, res) => {
    // res.send('Hello')
    res.sendFile('./files/read.txt',{root: __dirname})
})





app.get('/json', (req, res) => {
    const jsonData = {
    message: 'Hello, this is a JSON response!',
    timestamp: Date.now(),
  };

  // Sending the JSON response
  res.json(jsonData);
})

app.get('/index(.txt)?', (req, res) => {
    res.send('index.html lol')
})


// route handlers or middleware
const a = (req, res, next) => {
    console.log('a'),
    next();
}
// route handlers or middleware

const b = (req, res, next) => {
    console.log('b'),
    next();
}
// route handlers or middleware

const c = (req, res, next) => {
    console.log('c'),
    res.send('Hey , route Handlers done')
}

app.get('/route-chain',[a,b,c])

//404
app.all('/*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.send('404 Page not Found!') //we added the status-404 so that , no it is self explainatory right?
    } else if (req.accepts('json')) {
        res.json({error: '404 Page not Found!'})
    }else res.type('txt').send('404 Page not Found!')
})

//middleware to handle error
app.use(errorHandler);

app.listen(PORT, () => console.log(`server is running on PORT : ${PORT}`));