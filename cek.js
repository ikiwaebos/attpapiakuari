
const express = require('express')
var router = express.Router();
const axios = require('axios') //you can use any http client
const fs = require('fs')
const fetch = require('node-fetch')
const { getBuffer } = require('./function')
const Canvas = require('canvas')
const canvasGif = require('canvas-gif')
const Canvacord = require("canvacord");
const xa = require('xfarr-api')
const xct007 = require('@xct007/frieren-scraper')
const lineStickerUtil = require('./ranstic')
const all = require('scrape');
const { PassThrough } = require('stream');
const GIFEncoder = require('gifencoder');
const { createCanvas, loadImage, registerFont } = require('canvas');
const { maker } = require('./tiktokk');
var { tahta, tahtacustom } = require('./tahta.js');
const gm = require('gm').subClass({ imageMagick: true });
registerFont('./tahta/BubbleShine.ttf', { family: 'BubbleShine' });
const { Configuration, OpenAIApi } = require('openai');
const Tesseract = require('tesseract.js');
const { TeraDood } = require('@kodingkeundev/teradood')



router.get('/ai-image', async(req, res) => {
  var prompt = req.query.prompt
  if (!prompt) return res.json({ message: 'masukan parameter ?prompt=Astronaut riding a horse'})
  try {

const response = await openai.listEngines();
    console.log(response)
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }

})







router.get('/ocr', async(req, res) => {
 const img = req.query.img;

  try {
    // Unduh gambar dari URL
     const response = await fetch(img);
     const imageBuffer = await response.arrayBuffer();

    // Proses gambar menjadi teks menggunakan tesseract.js
    Tesseract.recognize(
      imageBuffer,
      'ind', // Bahasa OCR (dalam hal ini, bahasa Inggris)
      { logger: m => console.log(m) } // Log output jika diperlukan
    )
      .then(({ data: { text } }) => {
        res.json({
                 status : true,
                 creator: `akuari.my.id`,
                 data : text
             })
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('OCR process failed.');
      });
  } catch (error) {
    console.error(error);
    res.status(400).send('Error link url gambar anda bermasalah / Client network socket disconnected before secure TLS connection was established');
  }


})










router.get('/tahtacustom', async(req, res) => {
  var text1 = req.query.text1
  if (!text1) return res.json({ message: 'masukan parameter ?text1=Harta' })

  var text2 = req.query.text2
  if (!text2) return res.json({ message: 'masukan parameter ?text2=Tahta' })

  var text3 = req.query.text3
  if (!text3) return res.json({ message: 'masukan parameter ?text3=Ari' })
  const sear = await tahtacustom(text1,text2,text3)
 res.set({'Content-Type': 'png'})
	res.send(sear)
  

})


router.get('/tahta', async(req, res) => {
  var text = req.query.text
  if (!text) return res.json({ message: 'masukan parameter ?text=ari' })
  const sear = await tahta(text)
 res.set({'Content-Type': 'png'})
	res.send(sear)
  

})











router.get('/tahtas', async (req, res) => {
  const apaa = req.query.text; // Ambil nilai 'apa' dari query parameter
  var hartatahtaapa = apaa.replace(/(\S+\s*){1,23}/g, '$&\n')
    apa = 'HARTA\nTAHTA\n' + hartatahtaapa.toUpperCase()
const background = await loadImage('./tahta/warna.jpg');
    // Buat canvas dengan ukuran yang diinginkan
    const canvas = createCanvas(1280, 1280);
    const ctx = canvas.getContext('2d');

    // Isi latar belakang dengan warna hitam
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set font dan ukuran
  
    ctx.font = '200px BubbleShine'; // Gunakan nama font yang telah didaftarkan
    const pattern = ctx.createPattern(background, '');
    ctx.fillStyle = pattern;

    // Gambar teks di tengah canvas
    ctx.textAlign = 'center';
    ctx.fillText(apa, 550, 500);

    // Load gambar tambahan (contoh: './tahta/warna-warni.jpg') jika diperlukan
    // const image = await loadImage('./tahta/warna-warni.jpg');
    // ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Simpan canvas ke file atau kirim sebagai respons
    const stream = canvas.createPNGStream();
    stream.pipe(res);
});










