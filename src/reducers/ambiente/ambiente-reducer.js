import { SET_AMBIENTES } from './ambiente-actions-type';
import { ReducerBase } from "../../common/reducers/reducer";

class AmbienteReducer extends ReducerBase { 
    constructor() {
        super(null);
    }

    execute(_, action) {
        switch(action.type) {
            case SET_AMBIENTES:
                return action.ambientes;
            default:
                return this.initialState;
        }
    }
}

const reducerInstance = new AmbienteReducer();
export default reducerInstance.execute;
