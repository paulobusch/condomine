import firebaseApp from '../../firebase';
import { FormActionsBase } from "../../common/reducers/form-actions";
import { USUARIO_LOGIN, USUARIO_LOGOUT } from '../user/user-actions-type';
import { USUARIO_MORADOR } from '../user/user-type';

class LoginFormActions extends FormActionsBase { 
    constructor() {
        super('create-user-form');
        this.collection = firebaseApp.firestore().collection('Usuarios');
    }

    cadastrarAsync = data => async dispatch => {
        const { nomeCompleto, apartamento, email, senha } = data;
        const { user } = await firebaseApp.auth().createUserWithEmailAndPassword(email, senha);
        const usuario = { uid: user.uid, tipo: USUARIO_MORADOR, nomeCompleto, apartamento, email };
        await this.collection.add(usuario);

        dispatch({ type: USUARIO_LOGIN, user: usuario });
        dispatch(this.resetForm());
    }
}

export const { cadastrarAsync } = new LoginFormActions();