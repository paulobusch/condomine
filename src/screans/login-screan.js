import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Snackbar } from "react-native-paper";
import { connect } from "react-redux";
import { Formik } from 'formik';
import * as yup from 'yup';

import { displayName } from '../../app.json';
import Button from "../components/buttons/button";
import Screan from "../components/screan";
import HeaderTitle from "../components/header";
import Separator from "../components/separator";
import TextInput from "../components/text-input/text-input";
import TextInputIcon from "../components/text-input/text-input-icon";

import { loginAsync } from '../reducers/usuario/usuario-actions';
import { USUARIO_ADMINISTRADOR } from "../reducers/usuario/usuario-type";

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            loading: false,
            mostrarErros: false,
            mostrarSenha: false,
            showSnackbar: false,
            message: ''
        };
        this.initialValues = { email: '', senha: '' };
        this.validatorSchema = yup.object()
            .shape({
                email: yup
                    .string()
                    .email("E-mail inválido. Utilize este formato exemplo@email.com")
                    .required('O campo é obrigatório'),
                senha: yup
                    .string()
                    .required('O campo é obrigatório')
            });
    }

    toggleSenha() {
        this.setState({ mostrarSenha: !this.state.mostrarSenha });
    }

    render() {
        return (
            <Screan scroll style={ styles.container }>
                <HeaderTitle title={ displayName }/>
                <Formik
                    validationSchema={ this.validatorSchema }
                    initialValues={ this.initialValues }
                    
                    validateOnChange={ this.state.mostrarErros }
                    validateOnBlur={ this.state.mostrarErros }

                    onSubmit={ (values, props) => this.loginAsync(values, props) }
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
                <View style={ styles.form }>
                    <TextInput 
                        label="E-main"
                        style={ { marginTop: 0 } }
                        value={ values.email }
                        error={ errors.email }
                        onChangeText={ handleChange('email') }
                        onBlur={ handleBlur('email') }
                        autoCapitalize="none"
                        keyboardType="email-address"
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
                    <Button 
                        label="ENTRAR"
                        loading={ this.state.loading }
                        onPress={ ev => {
                            this.setState({ mostrarErros: true });
                            handleSubmit(ev);
                        } }
                    />
                </View>
                <View style={ styles.bottom }>
                    <Separator label="Não tenho uma conta"/>
                    <Button outlined
                        label="CRIAR CONTA"
                        onPress={ () => navigation.navigate('CreateUser') }
                    />
                </View>
                { this.snackbar() }
            </>
        );
    }

    async loginAsync(values, { resetForm }) {
        if (this.state.loading) return;
        const { loginAsync, navigation } = this.props;
        this.setState({ loading: true });
        try {
            const usuario = await loginAsync(values);
            navigation.replace(usuario.tipo === USUARIO_ADMINISTRADOR ? 'Ambientes' : 'Reservas');
            resetForm();
        } catch (error) {
            this.openSnackbar(this.getMessageByError(error.code));
        }
        this.setState({ loading: false });
    }

    getMessageByError(code) {
        switch(code) {
            case 'auth/invalid-email': 
                return 'E-mail inválido. Utilize este formato exemplo@email.com';
            case 'auth/user-disabled': 
                return 'O usuário foi desabilitado';
            case 'auth/user-not-found': 
            case 'auth/wrong-password':
                return 'Usuário ou Senha inválidos';
            default: 
                return 'Falha ao realizar login';
        }
    }

    openSnackbar(message) {
        this.setState({ message, showSnackbar: true });
    }

    closeSnackbar() {
        this.setState({ message: '', showSnackbar: false });
    }

    snackbar() {
        return (
            <Snackbar
                duration={ 5000 }
                visible={ this.state.showSnackbar }
                onDismiss={ () => this.closeSnackbar() }
            >
                { this.state.message }    
            </Snackbar>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    form: {
        flexGrow: 1
    },
    bottom: {
        flexShrink: 1
    }
});

export default connect(null, { loginAsync })(LoginScreen);