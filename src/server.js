const http = require('http');
const app = require('../src/app');
require('dotenv').config();
const { mongoConnect } = require('./services/mongo');


const PORT = process.env.PORT;
const server = http.createServer(app);


async function startServer(){
    await mongoConnect();

    server.listen(PORT, ()=>{
        console.log(`Server is listening on port ${PORT}`);
    })
}

startServer();
