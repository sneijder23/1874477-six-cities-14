import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { State, AppDispatch } from '../types-ts/store';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const useAppDispatch = useDispatch<AppDispatch>;
