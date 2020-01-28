import React, { Component } from 'react'
import { Col, Toast, ToastBody, ToastHeader } from 'reactstrap'
import { connect } from 'react-redux'
import { getIssuesAction } from '../redux/actions/issueActions'
import { Link } from 'react-router-dom'
import NewIssueModal from './NewIssueModal'

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
          {issues.map(({ title, description, _id }) => (
            <Link key={_id} to={`/issue/${_id}`}>
              <Toast>
                <ToastHeader>{title}</ToastHeader>
                <ToastBody>{description}</ToastBody>
              </Toast>
            </Link>
          ))}
        </Col>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  issues: state.issues
})

export default connect(mapStateToProps, { getIssuesAction })(Issues)
