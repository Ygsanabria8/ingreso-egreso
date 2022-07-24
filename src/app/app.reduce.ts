import { ActionReducerMap, createReducer, on } from "@ngrx/store";
import * as ui from "./core/store/reducers/ui.reducers";
import * as auth from "./core/store/reducers/auth.reducers";

export interface AppState {
    ui: ui.State;
    auth: auth.State;
}

export const AppReducer: ActionReducerMap<AppState> = {
    ui: ui.uiReducer,
    auth: auth.authReducer,
};