const express = require('express')
const path = require('path')
const fs = require('fs')
const multer = require('multer')


const imagesClassification = ['organico', 'reciclavel', 'residuo']

const PORT = 3000;
const HOST = '0.0.0.0'

const storage = multer.diskStorage({


    destination: (req, file, cb) => {



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

app.post('/upload/:classification', upload.single('uploadImage'), (req, res) => {


    res.send('ok')


})


app.get('/download', (req, res) => {

    console.log("download")

    res.send('ok')


})

app.post('/classify', upload.single('classifyImage'), (req, res) => {


    res.send({
        status: 200,
        classification: imagesClassification[2],
        probability: "78%"
    })


})

app.listen(PORT, HOST)