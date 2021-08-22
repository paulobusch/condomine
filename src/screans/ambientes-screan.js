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

import { escutarAmbientesAsync, removerAsync } from '../reducers/ambiente/ambiente-actions';

class Ambientescrean extends Component {
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
        this.props.escutarAmbientesAsync();
    }
    
    render() {
        const { navigation } = this.props;
        return (
            <Screan>
                <HeaderTitle title="Ambientes"/>
                { this.renderList() }
                <MenuBar navigation={ navigation } habilitarCadastro="true" itemAtivo="Ambientes"/>
                <FixedButtonIcon icon="plus" onPress={ () => navigation.navigate('AmbienteForm') }/>
                { this.snackbar() }
                { this.alert() }
            </Screan>
        );
    }

    renderList() {
        const { ambientes, navigation } = this.props;
        const listHeight = getListHeight();
        if (ambientes === null) return <ActivityIndicator containerHeight={ listHeight }/>;

        return (
            <FlatList 
                data={ ambientes }
                style={ { maxHeight: listHeight } }
                ListEmptyComponent={ <Message text="Nenhum Ambiente Cadastrado"/> }
                renderItem={ ({ item }) => 
                    <AmbienteCard ambiente={ item } 
                        onNavigate={ () => navigation.navigate('AmbienteForm', { ambiente: item }) }
                        onRemove={ ambiente => this.confirmRemove(ambiente) }
                    /> 
                }
                keyExtractor={ item => item.id }
            />
        );
    }

    confirmRemove(ambiente) {
        this.openAlert('Deseja Remover o Ambiente?', () => this.removerAsync(ambiente));
    }

    async removerAsync(ambiente) {
        try {
            await this.props.removerAsync(ambiente);
        } catch {
            this.openSnackbar('Falha ao Remover Ambiente');
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

const mapStateToProps = state => ({ ambientes: state.ambientes });
export default connect(mapStateToProps, { escutarAmbientesAsync, removerAsync })(Ambientescrean);