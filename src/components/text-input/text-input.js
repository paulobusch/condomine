import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput as TextInputPaper } from 'react-native-paper';

import { ActivityIndicator, Colors } from 'react-native-paper';

type TextInputProps = React.ComponentProps<typeof TextInputPaper>;

const TextInput = (props: TextInputProps) => {
    const hasError = !!props.error;
    return (
        <View style={ [styles.container, props.style] }>
            <TextInputPaper 
                { ...props } 
                error={ hasError }
                style={ styles.input }>
            </TextInputPaper>
            { hasError && <Text style={ styles.error }>{ props.error }</Text> }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        marginHorizontal: 30
    },
    input: {
        backgroundColor: 'white'
    },
    error: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        fontSize: 10, 
        color: 'red'
    }
});

export default TextInput;