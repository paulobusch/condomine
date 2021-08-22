import React, { Component } from 'react';
import { View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';

import HeaderTitle from '../components/header';
import Screan from '../components/screan';
import Button from "../components/buttons/button";
import TextInput from "../components/text-input/text-input";
import TextInputIcon from "../components/text-input/text-input-icon";

import { salvarAsync } from '../reducers/ambiente/ambiente-actions';

class AmbienteFormScrean extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            loading: false,
            mostrarErros: false,
            mostrarSnackbar: false,
            message: ''
        };
        this.initialValues = {
            nome: '',
            lotacao: '',
            descricao: ''
        };
        this.validatorSchema = yup.object()
            .shape({
                nome: yup
                    .string()
                    .required('O campo é obrigatório'),
                lotacao: yup
                    .number()
                    .min(0, 'A lotação deve ser válida')
                    .required('O campo é obrigatório'),
                descricao: yup
                    .string()
            });
            
        const { params } = this.props.navigation.state;
        this.editMode = !!params && !!params.ambiente;
        if (this.editMode) this.initialValues = params.ambiente;
    }

    render() {
        return (
            <Screan scroll>
                <HeaderTitle title={ `${this.editMode ? 'Edição de' : 'Novo'} Ambiente` }/>
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
                <View style={ { flexGrow: 1 } }>
                    <TextInput 
                        label="Nome"
                        value={ values.nome }
                        error={ errors.nome }
                        onChangeText={ handleChange('nome') }
                        onBlur={ handleBlur('nome') }
                        left={ <TextInputIcon name="building" /> }
                    />
                    <TextInput
                        label="Locação"
                        keyboardType='numeric'
                        value={ values.lotacao }
                        error={ errors.lotacao }
                        onChangeText={ handleChange('lotacao') }
                        onBlur={ handleBlur('lotacao') }
                        left={ <TextInputIcon name="users" /> }
                    />
                    <TextInput multiline
                        label="Descrição"
                        numberOfLines={ 6 }
                        value={ values.descricao }
                        error={ errors.descricao }
                        onChangeText={ handleChange('descricao') }
                        onBlur={ handleBlur('descricao') }
                        left={ <TextInputIcon name="align-justify" /> }
                    />
                </View>
                <View>
                    <Button
                        label={ `${this.editMode ? 'ALTERAR' : 'CRIAR'} AMBIENTE` }
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
                </View>
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
            navigation.replace('Ambientes');
            resetForm();
        } catch (error) {
            this.openSnackbar('Falha ao Salvar Ambiente');
        }
        this.setState({ loading: false });
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

export default connect(null, { salvarAsync })(AmbienteFormScrean);