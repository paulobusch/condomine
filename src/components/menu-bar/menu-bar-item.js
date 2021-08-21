import React from 'react';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MenuBarItem = ({ icon, active, label, onPress }) => {
    return (
        <TouchableOpacity 
            onPress={ onPress } 
            style={ [styles.container, active ? styles.active : null] }
        >
            <AwesomeIcon 
                name={ icon }
                style={ styles.icon }
            />
            <Text style={ styles.label }>{ label }</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        alignItems: 'center',
        opacity: .8
    },
    active: {
        opacity: 1
    },
    icon: {
        color: 'white',
        fontSize: 20
    },
    label: {
        color: 'white'
    }
});

export default MenuBarItem; 
