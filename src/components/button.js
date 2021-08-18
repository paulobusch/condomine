import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as ButtonPaper } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

type ButtonProps = React.ComponentProps<typeof ButtonPaper>;

const Button = (props: ButtonProps) => {
    const { colors } = useTheme();
    return (
        <ButtonPaper { ...props } 
            color="white"
            style={ [
                styles.button,
                { backgroundColor: props.outlined 
                    ? colors.background
                    : colors.primary 
                },
                props.outlined ? styles.outlined : null
            ] }
            contentStyle={ styles.content }
        >        
            { props.label }
        </ButtonPaper>
    );
}

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 30,
        marginVertical: 15
    },
    content: {
        padding: 8
    },
    outlined: {
        borderColor: 'white',
        borderWidth: 2,
        elevation: 3
    }
});

export default Button;