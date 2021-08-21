import { USER_LOGIN, USER_LOGOUT } from './user-actions-type';
import { ReducerBase } from "../../common/reducers/reducer";

class UserReducer extends ReducerBase { 
    constructor() {
        super(null);
    }

    execute(_, action) { 
        switch(action.type) {
            case USER_LOGIN:
                return action.user;
            case USER_LOGOUT:
            default:
                return this.initialState;
        }
    }
}

const reducerInstance = new UserReducer();
export default reducerInstance.execute;
