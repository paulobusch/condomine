import React from 'react';
import { StyleSheet, View } from 'react-native';
import { withTheme } from 'react-native-paper';

import MenuBarItem from './menu-bar-item';
import FixedButtonIcon from '../buttons/fixed-button-icon';

const MenuBar = ({ navigation, theme, itemAtivo }) => {
    const { colors } = theme;
    return (
        <View style={ [styles.container, { backgroundColor: colors.background }] }>
            <MenuBarItem 
                label="Ambientes"
                icon="building"
                active={ itemAtivo === 'Ambientes' }
                onPress={ () => navigation.navigate('Ambientes') }
            />
            <MenuBarItem 
                label="Reservas"
                icon="calendar"
                active={ itemAtivo === 'Reservas' }
                onPress={ () => navigation.navigate('Reservas') }
            />
        </View>
    );
} 

const styles = StyleSheet.create({
    container: {
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
});

export default withTheme(MenuBar);