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

const FIXED_BUTTON_SIZE = 65;
const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 35,
        left: '50%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: FIXED_BUTTON_SIZE,
        height: FIXED_BUTTON_SIZE,
        zIndex: 15,
        borderRadius: FIXED_BUTTON_SIZE / 2,
        transform: [{ translateX: -FIXED_BUTTON_SIZE / 2 }]
    },
    icon: {
        fontSize: 18
    }
});

export default withTheme(FixedButtonIcon);
