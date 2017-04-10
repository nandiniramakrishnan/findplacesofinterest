/* index.js - Node/Express backend for findplacesofinterest */

const express = require('express')  
const rp = require('request-promise')
const path = require('path')
const bodyParser = require('body-parser');
const fs = require('fs') 

/* Create server instance */
const app = express();

/* Location for static resources used in index.html */ 
app.use(express.static(__dirname + '/static'));

/* For parsing application/json */
app.use(bodyParser.json());

/* For parsing application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: true }));

/* Read client ID and secret from user_config file */
var id = ''
var secret = ''
var client_data = []
fs.readFile('static/user_config.txt', 'utf8', function(err, data) {
    if (err) {
        console.log('Improper client id or secret!');
        return console.log(err);
    }
    client_data = data.split('\n');
    id = client_data[0];
    secret = client_data[1];
});

/* Load initial .html file */
app.get('/', (request, response) => { 
    response.sendFile(path.join(__dirname+'/index.html'))
})

/* Response to POST redirection to /results gives the locations */
app.use('/results', (request, response) => {
    var userLocationJSON = request.body;
    var userLocationWithSpaces = userLocationJSON.value;
    var userLocation = userLocationWithSpaces.split(' ').join('+');
    
    /* Pass URI and parameters (including client credentials) to request-promise object */
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
        response.send(data)         /* Send results back to AJAX POST request */
    })
    .catch((err) => {
        response.send(err)          /* Send error back to AJAX POST request */
    })
})

/* Launch server */
var server = app.listen(process.env.PORT || 3000);

/* Export for testing */
module.exports = server;
