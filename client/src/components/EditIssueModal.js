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
import { editIssueAction } from '../redux/actions/issueActions'
import PropTypes from 'prop-types'

class EditIssueModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      title: this.props.title,
      description: this.props.description
    }
  }

  static propTypes = {
    editIssueAction: PropTypes.func.isRequired,
    issues: PropTypes.object.isRequired
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      title: this.props.title,
      description: this.props.description
    })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()

    const modifiedIssue = {
      title: this.state.title,
      description: this.state.description,
      issueId: this.props.issueId,
      createdBy: this.props.createdBy
    }

    this.props.editIssueAction(modifiedIssue)
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
          Edit
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  type='text'
                  name='title'
                  id='title'
                  placeholder='title'
                  value={this.state.title}
                  onChange={this.onChange}
                />
                <Input
                  type='textarea'
                  name='description'
                  id='description'
                  placeholder='description'
                  value={this.state.description}
                  onChange={this.onChange}
                  style={{ marginTop: '2rem' }}
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Submit
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

export default connect(mapStateToProps, { editIssueAction })(EditIssueModal)
