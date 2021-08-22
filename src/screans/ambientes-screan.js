import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getListHeight } from '../common/helpers/window';

import ActivityIndicator from '../components/activity-indicator';
import FixedButtonIcon from '../components/buttons/fixed-button-icon';
import AmbienteCard from '../components/cards/ambiente-card';
import HeaderTitle from '../components/header';
import MenuBar from '../components/menu-bar/menu-bar';
import Message from '../components/message';
import Screan from '../components/screan';

import { escutarAmbientesAsync } from '../reducers/ambiente/ambiente-actions';

class Ambientescrean extends Component {
    constructor(props) {
        super(props);
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
                <FixedButtonIcon icon="plus" onPress={ () => navigation.navigate('CadastrarAmbiente') }/>
            </Screan>
        );
    }

    renderList() {
        const { ambientes } = this.props;
        const listHeight = getListHeight();
        if (ambientes === null) return <ActivityIndicator containerHeight={ listHeight }/>;

        return (
            <FlatList 
                data={ ambientes }
                style={ { maxHeight: listHeight } }
                ListEmptyComponent={ <Message text="Nenhum Ambiente Cadastrado"/> }
                renderItem={ ({ item }) => <AmbienteCard { ...item } /> }
                keyExtractor={ item => item.id }
            />
        );
    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: 'white'
    }
});

const mapStateToProps = state => ({ ambientes: state.ambientes });
export default connect(mapStateToProps, { escutarAmbientesAsync })(Ambientescrean);