import React from "react"
import PropTypes from 'prop-types'
import { Route, useHistory } from "react-router-dom"
import { useEffect, useState } from "react"
import Amplify, { Auth } from 'aws-amplify';
import {addToken, logoutUser} from '../../helpers/fakebackend_helper.js'

const PrivateRoute =  ({ component: Component, layout: Layout }) => {
   let history = useHistory();

   const isAuthenticated = () => {
	   console.log("Checking User");
       if (!localStorage.getItem("user")) 
	   redirectToLogin();
       const userExpiry = JSON.parse(localStorage.getItem("user"))
       const now = new Date()
       if (userExpiry && userExpiry.expireSession && userExpiry.expireSession > now.getTime())
	   return true;
       // add remember me at some point
      /*Auth.currentAuthenticatedUser()
	    .then(user => {
		addToken(user);
	    })
	    .catch (err => redirectToLogin());
	*/
       logoutUser();
       redirectToLogin();

   }

   const redirectToLogin = () => {
       history.push('/login');
    }

 useEffect(() => {
      isAuthenticated();
 }, []);

return (
   <Route
       render={props => {
             return (
		 <Layout>
	            <Component/>
	          </Layout> : null
	        )
       }}
  />
)
}

PrivateRoute.propTypes = {
  component: PropTypes.any,
  layout: PropTypes.any
}

export default PrivateRoute
