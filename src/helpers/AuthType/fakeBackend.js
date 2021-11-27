import axios from "axios"
import * as url from "../url_helper"
import accessToken from "../jwt-token-access/accessToken"
import {
  calenderDefaultCategories,
  cartData,
  chats,
  comments,
  contacts,
  cryptoOrders,
  customerData,
  events,
  groups,
  invoiceList,
  messages,
  orders,
  productsData,
  recentProducts,
  shops,
  tasks,
  userProfile,
  users as members,
  wallet,
} from "../../common/data"

let users = [
  {
    uid: 1,
    username: "admin",
    role: "admin",
    password: "123456",
    email: "admin@themesbrand.com",
  },
]

const fakeBackend = () => {

}

export default fakeBackend
