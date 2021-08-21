import { SET_FIELD, SET_DATA, RESET_FORM } from '../consts/form-action-types';
import { ReducerBase } from './reducer';

export class FormReducerBase extends ReducerBase {
    constructor(formId, initialState) {
        super();
        this.formId = formId;
        this.initialState = initialState;
    }

    execute(state, action) {
        switch(action.type) {
            case SET_FIELD:
                return { ...state, [action.field]: action.value };
            case SET_DATA:
                return action.data;
            case RESET_FORM:
            default: 
                return this.initialState;
        }
    }
}