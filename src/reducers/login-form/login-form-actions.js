import firebase from '@firebase/app';
import '@firebase/auth';

import { FormActionsBase } from "../../common/reducers/form-actions";
import { USER_LOGIN, USER_LOGOUT } from '../user/user-actions-type';

class LoginFormActions extends FormActionsBase { 
    constructor() {
        super('login-form');
    }

    loginAsync = ({ email, password }) => async dispatch => {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password);
        dispatch({ type: USER_LOGIN, user });
    }
}

export const { setField, loginAsync } = new LoginFormActions();