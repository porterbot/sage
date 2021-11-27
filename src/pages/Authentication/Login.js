import PropTypes from 'prop-types'
import React, { useEffect } from "react"

import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

//Social Media Imports
import { GoogleLogin } from "react-google-login"
// import TwitterLogin from "react-twitter-auth"

// actions
import { loginUser, apiError, socialLogin } from "store/actions"

// import images
import profile from "assets/images/profile-img.png"
import logo from "assets/images/logo.svg"

//Import config
import { facebook, google } from "../../config"

const Login = props => {
const {
	error
} = props
	    useEffect(() => {
		    console.log("Changed " + props.error);

	}, [error]);

  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
    props.loginUser(values, props.history)
  }

  const signIn = (res, type) => {
    const { socialLogin } = props
    const postData = {
        name: res.profileObj.name,
        username: res.profileObj.username,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      }
      socialLogin(postData, props.history, type)
  }

  //handleGoogleLoginResponse
  const googleResponse = response => {
    signIn(response, "google")
  }

  //handleTwitterLoginResponse
  // const twitterResponse = e => {}

  //handleFacebookLoginResponse
  const facebookResponse = response => {
    signIn(response, "facebook")
  }

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div style={{backgroundColor:"#738276"}}>
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 style={{textColor:"#384E3E"}}>Welcome Back!</h5>
                        <h6 style={{textColor: "#384E3E"}}>Sign in to Sage.</h6>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v)
                      }}
                    >
                      {error && error != "" ? (
                        <Alert color="danger">{error}</Alert>
                      ) : null}

                      <div className="form-group">
                        <AvField
                          name="username"
                          label="Username"
                          value=""
                          className="form-control"
                          placeholder=""
                          type="username"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <AvField
                          name="password"
                          label="Password"
                          value=""
                          type="password"
                          required
                          placeholder=""
                        />
                      </div>

                      <div className="mt-3">
                        <button
	                className="btn btn-success btn-block waves-effect waves-light"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock mr-1" />
                          Forgot your password?
                        </Link>
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
	      <div>
                <p>
                  © {new Date().getFullYear()} Permaculture Gardens. 
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  if (state.Login.error!="") {
      return { error: state.Login.error.message }
  } 
  return { error: state.Login.error }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError, socialLogin })(Login)
)

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func
}
