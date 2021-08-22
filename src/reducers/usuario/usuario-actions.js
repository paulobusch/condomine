import firebaseApp from '../../firebase';
import { USUARIO_LOGIN } from '../usuario/usuario-actions-type';
import { USUARIO_MORADOR } from './usuario-type';
import { ActionsBase } from '../../common/reducers/actions';

class UserActions extends ActionsBase { 
    constructor() {
        super();
        this.collection = firebaseApp.database().ref('/Usuarios');
    }

    loginAsync = ({ email, senha }) => async dispatch => {
        const { user } = await firebaseApp.auth().signInWithEmailAndPassword(email, senha);
        const usuario = await this.collection.child(user.uid).once('value');

        dispatch({ type: USUARIO_LOGIN, usuario });
    }    
    
    cadastrarAsync = data => async dispatch => {
        const { nomeCompleto, apartamento, email, senha } = data;
        const { user } = await firebaseApp.auth().createUserWithEmailAndPassword(email, senha);
        const usuario = { uid: user.uid, tipo: USUARIO_MORADOR, nomeCompleto, apartamento, email };
        await this.collection.child(user.uid).set(usuario);

        dispatch({ type: USUARIO_LOGIN, usuario });
    }
}

export const { loginAsync, cadastrarAsync } = new UserActions();