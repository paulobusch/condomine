import { RESET_FORM, SET_DATA, SET_FIELD } from "../consts/form-action-types";
import { ActionsBase } from "./actions";

export class FormActionsBase extends ActionsBase { 
    constructor(formId) {
        super();
        this.formId = formId;
    }

    resetForm() {
        return { type: RESET_FORM };
    }

    setField(field, value) {
        return { type: SET_FIELD, field, value };
    }

    setData(data) {
        return { type: SET_DATA, data };
    }
}