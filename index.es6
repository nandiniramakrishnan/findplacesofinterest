// content of index.js

const express = require('express')  
const rp = require('request-promise')
const path = require('path')
const bodyParser = require('body-parser');
const fs = require('fs') 

const app = express() 

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var id = '3DLLVHAIFTYBD51P43YYSTCJQ0HV3QPYHX1IECXBX1Z1LQ3W'
var secret = 'DTVBEDEVMEGAUSVABGXM3EDAZDJIV0RZD2PPJ2K12NDJRW03'
var hasUserCredentials = true;
var client_data = []
/*
fs.readFile('static/user_config.txt', 'utf8', function(err, data) {
    if (err) {
        console.log('Improper client id or secret!');
        return console.log(err);
    }
    client_data = data.split('\n');
    id = client_data[0];
    secret = client_data[1];
    hasUserCredentials = true;
});
*/


app.get('/', (request, response) => { 
    console.log(request.ip);
    response.sendFile(path.join(__dirname+'/index.html'))
})

app.use('/results', (request, response) => {
    if (hasUserCredentials) {
    var userLocationJSON = request.body;
    var userLocationWithSpaces = userLocationJSON.value;
    var userLocation = userLocationWithSpaces.split(' ').join('+');
    rp({
        uri: 'https://api.foursquare.com/v2/venues/search',
        qs: {
            near: userLocation,
            client_id: id,
            client_secret: secret,
            v: 20170408
        },
        json: true
    })
    .then((data) => {
        response.send(data)
    })
    .catch((err) => {
        response.send(err)
    })
    }
})

var server = app.listen(3000);
module.exports = server;
