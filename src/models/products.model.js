const { mongoConnect } = require('../services/mongo');
const mongoose = require('mongoose');
const Product = require('./products.mongo');
require('dotenv').config();
const jsonProducts = require('../../data/products.json');

async function start(){
    await mongoConnect();
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log('success');
    
}

start();