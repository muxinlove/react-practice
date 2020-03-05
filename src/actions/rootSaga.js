import {
  // call,
  // put,
  takeEvery,
  select
} from 'redux-saga/effects'

export function* rootSaga() {
  yield takeEvery('*', workerSaga)
}

function* workerSaga(action) {
  const state = yield select();
  console.log('action', action);
  console.log('state', state);
}