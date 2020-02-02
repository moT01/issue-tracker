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
    const isAuthenticated = this.props.isAuthenticated
    const { name, permissionsLevel } = this.props.user

    return (
      <div>
        {isAuthenticated ? <NewIssueModal /> : null}
        <Col lg='6' sm='8'>
          {issues.map(({ title, description, createdBy, createdOn, _id }) => (
            <Fragment key={_id}>
              <Link to={`/issue/${_id}`}>
                <Toast>
                  <ToastHeader>
                    {title}
                    <span>
                      opened by {createdBy} on {createdOn}
                    </span>
                  </ToastHeader>
                  <ToastBody>{description}</ToastBody>
                </Toast>
              </Link>
              {name === createdBy || permissionsLevel >= 2 ? (
                <EditIssueModal
                  createdBy={createdBy}
                  title={title}
                  description={description}
                  issueId={_id}
                />
              ) : null}
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
  issues: state.issues,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps, { getIssuesAction, toggleIssueAction })(
  Issues
)
