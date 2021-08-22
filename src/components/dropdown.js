import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

type SelectDropdownProps = React.ComponentProps<typeof SelectDropdown>;

const Dropdown = (props: SelectDropdownProps) => {
    const hasError = !!props.error;
    return (
        <View style={ [styles.container, props.style] }>
            <SelectDropdown { ...props }   
                defaultValue={ props.value }
                buttonStyle={ styles.select }
                buttonTextStyle={ styles.buttonText }
                dropdownIconPosition='left'
                renderDropdownIcon={ props.left ? () => <View style={ styles.icon }>{ props.left }</View> : undefined }
                defaultButtonText={ props.label }
            />
            { hasError && <Text style={ styles.error }>{ props.error }</Text> }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        marginHorizontal: 30,
        minHeight: 60
    },
    select: {
        flex: 1,
        minHeight: 60,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: 'white',
        marginBottom: 1
    },
    buttonText: {
        flexGrow: 1,
        paddingVertical: 15,
        textAlign: 'left'
    },
    error: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        fontSize: 10, 
        color: 'red'
    },
    icon: {
        flex: 1,
        flexGrow: 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    }
});

export default Dropdown;