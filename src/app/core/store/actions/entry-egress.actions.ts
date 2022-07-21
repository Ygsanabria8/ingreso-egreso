import { createAction, props } from "@ngrx/store";
import { EntryEgrees } from "../../models/entry-egress.model";

export const setItems = createAction(
    '[Entry-Egress] Set Items',
    props<{items: EntryEgrees[]}>()
    )
export const unsetItems = createAction('[Entry-Egress] Unset Items')