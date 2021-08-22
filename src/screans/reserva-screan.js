import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { getListHeight } from '../common/helpers/window';

import ActivityIndicator from '../components/activity-indicator';
import FixedButtonIcon from '../components/buttons/fixed-button-icon';
import AmbienteCard from '../components/cards/ambiente-card';
import HeaderTitle from '../components/header';
import MenuBar from '../components/menu-bar/menu-bar';
import Message from '../components/message';
import Screan from '../components/screan';
import Alert from '../components/alert';

import { escutarReservasAsync, salvarAsync, cancelarAsync } from '../reducers/reserva/reserva-actions';

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
        const { navigation } = this.props;
        return (
            <Screan>
                <HeaderTitle title="Reservas"/>
                { this.renderList() }
                <MenuBar navigation={ navigation } habilitarCadastro="true" itemAtivo="Reservas"/>
                <FixedButtonIcon icon="plus" onPress={ () => navigation.navigate('ReservaForm') }/>
                { this.snackbar() }
                { this.alert() }
            </Screan>
        );
    }

    renderList() {
        const { reserva, navigation } = this.props;
        const listHeight = getListHeight();
        if (reserva === null) return <ActivityIndicator containerHeight={ listHeight }/>;

        return (
            <FlatList 
                data={ reserva }
                style={ { maxHeight: listHeight } }
                ListEmptyComponent={ <Message text="Nenhuma Reserva Cadastrada"/> }
                renderItem={ ({ item }) => 
                    <AmbienteCard ambiente={ item.ambiente } 
                        onNavigate={ () => navigation.navigate('ReservaForm', { reserva: item }) }
                        onRemove={ reserva => this.confirmRemove(reserva) }
                    /> 
                }
                keyExtractor={ item => item.id }
            />
        );
    }

    confirmRemove(reserva) {
        this.openAlert('Deseja Cancelar a Reserva?', () => this.removerAsync(reserva));
    }

    async removerAsync(reserva) {
        try {
            await this.props.removerAsync(reserva);
        } catch {
            this.openSnackbar('Falha ao Cancelar Reserva');
        }
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

const mapStateToProps = state => ({ reservas: state.reservas });
export default connect(mapStateToProps, { escutarReservasAsync, salvarAsync, cancelarAsync })(ReservaScrean);