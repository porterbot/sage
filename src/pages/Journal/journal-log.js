import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap"
import { withRouter, Link } from "react-router-dom"
import { map } from "lodash"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import Cards
import CardNote from "./card-note"

import { getJournal } from "store/actions"

const JournalLog = props => {
  const { journal, onGetJournal } = props
  const [page, setPage] = useState(1)
  const [totalPage] = useState(5)

  useEffect(() => {
    onGetJournal()
  }, [onGetJournal])

  const handlePageClick = page => {
    setPage(page)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Row>
	  <Col lg="10">
          <Row>
              <Col xs="12">
                  <div className="page-title-box d-flex align-items-center justify-content-between">
                      <h4 className="mb-0 font-size-18">Journal</h4>
                  </div>
              </Col>
          </Row>
	  </Col>
	  <Col lg="2">
	     <Link to="/journal/note/create">
	         <button
	            type="button"
	            className="btn btn-success waves-effect waves-light"
	         >
	         Create
	         </button>
	    </Link>
	  </Col>
	  </Row>
          <Row>
            {/* Import Cards */}
            <CardNote journal={journal} />
          </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}

JournalLog.propTypes = {
  journal: PropTypes.array,
  onGetJournal: PropTypes.func,
}

const mapStateToProps = ({ journal }) => ({
  journal: journal.journal,
})

const mapDispatchToProps = dispatch => ({
  onGetJournal: () => dispatch(getJournal()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(JournalLog))
