import { combineReducers } from "redux";

import usuario from './usuario/usuario-reducer';
import ambientes from './ambiente/ambiente-reducer';
import reservas from './reserva/reserva-reducer';

export default combineReducers({
    usuario,
    ambientes,
    reservas
});