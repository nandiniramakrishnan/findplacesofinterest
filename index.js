// content of index.js

const express = require('express')  
const rp = require('request-promise')
const path = require('path')
var bodyParser = require('body-parser');
const fs = require('fs') 

const app = express() 

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

id = ''
secret = ''
hasUserCredentials = false;

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



app.get('/', (request, response) => { 
    response.sendFile(path.join(__dirname+'/index.html'))
})

app.use('/results', (request, response) => {
    if (hasUserCredentials) {
    userLocationJSON = request.body;
    userLocationWithSpaces = userLocationJSON.value;
    userLocation = userLocationWithSpaces.split(' ').join('+');
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

app.listen(3000)

