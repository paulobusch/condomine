import React, { Component } from 'react';
import { View } from 'react-native';

import FixedButtonIcon from '../components/buttons/fixed-button-icon';
import HeaderTitle from '../components/header';
import MenuBar from '../components/menu-bar/menu-bar';
import Screan from '../components/screan';

class Ambientescrean extends Component {
    render() {
        const { navigation } = this.props;

        return (
            <Screan>
                <HeaderTitle title="Ambientes"/>
                <View style={ { backgroundColor: 'red', flexGrow: 1 } }>

                </View>
                <MenuBar navigation={ navigation } habilitarCadastro="true" itemAtivo="Ambientes"/>
                <FixedButtonIcon icon="plus" onPress={ () => navigation.navigate('CadastrarAmbiente') }/> 
            </Screan>
        );
    }
}

export default Ambientescrean;