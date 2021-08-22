import firebaseApp from '../../firebase';
import { ActionsBase } from '../../common/reducers/actions';
import { SET_RESERVA } from './reserva-actions-type';

class ReservaActions extends ActionsBase { 
    constructor() {
        super();
        this.collection = firebaseApp.database().ref('/Usuarios');
    }

    escutarReservasAsync = () => async dispatch => {
        // TODO: Remove this code
        await firebaseApp.auth().signInWithEmailAndPassword('paulo202015@outlook.com.br', '12345678');

        const { currentUser } = firebaseApp.auth();
        await this.collection
            .child(currentUser.uid)
            .child('Reservas')
            .on('value', snapshot => {
                const reservas = snapshot.val() || { };
                dispatch({ 
                    type: SET_RESERVA, 
                    reservas: Object.keys(reservas)
                        .sort((a, b) => b.localeCompare(a))
                        .map(key => ({ ...reservas[key], id: key })) 
                });
            });
    }

    salvarAsync = reserva => async dispatch => {
        // TODO: Remove this code
        await firebaseApp.auth().signInWithEmailAndPassword('paulo202015@outlook.com.br', '12345678');

        const { currentUser } = firebaseApp.auth();
        const collection = this.collection
            .child(currentUser.uid)
            .child('Reservas');

        if (reserva.id) {
            await collection.child(reserva.id)
                .set(reserva);
        } else {
            await collection.push(reserva);
        }
    }

    cancelarAsync = ({ id }) => async () => {
        const { currentUser } = firebaseApp.auth();
        await this.collection
            .child(currentUser.uid)
            .child('Reservas')
            .child(id)
            .remove();
    }
}

export const { escutarReservasAsync, salvarAsync, cancelarAsync } = new ReservaActions();