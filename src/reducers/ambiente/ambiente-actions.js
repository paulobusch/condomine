import firebaseApp from '../../firebase';
import { ActionsBase } from '../../common/reducers/actions';
import { SET_AMBIENTES } from './ambiente-actions-type';

class AmbienteActions extends ActionsBase { 
    constructor() {
        super();
        this.collection = firebaseApp.database().ref('/Ambientes');
    }

    escutarAmbientesAsync = () => async dispatch => {
        await this.collection
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

    salvarAsync = ambiente => async () => {
        if (ambiente.id) {
            await this.collection.child(ambiente.id)
                .set(ambiente);
        } else {
            await this.collection.push(ambiente);
        }
    }

    removerAsync = ({ id }) => async () => {
        await this.collection
            .child(id)
            .remove();
    }
}

export const { escutarAmbientesAsync, salvarAsync, removerAsync } = new AmbienteActions();