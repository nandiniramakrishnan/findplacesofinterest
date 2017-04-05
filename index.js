// content of index.js

const express = require('express')  
const rp = require('request-promise')

const app = express()  

app.get('/', (request, response) => {  
    rp({
        uri: 'https://api.foursquare.com/v2/venues/search?near=Carnegie+Mellon+University&oauth_token=4BEGGECF4SOLZXXYQKTBV0UKVAU3JAEVAVNQEK3QHML3SNEQ&v=20170405',
        json: true
    })
    .then((data) => {
        console.log(data)
    })
    .catch((err) => {
        console.log(err)
    })
})

app.listen(3000)

