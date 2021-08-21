import React, { Component } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
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
                <ScrollView style={ styles.form }>
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
                        onPress={ () => this.loginAsync() }
                    />
                </ScrollView>
                <ScrollView>
                    <Separator label="Não tenho uma conta"/>
                    <Button outlined
                        label="CRIAR CONTA"
                        onPress={ () => console.log('Login') }
                    />
                </ScrollView>
                { this.snackbar() }
            </Screan>
        );
    }

    async loginAsync() {
        const { loginForm, loginAsync } = this.props;
        try {
            await loginAsync(loginForm);
        } catch {
            this.openSnackbar('Usuário/Senha inválidos');
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
                duration={ 3000 }
                visible={ this.state.showSnackbar }
                onDismiss={ () => this.closeSnackbar() }
                action={ {
                    label: 'FECHAR',
                    onPress: () => this.closeSnackbar()
                } }
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
    }
});

const mapStateToProps = state => ({ loginForm: state.loginForm });
export default connect(mapStateToProps, { setField, loginAsync })(LoginScreen);