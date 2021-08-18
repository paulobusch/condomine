import React, { Component } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { displayName } from '../../app.json';
import Button from "../components/button";
import HeaderTitle from "../components/header";
import Separator from "../components/separator";
import TextInput from "../components/text-input";
import TextInputIcon from "../components/text-input-icon";

class LoginScrean extends Component {
    constructor(props) {
        super(props);

        this.state = { showPassword: false };
        this.togglePassword = this.togglePassword.bind(this);
    }

    togglePassword() {
        this.setState({ showPassword: !this.state.showPassword });
    }

    render() {
        return (
            <View style={ styles.container }>
                <ScrollView style={ styles.form }>
                    <HeaderTitle title={ displayName }/>
                    <TextInput 
                        style={ { marginTop: 0 } }
                        label="E-main"
                        left={ <TextInputIcon name="mail" /> }
                    />
                    <TextInput 
                        label="Senha"
                        secureTextEntry={ !this.state.showPassword }
                        left={ <TextInputIcon name="lock" /> }
                        right={ <TextInputIcon name="eye" onPress={ this.togglePassword }/> }
                    />
                    <Button 
                        label="ENTRAR"
                        onPress={ () => console.log('Login') }
                    />
                </ScrollView>
                <ScrollView>
                    <Separator label="Não tenho uma conta"/>
                    <Button outlined
                        label="CRIAR CONTA"
                        onPress={ () => console.log('Login') }
                    />
                </ScrollView>
            </View>
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

export default LoginScrean;