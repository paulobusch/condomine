import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'react-native-swipeout';
import { withTheme } from 'react-native-paper';

const ReservaCard = ({ reserva, theme, onNavigate, onCancel }) => {
    let swipeButtons = [{
        underlayColor: theme.colors.background,
        backgroundColor: theme.colors.background,
        component: <IconCancel />,
        onPress: () => onCancel(reserva)
    }];

    return (
        <Swipeout right={ swipeButtons } autoClose={ true }>
            <TouchableOpacity style={ styles.card } onPress={ onNavigate }>
                <Text style={ styles.text }>{ reserva.ambiente.nome }</Text>
                <Text style={ styles.text }>{ reserva.data }</Text>
            </TouchableOpacity>
        </Swipeout>
    );
}

const IconCancel = () => (
    <View style={ styles.action }>
        <AwesomeIcon name="ban" color="white" size={ 40 }/>
    </View>
);

const styles = StyleSheet.create({
    card: {
        flex: 1,
        padding: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 1,
        backgroundColor: 'white'
    },
    text: {
        fontSize: 15
    },
    action: {
        flex: 1,
        marginVertical: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default withTheme(ReservaCard);