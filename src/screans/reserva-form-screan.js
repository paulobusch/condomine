import React, { Component } from 'react';
import { NativeModules, SafeAreaView, View } from 'react-native';
import { Snackbar, Surface } from 'react-native-paper';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInputMask } from 'react-native-masked-text';
import RNPickerSelect from 'react-native-picker-select';

import Screan from '../components/screan';
import HeaderTitle from '../components/header';
import Button from "../components/buttons/button";
import TextInput from "../components/text-input/text-input";
import TextInputIcon from "../components/text-input/text-input-icon";
import PickerSelect from "../components/select";

import { salvarAsync } from '../reducers/reserva/reserva-actions';

class ReservaFormScrean extends Component {
    constructor(props) {
        super(props);

        this.dateFormat = 'DD/MM/YYYY';
        this.state = { 
            loading: false,
            mostrarErros: false,
            mostrarDatePicker: false,
            mostrarSnackbar: false,
            message: ''
        };
        this.initialValues = {
            data: '',
            ambiente: null
        };
        this.validatorSchema = yup.object()
            .shape({
                data: yup
                    .string()
                    .required('O campo é obrigatório'),
                ambiente: yup
                    .object()
                    .required('O campo é obrigatório')
            });
    }

    render() {
        return (
            <Screan scroll>
                <HeaderTitle title="Nova Reserva"/>
                <Formik
                    validationSchema={ this.validatorSchema }
                    initialValues={ this.initialValues }
                    
                    validateOnChange={ this.state.mostrarErros }
                    validateOnBlur={ this.state.mostrarErros }

                    onSubmit={ (values, props) => this.salvarAsync(values, props) }
                >
                    { (props) => this.fields(props) }
                </Formik>
            </Screan>
        );
    }
    
    fields(props) {
        const { navigation } = this.props;
        const { handleChange, handleBlur, handleSubmit, values, errors } = props;
        return (
            <>
                <TextInput 
                    label="Data (Dia/Mês/Ano)"
                    
                    keyboardType='numeric'
                    value={ values.data }
                    error={ errors.data }
                    onChangeText={ handleChange('data') }
                    onBlur={ handleBlur('data') }

                    render={ props =>
                        <TextInputMask
                            onFocus={ props.onFocus }
                            style={ props.style }
                            onChange={ props.onChange }
                            onChangeText={ props.onChangeText }
                            onBlur={ props.onBlur }
                            value={ props.value }
                            type="datetime"
                            options={ { format: this.dateFormat } }
                        />
                    }
                    left={ <TextInputIcon name="calendar" onPress={ () => this.openDatePicker() }/> }
                />
                { this.datePicker({ handleChange, values }) }
                <PickerSelect
                    placeholder={ { label: "Selecione um Ambiente" } }
                    onValueChange={(value) => console.log(value)}
                    items={[
                        { label: 'Football', value: 'football' },
                        { label: 'Baseball', value: 'baseball' },
                        { label: 'Hockey', value: 'hockey' },
                    ]}
                    left={ <TextInputIcon name="building"/> }
                />
                <Button
                    label="CRIAR RESERVA"
                    loading={ this.state.loading }
                    onPress={ ev => {
                        this.setState({ mostrarErros: true });
                        handleSubmit(ev);
                    } }
                />
                <Button outlined
                    label="CANCELAR"
                    onPress={ () => navigation.goBack() }
                />
                { this.snackbar() }
            </>
        );
    }

    async salvarAsync(values, { resetForm }) {
        if (this.state.loading) return;
        const { salvarAsync, navigation } = this.props;
        this.setState({ loading: true });
        try {
            await salvarAsync(values);
            navigation.replace('Reservas');
            resetForm();
        } catch (error) {
            this.openSnackbar('Falha ao Salvar Reserva');
        }
        this.setState({ loading: false });
    }

    openDatePicker() {
        this.setState({ mostrarDatePicker: true });
    }

    closeDatePicker() {
        this.setState({ mostrarDatePicker: false });
    }

    datePicker({ handleChange, values }) {
        if (!this.state.mostrarDatePicker) return false;

        return (
            <DateTimePicker
                testID="dateTimePicker"
                minimumDate={ new Date() }
                value={ values.data ? moment(values.data, this.dateFormat).toDate() : new Date() }
                onChange={ event => {
                    if (event.type === 'set') 
                        handleChange('data')(moment(event.nativeEvent.timestamp).format(this.dateFormat)) 
                    this.closeDatePicker();                        
                } }
                is24Hour={ true }
                mode="date"
                display='calendar'
            />
        );
    }

    openSnackbar(message) {
        this.setState({ message, mostrarSnackbar: true });
    }

    closeSnackbar() {
        this.setState({ message: '', mostrarSnackbar: false });
    }

    snackbar() {
        return (
            <Snackbar
                duration={ 5000 }
                visible={ this.state.mostrarSnackbar }
                onDismiss={ () => this.closeSnackbar() }
            >
                { this.state.message }    
            </Snackbar>
        );
    }
}

const mapStateToProps = state => ({ ambientes: state.ambientes });
export default connect(mapStateToProps, { salvarAsync })(ReservaFormScrean);