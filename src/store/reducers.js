import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

//Calendar
import calendar from "./calendar/reducer"

//chat
import chat from "./chat/reducer"

//crypto
import crypto from "./crypto/reducer"

//invoices
import invoices from "./invoices/reducer"

// journal
import journal from "./journal/reducer"

//tasks
import tasks from "./tasks/reducer"

//contacts
import contacts from "./contacts/reducer"

import designer from "./design/reducer"
import resources from "./resources/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  calendar,
  chat,
  crypto,
  invoices,
  journal,
  tasks,
  designer,
  resources,
  contacts,
})

export default rootReducer
