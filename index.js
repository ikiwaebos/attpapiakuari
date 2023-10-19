const express = require('express')
const secure = require('ssl-express-www')
const PORT = process.env.PORT || 8080;
const morgan = require('morgan')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

var app = express();
app.use(secure)
app.use(morgan('dev'));
app.use(express.static('client'));
app.set("json spaces",2)



var cek = require('./cek.js');


var main = require('./main');



app.use('/cek', cek)
app.use('/', main)


app.listen(PORT, () => {
    console.log(`Server urep mazeee neng port ${PORT}`)
});
