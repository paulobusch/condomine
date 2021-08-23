import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'react-native-swipeout';
import { withTheme } from 'react-native-paper';

const ReservaCard = ({ reserva, theme, mostrarUsuario, canCancel, onCancel }) => {
    let swipeButtons = [{
        underlayColor: theme.colors.background,
        backgroundColor: theme.colors.background,
        component: <IconCancel />,
        onPress: () => onCancel(reserva)
    }];

    return (
        <Swipeout right={ canCancel ? swipeButtons : null } backgroundColor={ theme.colors.background } autoClose={ true }>
            <View style={ styles.card }>
                <Text style={ styles.text }>{ reserva.ambiente.nome }</Text>
                { mostrarUsuario && <Text style={ styles.text }>{ reserva.usuario.nomeCompleto }</Text> }
                <Text style={ styles.text }>{ reserva.data }</Text>
            </View>
        </Swipeout>
    );
}

const IconCancel = () => (
    <View style={ styles.action }>
        <AwesomeIcon name="ban" color="white" size={ 40 }/>
    </View>
);

const MARGIN = 3;
const styles = StyleSheet.create({
    card: {
        flex: 1,
        padding: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: MARGIN,
        backgroundColor: 'white'
    },
    text: {
        fontSize: 15
    },
    action: {
        flex: 1,
        marginVertical: MARGIN,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default withTheme(ReservaCard);