import { createReducer, on } from "@ngrx/store";
import { User } from "../../models/user.model";
import * as authActions from "../actions/auth.actions";

export interface State {
    user: User | null;
}

export const initialState: State = {
    user: null,
};

export const authReducer = createReducer(
    initialState,
    on(authActions.setUser, (state:State, { user }) => ({...state, user: {...user}})),
    on(authActions.unsetUser, (state:State) => ({...state, user: null})),
)