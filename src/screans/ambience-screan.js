import React, { Component } from 'react';

import HeaderTitle from '../components/header';
import Screan from '../components/screan';
import Button from "../components/button";

class AmbienceScrean extends Component {
    render() {
        const { navigation } = this.props;

        return (
            <Screan>
                <HeaderTitle title="Ambientes"/>
                <Button outlined
                    label="VOLTAR"
                    onPress={ () => navigation.navigate('Login') }
                />
            </Screan>
        );
    }
}

export default AmbienceScrean;