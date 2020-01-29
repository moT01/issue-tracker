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
import { editCommentAction } from '../redux/actions/commentActions'
import PropTypes from 'prop-types'

class EditCommentModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      content: this.props.content
    }
  }

  static propTypes = {
    editCommentAction: PropTypes.func.isRequired,
    comments: PropTypes.object.isRequired
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      content: this.props.content
    })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()

    const modifiedComment = {
      content: this.state.content,
      commentId: this.props.commentId,
      createdBy: this.props.createdBy
    }

    this.props.editCommentAction(modifiedComment)
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
                  type='textarea'
                  name='content'
                  id='content'
                  placeholder='Leave a comment'
                  value={this.state.content}
                  onChange={this.onChange}
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
  comments: state.comments
})

export default connect(mapStateToProps, { editCommentAction })(EditCommentModal)
