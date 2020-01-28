import React, { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Alert,
  NavLink
} from 'reactstrap'
import { connect } from 'react-redux'
import { loginAction } from '../../redux/actions/authActions'
import { clearErrorsAction } from '../../redux/actions/errorActions'
import PropTypes from 'prop-types'

class LoginModal extends Component {
  state = {
    modal: false,
    email: '',
    password: '',
    msg: null
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    loginAction: PropTypes.func.isRequired,
    clearErrorsAction: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props

    if (error !== prevProps.error) {
      // check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({
          msg: error.msg.msg
        })
      } else {
        this.setState({
          msg: null
        })
      }
    }
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle()
      }
    }
  }

  toggle = () => {
    // clear errors
    this.props.clearErrorsAction()

    this.setState({
      modal: !this.state.modal
    })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()

    const { email, password } = this.state
    const user = {
      email,
      password
    }

    // attempt to login
    this.props.loginAction(user)
  }

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Login
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='email'
                  onChange={this.onChange}
                />
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='password'
                  onChange={this.onChange}
                  style={{ marginTop: '2rem' }}
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, { loginAction, clearErrorsAction })(
  LoginModal
)
