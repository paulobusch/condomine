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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        maxHeight: 150
    },
    title: {
        color: 'white'
    }
});

export default HeaderTitle;