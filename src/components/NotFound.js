import React, { Component } from 'react'
import { connect } from 'react-redux';

class NotFound extends Component {
  render() {
    return(
      <div>
        <h1>Page Not Found.</h1>
      </div>
    )
  }
}

export default connect()(NotFound)