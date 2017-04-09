export default class LocationTable extends React.Component {
    render() {
        return (<ul>
            {this.props.tableData.map(function(venue) {
                return <li>{venue}</li>;
            })}
        </ul>);
    }
}
