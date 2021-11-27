import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import calendarSaga from "./calendar/saga"
import chatSaga from "./chat/saga"
import cryptoSaga from "./crypto/saga"
import invoiceSaga from "./invoices/saga"
import journalSaga from "./journal/saga"
import tasksSaga from "./tasks/saga"
import contactsSaga from "./contacts/saga"
import resourcesSaga from "./resources/saga"
import designerSaga from "./design/saga"

export default function* rootSaga() {
  yield all([
    //public
    AccountSaga(),
    fork(AuthSaga),
    ProfileSaga(),
    ForgetSaga(),
    LayoutSaga(),
    fork(calendarSaga),
    fork(chatSaga),
    fork(cryptoSaga),
    fork(invoiceSaga),
    fork(journalSaga),
    fork(designerSaga),
    fork(tasksSaga), 
    fork(resourcesSaga),
    fork(contactsSaga),
  ])
}
