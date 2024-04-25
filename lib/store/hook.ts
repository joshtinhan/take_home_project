import {
  useDispatch, useSelector, TypedUseSelectorHook,
} from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Define the typed selector hook
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useTypedSelector;
