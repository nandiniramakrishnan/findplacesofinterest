/* src/locationform.js - Contains React Component LocationForm to enter search query */

/* Import all dependencies, so they can be defined during testing, and don't throw errors */
import React from 'react'
import ReactDOM from 'react-dom'
import LocationTable from './locationtable'
import ErrorMsg from './errormsg'

export default class LocationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        /* Send AJAX request to retrieve results from Express.js server */
        $.post('/results', this.state, function(data) {
            /* If venues is underfined, the parameters to Foursquare were not valid */
            if (data.response.venues == undefined) {
                ReactDOM.render(<ErrorMsg err={data.statusCode} />, document.getElementById('resultsDiv'));
            }
            /* Else build the list of venues to render */
            else {
                var venueList = []
                data.response.venues.map(function(venueDetails) {
                    venueList.push(venueDetails.name);
                });
                ReactDOM.render(<LocationTable tableData={venueList} />, document.getElementById('resultsDiv'));                    
            }
        });

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <label>
                    Enter a location:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <button onClick={this.handleSubmit} type="submit">Search</button>
            </form>
            </div>
        );
    }
}
