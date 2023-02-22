const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config({path: "./config.env"});

const port = 5000;

// use middleware
app.use(cors());
app.use(express.json());

// mongodb connection
const connection = require('./db/connection')

// Using routes
app.use(require('./routes/route'))

connection.then(db=>{
    if(!db) return process.exit(1);

    // listen to the http server
    app.listen(port, ()=>{
        console.log(`listening server at port ${port}`);
    })
    app.on('error', err=> console.log('Failed to connect with HTTP server'))

    // error in mongodb connection
}).catch(err=>{
    console.log(`Connection Failed: ${err}`);
})
