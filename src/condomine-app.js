import React from 'react';
import { View } from 'react-native';
import { withTheme } from 'react-native-paper';
import { Dimensions } from 'react-native';

import LoginScrean from './screans/login';

const CondomineApp = props => {
    const { colors } = props.theme;
    const { height } = Dimensions.get('window');
    return (
        <View style={ { 
            backgroundColor: colors.background,
            minHeight: height
        } }>
            <LoginScrean />
        </View>
    );
}

export default withTheme(CondomineApp);