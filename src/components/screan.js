import React from 'react';
import { View } from 'react-native';
import { withTheme } from 'react-native-paper';
import { Dimensions } from 'react-native';

const Screan = props => {
    const { colors } = props.theme;
    const { height } = Dimensions.get('window');
    return (
        <View style={ [{ 
            backgroundColor: colors.background,
            minHeight: height
         }, props.style] }>
            { props.children }
        </View>
    );
}

export default withTheme(Screan);