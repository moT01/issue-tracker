import React, { Component } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Input,
  Toast,
  ToastHeader,
  ToastBody
} from 'reactstrap'
import { connect } from 'react-redux'
import {
  addCommentAction,
  getCommentsAction
} from '../redux/actions/commentActions'

class Comments extends Component {
  state = {
    comment: ''
  }

  componentDidMount() {
    this.props.getCommentsAction(this.props.match.params.issueId)
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()
    e.target.reset()
    this.props.addCommentAction(
      this.state.comment,
      this.props.match.params.issueId
    )
  }

  render() {
    const { comments } = this.props.comments

    return (
      <>
        {comments.map(({ _id, comment }) => (
          <Toast>
            <ToastHeader>{_id}</ToastHeader>
            <ToastBody>{comment}</ToastBody>
          </Toast>
        ))}

        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Input
              type='textarea'
              name='comment'
              id='comment'
              placeholder='Leave a comment'
              onChange={this.onChange}
              style={{ marginTop: '2rem' }}
            />
            <Button color='dark' style={{ marginTop: '2rem' }} block>
              Comment
            </Button>
          </FormGroup>
        </Form>
      </>
    )
  }
}

const mapStateToProps = state => ({
  comments: state.comments
})

export default connect(mapStateToProps, {
  addCommentAction,
  getCommentsAction
})(Comments)
