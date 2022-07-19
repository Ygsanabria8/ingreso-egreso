import { createReducer, on } from "@ngrx/store";
import * as uiActions from "../actions/ui.actions";

export interface State {
    isLoading: boolean;
}

export const initialState: State = {
    isLoading: false,
};

export const uiReducer = createReducer(
    initialState,
    on(uiActions.isLoading, (state:State) => ({...state, isLoading: true})),
    on(uiActions.stopLoading, (state:State) => ({...state, isLoading: false})),
)