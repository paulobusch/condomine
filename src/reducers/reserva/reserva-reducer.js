import { SET_RESERVA } from './reserva-actions-type';
import { ReducerBase } from "../../common/reducers/reducer";

class ReservaReducer extends ReducerBase { 
    constructor() {
        super(null);
    }

    execute(state, action) {
        switch(action.type) {
            case SET_RESERVA:
                return action.reservas;
            default:
                return state || this.initialState;
        }
    }
}

const reducerInstance = new ReservaReducer();
export default reducerInstance.execute;
