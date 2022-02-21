import { all, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import axios from 'axios';
import shortId from 'shortid';


// actions 
import { 
  ADD_POST_REQUEST,ADD_POST_SUCCESS,ADD_POST_FAIL,
  DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAIL,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAIL,
  LOAD_FAKER_ADD_POST_SUCCESS, LOAD_FAKER_ADD_POST_REQUEST, LOAD_FAKER_ADD_POST_FAIL, generateDummyPost
} from '../store/postReducer';
import {
  ADD_POST_TO_ME, DELETE_POST_TO_ME
} from '../store/userReducer';

function addPostAPI(data) {
  return axios.post('/api/login', data);
}
function* addPost(action) {
  try {
    console.log('saga ADD_POST_SUCCESS', action.payload);
    const id = shortId.generate();
    const payload = {
      conetentId: id,
      ...action.payload
    }
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      payload: payload,
    });
    yield put({
      type: ADD_POST_TO_ME,
      payload: id,
    });
  } catch (err) {
    console.log('saga ADD_POST_FAIL ERROR');
    yield put({
      type: ADD_POST_FAIL,
      error: err.response.data,
    });
  }
}
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* deletePost(action) {
  console.log('saga deletePost', action.payload);
  try {
    yield delay(1000);
    yield put({
      type: DELETE_POST_SUCCESS,
      payload: action.payload,
    });
    yield put({
      type: DELETE_POST_TO_ME,
      payload: action.payload,
    });
  } catch(err) {
    yield put({
      type: DELETE_POST_FAIL,
      error: err.response.data,
    });
  }
}

function* watchDeletePost() {
  yield takeLatest(DELETE_POST_REQUEST, deletePost);
}

function addCommentAPI(data) {
  return axios.post('/api/login', data);
}
function* addComment(action) {
  try {
    yield delay(1000);
    console.log('saga ADD_COMMENT_SUCCESS', action.payload);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      payload: action.payload,
    });
  } catch (err) {
    console.log('saga ADD_COMMENT_FAIL ERROR');
    yield put({
      type: ADD_COMMENT_FAIL,
      error: err.response.data,
    });
  }
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function fakerAddPostAPI(data) {
  return axios.post('/api/login', data);
}
function* fakerAddPost(action) {
  try {
    yield delay(1000);
    yield put({
      type: LOAD_FAKER_ADD_POST_SUCCESS,
      payload : generateDummyPost(10),
    });
  } catch (err) {
    console.log('saga ADD_COMMENT_FAIL ERROR');
    yield put({
      type: LOAD_FAKER_ADD_POST_FAIL,
      error: err.response.data,
    });
  }
}
function* watchFakerAddPost() {
  yield throttle(5000, LOAD_FAKER_ADD_POST_REQUEST, fakerAddPost);
}

export default function* userSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchDeletePost),
    fork(watchAddComment),
    fork(watchFakerAddPost),
  ]);
}