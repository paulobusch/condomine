import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import HeaderTitle from '../components/header';
import Screan from '../components/screan';
import Button from "../components/button";
import TextInput from "../components/text-input";
import TextInputIcon from "../components/text-input-icon";

import { setField, salvarAsync } from '../reducers/create-user-form/create-user-form-actions';

class CreateUserScrean extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            loading: false,
            mostrarSenha: false,
            mostrarConfirmacaoSenha: false,
            message: ''
        };
    }

    toggleSenha() {
        this.setState({ mostrarSenha: !this.state.mostrarSenha });
    }

    toggleConfirmacaoSenha() {
        this.setState({ mostrarConfirmacaoSenha: !this.state.mostrarConfirmacaoSenha });
    }

    render() {
        const { setField, createUserForm, saveAsync, navigation } = this.props;

        return (
            <Screan>
                <HeaderTitle title="Novo Usuário"/>
                <View style={ styles.form }>
                    <TextInput 
                        style={ { marginTop: 0 } }
                        label="Nome Completo"
                        value={ createUserForm.nomeCompleto }
                        onChangeText={ value => setField('nomeCompleto', value) }
                        left={ <TextInputIcon name="user" /> }
                    />
                    <TextInput 
                        label="Apartamento"
                        value={ createUserForm.apartamento }
                        onChangeText={ value => setField('apartamento', value) }
                        left={ <TextInputIcon name="building" /> }
                    />
                    <TextInput
                        label="E-main"
                        value={ createUserForm.email }
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={ value => setField('email', value) }
                        left={ <TextInputIcon name="envelope" /> }
                    />
                    <TextInput 
                        label="Senha"
                        value={ createUserForm.senha }
                        onChangeText={ value => setField('senha', value) }
                        secureTextEntry={ !this.state.mostrarSenha }
                        left={ <TextInputIcon name="lock" /> }
                        right={ <TextInputIcon name="eye" onPress={ () => this.toggleSenha() }/> }
                    />
                    <TextInput 
                        label="Confirmar Senha"
                        value={ createUserForm.confirmacaoSenha }
                        onChangeText={ value => setField('confirmacaoSenha', value) }
                        secureTextEntry={ !this.state.mostrarConfirmacaoSenha }
                        left={ <TextInputIcon name="lock" /> }
                        right={ <TextInputIcon name="eye" onPress={ () => this.toggleConfirmacaoSenha() }/> }
                    />
                </View>
                <View style={ styles.buttons }>
                    <Button
                        label="CRIAR CONTA"
                        onPress={ () => this.salvarUsuarioAsync() }
                    />
                    <Button outlined
                        label="CANCELAR"
                        onPress={ () => navigation.goBack() }
                    />
                </View>
            </Screan>
        );
    }

    salvarUsuarioAsync() {

    }

    validarForm(form) {

    }
}

const styles = StyleSheet.create({
    form: {

    },
    buttons: {

    }
});

const mapStateToProps = state => ({ createUserForm: state.createUserForm });
export default connect(mapStateToProps, { setField, salvarAsync })(CreateUserScrean);