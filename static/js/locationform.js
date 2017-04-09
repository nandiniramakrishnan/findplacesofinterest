'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _locationtable = require('./locationtable');

var _locationtable2 = _interopRequireDefault(_locationtable);

var _errormsg = require('./errormsg');

var _errormsg2 = _interopRequireDefault(_errormsg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocationForm = function (_React$Component) {
    _inherits(LocationForm, _React$Component);

    function LocationForm(props) {
        _classCallCheck(this, LocationForm);

        var _this = _possibleConstructorReturn(this, (LocationForm.__proto__ || Object.getPrototypeOf(LocationForm)).call(this, props));

        _this.state = { value: '' };

        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(LocationForm, [{
        key: 'handleChange',
        value: function handleChange(event) {
            this.setState({ value: event.target.value });
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            event.preventDefault();
            $.post('/results', this.state, function (data) {
                if (data.response.venues == undefined) {
                    ReactDOM.render(React.createElement(_errormsg2.default, { err: data.statusCode }), document.getElementById('resultsDiv'));
                } else {
                    var venueList = [];
                    data.response.venues.map(function (venueDetails) {
                        venueList.push(venueDetails.name);
                    });
                    ReactDOM.render(React.createElement(_locationtable2.default, { tableData: venueList }), document.getElementById('resultsDiv'));
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'form',
                { onSubmit: this.handleSubmit },
                React.createElement(
                    'label',
                    null,
                    'Enter a location:',
                    React.createElement('input', { type: 'text', value: this.state.value, onChange: this.handleChange })
                ),
                React.createElement('input', { type: 'submit', value: 'Search' })
            );
        }
    }]);

    return LocationForm;
}(React.Component);

ReactDOM.render(React.createElement(LocationForm, null), document.getElementById('searchDiv'));