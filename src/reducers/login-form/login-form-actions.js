import firebaseApp from '../../firebase';
import { FormActionsBase } from "../../common/reducers/form-actions";
import { USUARIO_LOGIN, USUARIO_LOGOUT } from '../user/user-actions-type';

class LoginFormActions extends FormActionsBase { 
    constructor() {
        super('login-form');
        this.collection = firebaseApp.firestore().collection('Usuarios');
    }

    loginAsync = ({ email, password }) => async dispatch => {
        const { user } = await firebaseApp.auth().signInWithEmailAndPassword(email, password);
        const usuario = await this.collection.where('uid', '==', user.uid).get();

        dispatch({ type: USUARIO_LOGIN, user: usuario });
        dispatch(this.resetForm());
    }
}

export const { setField, loginAsync } = new LoginFormActions();