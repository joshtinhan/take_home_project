import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRandomName } from '../sagas/rootSaga';

export type AppState = {
  countdown: number;
  userList: IRandomName[];
  isShowModal: boolean;
  drawResult: number | null;
};

export const initialState: AppState = {
  countdown: 0,
  userList: [],
  isShowModal: false,
  drawResult: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCountdown (state: AppState, action: PayloadAction<AppState>) {
      const { countdown } = action.payload;
      state.countdown = countdown;
    },
    getUserList () { },
    setUserList (state: AppState, action: PayloadAction<AppState['userList']>) {
      state.userList = action.payload;
    },
    setIsShowModal (state: AppState, action: PayloadAction<boolean>) {
      state.isShowModal = action.payload;
    },
    setDrawResult (state: AppState, action: PayloadAction<number>) {
      state.drawResult = action.payload;
    },
  },
});

export const { setCountdown, setUserList, getUserList, setIsShowModal, setDrawResult } = appSlice.actions;

export default appSlice.reducer;
