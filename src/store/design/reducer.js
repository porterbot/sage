import {
  GET_DESIGNS_SUCCESS,
  GET_DESIGNS_FAIL,
  ADD_DESIGN_SUCCESS,
  ADD_DESIGN_FAIL,
  UPDATE_DESIGN_SUCCESS,
  UPDATE_DESIGN_FAIL,
  DELETE_DESIGN_SUCCESS,
  DELETE_DESIGN_FAIL,
  GET_CLIMATE_DATA_SUCCESS,
  GET_CLIMATE_DATA_FAIL,
  PLANT_SEARCH_SUCCESS,
  PLANT_SEARCH_FAIL
} from "./actionTypes"

const INIT_STATE = {
  designs: [],
  temps: [],
  plants: [],
  error: {},
}

const Designer  = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DESIGNS_SUCCESS:
      return {
        ...state,
        designs: action.payload,
      }

    case GET_DESIGNS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case PLANT_SEARCH_SUCCESS:
      return {
	plants: [action.payload],
    }

    case PLANT_SEARCH_FAIL:
      return {
	...state,
	error: action.payload,
    }

    case ADD_DESIGN_SUCCESS:
      return {
        ...state,
        designs: [...state.designs, action.payload],
      }

    case ADD_DESIGN_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_DESIGN_SUCCESS:
      return {
        ...state,
        designs: state.designs.map(design =>
          design.id.toString() === action.payload.id.toString()
            ? { design, ...action.payload }
            : design
        ),
      }

    case UPDATE_DESIGN_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_DESIGN_SUCCESS:
      return {
        ...state,
        designs: state.designs.filter(
          design => design.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_DESIGN_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CLIMATE_DATA_SUCCESS:
      return {
        temps: action.payload,
      }

    case GET_CLIMATE_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default Designer 
