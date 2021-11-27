import React from "react"

import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardImg,
  CardText,
  CardHeader,
  CardImgOverlay,
  CardFooter,
  CardDeck,
  CardColumns,
  Container,
} from "reactstrap"

// import images
import sarah_design from "../../assets/images/small/sarah_design.jpg"
import lynette_design from "../../assets/images/small/lynette_design.jpg"
import tracy_design from "../../assets/images/small/tracy_design.jpg"
import { Link } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const DesignGallery = props => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Design Gallery" breadcrumbItem="Design Gallery" />
          <Row>
	      <Col lg={6}>
	          <Card>
	              <Row className="no-gutters align-items-center">
	                  <Col md={4}>
	                     <CardImg className="img-fluid" src={sarah_design} alt="Sarah Design" />
	                  </Col>
	                  <Col md={8}>
	                     <CardBody>
	                        <CardTitle>Sarah Kansas Garden</CardTitle>
	                        <CardText>
	                          Vegetable garden beds with perennial area outside fence
	                        </CardText>
	                        <CardText>
	                          <small className="text-muted">
	                            2020-06-23
	                          </small>
	                        </CardText>
	                      </CardBody>
	                    </Col>
	              </Row>
	          </Card>
	       </Col>
	       <Col lg={6}>
	          <Card>
	                        <Row className="no-gutters align-items-center">
	                            <Col md={4}>
	                               <CardImg className="img-fluid" src={lynette_design} alt="Lynette Design" />
	                            </Col>
	                            <Col md={8}>
	                               <CardBody>
	                                  <CardTitle>Lynette Massachusetts Garden</CardTitle>
	                                  <CardText>
	                                    Two raised beds with long natural bed along the fence.
	                                  </CardText>
	                                  <CardText>
	                                    <small className="text-muted">
	                                      2020-09-15
	                                    </small>
	                                  </CardText>
	                                </CardBody>
	                              </Col>
	                        </Row>
	                    </Card>
	      </Col>
          </Row>
	  <Row>
	      <Col lg={6}>
	  <Card>
	                                  <Row className="no-gutters align-items-center">
	                                      <Col md={4}>
	                                         <CardImg className="img-fluid" src={tracy_design} alt="Tracy Design" />
	                                      </Col>
	                                      <Col md={8}>
	                                         <CardBody>
	                                            <CardTitle>Tracy's Arkansas Garden</CardTitle>
	                                            <CardText>
	                                              Large space on hill next to yard.  Polyculture with mixed plantings.
	                                            </CardText>
	                                            <CardText>
	                                              <small className="text-muted">
	                                                2020-10-15 
	                                              </small>
	                                            </CardText>
	                                          </CardBody>
	                                        </Col>
	                                  </Row>
	                              </Card>
	      </Col>
	  </Row>
	   
        </Container>
      </div>
    </React.Fragment>
  )
}
export default DesignGallery 
