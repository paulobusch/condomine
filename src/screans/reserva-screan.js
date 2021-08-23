import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { getListHeight } from '../common/helpers/window';

import ActivityIndicator from '../components/activity-indicator';
import FixedButtonIcon from '../components/buttons/fixed-button-icon';
import ReservaCard from '../components/cards/reserva-card';
import HeaderTitle from '../components/header';
import MenuBar from '../components/menu-bar/menu-bar';
import Message from '../components/message';
import Screan from '../components/screan';
import Alert from '../components/alert';

import { escutarReservasAsync, salvarAsync, cancelarAsync } from '../reducers/reserva/reserva-actions';
import { USUARIO_ADMINISTRADOR, USUARIO_MORADOR } from '../reducers/usuario/usuario-type';

class ReservaScrean extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            title: '',
            message: '',
            mostrarAlert: false,
            mostrarSnackbar: false,
            onConfirmAlert: () => {}
        };
    }

    componentDidMount() {
        this.props.escutarReservasAsync();
    }
    
    render() {
        const { navigation, usuario } = this.props;
        return (
            <Screan>
                <HeaderTitle title="Reservas"/>
                { this.renderList() }
                { usuario.tipo === USUARIO_ADMINISTRADOR && <MenuBar navigation={ navigation } itemAtivo="Reservas"/> }
                { usuario.tipo === USUARIO_MORADOR && <FixedButtonIcon icon="plus" onPress={ () => navigation.navigate('ReservaForm') }/> }
                { this.snackbar() }
                { this.alert() }
            </Screan>
        );
    }

    renderList() {
        const { reservas, usuario } = this.props;
        const listHeight = getListHeight();
        if (reservas === null) return <ActivityIndicator containerHeight={ listHeight }/>;

        return (
            <FlatList 
                data={ reservas }
                style={ { maxHeight: listHeight } }
                ListEmptyComponent={ <Message text="Nenhuma Reserva Cadastrada"/> }
                renderItem={ ({ item }) => 
                    <ReservaCard reserva={ item } 
                        mostrarUsuario={ usuario.tipo === USUARIO_ADMINISTRADOR }
                        canCancel={ usuario.tipo === USUARIO_MORADOR }
                        onCancel={ reserva => this.confirmCancel(reserva) }
                    /> 
                }
                keyExtractor={ item => item.id }
            />
        );
    }

    confirmCancel(reserva) {
        this.openAlert('Deseja confirmar o cancelamento da reserva?', () => this.cancelAsync(reserva));
    }

    async cancelAsync(reserva) {
        try {
            await this.props.cancelarAsync(reserva);
        } catch {
            this.openSnackbar('Falha ao cancelar reserva');
        }
        this.closeAlert();
    }

    openSnackbar(message) {
        this.setState({ message, mostrarSnackbar: true });
    }

    closeSnackbar() {
        this.setState({ message: '', mostrarSnackbar: false });
    }

    snackbar() {
        return (
            <Snackbar
                duration={ 5000 }
                visible={ this.state.mostrarSnackbar }
                onDismiss={ () => this.closeSnackbar() }
            >
                { this.state.message }    
            </Snackbar>
        );
    }

    openAlert(title, onConfirm) {
        this.setState({ title, onConfirmAlert: onConfirm, mostrarAlert: true });
    }

    closeAlert() {
        this.setState({ title: '', onConfirmAlert: () => {}, mostrarAlert: false });
    }

    alert() {
        return (
            <Alert
                message={ this.state.title }
                visible={ this.state.mostrarAlert }
                onDismiss={ () => this.closeAlert() }
                onConfirm={ () => this.state.onConfirmAlert() }
            />
        );
    }
}

const mapStateToProps = state => {
    let { usuario, reservas } = state;
    if (reservas && usuario.tipo !== USUARIO_ADMINISTRADOR)
        reservas = reservas.filter(r => r.usuario.uid === usuario.uid);

    return ({ usuario, reservas });
};
export default connect(mapStateToProps, { escutarReservasAsync, salvarAsync, cancelarAsync })(ReservaScrean);