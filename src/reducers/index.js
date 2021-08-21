import { combineReducers } from "redux";

import loginForm from './login-form/login-form-reducer';
import user from './user/user-reducer';

export default combineReducers({
    user,

    loginForm,
});