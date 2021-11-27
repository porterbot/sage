import React, { useState } from "react"
import PropTypes from "prop-types"
import { map, get } from "lodash"
import { Label, Input, Modal, Button, Form, Container, Card, CardBody, Col, Media, Row, FormGroup } from "reactstrap"
import img1 from "../../assets/images/companies/img-1.png"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Dropzone from "react-dropzone"
import { getNote,postNote } from "store/journal/actions"
import { useDispatch } from 'react-redux';
import { AmplifyS3Image } from '@aws-amplify/ui-react';

import Storage from '@aws-amplify/storage'
import { useLocation,useParams, Link } from "react-router-dom";

const NoteDetail = ({ note, onHandleSubmit, onHandleDelete }) => {
	const [title,setTitle] = useState(note.title)
	const [description,setDescription] = useState(note.description)
	const [category,setCategory] = useState(note.category)
	const [date, setDate] = useState(Date.parse(note.date))
	const [selectedFiles, setselectedFiles] = useState([])
	var rows = [];
	for (var i = 0; i < note.events.length; i++) {
	     rows.push(<p key={i} className="text-muted mb-0">{note.events[i]}</p>);
        }

        const [modal_standard, setmodal_standard] = useState(false)

        function tog_standard() {
            setmodal_standard(!modal_standard)
            removeBodyCss()
	}
	  
	function removeBodyCss() {
            document.body.classList.add("no_padding")
	}

	const changeDate = date => {
	    setDate(date)
	}

	const uploadFiles = () => {
		selectedFiles.map(file => {
			Storage.put(file.name, file, {
				contentType: file.type
			}).then (result => console.log(result))
				.catch(err => {
					console.log(err)
					note.images.push({key: file.name});
					prepSubmit();
				});
		});
	}

	const dispatch = useDispatch(); 

	const deleteNote = () => {
            onHandleDelete(note.id);
	}

	const handleAcceptedFiles = (files) => {
		files.map(file =>
			Object.assign(file, {
				preview: URL.createObjectURL(file),
				formattedSize: formatBytes(file.size),
				uploadName: file.name,
				uploadData: file
			})

		)
		setselectedFiles(files)
	}

	const formatBytes = (bytes, decimals = 2) => {
		if (bytes === 0) return "0 Bytes"
		const k = 1024
		const dm = decimals < 0 ? 0 : decimals
		const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

		const i = Math.floor(Math.log(bytes) / Math.log(k))
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
	}

	const prepSubmit = () => {
            tog_standard();
            var noteDetails = {
                id: note.id,
                username: JSON.parse(localStorage.getItem("user")).user,
                title: title,
                description: description,
                category: category,
		        images: note.images,
                date: date,
                events: note.events
            };
            onHandleSubmit(noteDetails); 
       }

  return (

  <React.Fragment>
		  <Container fluid>
	  <Row>
		  <Col lg="8">
			  <Card>
				  <CardBody>
					  <Row>
						  <Col sm="9" xs="9">
							  <Media>
								  <Media className="overflow-hidden" body>
									  <h5 className="text-truncate font-size-15">{note.title}</h5>
								  </Media>
							  </Media>

							  <p className="text-muted">
								  {note.description}
							  </p>
						  </Col>
						  <Col sm="1" xs="1">
							  <button
								  type="button"
								  onClick={() => {
									  tog_standard()
								  }}
								  className="btn btn-warning waves-effect waves-light"
								  data-toggle="modal"
								  data-target="#myModal"
							  >
								  Edit
							  </button>
						  </Col>
						  <Col sm="1" xs="1">
							  <button
								  type="button"
								  onClick={() => {
									  deleteNote()
								  }}
								  className="btn btn-danger waves-effect waves-light"
							  >
								  Delete
							  </button>
						  </Col>
					  </Row>
					  <Row>
						  <Col sm="4" xs="4">
							  <div className="mt-4">
								  <h5 className="font-size-14">
									  <i className="bx bx-calendar-check mr-1 text-primary" />
									  Date
								  </h5>
								  <p className="text-muted mb-0">{new Intl.DateTimeFormat('en-GB', {
									  month: 'long',
									  day: '2-digit',
									  year: 'numeric',
								  }).format(new Date(note.date))}</p>
							  </div>
						  </Col>
						  <Col sm="4" xs="4">
							  <div className="mt-4">
								  <h5 className="font-size-14">
									  <i className="mdi mdi-sprout mr-1 text-primary" />
									  Category
								  </h5>
								  <p className="text-muted mb-0">{note.category}</p>
							  </div>
						  </Col>
						  <Col sm="4" xs="4">
							  <div className="mt-4">
								  <h5 className="font-size-14">
									  <i className="mdi mdi-party-popper mr-1 text-primary" />
									  Events
								  </h5>
								  {rows}
							  </div>
						  </Col>

					  </Row>
				  </CardBody>
			  </Card>
		  </Col>
		  <Col lg="4">
			  <Card>

				  <CardBody>
					  <h4>Images</h4>
					  {note && note.images ? (
						  note.images.map((image) => (
							  <Row>
								  <Col lg="10">
									  <AmplifyS3Image style={{"--width": "200px"}} imgKey={image.key} />
								  </Col>
								  <Col lg="2">
									  <button
										  type="button"
										  className="btn btn-danger waves-effect waves-light"
									  >
										  <i className="bx bx-block font-size-8 align-middle"></i>
									  </button>
								  </Col>
							  </Row>
						  ))
					  ): ""}
				  </CardBody>
			  </Card>
			  <FormGroup className="mb-4" row>
				  <Col lg="12">
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
										  <div className="mb-3">
											  <i className="display-4 text-muted bx bxs-cloud-upload" />
										  </div>
										  <h4>Drop files here or click to upload.</h4>
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
					  <Button type="text" color="success"  onClick={() => {uploadFiles()}}>
						  Save Images
					  </Button>
				  </Col>
			  </FormGroup>
		  </Col>
	  </Row>
	<Row>
		<Col sm={6} md={4} xl={3} className="mt-8">
			<Modal
				isOpen={modal_standard}
				toggle={() => {
					tog_standard()
				}}
			>
				<div className="modal-header">
					<h5 className="modal-title mt-0" id="myModalLabel">
						Edit Note
					</h5>
					<button
						type="button"
						onClick={() => {
							setmodal_standard(false)
						}}
						className="close"
						data-dismiss="modal"
						aria-label="Close"
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div className="modal-body">
					<Form>
						<Row>
							<div>
								<label
									htmlFor="title_input"
									className="col-md-2 col-form-label"
								>
									Title
								</label>
							</div>
							<div className="col-md-12">
								<input
									className="form-control"
									type="text"
									defaultValue={title}
									onChange={e => setTitle(e.target.value)}
								/>
							</div>
							<div>
								<label
									htmlFor="description_input"
									className="col-md-2 col-form-label"
								>
									Description
								</label>
							</div>
							<div className="col-md-12">
	                                  <textarea
										  className="form-control"
										  onChange={e => setDescription(e.target.value)}
										  defaultValue={description}
									  />
							</div>
							<div>
								<label
									htmlFor="category_input"
									className="col-md-2 col-form-label"
								>
									Category
								</label>
							</div>
							<div className="col-md-12">
								<select value={category} onChange={e => setCategory(e.target.value)}>
									<option value="Harvest">Harvest</option>
									<option value="Observation">Observation</option>
									<option value="Transplanting">Transplanting</option>
									<option value="Maintenance">Maintenance</option>
									<option value="Seed Starting">Seed Starting</option>
									<option value="Construction">Construction</option>
								</select>
							</div>
							<div>
								<label
									htmlFor="date_input"
									className="col-md-2 col-form-label"
								>
									Date
								</label>
							</div>
							<div className="col-md-12">
								<DatePicker
									className="form-control"
									selected={date}
									onChange={changeDate}
								/>
							</div>
						</Row>
						<Row>

							<div>
								<button type="button" className="btn btn-primary w-md"
										onClick={() => {
											prepSubmit()
										}}
										data-toggle="modal"
										data-target="#myModal"
								>
									Submit
								</button>
							</div>
						</Row>
					</Form>
				</div>
			</Modal>
		</Col>
	</Row>

		  </Container>
  </React.Fragment>
  )
}

NoteDetail.propTypes = {
  note: PropTypes.object,
}

export default NoteDetail
