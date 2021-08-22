import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from 'react-native-paper';

const HeaderTitle = props => {
    const { fonts } = useTheme();
    return (
        <View style={ styles.container }>
            <Text style={ [
                    styles.title,
                    { fontSize: fonts.big }
                ] }
            >
                { props.title }
            </Text>
        </View>
    );
}

export const HEADER_HEIGHT = 150;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: HEADER_HEIGHT,
        minHeight: HEADER_HEIGHT,
        maxHeight: HEADER_HEIGHT
    },
    title: {
        color: 'white'
    }
});

export default HeaderTitle;