import React from 'react';
import ReactDOM from 'react-dom';
import LocationForm from './static/js/bundle';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LocationForm />, div);
});
