import React from 'react';
import { Button, Paragraph, Dialog } from 'react-native-paper';

const Alert = props => {
    const actions = props.actions || [{ text: 'Fechar', onPress: props.onClose }];
    return (
        <Dialog visible={ props.visible } onDismiss={ props.onClose }>
            <Dialog.Title>{ props.title }</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>{ props.children }</Paragraph>
                </Dialog.Content>
                { actions.map(a => 
                    <Dialog.Actions>
                        <Button onPress={ a.onPress }>{ a.text }</Button>
                    </Dialog.Actions>
                ) }
        </Dialog>
    );
}