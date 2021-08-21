import React from 'react';
import { ScrollView, View } from 'react-native';
import { withTheme } from 'react-native-paper';
import { Dimensions, StatusBar } from 'react-native'; 

const Screan = props => {
    const { colors } = props.theme;
    const { height } = Dimensions.get('window');
    const statusBarHeight = StatusBar.statusBarHeight || 24; 
    return (
        <ScrollView style={ props.style }>
            <View style={ [{ 
                backgroundColor: colors.background,
                minHeight: height - statusBarHeight
            }] }>
                { props.children }
            </View>
        </ScrollView>
    );
}

export default withTheme(Screan);