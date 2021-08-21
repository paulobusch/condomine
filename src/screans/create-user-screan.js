import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';

import HeaderTitle from '../components/header';
import Screan from '../components/screan';
import Button from "../components/button";
import TextInput from "../components/text-input";
import TextInputIcon from "../components/text-input-icon";

import { cadastrarAsync } from '../reducers/usuario/usuario-actions';
import { Snackbar } from 'react-native-paper';

class CreateUserScrean extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            loading: false,
            mostrarErros: false,
            mostrarSenha: false,
            mostrarConfirmacaoSenha: false,
            mostrarSnackbar: false,
            message: ''
        };
        this.initialValues = {
            nomeCompleto: '',
            apartamento: '',
            email: '',
            senha: '',
            confirmacaoSenha: ''
        };
        this.validatorSchema = yup.object()
            .shape({
                nomeCompleto: yup
                    .string()
                    .required('O campo é obrigatório'),
                apartamento: yup
                    .string()
                    .required('O campo é obrigatório'),
                email: yup
                    .string()
                    .email("E-mail inválido. Utilize este formato exemplo@email.com")
                    .required('O campo é obrigatório'),
                senha: yup
                    .string()
                    .min(8, ({ min }) => `A senha deve ter no mínimo ${min} caracteres`)
                    .required('O campo é obrigatório'),
                confirmacaoSenha: yup
                    .string()
                    .required('O campo é obrigatório')
                    .oneOf([yup.ref('senha'), null], 'As senhas devem conincidir')
            });
    }

    toggleSenha() {
        this.setState({ mostrarSenha: !this.state.mostrarSenha });
    }

    toggleConfirmacaoSenha() {
        this.setState({ mostrarConfirmacaoSenha: !this.state.mostrarConfirmacaoSenha });
    }

    render() {        
        return (
            <Screan>
                <HeaderTitle title="Novo Usuário"/>
                <Formik
                    validationSchema={ this.validatorSchema }
                    initialValues={ this.initialValues }
                    
                    validateOnChange={ this.state.mostrarErros }
                    validateOnBlur={ this.state.mostrarErros }

                    onSubmit={ (values, props) => this.cadastrarAsync(values, props) }
                >
                    { (props) => this.fields(props) }
                </Formik>
            </Screan>
        );
    }

    fields(props) {
        const { handleChange, handleBlur, handleSubmit, values, errors } = props;

        return (
            <>
                <View style={ styles.form }>
                    <TextInput 
                        style={ { marginTop: 0 } }
                        label="Nome Completo"
                        value={ values.nomeCompleto }
                        error={ errors.nomeCompleto }
                        onChangeText={ handleChange('nomeCompleto') }
                        onBlur={ handleBlur('nomeCompleto') }
                        left={ <TextInputIcon name="user" /> }
                    />
                    <TextInput 
                        label="Apartamento"
                        value={ values.apartamento }
                        error={ errors.apartamento }
                        onChangeText={ handleChange('apartamento') }
                        onBlur={ handleBlur('apartamento') }
                        left={ <TextInputIcon name="building" /> }
                    />
                    <TextInput
                        label="E-main"
                        value={ values.email }
                        error={ errors.email }
                        onChangeText={ handleChange('email') }
                        onBlur={ handleBlur('email') }
                        keyboardType="email-address"
                        autoCapitalize="none"
                        left={ <TextInputIcon name="envelope" /> }
                    />
                    <TextInput 
                        label="Senha"
                        value={ values.senha }
                        error={ errors.senha }
                        onChangeText={ handleChange('senha') }
                        onBlur={ handleBlur('senha') }
                        secureTextEntry={ !this.state.mostrarSenha }
                        left={ <TextInputIcon name="lock" /> }
                        right={ <TextInputIcon name="eye" onPress={ () => this.toggleSenha() }/> }
                    />
                    <TextInput 
                        label="Confirmar Senha"
                        value={ values.confirmacaoSenha }
                        error={ errors.confirmacaoSenha }
                        onChangeText={ handleChange('confirmacaoSenha') }
                        onBlur={ handleBlur('confirmacaoSenha') }
                        secureTextEntry={ !this.state.mostrarConfirmacaoSenha }
                        left={ <TextInputIcon name="lock" /> }
                        right={ <TextInputIcon name="eye" onPress={ () => this.toggleConfirmacaoSenha() }/> }
                    />
                </View>
                <View>
                    <Button
                        label="CRIAR CONTA"
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

    async cadastrarAsync(values, { resetForm }) {
        const { cadastrarAsync, navigation } = this.props;
        this.setState({ loading: true });
        try {
            await cadastrarAsync(values);
            navigation.replace('Ambiences');
            resetForm();
        } catch (error) {
            this.openSnackbar(this.getMessageByError(error.code));
        }
        this.setState({ loading: false });
    }
    
    getMessageByError(code) {
        switch(code) {
            case 'auth/email-already-in-use': 
                return 'Este e-mail já está sendo usado por outra conta!';
            default: 
                return 'Falha ao criar usuário';
        }
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

const styles = StyleSheet.create({
    form: {
        flexGrow: 1
    }
});

export default connect(null, { cadastrarAsync })(CreateUserScrean);