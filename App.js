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
import { Input, CheckBox } from 'react-native-elements';
import { useValidatorHelper } from './helpers/validator-helper';

function App() {
    const name = useValidatorHelper({
        isValidateOnValueChange: true,
        listValidators: [{
            type: 'minlength',
            errorMessage: 'Please enter a value has at least __placeholder__ characters.',
            minlength: 9,
            errorMessagePlaceHolder: '__placeholder__',
        }, {
            type: 'maxlength',
            errorMessage: 'Please enter a value has max characters is __placeholder__.',
            maxlength: 10,
            errorMessagePlaceHolder: '__placeholder__',
        }]
    });
    const email = useValidatorHelper({
        isValidateOnValueChange: true,
        listValidators: [{
            type: 'function',
            errorMessage: 'Please enter a valid email adress.',
            validate: (value) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(value) === true,
        }]
    });
    const [isShowPassword, setIsShowPassword] = React.useState(false);
    const password = useValidatorHelper({
        isValidateOnValueChange: true,
        listValidators: [{
            type: 'function',
            errorMessage: 'Please enter a password has at least one character and one number.',
            validate: (value) => /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(value) === true,
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
            <Input
                placeholder='Password'
                label='Your Password'
                leftIcon={
                    <MaterialCommunityIcon
                        name='key-variant'
                        size={30}
                    />
                }
                secureTextEntry={isShowPassword === false}
                errorStyle={{ color: 'red' }}
                {...password}
            />
            <Input
                placeholder='Confirm Password'
                label='Re-enter password'
                leftIcon={
                    <MaterialCommunityIcon
                        name='key-variant'
                        size={30}
                    />
                }
                secureTextEntry={isShowPassword === false}
                errorStyle={{ color: 'red' }}
                {...password}
            />
            <CheckBox
                right
                title='Show password'
                checked={isShowPassword}
                onPress={() => setIsShowPassword(!isShowPassword)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    }
});

export default App;
