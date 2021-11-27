import axios from "axios"
import accessToken from "./jwt-token-access/accessToken"

//pass new generated access token here
//apply base url for axios
const API_URL = "https://6e3oue93qi.execute-api.us-east-1.amazonaws.com/default"
const RESOURCES_URL = "https://sage.growmyownfood.com:5000/api"

const axiosApi = axios.create({
  baseURL: API_URL,
})
axios.defaults.headers.post['Content-Type'] ='application/json';

const resourcesApi = axios.create({
  baseURL: RESOURCES_URL,
})

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function getResources(config = {}) {
  console.log(config)
  return await resourcesApi.get("/resources", { ...config })
    .then(response => {
	 console.log(response);
	 return response.data
    })
}
export async function get(url, config = {}) {
  console.log (url + ":::::" + config)
  return await axiosApi.get(url, { ...config })
     .then(response => {
	     console.log(response);
	     return response.data
     })
}

export async function post(url, data, config = {}) {
  console.log(url + "::::" + data);
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {
  console.log(url + "::::" + config)
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  console.log(url);
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}
