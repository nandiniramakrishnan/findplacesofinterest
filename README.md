# Find venues using Foursquare
A web application to find nearby places of interest, using React.js, Node.js and Foursquare. This uses the Foursquare API's Venue Search endpoint.

This project mainly relies on the following dependencies:
1) Babel for transpiling ES6 code
2) Browserify to bundle the separate front-end components into a single `bundle.js` file
3) request-promise for servicing HTTP requests
4) supertest, for testing back-end functionality with Jest

Note: The front-end source code can be found in the `src` directory.

Perform the following steps to run the webapp locally: 

1) To run the application for the first time:
`./app.sh`
This script accepts your Foursquare Client ID and secret, in order to access their application. This is a one-time only step.

2) Install the dependencies of the application using:
`npm install`

3) Then build the code using:
`npm run build`

4) ...and start running your application!
`npm start`

This webapp has been deployed using Heroku and can be publicly accessed here: https://gentle-spire-72074.herokuapp.com/

## Testing using Jest
For unit testing, run `npm test`

