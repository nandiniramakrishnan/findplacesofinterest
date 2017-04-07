// content of index.js

const express = require('express')  
const rp = require('request-promise')
const path = require('path')

const app = express() 

app.use(express.static(__dirname + '/static'));


app.get('/', (request, response) => { 
    response.sendFile(path.join(__dirname+'/index.html'))
})

app.use('/results', (request, response) => {
    rp({
        uri: 'https://api.foursquare.com/v2/venues/search',
        qs: {
            near: 'Carnegie+Mellon+University',
            oauth_token: '4BEGGECF4SOLZXXYQKTBV0UKVAU3JAEVAVNQEK3QHML3SNEQ',
            v: 20170405
        },
        json: true
    })
    .then((data) => {
        console.log(JSON.stringify(request.params))
        response.send(data)
    })
    .catch((err) => {
        console.log(err)
    })
})

app.listen(3000)

