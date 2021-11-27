import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { SEARCH_RESOURCES } from "./actionTypes"
import {
  searchResourcesSuccess,
  searchResourcesFail,
} from "./actions"

//Include Both Helper File with needed methods
import { searchResources } from "helpers/fakebackend_helper"

function* findResources({ payload: search }) {
  try {
    console.log(search)
    const response = yield call(searchResources, search)
    yield put(searchResourcesSuccess(response))
  } catch (error) {
    yield put(searchResourcesFail(error))
  }
}

function* resourcesSaga() {
  yield takeEvery(SEARCH_RESOURCES, findResources)
}

export default resourcesSaga
