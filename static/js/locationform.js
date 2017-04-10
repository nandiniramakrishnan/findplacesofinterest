'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _locationtable = require('./locationtable');

var _locationtable2 = _interopRequireDefault(_locationtable);

var _errormsg = require('./errormsg');

var _errormsg2 = _interopRequireDefault(_errormsg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* src/locationform.js - Contains React Component LocationForm to enter search query */

/* Import all dependencies, so they can be defined during testing, and don't throw errors */


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
            /* Send AJAX request to retrieve results from Express.js server */
            $.post('/results', this.state, function (data) {
                /* If venues is underfined, the parameters to Foursquare were not valid */
                if (data.response.venues == undefined) {
                    _reactDom2.default.render(_react2.default.createElement(_errormsg2.default, { err: data.statusCode }), document.getElementById('resultsDiv'));
                }
                /* Else build the list of venues to render */
                else {
                        var venueList = [];
                        data.response.venues.map(function (venueDetails) {
                            venueList.push(venueDetails.name);
                        });
                        _reactDom2.default.render(_react2.default.createElement(_locationtable2.default, { tableData: venueList }), document.getElementById('resultsDiv'));
                    }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'form',
                    { onSubmit: this.handleSubmit },
                    _react2.default.createElement(
                        'label',
                        null,
                        'Enter a location:',
                        _react2.default.createElement('input', { type: 'text', value: this.state.value, onChange: this.handleChange })
                    ),
                    _react2.default.createElement(
                        'button',
                        { onClick: this.handleSubmit, type: 'submit' },
                        'Search'
                    )
                )
            );
        }
    }]);

    return LocationForm;
}(_react2.default.Component);

exports.default = LocationForm;