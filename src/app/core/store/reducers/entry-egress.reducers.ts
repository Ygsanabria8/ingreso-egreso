import { createReducer, on } from "@ngrx/store";
import { EntryEgrees } from "../../models/entry-egress.model";
import * as entryEgress from "../actions/entry-egress.actions";

export interface State {
    items: EntryEgrees[];
}

export const initialState: State = {
    items: [],
};

export const entryEgressReducer = createReducer(
    initialState,
    on(entryEgress.setItems, (state:State, {items}) => ({...state, items: [...items]})),
    on(entryEgress.unsetItems, (state:State) => ({...state, items: []})),
)