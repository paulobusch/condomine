import { USUARIO_LOGIN, USUARIO_LOGOUT } from './user-actions-type';
import { ReducerBase } from "../../common/reducers/reducer";

class UserReducer extends ReducerBase { 
    constructor() {
        super(null);
    }

    execute(_, action) { 
        switch(action.type) {
            case USUARIO_LOGIN:
                return action.user;
            case USUARIO_LOGOUT:
            default:
                return this.initialState;
        }
    }
}

const reducerInstance = new UserReducer();
export default reducerInstance.execute;
