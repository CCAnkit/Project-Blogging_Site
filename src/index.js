const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use('/',route)
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/mymongoDB", {useNewUrlParser: true})
.then(() => console.log('Successfully connected to mongoDB 27017'))
.catch(err => console.log('Connection error'))

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + 
    (process.env.PORT || 3000));
});

