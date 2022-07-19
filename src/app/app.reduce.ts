import { ActionReducerMap, createReducer, on } from "@ngrx/store";
import * as ui from "./core/store/reducers/ui.reducers";

export interface AppState {
    ui: ui.State;
}

export const AppReducer: ActionReducerMap<AppState> = {
    ui: ui.uiReducer
};