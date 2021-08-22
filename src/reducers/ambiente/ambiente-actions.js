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
                const ambientes = snapshot.val() || { };
                dispatch({ 
                    type: SET_AMBIENTES, 
                    ambientes: Object.keys(ambientes)
                        .sort((a, b) => b.localeCompare(a))
                        .map(key => ({ ...ambientes[key], id: key })) 
                });
            });
    }

    salvarAsync = ambiente => async dispatch => {
        // TODO: Remove this code
        await firebaseApp.auth().signInWithEmailAndPassword('paulo202015@outlook.com.br', '12345678');

        const { currentUser } = firebaseApp.auth();
        const collection = this.collection
            .child(currentUser.uid)
            .child('Ambientes');

        if (ambiente.id) {
            await collection.child(ambiente.id)
                .set(ambiente);
        } else {
            await collection.push(ambiente);
        }
    }

    removerAsync = ({ id }) => async () => {
        const { currentUser } = firebaseApp.auth();
        await this.collection
            .child(currentUser.uid)
            .child('Ambientes')
            .child(id)
            .remove();
    }
}

export const { escutarAmbientesAsync, salvarAsync, removerAsync } = new AmbienteActions();