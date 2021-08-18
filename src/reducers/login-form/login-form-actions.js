import { bindAll } from "../../common/helpers/context";
import { FormActionsBase } from "../../common/reducers/form-actions";

class LoginFormActions extends FormActionsBase { 
    constructor() {
        super('login-form');
    }
}

export const { setField } = new LoginFormActions();