import React from 'react';
import { ScrollView, View } from 'react-native';
import { withTheme } from 'react-native-paper';
import { getScreanHeight } from '../common/helpers/window';

const Screan = props => {
    const content = <Content { ...props }/>;
    if (!props.scroll) return content;
    return (
        <ScrollView style={ props.style }>
            { content }
        </ScrollView>
    );
}

const Content = props => {
    const { colors } = props.theme;
    const height = getScreanHeight(); 
    return (
        <View style={ [{ 
            backgroundColor: colors.background,
            minHeight: height
        }] }>
            { props.children }
        </View>
    );
}

export default withTheme(Screan);