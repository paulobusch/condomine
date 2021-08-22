import firebaseApp from '../../firebase';
import { ActionsBase } from '../../common/reducers/actions';
import { SET_AMBIENTES } from './ambiente-actions-type';

class AmbienteActions extends ActionsBase { 
    constructor() {
        super();
        this.collection = firebaseApp.database().ref('/Usuarios');
    }

    escutarAmbientesAsync = () => async dispatch => {
        // TODO: Remove this code
        await firebaseApp.auth().signInWithEmailAndPassword('paulo202015@outlook.com.br', '12345678');

        const { currentUser } = firebaseApp.auth();
        await this.collection
            .child(currentUser.uid)
            .child('Ambientes')
            .on('value', snapshot => {
                const ambientes = snapshot.val() || [];
                dispatch({ type: SET_AMBIENTES, ambientes });
            });
    }
}

export const { escutarAmbientesAsync } = new AmbienteActions();