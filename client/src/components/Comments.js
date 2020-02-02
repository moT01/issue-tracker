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
    const isAuthenticated = this.props.isAuthenticated
    const { name, permissionsLevel } = this.props.user

    return (
      <>
        {comments.map(({ _id, content, createdBy }) => (
          <Fragment key={_id}>
            <Toast>
              <ToastHeader>{createdBy}</ToastHeader>
              <ToastBody>{content}</ToastBody>
            </Toast>
            {name === createdBy || permissionsLevel >= 2 ? (
              <EditCommentModal
                commentId={_id}
                content={content}
                createdBy={createdBy}
              />
            ) : null}
          </Fragment>
        ))}

        {isAuthenticated ? (
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
        ) : null}
      </>
    )
  }
}

const mapStateToProps = state => ({
  comments: state.comments,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps, {
  addCommentAction,
  getCommentsAction
})(Comments)
