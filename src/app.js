/* src/app.js - Main file for front-end, which calls other components and gets sent for bundling */

import LocationForm from './locationform'

ReactDOM.render(
    <LocationForm />,
    document.getElementById('searchDiv')
);
