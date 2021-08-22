import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AmbienteCard = ({ nome, lotacao, onPress }) => (
    <TouchableOpacity style={ styles.card } onPress={ onPress }>
        <Text style={ styles.text }>{ nome }</Text>
        <Text style={ styles.text }>{ lotacao }</Text>
    </TouchableOpacity>
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
    }
});

export default AmbienteCard;