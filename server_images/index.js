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

    console.log("upload")

    console.log(req.params.classification)

    console.log(req.file)

    res.send('ok')


})


app.get('/download', (req, res) => {

    console.log("download")

    res.send('ok')


})

app.listen(PORT, HOST)