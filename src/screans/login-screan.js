import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Snackbar } from "react-native-paper";
import { connect } from "react-redux";

import { displayName } from '../../app.json';
import Button from "../components/button";
import Screan from "../components/screan";
import HeaderTitle from "../components/header";
import Separator from "../components/separator";
import TextInput from "../components/text-input";
import TextInputIcon from "../components/text-input-icon";

import { setField, loginAsync } from '../reducers/login-form/login-form-actions';

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            loading: false,
            showPassword: false,
            showSnackbar: false,
            message: ''
        };
    }

    togglePassword() {
        this.setState({ showPassword: !this.state.showPassword });
    }

    render() {
        const { loginForm, setField } = this.props;

        return (
            <Screan style={ styles.container }>
                <View style={ styles.form }>
                    <HeaderTitle title={ displayName }/>
                    <TextInput 
                        style={ { marginTop: 0 } }
                        value={ loginForm.email }
                        onChangeText={ value => setField('email', value) }
                        label="E-main"
                        left={ <TextInputIcon name="mail" /> }
                    />
                    <TextInput 
                        label="Senha"
                        value={ loginForm.password }
                        onChangeText={ value => setField('password', value) }
                        secureTextEntry={ !this.state.showPassword }
                        left={ <TextInputIcon name="lock" /> }
                        right={ <TextInputIcon name="eye" onPress={ () => this.togglePassword() }/> }
                    />
                    <Button 
                        label="ENTRAR"
                        loading={ this.state.loading }
                        onPress={ () => this.loginAsync() }
                    />
                </View>
                <View style={ styles.bottom }>
                    <Separator label="Não tenho uma conta"/>
                    <Button outlined
                        label="CRIAR CONTA"
                        onPress={ () => console.log('Login') }
                    />
                </View>
                { this.snackbar() }
            </Screan>
        );
    }

    async loginAsync() {
        const { loginForm, loginAsync } = this.props;
        this.setState({ loading: true });
        try {
            await loginAsync(loginForm);
            this.props.navigation.replace('Ambiences');
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
                return 'Erro desconhecido';
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

const mapStateToProps = state => ({ loginForm: state.loginForm });
export default connect(mapStateToProps, { setField, loginAsync })(LoginScreen);