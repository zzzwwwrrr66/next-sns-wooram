import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// actions 
import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL
} from '../store/userReducer';

function logInAPI(data) {
  return axios.post('/api/login', data);
}

function* logIn(action) {
  try {
    // const result = yield call(logInAPI);
    yield delay(1000);
    yield put({
      type: LOGIN_SUCCESS,
      payload: action.payload,
    });
  } catch (err) {
    console.log('saga TEST_err');
    yield put({
      type: LOGIN_FAIL,
      error: err.response.data,
    });
  }
}
function* logout(action) {
  try {
    // const result = yield call(logInAPI);
    yield delay(1000);
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (err) {
    console.log('saga TEST_err');
    yield put({
      type: LOGOUT_FAIL,
      error: err.response.data,
    });
  }
}


function* watchLogIn() {
  yield takeLatest(LOGIN_REQUEST, logIn);
}
function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}


export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogout),
  ]);
}