const express = require('express');
const productsRouter = express.Router();
const { httpGetAllProducts, httpGetAllProductsStatic } = require('./products.controller');

productsRouter.route('/').get(httpGetAllProducts);
productsRouter.route('/static').get(httpGetAllProductsStatic);

module.exports = productsRouter;
