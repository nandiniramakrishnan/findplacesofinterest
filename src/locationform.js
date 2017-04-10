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
        $.post('/results', this.state, function(data) {
            if (data.response.venues == undefined) {
                ReactDOM.render(<ErrorMsg err={data.statusCode} />, document.getElementById('resultsDiv'));
            }
            else {
                var venueList = []
                data.response.venues.map(function(venueDetails) {
                    venueList.push(venueDetails.name);
                });
                ReactDOM.render(<LocationTable tableData={venueList} />, document.getElementById('resultsDiv'));                    }
        });

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Enter a location:
                    <input id = "locationField" type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <button type="submit">Search</button>
            </form>
        );
    }
}
