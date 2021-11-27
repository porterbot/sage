import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess } from "./actions"

//Include Both Helper File with needed methods
import {
  postLogin,
  postSocialLogin,
  addToken,
  logoutUser,
} from "../../../helpers/fakebackend_helper"

function* loginUser({ payload: { user, history } }) {
  try {
    console.log("GFSDGFSDG")
    const response = yield call(postLogin, {
      username: user.username,
      password: user.password
    })
    yield call(addToken, response)
    history.push("/dashboard")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* processLogoutUser({ payload: { history } }) {
  try {
    console.log("ASDAF");
    yield call(logoutUser)
    history.push("/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, processLogoutUser)
}

export default authSaga
