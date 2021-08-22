import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Message = ({ text }) => (
    <View style={ styles.container }>
        <AwesomeIcon style={ styles.icon } name="comments"/>
        <Text style={ styles.text }>{ text }</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        opacity: .8,
        flex: 1,
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        color: 'white'
    },
    icon: {
        fontSize: 40,
        color: 'white'
    }
});

export default Message;