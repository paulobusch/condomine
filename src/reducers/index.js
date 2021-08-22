import { combineReducers } from "redux";

import usuario from './usuario/usuario-reducer';
import ambientes from './ambiente/ambiente-reducer';

export default combineReducers({
    usuario,
    ambientes
});