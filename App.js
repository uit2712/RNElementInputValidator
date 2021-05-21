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
    const email = useValidatorHelper({
        isValidateOnValueChange: true,
        listValidators: [{
            type: 'email',
            errorMessage: 'Please enter a valid email adress',
        }]
    });

    return (
        <View style={styles.container}>
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
                errorMessage={email.errorMessage}
                value={email.value}
                onChangeText={(text) => email.setValue(text)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    }
});

export default App;
