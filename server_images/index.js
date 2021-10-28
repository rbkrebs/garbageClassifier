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
        cb(null, file.originalname + Date.now() + path.extname(file.originalname))
    }

})

const upload = multer({ storage })

const app = express()

app.get('/', (req, res) => {

    res.send(imagesClassification);
});

app.post('/upload/:classification', upload.single('uploadImage'), (req, res) => {

    console.log(req.params.classification)

    console.log(req.file)

    res.send('ok')


})

app.listen(PORT, HOST)