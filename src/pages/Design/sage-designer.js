import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import img2 from "../../assets/images/designer.png"
import {
	  Col,
	  Row,
	  Card,
	  CardBody,
	  CardTitle,
	  CardSubtitle,
	  CardImg,
	  CardText,
	  Container,
} from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import { getUsers } from "store/contacts/actions"
import { isEmpty } from "lodash"

const SageList = props => {
  const { users, onGetUsers } = props
  const [userList, setUserList] = useState([])
  const pageOptions = {
    sizePerPage: 10,
    totalSize: 50, // replace later with size(users),
    custom: true,
  }

  useEffect(() => {
    onGetUsers()
    setUserList(users)
  }, [users, onGetUsers])

  useEffect(() => {
    if (!isEmpty(users)) {
      setUserList(users)
    }
  }, [users])

  const draw = context => {
	  // Insert your canvas API code to draw an image
  };

  // eslint-disable-next-line no-unused-vars
  const handleTableChange = (type, { page, searchText }) => {
    setUserList(
      users.filter(user =>
        Object.keys(user).some(
          key =>
            typeof user[key] === "string" &&
            user[key].toLowerCase().includes(searchText.toLowerCase())
        )
      )
    )
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
	  <Row>
	     <Col lg={8}>
	        <Card>
	            <CardBody>
	            </CardBody>
	        </Card>
	     </Col>
	  </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}

SageList.propTypes = {
  users: PropTypes.array,
  onGetUsers: PropTypes.func,
}

const mapStateToProps = ({ contacts }) => ({
  users: contacts.users,
})

const mapDispatchToProps = dispatch => ({
  onGetUsers: () => dispatch(getUsers()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SageList))
