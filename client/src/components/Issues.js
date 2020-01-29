import React, { Component, Fragment } from 'react'
import { Col, Toast, ToastBody, ToastHeader, Button } from 'reactstrap'
import { connect } from 'react-redux'
import {
  getIssuesAction,
  toggleIssueAction
} from '../redux/actions/issueActions'
import { Link } from 'react-router-dom'
import NewIssueModal from './NewIssueModal'
import EditIssueModal from './EditIssueModal'

class Issues extends Component {
  componentDidMount() {
    this.props.getIssuesAction()
  }

  render() {
    const { issues } = this.props.issues

    return (
      <div>
        <NewIssueModal />
        <Col lg='6' sm='8'>
          {issues.map(({ title, description, createdBy, _id }) => (
            <Fragment key={_id}>
              <Link to={`/issue/${_id}`}>
                <Toast>
                  <ToastHeader>{title}</ToastHeader>
                  <ToastBody>{description}</ToastBody>
                </Toast>
              </Link>
              <EditIssueModal
                createdBy={createdBy}
                title={title}
                description={description}
                issueId={_id}
              />
              <Button
                onClick={() => this.props.toggleIssueAction(_id, createdBy)}
              >
                Open/Close
              </Button>
            </Fragment>
          ))}
        </Col>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  issues: state.issues
})

export default connect(mapStateToProps, { getIssuesAction, toggleIssueAction })(
  Issues
)
