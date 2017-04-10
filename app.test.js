import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

import ErrorMsg from './static/js/bundle';
import LocationTable from './static/js/bundle';
import LocationForm from './static/js/bundle';
//import LocationTable from './src/locationtable';
//import LocationForm from './src/locationform';

var errorValue = 200;
var locations = ['Aspen','Belize','Cairo'];
var newLocation = 'New Location';

describe('ErrorMsg', () => {
    it('renders error message', () => {
        TestUtils.renderIntoDocument(
            <ErrorMsg err={errorValue} />
        );
    });
});

describe('LocationTable', () => {
    it('renders list of locations', () => {
        const rendered = TestUtils.renderIntoDocument(
            <LocationTable tableData={locations} />
        );
        const list = TestUtils.scryRenderedDOMComponentsWithTag(rendered, "li");
        expect(list.length).toEqual(3);
        expect(list.length).not.toEqual(5);
    });
});

describe('LocationForm', () => {
    it('renders location form', () => {
        const rendered = TestUtils.renderIntoDocument(
                <LocationForm />
        );
    });
    it('handles state after text input', () => {
        const rendered = TestUtils.renderIntoDocument(
                <LocationForm />
        );
        const input = TestUtils.scryRenderedDOMComponentsWithTag(rendered, "input");
        input[0].value = 'New Location';
        TestUtils.Simulate.change(input[0]);
        expect(rendered.state.value).toEqual('New Location');
    });
    it('handles submit', () => {
    });
});


