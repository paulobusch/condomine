import { SET_FIELD, SET_DATA, RESET_FORM } from '../consts/form-action-types';
import { ReducerBase } from './reducer';

export class FormReducerBase extends ReducerBase {
    constructor(initialState) {
        super();
        this.initialState = initialState;
    }

    execute(state, action) {
        switch(action.type) {
            case SET_FIELD:
                return { ...state, [action.field]: action.value };
            case SET_DATA:
                return action.data;
            case RESET_FORM:
                return this.initialState;
            default: 
                return this.initialState;
        }
    }
}