const express = require('express')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const tf = require('@tensorflow/tfjs-node')
const Jimp = require('jimp');
const { get, getSync } = require('@andreekeberg/imagedata')
const { Image, loadImage, Canvas } = require('canvas')
const sharp = require('sharp');


const imagesClassification = ['organico', 'reciclavel', 'residuo']

const PORT = 3000;
const HOST = '0.0.0.0'

const storage = multer.diskStorage({


    destination: (req, file, cb) => {

        console.log(req)
        const folderPath = `uploads/${req.params.classification}`
        fs.mkdirSync(folderPath, { recursive: true })
        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage, limits: { fieldSize: 25 * 1024 * 1024 } })

const app = express()

app.get('/', (req, res) => {

    console.log("get")


    res.send(imagesClassification);
});

app.post('/upload/:classification', upload.single('datasetImage'), (req, res) => {

    res.send('ok')

})

app.get('/download', (req, res) => {

    console.log("download")

    res.send('ok')

})

app.post('/classify', upload.single('classifyImage'), (req, res) => {
    toClassify()
    res.send({
        status: 200,
        classification: imagesClassification[2],
        probability: "78%"
    })
})

async function toClassify(img) {

    try {

        const model = await tf.node.loadSavedModel('novo_modelo')
        const img = fs.readFileSync('./uploads/oi/banana.jpg')
        const resizedImg = await sharp(img)
            .resize(224, 224).toBuffer()

        const decode = tf.node.decodeImage(resizedImg).toFloat();

        const expand = tf.expandDims(decode, 0)

        const data = await model.predict(expand).dataSync()
        console.log(imagesClassification[data.indexOf(Math.max(...data))])
        console.log(Math.max(...data))
        const result = {}

    } catch (error) {
        console.log('oi')
        console.error(error);
    }
    //console.log(model)

}

app.listen(PORT, HOST)