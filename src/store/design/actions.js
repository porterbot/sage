import {
  GET_DESIGNS,
  GET_DESIGNS_FAIL,
  GET_DESIGNS_SUCCESS,
  ADD_DESIGN,
  ADD_DESIGN_SUCCESS,
  ADD_DESIGN_FAIL,
  UPDATE_DESIGN,
  UPDATE_DESIGN_SUCCESS,
  UPDATE_DESIGN_FAIL,
  DELETE_DESIGN,
  DELETE_DESIGN_SUCCESS,
  DELETE_DESIGN_FAIL,
  GET_CLIMATE_DATA,
  GET_CLIMATE_DATA_SUCCESS,
  GET_CLIMATE_DATA_FAIL,
  PLANT_SEARCH,
  PLANT_SEARCH_FAIL,
  PLANT_SEARCH_SUCCESS
} from "./actionTypes"

export const getDesigns = () => ({
  type: GET_DESIGNS,
})

export const getDesignsSuccess = designs => ({
  type: GET_DESIGNS_SUCCESS,
  payload: designs,
})

export const getDesignsFail = error => ({
  type: GET_DESIGNS_FAIL,
  payload: error,
})

export const plantSearch = search => {
    console.log("PLANT SEARCH" + search)
    return {
        type: PLANT_SEARCH,
        payload: search,
    }
}

export const plantSearchSuccess = plants => ({
    type: PLANT_SEARCH_SUCCESS,
    payload: plants,
})

export const plantSearchFail = error => ({
    type: PLANT_SEARCH_FAIL,
    payload: error,
})

export const addDesign = design => {
  return {
     type: ADD_DESIGN,
     payload: design,
  }
}

export const addDesignSuccess = design => ({
  type: ADD_DESIGN_SUCCESS,
  payload: design,
})

export const addDesignFail = error => ({
  type: ADD_DESIGN_FAIL,
  payload: error,
})

export const updateDesign = design => ({
  type: UPDATE_DESIGN,
  payload: design,
})

export const updateDesignSuccess = design => ({
  type: UPDATE_DESIGN_SUCCESS,
  payload: design,
})

export const updateDesignFail = error => ({
  type: UPDATE_DESIGN_FAIL,
  payload: error,
})

export const deleteDesign = designId => ({
  type: DELETE_DESIGN,
  payload: designId,
})

export const deleteDesignSuccess = designId => ({
  type: DELETE_DESIGN_SUCCESS,
  payload: designId,
})

export const deleteDesignFail = error => ({
  type: DELETE_DESIGN_FAIL,
  payload: error,
})

export const getClimateData = (zipcode) => ({
  type: GET_CLIMATE_DATA,
  payload: zipcode,
})

export const getClimateDataSuccess = temps  => ({
  type: GET_CLIMATE_DATA_SUCCESS,
  payload: temps,
})

export const getClimateDataFail = error => ({
  type: GET_CLIMATE_DATA_FAIL,
  payload: error,
})
