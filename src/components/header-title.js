import React from 'react';
import { StyleSheet, Text, View } from "react-native";

const HeaderTitle = props => (
    <View style={ styles.container }>
        <Text style={ styles.title }>{ props.title }</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 200
    },
    title: {
        color: 'white',
        fontSize: 30
    }
});

export default HeaderTitle;