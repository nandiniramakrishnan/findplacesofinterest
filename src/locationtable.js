import React from 'react'

export default class LocationTable extends React.Component {
    render() {
        return (<ul className="list">
            {this.props.tableData.map(function(venue) {
                return <li className="venue" key={venue}>{venue}</li>;
            })}
        </ul>);
    }
}
