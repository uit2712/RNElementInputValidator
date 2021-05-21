import React from 'react';

type ValidatorType = {
    type: 'email';
    errorMessage: string;
} | {
    type: 'minlength';
    errorMessage: string;
    minlength: number;
} | {
    type: 'maxlength';
    errorMessage: string;
    maxlength: number;
}

interface IRequestValidatorHelper {
    listValidators: ValidatorType[];
    isValidateOnValueChange: boolean;
}

function isValidEmail(email: string) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(email) === true;
}

export function useValidatorHelper(request: IRequestValidatorHelper) {
    const [value, setValue] = React.useState('');
    React.useEffect(() => {
        if (request.isValidateOnValueChange === true) {
            setErrorMessage(validate());
        }
    }, [value]);
    
    const [errorMessage, setErrorMessage] = React.useState('');
    function validate(): string {
        for(let i = 0; i < request.listValidators.length; i++) {
            const validator = request.listValidators[i];
            switch(validator.type) {
                default: break;
                case 'email':
                    if (isValidEmail(value) === false) {
                        return validator.errorMessage ?? 'Email is invalid';
                    }
                    break;
                case 'minlength':
                    const minlength = validator.minlength > 0 ? validator.minlength : 1;
                    if (value.length < minlength) {
                        return validator.errorMessage ?? `Min length is ${minlength} character${minlength > 1 ? 's' : ''}`;
                    }
                    break;
                case 'maxlength':
                    const maxlength = validator.maxlength > 0 ? validator.maxlength : 1;
                    if (value.length > maxlength) {
                        return validator.errorMessage ?? `Max length is ${maxlength} character${maxlength > 1 ? 's' : ''}`;
                    }
                    break;
            }
        }
        return '';
    }

    return {
        errorMessage,
        onChangeText: setValue,
        value,
    }
}