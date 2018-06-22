const express = require ('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const db = require('./config/db');
const multer = require('multer');
const path = require('path');
const cors = require('cors');



const app = express();

const port = process.env.PORT || 8000;

app.use(express.static('./client/build'));
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(cors());

MongoClient.connect(db.url, (err, database) => {
        if (err) return console.log(err)

        require('./app/routes')(app, database);
app.listen (port,() => {
        console.log('We are live on' + port);
})
})