import React, { Component, Fragment } from 'react'
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
import EditCommentModal from './EditCommentModal'

class Comments extends Component {
  state = {
    content: ''
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
      this.state.content,
      this.props.match.params.issueId
    )
  }

  render() {
    const { comments } = this.props.comments

    return (
      <>
        {comments.map(({ _id, content, createdBy }) => (
          <Fragment key={_id}>
            <Toast>
              <ToastHeader>{_id}</ToastHeader>
              <ToastBody>{content}</ToastBody>
            </Toast>
            <EditCommentModal
              commentId={_id}
              content={content}
              createdBy={createdBy}
            />
          </Fragment>
        ))}

        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Input
              type='textarea'
              name='content'
              id='content'
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
