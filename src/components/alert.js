import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

const Alert = ({ title, message, visible, onDismiss, onConfirm, actions }) => {
    const actionsUse = actions || [
        { text: 'FECHAR', onPress: () => onDismiss(), color: '#818181' },
        { text: 'CONFIRMAR', onPress: () => onConfirm(), color: 'red' }
    ];
    return (
        <Portal>
            <Dialog visible={ visible } onDismiss={ onDismiss }>
                { !!title && <Dialog.Title>{ title }</Dialog.Title> }
                { !!message && (
                        <Dialog.Content>
                            <Paragraph>{ message }</Paragraph>
                        </Dialog.Content>
                    )
                }
                <Dialog.Actions>
                    { actionsUse.map((a, index) => 
                        <Button key={ index } onPress={ a.onPress } color={ a.color }>{ a.text }</Button>
                    ) }
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

export default Alert;