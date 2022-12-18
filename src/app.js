const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const v1 = require('./routes/v1');
const notFound = require('./services/notFound');

app.use(morgan("combined"));
app.use(express.json());
//app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/v1', v1);
app.use(notFound);

/*app.get('/*', (req,res)=>{
    return res.status(200).send('<h1>Store API</h1><a href="/api/v1/products"></a>');
});*/

module.exports = app;

