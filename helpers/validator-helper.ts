import React from 'react';

type ValidatorType = 'email' | 'minlength' | 'maxlength';
interface IValidator {
    type: ValidatorType;
    errorMessage: string;
    minLength?: number;
    maxLength?: number;
}

interface IRequestValidatorHelper {
    listValidators: IValidator[];
    isValidateOnValueChange: boolean;
}

function isValidEmail(email: string) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(email) === true;
}

export function useValidatorHelper(request: IRequestValidatorHelper) {
    const [value, setValue] = React.useState('');

    const [errorMessage, setErrorMessage] = React.useState('');
    React.useEffect(() => {
        if (request.isValidateOnValueChange === true) {
            setErrorMessage(validate());
        }
    }, [value]);

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
            }
        }
        return '';
    }

    return {
        errorMessage,
        validate,
        setValue,
        value,
    }
}