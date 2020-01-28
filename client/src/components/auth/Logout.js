import React, { Component } from 'react'
import { NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import { logoutAction } from '../../redux/actions/authActions'
import PropTypes from 'prop-types'

export class Logout extends Component {
  static propTypes = {
    logoutAction: PropTypes.func.isRequired
  }

  render() {
    return (
      <>
        <NavLink onClick={this.props.logoutAction} href='#'>
          Logout
        </NavLink>
      </>
    )
  }
}

export default connect(null, { logoutAction })(Logout)
