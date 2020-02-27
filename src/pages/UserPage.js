import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  logout: () => ({ type: 'LOGOUT' })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(class UserPage extends Component {
  render() {
    const { logout } = this.props;
    return (
      <div>
        <h3>UserPage</h3>
        <button onClick={logout}>logout</button>
      </div>
    )
  }
}
)
