import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';

type PickerSelectProps = React.ComponentProps<typeof RNPickerSelect>;

const PickerSelect = (props: PickerSelectProps) => {
    const hasError = !!props.error;
    return (
        <View style={ [styles.container, props.style] }>
            <View style={ styles.select }>
                { props.left }
                <RNPickerSelect { ...props } style={ styles.picker }
                    useNativeAndroidPickerStyle={ false }
                />
            </View>
            { hasError && <Text style={ styles.error }>{ props.error }</Text> }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        marginVertical: 15,
        marginHorizontal: 30,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: 'white'
    },
    select: {
        flex: 1,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    picker: {
        position: 'relative',
        paddingLeft: 100
    },
    icon: {

    },
    error: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        fontSize: 10, 
        color: 'red'
    }
});

export default PickerSelect;