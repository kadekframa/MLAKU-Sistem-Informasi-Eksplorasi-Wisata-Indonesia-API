const express = require("express");
const PORT = 4000;

const app = express();
const productRoutes = require('./src/routes/products');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Header', 'Contet-Type, Authorization');
})

app.use('/v1/customer', productRoutes);

app.listen(PORT);