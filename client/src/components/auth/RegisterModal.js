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
import { registerAction } from '../../redux/actions/authActions'
import { clearErrorsAction } from '../../redux/actions/errorActions'
import PropTypes from 'prop-types'

class RegisterModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    registerAction: PropTypes.func.isRequired,
    clearErrorsAction: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props

    if (error !== prevProps.error) {
      // check for register error
      if (error.id === 'REGISTER_FAIL') {
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

    const { name, email, password } = this.state

    const newUser = {
      name,
      email,
      password
    }

    // attempt to register
    this.props.registerAction(newUser)
  }

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='name'
                  onChange={this.onChange}
                />
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='email'
                  onChange={this.onChange}
                  style={{ marginTop: '2rem' }}
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
                  Register
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

export default connect(mapStateToProps, { registerAction, clearErrorsAction })(
  RegisterModal
)
