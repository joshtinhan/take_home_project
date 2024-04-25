import axios, { AxiosResponse } from 'axios';
import { put, all, takeLatest } from 'redux-saga/effects';
import { setUserList, AppState, getUserList } from '../slices/appSlice';

export interface IRandomName {
  name: {
    first: string;
    last: string;
  };
  picture: {
    thumbnail: string;
    medium: string;
    large: string;
  }
}

export function* getUserListFunc () {
  try {
    const response: AxiosResponse<{ results: AppState['userList'] }> = yield axios.get('https://randomuser.me/api/?results=25');
    yield put(setUserList(response.data.results));
  } catch (error) {
    console.error('Error fetching user list:', error);
  }
}

export function* watchGetUserList () {
  yield takeLatest(getUserList.type, getUserListFunc);
}

export default function* rootSaga () {
  yield all([
    watchGetUserList()]);
}
