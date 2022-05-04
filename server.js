//取得express和body-parser套件
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080

// create express app 準備Express底下的所有功能
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to MIIAweb."});
});

require('./app/routes/routes.js')(app);

// listen for requests
//監聽執行在localhost哪個port號
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});