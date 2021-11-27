import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { isEmpty } from "lodash"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { v4 as uuidv4 } from 'uuid'
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap"

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"
import BootstrapTheme from "@fullcalendar/bootstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import {
  addNewEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../../store/actions"
import DeleteModal from "./DeleteModal"
//css
import "@fullcalendar/bootstrap/main.css"
const Calender = props => {
  const { events, history } = props
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [category, setCategory] = useState(false)
  const [description, setDescription] = useState()
  const [event, setEvent] = useState({})
  const [eventId, setEventId] = useState()
  const [title, setTitle] = useState()
  const [isMultiDay, setIsMultiDay] = useState({})
  const [startDay, setStartDay] = useState(0)
  const [endDay, setEndDay] = useState(0)
  const [isEdit, setIsEdit] = useState(false)

  const calendarRef = React.createRef()
  useEffect(() => {
    const { onGetEvents } = props
    onGetEvents()
    new Draggable(document.getElementById("external-events"), {
      itemSelector: ".external-event",
    })
  }, [])

  useEffect(() => {
    if (!modal && !isEmpty(event) && !!isEdit) {
      setTimeout(() => {
        setEvent({})
        setIsEdit(false)
      }, 500)
    }
  }, [modal, event])

  /**
   * Handling the modal state
   */
  const toggle = () => {
    setModal(!modal)
  }

  const close = () => {
    setIsEdit(false)
    toggle() 
  }

  const changeStartDate = (arg) => {
    setStartDay(arg)
  }

  const changeEndDate = (arg) => {
    setEndDay(arg)
  }

  /**
   * Handling date click on calendar
   */
  const handleDateClick = arg => {
    if (arg && arg.date)
        setStartDay(arg.date)
    else
	setStartDay(new Date())
    setIsMultiDay(false)
    toggle()
  }

  const handleMultiSelect = arg => { 
    if ((arg.end.getDay()-arg.start.getDay())<2)
        return;
    setStartDay(arg.start)
    setEndDay(arg.end)
    setIsMultiDay(true)
    toggle()
  }

  /**
   * Handling click on event on calendar
   */
  const handleEventClick = arg => {
    const event = arg.event
    setTitle(event.title)
    setCategory(event.extendedProps.category)
    setEventId(event.id)
    setDescription(event.extendedProps.description)
    setStartDay(event.start)
    if (event.end) {
        setIsMultiDay(true)
    } else {
        setIsMultiDay(false)	
	setEndDay(event.end)
    }
    setIsEdit(true)
    toggle()
  }

  /**
   * Handling submit event on event form
   */
  const handleValidEventSubmit = () => {
    const { onAddNewEvent, onUpdateEvent } = props
    if (isEdit) {
      const updateEvent = {
        id: eventId,
        title: title,
        start: startDay,
        description: "",
	category: category
      }
      // update event
      onUpdateEvent(updateEvent)
    } else {
      const user = JSON.parse(localStorage.getItem("user")).user
      const newevent = {
        id: uuidv4(),
	username: user,
        title: title,
	description: "",
	plant: "Carrots",
        start: startDay,
	category: category,
      }
      if (endDay) 
        newevent["end"] = endDay
      // save new event
      onAddNewEvent(newevent)
    }
    //setStartDay(null)
    toggle()
  }

  const getColor = category => {
     if (category=="Seed Starting") {
	 return "green";
     } else if (category=="Harvest") {
	 return "orange";
     } else if (category=="Transplanting") {
	 return "blue";
     }
  }   

  /**
   * On delete event
   */
  const handleDeleteEvent = () => {
    const { onDeleteEvent } = props
    onDeleteEvent(eventId)
    var delEvent = calendarRef.current.getApi().getEventById(eventId)
    if (delEvent)
	delEvent.remove()
    setDeleteModal(false)
    toggle()
  }

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEvent}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid={true}>
          {/* Render Breadcrumb */}
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <Row>
                    <Col lg={3}>
                      <div id="external-events" className="mt-3">
                      </div>

                      <div className="mt-5 d-xl-block">
                        <h5 className="text-center">How to Plan Your Crops</h5>

                        <ul className="pl-3">
                          <li className="text-muted mb-3">
                            To add a new Garden Event, left-click on the target date or drag with your mouse from your start to end date. A dialog will pop up with fields for additional information about your event.
                            here.
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col className="col-lg-9">
                      {/* fullcalendar control */}
                      <FullCalendar
                        ref={calendarRef}
	                plugins={[
                          BootstrapTheme,
                          dayGridPlugin,
                          interactionPlugin,
                        ]}
                        slotDuration={"00:15:00"}
                        handleWindowResize={true}
                        themeSystem="bootstrap"
                        header={{
                          left: "prev,next today",
                          center: "title",
                          right: "dayGridMonth,dayGridWeek,dayGridDay",
                        }}
                        events={events}
	                displayEventTime={false}
                        editable={true}
                        selectable={true}
                        dateClick={handleDateClick}
                        eventClick={handleEventClick}
	                select={handleMultiSelect} 
                      />

                      {/* New/Edit event modal */}
                      <Modal isOpen={modal} className={props.className}>
                        <ModalHeader toggle={toggle} tag="h4">
                          {!!isEdit ? "Edit Event" : "Add Event"}
                        </ModalHeader>
                        <ModalBody>
                          <Form>
	                       <FormGroup>
	                            <Label
	                                  for="titleInput"
	                             >
	                                Title 
	                            </Label>
	                            <Input type="text" name="titleInput" value={title} 
	                                onChange={e => setTitle(e.target.value)} placeholder="Enter Event Title" />
	                       </FormGroup>
	                       <FormGroup>
	                             <Label
	                                    for="categoryInput"
	                             >
	                                  Category
	                             </Label>
	                             <Input type="select" value={category} onChange={e => setCategory(e.target.value)}>
	                                 <option value=""></option>
	                                 <option value="Harvest">Harvest</option>
	                                 <option value="Transplanting">Transplanting</option>
	                                 <option value="Maintenance">Maintenance</option>
	                                 <option value="Seed Starting">Seed Starting</option>
	                                 <option value="Construction">Construction</option>
	                              </Input>
	                       </FormGroup>
	                       <FormGroup>
	                          <Label
	                                for="startDayInput"
	                          >
	                             Start Date
	                          </Label>
	  <DatePicker
	                                              className="form-control"
	                                              selected={startDay}
	                                              onChange={changeStartDate}
	                                            />
	                       </FormGroup>
                                {isMultiDay && <FormGroup>
	                               <Label
	                                      for="endDayInput"
	                               >
	                                      End Date
	                               </Label>
	                               <DatePicker
	                                     className="form-control"
	                                     selected={endDay}
	                                     onChange={changeEndDate}
	                               />
	                      </FormGroup>
				}
                            <Row>
                              <Col>
                                <div className="text-right">
                                  <button
                                    type="button"
                                    className="btn btn-light mr-2"
                                    onClick={close}
                                  >
                                    Close
                                  </button>
                                  {!!isEdit && (
                                    <button
                                      type="button"
                                      className="btn btn-danger mr-2"
                                      onClick={() => setDeleteModal(true)}
                                    >
                                      Delete
                                    </button>
				  )}
                                  <button
                                    type="button"
                                    className="btn btn-success save-event"
	                            onClick={() => handleValidEventSubmit()}
                                  >
                                    Save
                                  </button>
                                </div>
                              </Col>
                            </Row>
                          </Form>
                        </ModalBody>
                      </Modal>

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

Calender.propTypes = {
  events: PropTypes.array,
  className: PropTypes.string,
  onGetEvents: PropTypes.func,
  onAddNewEvent: PropTypes.func,
  onUpdateEvent: PropTypes.func,
  onDeleteEvent: PropTypes.func,
}

const mapStateToProps = ({ calendar }) => {
  var modEvents = calendar.events;
  for (var i=0; i<modEvents.length; i++) {
      var event = modEvents[i];
      if (event.category=="Seed Starting") {
	  event.color = "green";    
      } else if (event.category=="Harvest") {
          event.color = "orange";
      } else if (event.category=="Transplanting") {
	  event.color = "blue";
      }
  }
  return ({
  events: modEvents})
}

const mapDispatchToProps = dispatch => ({
  onGetEvents: () => dispatch(getEvents()),
  onAddNewEvent: event => dispatch(addNewEvent(event)),
  onUpdateEvent: event => dispatch(updateEvent(event)),
  onDeleteEvent: event => dispatch(deleteEvent(event)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Calender)
