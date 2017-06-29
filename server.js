var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    env = require('./server/config/environment'),
    app = express();

// Connect to database
mongoose.connect(env.mongo.uri, env.mongo.options);
mongoose.connection.on('error', function (err) {
        console.error('MongoDB connection error: ' + err);
        process.exit(-1);
    }
);

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.urlencoded({extended: true})); //support x-www-form-urlencoded
app.use(bodyParser.json());

// API route
app.use('/api/users', require('./server/api/user'));

//start Server
var server = app.listen(env.port, env.ip, function () {
    console.log("Listening to port %s", server.address().port);
});