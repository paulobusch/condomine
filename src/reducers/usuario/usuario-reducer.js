import { USUARIO_LOGIN, USUARIO_LOGOUT } from './usuario-actions-type';
import { ReducerBase } from "../../common/reducers/reducer";

class UserReducer extends ReducerBase { 
    constructor() {
        super(null);
    }

    execute(state, action) { 
        switch(action.type) {
            case USUARIO_LOGIN:
                return action.usuario;
            case USUARIO_LOGOUT:
            default:
                return state || this.initialState;
        }
    }
}

const reducerInstance = new UserReducer();
export default reducerInstance.execute;
