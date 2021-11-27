import React, { useState } from "react"
import { Link, withRouter } from "react-router-dom"
import Dropzone from "react-dropzone"
import { Button, Card, CardBody, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"
import { postNote } from "store/journal/actions"
//Import Date Picker
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { connect, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const NoteCreate = props => { 
  const {
      history,
      onPostNote
    } = props
  const [selectedFiles, setselectedFiles] = useState([])
  const [title,setTitle] = useState([])
  const [description,setDescription] = useState([])
  const [category,setCategory] = useState("")
  const [date, setDate] = useState(new Date())

 const changeDate = date => {
    setDate(date)
 }

const dispatch = useDispatch();

const prepSubmit = () => {
  var noteDetails = {
      id: uuidv4(),
      username: JSON.parse(localStorage.getItem("user")).user,
      title: title,
      description: description,
      category: category,
      date: date,
      events: [],
      images: []
  };
  onPostNote(noteDetails, history, "list");
 }

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size)
      })
    )

    setselectedFiles(files)
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Journal" breadcrumbItem="Create Note" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
	  <Form>
	       <Row>
	             <label
	                  htmlFor="title_input"
	                  className="col-md-6 col-form-label"
	              >
	                  Title
	             </label>
	      </Row>
	      <Row>
	              <input
	                  className="form-control"
	                  type="text"
	                  defaultValue={title}
	                  onChange={e => setTitle(e.target.value)}
	              />
	     </Row>
	     <Row>
	                  <label
	                     htmlFor="description_input"
	                     className="col-md-2 col-form-label"
	                  >Description</label>
	      </Row>
	      <Row>
	                  <textarea
	                      className="form-control"
	                      onChange={e => setDescription(e.target.value)}
	                      defaultValue={description}
	                  />
	      </Row>
	      <Row>
	                  <label
	                       htmlFor="category_input"
	                      className="col-md-2 col-form-label"
	                  >
	                  Category
	                  </label>
	      </Row>
	      <Row>
	                   <select className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
	                          <option value=""></option>
	                          <option value="Harvest">Harvest</option>
	                          <option value="Observation">Observation</option>
	                          <option value="Transplanting">Transplanting</option>
	                          <option value="Maintenance">Maintenance</option>
	                         <option value="Seed Starting">Seed Starting</option>
	                          <option value="Construction">Construction</option>
	                   </select>
	      </Row>
	      <Row>
	                  <label
	                        htmlFor="date_input"
	                       className="col-md-2 col-form-label"
	                  >
	                   Date
	                  </label>
	      </Row>
	      <Row>
	                   <DatePicker
	                        className="form-control"
	                        selected={date}
	                        onChange={changeDate}
	                  />
	           </Row>
	      </Form>
                  <FormGroup className="mb-4" row>
                    <Label className="col-form-label col-lg-2">
                      Attached Files
                    </Label>
                    <Col lg="10">
                      <Form>
                        <Dropzone
                          onDrop={acceptedFiles => {
                            handleAcceptedFiles(acceptedFiles)
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div className="dropzone">
                              <div
                                className="dz-message needsclick"
                                {...getRootProps()}
                              >
                                <input {...getInputProps()} />
                                <div className="dz-message needsclick">
                                  <div className="mb-3">
                                    <i className="display-4 text-muted bx bxs-cloud-upload" />
                                  </div>
                                  <h4>Drop files here or click to upload.</h4>
                                </div>
                              </div>
                            </div>
                          )}
                        </Dropzone>
                        <div
                          className="dropzone-previews mt-3"
                          id="file-previews"
                        >
                          {selectedFiles.map((f, i) => {
                            return (
                              <Card
                                className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                key={i + "-file"}
                              >
                                <div className="p-2">
                                  <Row className="align-items-center">
                                    <Col className="col-auto">
                                      <img
                                        data-dz-thumbnail=""
                                        height="80"
                                        className="avatar-sm rounded bg-light"
                                        alt={f.name}
                                        src={f.preview}
                                      />
                                    </Col>
                                    <Col>
                                      <Link
                                        to="#"
                                        className="text-muted font-weight-bold"
                                      >
                                        {f.name}
                                      </Link>
                                      <p className="mb-0">
                                        <strong>{f.formattedSize}</strong>
                                      </p>
                                    </Col>
                                  </Row>
                                </div>
                              </Card>
                            )
                          })}
                        </div>
                      </Form>
                    </Col>
                  </FormGroup>
                  <Row className="justify-content-end">
                    <Col lg="12">
                      <Button type="text" color="success"  onClick={() => {prepSubmit()}}>
                        Create
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => ({
	  onPostNote: (noteDetails,history,redirect) => dispatch(postNote(noteDetails,history,redirect)),
})

export default connect(
	null,
	  mapDispatchToProps
)(withRouter(NoteCreate))

