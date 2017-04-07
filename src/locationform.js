class LocationForm extends React.Component {
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
            alert(JSON.stringify(data));
        });

    }

    render() {
        return (
                <form onSubmit={this.handleSubmit}>
                <label>
                Enter a location:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Search" />
                </form>
               );
    }
}

ReactDOM.render(
        <LocationForm />,
        document.getElementById('searchDiv')
        );