router.get('/sketch', async (req, res) => {
	var text = req.query.text

	if (!text) return res.json({ message: 'masukan parameter Text' })
  
	var hasil = await maker('https://textpro.me/create-a-sketch-text-effect-online-1044.html', text)
	try {
		
	var getBuffer = await getBuffer(hasil.image)
 res.set({'Content-Type': 'png'})
res.send(getBuffer)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
  await apivisit()
})

router.get('/play', async (req, res) => {
  try {

    var search = req.query.search
  if (!search) return res.json({ message: 'masukan parameter ?search=mom' })
  const sear = await xct007.xvideos.search(search)

var values= Object.values(sear)

var randomValue = values[parseInt(Math.random() * values.length)]
  var linkk = randomValue.url
const ArrObj = await xct007.xvideos.detail(linkk)
var hasil= ArrObj.urls.low
    // URL video yang akan diputar
    var hasiill= await getBuffer(hasil)
    // Path tempat menyimpan video sementara
    const videoBuffer = Buffer.from(hasiill);

    // Create a pass-through stream from the video buffer
    const stream = new PassThrough();
    stream.end(videoBuffer);


    // Set the response headers for video streaming
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', 'inline');

    // Stream the video to the response
    stream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});







router.get('/randomx', async(req, res) => {
  var search = req.query.search
  if (!search) return res.json({ message: 'masukan parameter ?search=mom' })
  const sear = await xct007.xvideos.search(search)

var values= Object.values(sear)

var randomValue = values[parseInt(Math.random() * values.length)]
  var linkk = randomValue.url
const ArrObj = await xct007.xvideos.detail(linkk)
hasil= ArrObj.urls.low

  hasill= await getBuffer(hasil)
res.set({'Content-Type': 'video/mp4'})
	res.send(hasill)
  

})






async function fn(img) {
  const pic = await axios.get(img, {
    responseType: 'arraybuffer',
  })
  const model = await nsfw.load() // To load a local model, nsfw.load('file://./path/to/model/')
  // Image must be in tf.tensor3d format
  // you can convert image to tf.tensor3d with tf.node.decodeImage(Uint8Array,channels)
  const image = await tf.node.decodeImage(pic.data,3)
  const predictions = await model.classify(image)
  image.dispose() // Tensor memory must be managed explicitly (it is not sufficient to let a tf.Tensor go out of scope for its memory to be released).
   console.log(predictions)
}

router.get('/server', async(req, res) => {
  res.json({ 
   creator: `akuari.my.id`,
   server: `aktif bosq` })

})
router.get('/server-cron-plask', async(req, res) => {
  res.json({ 
   creator: `akuari.my.id`,
   server: `aktif bosq` })

})
router.get('/search-xvideos', async(req, res) => {
  var search = req.query.search
  if (!search) return res.json({ message: 'masukan parameter ?search=mom' })
const ArrObj = await xct007.xvideos.search(search)
  res.json({ 
   creator: `akuari.my.id`,
   link: ArrObj })

})

router.get('/xvideos', async(req, res) => {
  var link = req.query.link
  if (!link) return res.json({ message: 'masukan parameter ?link=' })
const ArrObj = await xct007.xvideos.detail(link)
  res.json({ 
   creator: `akuari.my.id`,
   link: ArrObj })

})

router.get('/xxx', async(req, res) => {
  var search = req.query.search
  if (!search) return res.json({ message: 'masukan parameter ?search=mom' })
  const sear = await xct007.xvideos.search(search)

var values= Object.values(sear)

var randomValue = values[parseInt(Math.random() * values.length)]
  var linkk = randomValue.url
const ArrObj = await xct007.xvideos.detail(linkk)
  res.redirect(ArrObj.urls.low )

})

router.get('/random-xvideos', async(req, res) => {
  var search = req.query.search
  if (!search) return res.json({ message: 'masukan parameter ?search=mom' })
  const sear = await xct007.xvideos.search(search)

var values= Object.values(sear)

var randomValue = values[parseInt(Math.random() * values.length)]
  var linkk = randomValue.url
const ArrObj = await xct007.xvideos.detail(linkk)
  res.json({ 
   creator: `akuari.my.id`,
   link: ArrObj })

})


router.get('/igdl1', async(req, res) => {
  try {
  var link = req.query.link
  if (!link) return res.json({ message: 'masukan parameter ?link=' })
  var obj = await xct007.instagram.v1(link)
  res.json({ 
   creator: `akuari.my.id`,
   link: obj })

} catch(err) {
console.log(err) 
res.json({ link: 'Ups, error' }) 
}
})


router.get('/toanime', async (req, res) => {
  try {
    // Dapatkan URL gambar dan folder tujuan dari query string atau sesuaikan dengan kebutuhan Anda.
    const photo = req.query.photo || 'https://www.youngontop.com/wp-content/uploads/2022/09/portrait-pretty-korean-girl-receive-surprising-news-looking-amazed-happy-camera-standing-blue-background_1258-76005.jpg';
    const destinyFolder = req.query.destinyFolder || './images';

    // Transformasi gambar menggunakan modul ToAnime
    const data = await anime.transform({ photo, destinyFolder });

    // Kirim hasil transformasi sebagai respons
    res.json({ message: 'Gambar berhasil ditransformasi', data });
  } catch (err) {
    // Tangani kesalahan jika ada
    console.error('Error:', err);
    res.status(500).json({ message: 'Terjadi kesalahan dalam transformasi gambar', error: err });
  }
});

router.get('/igdl2', async(req, res) => {
  try {
  var link = req.query.link
  if (!link) return res.json({ message: 'masukan parameter ?link=' })
  var obj = await xct007.instagram.v2(link)
  res.json({ 
   creator: `akuari.my.id`,
   link: obj })
} catch(err) {
console.log(err) 
res.json({ link: 'Ups, error' }) 
}
})
router.get('/gbard', async(req, res) => {
  try {
var chat = req.query.chat
  if (!chat) return res.json({ message: 'masukan parameter ?chat=arti bot' })
  const ArrObj = await all.bard(chat);
  res.json({ 
   creator: `akuari.my.id`,
   link: ArrObj })
} catch(err) {
console.log(err) 
res.json({ link: 'Ups, error' }) 
}
})
router.get('/tiktok', async(req, res) => {
  try {
var link = req.query.link
  if (!link) return res.json({ message: 'masukan parameter ?link=' })
  const ArrObj = await all.tiktok(link);
  res.json({ 
   creator: `akuari.my.id`,
   link: ArrObj })
} catch(err) {
console.log(err) 
res.json({ link: 'Ups, error' }) 
}
})

router.get('/gpt', async(req, res) => {
  try {
var chat = req.query.chat
  if (!chat) return res.json({ message: 'masukan parameter ?chat=arti bot' })
  const ArrObj = await all.gpt(chat);
  res.json({ 
   creator: `akuari.my.id`,
   link: ArrObj })
} catch(err) {
console.log(err) 
res.json({ link: 'Ups, error' }) 
}
})

router.get('/tiktok3', async(req, res) => {
  try {
var link = req.query.link
  if (!link) return res.json({ message: 'masukan parameter ?link=' })
  const ArrObj = await xct007.tiktok.v1(link);
  res.json({ 
   creator: `akuari.my.id`,
   link: ArrObj })
} catch(err) {
console.log(err) 
res.json({ link: 'Ups, error' }) 
}
})

router.get('/music', async(req, res) => {
  try {
var search = req.query.search
  if (!search) return res.json({ message: 'masukan parameter ?search=angel' })
  const ArrObj = await xct007.music.search(search);
  res.json({ 
   creator: `akuari.my.id`,
   link: ArrObj })
} catch(err) {
console.log(err) 
res.json({ link: 'Ups, error' }) 
}
})
router.get('/linestickerdownloader', async(req, res) => {
  try {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter ?link=' })
  
     var result = await xa.downloader.linesticker(link)
	res.json({  
    creator: `akuari.my.id`,
    hasil: result.result
  })
  } catch(err) {
console.log(err) 
res.json({ link: 'Ups, error' }) 
}
})

router.get('/linestickerrandom', async(req, res) => {
  try {
  var sticker = lineStickerUtil.random()
    
	res.json({  
    creator: `akuari.my.id`,
    aaaa: `https://store.line.me/stickershop/product/${sticker.stickerId}`
  })
  } catch(err) {
console.log(err) 
res.json({ link: 'Ups, error' }) 
}
})

router.get('/whatmusic', async(req, res) => {
  try {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter ?link=' })
     var result = await xa.search.whatanime(link)
	res.json({  
    creator: `akuari.my.id`,
    hasil: result
  })
  } catch(err) {
console.log(err) 
res.json({ link: 'Ups, error' }) 
}
})

router.get('/maker/attp2', async (req, res) => {
     const text = req.query.text;
    if (!text) return res.json({ status: false, message: "[!] masukan parameter text" });

    const width = 580; // Lebar canvas
    const height = 580; // Tinggi canvas

    const encoder = new GIFEncoder(width, height);
    encoder.createReadStream().pipe(fs.createWriteStream('./output.gif')); // Menyimpan GIF ke file

    encoder.start();
    encoder.setRepeat(0); // 0 berarti akan terus diulang

    const ctx = createCanvas(width, height, 'rgba(0,0,0,0)') // Transparent canvas
        .getContext('2d');

    const frameDuration = 100; // Durasi frame dalam milidetik
    const couler = ["#ff0000", "#ffe100", "#33ff00", "#00ffcc", "#0033ff", "#9500ff", "#ff00ff"];
    let frameIndex = 0;
    const font = 90; // Atur ukuran font sesuai kebutuhan

    // Fungsi untuk menggambar teks dengan latar belakang transparan
    function drawText(text, x, y, font, color) {
        ctx.clearRect(0, 0, width, height); // Menghapus isi canvas
        ctx.font = `${font}px SF-Pro`;
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.fillText(text, x, y);
        encoder.addFrame(ctx);
    }

    // Fungsi untuk animasi latar belakang
    function animateBackground() {
        if (frameIndex < couler.length) {
            drawText(text, width / 2, height / 2, font, couler[frameIndex]);
            setTimeout(animateBackground, frameDuration);
            frameIndex++;
        } else {
            encoder.finish();
            res.set({ 'Content-Type': 'image/gif' });
            fs.createReadStream('./output.gif').pipe(res);
        }
    }

    animateBackground();
});



router.get('/maker/attp', async (req, res) => {
	var text = req.query.text
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter text"})

const file = "./aset/attp.gif"

let length = text.length
		
var font = 90
if (length>12){ font = 68}
if (length>15){ font = 58}
if (length>18){ font = 55}
if (length>19){ font = 50}
if (length>22){ font = 48}
if (length>24){ font = 38}
if (length>27){ font = 35}
if (length>30){ font = 30}
if (length>35){ font = 26}
if (length>39){ font = 25}
if (length>40){ font = 20}
if (length>49){ font = 10}
Canvas.registerFont('./aset/SF-Pro.ttf', { family: 'SF-Pro' })
canvasGif(
	file,
	(ctx, width, height, totalFrames, currentFrame) => {

		var couler = ["#ff0000","#ffe100","#33ff00","#00ffcc","#0033ff","#9500ff","#ff00ff"]
		let jadi = couler[Math.floor(Math.random() * couler.length)]
	
	
		function drawStroked(text, x, y) {
			ctx.font = `${font}px SF-Pro`
			ctx.strokeStyle = 'black'
			ctx.lineWidth = 3
			ctx.textAlign = 'center'
			ctx.strokeText(text, x, y)
			ctx.fillStyle = jadi
			ctx.fillText(text, x, y)
		}
		
		drawStroked(text,290,300)

	},
	{
		coalesce: false, // whether the gif should be coalesced first (requires graphicsmagick), default: false
		delay: 0, // the delay between each frame in ms, default: 0
		repeat: 0, // how many times the GIF should repeat, default: 0 (runs forever)
		algorithm: 'neuquant', // the algorithm the encoder should use, default: 'neuquant',
		optimiser: false, // whether the encoder should use the in-built optimiser, default: false,
		fps: 15, // the amount of frames to render per second, default: 60
		quality: 1, // the quality of the gif, a value between 1 and 100, default: 100
	}
).then((buffer) =>{
res.set({'Content-Type': 'gif'})
res.send(buffer)

})
})
router.get('/maker/trigger', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})


	const hasil =  await Canvacord.Canvas.trigger(text)
	res.set({'Content-Type': 'gif'})
	res.send(hasil)
  
})

