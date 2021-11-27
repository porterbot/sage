import PropTypes from 'prop-types'
import React, { useState } from "react"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  CardText,
  CardSubtitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
  Table,
} from "reactstrap"
import { Link } from "react-router-dom"
import { AmplifyS3Image } from '@aws-amplify/ui-react';
import Storage from '@aws-amplify/storage'

//import Charts
import StackedColumnChart from "./StackedColumnChart"

import modalimage1 from "../../assets/images/product/img-7.png"
import modalimage2 from "../../assets/images/product/img-4.png"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import googleCalendarPlugin from "@fullcalendar/google-calendar"
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"
import BootstrapTheme from "@fullcalendar/bootstrap"

// Pages Components
import WelcomeComp from "./WelcomeComp"
import MonthlyEarning from "./MonthlyEarning"
import SocialSource from "./SocialSource"
import ActivityComp from "./ActivityComp"
import TopCities from "./TopCities"
import LatestTranaction from "./LatestTranaction"

//i18n
import { withTranslation } from "react-i18next"

const Dashboard = props => {
  const [monthlyHighlight, setMonthlyHighlight] = useState()

  Storage.get("Monthly-Garden-Planning-Template-for-September.pdf").then (result => {
	  setMonthlyHighlight(result)} )
  const [modal, setmodal] = useState(false)
  const events = {
	  googleCalendarId: 'permaculturegardens@gmail.com'
  }
  const reports = [
    { title: "Orders", iconClass: "bx-copy-alt", description: "1,235" },
    { title: "Revenue", iconClass: "bx-archive-in", description: "$35, 723" },
    {
      title: "Average Price",
      iconClass: "bx-purchase-tag-alt",
      description: "$16.2",
    },
  ]
  const email = [
    { title: "Week", linkto: "#", isActive: false },
    { title: "Month", linkto: "#", isActive: false },
    { title: "Year", linkto: "#", isActive: true },
  ]

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}

          <Row>
            <Col xl="12">
              <Row>
                  <Col md="4">
             <Card outline className="border">
                <CardHeader  style={{backgroundColor:'#AEBFFF'}}>
                  <h5>
                    GIY UPDATES & ANNOUNCEMENTS 
                  </h5>
                </CardHeader>
                <CardBody>
                  <CardText>
                    <ul>
	               <li>Happy Thanksgiving!</li>
	               <li>GIY Check-Ins are still available (Click on Check-Ins tab above to schedule yours!)</li>
	               <li>GIY Black Friday Sale for GIY Members (who have joined before Black Friday): Extend your GIY subscription for one year for $99 only!!! (Check your email for details.)  Thank you for your continued membership!</li>
	            </ul>
                  </CardText>
                </CardBody>
              </Card>

	      <Card>
	          <Button  style={{backgroundColor:'#AEBFFF'}} href="https://www.youtube.com/playlist?list=PLFe4AR1ta14squhDsxNp-NffXmEb3gSdd"><span style={{ color:"#000000"}}>Archive of GIY Monthly Training Videos</span></Button>
	      </Card>

	   <Card>
                          <CardBody>
                            <div className="embed-responsive embed-responsive-4by3">
                              <iframe
                                title="tes2"
                                className="embed-responsive-item"
                                src="https://youtube.com/embed/S5HvDyOS6ig"
                              />
                            </div>

                          </CardBody>
                        </Card>

              
	          </Col>
                  <Col md="8">
	             <div style={{position: 'relative',paddingBottom: '56.25%', paddingTop: '30px', height: '0',overflow: 'hidden'}}>
	                <iframe style={{position: 'absolute',top: '0',left:'0',width: '100%',height: '100%'}} src="https://calendar.google.com/calendar/embed?src=hlqjaldjcq5fpmc9lpui1q1g0c%40group.calendar.google.com&ctz=America%2FNew_York"></iframe>
                     </div>
	          </Col>
              </Row>

            </Col>
          </Row>

        </Container>
      </div>
      <Modal
        isOpen={modal}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabindex="-1"
        toggle={() => {
          setmodal(!modal)
        }}
      >
        <div className="modal-content">
          <ModalHeader
            toggle={() => {
              setmodal(!modal)
            }}
          >
            Order Details
          </ModalHeader>
          <ModalBody>
            <p className="mb-2">
              Product id: <span className="text-primary">#SK2540</span>
            </p>
            <p className="mb-4">
              Billing Name: <span className="text-primary">Neal Matthews</span>
            </p>

            <div className="table-responsive">
              <Table className="table table-centered table-nowrap">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage1} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          Wireless Headphone (Black)
                        </h5>
                        <p className="text-muted mb-0">$ 225 x 1</p>
                      </div>
                    </td>
                    <td>$ 255</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage2} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          Hoodie (Blue)
                        </h5>
                        <p className="text-muted mb-0">$ 145 x 1</p>
                      </div>
                    </td>
                    <td>$ 145</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-right">Sub Total:</h6>
                    </td>
                    <td>$ 400</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-right">Shipping:</h6>
                    </td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-right">Total:</h6>
                    </td>
                    <td>$ 400</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="secondary"
              onClick={() => {
                setmodal(!modal)
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any
}

export default withTranslation()(Dashboard)
