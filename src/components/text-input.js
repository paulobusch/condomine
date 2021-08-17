import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput as TextInputPaper } from 'react-native-paper';

type TextInputProps = React.ComponentProps<typeof TextInputPaper>;

export const TextInputIcon = TextInputPaper.Icon;
export const TextInput = (props: TextInputProps) => (
    <TextInput { ...props } style={ [styles.input, props.style] }/>
);

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        marginVertical: 15,
        marginHorizontal: 30
    }
});
