import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput as TextInputPaper } from 'react-native-paper';

type TextInputProps = React.ComponentProps<typeof TextInputPaper>;

const TextInput = (props: TextInputProps) => (
    <TextInputPaper { ...props } style={ [styles.input, props.style] }/>
);

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        marginVertical: 15,
        marginHorizontal: 30
    }
});

export default TextInput;