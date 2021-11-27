import React, { useState } from "react"

import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  NavItem,
  NavLink,
  Progress,
  Row,
  TabContent,
  TabPane
} from "reactstrap"

import classnames from "classnames"
import { Link } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const FormWizard = () => {
  const [activeTab, setactiveTab] = useState(1)
  const [activeTabProgress, setactiveTabProgress] = useState(1)
  const [progressValue, setprogressValue] = useState(25)

  function toggleTab(tab) {
    if (activeTab !== tab) {
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab)
      }
    }
  }

  function toggleTabProgress(tab) {
    if (activeTabProgress !== tab) {
      if (tab >= 1 && tab <= 4) {
        setactiveTabProgress(tab)

        if (tab === 1) {
          setprogressValue(25)
        }
        if (tab === 2) {
          setprogressValue(50)
        }
        if (tab === 3) {
          setprogressValue(75)
        }
        if (tab === 4) {
          setprogressValue(100)
        }
      }
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Form Wizard" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Create Your Design</h4>

                  <div id="progrss-wizard" className="twitter-bs-wizard">
                    <ul className="twitter-bs-wizard-nav nav-justified nav nav-pills">
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTabProgress === 1
                          })}
                          onClick={() => {
                            toggleTabProgress(1)
                          }}
                        >
                          <span className="step-number mr-2">01</span>
                         Layout Your Garden Space 
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTabProgress === 2
                          })}
                          onClick={() => {
                            toggleTabProgress(2)
                          }}
                        >
                          <span className="step-number mr-2">02</span>
                          <span>Choose your Plants</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTabProgress === 3
                          })}
                          onClick={() => {
                            toggleTabProgress(3)
                          }}
                        >
                          <span className="step-number mr-2">03</span>
                          Place the Plants in your Garden
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTabProgress === 4
                          })}
                          onClick={() => {
                            toggleTabProgress(4)
                          }}
                        >
                          <span className="step-number mr-2">04</span>
                          Set up your Planning
                        </NavLink>
                      </NavItem>
                    </ul>

                    <div id="bar" className="mt-4">
                      <Progress
                        color="success"
                        striped
                        animated
                        value={progressValue}
                      />
                      <div className="progress-bar bg-success progress-bar-striped progress-bar-animated" />
                    </div>
                    <TabContent
                      activeTab={activeTabProgress}
                      className="twitter-bs-wizard-tab-content"
                    >
                      <TabPane tabId={1}>
	                      <h4 className="mt-0 font-size-16">
	                         Set up the Borders and Access to your Garden 
	                      </h4>

	                      <p>
	                        The first step in planning out your garden is
	                        determining the borders and areas in your property
	                        that you'd like to use for your garden.  The layers
	                        tool in Sage allows you to create borders for your
	                        garden, draw surrounding paths and access, and 
	                        place structures for reference like your house or patio.
	                      </p>

	                      <p> 
	                        Lets setup our borders and access below.
	                      </p>
                      </TabPane>
                      <TabPane tabId={2}>
	                      <h4 className="mt-0 font-size-16">
	                          Selecting your Plants
	                      </h4>

                                <p>
                                  Start by determining a list of the vegetables and fruits
	                          that your family eat and how often you eat them (eg., how many 
	                          carrots do you eat in a week).  List your plants below along with
	                          the total number/weight of each so we can figure out when and what
	                          you can grow in the spaces you drew out in the first step.
	                        </p>
                      </TabPane>
                      <TabPane tabId={3}>
	                      <h4 className="mt-0 font-size-16">
	                          Put the plants in your garden
	                      </h4>

	                        <p>
	                          Based off your plant list, we've sorted them into different seasons.
	                          We can now place your plants into your garden spaces automatically,
	                          based off having a diverse mix of plant families in each space
	                          and the nutritional requirements of each plant.  
	                        </p>

	                        <p>
	                          You can always change the plant locations, add or remove them.  We 
	                          recommend using the automatic plant placement initially to jumpstart 
	                          you without having to worry so much about combinations and companion planting.
	                        </p>
                      </TabPane>
                      <TabPane tabId={4}>
	                                <h4 className="mt-0 font-size-16">
	                                    Link in your alerts and set up your calendar
	                                </h4>

	                                  <p>
	                                    Now that we have a design, we need to actualize it by figuring out
	                                    when to start our seeds, place our plants into the garden, and
	                                    when we'd expect to harvest them.
	                                  </p>

	                                 <p>.
	                                    We can now go ahead and populate calendar events in Sage for the 
	                                    plants in your design.  You can also specify when you'd like emails/texts
	                                    to alert you that you need to take action with one of your garden tasks.
	                                  </p>
                      </TabPane>
                    </TabContent>
                    <ul className="pager wizard twitter-bs-wizard-pager-link">
                      <li
                        className={
                          activeTabProgress === 1
                            ? "previous disabled"
                            : "previous"
                        }
                      >
                        <Link
                          to="#"
                          onClick={() => {
                            toggleTabProgress(activeTabProgress - 1)
                          }}
                        >
                          Previous
                        </Link>
                      </li>
                      <li
                        className={
                          activeTabProgress === 4 ? "next disabled" : "next"
                        }
                      >
                        <Link
                          to="#"
                          onClick={() => {
                            toggleTabProgress(activeTabProgress + 1)
                          }}
                        >
                          Next
                        </Link>
                      </li>
                    </ul>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default FormWizard
