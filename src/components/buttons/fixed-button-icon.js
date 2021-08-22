import React from 'react';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { withTheme } from 'react-native-paper';

const FixedButtonIcon = ({ icon, theme, onPress }) => {
    const { colors } = theme;
    return (
        <TouchableOpacity onPress={ onPress } style={ [styles.button, { backgroundColor: colors.accent }] } >
            <AwesomeIcon name={ icon } style={ styles.icon }/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 35,
        left: '50%',
        padding: 25,
        zIndex: 10,
        borderRadius: 50,
        elevation: 5,
        transform: [{ translateX: -30 }]
    },
    icon: {
        fontSize: 20
    }
});

export default withTheme(FixedButtonIcon);
