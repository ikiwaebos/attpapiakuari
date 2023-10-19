__path = process.cwd()

var express = require('express');
var router = express.Router();

var app = express();
var phpExpress = require('php-express')({
  binPath: 'php'
});

app.set('admin', './views/admin');
app.engine('php', phpExpress.engine);
app.set('view engine', 'php');

// routing all .php file to php-express
app.all(/.+\.php$/, phpExpress.router);



router.get('/', async(req, res) => {
	res.sendFile(__path + '/welcom.html')
})


//Kalo page yang di cari engga ada, nanti muncul ini:v

router.use(function (req, res) {
res.status(404)
.sendFile(__path + '/4004.html')
});

router.use(function (req, res) {
res.status(444)
.sendFile(__path + '/4004.html')
});

router.use(function (req, res) {
res.status(400)
.sendFile(__path + '/4004.html')
});
module.exports = router
