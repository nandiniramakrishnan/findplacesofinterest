import React from 'react'

export default class LocationTable extends React.Component {
    render() {
        return (<div className="list">Some nearby places include: <ul>
            {this.props.tableData.map(function(venue) {
                return <li className="venue" key={venue}>{venue}</li>;
            })}
        </ul></div>);
    }
}
