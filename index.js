// content of index.js

const express = require('express')  
const rp = require('request-promise')
const path = require('path')
var bodyParser = require('body-parser');

const app = express() 

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (request, response) => { 
    response.sendFile(path.join(__dirname+'/index.html'))
})

app.use('/results', (request, response) => {
    userLocationJSON = request.body;
    userLocationWithSpaces = userLocationJSON.value;
    userLocation = userLocationWithSpaces.split(' ').join('+');
    rp({
        uri: 'https://api.foursquare.com/v2/venues/search',
        qs: {
            near: userLocation,
            oauth_token: '4BEGGECF4SOLZXXYQKTBV0UKVAU3JAEVAVNQEK3QHML3SNEQ',
            v: 20170405
        },
        json: true
    })
    .then((data) => {
        response.send(data)
    })
    .catch((err) => {
        console.log(err)
    })
})

app.listen(3000)

