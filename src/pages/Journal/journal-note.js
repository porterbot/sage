import React, { useEffect, useState, useHistory } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { isEmpty } from "lodash"
import { Col, Container, Row, Button, FormGroup,Label, Form,Card, CardBody, CardTitle } from "reactstrap"
import { useLocation,useParams, Link } from "react-router-dom";
//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import Amplify, { Auth } from 'aws-amplify';
import { getNote,postNote,deleteNote } from "store/journal/actions"
import NoteDetail from "./noteDetail"
import NoteCreate from "./note-create"
import AttachedFiles from "./attachedFiles"
import images from "assets/images"

import { connect,useDispatch } from 'react-redux';

const Note = props => {
  const {
    noteDetail,
    match: { params },
    onGetNote,
    history,
    onPostNote,
    onDeleteNote
  } = props
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [images, setImages] = useState([])
  const dispatch = useDispatch(); 
  useEffect(() => {
      var noteId = searchParams.get('id');
      if (noteId) {
          onGetNote(noteId)
      } else {
          onGetNote(0) //remove this after full integration
      }
  }, [params, onGetNote])

  const handleSubmit = (noteDetails) => {
     onPostNote(noteDetails,history,"note");
  }

  const handleDelete = (noteId) => {
     onDeleteNote(noteId, history);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
            <Row>
                <Col xs="12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                        <h4 className="mb-0 font-size-18">Note</h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                    <Link to="/journal">Journal</Link>
                            </ol>
                        </div>
                    </div>
                </Col>
            </Row>
          {!isEmpty(noteDetail) && (
            <>
              <Row>
                <Col lg="12">
                  <NoteDetail note={noteDetail} onHandleDelete={handleDelete} onHandleSubmit={handleSubmit} />
                </Col>
              </Row>

            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

Note.propTypes = {
  noteDetail: PropTypes.any,
  match: PropTypes.object,
  onGetNote: PropTypes.func,
}

const mapStateToProps = ({ journal }) => ({
  noteDetail: journal.note,
})

const mapDispatchToProps = dispatch => ({
  onGetNote: noteId => dispatch(getNote(noteId)),
  onDeleteNote: (noteId,history) => dispatch(deleteNote(noteId,history)),
  onPostNote: (noteDetails,history,redirect) => dispatch(postNote(noteDetails,history,redirect)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Note))
