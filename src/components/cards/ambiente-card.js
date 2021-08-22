import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'react-native-swipeout';
import { withTheme } from 'react-native-paper';

const AmbienteCard = ({ ambiente, theme, onNavigate, onRemove }) => {
    let swipeButtons = [{
        underlayColor: theme.colors.background,
        backgroundColor: theme.colors.background,
        component: <IconDelete />,
        onPress: () => onRemove(ambiente)
    }];

    return (
        <Swipeout right={ swipeButtons } autoClose={ true }>
            <TouchableOpacity style={ styles.card } onPress={ onNavigate }>
                <Text style={ styles.text }>{ ambiente.nome }</Text>
                <Text style={ styles.text }>{ ambiente.lotacao }</Text>
            </TouchableOpacity>
        </Swipeout>
    );
}

const IconDelete = () => (
    <View style={ styles.action }>
        <AwesomeIcon name="trash" color="white" size={ 40 }/>
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

export default withTheme(AmbienteCard);