/* src/errormsg.js - Renders error message, in case venues not found */

/* Import React to avoid "undefined" errors during npm test */
import React from 'react'

export default class ErrorMsg extends React.Component {
    render() {
        return (<p className="error">Incorrect parameter!<br /> Error code: {this.props.err} Try entering a valid location.</p>);
    }
}
