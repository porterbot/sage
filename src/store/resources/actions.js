import {
  SEARCH_RESOURCES,
  SEARCH_RESOURCES_SUCCESS,
  SEARCH_RESOURCES_FAIL
} from "./actionTypes"

export const searchResources = search => ({
  type: SEARCH_RESOURCES,
  payload: search
})

export const searchResourcesSuccess = resources => ({
  type: SEARCH_RESOURCES_SUCCESS,
  payload: resources,
})

export const searchResourcesFail = error => ({
  type: SEARCH_RESOURCES_FAIL,
  payload: error,
})

