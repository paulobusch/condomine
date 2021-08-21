import { FormReducerBase } from "../../common/reducers/form-reducer";

class CreateUserFormReducer extends FormReducerBase { 
    constructor() {
        super('create-user-form', { email: '', password: '' });
    }
}

const reducerInstance = new CreateUserFormReducer();
export default reducerInstance.execute;
