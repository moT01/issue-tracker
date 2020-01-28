import React, { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input
} from 'reactstrap'
import { connect } from 'react-redux'
import { createIssueAction } from '../redux/actions/issueActions'
import PropTypes from 'prop-types'

class NewIssueModal extends Component {
  state = {
    modal: false,
    title: '',
    description: ''
  }

  static propTypes = {
    createIssueAction: PropTypes.func.isRequired,
    issues: PropTypes.object.isRequired
  }

  toggle = () => {
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

    const newIssue = {
      title: this.state.title,
      description: this.state.description
    }

    this.props.createIssueAction(newIssue)
    this.toggle()
  }

  render() {
    return (
      <div>
        <Button
          color='dark'
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
        >
          New Issue
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>New Issue</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  type='text'
                  name='title'
                  id='title'
                  placeholder='title'
                  onChange={this.onChange}
                />
                <Input
                  type='textarea'
                  name='description'
                  id='description'
                  placeholder='description'
                  onChange={this.onChange}
                  style={{ marginTop: '2rem' }}
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Create
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
  issues: state.issues
})

export default connect(mapStateToProps, { createIssueAction })(NewIssueModal)
