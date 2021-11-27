import {
  SEARCH_RESOURCES_SUCCESS,
  SEARCH_RESOURCES_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  resources: [],
  error: {},
}

const resources = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SEARCH_RESOURCES_SUCCESS:
      return {
        ...state,
        resources: action.payload,
      }

    case SEARCH_RESOURCES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default resources 
