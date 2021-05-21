/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from 'react-native-elements';
import { useValidatorHelper } from './helpers/validator-helper';

function App() {
    const name = useValidatorHelper({
        isValidateOnValueChange: true,
        listValidators: [{
            type: 'minlength',
            errorMessage: 'Please enter a value has at least 3 characters.',
            minlength: 3
        }, {
            type: 'maxlength',
            errorMessage: 'Please enter a value has max characters is 5.',
            maxlength: 5
        }]
    });
    const email = useValidatorHelper({
        isValidateOnValueChange: true,
        listValidators: [{
            type: 'email',
            errorMessage: 'Please enter a valid email adress.',
        }]
    });


    return (
        <View style={styles.container}>
            <Input
                placeholder='Name'
                label='Your Name'
                errorStyle={{ color: 'red' }}
                {...name}
            />
            <Input
                placeholder='email@address.com'
                label='Your Email Address'
                leftIcon={
                    <MaterialCommunityIcon
                        name='email'
                        size={30}
                    />
                }
                errorStyle={{ color: 'red' }}
                {...email}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    }
});

export default App;
