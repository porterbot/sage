import { takeEvery, put, call } from "redux-saga/effects"

// Calender Redux States
import {
  ADD_DESIGN,
  DELETE_DESIGN,
  GET_CLIMATE_DATA,
  GET_DESIGNS,
  UPDATE_DESIGN,
  PLANT_SEARCH,
} from "./actionTypes"
import {
  getDesignsSuccess,
  getDesignsFail,
  addDesignFail,
  addDesignSuccess,
  updateDesignSuccess,
  updateDesignFail,
  deleteDesignSuccess,
  deleteDesignFail,
  getClimateDataSuccess,
  getClimateDataFail,
  plantSearchSuccess,
  plantSearchFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getDesigns,
  getLoggedInUser,
  addDesign,
  updateDesign,
  deleteDesign,
  getClimateData,
  searchPlants, 
} from "../../helpers/fakebackend_helper"

function* fetchDesigns() {
  try {
    console.log("ASDFAGDFSDGF")
    const user = getLoggedInUser()
    const response = yield call(getDesigns, user)
    yield put(getDesignsSuccess(response))
  } catch (error) {
    yield put(getDesignsFail(error))
  }
}

function* onPlantSearch({ payload: search}) {
  try {
     console.log("PLANT SEARCH")
     const response = yield call(searchPlants, search)
     yield put(plantSearchSuccess(response))
  } catch (error) { 
     yield put(plantSearchFail(error))
  }
}

function* onAddDesign({ payload: design }) {
  try {
    console.log("ADD DESIGN" + design);
    const response = yield call(addDesign, design)
    yield put(addDesignSuccess(design))
  } catch (error) {
    yield put(addDesignFail(error))
  }
}

function* onUpdateDesign({ payload: design }) {
  try {
    const response = yield call(updateDesign, design)
    yield put(updateDesignSuccess(response))
  } catch (error) {
    yield put(updateDesignFail(error))
  }
}

function* onDeleteDesign({ payload: designId }) {
  try {
    const response = yield call(deleteDesign, designId)
    yield put(deleteDesignSuccess(designId))
  } catch (error) {
    yield put(deleteDesignFail(error))
  }
}

function* onGetClimateData({payload : zipcode }) {
  try {
    const response = yield call(getClimateData, zipcode)
    yield put(getClimateDataSuccess(response))
  } catch (error) {
    yield put(getClimateDataFail(error))
  }
}

function* designerSaga() {
  yield takeEvery(GET_DESIGNS, fetchDesigns)
  yield takeEvery(ADD_DESIGN, onAddDesign)
  yield takeEvery(UPDATE_DESIGN, onUpdateDesign)
  yield takeEvery(DELETE_DESIGN, onDeleteDesign)
  yield takeEvery(GET_CLIMATE_DATA, onGetClimateData)
  yield takeEvery(PLANT_SEARCH, onPlantSearch)
}

export default designerSaga