router.get('/maker/rip', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})


	const hasil =  await Canvacord.Canvas.rip(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/greyscale', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.greyscale(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})
router.get('/maker/delete', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.delete(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/facepalm', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.facepalm(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/beautiful', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.beautiful(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/trash', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.trash(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})


router.get('/maker/bed', async (req, res) => {
	var text = req.query.url
  	var text2 = req.query.url2
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
  	if (!text2 ) return res.json({ status : false, message : "[!] masukan parameter url2"})
	const hasil =  await Canvacord.Canvas.bed(text, text2)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/spank', async (req, res) => {
	var text = req.query.url
  	var text2 = req.query.url2
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
  	if (!text2 ) return res.json({ status : false, message : "[!] masukan parameter url2"})
	const hasil =  await Canvacord.Canvas.spank(text, text2)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/slap', async (req, res) => {
	var text = req.query.url
  	var text2 = req.query.url2
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
  	if (!text2 ) return res.json({ status : false, message : "[!] masukan parameter url2"})
	const hasil =  await Canvacord.Canvas.slap(text, text2)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/kiss', async (req, res) => {
	var text = req.query.url
  	var text2 = req.query.url2
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
  	if (!text2 ) return res.json({ status : false, message : "[!] masukan parameter url2"})
	const hasil =  await Canvacord.Canvas.kiss(text, text2)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})


router.get('/maker/blur', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.blur(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/affect', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.affect(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/shit', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.shit(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/ohno', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.ohno(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})













router.get('/maker/joke', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.jokeOverHead(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})







router.get('/maker/hitler', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.hitler(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})



router.get('/maker/invert', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.invert(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/wanted', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.wanted(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/sepia', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.sepia(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/trigger', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})


	const hasil =  await Canvacord.Canvas.trigger(text)
	res.set({'Content-Type': 'gif'})
	res.send(hasil)
  
})

router.get('/maker/circle', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})


	const hasil =  await Canvacord.Canvas.circle(text);
	res.set({'Content-Type': 'gif'})
	res.send(hasil)
  
})

router.get('/maker/blur', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})


	const hasil =  await Canvacord.Canvas.blur(text);
	res.set({'Content-Type': 'gif'})
	res.send(hasil)
  
})

module.exports = router