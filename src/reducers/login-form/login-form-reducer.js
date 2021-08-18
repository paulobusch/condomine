import { bindAll } from "../../common/helpers/context";
import { FormReducerBase } from "../../common/reducers/form-reducer";

class LoginFormReducer extends FormReducerBase { 
    constructor() {
        super({ email: '', password: '' });
    }
}

const reducerInstance = new LoginFormReducer();
export default reducerInstance.execute;
