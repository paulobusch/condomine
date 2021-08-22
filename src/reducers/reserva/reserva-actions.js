import firebaseApp from '../../firebase';
import { ActionsBase } from '../../common/reducers/actions';
import { SET_RESERVA } from './reserva-actions-type';

class ReservaActions extends ActionsBase { 
    constructor() {
        super();
        this.collection = firebaseApp.database().ref('/Reservas');
    }

    escutarReservasAsync = () => async dispatch => {
        await this.collection
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

    salvarAsync = reserva => async () => {
        if (reserva.id) {
            await this.collection.child(reserva.id)
                .set(reserva);
        } else {
            await this.collection.push(reserva);
        }
    }

    cancelarAsync = ({ id }) => async () => {
        await this.collection
            .child(id)
            .remove();
    }
}

export const { escutarReservasAsync, salvarAsync, cancelarAsync } = new ReservaActions();