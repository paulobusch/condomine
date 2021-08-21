import { FormReducerBase } from "../../common/reducers/form-reducer";

class LoginFormReducer extends FormReducerBase { 
    constructor() {
        super('login-form', { email: '', password: '' });
    }
}

const reducerInstance = new LoginFormReducer();
export default reducerInstance.execute;
