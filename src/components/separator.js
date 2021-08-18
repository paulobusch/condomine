import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from 'react-native-paper';

const Separator = props => {
    const { colors, fonts } = useTheme();
    return (
        <View style={ styles.container }>
            <Text 
                style={ [
                    styles.text, 
                    { 
                        backgroundColor: colors.background,
                        fontSize: fonts.medium 
                    }
                ] } 
            >
                { props.label }
            </Text>
            <View style={ styles.line }></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        marginHorizontal: 30
    },
    text: {
        zIndex: 2,
        marginBottom: 1,
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: 15
    },
    line: {
        zIndex: 1,
        height: 2,
        width: '100%',
        position: 'absolute',
        backgroundColor: 'white'
    }
});

export default Separator;