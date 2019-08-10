
//Import 
const bodyParser = require('body-parser')
const express = require("express");
const mongoose = require('mongoose');
var env = require('dotenv').config();
// init express app
const app = express();
const morgan = require('morgan');

const cors = require('cors')
app.use(cors())

mongoose.connect(process.env.dbUrl)

//for logs
app.use(morgan('combined'))

app.use(bodyParser.json())

// attach the routes to the app
require("./route")(app);

// start server
app.listen(process.env.port, () => {
    console.info(`Express server listening on ${process.env.port}`);
});