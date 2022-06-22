const express = require("express");
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const PORT = 4000;

const app = express();
const objectTourismRoutes = require('./src/routes/object-tourism');
const culinaryRoutes = require('./src/routes/culinary');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(bodyparser.json()) // type JSON
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Header', 'Contet-Type, Authorization');
    next()
})


app.use('/v1/object-tourism', objectTourismRoutes);
app.use('/v1/culinary', culinaryRoutes);


app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({message: message, data: data});
})

mongoose.connect('mongodb+srv://kadekframa:hYoAvgM5huMk2cSk@api-mlaku.yvrjb.mongodb.net/mlaku?retryWrites=true&w=majority')
    .then(() => {
        app.listen(PORT, () => console.info(`Server running on port: ${PORT}`));
    })
    .catch(err => console.info(err));
